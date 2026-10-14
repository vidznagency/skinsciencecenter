/* ==========================================================================
   SHARED LAYOUT — icon sprite, header, mobile menu, footer, floating actions
   and modals. Included on every page so the chrome is edited in one place.
   Usage: <body data-page="home|services|about|journal">
          <script src="assets/js/layout.js"></script>   (first thing in <body>)
          ...page content...
          <script>Layout.bottom()</script>              (end of <body>)
   ========================================================================== */
(function () {
  const page = document.body.dataset.page || "home";
  const home = page === "home" ? "" : "index.html";
  const navItems = [
    { k: "nav.home", label: "Home", href: "index.html", id: "home" },
    { k: "nav.treatments", label: "Treatments", href: "services.html", id: "services" },
    { k: "nav.about", label: "About", href: "about.html", id: "about" },
    { k: "nav.results", label: "Results", href: home + "#results", id: "results" },
    { k: "nav.journal", label: "Journal", href: "journal.html", id: "journal" },
    { k: "nav.contact", label: "Contact", href: home + "#contact", id: "contact" }
  ];
  const link = (n) => `<a href="${n.href}" data-i18n="${n.k}"${n.id === page ? ' class="active" aria-current="page"' : ""}>${n.label}</a>`;
  const book = home + "#book";

  const SPRITE = `<svg width="0" height="0" style="position:absolute" aria-hidden="true">
  <defs>
    <symbol id="i-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></symbol>
    <symbol id="i-shield" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z"/><path d="M12 9v6M9 12h6"/></symbol>
    <symbol id="i-hair" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 19c-1-2-1-5-1-8a8 8 0 0116 0c0 3 0 6-1 8"/><path d="M9 6c-.5 5-.5 10-1.5 15M12 5v16M15 6c.5 5 .5 10 1.5 15"/></symbol>
    <symbol id="i-spark" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11 3l1.8 5.2L18 10l-5.2 1.8L11 17l-1.8-5.2L4 10l5.2-1.8L11 3z"/><path d="M18.5 15l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7.7-2z"/></symbol>
    <symbol id="i-laser" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="9" width="9" height="6" rx="1.5"/><path d="M11.5 12h9M15.5 7.5l2-2M15.5 16.5l2 2M5 9V7"/></symbol>
    <symbol id="i-drop" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3s6 6.5 6 11a6 6 0 01-12 0c0-4.5 6-11 6-11z"/><path d="M9 14a3 3 0 003 3"/></symbol>
    <symbol id="i-scalpel" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20.5 3.5L9 15l-1.5 4.5L12 18 21.5 7z"/><path d="M3 21l4.5-1.5"/></symbol>
    <symbol id="i-phone" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2"/></symbol>
    <symbol id="i-wa" viewBox="0 0 24 24" fill="currentColor"><path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.46-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.42.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35m-5.42 7.4h-.01a9.87 9.87 0 01-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 01-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 012.89 6.99c0 5.45-4.44 9.88-9.88 9.88m8.41-18.3A11.82 11.82 0 0012.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 005.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89a11.82 11.82 0 00-3.48-8.41z"/></symbol>
    <symbol id="i-ig" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></symbol>
    <symbol id="i-fb" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M14 21v-7h3l.5-3.5H14V8.5c0-1 .4-1.7 1.8-1.7h1.9V3.7c-.4 0-1.5-.2-2.7-.2-2.7 0-4.5 1.6-4.5 4.6v2.4H7.5V14h3v7"/></symbol>
    <symbol id="i-yt" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="2.5" y="5" width="19" height="14" rx="4"/><path d="M10 9l5 3-5 3z" fill="currentColor" stroke="none"/></symbol>
    <symbol id="i-li" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10.5V17M8 7.2v.1M12 17v-6.5M12 13.5a2.5 2.5 0 015 0V17"/></symbol>
    <symbol id="i-pin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-7-6.5-7-12a7 7 0 0114 0c0 5.5-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/></symbol>
    <symbol id="i-clock" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></symbol>
    <symbol id="i-mail" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></symbol>
    <symbol id="i-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></symbol>
    <symbol id="i-video" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><rect x="3" y="6" width="13" height="12" rx="2"/><path d="M16 10.5l5-3v9l-5-3"/></symbol>
    <symbol id="i-clinic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 21V9l8-5 8 5v12"/><path d="M10 21v-5h4v5M12 8.5v4M10 10.5h4"/></symbol>
    <symbol id="i-upload" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 15V4M7.5 8.5L12 4l4.5 4.5"/><path d="M4 15v4a2 2 0 002 2h12a2 2 0 002-2v-4"/></symbol>
    <symbol id="i-doc" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h8l5 5v13H6z"/><path d="M14 3v5h5M12.5 11v6M10 14.5l2.5 2.5 2.5-2.5"/></symbol>
    <symbol id="i-award" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><circle cx="12" cy="9" r="6"/><path d="M8.5 14L7 22l5-3 5 3-1.5-8"/></symbol>
    <symbol id="i-hospital" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M12 7v6M9 10h6M9.5 21v-4h5v4"/></symbol>
    <symbol id="i-star" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.5l2.9 6.2 6.8.7-5.1 4.6 1.5 6.7L12 17.3l-6.1 3.4 1.5-6.7-5.1-4.6 6.8-.7z"/></symbol>
    <symbol id="i-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></symbol>
    <symbol id="i-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M20 14.5A8 8 0 019.5 4a8 8 0 1010.5 10.5z"/></symbol>
    <symbol id="i-car" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 16v-4l2-5h10l2 5v4"/><rect x="3" y="12" width="18" height="5" rx="1.5"/><path d="M6 17v2M18 17v2"/><circle cx="7.5" cy="14.5" r=".8" fill="currentColor"/><circle cx="16.5" cy="14.5" r=".8" fill="currentColor"/></symbol>
    <symbol id="i-play" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></symbol>
    <symbol id="i-logo" viewBox="0 0 48 48">
      <path d="M24 3.5l17.75 10.25v20.5L24 44.5 6.25 34.25v-20.5z" fill="none" stroke="currentColor" stroke-width="1.4"/>
      <path d="M24 9.5l12.6 7.25v14.5L24 38.5l-12.6-7.25v-14.5z" fill="none" stroke="currentColor" stroke-width=".6" opacity=".45"/>
      <g fill="#C6A15B"><circle cx="24" cy="3.5" r="2.1"/><circle cx="41.75" cy="13.75" r="1.6"/><circle cx="41.75" cy="34.25" r="1.6"/><circle cx="24" cy="44.5" r="2.1"/><circle cx="6.25" cy="34.25" r="1.6"/><circle cx="6.25" cy="13.75" r="1.6"/></g>
      <text x="24" y="30.5" text-anchor="middle" font-family="Cormorant Garamond, Georgia, serif" font-size="19" font-style="italic" font-weight="600" fill="currentColor">S</text>
    </symbol>
  </defs>
</svg>`;

  const top = `
${SPRITE}
<a class="skip" href="#main">Skip to content</a>
<div class="announce" id="announce" hidden>
  <span id="announce-text"></span><a id="announce-link" href="#"></a>
  <button class="close" aria-label="Dismiss announcement">×</button>
</div>
<header class="nav" id="nav">
  <div class="container">
    <a class="brand" href="index.html" aria-label="Skin Science Center — home">
      <svg aria-hidden="true" style="color:var(--accent)"><use href="#i-logo"/></svg>
      <span class="brand-name">Skin Science Center<small>Dr. Niyati Parikh</small></span>
    </a>
    <nav class="nav-links" aria-label="Primary">${navItems.map(link).join("")}</nav>
    <div class="nav-actions">
      <label class="sr-only" for="lang">Language</label>
      <select id="lang" class="lang-select">
        <option value="en">EN</option><option value="gu">ગુજ</option><option value="hi">हिं</option>
      </select>
      <button class="icon-btn theme-toggle" id="themeToggle" aria-label="Toggle dark mode">
        <svg class="sun"><use href="#i-sun"/></svg><svg class="moon"><use href="#i-moon"/></svg>
      </button>
      <a href="${book}" class="btn btn-primary btn-sm btn-book magnetic"><span class="btn-inner" data-i18n="cta.book">Book Consultation</span></a>
      <button class="icon-btn burger" id="burger" aria-label="Open menu" aria-expanded="false" aria-controls="mobileMenu"><span></span></button>
    </div>
  </div>
</header>
<div class="mobile-menu" id="mobileMenu" aria-hidden="true">
  ${navItems.map(link).join("")}
  <a href="${book}" class="btn btn-primary" data-i18n="cta.book">Book Consultation</a>
</div>`;

  const bottom = `
<footer class="site">
  <div class="container">
    <div class="foot-grid">
      <div class="brand-col">
        <div class="foot-brand">Skin Science<br><em>Center</em></div>
        <p style="max-width:34ch">Dr. Niyati Parikh — MBBS, MD, DNB (Dermatology, Venereology &amp; Leprology), MNAMS. Consultant Dermatologist &amp; Cosmetologist.</p>
        <div class="socials" id="footSocials"></div>
      </div>
      <div>
        <h4>Explore</h4>
        <ul>
          <li><a href="services.html">All treatments</a></li>
          <li><a href="services.html#pricing">Pricing</a></li>
          <li><a href="about.html">About Dr. Parikh</a></li>
          <li><a href="${home}#results">Before &amp; After</a></li>
          <li><a href="journal.html">Journal</a></li>
          <li><a href="services.html#faq">FAQ</a></li>
          <li><a href="${book}">Book appointment</a></li>
        </ul>
      </div>
      <div><h4>Treatments</h4><ul id="footSvcs"></ul></div>
      <div>
        <h4>Visit us</h4>
        <ul class="hours js-hours"></ul>
        <p style="margin-top:18px" class="js-address"></p>
        <p><a href="#" class="js-call js-phone-text"></a></p>
      </div>
    </div>
    <div class="disclaimer-foot">
      <p><strong>Medical disclaimer:</strong> Information on this website is for general education and does not replace a consultation with a qualified dermatologist. Treatment outcomes vary between individuals. Before-and-after images are shared with patient consent and do not guarantee results.</p>
      <div class="bottom">
        <span>© <span id="year"></span> Skin Science Center, Ahmedabad. All rights reserved.</span>
        <span><a href="privacy.html">Privacy policy</a> · <a href="care-guides.html">Care guides</a></span>
      </div>
    </div>
    <div class="foot-word" aria-hidden="true">Skin Science</div>
  </div>
</footer>
<a class="wa-fab js-wa" href="#" aria-label="Chat on WhatsApp"><svg><use href="#i-wa"/></svg></a>
<nav class="mbar" id="mbar" aria-label="Quick actions">
  <a href="#" class="js-call"><svg><use href="#i-phone"/></svg><span data-i18n="cta.call">Call</span></a>
  <a href="#" class="wa js-wa"><svg><use href="#i-wa"/></svg>WhatsApp</a>
  <a href="${book}" class="bk">Book now</a>
</nav>
<div class="cursor-glow" id="glow" aria-hidden="true"></div>
<dialog class="modal" id="svcModal" aria-labelledby="svcModalTitle">
  <div class="modal-scroll"><button class="modal-close" data-close aria-label="Close">×</button><div id="svcModalBody"></div></div>
</dialog>
<dialog class="modal article" id="postModal" aria-labelledby="postModalTitle">
  <div class="modal-scroll"><button class="modal-close" data-close aria-label="Close">×</button><div id="postModalBody"></div></div>
</dialog>`;

  document.body.insertAdjacentHTML("afterbegin", top);
  window.Layout = {
    page,
    homeHref: home,
    bookHref: book,
    bottom() { document.body.insertAdjacentHTML("beforeend", bottom); }
  };
})();
