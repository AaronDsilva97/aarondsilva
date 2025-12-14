import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    author: z.string().default('Aaron Dsilva'),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    image: z.string().optional(),
    seo: z.object({
      keywords: z.array(z.string()).optional(),
    }).optional(),
  }),
});

export const collections = {
  blog: blogCollection,
};
