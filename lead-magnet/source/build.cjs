// Generates guide.html — "The Pain-Free Workday Blueprint" (MotionPluse lead magnet)
const fs = require("fs");
const path = require("path");

const C = {
  navy: "#0B2A43", deep: "#071D2E", blue2: "#145A7A", trust: "#247BA0",
  light: "#EAF4F8", off: "#F7F8F6", green: "#5FAF8A", greenS: "#2F7A58",
  ink: "#14212B", muted: "#66737D", dmuted: "#9FB3C3", card: "#123652", cardL: "#E9EDEA",
};

const SECTIONS = ["Intro", "The Problem", "Your Setup", "The Blueprint", "Routines", "Recovery", "Your Plan"];
let pageNo = 0;

// ---------- small components ----------
const pill = (label, dark = true) => `
  <div class="pill ${dark ? "" : "pill-l"}"><span>${label}</span><i class="knob"></i></div>
  <div class="orbs"><i class="orb"></i><i class="chk">✓</i></div>`;

function stripes(w = 300, h = 120, seed = 3, rows = 9, green = true) {
  let s = seed, out = "";
  const r = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
  const rh = h / rows;
  for (let i = 0; i < rows; i++) {
    let x = r() * w * 0.3;
    while (x < w) {
      const bw = 8 + r() * 60;
      const g = green && r() > 0.72;
      const op = g ? 1 : 0.12 + r() * 0.35;
      out += `<rect x="${x.toFixed(1)}" y="${(i * rh).toFixed(1)}" width="${Math.min(bw, w - x).toFixed(1)}" height="${(rh * 0.62).toFixed(1)}" fill="${g ? C.green : "#fff"}" opacity="${op.toFixed(2)}"/>`;
      x += bw + 6 + r() * 70;
    }
  }
  return `<svg class="stripes" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">${out}</svg>`;
}

const progress = (i, dark) => `<div class="prog">${SECTIONS.map((_, k) =>
  `<i style="background:${k === i ? C.green : dark ? "rgba(255,255,255,.18)" : "#D5DBD8"}"></i>`).join("")}</div>`;

function page(theme, sec, inner, opts = {}) {
  pageNo++;
  const dark = theme !== "light" && theme !== "lblue";
  const foot = opts.nofoot ? "" : `
    <footer class="foot">
      <span>MOTIONPLUSE · The Pain-Free Workday Blueprint</span>
      ${progress(sec, dark)}
      <span>${String(pageNo).padStart(2, "0")}</span>
    </footer>`;
  const data = `${opts.nofoot ? ' data-nofit="1"' : ""}${opts.reserve ? ` data-reserve="${opts.reserve}"` : ""}${opts.max ? ` data-max="${opts.max}"` : ""}`;
  return `<section class="page ${theme}"${data}>${inner}${foot}</section>`;
}

// 3D-ish grayscale/navy objects (stand-ins for the reference's product renders)
const orb = (size = 160, id = "o") => `
<svg width="${size}" height="${size}" viewBox="0 0 100 100"><defs>
<radialGradient id="${id}" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="#fff"/><stop offset=".35" stop-color="#A9BFCC"/><stop offset=".8" stop-color="#1C4461"/><stop offset="1" stop-color="#071D2E"/></radialGradient></defs>
<circle cx="50" cy="50" r="46" fill="url(#${id})"/></svg>`;

function coil(w = 200, h = 260, id = "c") {
  let e = "";
  for (let i = 0; i < 16; i++) {
    const y = 30 + i * 13;
    e += `<ellipse cx="${w / 2 + Math.sin(i / 2.5) * 14}" cy="${y}" rx="${62 - Math.abs(i - 8) * 2}" ry="16" fill="none" stroke="url(#${id})" stroke-width="7"/>`;
  }
  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><defs><linearGradient id="${id}" x1="0" x2="1"><stop offset="0" stop-color="#2A4D66"/><stop offset=".45" stop-color="#E8F0F4"/><stop offset="1" stop-color="#16374F"/></linearGradient></defs>${e}</svg>`;
}

function stack(w = 220, h = 220, id = "s") {
  let e = "";
  for (let i = 0; i < 7; i++) {
    const y = 40 + i * 22;
    e += `<path d="M${40 + i * 3} ${y} L${w / 2} ${y - 22} L${w - 40 - i * 3} ${y} L${w / 2} ${y + 22} Z" fill="url(#${id})" stroke="#0B2A43" stroke-width="1" opacity="${0.55 + i * 0.06}"/>`;
  }
  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#EAF4F8"/><stop offset="1" stop-color="#3E6680"/></linearGradient></defs>${e}</svg>`;
}

// Real photography (Pexels, see ../photos/SOURCES.txt)
const photo = (name, w, h, extra = "") =>
  `<div class="photo" style="width:${typeof w === "number" ? w + "px" : w};height:${h}px;background-image:url('../photos/${name}.jpg');${extra}"></div>`;
const headWithPhoto = (heading, name, w = 230, h = 150) =>
  `<div class="row between" style="align-items:flex-start">${heading}${photo(name, w, h)}</div>`;

const tag = (t, cls = "") => `<span class="tag ${cls}">${t}</span>`;

// ---------- diagrams ----------
function bodyMap() {
  const f = "rgba(255,255,255,.10)", s = "rgba(255,255,255,.35)";
  const limb = (x1, y1, x2, y2, w = 20) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${f}" stroke-width="${w}" stroke-linecap="round"/>`;
  // [num, spotX, spotY, title, desc, labelY, side]
  const spots = [
    ["01", 340, 72, "Neck", "Forward head posture loads the cervical spine", 60, "l"],
    ["02", 300, 100, "Shoulders", "Tension from raised, rounded shoulders", 170, "l"],
    ["03", 258, 262, "Wrists", "Repetitive typing and mouse strain", 280, "l"],
    ["04", 340, 190, "Lower back", "Sitting flexed flattens the lumbar curve", 110, "r"],
    ["05", 364, 222, "Hips", "Hip flexors shorten in long sits", 220, "r"],
    ["06", 362, 330, "Knees", "Stiffness from staying bent for hours", 330, "r"],
  ];
  let sp = "";
  for (const [n, x, y, t, d, ly, side] of spots) {
    const tx = side === "l" ? 20 : 480, ex = side === "l" ? 190 : 470;
    sp += `<polyline points="${x},${y} ${side === "l" ? ex + 20 : ex - 20},${ly - 5} ${ex},${ly - 5}" fill="none" stroke="${C.green}" stroke-width="1"/>
      <circle cx="${x}" cy="${y}" r="20" fill="none" stroke="${C.green}" opacity=".4"/><circle cx="${x}" cy="${y}" r="11" fill="${C.green}"/>
      <text x="${x}" y="${y + 3.5}" text-anchor="middle" font-size="9" font-weight="700" fill="${C.navy}">${n}</text>
      <text x="${tx}" y="${ly}" font-size="17" fill="#fff" font-family="Inter Tight">${t}</text>
      <foreignObject x="${tx}" y="${ly + 6}" width="165" height="44"><div xmlns="http://www.w3.org/1999/xhtml" style="font-size:10px;line-height:1.35;color:${C.dmuted}">${d}</div></foreignObject>`;
  }
  return `<svg viewBox="0 0 660 440" width="660" height="440">
    <circle cx="340" cy="40" r="26" fill="${f}" stroke="${s}"/>
    ${limb(340, 62, 340, 80, 18)}
    <path d="M298 92 Q340 80 382 92 L392 210 Q340 222 288 210 Z" fill="${f}" stroke="${s}"/>
    ${limb(300, 98, 276, 190)}${limb(276, 190, 258, 262, 16)}
    ${limb(380, 98, 404, 190)}${limb(404, 190, 422, 262, 16)}
    ${limb(320, 215, 318, 330, 24)}${limb(318, 330, 316, 420, 20)}
    ${limb(360, 215, 362, 330, 24)}${limb(362, 330, 364, 420, 20)}
    ${sp}</svg>`;
}

