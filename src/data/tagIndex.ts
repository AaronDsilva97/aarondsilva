import { getCollection, type CollectionEntry } from 'astro:content';

export type TagEntry = {
  slug: string;
  label: string;
  posts: CollectionEntry<'blog'>[];
};

export async function getTagIndex(): Promise<Map<string, TagEntry>> {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  const index = new Map<string, TagEntry>();

  for (const post of posts) {
    for (const tag of post.data.tags) {
      const slug = tag.toLowerCase();
      if (!index.has(slug)) index.set(slug, { slug, label: tag, posts: [] });
      index.get(slug)!.posts.push(post);
    }
  }

  return index;
}
