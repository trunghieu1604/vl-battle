// Local display name only; this is not an authenticated account.
const KEY = 'vlst.guestName';
export function normalizeGuestName(value) {
  return String(value ?? '').normalize('NFC').replace(/[\u0000-\u001f\u007f-\u009f\u202a-\u202e\u2066-\u2069]/g, '').replace(/\s+/g, ' ').trim().slice(0, 24) || 'Lãng khách';
}
export function saveGuestName(value) {
  const name = normalizeGuestName(value);
  try { localStorage.setItem(KEY, name); } catch {}
  return name;
}
export function readGuestName() {
  try { return normalizeGuestName(localStorage.getItem(KEY)); } catch { return 'Lãng khách'; }
}
