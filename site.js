// Shared header/footer + config. Edit the links here once the WhatsApp Channel and memberships exist.
window.FM = {
  YOUTUBE: "https://www.youtube.com/@FatherMarcus1",
  JOIN: "https://www.youtube.com/@FatherMarcus1/join",   // works only once memberships are enabled
  WHATSAPP: "",                                           // WhatsApp Channel link (empty = button hidden)
  SHOW_JOIN: false                                        // set true when "Join" is live on the channel
};
(function(){
  const base = document.documentElement.dataset.base || "";
  const wa = FM.WHATSAPP ? `<a href="${FM.WHATSAPP}" target="_blank" rel="noopener">WhatsApp</a>` : "";
  const header = `
  <header class="top"><div class="wrap">
    <a class="brand" href="${base}index.html">Father Marcus<small>Prayers for the Catholic home</small></a>
    <nav><a href="${base}consecrate.html">Consecrate your home</a><a href="${base}prayers.html">Prayers</a><a href="${base}advent.html">Advent</a>${wa}<a href="${FM.YOUTUBE}" target="_blank" rel="noopener">YouTube</a></nav>
  </div></header>`;
  const footer = `
  <footer><div class="wrap">
    <div>© Pray With Father Marcus · Free, no ads, nothing to buy.<br>
    The news, quotes and documents we discuss are real and always sourced; the prayers follow the faith of the Church. Father Marcus is an AI-presented character.</div>
    <div>Art: public-domain and CC-licensed paintings via Wikimedia Commons (<a href="${base}credits.txt">credits</a>).</div>
  </div></footer>`;
  document.addEventListener("DOMContentLoaded", () => {
    document.body.insertAdjacentHTML("afterbegin", header);
    document.body.insertAdjacentHTML("beforeend", footer);
    document.querySelectorAll("[data-wa]").forEach(el => { if (FM.WHATSAPP) { el.href = FM.WHATSAPP; } else { el.style.display = "none"; } });
    document.querySelectorAll("[data-join]").forEach(el => { if (FM.SHOW_JOIN) { el.href = FM.JOIN; } else { el.style.display = "none"; } });
    document.querySelectorAll("[data-yt]").forEach(el => el.href = FM.YOUTUBE);
  });
})();
