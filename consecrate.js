// UI of the consecration page. The drawing itself is in card.js (FMCard). Nothing is sent anywhere.
// The first protector of each language (FMCard.ORDER[0]) is the country's own, shown large and chosen by default.
let pick = FMCard.ORDER[0];
const $ = id => document.getElementById(id);
const cv = $("card");
const opts = () => ({ pick, fam: $("fam").value, names: $("names").value });
const redraw = async () => { await FMCard.draw(cv, opts()); prepare(); };

function choicesUI(){
  $("choices").innerHTML = FMCard.ORDER.map((k,i) => { const v = FMCard.P[k];
    return `<div class="choice ${i===0?'feat':''} ${k===pick?'on':''}" data-k="${k}" role="button" tabindex="0" aria-pressed="${k===pick}"><img src="${v.img}" alt="" style="object-position:${v.pos||'50% 30%'}"><span class="cl">${i===0&&FMCard.BADGE?`<span class="cbadge">${FMCard.BADGE}</span>`:""}${v.label}</span></div>`; }).join("");
  document.querySelectorAll(".choice").forEach(el => {
    el.onclick = () => { pick = el.dataset.k; choicesUI(); redraw(); };
    el.onkeydown = e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); el.click(); } };
  });
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
      try { await navigator.share({ files: [file], title: T("co.shareTitle") }); return; }
      catch (e) { if (e.name === "AbortError") return; }
    }
  }
  if (!blob) blob = kind === "card" ? await toBlob(cv) : await toBlob(await FMCard.phone(opts()));
  download(blob, name);
}
// File names in plain ASCII: "Müller" -> "Muller", "Núñez" -> "Nunez"
function fileName(suffix){ const f = ($("fam").value || T("co.fileFamily")).trim().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/ß/g,"ss").replace(/[^a-z0-9]+/gi,"-").replace(/^-|-$/g,"") || "family"; return `${f}-${T("co.fileName")}-${suffix}.jpg`; }

["fam","names"].forEach(id => $(id).addEventListener("input", redraw));
$("dlCard").onclick = () => save("card", fileName(T("co.fileCard")));
$("dlPhone").onclick = () => save("phone", fileName(T("co.filePhone")));
$("print").onclick = () => { const w = window.open(""); w.document.write(`<img src="${cv.toDataURL("image/jpeg",.95)}" style="width:100%">`); w.document.close(); setTimeout(() => w.print(), 600); };
$("share").onclick = e => {
  const fam = ($("fam").value || "").trim().replace(/^(the|familia|famille|familie)\s+/i, "").replace(/\s+(family|familie)$/i, "");
  const link = `${location.origin}${location.pathname}${FM.langQuery()}`;
  e.currentTarget.href = "https://wa.me/?text=" + encodeURIComponent(T("co.waMsg")(fam, FMCard.P[pick].dat, link));
};
choicesUI(); redraw();
// On touch screens the buttons say "save to my phone"; the data-i18n key is switched so the translation keeps it.
if (touch) { $("dlCard").dataset.i18n = "co.dlCardTouch"; $("dlPhone").dataset.i18n = "co.dlPhoneTouch"; FM.apply(document.querySelector(".dl")); }
