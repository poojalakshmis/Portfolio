const jsonHeaders = { "Content-Type": "application/json" };

/** Set in GitHub Actions (secret VITE_API_BASE_URL) when your API is hosted elsewhere, e.g. Render. */
const API_ROOT = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "");

function apiUrl(path) {
  if (!path.startsWith("/")) return `${API_ROOT}/${path}`;
  return API_ROOT ? `${API_ROOT}${path}` : path;
}

async function handleResponse(res) {
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || res.statusText);
  }
  const ct = res.headers.get("content-type") || "";
  if (ct.includes("application/json")) {
    return res.json();
  }
  return res.text();
}

export async function fetchSkills() {
  const res = await fetch(apiUrl("/api/skills"));
  return handleResponse(res);
}

export async function fetchExperience() {
  const res = await fetch(apiUrl("/api/experience"));
  return handleResponse(res);
}

export async function fetchEducation() {
  const res = await fetch(apiUrl("/api/education"));
  return handleResponse(res);
}

export async function submitContact(payload) {
  const res = await fetch(apiUrl("/api/contact"), {
    method: "POST",
    headers: jsonHeaders,
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}