function deskDiagram() {
  const L = C.navy, g = C.greenS, lab = (x, y, t, a = "start") => `<text x="${x}" y="${y}" font-size="11" fill="${C.ink}" text-anchor="${a}">${t}</text>`;
  const n = (x, y, k) => `<circle cx="${x}" cy="${y}" r="10" fill="${C.green}"/><text x="${x}" y="${y + 3.5}" text-anchor="middle" font-size="9" font-weight="700" fill="${C.navy}">${k}</text>`;
  return `<svg viewBox="0 0 620 400" width="620" height="400" font-family="Inter">
    <line x1="20" y1="360" x2="600" y2="360" stroke="#C9D2CE" stroke-width="2"/>
    <!-- chair -->
    <rect x="130" y="238" width="120" height="12" rx="4" fill="#C9D2CE"/>
    <line x1="134" y1="240" x2="122" y2="120" stroke="#C9D2CE" stroke-width="10" stroke-linecap="round"/>
    <line x1="190" y1="250" x2="190" y2="340" stroke="#C9D2CE" stroke-width="8"/>
    <line x1="145" y1="345" x2="235" y2="345" stroke="#C9D2CE" stroke-width="8" stroke-linecap="round"/>
    <!-- lumbar cushion -->
    <rect x="128" y="190" width="18" height="34" rx="8" fill="${C.green}"/>
    <!-- desk -->
    <rect x="270" y="200" width="250" height="10" fill="${L}"/>
    <line x1="505" y1="210" x2="505" y2="360" stroke="${L}" stroke-width="8"/>
    <!-- monitor -->
    <line x1="455" y1="200" x2="455" y2="160" stroke="${L}" stroke-width="6"/>
    <rect x="446" y="62" width="14" height="100" rx="3" fill="${L}"/>
    <!-- person -->
    <g stroke="${C.trust}" stroke-width="13" stroke-linecap="round" fill="none">
      <line x1="158" y1="228" x2="148" y2="112"/>
      <line x1="158" y1="230" x2="300" y2="238"/>
      <line x1="300" y1="238" x2="302" y2="350"/>
      <line x1="302" y1="352" x2="340" y2="352"/>
      <line x1="150" y1="122" x2="162" y2="196"/>
      <line x1="162" y1="196" x2="290" y2="194"/>
    </g>
    <circle cx="156" cy="78" r="24" fill="${C.trust}"/>
    <!-- sightline -->
    <line x1="176" y1="72" x2="446" y2="84" stroke="${g}" stroke-dasharray="5 4" stroke-width="1.5"/>
    <!-- dimension: arm's length -->
    <line x1="180" y1="36" x2="446" y2="36" stroke="${C.muted}" stroke-width="1"/>
    <line x1="180" y1="30" x2="180" y2="42" stroke="${C.muted}"/><line x1="446" y1="30" x2="446" y2="42" stroke="${C.muted}"/>
    ${lab(313, 28, "About an arm's length (50–70 cm)", "middle")}
    <!-- angle arcs -->
    <path d="M162 176 A20 20 0 0 0 182 196" fill="none" stroke="${g}" stroke-width="2"/>
    <path d="M300 258 A20 20 0 0 1 282 238" fill="none" stroke="${g}" stroke-width="2"/>
    <path d="M178 228 A22 22 0 0 0 156 206" fill="none" stroke="${g}" stroke-width="2"/>
    ${n(470, 70, 1)}${lab(485, 74, "Screen top at or")}${lab(485, 88, "just below eye level")}
    ${n(205, 176, 2)}${lab(220, 170, "Elbows ~90°, relaxed")}
    ${n(98, 208, 3)}${lab(92, 250, "Lumbar support", "end")}${lab(92, 264, "at belt line", "end")}
    ${n(196, 216, 4)}
    ${n(320, 262, 5)}${lab(335, 266, "Hips level or slightly")}${lab(335, 280, "above knees")}
    ${n(330, 378, 6)}${lab(345, 382, "Feet flat — or on a footrest")}
    ${n(112, 104, 7)}${lab(98, 108, "Recline 100–110°", "end")}
  </svg>`;
}

function cycle() {
  const nodes = ["Hours of static sitting", "Reduced blood flow", "Muscle fatigue", "Stiffness & tension", "Aches & pain", "Less movement"];
  const cx = 300, cy = 230, R = 165;
  let out = `<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="rgba(255,255,255,.2)" stroke-dasharray="3 6"/>`;
  nodes.forEach((t, i) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / 6;
    const x = cx + R * Math.cos(a), y = cy + R * Math.sin(a);
    const am = a + Math.PI / 6, ax = cx + R * Math.cos(am), ay = cy + R * Math.sin(am);
    const rot = (am * 180) / Math.PI + 90;
    out += `<path d="M-6 -5 L4 0 L-6 5" transform="translate(${ax},${ay}) rotate(${rot - 90})" fill="none" stroke="${C.green}" stroke-width="2"/>`;
    const hl = i === 4;
    out += `<rect x="${x - 78}" y="${y - 24}" width="156" height="48" rx="6" fill="${hl ? C.green : C.card}"/>
      <text x="${x - 66}" y="${y - 6}" font-size="9" fill="${hl ? C.navy : C.green}" font-weight="600">(00${i + 1})</text>
      <text x="${x - 66}" y="${y + 12}" font-size="13" fill="${hl ? C.navy : "#fff"}" font-family="Inter Tight">${t}</text>`;
  });
  out += `<text x="${cx}" y="${cy - 6}" text-anchor="middle" font-size="30" fill="#fff" font-family="Inter Tight" letter-spacing="-1">The Desk</text>
    <text x="${cx}" y="${cy + 26}" text-anchor="middle" font-size="30" fill="${C.green}" font-family="Inter Tight" letter-spacing="-1">Pain Loop</text>`;
  return `<svg viewBox="0 0 600 460" width="600" height="460">${out}</svg>`;
}

function neckChart() {
  const d = [["0°", 5], ["15°", 12], ["30°", 18], ["45°", 22], ["60°", 27]];
  const W = 620, H = 300, bw = 78, gap = 42, base = 250, sc = 7.4;
  let out = "";
  for (let k = 0; k <= 30; k += 10) out += `<line x1="40" x2="${W}" y1="${base - k * sc}" y2="${base - k * sc}" stroke="#DCE2DF"/><text x="30" y="${base - k * sc + 4}" font-size="10" fill="${C.muted}" text-anchor="end">${k}</text>`;
  d.forEach(([l, v], i) => {
    const x = 70 + i * (bw + gap), h = v * sc, hl = i === 4;
    out += `<rect x="${x}" y="${base - h}" width="${bw}" height="${h}" fill="${hl ? C.green : i === 0 ? C.trust : C.navy}" rx="2"/>
      <text x="${x + bw / 2}" y="${base - h - 10}" text-anchor="middle" font-size="18" font-family="Inter Tight" fill="${C.ink}">${v} kg</text>
      <text x="${x + bw / 2}" y="${base + 20}" text-anchor="middle" font-size="12" fill="${C.ink}">${l}</text>`;
    // head tilt icon
    const a = (parseInt(l) * Math.PI) / 180, hx = x + bw / 2, hy = base + 52;
    out += `<line x1="${hx}" y1="${hy + 14}" x2="${hx + Math.sin(a) * 14}" y2="${hy + 14 - Math.cos(a) * 14}" stroke="${C.muted}" stroke-width="3" stroke-linecap="round"/>
      <circle cx="${hx + Math.sin(a) * 22}" cy="${hy + 14 - Math.cos(a) * 22}" r="7" fill="none" stroke="${C.muted}" stroke-width="2"/>`;
  });
  out += `<text x="40" y="${base + 20}" font-size="10" fill="${C.muted}" text-anchor="end">Tilt</text>`;
  return `<svg viewBox="0 0 ${W} ${H + 60}" width="${W}" height="${H + 60}">${out}</svg>`;
}

function dayGantt() {
  const hrs = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
  const x0 = 70, x1 = 640, px = (x1 - x0) / 10;
  const X = (h) => x0 + (h - 8) * px;
  const rows = [
    ["Sitting focus", C.trust, [[8.5, 10.3], [10.6, 12.3], [13.2, 14.8], [15.2, 16.8]]],
    ["Standing work", C.blue2, [[10.3, 10.5], [14.8, 15.1], [16.8, 17.4]]],
    ["Micro-breaks", C.green, [[9.0, 9.05], [9.5, 9.55], [10.5, 10.6], [11, 11.05], [11.5, 11.55], [13.7, 13.75], [14.2, 14.25], [15.7, 15.75], [16.2, 16.25]]],
    ["Walk / move", C.green, [[12.3, 13.2], [17.4, 18]]],
  ];
  let out = "";
  hrs.forEach((h) => (out += `<line x1="${X(h)}" x2="${X(h)}" y1="20" y2="230" stroke="rgba(255,255,255,.12)"/><text x="${X(h)}" y="252" font-size="10" fill="${C.dmuted}" text-anchor="middle">${String(h).padStart(2, "0")}:00</text>`));
  rows.forEach(([n, col, bl], i) => {
    const y = 36 + i * 50;
    out += `<text x="0" y="${y + 16}" font-size="11" fill="#fff">${n}</text>`;
    bl.forEach(([a, b]) => (out += `<rect x="${X(a)}" y="${y}" width="${Math.max(4, X(b) - X(a))}" height="24" rx="3" fill="${col}"/>`));
  });
  return `<svg viewBox="0 0 650 262" width="650" height="262">${out}</svg>`;
}

function sitStand() {
  const seg = [["Sit", 20, C.trust], ["Stand", 8, C.blue2], ["Move", 2, C.green]];
  let x = 0, out = "";
  for (let r = 0; r < 2; r++) seg.forEach(([t, m, c]) => {
    const w = m * 10.6;
    out += `<rect x="${x}" y="0" width="${w - 3}" height="64" rx="4" fill="${c}"/><text x="${x + 10}" y="26" font-size="12" fill="${c === C.green ? C.navy : "#fff"}" font-weight="600">${m < 5 ? m : t}</text>${m >= 5 ? `<text x="${x + 10}" y="48" font-size="20" font-family="Inter Tight" fill="#fff">${m} min</text>` : ""}`;
    x += w;
  });
  return `<svg viewBox="0 0 640 90" width="640" height="90">${out}<text x="0" y="86" font-size="10" fill="${C.muted}">0 min</text><text x="318" y="86" font-size="10" fill="${C.muted}" text-anchor="middle">30</text><text x="636" y="86" font-size="10" fill="${C.muted}" text-anchor="end">60 min</text></svg>`;
}

