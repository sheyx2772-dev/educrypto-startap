export type CertKey = "beginner" | "advanced" | "ai";

export interface CertLabels {
  title: string;
  level: string;
  courseName: string;
  platform: string;
  tagline: string;
  declares: string;
  ofCompletion: string;
  courseText: string;
  director: string;
  eduHead: string;
  seal: string;
  qr: string;
  awardDate: string;
  sigRole: string;
}

export interface CertificateData {
  username: string;
  certKey: CertKey;
  awardDate: string;
  certId: string;
  labels: CertLabels;
  localeTag: string;
}

export function formatAwardDate(iso: string | undefined, localeTag: string): string {
  const d = iso ? new Date(iso) : new Date();
  if (Number.isNaN(d.getTime())) {
    return new Date().toLocaleDateString(localeTag, { year: "numeric", month: "long", day: "numeric" });
  }
  return d.toLocaleDateString(localeTag, { year: "numeric", month: "long", day: "numeric" });
}

export function buildCertId(certKey: CertKey, inviteCode: string, iso?: string): string {
  const d = iso ? new Date(iso) : new Date();
  const ymd = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
  const tag = certKey === "beginner" ? "BEG" : certKey === "advanced" ? "ADV" : "AI";
  return `EDU-${tag}-${inviteCode}-${ymd}`;
}

const CORNER_SVG = `<svg viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 2 L28 2 L28 6 L6 6 L6 28 L2 28 Z" fill="#c8960c"/><path d="M2 2 L16 2 L16 4 L4 4 L4 16 L2 16 Z" fill="#f5d060"/><path d="M10 10 L28 10 L28 12 L12 12 L12 28 L10 28 Z" fill="#e8b84b" opacity="0.5"/><circle cx="6" cy="6" r="3" fill="#f5d060"/><circle cx="28" cy="2" r="2" fill="#c8960c"/><circle cx="2" cy="28" r="2" fill="#c8960c"/></svg>`;

const QR_SVG = `<svg width="52" height="52" viewBox="0 0 52 52"><rect width="52" height="52" fill="white"/><rect x="2" y="2" width="16" height="16" rx="2" fill="#1a0e00"/><rect x="4" y="4" width="12" height="12" rx="1" fill="white"/><rect x="6" y="6" width="8" height="8" rx="1" fill="#1a0e00"/><rect x="34" y="2" width="16" height="16" rx="2" fill="#1a0e00"/><rect x="36" y="4" width="12" height="12" rx="1" fill="white"/><rect x="38" y="6" width="8" height="8" rx="1" fill="#1a0e00"/><rect x="2" y="34" width="16" height="16" rx="2" fill="#1a0e00"/><rect x="4" y="36" width="12" height="12" rx="1" fill="white"/><rect x="6" y="38" width="8" height="8" rx="1" fill="#1a0e00"/><rect x="20" y="2" width="4" height="4" fill="#1a0e00"/><rect x="26" y="2" width="4" height="4" fill="#1a0e00"/><rect x="20" y="8" width="4" height="4" fill="#1a0e00"/><rect x="26" y="6" width="4" height="4" fill="#1a0e00"/><rect x="20" y="14" width="4" height="4" fill="#1a0e00"/><rect x="22" y="20" width="4" height="4" fill="#1a0e00"/><rect x="28" y="20" width="4" height="4" fill="#1a0e00"/><rect x="34" y="20" width="4" height="4" fill="#1a0e00"/><rect x="40" y="20" width="4" height="4" fill="#1a0e00"/><rect x="46" y="20" width="4" height="4" fill="#1a0e00"/><rect x="2" y="20" width="4" height="4" fill="#1a0e00"/><rect x="8" y="20" width="4" height="4" fill="#1a0e00"/><rect x="14" y="20" width="4" height="4" fill="#1a0e00"/><rect x="20" y="26" width="4" height="4" fill="#1a0e00"/><rect x="28" y="26" width="4" height="4" fill="#1a0e00"/><rect x="36" y="26" width="4" height="4" fill="#1a0e00"/><rect x="44" y="26" width="4" height="4" fill="#1a0e00"/><rect x="20" y="32" width="4" height="4" fill="#1a0e00"/><rect x="26" y="32" width="4" height="4" fill="#1a0e00"/><rect x="34" y="34" width="4" height="4" fill="#1a0e00"/><rect x="42" y="34" width="4" height="4" fill="#1a0e00"/><rect x="20" y="38" width="4" height="4" fill="#1a0e00"/><rect x="28" y="40" width="4" height="4" fill="#1a0e00"/><rect x="36" y="40" width="4" height="4" fill="#1a0e00"/><rect x="44" y="40" width="4" height="4" fill="#1a0e00"/><rect x="20" y="44" width="4" height="4" fill="#1a0e00"/><rect x="26" y="46" width="4" height="4" fill="#1a0e00"/><rect x="34" y="46" width="4" height="4" fill="#1a0e00"/><rect x="42" y="46" width="4" height="4" fill="#1a0e00"/></svg>`;

