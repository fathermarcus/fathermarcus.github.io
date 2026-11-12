// Shared header/footer + links. Fill WHATSAPP and set SHOW_JOIN to true when they exist.
window.FM = {
  YOUTUBE: "https://www.youtube.com/@FatherMarcus1",
  JOIN: "https://www.youtube.com/@FatherMarcus1/join",
  WHATSAPP: "",
  SHOW_JOIN: false
};
(function(){
  const here = location.pathname.split("/").pop() || "index.html";
  const L = (href, txt, cls="") => `<a href="${href}" class="${cls} ${here===href?'on':''}">${txt}</a>`;
  const header = `
  <header class="top"><div class="wrap">
    <a class="brand" href="index.html"><span class="mark">✝</span>Father Marcus</a>
    <div class="hbtns">
      <button class="tsize" type="button" aria-pressed="false" title="Larger text" onclick="FM.bigText()">A<span style="font-size:1.3em">A</span></button>
      <button class="burger" type="button" aria-expanded="false" onclick="FM.menu(this)"><span class="bars">☰</span>Menu</button>
    </div>
    <nav>${L("index.html","Home")}${L("prayers.html","Prayers")}${L("advent.html","Advent")}<a href="${FM.YOUTUBE}" target="_blank" rel="noopener">YouTube</a>${L("consecrate.html","Consecrate your home","cta")}</nav>
  </div></header>`;
  const footer = `
  <footer><div class="wrap">
    <div><b style="color:#fff">Pray With Father Marcus</b><br>Free, no ads, nothing to buy. The news, quotes and documents we discuss are real and always sourced.<br>Father Marcus is an AI-presented character.</div>
    <div>Art: public-domain and CC-licensed paintings via Wikimedia Commons · <a href="credits.txt">credits</a></div>
  </div></footer>`;
  // Larger-text switch, remembered on this device only
  try { if (localStorage.getItem("fmBig") === "1") document.documentElement.classList.add("big"); } catch(e) {}
  FM.bigText = () => {
    const on = document.documentElement.classList.toggle("big");
    try { localStorage.setItem("fmBig", on ? "1" : "0"); } catch(e) {}
    document.querySelectorAll(".tsize").forEach(b => b.setAttribute("aria-pressed", on));
  };
  FM.menu = b => { const open = document.querySelector("header nav").classList.toggle("open"); b.setAttribute("aria-expanded", open); b.querySelector(".bars").textContent = open ? "✕" : "☰"; };
  document.addEventListener("DOMContentLoaded", () => {
    document.body.insertAdjacentHTML("afterbegin", header);
    document.body.insertAdjacentHTML("beforeend", footer);
    document.querySelectorAll(".tsize").forEach(b => b.setAttribute("aria-pressed", document.documentElement.classList.contains("big")));
    document.querySelectorAll("[data-wa]").forEach(el => { if (FM.WHATSAPP) el.href = FM.WHATSAPP; else el.style.display = "none"; });
    document.querySelectorAll("[data-join]").forEach(el => { if (FM.SHOW_JOIN) el.href = FM.JOIN; else el.style.display = "none"; });
    document.querySelectorAll("[data-yt]").forEach(el => el.href = FM.YOUTUBE);
  });
})();
