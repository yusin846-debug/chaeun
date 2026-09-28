/** A story owns an equal portion of the sticky section, in both scroll directions. */
export function getStoryIndex(distance: number, travel: number, count: number): number {
  if (travel <= 0 || count <= 1) return 0;
  const progress = Math.max(0, Math.min(1, distance / travel));
  return Math.min(count - 1, Math.floor(progress * count));
}
