// Shared header/footer + links, for the 4 languages. Needs i18n.js loaded before it.
// ======== SETTINGS PER LANGUAGE (edit here) ========
// WHATSAPP: paste the link of that language's WhatsApp Channel between the quotes. While it is empty the WhatsApp buttons stay hidden.
// SHOW_JOIN: true when YouTube memberships exist on that channel.
// PHOTO / PHOTO_HERO: photo of the priest of that channel (round photo / big photo on the home page).
//   Empty "" = no avatar photo: the home page shows the sacred image in ART instead, and the round photo is hidden.
window.FM_CONFIG = {
  en: { NAME: "Father Marcus", CHANNEL: "Pray With Father Marcus",
        YOUTUBE: "https://www.youtube.com/@FatherMarcus1", JOIN: "https://www.youtube.com/@FatherMarcus1/join",
        WHATSAPP: "https://whatsapp.com/channel/0029Vb9QATY29759TUie5n0J", SHOW_JOIN: false,
        PHOTO: "father_marcus.jpg", PHOTO_HERO: "father_marcus_rome.jpg", PHOTO_ALT: "Father Marcus in Rome, St. Peter's dome behind him",
        ART: "sacred_heart.jpg", ART_POS: "50% 30%", ART_ALT: "The Sacred Heart of Jesus" },
  es: { NAME: "Padre Marcos", CHANNEL: "Reza con el Padre Marcos",
        YOUTUBE: "https://www.youtube.com/@PadreMarcosFeDeSiempre", JOIN: "https://www.youtube.com/@PadreMarcosFeDeSiempre/join",
        WHATSAPP: "https://whatsapp.com/channel/0029VbE6VK7DTkK38q3Tw80k", SHOW_JOIN: false,
        PHOTO: "father_marcus.jpg", PHOTO_HERO: "father_marcus_rome.jpg", PHOTO_ALT: "El Padre Marcos en Roma, con la cúpula de San Pedro detrás",
        ART: "guadalupe.jpg", ART_POS: "50% 4%", ART_ALT: "Nuestra Señora de Guadalupe" },
  fr: { NAME: "Père Marcus", CHANNEL: "Priez avec le Père Marcus",
        YOUTUBE: "https://www.youtube.com/@PereMarcus", JOIN: "https://www.youtube.com/@PereMarcus/join",
        WHATSAPP: "https://whatsapp.com/channel/0029VbDYOzn6BIEjjXmEdw2g", SHOW_JOIN: false,
        PHOTO: "father_marcus.jpg", PHOTO_HERO: "father_marcus_rome.jpg", PHOTO_ALT: "Le Père Marcus à Rome, devant la coupole de Saint-Pierre",
        ART: "lourdes.jpg", ART_POS: "50% 38%", ART_ALT: "Notre-Dame de Lourdes" },
  de: { NAME: "Pater Marcus", CHANNEL: "Beten mit Pater Marcus",
        YOUTUBE: "https://www.youtube.com/@PaterMarcus1", JOIN: "https://www.youtube.com/@PaterMarcus1/join",
        WHATSAPP: "https://whatsapp.com/channel/0029VbEE7nm9WtBwrsBsuk0h", SHOW_JOIN: false,
        PHOTO: "father_marcus.jpg", PHOTO_HERO: "father_marcus_rome.jpg", PHOTO_ALT: "Pater Marcus in Rom, hinter ihm die Kuppel des Petersdoms",
        ART: "st_michael.jpg", ART_POS: "50% 18%", ART_ALT: "Der heilige Erzengel Michael" }
};
// ===================================================
window.FM = Object.assign({ lang: window.FM_LANG || "en" }, FM_CONFIG[window.FM_LANG] || FM_CONFIG.en);
(function(){
  const LANG = FM.lang;
  const FLAGS = { en: ["🇺🇸","EN","English"], es: ["🇪🇸","ES","Español"], fr: ["🇫🇷","FR","Français"], de: ["🇩🇪","DE","Deutsch"] };
  // "?lang=xx" for links and shared URLs
  FM.langQuery = () => "?lang=" + LANG;
  // add ?lang=xx to an internal link such as "prayers.html#michael"
  FM.url = (href, l = LANG) => {
    const m = /^([\w-]+\.html)(\?[^#]*)?(#.*)?$/.exec(href || ""); if (!m) return href;
    const q = new URLSearchParams((m[2] || "").slice(1)); q.set("lang", l);
    return m[1] + "?" + q.toString() + (m[3] || "");
  };
  const here = location.pathname.split("/").pop() || "index.html";
  const L = (href, txt, cls="") => `<a href="${href}" class="${cls} ${here===href?'on':''}">${txt}</a>`;
  const langs = (cls) => `<div class="langs ${cls}" role="group" aria-label="${T("h.lang")}">` + FM_LANGS.map(l =>
    `<a class="lng ${l===LANG?'on':''}" data-lang="${l}" hreflang="${l}" lang="${l}" href="${here}?lang=${l}" title="${FLAGS[l][2]}" ${l===LANG?'aria-current="true"':''}><span class="flag" aria-hidden="true">${FLAGS[l][0]}</span>${FLAGS[l][1]}</a>`).join("") + `</div>`;
  const header = `
  <header class="top"><div class="wrap">
    <a class="brand" href="index.html"><span class="mark">✝</span>${FM.NAME}</a>
    <div class="hbtns">
      <button class="tsize" type="button" aria-pressed="false" title="${T("h.bigTitle")}" aria-label="${T("h.bigTitle")}" onclick="FM.bigText()">A<span style="font-size:1.3em">A</span></button>
      <button class="burger" type="button" aria-expanded="false" onclick="FM.menu(this)"><span class="bars">☰</span>${T("h.menu")}</button>
    </div>
    <nav>${langs("inmenu")}${L("index.html",T("h.home"))}${L("prayers.html",T("h.prayers"))}${L("advent.html",T("h.advent"))}<a href="${FM.YOUTUBE}" target="_blank" rel="noopener">YouTube</a>${L("consecrate.html",T("h.consecrate"),"cta")}</nav>
  </div></header>`;
  const footer = `
  <footer><div class="wrap">
    <div><b style="color:#fff">${FM.CHANNEL}</b><br>${T("f.tag")}<br>${T("f.ai").replace("{name}", FM.NAME)}</div>
    <div>${T("f.art")}</div>
    ${langs("infoot")}
  </div></footer>`;
  // Larger-text switch, remembered on this device only
  try { if (localStorage.getItem("fmBig") === "1") document.documentElement.classList.add("big"); } catch(e) {}
  FM.bigText = () => {
    const on = document.documentElement.classList.toggle("big");
    try { localStorage.setItem("fmBig", on ? "1" : "0"); } catch(e) {}
    document.querySelectorAll(".tsize").forEach(b => b.setAttribute("aria-pressed", on));
  };
  FM.menu = b => { const open = document.querySelector("header nav").classList.toggle("open"); b.setAttribute("aria-expanded", open); b.querySelector(".bars").textContent = open ? "✕" : "☰"; };
  // Put the texts of the current language into the page (data-i18n = inner HTML, -ph = placeholder, -content = meta, -aria = aria-label)
  FM.apply = (root = document) => {
    root.querySelectorAll("[data-i18n]").forEach(el => { el.innerHTML = T(el.dataset.i18n); });
    root.querySelectorAll("[data-i18n-ph]").forEach(el => el.placeholder = T(el.dataset.i18nPh));
    root.querySelectorAll("[data-i18n-content]").forEach(el => el.content = T(el.dataset.i18nContent));
    root.querySelectorAll("[data-i18n-aria]").forEach(el => el.setAttribute("aria-label", T(el.dataset.i18nAria)));
  };
  FM.apply();
  document.addEventListener("DOMContentLoaded", () => {
    FM.apply();
    document.body.insertAdjacentHTML("afterbegin", header);
    document.body.insertAdjacentHTML("beforeend", footer);
    document.querySelectorAll(".tsize").forEach(b => b.setAttribute("aria-pressed", document.documentElement.classList.contains("big")));
    document.querySelectorAll("[data-wa]").forEach(el => { if (FM.WHATSAPP) el.href = FM.WHATSAPP; else el.style.display = "none"; });
    document.querySelectorAll("[data-join]").forEach(el => { if (FM.SHOW_JOIN) el.href = FM.JOIN; else el.style.display = "none"; });
    document.querySelectorAll("[data-yt]").forEach(el => el.href = FM.YOUTUBE);
    document.querySelectorAll("[data-fm]").forEach(el => el.textContent = FM[el.dataset.fm]);
    // priest photos: only where the channel has set one; otherwise sacred art / hidden
    document.querySelectorAll("[data-fm-photo]").forEach(img => {
      const hero = img.dataset.fmPhoto === "hero", src = hero ? FM.PHOTO_HERO : FM.PHOTO;
      if (src) { img.src = src; img.alt = FM.PHOTO_ALT; }
      else if (hero) { img.src = FM.ART; img.alt = FM.ART_ALT; img.style.objectPosition = FM.ART_POS; img.closest(".pic").classList.add("art"); }
      else { img.remove(); document.querySelectorAll(".chan").forEach(c => c.classList.add("nophoto")); }
    });
    // every internal link keeps the language
    document.querySelectorAll("a[href]").forEach(a => { if (!a.closest(".langs")) { const h = a.getAttribute("href"); const n = FM.url(h); if (n !== h) a.setAttribute("href", n); } });
    // the language buttons keep the #section of the page
    document.querySelectorAll(".lng").forEach(a => a.addEventListener("click", () => { a.href = FM.url(here + location.hash, a.dataset.lang); try { localStorage.setItem("fmLang", a.dataset.lang); } catch(e) {} }));
    document.documentElement.classList.remove("i18n-wait");
    // links such as prayers.html#michael: go to that prayer once the page is built
    if (location.hash.length > 1) { const t = document.getElementById(decodeURIComponent(location.hash.slice(1))); if (t) setTimeout(() => t.scrollIntoView(), 60); }
  });
})();
