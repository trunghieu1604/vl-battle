export const TITLES = [
  { id: 'langkhach', name: 'Lãng khách', description: 'Bắt đầu hành trình', unlocked: () => true },
  { id: 'nhapmon', name: 'Tân tú giang hồ', description: 'Hoàn thành 3 trận', unlocked: p => p.stats.matches >= 3 },
  { id: 'vohoc', name: 'Thông hiểu võ học', description: 'Lĩnh hội 10 bí kíp khác nhau', unlocked: p => (p.progress?.books.length || 0) >= 10 },
  { id: 'santhu', name: 'Thợ săn thủ lĩnh', description: 'Hạ 10 thủ lĩnh', unlocked: p => p.stats.bossKills >= 10 },
  { id: 'quanquan', name: 'Nhất đại cao thủ', description: 'Thắng một trận sinh tồn', unlocked: p => p.stats.wins >= 1 },
];
export function progression(profile) {
  profile.progress ||= { xp: 0, books: [], title: 'langkhach' };
  const xp = Math.max(0, profile.progress.xp || 0), level = Math.floor(Math.sqrt(xp / 100)) + 1;
  const lower = (level - 1) ** 2 * 100, upper = level ** 2 * 100;
  return { xp, level, lower, upper, fraction: (xp - lower) / (upper - lower), titles: TITLES.filter(t => t.unlocked(profile)) };
}
export function discoverBooks(profile, player) {
  progression(profile);
  const known = new Set(profile.progress.books);
  for (const book of [...(player?.slots || []), ...(player?.bag?.items || []).map(i => i.book)]) if (book?.id) known.add(book.id);
  profile.progress.books = [...known];
}
