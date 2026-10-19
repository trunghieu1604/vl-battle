// Reference graph, not JSON cloning: entities, hit Sets and cooldown Maps share identity.
// No executable strings or arbitrary constructors are accepted from imported saves.
export function encodeGraph(root, classes = {}, externals = new Map()) {
  const seen = new Map(), nodes = [];
  function visit(value) {
    if (value === undefined) return { atom: 'undefined' };
    if (typeof value === 'number' && !Number.isFinite(value)) return { atom: String(value) };
    if (value === null || ['string', 'number', 'boolean'].includes(typeof value)) return value;
    if (typeof value !== 'object') throw Error('Save chứa giá trị không hỗ trợ: ' + typeof value);
    if (externals.has(value)) return { external: externals.get(value) };
    if (seen.has(value)) return { ref: seen.get(value) };
    const id = nodes.length; seen.set(value, id); nodes.push(null);
    let type = Array.isArray(value) ? 'Array' : value instanceof Map ? 'Map' : value instanceof Set ? 'Set' : 'Object';
    for (const [name, spec] of Object.entries(classes)) if (value instanceof spec.ctor) type = name;
    if (type === 'Object' && ![Object.prototype, null].includes(Object.getPrototypeOf(value))) throw Error('Kiểu save chưa hỗ trợ');
    const omitted = new Set(classes[type]?.omit || []);
    const entries = type === 'Map' ? [...value].map(([k, v]) => [visit(k), visit(v)])
      : type === 'Set' || type === 'Array' ? [...value].map(visit)
      : Object.entries(value).filter(([k]) => !omitted.has(k)).map(([k, v]) => [k, visit(v)]);
    nodes[id] = { type, entries };
    return { ref: id };
  }
  return { root: visit(root), nodes };
}

export function decodeGraph(graph, classes = {}, externals = new Map()) {
  if (!graph || !Array.isArray(graph.nodes) || graph.nodes.length > 350000) throw Error('Cấu trúc save không hợp lệ');
  const objects = graph.nodes.map(node => {
    if (!node || !Array.isArray(node.entries)) throw Error('Nút save không hợp lệ');
    if (node.type === 'Array') return [];
    if (node.type === 'Map') return new Map();
    if (node.type === 'Set') return new Set();
    if (node.type === 'Object') return {};
    if (Object.hasOwn(classes, node.type)) return Object.create(classes[node.type].ctor.prototype);
    throw Error('Kiểu save không được hỗ trợ: ' + node.type);
  });
  function read(value) {
    if (value === null || ['string', 'number', 'boolean'].includes(typeof value)) return value;
    if (!value || typeof value !== 'object') throw Error('Giá trị save không hợp lệ');
    if (Object.hasOwn(value, 'external')) {
      if (!externals.has(value.external)) throw Error('Tài nguyên của save không tương thích bản game này');
      return externals.get(value.external);
    }
    if (Object.hasOwn(value, 'ref')) {
      if (!Number.isInteger(value.ref) || value.ref < 0 || value.ref >= objects.length) throw Error('Tham chiếu save bị hỏng');
      return objects[value.ref];
    }
    if (Object.hasOwn(value, 'atom')) {
      if (!['undefined', 'NaN', 'Infinity', '-Infinity'].includes(value.atom)) throw Error('Giá trị đặc biệt không hợp lệ');
      return { undefined, NaN, Infinity, '-Infinity': -Infinity }[value.atom];
    }
    throw Error('Giá trị save không hợp lệ');
  }
  graph.nodes.forEach((node, i) => {
    const object = objects[i];
    for (const entry of node.entries) {
      if (node.type === 'Array') object.push(read(entry));
      else if (node.type === 'Set') object.add(read(entry));
      else {
        if (!Array.isArray(entry) || entry.length !== 2) throw Error('Thuộc tính save bị hỏng');
        if (node.type === 'Map') object.set(read(entry[0]), read(entry[1]));
        else {
          const key = entry[0];
          if (typeof key !== 'string' || ['__proto__', 'constructor', 'prototype'].includes(key)) throw Error('Tên thuộc tính save không hợp lệ');
          object[key] = read(entry[1]);
        }
      }
    }
  });
  graph.nodes.forEach((node, i) => classes[node.type]?.hydrate?.(objects[i]));
  return read(graph.root);
}