function flowchart() {
  const box = (x, y, w, h, t, fill, fg = "#fff", sub = "") => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="${fill}"/><foreignObject x="${x + 12}" y="${y + 8}" width="${w - 24}" height="${h - 12}"><div xmlns="http://www.w3.org/1999/xhtml" style="font-family:Inter Tight;font-size:14px;line-height:1.2;color:${fg}">${t}${sub ? `<div style="font-family:Inter;font-size:9.5px;opacity:.8;margin-top:4px">${sub}</div>` : ""}</div></foreignObject>`;
  const ar = (x1, y1, x2, y2, t = "") => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${C.muted}" stroke-width="1.5" marker-end="url(#ah)"/>${t ? `<text x="${(x1 + x2) / 2 + 6}" y="${(y1 + y2) / 2 - 4}" font-size="10" font-weight="700" fill="${C.greenS}">${t}</text>` : ""}`;
  return `<svg viewBox="0 0 640 470" width="640" height="470" font-family="Inter">
  <defs><marker id="ah" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 Z" fill="${C.muted}"/></marker></defs>
  ${box(210, 0, 220, 54, "Something hurts.", C.navy, "#fff", "Start here")}
  ${ar(320, 54, 320, 84)}
  ${box(170, 86, 300, 64, "Any red-flag symptoms?", C.cardL, C.ink, "Numbness, weakness, fever, loss of bladder control, pain after a fall")}
  ${ar(470, 118, 520, 118, "YES")}
  ${box(522, 86, 118, 64, "See a doctor now", "#B3261E", "#fff")}
  ${ar(320, 150, 320, 184, "NO")}
  ${box(170, 186, 300, 64, "Is it a fresh strain (under 48 h)?", C.cardL, C.ink, "Sudden onset, swelling, warm to the touch")}
  ${ar(170, 218, 120, 218, "YES")}
  ${box(0, 186, 118, 64, "Cold 10–15 min", C.trust, "#fff", "Every 2–3 h")}
  ${ar(320, 250, 320, 284, "NO")}
  ${box(170, 286, 300, 64, "Stiff, achy, tight muscles?", C.cardL, C.ink, "Builds over the day, eases with movement")}
  ${ar(470, 318, 520, 318, "YES")}
  ${box(522, 286, 118, 64, "Heat 15–20 min", C.green, C.navy, "Then gentle mobility")}
  ${ar(320, 350, 320, 384, "UNSURE")}
  ${box(170, 386, 300, 64, "Move gently & track it for 3 days", C.navy, "#fff", "No better after 1–2 weeks? Book a physio.")}
  </svg>`;
}

function painScale() {
  let out = "";
  const cols = ["#5FAF8A", "#6FB58A", "#86BC86", "#A3C27E", "#C2C676", "#DDBF69", "#E8A95C", "#E88E52", "#DF6D4B", "#CF4B45", "#B3261E"];
  for (let i = 0; i <= 10; i++) out += `<rect x="${i * 58}" y="0" width="55" height="56" rx="4" fill="${cols[i]}"/><text x="${i * 58 + 27.5}" y="36" text-anchor="middle" font-size="20" font-family="Inter Tight" fill="${i < 6 ? C.navy : "#fff"}">${i}</text>`;
  const zone = (x, w, t, s) => `<line x1="${x}" x2="${x + w}" y1="74" y2="74" stroke="${C.muted}"/><text x="${x}" y="94" font-size="12" font-weight="600" fill="${C.ink}">${t}</text><text x="${x}" y="110" font-size="10" fill="${C.muted}">${s}</text>`;
  return `<svg viewBox="0 0 640 120" width="640" height="120">${out}${zone(0, 170, "0–2 · Keep going", "Normal stiffness, carry on")}${zone(232, 170, "3–5 · Modify", "Reduce range, go slower")}${zone(464, 174, "6–10 · Stop", "Rest; seek advice if it persists")}</svg>`;
}

function pillows() {
  const card = (x, title, h, desc, spine) => `
    <g transform="translate(${x},0)">
      <rect width="196" height="170" rx="6" fill="${C.card}"/>
      <rect x="20" y="${120 - h}" width="80" height="${h}" rx="${Math.min(12, h / 2)}" fill="${C.green}" opacity=".9"/>
      <circle cx="60" cy="${120 - h - 18}" r="18" fill="none" stroke="#fff" stroke-width="2"/>
      <line x1="78" y1="${120 - h - 18}" x2="180" y2="${120 - h - 18 + spine}" stroke="#fff" stroke-width="2" stroke-dasharray="${spine === 0 ? "0" : "4 3"}"/>
      <rect x="10" y="120" width="176" height="6" fill="rgba(255,255,255,.2)"/>
      <text x="16" y="146" font-size="15" fill="#fff" font-family="Inter Tight">${title}</text>
      <text x="16" y="162" font-size="9.5" fill="${C.dmuted}">${desc}</text>
    </g>`;
  return `<svg viewBox="0 0 620 172" width="620" height="172">${card(0, "Side sleeper", 42, "High & firm — fills shoulder gap", 0)}${card(212, "Back sleeper", 24, "Medium — supports the neck curve", 0)}${card(424, "Stomach sleeper", 10, "Very low — or none at all", 0)}</svg>`;
}

function lineTemplate(dark = false) {
  let out = "";
  const ink = dark ? "rgba(255,255,255,.18)" : "#DCE2DF", tx = dark ? C.dmuted : C.muted;
  for (let v = 0; v <= 10; v += 2) out += `<line x1="36" x2="640" y1="${220 - v * 20}" y2="${220 - v * 20}" stroke="${ink}"/><text x="26" y="${224 - v * 20}" font-size="10" text-anchor="end" fill="${tx}">${v}</text>`;
  for (let d = 1; d <= 14; d++) out += `<text x="${36 + d * 42.5}" y="240" font-size="10" text-anchor="middle" fill="${tx}">D${d}</text><circle cx="${36 + d * 42.5}" cy="220" r="2.5" fill="${ink}"/>`;
  // example ghost line
  const ex = [6, 6, 5, 5, 5, 4, 4, 3, 4, 3, 3, 2, 2, 2];
  out += `<polyline points="${ex.map((v, i) => `${36 + (i + 1) * 42.5},${220 - v * 20}`).join(" ")}" fill="none" stroke="${C.green}" stroke-width="2" stroke-dasharray="4 4" opacity=".7"/>`;
  return `<svg viewBox="0 0 650 250" width="650" height="250">${out}</svg>`;
}

// mini body silhouette with highlighted zone
function miniBody(zone, dark = false) {
  const base = dark ? "rgba(255,255,255,.18)" : "#D5DBD8";
  const zones = { neck: [30, 21], shoulders: [30, 27], back: [30, 50], wrists: [14, 64], hips: [30, 58], legs: [30, 82] };
  const [zx, zy] = zones[zone] || [30, 40];
  return `<svg width="60" height="110" viewBox="0 0 60 110">
    <circle cx="30" cy="10" r="7" fill="${base}"/>
    <rect x="20" y="20" width="20" height="40" rx="6" fill="${base}"/>
    <line x1="18" y1="24" x2="12" y2="62" stroke="${base}" stroke-width="6" stroke-linecap="round"/>
    <line x1="42" y1="24" x2="48" y2="62" stroke="${base}" stroke-width="6" stroke-linecap="round"/>
    <line x1="25" y1="60" x2="24" y2="104" stroke="${base}" stroke-width="7" stroke-linecap="round"/>
    <line x1="35" y1="60" x2="36" y2="104" stroke="${base}" stroke-width="7" stroke-linecap="round"/>
    <circle cx="${zx}" cy="${zy}" r="9" fill="${C.green}" opacity=".35"/><circle cx="${zx}" cy="${zy}" r="4.5" fill="${C.green}"/></svg>`;
}

// ---------- content blocks ----------
const move = (n, name, zone, time, steps, dark = false) => `
  <div class="move ${dark ? "move-d" : ""}">
    <div class="move-h"><span class="idx">(${n})</span>${tag(time, "tg")}</div>
    <div class="move-b">
      ${miniBody(zone, dark)}
      <div><h4>${name}</h4><ol>${steps.map((s) => `<li>${s}</li>`).join("")}</ol></div>
    </div>
  </div>`;

// ---------- PAGES ----------
const P = [];