export function getCertificateStyles(): string {
  return `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Cinzel:wght@400;600;700;900&family=EB+Garamond:ital,wght@0,400;0,600;1,400;1,600&display=swap');
  *{margin:0;padding:0;box-sizing:border-box;}
  body{background:#f5f5f0;display:flex;align-items:center;justify-content:center;min-height:100vh;padding:20px;}
  .cert-wrap{width:760px;max-width:100%;background:linear-gradient(135deg,#fdfbf0 0%,#fff9e6 30%,#fffdf5 60%,#fdf8e8 100%);position:relative;padding:0;box-shadow:0 20px 60px rgba(0,0,0,0.15),inset 0 0 100px rgba(212,160,23,0.05);}
  .cert-wrap::before{content:'';position:absolute;inset:6px;border:2px solid #c8960c;pointer-events:none;z-index:10;}
  .cert-wrap::after{content:'';position:absolute;inset:12px;border:0.5px solid #e8b84b;pointer-events:none;z-index:10;}
  .inner{padding:28px 36px 24px;}
  .header-banner{background:linear-gradient(90deg,#3d2000 0%,#7a4a00 15%,#c8960c 30%,#f5d060 45%,#fde97a 50%,#f5d060 55%,#c8960c 70%,#7a4a00 85%,#3d2000 100%);margin:0 -36px;margin-top:-28px;padding:14px 36px 12px;text-align:center;border-bottom:1px solid #a07010;}
  .header-sub{font-family:'Cinzel',serif;font-size:9px;color:#3d2000;letter-spacing:6px;font-weight:600;opacity:0.7;margin-bottom:3px;}
  .header-main{font-family:'Cinzel',serif;font-size:22px;color:#1a0e00;letter-spacing:10px;font-weight:900;text-shadow:0 1px 0 rgba(255,255,255,0.4);}
  .header-main span{color:#3d2000;}
  .header-tagline{font-family:'EB Garamond',serif;font-size:10px;color:#3d2000;letter-spacing:4px;margin-top:3px;font-style:italic;}
  .corner{position:absolute;width:70px;height:70px;z-index:11;}
  .c-tl{top:6px;left:6px;}.c-tr{top:6px;right:6px;transform:scaleX(-1);}.c-bl{bottom:6px;left:6px;transform:scaleY(-1);}.c-br{bottom:6px;right:6px;transform:scale(-1);}
  .logos-row{display:flex;justify-content:space-between;align-items:center;margin:18px 0 10px;}
  .logo-coin{display:flex;flex-direction:column;align-items:center;gap:5px;}
  .coin-circle{width:70px;height:70px;border-radius:50%;display:flex;align-items:center;justify-content:center;position:relative;box-shadow:0 4px 12px rgba(0,0,0,0.3),inset 0 2px 4px rgba(255,255,255,0.3);}
  .btc-coin{background:radial-gradient(circle at 35% 35%,#ff9f3a,#f7931a 50%,#cc6600);}
  .napp-coin{background:radial-gradient(circle at 35% 35%,#4a4a8a,#1a1a4e 50%,#0d0d2b);}
  .coin-circle::after{content:'';position:absolute;inset:3px;border-radius:50%;border:1px solid rgba(255,255,255,0.25);pointer-events:none;}
  .coin-label{font-family:'Cinzel',serif;font-size:8px;letter-spacing:2px;color:#8b6914;font-weight:700;}
  .btc-sym{font-family:Arial,sans-serif;font-size:26px;font-weight:900;color:#fff5e0;text-shadow:2px 2px 4px rgba(0,0,0,0.4);transform:rotate(14deg);display:inline-block;line-height:1;}
  .center-block{text-align:center;flex:1;padding:0 20px;}
  .cert-declares{font-family:'Cinzel',serif;font-size:9px;letter-spacing:5px;color:#8b6914;margin-bottom:8px;font-weight:600;}
  .main-title{font-family:'Cinzel',serif;font-size:42px;font-weight:900;background:linear-gradient(180deg,#3d2000 0%,#8b5e00 30%,#c8960c 55%,#8b5e00 80%,#3d2000 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;letter-spacing:6px;line-height:1;margin-bottom:4px;}
  .main-subtitle{font-family:'Cinzel',serif;font-size:11px;letter-spacing:8px;color:#8b6914;margin-bottom:12px;}
  .gold-div{display:flex;align-items:center;justify-content:center;gap:8px;margin:10px 0;}
  .gold-div-line{flex:1;height:1px;background:linear-gradient(90deg,transparent,#c8960c,transparent);}
  .gold-div-diamond{width:8px;height:8px;background:#c8960c;transform:rotate(45deg);}
  .gold-div-small{width:4px;height:4px;background:#e8b84b;transform:rotate(45deg);}
  .name-line-wrap{margin:6px 0 4px;}
  .name-text{font-family:'Playfair Display',serif;font-size:26px;font-weight:700;color:#3d2000;letter-spacing:1px;line-height:1.3;padding:0 8px;}
  .name-underline{width:320px;max-width:90%;height:1px;background:linear-gradient(90deg,transparent,#c8960c,transparent);margin:6px auto 0;}
  .award-date{font-family:'EB Garamond',serif;font-size:12px;color:#8b6914;font-style:italic;letter-spacing:1px;margin-top:8px;}
  .course-box{background:linear-gradient(90deg,#5c3a00,#8b6914 20%,#c8960c 50%,#8b6914 80%,#5c3a00);padding:14px 30px;margin:14px -36px;text-align:center;border-top:1px solid #e8b84b;border-bottom:1px solid #e8b84b;}
  .course-box-text{font-family:'EB Garamond',serif;font-size:12px;color:#fff8dc;font-style:italic;letter-spacing:1px;line-height:1.7;}
  .course-name{font-family:'Cinzel',serif;font-size:14px;color:#fde97a;letter-spacing:2px;font-weight:700;margin-top:4px;line-height:1.5;}
  .bottom-row{display:flex;justify-content:space-between;align-items:center;margin-top:18px;gap:12px;}
  .sig-block{text-align:center;flex:1;}
  .sig-line{width:130px;height:1px;background:linear-gradient(90deg,transparent,#c8960c,transparent);margin:0 auto 5px;}
  .sig-title{font-family:'Cinzel',serif;font-size:8px;letter-spacing:3px;color:#8b6914;font-weight:600;}
  .sig-role{font-family:'EB Garamond',serif;font-size:9px;color:#b89030;font-style:italic;}
  .seal-wrap{display:flex;flex-direction:column;align-items:center;gap:6px;}
  .seal{width:80px;height:80px;background:radial-gradient(circle at 40% 35%,#f5d060,#c8960c 50%,#7a4a00);border-radius:50%;display:flex;align-items:center;justify-content:center;flex-direction:column;position:relative;box-shadow:0 4px 16px rgba(0,0,0,0.3),inset 0 2px 4px rgba(255,255,255,0.2);}
  .seal::before{content:'';position:absolute;inset:-4px;border-radius:50%;background:repeating-conic-gradient(#c8960c 0deg 10deg,#f5d060 10deg 20deg);z-index:-1;}
  .seal::after{content:'';position:absolute;inset:4px;border-radius:50%;border:1px solid rgba(255,255,255,0.3);}
  .seal-text{font-family:'Cinzel',serif;font-size:9px;color:#1a0e00;font-weight:900;letter-spacing:1px;text-align:center;line-height:1.4;}
  .qr-wrap{text-align:center;margin-top:8px;}
  .qr-box{width:64px;height:64px;border:2px solid #c8960c;border-radius:4px;background:white;display:inline-flex;align-items:center;justify-content:center;padding:4px;}
  .qr-label{font-family:'Cinzel',serif;font-size:7px;letter-spacing:2px;color:#8b6914;margin-top:4px;font-weight:600;}
  .footer{background:linear-gradient(90deg,#3d2000,#7a4a00 20%,#c8960c 50%,#7a4a00 80%,#3d2000);margin:16px -36px -24px;padding:8px 36px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:4px;}
  .footer-text{font-family:'Cinzel',serif;font-size:8px;color:#fde97a;letter-spacing:2px;opacity:0.9;}
  @media print{body{background:#fff;padding:0;}.cert-wrap{box-shadow:none;width:100%;max-width:760px;}}
  `;
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export function getCertificateBody(data: CertificateData): string {
  const L = data.labels;
  const name = escapeHtml(data.username.trim() || "User");
  const date = escapeHtml(data.awardDate);
  const course = escapeHtml(L.courseName);
  const certId = escapeHtml(data.certId);
  const level = escapeHtml(L.level);

  return `
<div class="cert-wrap">
  <div class="corner c-tl">${CORNER_SVG}</div>
  <div class="corner c-tr">${CORNER_SVG}</div>
  <div class="corner c-bl">${CORNER_SVG}</div>
  <div class="corner c-br">${CORNER_SVG}</div>
  <div class="inner">
    <div class="header-banner">
      <div class="header-sub">${escapeHtml(L.platform)}</div>
      <div class="header-main">EDU<span>CRYPTO</span></div>
      <div class="header-tagline">${escapeHtml(L.tagline)}</div>
    </div>
    <div class="logos-row">
      <div class="logo-coin">
        <div class="coin-circle btc-coin"><span class="btc-sym">₿</span></div>
        <div class="coin-label">BITCOIN</div>
      </div>
      <div class="center-block">
        <div class="cert-declares">${escapeHtml(L.declares)}</div>
        <div class="gold-div"><div class="gold-div-line"></div><div class="gold-div-small"></div><div class="gold-div-diamond"></div><div class="gold-div-small"></div><div class="gold-div-line"></div></div>
        <div class="main-title">SERTIFIKAT</div>
        <div class="main-subtitle">${escapeHtml(L.ofCompletion)}</div>
        <div class="gold-div"><div class="gold-div-line"></div><div class="gold-div-diamond"></div><div class="gold-div-line"></div></div>
        <div class="name-line-wrap">
          <div class="name-text">${name}</div>
          <div class="name-underline"></div>
          <div class="award-date">${date}</div>
        </div>
        <div class="gold-div" style="margin-top:10px;"><div class="gold-div-line"></div><div class="gold-div-small"></div><div class="gold-div-diamond"></div><div class="gold-div-small"></div><div class="gold-div-line"></div></div>
        <div style="font-family:'Cinzel',serif;font-size:9px;letter-spacing:3px;color:#b89030;margin-top:4px;">${level} DARAJA</div>
      </div>
      <div class="logo-coin">
        <div class="coin-circle napp-coin"><span style="font-family:'Cinzel',serif;font-size:18px;color:#ffd700;font-weight:900;">N</span></div>
        <div class="coin-label">NAPP</div>
      </div>
    </div>
    <div class="course-box">
      <div class="course-box-text">${escapeHtml(L.courseText)}</div>
      <div class="course-name">${course}</div>
    </div>
    <div class="bottom-row">
      <div class="sig-block">
        <div class="sig-line"></div>
        <div class="sig-title">${escapeHtml(L.director)}</div>
        <div class="sig-role">${escapeHtml(L.sigRole)}</div>
      </div>
      <div class="seal-wrap">
        <div class="seal">
          <div class="seal-text">
            <div style="font-size:12px;">★</div>
            <div style="font-size:10px;font-weight:900;">EDU</div>
            <div style="font-size:8px;">CRYPTO</div>
            <div style="font-size:7px;opacity:0.8;">${escapeHtml(L.seal)}</div>
          </div>
        </div>
        <div class="qr-wrap">
          <div class="qr-box">${QR_SVG}</div>
          <div class="qr-label">${escapeHtml(L.qr)}</div>
        </div>
      </div>
      <div class="sig-block">
        <div class="sig-line"></div>
        <div class="sig-title">${escapeHtml(L.eduHead)}</div>
        <div class="sig-role">${escapeHtml(L.awardDate)}: ${date}</div>
      </div>
    </div>
    <div class="footer">
      <div class="footer-text">www.educrypto.uz</div>
      <div class="footer-text">ID: ${certId}</div>
      <div class="footer-text">educrypto@gmail.com</div>
    </div>
  </div>
</div>`;
}

export function buildCertificateDocument(data: CertificateData): string {
  return `<!DOCTYPE html>
<html lang="${escapeHtml(data.localeTag.split("-")[0])}">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>${escapeHtml(data.labels.title)} — ${escapeHtml(data.username)}</title>
<style>${getCertificateStyles()}</style>
</head>
<body>
${getCertificateBody(data)}
</body>
</html>`;
}
