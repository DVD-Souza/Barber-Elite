// api.js - wrapper simples para o backend
const API_BASE = "http://localhost:4000/api";

function getAuthHeader() {
  const token = localStorage.getItem("token");
  return token ? { "Authorization": "Bearer " + token } : {};
}

async function apiFetch(path, opts = {}) {
  const headers = Object.assign(
    { "Content-Type": "application/json" },
    getAuthHeader(),
    opts.headers || {}
  );

  const res = await fetch(API_BASE + path, Object.assign({}, opts, { headers }));

  let payload = null;
  try { payload = await res.json(); } catch (e) { payload = null; }

  if (!res.ok) {
    const err = new Error(payload?.error || `Request failed: ${res.status}`);
    err.payload = payload;
    throw err;
  }
  return payload;
}

async function apiGet(path) {
  return apiFetch(path, { method: "GET" });
}
async function apiPost(path, body) {
  return apiFetch(path, { method: "POST", body: JSON.stringify(body) });
}
async function apiDelete(path) {
  return apiFetch(path, { method: "DELETE" });
}
