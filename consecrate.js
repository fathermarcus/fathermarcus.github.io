// Draws the consecration card on a canvas, entirely on the user's device. Nothing is sent anywhere.
const P = {
  heart:   { label: "The Sacred Heart of Jesus", img: "sacred_heart.jpg", fy: .58, to: "THE SACRED HEART OF JESUS",
             inv: "Sacred Heart of Jesus, have mercy on us.", la: "Cor Jesu sacratissimum, miserere nobis.",
             prayer: "Lord Jesus, we place our home and every soul in it under the protection of Your Sacred Heart. Reign in this house: in our words, our work, our joys and our sorrows. Keep us faithful to You and to Your Church, and bring us all one day to Heaven." },
  mary:    { label: "The Immaculate Heart of Mary", img: "our_lady.jpg", fy: .45, to: "THE IMMACULATE HEART OF MARY",
             inv: "Immaculate Heart of Mary, pray for us.", la: "Cor Mariae immaculatum, ora pro nobis.",
             prayer: "Holy Mary, Mother of God, we entrust our home and our family to your Immaculate Heart. Be the Mother of this house. Teach us to pray, keep us from sin, and lead every one of us to your Son, Jesus." },
  joseph:  { label: "St. Joseph", img: "st_joseph.jpg", fy: .42, to: "ST. JOSEPH, PROTECTOR OF FAMILIES",
             inv: "St. Joseph, protector of families, pray for us.", la: "Sancte Ioseph, ora pro nobis.",
             prayer: "St. Joseph, guardian of the Holy Family, we place our home under your care. Watch over our work and our needs, protect the faith of our children, and be with us at the hour of our death." },
  michael: { label: "St. Michael the Archangel", img: "st_michael.jpg", fy: .40, to: "ST. MICHAEL THE ARCHANGEL",
             inv: "St. Michael the Archangel, defend us in battle.", la: "Sancte Michael Archangele, defende nos in proelio.",
             prayer: "St. Michael the Archangel, we place our home under your protection. Guard this house and everyone in it against the snares of the devil, and keep us faithful to God in every trial." }
};
let pick = "heart";
const imgs = {};
const $ = id => document.getElementById(id);
const cv = $("card"), ctx = cv.getContext("2d");

function choicesUI(){
  $("choices").innerHTML = Object.entries(P).map(([k,v]) =>
    `<div class="choice ${k===pick?'on':''}" data-k="${k}"><img src="${v.img}" alt="">${v.label}</div>`).join("");
  document.querySelectorAll(".choice").forEach(el => el.onclick = () => { pick = el.dataset.k; choicesUI(); draw(); });
}
function load(k){ return new Promise(r => { if (imgs[k]) return r(imgs[k]); const i = new Image(); i.onload = () => { imgs[k] = i; r(i); }; i.src = P[k].img; }); }
function wrap(text, x, y, maxW, lh, font, color, align="center"){
  ctx.font = font; ctx.fillStyle = color; ctx.textAlign = align;
  const words = text.split(" "); let line = ""; const lines = [];
  for (const w of words){ const t = line ? line + " " + w : w; if (ctx.measureText(t).width > maxW && line){ lines.push(line); line = w; } else line = t; }
  if (line) lines.push(line);
  lines.forEach((l,i) => ctx.fillText(l, x, y + i*lh));
  return y + lines.length*lh;
}
function fitFont(text, maxW, start, family){ let s = start; ctx.font = `${s}px ${family}`; while (ctx.measureText(text).width > maxW && s > 30){ s -= 2; ctx.font = `${s}px ${family}`; } return s; }
function cover(img, x, y, w, h){
  const r = Math.max(w/img.width, h/img.height), iw = img.width*r, ih = img.height*r;
  ctx.drawImage(img, x + (w-iw)/2, y + (h-ih)/2 - (k_top()), iw, ih);
}
function k_top(){ return 0; }

