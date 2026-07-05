const sulfurPerItem = {
  rockets: 1400,
  c4: 2200,
  satchels: 480,
  explosiveAmmo: 25,
};

const methodLabels = {
  rockets: "Rockets",
  c4: "C4",
  satchels: "Satchels",
  explosiveAmmo: "Explosive ammo",
};

const targets = [
  {
    id: "sheet-door",
    label: "Sheet Metal Door",
    rockets: 2,
    c4: 1,
    satchels: 4,
    explosiveAmmo: 63,
  },
  {
    id: "garage-door",
    label: "Garage Door",
    rockets: 3,
    c4: 2,
    satchels: 9,
    explosiveAmmo: 150,
  },
  {
    id: "armored-door",
    label: "Armored Door",
    rockets: 4,
    c4: 2,
    satchels: 12,
    explosiveAmmo: 200,
  },
  {
    id: "stone-wall",
    label: "Stone Wall",
    rockets: 4,
    c4: 2,
    satchels: 10,
    explosiveAmmo: 185,
  },
  {
    id: "sheet-wall",
    label: "Sheet Metal Wall",
    rockets: 8,
    c4: 4,
    satchels: 23,
    explosiveAmmo: 400,
  },
  {
    id: "armored-wall",
    label: "Armored Wall",
    rockets: 15,
    c4: 8,
    satchels: 46,
    explosiveAmmo: 800,
  },
];

const raidState = [
  { targetId: "sheet-door", qty: 2, method: "satchels" },
  { targetId: "stone-wall", qty: 1, method: "rockets" },
];

const targetSelect = document.querySelector("#target-select");
const methodSelect = document.querySelector("#method-select");
const targetQty = document.querySelector("#target-qty");
const raidList = document.querySelector("#raid-list");
const raidItems = document.querySelector("#raid-items");
const sulfurTotal = document.querySelector("#sulfur-total");
const gunpowderTotal = document.querySelector("#gunpowder-total");
const targetTable = document.querySelector("#target-table");

const formatNumber = (value) => new Intl.NumberFormat("en-US").format(Math.round(value));

function trackEvent(name, params = {}) {
  window.RaidBenchAnalytics?.track(name, params);
}

function findTarget(targetId) {
  return targets.find((target) => target.id === targetId);
}

function populateTargets() {
  targetSelect.innerHTML = targets
    .map((target) => `<option value="${target.id}">${target.label}</option>`)
    .join("");

  targetTable.innerHTML = targets
    .map(
      (target) => `
        <tr>
          <td>${target.label}</td>
          <td>${target.rockets}</td>
          <td>${target.c4}</td>
          <td>${target.satchels}</td>
          <td>${target.explosiveAmmo}</td>
        </tr>
      `,
    )
    .join("");
}

function renderRaidList() {
  raidList.innerHTML = raidState
    .map((entry, index) => {
      const target = findTarget(entry.targetId);
      const itemCount = target[entry.method] * entry.qty;
      const sulfur = itemCount * sulfurPerItem[entry.method];

      return `
        <div class="raid-row">
          <div>
            <strong>${entry.qty} x ${target.label}</strong>
            <span>${methodLabels[entry.method]}</span>
          </div>
          <span>${formatNumber(itemCount)} items</span>
          <span>${formatNumber(sulfur)} sulfur</span>
          <button class="remove-row" type="button" data-index="${index}">Remove</button>
        </div>
      `;
    })
    .join("");

  if (!raidState.length) {
    raidList.innerHTML = `<div class="raid-row"><span>Add a target to start planning.</span></div>`;
  }

  updateRaidTotals();
}

function updateRaidTotals() {
  const totals = raidState.reduce(
    (acc, entry) => {
      const target = findTarget(entry.targetId);
      const itemCount = target[entry.method] * entry.qty;
      acc.items += itemCount;
      acc.sulfur += itemCount * sulfurPerItem[entry.method];
      return acc;
    },
    { items: 0, sulfur: 0 },
  );

  raidItems.textContent = formatNumber(totals.items);
  sulfurTotal.textContent = formatNumber(totals.sulfur);
  gunpowderTotal.textContent = formatNumber(totals.sulfur / 2);

  return totals;
}

function addTarget() {
  const qty = Math.max(1, Math.min(99, Number(targetQty.value) || 1));
  const target = findTarget(targetSelect.value);
  raidState.push({
    targetId: targetSelect.value,
    qty,
    method: methodSelect.value,
  });
  renderRaidList();
  trackEvent("raid_add_target", {
    target_id: targetSelect.value,
    target_label: target?.label,
    quantity: qty,
    method: methodSelect.value,
    rows: raidState.length,
  });
}

document.querySelector("#add-target").addEventListener("click", addTarget);

document.querySelector("#reset-raid").addEventListener("click", () => {
  raidState.splice(0, raidState.length);
  renderRaidList();
  trackEvent("raid_reset");
});

raidList.addEventListener("click", (event) => {
  const button = event.target.closest(".remove-row");
  if (!button) return;
  const removed = raidState[Number(button.dataset.index)];
  raidState.splice(Number(button.dataset.index), 1);
  renderRaidList();
  trackEvent("raid_remove_target", {
    target_id: removed?.targetId,
    method: removed?.method,
    rows: raidState.length,
  });
});

const upkeepInputs = {
  wood: document.querySelector("#wood-day"),
  stone: document.querySelector("#stone-day"),
  metal: document.querySelector("#metal-day"),
  hqm: document.querySelector("#hqm-day"),
};

const upkeepOutputs = {
  wood: document.querySelector("#wood-week"),
  stone: document.querySelector("#stone-week"),
  metal: document.querySelector("#metal-week"),
  hqm: document.querySelector("#hqm-week"),
};

function updateUpkeep() {
  Object.keys(upkeepInputs).forEach((key) => {
    const daily = Math.max(0, Number(upkeepInputs[key].value) || 0);
    upkeepOutputs[key].textContent = formatNumber(daily * 7);
  });
}

Object.values(upkeepInputs).forEach((input) => {
  input.addEventListener("input", updateUpkeep);
  input.addEventListener("change", () => {
    trackEvent("upkeep_input_change", {
      resource: input.id.replace("-day", ""),
      daily_value: Math.max(0, Number(input.value) || 0),
    });
  });
});

document.querySelector(".email-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const input = document.querySelector("#email");
  if (!input.value) return;
  const domain = input.value.includes("@") ? input.value.split("@").pop().toLowerCase() : "unknown";
  input.value = "";
  input.placeholder = "Saved locally for MVP demo";
  trackEvent("email_interest_submit", {
    email_domain: domain,
  });
});

populateTargets();
renderRaidList();
updateUpkeep();
trackEvent("calculator_ready", {
  default_rows: raidState.length,
});
