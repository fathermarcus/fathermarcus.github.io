// UI of the consecration page. The drawing itself is in card.js (FMCard). Nothing is sent anywhere.
let pick = "heart";
const $ = id => document.getElementById(id);
const cv = $("card");
const opts = () => ({ pick, fam: $("fam").value, names: $("names").value });
const redraw = async () => { await FMCard.draw(cv, opts()); prepare(); };

function choicesUI(){
  $("choices").innerHTML = Object.entries(FMCard.P).map(([k,v]) =>
    `<div class="choice ${k===pick?'on':''}" data-k="${k}"><img src="${v.img}" alt="">${v.label}</div>`).join("");
  document.querySelectorAll(".choice").forEach(el => el.onclick = () => { pick = el.dataset.k; choicesUI(); redraw(); });
}
// On phones, open the share sheet so the card can go straight to Photos; elsewhere, a normal download.
// The images are prepared ahead of time so the share sheet opens inside the tap (Safari requires this).
const touch = matchMedia("(pointer:coarse)").matches;
const ready = { card: null, phone: null };
let prepTimer;
const toBlob = c => new Promise(r => c.toBlob(r, "image/jpeg", .92));
function prepare(){ clearTimeout(prepTimer); ready.card = ready.phone = null;
  prepTimer = setTimeout(async () => { ready.card = await toBlob(cv); ready.phone = await toBlob(await FMCard.phone(opts())); }, 400); }
function download(blob, name){ const a = document.createElement("a"); a.download = name; a.href = URL.createObjectURL(blob); document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 5000); }
async function save(kind, name){
  let blob = ready[kind];
  if (blob && touch && navigator.canShare) {
    const file = new File([blob], name, { type: "image/jpeg" });
    if (navigator.canShare({ files: [file] })) {
      try { await navigator.share({ files: [file], title: "Our family consecration" }); return; }
      catch (e) { if (e.name === "AbortError") return; }
    }
  }
  if (!blob) blob = kind === "card" ? await toBlob(cv) : await toBlob(await FMCard.phone(opts()));
  download(blob, name);
}
function fileName(suffix){ const f = ($("fam").value || "family").trim().replace(/[^a-z0-9]+/gi,"-").replace(/^-|-$/g,""); return `${f}-consecration-${suffix}.jpg`; }

["fam","names"].forEach(id => $(id).addEventListener("input", redraw));
$("dlCard").onclick = () => save("card", fileName("card"));
$("dlPhone").onclick = () => save("phone", fileName("phone"));
$("print").onclick = () => { const w = window.open(""); w.document.write(`<img src="${cv.toDataURL("image/jpeg",.95)}" style="width:100%">`); w.document.close(); setTimeout(() => w.print(), 600); };
$("share").onclick = e => {
  const fam = ($("fam").value || "").trim();
  const msg = `${fam ? "The " + fam + " family is" : "We are"} consecrating our home to ${FMCard.P[pick].label} 🙏 Make your family's card for free: ${location.origin}${location.pathname}`;
  e.currentTarget.href = "https://wa.me/?text=" + encodeURIComponent(msg);
};
choicesUI(); redraw();
if (touch) { $("dlCard").textContent = "Save the card to my phone"; $("dlPhone").textContent = "Save as phone wallpaper"; }
