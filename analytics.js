(function () {
  const config = window.RAIDBENCH_CONFIG || {};
  const measurementId = (config.ga4MeasurementId || "").trim();
  const hasGa4 = /^G-[A-Z0-9]+$/i.test(measurementId);
  const eventBuffer = [];

  function loadGa4() {
    if (!hasGa4) return;

    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };

    window.gtag("js", new Date());
    window.gtag("config", measurementId, {
      send_page_view: true,
      page_title: document.title,
      page_location: window.location.href,
    });

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
    document.head.appendChild(script);
  }

  function cleanParams(params) {
    return Object.fromEntries(
      Object.entries(params || {}).filter(([, value]) => value !== undefined && value !== null && value !== ""),
    );
  }

  function track(name, params = {}) {
    const payload = cleanParams({
      page_path: window.location.pathname,
      page_title: document.title,
      ...params,
    });

    eventBuffer.push({
      name,
      params: payload,
      at: new Date().toISOString(),
    });

    if (hasGa4 && typeof window.gtag === "function") {
      window.gtag("event", name, payload);
    }

    if (config.analyticsDebug) {
      console.info("[RaidBenchAnalytics]", name, payload);
    }
  }

  function visibleText(element) {
    return (element.textContent || element.getAttribute("aria-label") || "").trim().replace(/\s+/g, " ");
  }

  function bindClickTracking() {
    document.addEventListener("click", (event) => {
      const link = event.target.closest("a");
      const button = event.target.closest("button");

      if (link) {
        const isGuide = link.classList.contains("guide-item") || link.href.includes("/pages/");
        const isCta =
          link.classList.contains("primary-action") ||
          link.classList.contains("secondary-action") ||
          link.classList.contains("header-action");

        if (isGuide || isCta) {
          track(isGuide ? "guide_link_click" : "cta_click", {
            link_text: visibleText(link).slice(0, 120),
            link_url: link.href,
            offer_id: link.dataset.offerId,
            price_usd: link.dataset.priceUsd,
          });
        }
        return;
      }

      if (
        button &&
        button.type !== "submit" &&
        !["add-target", "reset-raid"].includes(button.id) &&
        !button.classList.contains("remove-row")
      ) {
        track("button_click", {
          button_id: button.id,
          button_text: visibleText(button).slice(0, 120),
        });
      }
    });
  }

  window.RaidBenchAnalytics = {
    track,
    events: eventBuffer,
    enabled: hasGa4,
  };

  loadGa4();
  bindClickTracking();
})();
