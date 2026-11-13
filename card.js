// Draws the consecration card on a canvas, entirely on the user's device. Nothing is sent anywhere.
// Every protector has its texts in the 4 languages. The Latin line is the same in all of them.
// label = name on the choice button · con = line under the family name · to = big red line on the card
// dat = "to …" used in the WhatsApp message · inv = invocation in the red band · prayer = consecration prayer
const ALL = {
  immaculate: { img: "immaculate_conception.jpg", fy: .16, pos: "50% 12%", la: "O Maria, sine labe concepta, ora pro nobis qui ad te confugimus.",
    en: { label: "Our Lady of the Immaculate Conception", to: "OUR LADY OF THE IMMACULATE CONCEPTION", inv: "O Mary, conceived without sin, pray for us who have recourse to thee.",
          prayer: "Immaculate Virgin Mary, Patroness of the United States, we consecrate our home and our family to you. Keep our hearts pure, keep us faithful to your Son and to His Church, and pray for us now and at the hour of our death." } },
  guadalupe: { img: "guadalupe.jpg", fy: .12, pos: "50% 6%", la: "Sancta Maria de Guadalupe, ora pro nobis.",
    es: { label: "Nuestra Señora de Guadalupe", con: "está consagrada a", to: "NUESTRA SEÑORA DE GUADALUPE", dat: "a Nuestra Señora de Guadalupe",
          inv: "Nuestra Señora de Guadalupe, ruega por nosotros.",
          prayer: "Santísima Virgen de Guadalupe, Madre del verdadero Dios por quien se vive, ponemos nuestro hogar bajo tu manto. Tú que dijiste a San Juan Diego: «¿No estoy yo aquí, que soy tu Madre?», cuida de esta familia, consérvanos en la fe y llévanos a todos a tu Hijo Jesús." } },
  lourdes: { img: "lourdes.jpg", fy: .40, z: 1.55, pos: "50% 40%", la: "Domina nostra de Lourdes, ora pro nobis.",
    fr: { label: "Notre-Dame de Lourdes", con: "est consacrée à", to: "NOTRE-DAME DE LOURDES", dat: "à Notre-Dame de Lourdes",
          inv: "Notre-Dame de Lourdes, priez pour nous.",
          prayer: "Notre-Dame de Lourdes, Immaculée Conception, nous vous confions notre foyer et notre famille. Vous qui avez appelé sainte Bernadette à la prière et à la pénitence, gardez-nous dans la foi, soutenez nos malades et conduisez-nous tous à votre Fils Jésus." } },
  altoetting: { img: "altoetting.jpg", fy: .38, z: 1.2, pos: "50% 36%", la: "Sancta Dei Genetrix, ora pro nobis.",
    de: { label: "Gottesmutter von Altötting", con: "ist geweiht", to: "DER GOTTESMUTTER VON ALTÖTTING", dat: "der Gottesmutter von Altötting",
          inv: "Gnadenmutter von Altötting, bitte für uns.",
          prayer: "Heilige Maria, Gnadenmutter von Altötting, seit Jahrhunderten kommen die Pilger zu dir. Wir legen unser Haus und unsere Familie in deine mütterlichen Hände. Bewahre uns im Glauben, steh uns bei in aller Not und führe uns zu deinem Sohn Jesus Christus." } },
  heart: { img: "sacred_heart.jpg", fy: .58, pos: "50% 30%", la: "Cor Jesu sacratissimum, miserere nobis.",
    en: { label: "The Sacred Heart of Jesus", to: "THE SACRED HEART OF JESUS", inv: "Sacred Heart of Jesus, have mercy on us.",
          prayer: "Lord Jesus, we place our home and every soul in it under the protection of Your Sacred Heart. Reign in this house: in our words, our work, our joys and our sorrows. Keep us faithful to You and to Your Church, and bring us all one day to Heaven." },
    es: { label: "El Sagrado Corazón de Jesús", con: "está consagrada al", to: "SAGRADO CORAZÓN DE JESÚS", dat: "al Sagrado Corazón de Jesús",
          inv: "Sagrado Corazón de Jesús, ten piedad de nosotros.",
          prayer: "Señor Jesús, ponemos nuestro hogar y cada alma que en él vive bajo la protección de tu Sagrado Corazón. Reina en esta casa: en nuestras palabras, nuestro trabajo, nuestras alegrías y nuestras penas. Consérvanos fieles a ti y a tu Iglesia, y llévanos a todos un día al Cielo." },
    fr: { label: "Le Sacré-Cœur de Jésus", con: "est consacrée au", to: "SACRÉ-CŒUR DE JÉSUS", dat: "au Sacré-Cœur de Jésus",
          inv: "Sacré-Cœur de Jésus, ayez pitié de nous.",
          prayer: "Seigneur Jésus, nous plaçons notre foyer et chaque âme qui l'habite sous la protection de votre Sacré-Cœur. Régnez sur cette maison : dans nos paroles, notre travail, nos joies et nos peines. Gardez-nous fidèles à vous et à votre Église, et conduisez-nous tous un jour au Ciel." },
    de: { label: "Heiligstes Herz Jesu", con: "ist geweiht", to: "DEM HEILIGSTEN HERZEN JESU", dat: "dem Heiligsten Herzen Jesu",
          inv: "Heiligstes Herz Jesu, erbarme dich unser.",
          prayer: "Herr Jesus, wir stellen unser Haus und jede Seele darin unter den Schutz deines Heiligsten Herzens. Herrsche in diesem Haus: in unseren Worten, unserer Arbeit, unseren Freuden und unseren Sorgen. Bewahre uns in der Treue zu dir und zu deiner Kirche, und führe uns alle einst in den Himmel." } },
  mary: { img: "our_lady.jpg", fy: .45, pos: "50% 30%", la: "Cor Mariae immaculatum, ora pro nobis.",
    en: { label: "The Immaculate Heart of Mary", to: "THE IMMACULATE HEART OF MARY", inv: "Immaculate Heart of Mary, pray for us.",
          prayer: "Holy Mary, Mother of God, we entrust our home and our family to your Immaculate Heart. Be the Mother of this house. Teach us to pray, keep us from sin, and lead every one of us to your Son, Jesus." },
    es: { label: "El Inmaculado Corazón de María", con: "está consagrada al", to: "INMACULADO CORAZÓN DE MARÍA", dat: "al Inmaculado Corazón de María",
          inv: "Inmaculado Corazón de María, ruega por nosotros.",
          prayer: "Santa María, Madre de Dios, confiamos nuestro hogar y nuestra familia a tu Inmaculado Corazón. Sé la Madre de esta casa. Enséñanos a rezar, apártanos del pecado y lleva a cada uno de nosotros a tu Hijo, Jesús." },
    fr: { label: "Le Cœur Immaculé de Marie", con: "est consacrée au", to: "CŒUR IMMACULÉ DE MARIE", dat: "au Cœur Immaculé de Marie",
          inv: "Cœur Immaculé de Marie, priez pour nous.",
          prayer: "Sainte Marie, Mère de Dieu, nous confions notre foyer et notre famille à votre Cœur Immaculé. Soyez la Mère de cette maison. Apprenez-nous à prier, gardez-nous du péché et conduisez chacun de nous à votre Fils, Jésus." },
    de: { label: "Unbeflecktes Herz Mariens", con: "ist geweiht", to: "DEM UNBEFLECKTEN HERZEN MARIENS", dat: "dem Unbefleckten Herzen Mariens",
          inv: "Unbeflecktes Herz Mariens, bitte für uns.",
          prayer: "Heilige Maria, Mutter Gottes, wir vertrauen unser Haus und unsere Familie deinem Unbefleckten Herzen an. Sei die Mutter dieses Hauses. Lehre uns beten, bewahre uns vor der Sünde und führe jeden von uns zu deinem Sohn Jesus." } },
  joseph: { img: "st_joseph.jpg", fy: .42, pos: "50% 25%", la: "Sancte Ioseph, ora pro nobis.",
    en: { label: "St. Joseph", to: "ST. JOSEPH, PROTECTOR OF FAMILIES", inv: "St. Joseph, protector of families, pray for us.",
          prayer: "St. Joseph, guardian of the Holy Family, we place our home under your care. Watch over our work and our needs, protect the faith of our children, and be with us at the hour of our death." },
    es: { label: "San José", con: "está consagrada a", to: "SAN JOSÉ, PROTECTOR DE LAS FAMILIAS", dat: "a San José",
          inv: "San José, protector de las familias, ruega por nosotros.",
          prayer: "San José, custodio de la Sagrada Familia, ponemos nuestro hogar bajo tu cuidado. Vela por nuestro trabajo y nuestras necesidades, protege la fe de nuestros hijos y acompáñanos en la hora de nuestra muerte." },
    fr: { label: "Saint Joseph", con: "est consacrée à", to: "SAINT JOSEPH, PROTECTEUR DES FAMILLES", dat: "à saint Joseph",
          inv: "Saint Joseph, protecteur des familles, priez pour nous.",
          prayer: "Saint Joseph, gardien de la Sainte Famille, nous plaçons notre foyer sous votre garde. Veillez sur notre travail et sur nos besoins, protégez la foi de nos enfants et soyez avec nous à l'heure de notre mort." },
    de: { label: "Heiliger Josef", con: "ist geweiht", to: "DEM HL. JOSEF, BESCHÜTZER DER FAMILIEN", dat: "dem heiligen Josef",
          inv: "Heiliger Josef, Beschützer der Familien, bitte für uns.",
          prayer: "Heiliger Josef, Beschützer der Heiligen Familie, wir stellen unser Haus unter deine Obhut. Wache über unsere Arbeit und unsere Nöte, beschütze den Glauben unserer Kinder und steh uns bei in der Stunde unseres Todes." } },
  michael: { img: "st_michael.jpg", fy: .40, pos: "50% 20%", la: "Sancte Michael Archangele, defende nos in proelio.",
    en: { label: "St. Michael the Archangel", to: "ST. MICHAEL THE ARCHANGEL", inv: "St. Michael the Archangel, defend us in battle.",
          prayer: "St. Michael the Archangel, we place our home under your protection. Guard this house and everyone in it against the snares of the devil, and keep us faithful to God in every trial." },
    es: { label: "San Miguel Arcángel", con: "está consagrada a", to: "SAN MIGUEL ARCÁNGEL", dat: "a San Miguel Arcángel",
          inv: "San Miguel Arcángel, defiéndenos en la lucha.",
          prayer: "San Miguel Arcángel, ponemos nuestro hogar bajo tu protección. Guarda esta casa y a todos los que en ella viven de las asechanzas del demonio, y consérvanos fieles a Dios en toda prueba." },
    fr: { label: "Saint Michel Archange", con: "est consacrée à", to: "SAINT MICHEL ARCHANGE", dat: "à saint Michel Archange",
          inv: "Saint Michel Archange, défendez-nous dans le combat.",
          prayer: "Saint Michel Archange, nous plaçons notre foyer sous votre protection. Gardez cette maison et tous ceux qui l'habitent contre les embûches du démon, et conservez-nous fidèles à Dieu dans toutes les épreuves." },
    de: { label: "Hl. Erzengel Michael", con: "ist geweiht", to: "DEM HL. ERZENGEL MICHAEL", dat: "dem heiligen Erzengel Michael",
          inv: "Heiliger Erzengel Michael, verteidige uns im Kampfe.",
          prayer: "Heiliger Erzengel Michael, wir stellen unser Haus unter deinen Schutz. Bewahre dieses Haus und alle, die darin wohnen, vor den Nachstellungen des Teufels, und erhalte uns treu zu Gott in jeder Prüfung." } }
};
// Order of the choices per language. The first one is the country's own protector, shown large with a badge.
const ORDER = {
  en: ["immaculate","heart","mary","joseph","michael"],
  es: ["guadalupe","heart","mary","joseph","michael"],
  fr: ["lourdes","heart","mary","joseph","michael"],
  de: ["michael","altoetting","heart","mary","joseph"]
};
const BADGE = { en: "Patroness of the USA", es: "Emperatriz de América", fr: "Lourdes · 1858", de: "Patron Deutschlands" };
// Fixed texts of the card
const CT = {
  en: { belongs: "✠   THIS HOME BELONGS TO GOD   ✠", fam: f => `The ${f} Family`, none: "Your Family", con: "is consecrated to", amen: "Amen.", on: d => `Consecrated on ${d}` },
  es: { belongs: "✠   ESTE HOGAR PERTENECE A DIOS   ✠", fam: f => `Familia ${f}`, none: "Su Familia", amen: "Amén.", on: d => `Consagrada el ${d}` },
  fr: { belongs: "✠   CETTE MAISON APPARTIENT À DIEU   ✠", fam: f => `Famille ${f}`, none: "Votre Famille", amen: "Amen.", on: d => `Consacrée le ${d}` },
  de: { belongs: "✠   DIESES HAUS GEHÖRT GOTT   ✠", fam: f => `Familie ${f}`, none: "Ihre Familie", amen: "Amen.", on: d => `Geweiht am ${d}` }
};
// Example shown on the home page
const SAMPLES = {
  en: { pick: "heart", fam: "Miller", names: "John, Mary, Peter, Grandma Rose" },
  es: { pick: "guadalupe", fam: "García", names: "José, María, Juan, la abuela Rosa" },
  fr: { pick: "lourdes", fam: "Martin", names: "Pierre, Marie, Jean, Mamie Rose" },
  de: { pick: "michael", fam: "Müller", names: "Josef, Maria, Peter, Oma Rosa" }
};
const LANG = (window.FM_LANG in ORDER) ? window.FM_LANG : "en";
const T_ = CT[LANG];
// P = the protectors of the current language, in display order, with their texts flattened in
const P = {};
ORDER[LANG].forEach(k => { const a = ALL[k], t = a[LANG]; P[k] = { img: a.img, fy: a.fy, z: a.z || 1, pos: a.pos, la: a.la, con: T_.con, dat: t.label, ...t }; });

