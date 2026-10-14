import { mockPosts } from "@/mocks/feed";
import type { Post } from "@/types/post";

export async function getPostsByAuthor(authorId: string, limit = 3): Promise<Post[]> {
  return mockPosts.filter((post) => post.author.id === authorId).slice(0, limit);
}
