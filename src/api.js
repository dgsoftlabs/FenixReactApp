/**
 * Centralized API module — uses native fetch for all server requests.
 * All endpoints mirror the original fenixlib.js / script.js URLs exactly.
 */

async function postRequest(url, body = null) {
  const opts = { method: 'POST' };
  if (body) {
    opts.headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    opts.body = new URLSearchParams(body).toString();
  }
  const res = await fetch(url, opts);
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${url}`);
  return res.text();
}

/** GET Timer / User / Machine — polls ClassName/id/Value */
export async function fetchServerInfo(type, id) {
  return postRequest(`${type}/${id}/Value`);
}

/** GET all process tags */
export async function fetchTags() {
  const text = await postRequest('Tags/All/All', { reguest: 'empty' });
  console.log('[fetchTags] raw response:', JSON.stringify(text));
  if (!text || !text.trim()) return {};
  const arr = JSON.parse(text);
  const tags = {};
  arr.forEach(obj => { tags[obj.tagName] = obj; });
  return tags;
}

/** GET all Modbus connections */
export async function fetchConnections() {
  const text = await postRequest('Connections/All/All');
  if (!text || !text.trim()) return [];
  return JSON.parse(text);
}

/** GET event log */
export async function fetchEvents() {
  const text = await postRequest('Events/All/All');
  if (!text || !text.trim()) return [];
  return JSON.parse(text);
}

/** GET chart data — Chart.js format: [{label, data:[[ts,val],...]}] */
export async function fetchGraph() {
  const text = await postRequest('Graph/All/All');
  if (!text || !text.trim()) return [];
  return JSON.parse(text);
}

/** GET current chart buffer window (seconds) */
export async function fetchBuffor() {
  return postRequest('Server/Buffor/Get');
}

/** SET chart buffer window */
export async function setBuffor(value) {
  return postRequest(`Server/Buffor/Set/${encodeURIComponent(value)}`);
}

/** Clear all alarms */
export async function clearAlarms() {
  return postRequest('Server/Alarms/Clr/*', { reguest: 'empty' });
}

/** Write a value to a tag */
export async function setTagValue(tagName, value) {
  return postRequest(`Tag/${encodeURIComponent(tagName)}/Value/${encodeURIComponent(value)}`);
}