const imgs = {};
function load(k){ return new Promise(r => { if (imgs[k]) return r(imgs[k]); const i = new Image(); i.onload = () => { imgs[k] = i; r(i); }; i.src = P[k].img; }); }
function lines(ctx, text, maxW){
  const words = text.split(" "); let line = ""; const out = [];
  for (const w of words){ const t = line ? line + " " + w : w; if (ctx.measureText(t).width > maxW && line){ out.push(line); line = w; } else line = t; }
  if (line) out.push(line);
  return out;
}
function wrap(ctx, text, x, y, maxW, lh, font, color, align="center"){
  ctx.font = font; ctx.fillStyle = color; ctx.textAlign = align;
  const ls = lines(ctx, text, maxW);
  ls.forEach((l,i) => ctx.fillText(l, x, y + i*lh));
  return y + ls.length*lh;
}
function fitFont(ctx, text, maxW, start, family, min = 30, style = ""){ let s = start; ctx.font = `${style}${s}px ${family}`; while (ctx.measureText(text).width > maxW && s > min){ s -= 2; ctx.font = `${style}${s}px ${family}`; } return s; }
// The family name as the user typed it, without a doubled "The … Family" / "Familia …"
function cleanFam(s){ return (s || "").trim().replace(/^(the|familia|famille|familie)\s+/i, "").replace(/\s+(family|familie)$/i, "").trim(); }
function famLine(fam){ const f = cleanFam(fam); return f ? T_.fam(f) : T_.none; }

