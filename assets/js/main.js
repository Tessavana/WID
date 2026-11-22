(function () {
  "use strict";
  var cfg = window.WID_CONFIG || {};

  /* Mobile navigation ---------------------------------------------------- */
  var nav = document.querySelector(".nav");
  var toggle = document.querySelector(".nav__toggle");
  if (nav && toggle) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  /* Reveal on scroll ----------------------------------------------------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* Configurable links --------------------------------------------------- */
  document.querySelectorAll("[data-instagram]").forEach(function (a) {
    if (cfg.instagramUrl) { a.href = cfg.instagramUrl; a.target = "_blank"; a.rel = "noopener"; }
  });
  document.querySelectorAll("[data-tickets]").forEach(function (a) {
    if (a.getAttribute("href") && a.getAttribute("href") !== "#") { a.target = "_blank"; a.rel = "noopener"; return; }
    if (cfg.ticketsUrl) { a.href = cfg.ticketsUrl; a.target = "_blank"; a.rel = "noopener"; }
    else { a.href = a.getAttribute("data-fallback") || "contact.html"; }
  });
  document.querySelectorAll("[data-email-link]").forEach(function (a) {
    if (cfg.email) { a.href = "mailto:" + cfg.email; a.textContent = cfg.email; }
  });

  /* City tiles + QR codes ------------------------------------------------ */
  function asset(p) { return (p && p.charAt(0) === "/") ? (cfg.baseurl || "") + p : p; }
  document.querySelectorAll("[data-city-link]").forEach(function (a) {
    var city = (cfg.cities && cfg.cities[a.getAttribute("data-city-link")]) || {};
    if (typeof city === "string") city = { link: city };     // backward compatible
    var link = city.link || "";
    var qrImage = city.qr || "";
    var qr = a.querySelector("[data-qr]");
    if (link) { a.href = link; a.target = "_blank"; a.rel = "noopener"; }
    else { a.removeAttribute("href"); a.style.cursor = "default"; }
    if (qr) {
      if (qrImage) {                                          // uploaded QR wins
        var im = new Image(); im.alt = "QR code"; im.style.width = "100%";
        im.src = asset(qrImage); qr.appendChild(im);
      } else if (link) {                                      // else generate from the link
        var im2 = new Image(); im2.alt = "QR code"; im2.style.width = "100%";
        im2.src = "https://api.qrserver.com/v1/create-qr-code/?size=300x300&margin=0&data=" + encodeURIComponent(link);
        qr.appendChild(im2);
      } else {
        qr.innerHTML = placeholderQR();
      }
    }
  });

  // Decorative QR-style mark used until a real link is configured.
  function placeholderQR() {
    var cells = "";
    var seed = 7;
    function rnd() { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }
    for (var y = 0; y < 25; y++) {
      for (var x = 0; x < 25; x++) {
        var inFinder = (x < 8 && y < 8) || (x > 16 && y < 8) || (x < 8 && y > 16);
        var inLogo = x > 8 && x < 16 && y > 8 && y < 16;
        if (!inFinder && !inLogo && rnd() > 0.52) cells += '<rect x="' + x + '" y="' + y + '" width="1" height="1"/>';
      }
    }
    function finder(x, y) {
      return '<rect x="' + x + '" y="' + y + '" width="7" height="7"/>' +
             '<rect x="' + (x + 1) + '" y="' + (y + 1) + '" width="5" height="5" fill="#fff"/>' +
             '<rect x="' + (x + 2) + '" y="' + (y + 2) + '" width="3" height="3"/>';
    }
    return '<svg viewBox="0 0 25 25" shape-rendering="crispEdges" aria-hidden="true"><g fill="#111">' +
      cells + finder(0, 0) + finder(18, 0) + finder(0, 18) +
      '<circle cx="12.5" cy="12.5" r="3" /><text x="12.5" y="14" font-size="4" text-anchor="middle" fill="#fff" font-family="Archivo, sans-serif" font-weight="900">W</text>' +
      "</g></svg>";
  }

  /* Filters (Events / Learn) -------------------------------------------- */
  document.querySelectorAll("[data-filter]").forEach(function (form) {
    var items = document.querySelectorAll(form.getAttribute("data-filter"));
    var text = form.querySelector("[data-filter-text]");
    var selects = form.querySelectorAll("[data-filter-key]");
    var empty = document.querySelector("[data-empty]");

    function apply() {
      var q = (text && text.value || "").trim().toLowerCase();
      var shown = 0;
      items.forEach(function (item) {
        var ok = !q || item.textContent.toLowerCase().indexOf(q) !== -1;
        selects.forEach(function (s) {
          var key = s.getAttribute("data-filter-key");
          if (s.value && item.getAttribute("data-" + key) !== s.value) ok = false;
        });
        item.classList.toggle("is-hidden", !ok);
        if (ok) shown++;
      });
      if (empty) empty.classList.toggle("is-hidden", shown > 0);
    }
    if (text) text.addEventListener("input", apply);
    selects.forEach(function (s) { s.addEventListener("change", apply); });
  });

  /* Learn: open card in detail frame ------------------------------------ */
  var detailTitle = document.querySelector("[data-detail-title]");
  var detailImg = document.querySelector("[data-detail-img]");
  document.querySelectorAll(".card[data-title]").forEach(function (card) {
    card.addEventListener("click", function () {
      document.querySelectorAll(".card.is-active").forEach(function (c) { c.classList.remove("is-active"); });
      card.classList.add("is-active");
      if (detailTitle) detailTitle.textContent = card.getAttribute("data-title");
      if (detailImg) detailImg.src = card.getAttribute("data-img");
      var sub = document.querySelector("[data-detail-subtitle]");
      if (sub) sub.textContent = card.getAttribute("data-subtitle") || "";
      var body = document.querySelector("[data-detail-body]");
      var tpl = card.querySelector("template");
      if (body && tpl) body.innerHTML = tpl.innerHTML;
    });
  });

  /* Forms → mailbox (FormSubmit) ---------------------------------------- */
  document.querySelectorAll("form[data-form]").forEach(function (form) {
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var status = form.querySelector(".form__status") || (form.parentNode && form.parentNode.querySelector(".form__status"));
      var type = form.getAttribute("data-form");
      var data = {};
      new FormData(form).forEach(function (v, k) { data[k] = v; });
      if (data._honey) return; // bot
      delete data._honey;
      data._subject = type === "newsletter" ? "WID — new newsletter sign-up" : "WID — new message via the website";
      data._template = "table";
      data.form = type;

      var btn = form.querySelector("button[type=submit]");
      if (btn) btn.disabled = true;
      if (status) status.textContent = "Sending…";

      fetch("https://formsubmit.co/ajax/" + encodeURIComponent(cfg.email), {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(data)
      })
        .then(function (r) { return r.json(); })
        .then(function (res) {
          if (res && (res.success === true || res.success === "true")) {
            form.reset();
            if (status) status.textContent = type === "newsletter" ? "Thanks — you're signed up!" : "Thank you! Your message has been sent.";
          } else { throw new Error(res && res.message); }
        })
        .catch(function () {
          if (status) {
            status.innerHTML = 'Something went wrong. Please email us at <a href="mailto:' + cfg.email + '">' + cfg.email + "</a>.";
          }
        })
        .finally(function () { if (btn) btn.disabled = false; });
    });
  });
})();
