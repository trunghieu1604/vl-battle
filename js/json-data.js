// Source JSON stays readable in dist/. The public build may carry the exact
// same JSON text as gzip to fit hosting limits without reducing art or sound.
export async function readJson(url, options) {
  const response = await fetch(url, options);
  if (!response.ok) throw Error(`Không tải được dữ liệu: ${url} (${response.status})`);
  const value = await response.json();
  if (value?.format !== 'tieungao-json-gzip-v1') return value;
  if (typeof DecompressionStream !== 'function') throw Error('Hãy cập nhật trình duyệt để tải dữ liệu game.');
  const bytes = Uint8Array.from(atob(value.data), c => c.charCodeAt(0));
  return new Response(new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'))).json();
}