async function draw(cv, o){
  const ctx = cv.getContext("2d"); const pick = (o.pick in P) ? o.pick : ORDER[LANG][0];
  await Promise.all(["92px 'IM Fell English SC'","30px 'EB Garamond'","italic 30px 'EB Garamond'","26px 'Source Sans 3'"].map(f => document.fonts.load(f, "AÄÉÑÇŒßéèçñüöä").catch(()=>{})));
  await document.fonts.ready;
  const W = cv.width, H = cv.height, p = P[pick], img = await load(pick);
  const names = (o.names || "").trim();
  // paper
  ctx.fillStyle = "#f8f1e2"; ctx.fillRect(0,0,W,H);
  const g = ctx.createRadialGradient(W/2,H/2,H*.2,W/2,H/2,H*.75); g.addColorStop(0,"rgba(255,255,255,0)"); g.addColorStop(1,"rgba(150,110,50,.18)");
  ctx.fillStyle = g; ctx.fillRect(0,0,W,H);
  // borders
  ctx.strokeStyle = "#a8843a"; ctx.lineWidth = 10; ctx.strokeRect(46,46,W-92,H-92);
  ctx.lineWidth = 2; ctx.strokeRect(70,70,W-140,H-140);
  ctx.strokeStyle = "#7a1f22"; ctx.lineWidth = 3; ctx.strokeRect(84,84,W-168,H-168);
  // arched image (z > 1 zooms in on images where the figure is small)
  const ax = 250, ay = 150, aw = W-500, ah = 760;
  ctx.save(); ctx.beginPath(); ctx.moveTo(ax, ay+aw/2); ctx.arc(ax+aw/2, ay+aw/2, aw/2, Math.PI, 0); ctx.lineTo(ax+aw, ay+ah); ctx.lineTo(ax, ay+ah); ctx.closePath(); ctx.clip();
  const r = Math.max(aw/img.width, ah/img.height) * p.z, ih = img.height*r; const oy = Math.min(0, Math.max(ah-ih, ah/2 - (p.fy||.5)*ih)); ctx.drawImage(img, ax+(aw-img.width*r)/2, ay+oy, img.width*r, ih);
  ctx.restore();
  ctx.strokeStyle = "#a8843a"; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(ax, ay+aw/2); ctx.arc(ax+aw/2, ay+aw/2, aw/2, Math.PI, 0); ctx.lineTo(ax+aw, ay+ah); ctx.lineTo(ax, ay+ah); ctx.closePath(); ctx.stroke();
  // text
  let y = ay + ah + 84;
  ctx.textAlign = "center"; ctx.fillStyle = "#7a1f22"; ctx.font = "26px 'Source Sans 3'"; ctx.fillText(T_.belongs, W/2, y);
  y += 82;
  const famText = famLine(o.fam);
  const fs = fitFont(ctx, famText, W-300, 92, "'IM Fell English SC'");
  ctx.fillStyle = "#1f1a17"; ctx.font = `${fs}px 'IM Fell English SC'`; ctx.fillText(famText, W/2, y);
  y += 56;
  ctx.font = "italic 30px 'EB Garamond'"; ctx.fillStyle = "#5f554b"; ctx.fillText(p.con, W/2, y);
  y += 54;
  const ts = fitFont(ctx, p.to, W-300, 44, "'IM Fell English SC'", 28); ctx.fillStyle = "#7a1f22"; ctx.font = `${ts}px 'IM Fell English SC'`; ctx.fillText(p.to, W/2, y);
  y += 40;
  const by = H - 230;
  const nameText = names ? names.split(",").map(s=>s.trim()).filter(Boolean).join("  ·  ") : "";
  // shrink the prayer a little if a long text (German, French) would touch the red band
  let ps = 29;
  for (; ps > 22; ps--){
    let yy = y; ctx.font = "28px 'EB Garamond'"; if (nameText) yy += 10 + lines(ctx, nameText, W-320).length*36;
    ctx.font = `${ps}px 'EB Garamond'`; yy += 30 + lines(ctx, p.prayer, W-340).length*Math.round(ps*1.38);
    if (yy + 4 < by - 26) break;
  }
  if (nameText){ y = wrap(ctx, nameText, W/2, y+10, W-320, 36, "28px 'EB Garamond'", "#1f1a17"); }
  y += 30;
  y = wrap(ctx, p.prayer, W/2, y, W-340, Math.round(ps*1.38), `${ps}px 'EB Garamond'`, "#1f1a17");
  ctx.font = "26px 'EB Garamond'"; ctx.fillText(T_.amen, W/2, y + 4);
  // invocation band
  ctx.fillStyle = "#7a1f22"; ctx.fillRect(120, by, W-240, 92);
  const is = fitFont(ctx, p.inv, W-300, 32, "'EB Garamond'", 22, "italic ");
  ctx.fillStyle = "#fff"; ctx.font = `italic ${is}px 'EB Garamond'`; ctx.fillText(p.inv, W/2, by+40);
  const ls = fitFont(ctx, p.la, W-300, 24, "'EB Garamond'", 18, "italic ");
  ctx.fillStyle = "#e9d8a8"; ctx.font = `italic ${ls}px 'EB Garamond'`; ctx.fillText(p.la, W/2, by+74);
  // footer
  const d = new Date().toLocaleDateString(window.FM_LOCALE || "en-US",{year:"numeric",month:"long",day:"numeric"});
  ctx.fillStyle = "#5f554b"; ctx.font = "22px 'Source Sans 3'"; ctx.fillText(`${T_.on(d)}  ·  ${(window.FM && FM.CHANNEL) || "Pray With Father Marcus"}`, W/2, H-108);
}
async function phone(o){
  const W = 1080, H = 1920, c = document.createElement("canvas"); c.width = W; c.height = H; const x = c.getContext("2d");
  const k = (o.pick in P) ? o.pick : ORDER[LANG][0];
  const p = P[k], img = await load(k), fam = cleanFam(o.fam);
  const r = Math.max(W/img.width, H/img.height); x.drawImage(img, (W-img.width*r)/2, (H-img.height*r)/2, img.width*r, img.height*r);
  const g = x.createLinearGradient(0,H*.55,0,H); g.addColorStop(0,"rgba(20,10,8,0)"); g.addColorStop(1,"rgba(20,10,8,.85)"); x.fillStyle = g; x.fillRect(0,0,W,H);
  x.textAlign = "center"; x.fillStyle = "#fff"; x.font = "italic 50px 'EB Garamond'"; x.fillText(p.inv, W/2, H-300, W-120);
  x.fillStyle = "#e9d8a8"; x.font = "38px 'IM Fell English SC'"; x.fillText(fam ? T_.fam(fam) : "", W/2, H-220, W-120);
  return c;
}
window.FMCard = { P, ORDER: ORDER[LANG], BADGE: BADGE[LANG], SAMPLE: SAMPLES[LANG], draw, phone, load };
