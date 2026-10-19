// Coalesce duplicate URLs and keep independent asset transfers bounded.
export class AssetPool {
  constructor(loader, concurrency = 6) { this.loader = loader; this.limit = concurrency; this.active = 0; this.queue = []; this.files = new Map(); }
  load(url) {
    if (this.files.has(url)) return this.files.get(url);
    const job = new Promise((resolve, reject) => this.queue.push({ url, resolve, reject }));
    this.files.set(url, job); this.pump(); return job;
  }
  pump() {
    while (this.active < this.limit && this.queue.length) {
      const job = this.queue.shift(); this.active++;
      Promise.resolve().then(() => this.loader(job.url)).then(job.resolve, error => { this.files.delete(job.url); job.reject(error); })
        .finally(() => { this.active--; this.pump(); });
    }
  }
}
