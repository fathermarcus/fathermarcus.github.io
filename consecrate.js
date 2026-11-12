// UI of the consecration page. The drawing itself is in card.js (FMCard). Nothing is sent anywhere.
let pick = "heart";
const $ = id => document.getElementById(id);
const cv = $("card");
const opts = () => ({ pick, fam: $("fam").value, names: $("names").value });
const redraw = () => FMCard.draw(cv, opts());

function choicesUI(){
  $("choices").innerHTML = Object.entries(FMCard.P).map(([k,v]) =>
    `<div class="choice ${k===pick?'on':''}" data-k="${k}"><img src="${v.img}" alt="">${v.label}</div>`).join("");
  document.querySelectorAll(".choice").forEach(el => el.onclick = () => { pick = el.dataset.k; choicesUI(); redraw(); });
}
function save(canvas, name){ const a = document.createElement("a"); a.download = name; a.href = canvas.toDataURL("image/jpeg", .92); a.click(); }
function fileName(suffix){ const f = ($("fam").value || "family").trim().replace(/[^a-z0-9]+/gi,"-").replace(/^-|-$/g,""); return `${f}-consecration-${suffix}.jpg`; }

["fam","names"].forEach(id => $(id).addEventListener("input", redraw));
$("dlCard").onclick = () => save(cv, fileName("card"));
$("dlPhone").onclick = async () => save(await FMCard.phone(opts()), fileName("phone"));
$("print").onclick = () => { const w = window.open(""); w.document.write(`<img src="${cv.toDataURL("image/jpeg",.95)}" style="width:100%">`); w.document.close(); setTimeout(() => w.print(), 600); };
$("share").onclick = e => {
  const fam = ($("fam").value || "").trim();
  const msg = `${fam ? "The " + fam + " family is" : "We are"} consecrating our home to ${FMCard.P[pick].label} 🙏 Make your family's card for free: ${location.origin}${location.pathname}`;
  e.currentTarget.href = "https://wa.me/?text=" + encodeURIComponent(msg);
};
choicesUI(); redraw();
