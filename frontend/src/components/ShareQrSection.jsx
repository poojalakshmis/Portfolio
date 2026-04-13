import { useMemo } from "react";
import QRCode from "react-qr-code";

function normalizeUrl(raw) {
  const s = (raw || "").trim();
  if (!s) return "";
  try {
    const u = new URL(s.startsWith("http") ? s : `https://${s}`);
    return u.toString().replace(/\/$/, "");
  } catch {
    return s.replace(/\/$/, "");
  }
}

function isLikelyNonPublic(url) {
  try {
    const { hostname } = new URL(url);
    if (hostname === "localhost" || hostname === "127.0.0.1") return true;
    if (/^192\.168\./.test(hostname)) return true;
    if (/^10\./.test(hostname)) return true;
    if (/^172\.(1[6-9]|2\d|3[01])\./.test(hostname)) return true;
  } catch {
    return true;
  }
  return false;
}

export default function ShareQrSection({ profile }) {
  const url = useMemo(() => {
    const env = normalizeUrl(import.meta.env.VITE_SITE_URL);
    const fromProfile = normalizeUrl(profile.shareUrl);
    const fromBrowser =
      typeof window !== "undefined"
        ? `${window.location.origin}${window.location.pathname}`.replace(/\/+$/, "") || window.location.origin
        : "";
    return env || fromProfile || fromBrowser;
  }, [profile.shareUrl]);

  const showLocalWarning = isLikelyNonPublic(url);

  return (
    <section
      id="share"
      aria-labelledby="share-heading"
      className="border-t border-slate-200 bg-gradient-to-b from-white to-slate-50 py-16"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-6 md:flex-row md:items-start md:justify-center md:gap-16">
        <div className="max-w-md text-center md:text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-700">Share</p>
          <h2 id="share-heading" className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
            Scan to open this portfolio
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            Anyone with a phone camera can open the link encoded in this code. For events and networking, use a{" "}
            <strong>public</strong> address (after you deploy), not localhost.
          </p>
          <p className="mt-4 break-all font-mono text-xs text-slate-500">{url}</p>
          {showLocalWarning && (
            <p className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-left text-sm text-amber-950">
              This QR currently points to a non-public address. Set{" "}
              <code className="rounded bg-amber-100 px-1">shareUrl</code> in{" "}
              <code className="rounded bg-amber-100 px-1">src/config/profile.js</code> or{" "}
              <code className="rounded bg-amber-100 px-1">VITE_SITE_URL</code> in{" "}
              <code className="rounded bg-amber-100 px-1">frontend/.env</code>, then rebuild or refresh.
            </p>
          )}
        </div>
        <div className="flex flex-col items-center gap-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-md">
            <QRCode
              value={url}
              size={200}
              level="M"
              style={{ height: "auto", maxWidth: "100%", width: "200px" }}
            />
          </div>
          <p className="max-w-[220px] text-center text-xs text-slate-500">Point the camera at the code to open the URL.</p>
        </div>
      </div>
    </section>
  );
}