// 1 Cover
P.push(page("dark", 0, `
  <div class="pad">
    <div class="row between"><div class="brand">MOTIONPLUSE<sup>®</sup></div><div class="small dm">Free Guide · Edition 01 · 2026</div></div>
    <h1 class="mega" style="margin-top:70px">The<br>Pain-Free<br>Workday<br><span class="g">Blueprint</span></h1>
    <div class="row" style="margin-top:26px;gap:10px">${pill("Desk-worker edition")}</div>
    <p class="lead dm" style="max-width:360px;margin-top:28px">A practical, hour-by-hour system to protect your back, neck and joints — built for people who sit for a living.</p>
  </div>
  <div style="position:absolute;right:48px;top:250px">${photo("cover-stretch", 270, 330, "border-radius:10px;box-shadow:0 30px 60px -20px rgba(0,0,0,.6)")}</div>
  <div style="position:absolute;left:0;bottom:190px">${stripes(794, 150, 11, 11)}</div>
  <div class="stat-card green" style="position:absolute;left:56px;bottom:56px;width:210px">
    <div class="small">Inside</div><div class="num">30+</div><div class="small">pages of routines, diagrams & printables</div>
  </div>
  <div class="stat-card" style="position:absolute;left:280px;bottom:56px;width:180px">
    <div class="small dm">Daily time needed</div><div class="num">10 min</div>
  </div>`, { nofoot: true }));

// 2 How to use
P.push(page("light", 0, `
  <div class="pad">
    <div class="row between"><h2 class="h">How to use<br>this guide</h2>${stack(150, 150, "st1")}</div>
    <div class="row" style="gap:10px;margin:8px 0 34px">${pill("Read · Try · Track", false)}</div>
    <div class="grid3">
      ${[["01", "Read the why", "Sections 01–02 explain what sitting does to your body and how to fix your setup in 15 minutes."],
         ["02", "Run the day", "Section 03 gives you an hour-by-hour plan. Follow it for one normal workday first."],
         ["03", "Track 14 days", "Use the printable tracker and journal at the back. Small daily wins compound fast."]]
        .map(([n, t, d]) => `<div class="cardL"><div class="idx">(${n})</div><h4>${t}</h4><p>${d}</p></div>`).join("")}
    </div>
    <div class="callout" style="margin-top:28px">
      <div class="small b">What you'll need</div>
      <div class="grid2 tight" style="margin-top:10px">
        <div>✓ A chair and desk you already own</div><div>✓ 10 minutes a day</div>
        <div>✓ A towel or small cushion</div><div>✓ A printer (optional)</div>
      </div>
    </div>
    <div class="cardL white" style="margin-top:22px">
      <div class="row between"><h4>Quick self-check</h4>${tag("Score yourself", "tg")}</div>
      <table class="tbl" style="margin-top:8px">
        <tbody>${["I sit for more than 6 hours on most workdays", "I often end the day with a stiff neck or shoulders", "My lower back aches after long sits", "I rarely take a break in the first 2 hours of work", "My screen sits below eye level (laptop on the desk)"]
          .map((q, i) => `<tr><td style="width:30px" class="idx">0${i + 1}</td><td>${q}</td><td style="width:110px"><span class="box"></span> Yes &nbsp; <span class="box"></span> No</td></tr>`).join("")}</tbody>
        <tfoot><tr><td></td><td>0–1 yes: fine-tune · 2–3 yes: start the 14-day plan · 4–5 yes: start today</td><td></td></tr></tfoot>
      </table>
    </div>
    <div class="disclaimer">
      <div class="small b">Important — please read</div>
      <p>This guide is for general education and wellbeing. It is not medical advice and does not diagnose or treat any condition. Stop any movement that causes sharp pain. If you have an existing injury, recent surgery, are pregnant, or have symptoms like numbness, weakness or pain that won't settle, talk to a doctor or physiotherapist before starting.</p>
    </div>
  </div>`));

// 3–4 TOC (spread)
const toc = [["001", "The Desk Problem", "05"], ["002", "Your Body at the Desk", "06"], ["003", "Workstation Setup", "09"], ["004", "The Hour-by-Hour Blueprint", "13"],
  ["005", "Micro-Break Library", "16"], ["006", "Targeted Routines", "18"], ["007", "Recovery at Home", "23"], ["008", "Your 14-Day Plan", "28"]];
P.push(page("dark", 0, `
  <div class="pad">
    <h1 class="mega">Table of</h1>
    <div class="row" style="gap:10px;margin-top:18px">${pill("08 chapters")}</div>
  </div>
  <div style="position:absolute;left:0;top:380px">${stripes(794, 360, 5, 18)}</div>
  <div class="pad nofit" style="position:absolute;bottom:70px">
    <p class="dm" style="max-width:320px">Start anywhere. If you only have five minutes today, jump straight to the Micro-Break Library on page 16.</p>
  </div>`));
P.push(page("dark", 0, `
  <div class="pad">
    <div class="toc-box">
      ${toc.slice(0, 4).map(([n, t, p], i) => `<div class="toc-row ${i === 0 ? "act" : ""}"><span>(${n})</span><span>${t}</span><span>${p}</span></div>`).join("")}
    </div>
    <div class="grid2" style="margin-top:34px;gap:0 34px">
      ${toc.slice(4).map(([n, t, p]) => `<div class="toc-line"><span><span class="g">(${n})</span>${t}</span><span class="dm">${p}</span></div>`).join("")}
    </div>
  </div>
  <h1 class="mega" style="position:absolute;bottom:80px;right:56px;text-align:right;font-size:120px">Content</h1>`, { reserve: 200 }));

// 5 Section opener: the problem (stats)
P.push(page("dark", 1, `
  <div class="pad">
    <div class="small g">Chapter 001</div>
    <h1 class="mega" style="margin-top:10px">The Desk<br>Problem</h1>
    <div class="row" style="gap:10px;margin-top:18px">${pill("Why it hurts")}</div>
    <div class="grid2" style="margin-top:48px;gap:18px">
      <div class="stat-card"><div class="small dm">People living with low back pain (2020)</div><div class="num">619M</div></div>
      <div class="stat-card"><div class="small dm">Projected by 2050</div><div class="num">843M</div></div>
      <div class="stat-card green"><div class="small">Global rank of low back pain as a cause of disability</div><div class="num">#1</div></div>
      <div class="stat-card"><div class="small dm">Extra load on your neck at a 60° head tilt</div><div class="num">~5×</div></div>
    </div>
    ${photo("desk-fatigue", "100%", 170, "margin-top:22px;background-position:center 35%")}
    <p class="dm" style="margin-top:22px;max-width:560px">Our bodies are built to move, but modern work asks them to hold one shape for hours. The result isn't one dramatic injury — it's a slow build-up of stiffness that turns into everyday pain.</p>
    <p class="src">Sources: GBD 2021 Low Back Pain Collaborators, <i>The Lancet Rheumatology</i> (2023); World Health Organization, Low back pain fact sheet (2023); Hansraj, <i>Surgical Technology International</i> (2014).</p>
  </div>
  `));

// 6 Body map
P.push(page("deep", 1, `
  <div class="pad">
    <div class="row between"><h2 class="h">Your Body<br>at the Desk</h2><div class="small dm" style="max-width:220px;text-align:right">Six pressure points take most of the load during a seated workday.</div></div>
    <div style="margin-top:30px">${bodyMap()}</div>
    <div class="grid3" style="margin-top:14px">
      <div class="stat-card"><div class="small dm">Hotspots</div><div class="num">6</div></div>
      <div class="stat-card"><div class="small dm">Most common complaint</div><div class="num sm">Lower back</div></div>
      <div class="stat-card green"><div class="small">Best fix for all six</div><div class="num sm">Movement</div></div>
    </div>
  </div>`));

// 7 Pain loop
P.push(page("dark", 1, `
  <div class="pad">
    <div class="small g">002 · How pain builds</div>
    <h2 class="h" style="margin-top:8px">The loop that<br>keeps you sore</h2>
    <div style="margin:24px auto 0;width:600px">${cycle()}</div>
    <div class="grid2" style="margin-top:10px;gap:18px">
      <div class="cardD"><h4>Break the loop early</h4><p class="dm">The easiest place to interrupt the cycle is step 001. A 2-minute movement break every 30 minutes stops fatigue from ever building.</p></div>
      <div class="callout-g"><div class="small b">Key idea</div><p>Your next posture is your best posture. No single "perfect" position beats changing position often.</p></div>
    </div>
  </div>`));

// 8 Neck chart
P.push(page("light", 1, `
  <div class="pad">
    <div class="row between"><h2 class="h">Tech Neck,<br>Measured</h2>${pill("Head-tilt load", false)}</div>
    <p class="muted" style="max-width:520px;margin-top:18px">An adult head weighs about 5 kg upright. Tilt it forward to look at a phone or low laptop screen, and the effective load on your neck multiplies.</p>
    <div style="margin-top:28px">${neckChart()}</div>
    <div class="grid3" style="margin-top:22px">
      <div class="cardL"><div class="idx">Fix 01</div><h4>Raise the screen</h4><p>Laptop on a stand or books, with an external keyboard.</p></div>
      <div class="cardL"><div class="idx">Fix 02</div><h4>Phone to eyes</h4><p>Lift your phone, don't drop your head.</p></div>
      <div class="cardL green"><div class="idx">Fix 03</div><h4>Chin tucks</h4><p>10 reps, twice a day (page 18).</p></div>
    </div>
    <p class="src" style="color:${C.muted}">Source: Hansraj KK. Assessment of stresses in the cervical spine caused by posture and position of the head. <i>Surgical Technology International</i>, 2014. Values rounded.</p>
  </div>`));

