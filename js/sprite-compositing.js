// Some luminous SPRs retain an opaque neutral palette floor (4 or 8) across
// their rectangular background. Screen-compositing many native branches adds
// that floor repeatedly and exposes the entire rectangle. Prepare a display
// copy with a screen-neutral black matte; never change the exported source.
const prepared = new WeakMap();
export function prepareSpriteForBlend(image, sprite) {
  if (sprite?.renderMode !== 1 || sprite.blend !== 'screen' || !sprite.rects?.length) return image;
  let cache = prepared.get(image);
  if (!cache) { cache = new WeakMap(); prepared.set(image, cache); }
  if (cache.has(sprite.rects)) return cache.get(sprite.rects);
  const remember = value => { cache.set(sprite.rects, value); return value; };
  const rects = sprite.rects;
  let first = -1;
  for (let o = 0; o < rects.length; o += 6) if (rects[o + 2] && rects[o + 3]) { first = o; break; }
  if (first < 0) return remember(image);
  // A tiny probe avoids allocating/reading an atlas for the usual transparent
  // SPRs. Only an opaque, neutral, very dark source corner is a candidate.
  const probe = document.createElement('canvas'); probe.width = probe.height = 1;
  const probeCtx = probe.getContext('2d', { willReadFrequently: true });
  probeCtx.drawImage(image, rects[first], rects[first + 1], 1, 1, 0, 0, 1, 1);
  const [r, g, b, a] = probeCtx.getImageData(0, 0, 1, 1).data;
  if (a !== 255 || r !== g || r !== b || (r !== 4 && r !== 8)) return remember(image);
  const canvas = document.createElement('canvas');
  canvas.width = image.naturalWidth || image.width; canvas.height = image.naturalHeight || image.height;
  const ctx = canvas.getContext('2d', { willReadFrequently: true }); ctx.drawImage(image, 0, 0);
  const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height), data = pixels.data;
  const isMatte = (x, y) => {
    const i = (y * canvas.width + x) * 4;
    return data[i] === r && data[i + 1] === r && data[i + 2] === r && data[i + 3] === 255;
  };
  // Verify the same floor around every frame, not just one corner or a named
  // skill. Preserve ordinary dark/coloured artwork and all alpha-based sprites.
  let matte = 0, total = 0;
  for (let o = 0; o < rects.length; o += 6) {
    const [x, y, w, h] = rects.slice(o, o + 4);
    if (!w || !h) continue;
    if (w < 8 || h < 8 || !isMatte(x, y) || !isMatte(x + w - 1, y) || !isMatte(x, y + h - 1) || !isMatte(x + w - 1, y + h - 1)) return remember(image);
    let border = 0, matching = 0;
    for (let row = 0; row < h; row++) for (let col = 0; col < w; col++) {
      const match = isMatte(x + col, y + row); total++; if (match) matte++;
      if (!row || !col || row === h - 1 || col === w - 1) { border++; if (match) matching++; }
    }
    if (matching / border < 0.98) return remember(image);
  }
  if (matte / total < 0.5 || matte === total) return remember(image);
  let neutralized = 0;
  for (let i = 0; i < data.length; i += 4) {
    if (data[i] === r && data[i + 1] === r && data[i + 2] === r && data[i + 3] === 255) {
      data[i] = data[i + 1] = data[i + 2] = 0; neutralized++;
    }
  }
  ctx.putImageData(pixels, 0, 0);
  canvas.spriteMatte = { rgb: [r, r, r], neutralizedPixels: neutralized, source: image.sourceUrl || image.currentSrc || image.src || null };
  return remember(canvas);
}
