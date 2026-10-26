// In-memory only: no community feed or account data is persisted to disk.
export const feedMemory = new Map();
export const invalidateFeed = () => feedMemory.clear();
export function updateFeedPost(id, update) {
  feedMemory.forEach(entry => { entry.posts = { ...entry.posts, results: entry.posts.results.map(post => post.id === id ? update(post) : post) }; });
}
