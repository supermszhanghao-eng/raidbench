(function () {
  const config = window.RAIDBENCH_CONFIG || {};
  const offer = config.premiumOffer || {};
  const checkoutLink = document.querySelector("#premium-checkout");
  const interestForm = document.querySelector("#premium-interest-form");
  const status = document.querySelector("#premium-status");

  function track(name, params = {}) {
    window.RaidBenchAnalytics?.track(name, {
      offer_id: offer.offerId || "raid-prep-pack-9",
      price_usd: 9,
      ...params,
    });
  }

  function setStatus(message) {
    if (status) status.textContent = message;
  }

  function setupCheckout() {
    if (!checkoutLink) return;

    const paymentLink = (offer.paypalPaymentLink || "").trim();
    const normalizedPaymentLink = paymentLink.toLowerCase();
    const hasPaymentLink =
      normalizedPaymentLink.startsWith("https://www.paypal.com/") ||
      normalizedPaymentLink.startsWith("https://paypal.com/");

    checkoutLink.dataset.offerId = offer.offerId || "raid-prep-pack-9";
    checkoutLink.dataset.priceUsd = "9";

    if (hasPaymentLink) {
      checkoutLink.href = paymentLink;
      checkoutLink.textContent = "Buy with PayPal";
      checkoutLink.setAttribute("target", "_blank");
      checkoutLink.setAttribute("rel", "noopener");
      checkoutLink.addEventListener("click", () => track("premium_checkout_click", { checkout_provider: "paypal" }));
      setStatus("PayPal checkout is configured.");
      return;
    }

    checkoutLink.href = "#interest";
    checkoutLink.textContent = "Join early access";
    checkoutLink.addEventListener("click", () => track("premium_interest_click"));
    setStatus("PayPal checkout is not connected yet. This page is collecting purchase intent first.");
  }

  function setupInterestForm() {
    if (!interestForm) return;

    interestForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const emailInput = interestForm.querySelector("#premium-email");
      const roleInput = interestForm.querySelector("#premium-role");
      const email = emailInput.value.trim();
      if (!email) return;

      const domain = email.includes("@") ? email.split("@").pop().toLowerCase() : "unknown";
      track("premium_interest_submit", {
        email_domain: domain,
        player_type: roleInput.value,
      });

      emailInput.value = "";
      roleInput.value = "solo";
      setStatus("Intent event recorded for the MVP test. Connect a real form backend before launch traffic.");
    });
  }

  track("premium_offer_view");
  setupCheckout();
  setupInterestForm();
})();