// 9 Section opener: setup
P.push(page("light", 2, `
  <div class="pad">
    <div class="small gs">Chapter 003</div>
    <h1 class="mega dark" style="margin-top:10px">Workstation<br>Setup</h1>
    <div class="row" style="gap:10px;margin-top:18px">${pill("15-minute fix", false)}</div>
    <div class="grid2" style="margin-top:60px;gap:18px;align-items:end">
      <div>${photo("desk", 300, 260)}</div>
      <div>
        <div class="stat-card green"><div class="small">Time to fix your setup</div><div class="num">15 min</div></div>
        <div class="cardL" style="margin-top:14px"><h4>Cost</h4><p>Usually nothing. Books, a rolled towel and a box fix most setups.</p></div>
      </div>
    </div>
    <p class="muted" style="margin-top:36px;max-width:560px">Your chair, desk and screen decide the posture you fall into when you stop thinking about it. Set them up once, and good posture becomes the default instead of a daily battle.</p>
  </div>`));

// 10 Desk diagram
P.push(page("lblue", 2, `
  <div class="pad">
    <div class="row between"><h2 class="h">The Ideal<br>Desk Setup</h2><div class="small muted" style="max-width:220px;text-align:right">Side view. Adjust in this order: chair → desk → screen.</div></div>
    <div style="margin-top:34px;background:#fff;border-radius:8px;padding:18px 6px">${deskDiagram()}</div>
    <div class="grid3" style="margin-top:20px">
      ${[["1", "Screen", "Top edge at eye level, about an arm's length away."], ["2–4", "Arms & back", "Elbows near 90°, shoulders relaxed, lower back supported."], ["5–7", "Legs & recline", "Hips level or above knees, feet flat, recline 100–110°."]]
        .map(([n, t, d]) => `<div class="cardL white"><div class="idx">(${n})</div><h4>${t}</h4><p>${d}</p></div>`).join("")}
    </div>
  </div>`));

// 11 Checklist table
const rows = [
  ["Chair height", "Feet flat, thighs roughly level", "Add a footrest or box"],
  ["Lumbar support", "Fills the gap at your belt line", "Rolled towel or cushion"],
  ["Seat depth", "2–3 fingers behind the knees", "Cushion behind your back"],
  ["Desk height", "Elbows at or just above desk", "Raise chair, add footrest"],
  ["Screen height", "Top edge at eye level", "Stack books under it"],
  ["Screen distance", "About an arm's length", "Push it back"],
  ["Keyboard & mouse", "Close, wrists straight", "Bring them to the desk edge"],
  ["Lighting", "No glare on the screen", "Angle the screen from windows"],
];
P.push(page("light", 2, `
  <div class="pad">
    <h2 class="h">Setup Audit</h2>
    <div class="row" style="gap:10px;margin:14px 0 26px">${pill("Tick as you go", false)}</div>
    <table class="tbl">
      <thead><tr><th></th><th>Element</th><th>Target</th><th>Quick fix</th></tr></thead>
      <tbody>${rows.map(([a, b, c]) => `<tr><td><span class="box"></span></td><td><b>${a}</b></td><td>${b}</td><td class="muted">${c}</td></tr>`).join("")}</tbody>
      <tfoot><tr><td></td><td>Your score</td><td>___ / 8 ticked</td><td>Goal: 8 / 8</td></tr></tfoot>
    </table>
    <div class="grid2" style="margin-top:26px;gap:18px">
      <div class="callout-g"><div class="small b">Working from a laptop?</div><p>A laptop can't be ergonomic on its own: either the screen or the keyboard is always wrong. A stand plus a separate keyboard fixes both.</p></div>
      <div class="cardL"><div class="small b">Eyes count too</div><p>Every 20 minutes, look at something 20 feet (6 m) away for 20 seconds. Your neck relaxes when your eyes do.</p></div>
    </div>
  </div>`));

// 12 Sit-stand rhythm
P.push(page("light", 2, `
  <div class="pad">
    <div class="row between"><h2 class="h">Sit. Stand.<br>Move.</h2>${photo("standing-desk", 190, 140)}</div>
    <p class="muted" style="max-width:540px;margin-top:16px">Standing all day isn't the answer either. The goal is variety. Use this simple 30-minute rhythm as a starting point.</p>
    <div class="cardL white" style="margin-top:26px;padding:24px">
      <div class="row between"><h4>The 20-8-2 rhythm</h4>${tag("Every 30 minutes", "tg")}</div>
      <div style="margin-top:18px">${sitStand()}</div>
    </div>
    <div class="grid3" style="margin-top:22px">
      <div class="stat-card lt"><div class="small muted">Sit</div><div class="num dk">20 min</div><p class="muted">Supported, upright, feet flat.</p></div>
      <div class="stat-card lt"><div class="small muted">Stand</div><div class="num dk">8 min</div><p class="muted">Calls, reading, email triage.</p></div>
      <div class="stat-card green"><div class="small">Move</div><div class="num">2 min</div><p>Walk, stretch, refill water.</p></div>
    </div>
    <table class="tbl" style="margin-top:24px">
      <thead><tr><th>No standing desk?</th><th>Try this instead</th></tr></thead>
      <tbody>
        <tr><td>Phone calls</td><td>Take every call standing or walking</td></tr>
        <tr><td>Meetings</td><td>Stand for the first 5 minutes of each video call</td></tr>
        <tr><td>Water</td><td>Use a small glass so you refill more often</td></tr>
      </tbody>
    </table>
    <p class="src" style="color:${C.muted}">The 20-8-2 pattern is widely attributed to Cornell University ergonomics guidance; treat it as a starting point, not a rule.</p>
  </div>`));

// 13 Blueprint opener + timeline
const tl = [["07:00", "Wake", "Wake-up mobility", "3-minute routine before your phone: cat-cow, hip circles, reach."],
  ["08:45", "Start", "Setup check", "30 seconds: chair, screen, feet. Fix whatever drifted."],
  ["10:30", "AM", "First movement snack", "2 minutes: chin tucks, shoulder rolls, standing back bend."],
  ["12:30", "Lunch", "Walk after eating", "10–15 minute walk. Eat away from your desk."],
  ["15:00", "Slump", "Afternoon reset", "Hip-flexor stretch + wrist routine. Hardest hour for posture."],
  ["17:30", "Close", "Decompress", "The 10-Minute Back Reset (page 20)."],
  ["21:30", "Night", "Wind-down", "Neck release, heat if stiff, pillow check."]];
P.push(page("dark", 3, `
  <div class="pad">
    <div class="small g">Chapter 004</div>
    <h1 class="mega" style="margin-top:10px;font-size:78px">The Hour-by-<br>Hour Blueprint</h1>
    <div class="row" style="gap:10px;margin-top:18px">${pill("One normal workday")}</div>
    <div class="timeline" style="margin-top:34px">
      ${tl.map(([t, s, h, d], i) => `<div class="tl-row ${i === 4 ? "act" : ""}"><span class="t">${t}</span><span class="s">${s}</span><div><h4>${h}</h4><p>${d}</p></div></div>`).join("")}
    </div>
  </div>`));

// 14 Gantt
P.push(page("deep", 3, `
  <div class="pad">
    <h2 class="h">Your Day,<br>Visualised</h2>
    <div class="row" style="gap:10px;margin:14px 0 30px">${pill("08:00 – 18:00")}</div>
    <div class="cardD" style="padding:24px 18px">${dayGantt()}</div>
    <div class="grid4" style="margin-top:22px">
      <div class="stat-card"><div class="small dm">Longest single sit</div><div class="num">30m</div></div>
      <div class="stat-card"><div class="small dm">Micro-breaks</div><div class="num">9+</div></div>
      <div class="stat-card"><div class="small dm">Standing time</div><div class="num">~1 h</div></div>
      <div class="stat-card green"><div class="small">Extra walking</div><div class="num">20m+</div></div>
    </div>
    <div class="callout-g" style="margin-top:22px"><div class="small b">Make it automatic</div><p>Set a repeating 30-minute timer, or link breaks to things that already happen: every sent email batch, every finished call, every coffee refill.</p></div>
  </div>`));