async function draw(){
  await document.fonts.ready;
  const W = cv.width, H = cv.height, p = P[pick], img = await load(pick);
  const fam = ($("fam").value || "").trim(), names = ($("names").value || "").trim();
  // paper
  ctx.fillStyle = "#f8f1e2"; ctx.fillRect(0,0,W,H);
  const g = ctx.createRadialGradient(W/2,H/2,H*.2,W/2,H/2,H*.75); g.addColorStop(0,"rgba(255,255,255,0)"); g.addColorStop(1,"rgba(150,110,50,.18)");
  ctx.fillStyle = g; ctx.fillRect(0,0,W,H);
  // borders
  ctx.strokeStyle = "#a8843a"; ctx.lineWidth = 10; ctx.strokeRect(46,46,W-92,H-92);
  ctx.lineWidth = 2; ctx.strokeRect(70,70,W-140,H-140);
  ctx.strokeStyle = "#7a1f22"; ctx.lineWidth = 3; ctx.strokeRect(84,84,W-168,H-168);
  // arched image
  const ax = 250, ay = 150, aw = W-500, ah = 760;
  ctx.save(); ctx.beginPath(); ctx.moveTo(ax, ay+aw/2); ctx.arc(ax+aw/2, ay+aw/2, aw/2, Math.PI, 0); ctx.lineTo(ax+aw, ay+ah); ctx.lineTo(ax, ay+ah); ctx.closePath(); ctx.clip();
  const r = Math.max(aw/img.width, ah/img.height), ih = img.height*r; const oy = Math.min(0, Math.max(ah-ih, ah/2 - (p.fy||.5)*ih)); ctx.drawImage(img, ax+(aw-img.width*r)/2, ay+oy, img.width*r, ih);
  ctx.restore();
  ctx.strokeStyle = "#a8843a"; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(ax, ay+aw/2); ctx.arc(ax+aw/2, ay+aw/2, aw/2, Math.PI, 0); ctx.lineTo(ax+aw, ay+ah); ctx.lineTo(ax, ay+ah); ctx.closePath(); ctx.stroke();
  // text
  let y = ay + ah + 84;
  ctx.textAlign = "center"; ctx.fillStyle = "#7a1f22"; ctx.font = "26px 'Source Sans 3'"; ctx.fillText("✠   THIS HOME BELONGS TO GOD   ✠", W/2, y);
  y += 82;
  const famText = fam ? `The ${fam} Family` : "Your Family";
  const fs = fitFont(famText, W-300, 92, "'IM Fell English SC'");
  ctx.fillStyle = "#1f1a17"; ctx.font = `${fs}px 'IM Fell English SC'`; ctx.fillText(famText, W/2, y);
  y += 56;
  ctx.font = "italic 30px 'EB Garamond'"; ctx.fillStyle = "#5f554b"; ctx.fillText("is consecrated to", W/2, y);
  y += 54;
  const ts = fitFont(p.to, W-300, 44, "'IM Fell English SC'"); ctx.fillStyle = "#7a1f22"; ctx.font = `${ts}px 'IM Fell English SC'`; ctx.fillText(p.to, W/2, y);
  y += 40;
  if (names){ y = wrap(names.split(",").map(s=>s.trim()).filter(Boolean).join("  ·  "), W/2, y+10, W-320, 36, "28px 'EB Garamond'", "#1f1a17"); }
  y += 30;
  y = wrap(p.prayer, W/2, y, W-340, 40, "29px 'EB Garamond'", "#1f1a17");
  ctx.font = "26px 'EB Garamond'"; ctx.fillText("Amen.", W/2, y + 4);
  // invocation band
  const by = H - 230;
  ctx.fillStyle = "#7a1f22"; ctx.fillRect(120, by, W-240, 92);
  ctx.fillStyle = "#fff"; ctx.font = "italic 32px 'EB Garamond'"; ctx.fillText(p.inv, W/2, by+40);
  ctx.fillStyle = "#e9d8a8"; ctx.font = "italic 24px 'EB Garamond'"; ctx.fillText(p.la, W/2, by+74);
  // footer
  const d = new Date().toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"});
  ctx.fillStyle = "#5f554b"; ctx.font = "22px 'Source Sans 3'"; ctx.fillText(`Consecrated on ${d}  ·  Pray With Father Marcus`, W/2, H-108);
}
function save(canvas, name){ const a = document.createElement("a"); a.download = name; a.href = canvas.toDataURL("image/jpeg", .92); a.click(); }
function fileName(suffix){ const f = ($("fam").value || "family").trim().replace(/[^a-z0-9]+/gi,"-").replace(/^-|-$/g,""); return `${f}-consecration-${suffix}.jpg`; }

async function phone(){
  const W = 1080, H = 1920, c = document.createElement("canvas"); c.width = W; c.height = H; const x = c.getContext("2d");
  const p = P[pick], img = await load(pick), fam = ($("fam").value || "").trim();
  const r = Math.max(W/img.width, H/img.height); x.drawImage(img, (W-img.width*r)/2, (H-img.height*r)/2, img.width*r, img.height*r);
  const g = x.createLinearGradient(0,H*.55,0,H); g.addColorStop(0,"rgba(20,10,8,0)"); g.addColorStop(1,"rgba(20,10,8,.85)"); x.fillStyle = g; x.fillRect(0,0,W,H);
  x.textAlign = "center"; x.fillStyle = "#fff"; x.font = "italic 50px 'EB Garamond'"; x.fillText(p.inv, W/2, H-300, W-120);
  x.fillStyle = "#e9d8a8"; x.font = "38px 'IM Fell English SC'"; x.fillText(fam ? `The ${fam} Family` : "", W/2, H-220, W-120);
  save(c, fileName("phone"));
}
["fam","names"].forEach(id => $(id).addEventListener("input", draw));
$("dlCard").onclick = () => save(cv, fileName("card"));
$("dlPhone").onclick = phone;
$("print").onclick = () => { const w = window.open(""); w.document.write(`<img src="${cv.toDataURL("image/jpeg",.95)}" style="width:100%">`); w.document.close(); w.onload = () => w.print(); setTimeout(()=>w.print(), 600); };
choicesUI(); draw();
