/* ==========================================================================
   SKIN SCIENCE CENTER — main script (shared by every page)
   Each block only runs if its section exists on the current page.
   ========================================================================== */
(() => {
  "use strict";
  const C = window.SITE_CONFIG;
  const T = window.SITE_CONTENT;
  const I18N = window.SITE_I18N || {};
  const L = window.Layout || { page: "home", homeHref: "", bookHref: "#book" };
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const root = document.documentElement;
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch { /* private mode */ } }
  };

  /* ---------- helpers ---------- */
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const EDIT = '<span class="edit-tag">EDIT</span>';
  const rich = (s) => esc(s).replace(/\[EDIT[^\]]*\]/g, (m) => `<span class="edit-tag" title="${m}">EDIT</span>`);
  const orEdit = (v) => (v == null || v === "" ? EDIT : rich(v));
  const icon = (n) => `<svg aria-hidden="true"><use href="#i-${n}"/></svg>`;
  const img = (url, w, h) => `${url}?auto=format&fit=crop&w=${w}${h ? `&h=${h}` : ""}&q=70&fm=webp`;
  const cats = Object.fromEntries(T.categories.map((c) => [c.id, c]));
  const svcById = Object.fromEntries(T.services.map((s) => [s.id, s]));
  const priceOf = (id) => C.prices[id];
  const inr = (v) => (v != null ? `₹${Number(v).toLocaleString("en-IN")}` : `₹ —${EDIT}`);
  const priceHTML = (id) => inr(priceOf(id));
  const onHome = L.page === "home";
  const bookUrl = (concern) => onHome ? "#book" : `index.html${concern ? `?concern=${encodeURIComponent(concern)}` : ""}#book`;

  if (!C.showEditMarkers) root.classList.add("hide-edits");

  /* ---------- theme ---------- */
  const savedTheme = store.get("ssc-theme");
  if (savedTheme) root.dataset.theme = savedTheme;
  $("#themeToggle").addEventListener("click", () => {
    root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
    store.set("ssc-theme", root.dataset.theme);
  });

  /* ---------- announcement ---------- */
  const ann = $("#announce");
  if (C.announcement?.enabled && store.get("ssc-ann") !== C.announcement.text) {
    $("#announce-text").textContent = C.announcement.text;
    const a = $("#announce-link");
    a.textContent = C.announcement.linkText + " →";
    a.href = C.announcement.link;
    ann.hidden = false;
    $(".close", ann).addEventListener("click", () => { ann.hidden = true; store.set("ssc-ann", C.announcement.text); });
  }

  /* ---------- contact bits ---------- */
  const waLink = (msg = "Hello, I'd like to book a consultation at Skin Science Center.") =>
    C.clinic.whatsapp ? `https://wa.me/${C.clinic.whatsapp}?text=${encodeURIComponent(msg)}` : null;
  if (waLink()) {
    $$(".js-wa").forEach((a) => { a.href = waLink(); a.target = "_blank"; a.rel = "noopener"; });
  } else {
    // No WhatsApp number configured yet: hide WhatsApp buttons instead of showing dead links.
    $$(".js-wa").forEach((a) => a.remove());
    $("#mbar")?.classList.add("no-wa");
  }
  $$(".js-call").forEach((a) => { a.href = C.clinic.phoneHref ? `tel:${C.clinic.phoneHref}` : `${L.homeHref}#contact`; });
  $$(".js-phone-text").forEach((el) => { el.innerHTML = orEdit(C.clinic.phone); });
  $$(".js-address").forEach((el) => { el.innerHTML = rich(C.clinic.addressLine); });
  $$(".js-parking").forEach((el) => { el.innerHTML = rich(C.clinic.parking); });
  const hoursHTML = C.timings.map((t) => `<li><span>${esc(t.days)}</span><span>${rich(t.hours)}</span></li>`).join("");
  $$(".js-hours").forEach((el) => { el.innerHTML = hoursHTML; });
  $$(".js-directions").forEach((a) => { a.href = C.clinic.directionsUrl; });
  $("#year").textContent = new Date().getFullYear();

  /* ---------- socials ---------- */
  const S = C.social;
  const socialHTML = [
    { k: "Instagram", ic: "ig", url: S.instagram },
    { k: "Facebook", ic: "fb", url: S.facebook },
    { k: "YouTube", ic: "yt", url: S.youtube },
    { k: "LinkedIn", ic: "li", url: S.linkedin },
    { k: "WhatsApp", ic: "wa", url: waLink() }
  ].filter((s) => s.url).map((s) => `<a href="${esc(s.url)}" target="_blank" rel="noopener" aria-label="${s.k}">${icon(s.ic)}</a>`).join("");
  $$("#footSocials, #socials").forEach((el) => { el.innerHTML = socialHTML; });

  /* ---------- footer treatments ---------- */
  $("#footSvcs").innerHTML = T.categories.map((c) => `<li><a href="services.html#cat-${c.id}">${esc(c.name)}</a></li>`).join("");

  /* ---------- map (lazy) ---------- */
  const mapEl = $("#map");
  if (mapEl) {
    new IntersectionObserver((entries, io) => {
      if (!entries[0].isIntersecting) return;
      mapEl.innerHTML = `<iframe title="Map: Skin Science Center, Memnagar" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=${encodeURIComponent(C.clinic.mapQuery)}&output=embed"></iframe>`;
      io.disconnect();
    }, { rootMargin: "400px" }).observe(mapEl);
  }

  /* ---------- hero ---------- */
  const heroTitle = $("#heroTitle");
  function splitWords(el) {
    if (!el) return;
    let i = 0;
    const wrap = (text, em) => text.split(/(\s+)/).map((w) => {
      if (!w.trim()) return w;
      const inner = em ? `<em>${w}</em>` : w;
      return `<span class="w"><span style="animation-delay:${0.15 + i++ * 0.08}s">${inner}</span></span>`;
    }).join("");
    el.innerHTML = [...el.childNodes].map((n) => wrap(n.textContent, n.nodeName === "EM")).join("");
  }
  if ($("#marquee")) {
    const conditions = ["Acne", "Pigmentation", "Hair Loss", "Anti-Aging", "Psoriasis", "Eczema", "Vitiligo", "Melasma", "Acne Scars", "Fungal Infections", "Urticaria", "Warts", "Alopecia", "Unwanted Hair", "Keloids", "Dull Skin"];
    const mq = conditions.map((c) => `<span>${c}</span>`).join("");
    $("#marquee").innerHTML = mq + mq;
  }
  if (C.images.heroVideo && !reduced && $("#heroMedia")) {
    const v = document.createElement("video");
    Object.assign(v, { src: C.images.heroVideo, muted: true, loop: true, autoplay: true, playsInline: true });
    $("#heroMedia").replaceChildren(v);
  }

  /* ---------- statement word highlight ---------- */
  const stmt = $("#statement");
  let stmtWords = [];
  if (stmt) {
    const out = [];
    stmt.childNodes.forEach((n) => n.textContent.split(/(\s+)/).forEach((w) => {
      if (!w.trim()) return out.push(w);
      out.push(n.nodeName === "EM" ? `<em class="word">${w}</em>` : `<span class="word">${w}</span>`);
    }));
    stmt.innerHTML = out.join("");
    stmtWords = $$(".word", stmt);
  }
  $$(".js-svc-count").forEach((el) => { el.textContent = T.services.length; });

  /* ---------- i18n ---------- */
  const originals = new Map();
  $$("[data-i18n],[data-i18n-html]").forEach((el) => originals.set(el, el.dataset.i18nHtml ? el.innerHTML : el.textContent));
  function applyLang(lang) {
    const dict = I18N[lang] || {};
    originals.forEach((orig, el) => {
      const key = el.dataset.i18n || el.dataset.i18nHtml;
      const val = lang === "en" ? orig : dict[key] ?? orig;
      if (el.dataset.i18nHtml) el.innerHTML = val; else el.textContent = val;
    });
    root.lang = lang;
    splitWords(heroTitle);
    store.set("ssc-lang", lang);
  }
  const langSel = $("#lang");
  langSel.value = store.get("ssc-lang") || "en";
  applyLang(langSel.value);
  langSel.addEventListener("change", () => applyLang(langSel.value));

  /* ---------- category cards (home) ---------- */
  const catGrid = $("#catGrid");
  if (catGrid) {
    catGrid.innerHTML = T.categories.map((c, i) => {
      const list = T.services.filter((s) => s.cat === c.id);
      return `<a class="card hover cat-card reveal" style="--d:${(i % 3) * 0.08}s" href="services.html#cat-${c.id}">
        <span class="ic">${icon(c.icon)}</span>
        <h3>${esc(c.name)}</h3>
        <p>${list.slice(0, 4).map((s) => esc(s.name.replace(/\s*\(.*\)/, ""))).join(" · ")}${list.length > 4 ? " & more" : ""}</p>
        <span class="cat-foot"><span>${list.length} treatments</span><span class="more">${icon("arrow")}</span></span>
      </a>`;
    }).join("");
  }

  /* ---------- services grid (services page) ---------- */
  const grid = $("#svcGrid");
  function applyCat(id) {
    const b = $(`#filters [data-f="${id}"]`) || $('#filters [data-f="all"]');
    $$("#filters .chip").forEach((c) => { c.classList.toggle("active", c === b); c.setAttribute("aria-pressed", c === b); });
    $$(".svc", grid).forEach((card) => {
      const show = b.dataset.f === "all" || card.dataset.cat === b.dataset.f;
      card.classList.toggle("hidden", !show);
      if (show) card.classList.add("in");
    });
  }
  if (grid) {
    grid.innerHTML = T.services.map((s, i) => `
      <button class="card hover svc reveal" style="--d:${(i % 3) * 0.06}s" data-id="${s.id}" data-cat="${s.cat}" aria-label="${esc(s.name)} — view details">
        <div class="top"><span class="ic">${icon(cats[s.cat].icon)}</span><span class="cat">${esc(cats[s.cat].name)}</span></div>
        <h3>${esc(s.name)}</h3>
        <p>${esc(s.short)}</p>
        <div class="meta"><span>${esc(s.sessions.split(",")[0])}</span><span>Downtime: ${esc(s.downtime.split(";")[0])}</span></div>
        <div class="foot"><span class="price-from">Starting from<b>${priceHTML(s.id)}</b></span><span class="more">${icon("arrow")}</span></div>
      </button>`).join("");
    $("#filters").innerHTML = [`<button class="chip active" data-f="all" aria-pressed="true">All treatments</button>`]
      .concat(T.categories.map((c) => `<button class="chip" data-f="${c.id}" aria-pressed="false">${esc(c.name)}</button>`)).join("");
    $("#filters").addEventListener("click", (e) => { const b = e.target.closest(".chip"); if (b) applyCat(b.dataset.f); });
    grid.addEventListener("click", (e) => { const c = e.target.closest(".svc"); if (c) openService(c.dataset.id); });
    grid.addEventListener("pointermove", (e) => {
      const c = e.target.closest(".svc"); if (!c) return;
      const r = c.getBoundingClientRect();
      c.style.setProperty("--mx", `${e.clientX - r.left}px`); c.style.setProperty("--my", `${e.clientY - r.top}px`);
    });
  }

  /* ---------- modals ---------- */
  let lenis = null;
  function openDialog(d) { if (typeof d.showModal === "function") d.showModal(); else d.setAttribute("open", ""); lenis?.stop(); }
  function closeDialog(d) { d.close ? d.close() : d.removeAttribute("open"); }
  $$("dialog.modal").forEach((d) => {
    $(".modal-scroll", d).setAttribute("data-lenis-prevent", "");
    d.addEventListener("click", (e) => { if (e.target === d || e.target.closest("[data-close]")) closeDialog(d); });
    d.addEventListener("close", () => {
      lenis?.start();
      if (/^#(treatment|journal)\//.test(location.hash)) history.replaceState(null, "", location.pathname + location.search);
    });
  });

  function openService(id) {
    const s = svcById[id]; if (!s) return;
    const c = cats[s.cat];
    const faqs = s.faqs.concat(T.categoryFaqs[s.cat] || []);
    $("#svcModalBody").innerHTML = `
      <div class="m-hero">
        <div class="ic">${icon(c.icon)}</div>
        <p class="eyebrow">${esc(c.name)}</p>
        <h2 id="svcModalTitle">${esc(s.name)}</h2>
        <p class="lead">${esc(s.short)}</p>
      </div>
      <div class="m-body">
        <div class="facts">
          <div><b>Sessions</b><span>${esc(s.sessions)}</span></div>
          <div><b>Downtime</b><span>${esc(s.downtime)}</span></div>
          <div><b>Results</b><span>${esc(s.results)}</span></div>
          <div><b>Who it suits</b><span>${esc(s.suits)}</span></div>
        </div>
        <h4>How it works</h4>
        <ol class="how">${s.steps.map((st) => `<li>${esc(st)}</li>`).join("")}</ol>
        <h4>Frequently asked</h4>
        ${faqs.map(([q, a]) => `<details class="qa"><summary>${esc(q)}<i aria-hidden="true"></i></summary><div class="ans">${rich(a)}</div></details>`).join("")}
        <p style="margin-top:24px"><a class="link-arrow" href="${L.homeHref}#results" data-close-go>See real patient results ${icon("arrow")}</a></p>
        <div class="m-price">
          <div><small>Starting from</small><b>${priceHTML(s.id)}</b><small>Final cost depends on consultation.</small></div>
          <a href="${bookUrl(s.name)}" class="btn btn-light" data-book="${s.id}"><span class="btn-inner">Book consultation ${icon("arrow")}</span></a>
        </div>
      </div>`;
    $$("#svcModalBody [data-close-go], #svcModalBody [data-book]").forEach((a) => a.addEventListener("click", (e) => {
      closeDialog($("#svcModal"));
      if (a.dataset.book && onHome) { e.preventDefault(); preselect(s.name); goTo("#book"); }
      else if (onHome && a.hasAttribute("data-close-go")) { e.preventDefault(); goTo("#results"); }
    }));
    history.replaceState(null, "", `${location.pathname}${location.search}#treatment/${s.id}`);
    openDialog($("#svcModal"));
    $("#svcModal .modal-scroll").scrollTop = 0;
  }

  function openPost(id) {
    const b = T.blog.find((x) => x.id === id); if (!b) return;
    $("#postModalBody").innerHTML = `
      <div class="cover"><img src="${img(C.images[b.img], 1400, 600)}" alt=""></div>
      <div class="m-hero" style="background:none;padding-bottom:10px"><p class="eyebrow">${esc(b.tag)} · ${esc(b.read)} read</p><h2 id="postModalTitle">${esc(b.title)}</h2></div>
      <div class="m-body">${b.body.map((p) => `<p>${esc(p)}</p>`).join("")}
        <p style="font-size:.85rem;color:var(--muted);border-top:1px solid var(--line);padding-top:16px;margin-top:30px">For general education only — not a substitute for a consultation.</p>
        <a href="${bookUrl()}" class="btn btn-primary"><span class="btn-inner">Book a consultation ${icon("arrow")}</span></a></div>`;
    history.replaceState(null, "", `${location.pathname}#journal/${b.id}`);
    openDialog($("#postModal"));
    $("#postModal .modal-scroll").scrollTop = 0;
  }

  /* ---------- pricing (services page) ---------- */
  if ($("#feeCard")) {
    $("#feeCard").innerHTML = `
      <p class="eyebrow" style="color:var(--gold)">Consultation</p>
      <h3>Consultation fees</h3>
      <div class="fee-row"><span>In-clinic consultation</span><b>${inr(C.consultation.inClinic)}</b></div>
      <div class="fee-row"><span>Video consultation</span><b>${inr(C.consultation.video)}</b></div>
      <div class="fee-row"><span>Follow-up</span><b style="font-size:1.1rem">${orEdit(C.consultation.followUp)}</b></div>
      <p class="note">${rich(C.consultation.note)}</p>
      <a href="${bookUrl()}" class="btn btn-light btn-sm"><span class="btn-inner">Book now ${icon("arrow")}</span></a>`;
  }
  const tbody = $("#priceTable tbody");
  if (tbody) {
    let sortKey = "cat", sortDir = 1, query = "";
    const render = () => {
      const rows = T.services
        .filter((s) => !query || (s.name + cats[s.cat].name).toLowerCase().includes(query))
        .sort((a, b) => {
          if (sortKey === "price") {
            const pa = priceOf(a.id), pb = priceOf(b.id);
            if (pa == null && pb == null) return a.name.localeCompare(b.name);
            if (pa == null) return 1; if (pb == null) return -1;
            return (pa - pb) * sortDir;
          }
          if (sortKey === "cat") return (T.categories.indexOf(cats[a.cat]) - T.categories.indexOf(cats[b.cat])) * sortDir;
          return a.name.localeCompare(b.name) * sortDir;
        });
      tbody.innerHTML = rows.map((s) => `<tr><td><a href="#treatment/${s.id}" data-open="${s.id}">${esc(s.name)}</a></td><td class="cat-pill">${esc(cats[s.cat].name)}</td><td>${priceHTML(s.id)}</td></tr>`).join("")
        || `<tr><td colspan="3" style="text-align:center;color:var(--muted)">No treatments match “${esc(query)}”.</td></tr>`;
      $$("#priceTable th button").forEach((b) => {
        if (b.dataset.sort === sortKey) b.setAttribute("aria-sort", sortDir > 0 ? "ascending" : "descending"); else b.removeAttribute("aria-sort");
      });
    };
    render();
    $("#priceTable thead").addEventListener("click", (e) => {
      const b = e.target.closest("button"); if (!b) return;
      sortDir = sortKey === b.dataset.sort ? -sortDir : 1; sortKey = b.dataset.sort; render();
    });
    $("#priceSearch").addEventListener("input", (e) => { query = e.target.value.trim().toLowerCase(); render(); });
    tbody.addEventListener("click", (e) => { const a = e.target.closest("[data-open]"); if (a) { e.preventDefault(); openService(a.dataset.open); } });
  }

  /* ---------- about: timeline / why ---------- */
  const tl = $("#timeline");
  if (tl) tl.insertAdjacentHTML("beforeend", T.timeline.map((t, i) => `<div class="tl-item reveal" style="--d:${i * 0.07}s"><b>${esc(t.step)}</b><p>${esc(t.text)}</p></div>`).join(""));
  if ($("#whyGrid")) $("#whyGrid").innerHTML = T.whyUs.map((w, i) => `<div class="card hover why reveal" style="--d:${i * 0.08}s"><span class="num">0${i + 1}</span><h3>${esc(w.title)}</h3><p>${rich(w.text)}</p></div>`).join("");

  /* ---------- clinic gallery ---------- */
  const tour = $("#tour");
  if (tour) {
    tour.innerHTML = C.images.clinic.map((x, i) => `
      <figure><img src="${esc(x.src)}" alt="${esc(x.title)} at Skin Science Center, Memnagar" loading="lazy">
        <figcaption><div><b>${esc(x.title)}</b><span>${esc(x.text)}</span></div><span class="idx">0${i + 1}</span></figcaption></figure>`).join("");
    const step = () => tour.querySelector("figure").offsetWidth + 18;
    $("#tourNext")?.addEventListener("click", () => tour.scrollBy({ left: step(), behavior: "smooth" }));
    $("#tourPrev")?.addEventListener("click", () => tour.scrollBy({ left: -step(), behavior: "smooth" }));
  }

  /* ---------- results (real, consented) ---------- */
  const rg = $("#resultGrid");
  if (rg) {
    rg.innerHTML = C.images.results.map((r, i) => `
      <figure class="card result reveal" style="--d:${(i % 2) * 0.1}s">
        <div class="pair">
          <div><img src="${esc(r.before)}" alt="${esc(r.title)} — before treatment" loading="lazy"><span class="lbl">Before</span></div>
          <div><img src="${esc(r.after)}" alt="${esc(r.title)} — after treatment" loading="lazy"><span class="lbl after">After</span></div>
        </div>
        <figcaption><b>${esc(r.title)}</b><span>${esc(r.tag)}</span></figcaption>
      </figure>`).join("");
  }

  /* ---------- reviews ---------- */
  const R = C.reviews;
  if ($("#ratingRow")) {
    $("#ratingRow").innerHTML = `
      <a class="card rating-badge" ${R.googleUrl ? `href="${esc(R.googleUrl)}" target="_blank" rel="noopener"` : ""}><span class="logo g">G</span><div>${R.googleRating ? `<b>${esc(R.googleRating)}</b> ` : ""}<span class="stars" aria-label="5 star reviews">★★★★★</span><small>${R.googleCount ? esc(R.googleCount) + " reviews" : "Patient reviews"} on Google</small></div></a>
      <a class="card rating-badge" ${R.justdialUrl ? `href="${esc(R.justdialUrl)}" target="_blank" rel="noopener"` : ""}><span class="logo jd">Jd</span><div>${R.justdialRating ? `<b>${esc(R.justdialRating)}</b> ` : ""}<span class="stars" aria-hidden="true">★★★★★</span><small>${esc(R.justdialCount)} reviews on Justdial</small></div></a>`;
  }
  if ($("#reviewsTrack")) {
    const card = (r, hidden) => `
      <article class="card review"${hidden ? ' aria-hidden="true"' : ""}>
        <div class="stars" aria-label="${r.rating} out of 5 stars">${"★".repeat(r.rating)}</div>
        <p>“${esc(r.text)}”</p>
        <div class="who"><span class="av">${esc(r.name[0])}</span><div><b>${esc(r.name)}</b><div class="src">${icon("star")} ${esc(r.source)} review</div></div></div>
      </article>`;
    const items = R.items.filter((r) => r.text && r.name);
    $("#reviewsTrack").innerHTML = items.map((r) => card(r)).join("") + items.map((r) => card(r, true)).join("");
    $("#reviewsTrack").addEventListener("click", (e) => e.target.closest(".review")?.classList.toggle("open"));
  }
  if ($("#reviewLinks")) {
    $("#reviewLinks").innerHTML = [
      R.googleUrl && `<a class="btn btn-primary btn-sm" href="${esc(R.googleUrl)}" target="_blank" rel="noopener"><span class="btn-inner">Read all on Google ${icon("arrow")}</span></a>`,
      R.justdialUrl && `<a class="btn btn-ghost btn-sm" href="${esc(R.justdialUrl)}" target="_blank" rel="noopener"><span class="btn-inner">Justdial reviews ${icon("arrow")}</span></a>`
    ].filter(Boolean).join("");
  }
  if (R.videoTestimonialUrl && $("#videoFrame")) $("#videoFrame").innerHTML = `<iframe src="${esc(R.videoTestimonialUrl)}" title="Patient video testimonial" loading="lazy" allowfullscreen></iframe>`;

  /* ---------- offers & guides (services page) ---------- */
  if ($("#offerGrid")) {
    $("#offerGrid").innerHTML = C.offers.map((o, i) => `
      <div class="offer reveal" style="--d:${i * 0.1}s">
        <span class="tag">${esc(o.tag)}</span>
        <h3>${esc(o.name)}</h3>
        <p class="dur">${rich(o.duration)}</p>
        <ul>${o.includes.map((x) => `<li><span>${rich(x)}</span></li>`).join("")}</ul>
        <div class="p"><small>Package price</small>${inr(o.price)}</div>
        <a href="${bookUrl(o.name)}" class="btn btn-light btn-sm"><span class="btn-inner">Enquire ${icon("arrow")}</span></a>
      </div>`).join("");
  }
  if ($("#guides")) {
    $("#guides").innerHTML = C.careGuides.map((g, i) => `
      <a class="guide reveal" style="--d:${i * 0.06}s" href="${esc(g.href)}" target="_blank" rel="noopener">${icon("doc")}<span>${esc(g.name)}<small>Printable guide · Save as PDF</small></span></a>`).join("");
  }

  /* ---------- social grid (journal page) ---------- */
  if ($("#igGrid")) {
    const pics = [C.images.clinic[0].src, C.images.doctorClinic, C.images.clinic[1].src, C.images.results[3].after, C.images.clinic[2].src, C.images.clinic[3].src];
    $("#igGrid").innerHTML = pics.map((p, i) => `
      <a class="ig reveal" style="--d:${i * 0.05}s" href="${esc(S.instagram)}" target="_blank" rel="noopener" aria-label="View @skinsciencecenter on Instagram">
        <img src="${esc(p)}" alt="" loading="lazy"><span class="ov">${icon("ig")}</span></a>`).join("");
  }

  /* ---------- journal ---------- */
  if ($("#blogGrid")) {
    $("#blogGrid").innerHTML = T.blog.map((b, i) => `
      <button class="card hover post reveal" style="--d:${i * 0.08}s" data-post="${b.id}">
        <div class="img"><img src="${img(C.images[b.img], 700, 480)}" alt="" loading="lazy" width="700" height="480"></div>
        <div class="body"><span class="tag">${esc(b.tag)} · ${esc(b.read)} read</span><h3>${esc(b.title)}</h3><p>${esc(b.excerpt)}</p><span class="link-arrow">Read article ${icon("arrow")}</span></div>
      </button>`).join("");
    $("#blogGrid").addEventListener("click", (e) => { const p = e.target.closest("[data-post]"); if (p) openPost(p.dataset.post); });
  }
  if ($("#mythGrid")) {
    $("#mythGrid").innerHTML = T.myths.map((m, i) => `
      <button class="flip reveal" style="--d:${(i % 3) * 0.08}s" aria-label="Myth: ${esc(m.myth)} — tap to reveal the fact">
        <div class="flip-inner">
          <div class="flip-face front"><span class="k">Myth</span><p>${esc(m.myth)}</p><small>Tap to reveal the fact ↻</small></div>
          <div class="flip-face back"><span class="k">Fact</span><p>${esc(m.fact)}</p><small style="color:rgba(241,233,223,.6)">Skin Science Center</small></div>
        </div>
      </button>`).join("");
    $("#mythGrid").addEventListener("click", (e) => e.target.closest(".flip")?.classList.toggle("on"));
  }

  /* ---------- FAQ ---------- */
  if ($("#faqTabs")) {
    const keys = Object.keys(T.faqs);
    const renderFaq = (k) => {
      $$("#faqTabs .chip").forEach((c) => { c.classList.toggle("active", c.dataset.k === k); c.setAttribute("aria-selected", c.dataset.k === k); });
      $("#faqList").innerHTML = T.faqs[k].map(([q, a], i) => `<details class="qa" ${i === 0 ? "open" : ""}><summary>${esc(q)}<i aria-hidden="true"></i></summary><div class="ans">${rich(a)}</div></details>`).join("");
    };
    $("#faqTabs").innerHTML = keys.map((k) => `<button class="chip" role="tab" data-k="${esc(k)}">${esc(k)}</button>`).join("");
    $("#faqTabs").addEventListener("click", (e) => { const b = e.target.closest(".chip"); if (b) renderFaq(b.dataset.k); });
    renderFaq(keys[0]);
    $("#faqList").addEventListener("toggle", (e) => {
      if (e.target.open) $$("#faqList details").forEach((d) => { if (d !== e.target) d.open = false; });
    }, true);
  }

  /* ---------- BOOKING (home) ---------- */
  const form = $("#bookForm");
  const fConcern = $("#fConcern");
  function preselect(name) {
    if (!fConcern || !name) return;
    const svc = svcById[name];
    fConcern.value = svc ? svc.name : name;
  }
  if (form) {
    fConcern.insertAdjacentHTML("beforeend",
      `<option value="General consultation">General consultation / not sure</option>` +
      T.categories.map((c) => `<optgroup label="${esc(c.name)}">${T.services.filter((s) => s.cat === c.id).map((s) => `<option value="${esc(s.name)}">${esc(s.name)}</option>`).join("")}</optgroup>`).join("") +
      `<optgroup label="Packages">${C.offers.map((o) => `<option value="${esc(o.name)}">${esc(o.name)}</option>`).join("")}</optgroup>`);
    preselect(new URLSearchParams(location.search).get("concern"));

    const today = new Date(); today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
    $("#fDate").min = today.toISOString().slice(0, 10);
    $("#slots").innerHTML = C.booking.timeSlots.map((t) => `<button type="button" class="chip" role="radio" aria-checked="false" data-v="${esc(t)}">${esc(t)}</button>`).join("");
    $("#slots").addEventListener("click", (e) => {
      const b = e.target.closest(".chip"); if (!b) return;
      $$("#slots .chip").forEach((c) => { c.classList.toggle("active", c === b); c.setAttribute("aria-checked", c === b); });
      $("#fTime").value = b.dataset.v;
      $("#fTime").closest(".field").classList.remove("invalid");
    });
    $("#fPhoto").addEventListener("change", (e) => {
      $("#photoPreview").innerHTML = "";
      [...e.target.files].slice(0, 3).forEach((f) => $("#photoPreview").insertAdjacentHTML("beforeend", `<img src="${URL.createObjectURL(f)}" alt="Selected photo: ${esc(f.name)}">`));
    });

    const fsteps = $$(".fstep", form), heads = $$(".steps-head li", form);
    let fstep = 0;
    const showF = (n) => {
      fstep = n;
      fsteps.forEach((s, i) => s.classList.toggle("active", i === n));
      heads.forEach((h, i) => h.classList.toggle("on", i <= n));
      $("#fBack").hidden = n === 0;
      $("#fNext .btn-inner").innerHTML = `${n === 2 ? "Request appointment" : "Continue"} ${icon("arrow")}`;
    };
    const validate = (n) => {
      let ok = true;
      const mark = (el, bad) => { el.closest(".field")?.classList.toggle("invalid", bad); if (bad) ok = false; };
      if (n === 0) mark(fConcern, !fConcern.value);
      if (n === 1) { mark($("#fDate"), !$("#fDate").value); mark($("#fTime"), !$("#fTime").value); }
      if (n === 2) {
        mark($("#fName"), !$("#fName").value.trim());
        mark($("#fPhone"), !/^[0-9+\s-]{10,15}$/.test($("#fPhone").value.trim()));
        const cons = $("#fConsent").checked;
        $(".consent").classList.toggle("bad", !cons);
        if (!cons) ok = false;
      }
      if (!ok) form.querySelector(".fstep.active .invalid input, .fstep.active .invalid select")?.focus();
      return ok;
    };
    $("#fBack").addEventListener("click", () => showF(fstep - 1));
    $("#fNext").addEventListener("click", async () => {
      if (!validate(fstep)) return;
      if (fstep < 2) return showF(fstep + 1);
      const data = new FormData(form);
      const summary = `Appointment request — Skin Science Center
Mode: ${data.get("mode")}
Concern: ${data.get("concern")}
Preferred: ${data.get("date")}, ${data.get("time")}
Name: ${data.get("name")}
Phone: ${data.get("phone")}${data.get("age") ? `\nAge: ${data.get("age")}` : ""}${data.get("notes") ? `\nNotes: ${data.get("notes")}` : ""}`;
      const btn = $("#fNext"); btn.disabled = true;
      let msg = "Our team will call you to confirm your appointment.";
      try {
        if (C.booking.formEndpoint) {
          const res = await fetch(C.booking.formEndpoint, { method: "POST", body: data, headers: { Accept: "application/json" } });
          if (!res.ok) throw new Error(res.status);
        } else if (C.clinic.whatsapp) {
          window.open(waLink(summary), "_blank", "noopener");
          msg = "We've opened WhatsApp with your details — just tap send. We'll confirm your slot shortly.";
        } else {
          // No backend connected yet — be honest and give the phone number.
          console.info(summary);
          msg = `Online booking isn't connected yet. Please call ${C.clinic.phone} to confirm this appointment.`;
        }
        form.style.display = "none";
        $("#successMsg").textContent = msg;
        $("#bookSuccess").classList.add("show");
      } catch {
        alert(`Sorry, something went wrong. Please call the clinic on ${C.clinic.phone}.`);
      } finally { btn.disabled = false; }
    });
  }

  /* ---------- newsletter ---------- */
  $("#nlForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = $("#nlEmail").value.trim();
    const m = $("#nlMsg");
    if (!/^\S+@\S+\.\S+$/.test(email)) { m.textContent = "Please enter a valid email."; return; }
    try {
      if (C.booking.newsletterEndpoint) await fetch(C.booking.newsletterEndpoint, { method: "POST", body: new URLSearchParams({ email }) });
      m.textContent = "Thank you — you're on the list.";
      e.target.reset();
    } catch { m.textContent = "Couldn't subscribe right now. Please try again."; }
  });

  /* ---------- CONCERN FINDER (home) ---------- */
  if ($("#quiz")) {
    const F = T.finder;
    const quiz = { step: 0, concern: null, type: null, goal: null };
    $("#qConcern").innerHTML = F.concerns.map((c) => `<button class="chip" data-v="${c.id}" aria-pressed="false">${esc(c.label)}</button>`).join("");
    $("#qType").innerHTML = F.types.map((t) => `<button class="chip" data-v="${esc(t)}" aria-pressed="false">${esc(t)}</button>`).join("");
    $("#qGoal").innerHTML = F.goals.map((g) => `<button class="chip" data-v="${g.id}" aria-pressed="false">${esc(g.label)}</button>`).join("");
    const steps = $$(".quiz-step"), bars = $$(".quiz-progress i");
    const showStep = (n) => {
      quiz.step = n;
      steps.forEach((s, i) => s.classList.toggle("active", i === n));
      bars.forEach((b, i) => b.classList.toggle("done", i < n || n === 3));
      $("#qBack").disabled = n === 0 || n === 3;
      $("#qRestart").hidden = n !== 3;
      if (n === 3) renderRecs();
    };
    const pick = (groupId, key, next) => $(groupId).addEventListener("click", (e) => {
      const b = e.target.closest(".chip"); if (!b) return;
      $$(".chip", $(groupId)).forEach((c) => c.setAttribute("aria-pressed", c === b));
      quiz[key] = b.dataset.v;
      if (key === "concern") $$(".hotspot").forEach((h) => h.classList.toggle("on", h.dataset.concern === quiz.concern));
      setTimeout(() => showStep(next), reduced ? 0 : 260);
    });
    pick("#qConcern", "concern", 1); pick("#qType", "type", 2); pick("#qGoal", "goal", 3);
    $("#qBack").addEventListener("click", () => showStep(Math.max(0, quiz.step - 1)));
    $("#qRestart").addEventListener("click", () => {
      Object.assign(quiz, { concern: null, type: null, goal: null });
      $$("#quiz .chip").forEach((c) => c.setAttribute("aria-pressed", "false"));
      $$(".hotspot").forEach((h) => h.classList.remove("on"));
      showStep(0);
    });
    $$(".hotspot").forEach((h) => h.addEventListener("click", () => {
      $(`#qConcern .chip[data-v="${h.dataset.concern}"]`)?.click();
      if (innerWidth < 980) goTo("#quiz");
    }));
    function renderRecs() {
      const concern = F.concerns.find((c) => c.id === quiz.concern);
      let ids = [...concern.recs];
      const noDown = (id) => /^none/i.test(svcById[id].downtime);
      const medical = (id) => ["medical", "hair"].includes(svcById[id].cat);
      if (quiz.goal === "nodowntime") ids.sort((a, b) => noDown(b) - noDown(a));
      if (quiz.goal === "event" && !["rash", "growths"].includes(quiz.concern)) ids = [...new Set(["hydrafacial", "boosters", ...ids])];
      if (quiz.goal === "medical") ids.sort((a, b) => medical(b) - medical(a));
      ids = ids.slice(0, 3);
      const notes = [];
      if (quiz.type === "Sensitive") notes.push("Because your skin is sensitive, the doctor will start gently and patch-test where relevant.");
      if (quiz.type === "Not sure") notes.push("Not sure of your skin type? The doctor will assess it at your visit.");
      if (quiz.goal === "event") notes.push("For events, start 4–8 weeks ahead for the best results.");
      notes.push("This is a guide, not a diagnosis — your final plan is made at consultation.");
      $("#qResultTitle").textContent = `For ${concern.label.toLowerCase()}`;
      $("#qResultNote").textContent = notes.join(" ");
      $("#qRecs").innerHTML = ids.map((id) => {
        const s = svcById[id];
        return `<button class="rec" data-id="${id}"><span class="ic">${icon(cats[s.cat].icon)}</span><span><b>${esc(s.name)}</b><small>${esc(s.results)} · Downtime: ${esc(s.downtime.split(";")[0])}</small></span><span class="go">${icon("arrow")}</span></button>`;
      }).join("");
      $("#qBook").dataset.svc = ids[0];
    }
    $("#qRecs").addEventListener("click", (e) => { const r = e.target.closest(".rec"); if (r) openService(r.dataset.id); });
    $("#qBook").addEventListener("click", (e) => { e.preventDefault(); preselect($("#qBook").dataset.svc); goTo("#book"); });
  }

  /* ==========================================================================
     NAVIGATION & MOTION
     ========================================================================== */
  const navEl = $("#nav");
  const navH = () => navEl.offsetHeight;
  function goTo(sel) {
    const t = typeof sel === "string" ? $(sel) : sel; if (!t) return;
    if (lenis) lenis.scrollTo(t, { offset: -navH() - 10, duration: 1.4 });
    else t.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
  }

  const burger = $("#burger"), mm = $("#mobileMenu");
  const setMenu = (open) => {
    document.body.classList.toggle("menu-open", open);
    burger.setAttribute("aria-expanded", open);
    mm.setAttribute("aria-hidden", !open);
    open ? lenis?.stop() : lenis?.start();
  };
  burger.addEventListener("click", () => setMenu(!document.body.classList.contains("menu-open")));
  addEventListener("keydown", (e) => { if (e.key === "Escape" && document.body.classList.contains("menu-open")) setMenu(false); });

  // Same-page anchor links scroll smoothly; other pages navigate normally.
  document.addEventListener("click", (e) => {
    const a = e.target.closest("a[href]");
    if (!a || e.defaultPrevented || a.target === "_blank") return;
    if (a.getAttribute("href") === "#") { e.preventDefault(); return; }
    if (a.origin !== location.origin || a.pathname !== location.pathname || !a.hash) return;
    const h = a.hash;
    if (/^#(treatment|journal)\//.test(h)) return;
    if (h.startsWith("#cat-") && grid) { e.preventDefault(); setMenu(false); applyCat(h.slice(5)); goTo("#all"); return; }
    const t = document.getElementById(h.slice(1)); if (!t) return;
    e.preventDefault();
    if (document.body.classList.contains("menu-open")) setMenu(false);
    goTo(t);
  });

  // Deep links: #treatment/<id>, #journal/<id>, #cat-<id>
  function route() {
    const h = location.hash;
    if (h.startsWith("#treatment/")) return openService(h.split("/")[1]);
    if (h.startsWith("#journal/")) return openPost(h.split("/")[1]);
    if (h.startsWith("#cat-") && grid) applyCat(h.slice(5));
    $$("dialog.modal[open]").forEach(closeDialog);
  }
  setTimeout(route, 300);
  addEventListener("hashchange", route);

  // Reveal on scroll
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
  $$(".reveal").forEach((el) => io.observe(el));

  // Scroll-driven effects
  const parallax = $$("[data-speed]");
  const mbar = $("#mbar");
  const hero = $("#top") || $(".page-hero");
  let lastY = 0;
  function onScroll(y) {
    navEl.classList.toggle("scrolled", y > 20);
    navEl.classList.toggle("hide", y > lastY && y > 600 && !document.body.classList.contains("menu-open"));
    lastY = y;
    mbar.classList.toggle("show", y > (hero ? hero.offsetHeight * 0.5 : 300));
    if (reduced) return;
    const vh = innerHeight;
    parallax.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) return;
      el.style.transform = `translate3d(0, ${((r.top + r.height / 2 - vh / 2) * parseFloat(el.dataset.speed)).toFixed(1)}px, 0)`;
    });
    if (stmt) {
      const sr = stmt.getBoundingClientRect();
      const n = Math.round(Math.min(1, Math.max(0, (vh * 0.85 - sr.top) / (sr.height + vh * 0.35))) * stmtWords.length);
      stmtWords.forEach((w, i) => w.classList.toggle("on", i < n));
    }
    if (tl) {
      const tr = tl.getBoundingClientRect();
      const tp = Math.min(1, Math.max(0, (vh * 0.75 - tr.top) / tr.height));
      if (innerWidth >= 980) tl.style.setProperty("--tl", (tp * 100).toFixed(1) + "%");
      else $(".tl-line", tl).style.height = (tp * tr.height).toFixed(0) + "px";
      $$(".tl-item", tl).forEach((it) => it.classList.toggle("in", it.getBoundingClientRect().top < vh * 0.75));
    }
  }
  function initScroll() {
    if (!reduced && window.Lenis) {
      lenis = new window.Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
      lenis.on("scroll", ({ scroll }) => onScroll(scroll));
      const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
    } else {
      let ticking = false;
      addEventListener("scroll", () => {
        if (ticking) return; ticking = true;
        requestAnimationFrame(() => { onScroll(scrollY); ticking = false; });
      }, { passive: true });
    }
    // Re-apply anchor position once JS-rendered content has laid out
    const h = location.hash;
    const target = h.startsWith("#cat-") ? $("#all") : (h && !/^#(treatment|journal)\//.test(h) ? document.getElementById(h.slice(1)) : null);
    if (target) {
      if (lenis) lenis.scrollTo(target, { offset: -navH() - 10, immediate: true });
      else scrollTo(0, target.getBoundingClientRect().top + scrollY - navH() - 10);
    }
    onScroll(scrollY);
  }
  if (document.readyState === "complete") initScroll(); else addEventListener("load", initScroll);

  // Magnetic buttons + cursor glow (desktop only)
  if (finePointer && !reduced) {
    $$(".magnetic").forEach((b) => {
      const inner = $(".btn-inner", b) || b;
      b.addEventListener("pointermove", (e) => {
        const r = b.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2, y = e.clientY - r.top - r.height / 2;
        b.style.transform = `translate(${x * 0.18}px, ${y * 0.25}px)`;
        inner.style.transform = `translate(${x * 0.08}px, ${y * 0.12}px)`;
      });
      b.addEventListener("pointerleave", () => {
        b.style.transition = "transform .6s cubic-bezier(.22,1,.36,1)";
        b.style.transform = ""; inner.style.transform = "";
        setTimeout(() => (b.style.transition = ""), 600);
      });
    });
    const glow = $("#glow");
    let gx = innerWidth / 2, gy = innerHeight / 2, tx = gx, ty = gy;
    addEventListener("pointermove", (e) => { tx = e.clientX; ty = e.clientY; glow.classList.add("on"); }, { passive: true });
    document.addEventListener("pointerleave", () => glow.classList.remove("on"));
    (function loop() {
      gx += (tx - gx) * 0.12; gy += (ty - gy) * 0.12;
      glow.style.transform = `translate3d(${gx}px, ${gy}px, 0)`;
      requestAnimationFrame(loop);
    })();
  }

  /* ---------- molecular canvas (hero) ---------- */
  const cv = $("#molecule");
  if (cv) (function molecules() {
    const ctx = cv.getContext("2d");
    const host = cv.parentElement;
    let w, h, nodes = [], hexes = [], running = true;
    const mouse = { x: -999, y: -999 };
    function resize() {
      const dpr = Math.min(2, devicePixelRatio || 1);
      w = cv.offsetWidth; h = cv.offsetHeight;
      cv.width = w * dpr; cv.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      nodes = Array.from({ length: Math.round(Math.min(70, (w * h) / 22000)) }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.18, vy: (Math.random() - 0.5) * 0.18,
        r: Math.random() * 1.8 + 0.8, gold: Math.random() < 0.18
      }));
      hexes = [{ x: w * 0.08, y: h * 0.22, s: 34, a: 0, v: 0.0014 }, { x: w * 0.46, y: h * 0.86, s: 22, a: 1, v: -0.002 }, { x: w * 0.93, y: h * 0.58, s: 28, a: 2, v: 0.0016 }];
    }
    function hex(x, y, s, a, col) {
      const pt = (i, r = s) => [x + r * Math.cos(a + (Math.PI / 3) * i), y + r * Math.sin(a + (Math.PI / 3) * i)];
      ctx.beginPath();
      for (let i = 0; i < 6; i++) { const [px, py] = pt(i); i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); }
      ctx.closePath(); ctx.strokeStyle = col; ctx.lineWidth = 1; ctx.stroke();
      for (let i = 0; i < 6; i++) {
        const [px, py] = pt(i);
        ctx.beginPath(); ctx.arc(px, py, 2.2, 0, Math.PI * 2); ctx.fillStyle = i % 2 ? "rgba(198,161,91,.8)" : col; ctx.fill();
        if (i % 2 === 0) { const [bx, by] = pt(i, s + 16); ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(bx, by); ctx.stroke(); ctx.beginPath(); ctx.arc(bx, by, 1.6, 0, Math.PI * 2); ctx.fill(); }
      }
    }
    function frame() {
      ctx.clearRect(0, 0, w, h);
      const line = root.dataset.theme === "dark" ? "156,195,191" : "46,74,79";
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        if (!reduced) {
          a.x += a.vx; a.y += a.vy;
          if (a.x < -20) a.x = w + 20; if (a.x > w + 20) a.x = -20;
          if (a.y < -20) a.y = h + 20; if (a.y > h + 20) a.y = -20;
          const dx = a.x - mouse.x, dy = a.y - mouse.y;
          if (dx * dx + dy * dy < 16000) { a.x += dx * 0.004; a.y += dy * 0.004; }
        }
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j], d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 130) { ctx.strokeStyle = `rgba(${line},${(1 - d / 130) * 0.22})`; ctx.lineWidth = 0.8; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
        }
      }
      nodes.forEach((n) => { ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2); ctx.fillStyle = n.gold ? "rgba(198,161,91,.85)" : `rgba(${line},.45)`; ctx.fill(); });
      hexes.forEach((x) => { if (!reduced) x.a += x.v; hex(x.x, x.y, x.s, x.a, `rgba(${line},.35)`); });
      if (running && !reduced) requestAnimationFrame(frame);
    }
    resize();
    addEventListener("resize", () => { resize(); if (reduced) frame(); });
    host.addEventListener("pointermove", (e) => { const r = cv.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; });
    host.addEventListener("pointerleave", () => { mouse.x = mouse.y = -999; });
    new MutationObserver(() => { if (reduced) frame(); }).observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    new IntersectionObserver(([en]) => {
      const was = running; running = en.isIntersecting;
      if (running && !was && !reduced) requestAnimationFrame(frame);
    }).observe(host);
    frame();
  })();
})();