// 15 Habit stacking
P.push(page("light", 3, `
  <div class="pad">
    <h2 class="h">Stack the<br>Habits</h2>
    <p class="muted" style="max-width:520px;margin-top:16px">New habits stick when you attach them to something you already do. Pick three pairs from this table.</p>
    <table class="tbl" style="margin-top:26px">
      <thead><tr><th>When I…</th><th>I will…</th><th>Time</th></tr></thead>
      <tbody>
        ${[["Boil the kettle", "Do 10 chin tucks", "30 s"], ["Open my laptop", "Check chair, screen and feet", "30 s"], ["Finish a meeting", "Stand and do 5 back bends", "45 s"],
           ["Send a big email", "Roll my shoulders 10 times", "20 s"], ["Visit the bathroom", "Do a doorway chest stretch", "30 s"], ["Brush my teeth at night", "Do 10 calf raises", "30 s"]]
          .map(([a, b, c]) => `<tr><td>${a}</td><td><b>${b}</b></td><td>${tag(c)}</td></tr>`).join("")}
      </tbody>
      <tfoot><tr><td>Total</td><td>6 tiny habits</td><td>≈ 3 min</td></tr></tfoot>
    </table>
    <div class="grid2" style="margin-top:28px;gap:18px;align-items:center">
      ${photo("walk-break", 300, 250)}
      <div><div class="stat-card green"><div class="small">Rule of thumb</div><div class="num sm">Too small to skip</div></div>
      <p class="muted" style="margin-top:14px">If a habit feels like effort, make it smaller. Five chin tucks you actually do beat twenty you skip.</p></div>
    </div>
  </div>`));

// 16–17 Micro-break library
const breaks = [
  ["01", "Chin tuck", "neck", "30 s", ["Sit tall, eyes level.", "Glide your chin straight back, making a double chin.", "Hold 3 s, release. Repeat 10×."]],
  ["02", "Shoulder rolls", "shoulders", "20 s", ["Lift shoulders to your ears.", "Roll them back and down.", "Repeat 10× slowly."]],
  ["03", "Standing back bend", "back", "30 s", ["Stand, hands on lower back.", "Gently lean back, looking up slightly.", "Hold 2 s. Repeat 5×."]],
  ["04", "Wrist flexor stretch", "wrists", "40 s", ["Arm straight, palm up.", "Gently pull fingers back with the other hand.", "Hold 20 s each side."]],
  ["05", "Seated figure-4", "hips", "60 s", ["Cross ankle over opposite knee.", "Sit tall and lean forward slightly.", "Hold 30 s each side."]],
  ["06", "Calf raises", "legs", "30 s", ["Stand holding the desk.", "Rise onto your toes, lower slowly.", "Repeat 15×."]],
];
P.push(page("dark", 4, `
  <div class="pad">
    <div class="small g">Chapter 005</div>
    <h2 class="h" style="margin-top:8px">Micro-Break<br>Library</h2>
    <div class="row" style="gap:10px;margin:14px 0 26px">${pill("Under 60 seconds each")}</div>
    <div class="grid2" style="gap:14px">${breaks.slice(0, 4).map((b) => move(b[0], b[1], b[2], b[3], b[4], true)).join("")}</div>
  </div>`));
P.push(page("dark", 4, `
  <div class="pad">
    <div class="grid2" style="gap:14px">${breaks.slice(4).map((b) => move(b[0], b[1], b[2], b[3], b[4], true)).join("")}</div>
    <div class="callout-g" style="margin-top:22px"><div class="small b">Build your 2-minute break</div><p>Pick any three moves from this library. Rotate them through the day so every hotspot gets attention.</p></div>
    <table class="tbl dk" style="margin-top:22px">
      <thead><tr><th>Ready-made combo</th><th>Moves</th><th>Best for</th></tr></thead>
      <tbody>
        <tr><td><b>The Reset</b></td><td>01 · 02 · 03</td><td>Mid-morning slump</td></tr>
        <tr><td><b>The Typist</b></td><td>02 · 04 · 01</td><td>Heavy keyboard days</td></tr>
        <tr><td><b>The Unfold</b></td><td>03 · 05 · 06</td><td>After long meetings</td></tr>
      </tbody>
    </table>
  </div>
  <div style="position:absolute;left:0;bottom:70px">${stripes(794, 150, 21, 9)}</div>`, { reserve: 160 }));

// 18 Section opener: routines — neck & shoulders
P.push(page("light", 4, `
  <div class="pad">
    <div class="small gs">Chapter 006 · Routine A</div>
    ${headWithPhoto(`<h2 class="h" style="margin-top:8px">Neck &amp;<br>Shoulders</h2>`, "neck-stretch")}
    <div class="row" style="gap:10px;margin:14px 0 24px">${pill("5 minutes · twice daily", false)}</div>
    <div class="grid2" style="gap:14px">
      ${[["01", "Chin tucks", "neck", "10 reps", ["Sit or stand tall.", "Glide chin straight back.", "Hold 3 s, slowly release."]],
         ["02", "Upper-trap stretch", "neck", "2 × 20 s", ["Right hand under your seat.", "Tilt left ear to left shoulder.", "Switch sides."]],
         ["03", "Doorway chest opener", "shoulders", "2 × 30 s", ["Forearms on a door frame.", "Step through gently.", "Feel the stretch across your chest."]],
         ["04", "Wall angels", "shoulders", "8 reps", ["Back and head against a wall.", "Slide arms up in a 'W' to a 'Y'.", "Keep your lower back flat."]]]
        .map((b) => move(...b)).join("")}
    </div>
    <table class="tbl" style="margin-top:22px">
      <thead><tr><th>Week</th><th>Chin tucks</th><th>Stretch holds</th><th>Wall angels</th></tr></thead>
      <tbody><tr><td>1</td><td>10</td><td>20 s</td><td>6</td></tr><tr><td>2</td><td>12</td><td>30 s</td><td>8</td></tr></tbody>
      <tfoot><tr><td>Goal</td><td>15</td><td>30 s</td><td>10</td></tr></tfoot>
    </table>
  </div>`));

// 19 Lower back reset (plans style)
P.push(page("dark", 4, `
  <div class="pad">
    <div class="small g">Routine B</div>
    ${headWithPhoto(`<h2 class="h" style="margin-top:8px">The 10-Minute<br>Back Reset</h2>`, "glute-bridge", 180, 130)}
    <div class="row" style="gap:10px;margin:14px 0 26px">${pill("Choose your level")}</div>
    <div class="grid3">
      <div class="plan"><h4>Starter</h4><p class="dm">Stiff, new to exercise</p><ul><li>Cat-cow ×8</li><li>Knee rocks ×10</li><li>Child's pose 30 s</li></ul><div class="price">6 min</div></div>
      <div class="plan"><h4>Standard</h4><p class="dm">Most desk workers</p><ul><li>Cat-cow ×10</li><li>Glute bridge ×12</li><li>Bird-dog ×8/side</li><li>Child's pose 45 s</li></ul><div class="price">10 min</div></div>
      <div class="plan green"><h4>Strong</h4><p>Active, no current pain</p><ul><li>Cat-cow ×10</li><li>Bridge ×15, hold 3 s</li><li>Bird-dog ×10/side</li><li>Side plank 3 × 20 s</li><li>Dead bug ×10</li></ul><div class="price">12 min</div></div>
    </div>
    <div class="grid2" style="margin-top:22px;gap:14px">
      ${move("01", "Glute bridge", "hips", "12 reps", ["Lie on back, knees bent.", "Squeeze glutes, lift hips.", "Lower slowly over 3 s."], true)}
      ${move("02", "Bird-dog", "back", "8 / side", ["On hands and knees.", "Reach opposite arm and leg.", "Keep hips level; hold 2 s."], true)}
    </div>
  </div>`));

// 20 Lower back — why it works (diagram of core)
P.push(page("light", 4, `
  <div class="pad">
    <div class="row between"><h2 class="h">Why the Reset<br>Works</h2>${photo("cat-cow", 210, 140)}</div>
    <div class="grid2" style="margin-top:28px;gap:22px">
      <div>
        <svg viewBox="0 0 300 330" width="300" height="330">
          <rect x="0" y="0" width="300" height="330" rx="8" fill="${C.cardL}"/>
          ${[0, 1, 2, 3, 4].map((i) => `<rect x="${118 - Math.sin(i / 1.3) * 12}" y="${40 + i * 50}" width="64" height="36" rx="10" fill="${C.navy}"/><rect x="${126 - Math.sin(i / 1.3) * 12}" y="${78 + i * 50}" width="48" height="10" rx="5" fill="${C.green}"/>`).join("")}
          <text x="200" y="64" font-size="11" fill="${C.ink}">L1</text><text x="200" y="264" font-size="11" fill="${C.ink}">L5</text>
          <path d="M60 40 Q30 160 60 290" fill="none" stroke="${C.trust}" stroke-width="3"/>
          <path d="M240 40 Q270 160 240 290" fill="none" stroke="${C.trust}" stroke-width="3"/>
          <text x="18" y="320" font-size="10" fill="${C.muted}">Muscles = support</text><text x="200" y="320" font-size="10" fill="${C.muted}">Discs = cushion</text>
        </svg>
      </div>
      <div>
        ${[["Mobility", "Cat-cow and knee rocks gently move each spinal segment after hours in one shape."], ["Strength", "Bridges and bird-dogs wake up the glutes and deep core muscles that sitting switches off."], ["Control", "Slow, controlled reps teach your back to stabilise under everyday load."]]
          .map(([t, d], i) => `<div class="feat"><span class="idx">(00${i + 1})</span><div><h4>${t}</h4><p class="muted">${d}</p></div></div>`).join("")}
      </div>
    </div>
    <div class="grid3" style="margin-top:22px">
      <div class="stat-card lt"><div class="small muted">Sessions / week</div><div class="num dk">5+</div></div>
      <div class="stat-card lt"><div class="small muted">Time / session</div><div class="num dk">10 min</div></div>
      <div class="stat-card green"><div class="small">Noticeable change</div><div class="num">2–4 wks</div></div>
    </div>
  </div>`));

// 21 Wrists & hands
P.push(page("light", 4, `
  <div class="pad">
    <div class="small gs">Routine C</div>
    ${headWithPhoto(`<h2 class="h" style="margin-top:8px">Wrists &amp;<br>Hands</h2>`, "wrist-stretch")}
    <div class="row" style="gap:10px;margin:14px 0 24px">${pill("3 minutes · after long typing", false)}</div>
    <div class="grid2" style="gap:14px">
      ${[["01", "Prayer stretch", "wrists", "2 × 20 s", ["Palms together at chest.", "Lower hands, keep palms pressed.", "Stop at a gentle stretch."]],
         ["02", "Reverse prayer", "wrists", "2 × 15 s", ["Backs of hands together.", "Fingers pointing down.", "Lift elbows gently."]],
         ["03", "Tendon glides", "wrists", "5 cycles", ["Straight fingers → hook fist.", "Full fist → flat fist.", "Move slowly through each."]],
         ["04", "Fist-to-spread", "wrists", "10 reps", ["Make a soft fist.", "Spread fingers wide.", "Repeat, both hands."]]]
        .map((b) => move(...b)).join("")}
    </div>
    <div class="grid2" style="margin-top:22px;gap:14px">
      <div class="callout-g"><div class="small b">Neutral wrist rule</div><p>Your hand should line up with your forearm when typing, not bent up, down or sideways. Lower the keyboard feet if needed.</p></div>
      <div class="cardL"><div class="small b">Mouse tip</div><p>Move the mouse from your elbow, not your wrist, and keep it right next to the keyboard.</p></div>
    </div>
  </div>`));

// 22 Hips & legs
P.push(page("dark", 4, `
  <div class="pad">
    <div class="small g">Routine D</div>
    ${headWithPhoto(`<h2 class="h" style="margin-top:8px">Hips, Knees<br>&amp; Legs</h2>`, "hip-flexor", 190, 140)}
    <div class="row" style="gap:10px;margin:14px 0 24px">${pill("6 minutes · end of day")}</div>
    <div class="grid2" style="gap:14px">
      ${[["01", "Half-kneeling hip-flexor stretch", "hips", "2 × 30 s", ["One knee down on a cushion.", "Tuck pelvis, squeeze back glute.", "Shift forward gently."]],
         ["02", "Sit-to-stand", "legs", "10 reps", ["Sit near the chair edge.", "Stand up without using hands.", "Lower slowly over 3 s."]],
         ["03", "Seated knee extensions", "legs", "12 / side", ["Sit tall.", "Straighten one knee fully.", "Hold 2 s at the top."]],
         ["04", "Hamstring floss", "legs", "10 / side", ["Sit tall, one leg straight.", "Point and flex the foot.", "Lean forward slightly."]]]
        .map((b) => move(...b, true)).join("")}
    </div>
    <div class="grid3" style="margin-top:22px">
      <div class="stat-card"><div class="small dm">Hip flexors shortened while seated</div><div class="num sm">All day</div></div>
      <div class="stat-card"><div class="small dm">Knee-friendly</div><div class="num sm">Low impact</div></div>
      <div class="stat-card green"><div class="small">Pair with</div><div class="num sm">Evening walk</div></div>
    </div>
  </div>`));

// 23 Recovery opener - heat vs cold matrix
P.push(page("dark", 5, `
  <div class="pad">
    <div class="small g">Chapter 007</div>
    <h1 class="mega" style="margin-top:10px">Recovery<br>at Home</h1>
    <div class="row" style="gap:10px;margin-top:18px">${pill("Heat vs. cold")}</div>
    <table class="tbl dk" style="margin-top:40px">
      <thead><tr><th></th><th>Heat</th><th>Cold</th></tr></thead>
      <tbody>
        <tr><td>Best for</td><td>Stiffness, tight muscles, chronic aches</td><td>Fresh strains, swelling, flare-ups</td></tr>
        <tr><td>How it helps</td><td>Relaxes muscles, increases blood flow</td><td>Numbs pain, may reduce swelling</td></tr>
        <tr><td>Duration</td><td>15–20 minutes</td><td>10–15 minutes</td></tr>
        <tr><td>Timing</td><td>Before movement, or evenings</td><td>First 48 hours after a strain</td></tr>
        <tr><td>Avoid when</td><td>Area is swollen, hot or bruised</td><td>Poor circulation or numbness</td></tr>
      </tbody>
      <tfoot><tr><td>Golden rule</td><td colspan="2">Always use a cloth layer between skin and the heat or cold source.</td></tr></tfoot>
    </table>
  </div>
  <div style="position:absolute;right:36px;top:36px">${orb(110, "ob4")}</div>`));

// 24 Flowchart
P.push(page("light", 5, `
  <div class="pad">
    <div class="row between"><h2 class="h">What Should<br>I Do?</h2>${pill("Decision guide", false)}</div>
    <div style="margin-top:34px">${flowchart()}</div>
    <p class="muted" style="margin-top:18px;max-width:560px">This flowchart is a general guide only. When in doubt, especially if pain is severe, spreading or getting worse, get checked by a professional.</p>
  </div>`));

// 25 Sleep
P.push(page("dark", 5, `
  <div class="pad">
    ${headWithPhoto(`<h2 class="h">Sleep Without<br>the Stiff Neck</h2>`, "sleep", 240, 150)}
    <div class="row" style="gap:10px;margin:14px 0 26px">${pill("Pillow height guide")}</div>
    <p class="dm" style="max-width:540px">The goal is simple: keep your neck in line with the rest of your spine. The right pillow height depends on how you sleep.</p>
    <div style="margin-top:24px">${pillows()}</div>
    <div class="grid2" style="margin-top:24px;gap:14px">
      <div class="cardD"><h4>Bedroom checklist</h4><ul class="chk">
        <li>Pillow height matches your sleep position</li><li>Mattress doesn't sag in the middle</li><li>Phone away 30 min before bed</li><li>Room cool, dark and quiet</li></ul></div>
      <div class="cardD"><h4>5-minute wind-down</h4><ul class="chk">
        <li>Chin tucks ×10, lying down</li><li>Knee rocks ×10</li><li>Heat on neck or back if stiff</li><li>3 slow breaths, 4 s in / 6 s out</li></ul></div>
    </div>
    <table class="tbl dk" style="margin-top:22px">
      <thead><tr><th>Position</th><th>Pillow</th><th>Extra support</th></tr></thead>
      <tbody>
        <tr><td><b>Side</b></td><td>Fills the gap between ear and mattress</td><td>Pillow between the knees</td></tr>
        <tr><td><b>Back</b></td><td>Supports the neck curve, head not pushed forward</td><td>Pillow under the knees</td></tr>
        <tr><td><b>Stomach</b></td><td>Very thin, or none</td><td>Thin pillow under the hips</td></tr>
      </tbody>
      <tfoot><tr><td>Test</td><td colspan="2">Lying down, your nose should line up with the centre of your chest.</td></tr></tfoot>
    </table>
  </div>`));

// 26 Tools & support — product spotlight
P.push(page("light", 5, `
  <div class="pad">
    <div class="row between"><h2 class="h">Your Recovery<br>Toolkit</h2>${stack(130, 130, "st3")}</div>
    <p class="muted" style="max-width:540px;margin-top:14px">Movement comes first. Supports and recovery tools are there to make the good habits easier, not to replace them.</p>
    <div class="grid2" style="margin-top:24px;gap:14px">
      ${[["Lumbar Support Belt", "Back support", "Firm, adjustable compression for long shifts, lifting and commuting.", "Wear for tasks, not all day"],
         ["Neck & Sleep Support", "Neck & sleep", "Keeps the neck aligned overnight so you wake up less stiff.", "Pair with the wind-down"],
         ["Heated Knee Massager", "Knee support", "Soothing heat and vibration before movement or after a long day.", "15–20 min sessions"],
         ["Recovery Tech", "Recovery", "Targeted muscle relief for shoulders, back and legs after activity.", "Light pressure, keep moving"]]
        .map(([n, t, d, u], i) => `<div class="prod ${i === 0 ? "green" : ""}"><div class="row between">${tag(t, i === 0 ? "tn" : "")}<span class="idx">(00${i + 1})</span></div><h4>${n}</h4><p>${d}</p><div class="use">${u}</div></div>`).join("")}
    </div>
    <div class="callout" style="margin-top:22px"><div class="small b">How to use a support belt well</div><p>Use it during demanding tasks such as lifting, long drives or long shifts, and keep doing the strengthening routines on pages 19–22 so your own muscles do more of the work over time.</p></div>
    <p class="small muted" style="margin-top:14px">Shop the full range in the MotionPluse online store.</p>
  </div>`));

// 27 Pain scale + red flags
P.push(page("light", 5, `
  <div class="pad">
    <h2 class="h">Listen to<br>the Signals</h2>
    <div class="row" style="gap:10px;margin:14px 0 26px">${pill("Pain scale 0–10", false)}</div>
    ${painScale()}
    <div class="grid2" style="margin-top:34px;gap:18px">
      <div class="redflag"><div class="small b">Red flags: see a doctor promptly</div><ul>
        <li>Numbness or tingling in the groin or buttocks</li><li>Loss of bladder or bowel control</li><li>Weakness in a leg or arm</li>
        <li>Pain after a fall or accident</li><li>Fever or unexplained weight loss with back pain</li><li>Severe pain at night that doesn't ease</li></ul></div>
      <div>
        <div class="cardL"><h4>Good signs</h4><p>Stiffness that eases as you move. Pain that settles within 24 hours of exercise. Gradually better mornings.</p></div>
        <div class="cardL" style="margin-top:14px"><h4>Ease off if</h4><p>Pain rises above 5, lasts more than a day after a routine, or spreads down an arm or leg.</p></div>
      </div>
    </div>
  </div>`));

// 28 14-day plan
const days = ["Setup audit + Micro-break 01", "20-8-2 rhythm starts", "Back Reset: Starter", "Neck routine A", "Back Reset: Starter", "Walk 20 min", "Rest + wind-down",
  "Back Reset: Standard", "Wrist routine C", "Back Reset: Standard", "Hips routine D", "Back Reset: Standard", "Longer walk 30 min", "Review + re-audit"];
P.push(page("dark", 6, `
  <div class="pad">
    <div class="small g">Chapter 008</div>
    <h1 class="mega" style="margin-top:10px">Your 14-Day<br>Plan</h1>
    <div class="row" style="gap:10px;margin:18px 0 30px">${pill("Two weeks · 10 min a day")}</div>
    <div class="cal">
      ${days.map((d, i) => `<div class="day ${i === 6 || i === 13 ? "hl" : ""}"><span class="dn">Day ${String(i + 1).padStart(2, "0")}</span><p>${d}</p></div>`).join("")}
    </div>
    <div class="grid3" style="margin-top:24px">
      <div class="stat-card"><div class="small dm">Week 1 focus</div><div class="num sm">Awareness</div></div>
      <div class="stat-card"><div class="small dm">Week 2 focus</div><div class="num sm">Strength</div></div>
      <div class="stat-card green"><div class="small">Total time</div><div class="num sm">~2.5 hours</div></div>
    </div>
  </div>`));

// 29 Habit tracker (printable)
const habits = ["Setup check", "Micro-breaks (6+)", "20-8-2 rhythm", "10-min routine", "Walk 15+ min", "Screen at eye level", "Wind-down routine"];
P.push(page("light", 6, `
  <div class="pad">
    <div class="row between"><h2 class="h">Habit<br>Tracker</h2>${tag("Printable", "tg")}</div>
    <p class="muted" style="margin:14px 0 24px">Tick a box each day you complete the habit. Aim for 5 of 7 rows by the end of week two.</p>
    <table class="tracker">
      <thead><tr><th>Habit</th>${Array.from({ length: 14 }, (_, i) => `<th>${i + 1}</th>`).join("")}</tr></thead>
      <tbody>${habits.map((h) => `<tr><td>${h}</td>${Array.from({ length: 14 }, () => `<td><span class="box"></span></td>`).join("")}</tr>`).join("")}</tbody>
      <tfoot><tr><td>Daily score</td>${Array.from({ length: 14 }, () => `<td>/7</td>`).join("")}</tr></tfoot>
    </table>
    <div class="grid3" style="margin-top:26px">
      <div class="cardL"><div class="idx">Week 1 target</div><h4>3+ habits / day</h4></div>
      <div class="cardL"><div class="idx">Week 2 target</div><h4>5+ habits / day</h4></div>
      <div class="cardL green"><div class="idx">Reward</div><h4>Pick yours: ____________</h4></div>
    </div>
  </div>`));

// 30 Pain journal
P.push(page("light", 6, `
  <div class="pad">
    <div class="row between"><h2 class="h">Progress<br>Journal</h2>${tag("Printable", "tg")}</div>
    <p class="muted" style="margin:14px 0 20px">Each evening, rate your stiffness or pain from 0–10 and plot it. The dashed line shows what a typical improving trend can look like.</p>
    <div class="cardL white" style="padding:18px 8px">${lineTemplate()}</div>
    <table class="tbl" style="margin-top:22px">
      <thead><tr><th>Day</th><th>Where?</th><th>Score</th><th>What helped / what hurt?</th></tr></thead>
      <tbody>${Array.from({ length: 7 }, (_, i) => `<tr><td>${i + 1}</td><td class="ln"></td><td class="ln"></td><td class="ln"></td></tr>`).join("")}</tbody>
    </table>
  </div>`));

// 31 Cheat sheet (green page)
P.push(page("greenp", 6, `
  <div class="pad">
    <div class="row between"><div class="brand dk">MOTIONPLUSE</div>${tag("Stick it on your monitor", "tn")}</div>
    <h1 class="mega dark" style="margin-top:26px">Cheat<br>Sheet</h1>
    <div class="grid2" style="margin-top:30px;gap:14px">
      ${[["Every 20 min", "Look 6 m away for 20 s"], ["Every 30 min", "Stand + move for 2 min"], ["Every hour", "Chin tucks + shoulder rolls"], ["Every lunch", "Walk 10–15 min"],
         ["Every evening", "10-Minute Back Reset"], ["Every night", "Pillow check + wind-down"]]
        .map(([a, b]) => `<div class="cs"><span>${a}</span><h4>${b}</h4></div>`).join("")}
    </div>
    <div class="cs-big">
      <div class="small b">Setup in one line</div>
      <p>Feet flat · hips ≥ knees · back supported · elbows 90° · screen at eye level, arm's length away.</p>
    </div>
  </div>`));

// 32 Takeaways
P.push(page("deep", 6, `
  <div class="pad">
    <h2 class="h">Five Things<br>to Remember</h2>
    <div class="timeline" style="margin-top:30px">
      ${[["01", "Your next posture is your best posture", "Change position often. No position is perfect for eight hours."],
         ["02", "Set up once, benefit daily", "15 minutes of desk adjustments removes hours of strain."],
         ["03", "Snack on movement", "Two minutes every 30 minutes beats one hour at the gym on its own."],
         ["04", "Strength protects", "Ten minutes of glutes and core, five days a week, supports your back."],
         ["05", "Know when to get help", "Red flags or pain that won't settle deserve a professional's eyes."]]
        .map(([n, h, d], i) => `<div class="tl-row ${i === 2 ? "act" : ""}"><span class="t">(${n})</span><span class="s"></span><div><h4>${h}</h4><p>${d}</p></div></div>`).join("")}
    </div>
  </div>
  <div style="position:absolute;left:0;bottom:70px">${stripes(794, 120, 33, 7)}</div>`, { reserve: 130 }));

// 33 Offer + back cover
P.push(page("dark", 6, `
  <div class="pad">
    <div class="brand">MOTIONPLUSE<sup>®</sup></div>
    <h1 class="mega" style="margin-top:60px">Move better.<br><span class="g">Feel better.</span></h1>
    <div class="row" style="gap:10px;margin-top:20px">${pill("A thank-you from us")}</div>
    <div class="offer">
      <div><div class="small">Your reader discount</div><div class="num">10% off</div><p>your first order of supports and recovery tools</p></div>
      <div class="code"><span class="small">Use code</span><b>BLUEPRINT10</b></div>
    </div>
    <div class="grid3" style="margin-top:34px">
      <div><div class="small g">Shop</div><p class="dm">The MotionPluse online store</p></div>
      <div><div class="small g">Questions</div><p class="dm">Reply to the email this guide came in.</p></div>
      <div><div class="small g">Share</div><p class="dm">Know a desk worker who's sore? Forward this guide.</p></div>
    </div>
    <p class="src" style="margin-top:56px;max-width:600px">© 2026 MotionPluse. This guide provides general wellbeing information and is not a substitute for professional medical advice, diagnosis or treatment. Always consult a qualified healthcare professional about your specific condition.</p>
  </div>
  <div style="position:absolute;right:40px;top:40px">${orb(130, "ob5")}</div>
  <div style="position:absolute;left:0;bottom:0">${stripes(794, 130, 44, 8)}</div>`, { nofoot: true }));

const css = fs.readFileSync(path.join(__dirname, "fonts-embed.css"), "utf8") + fs.readFileSync(path.join(__dirname, "style.css"), "utf8");
const html = `<!doctype html><html><head><meta charset="utf-8"><title>The Pain-Free Workday Blueprint — MotionPluse</title>

<style>${css}</style></head><body>${P.join("\n")}${fs.readFileSync(path.join(__dirname, "fitscript.html"), "utf8")}</body></html>`;
fs.writeFileSync(path.join(__dirname, "guide.html"), html);
console.log("pages:", pageNo);
