import { z } from "zod";

import type { MDXRemoteSerializeResult } from "next-mdx-remote/rsc";

export const BlogPostMetadata = z.object({
  abstract: z.string(),
  cover: z.string(),
  date: z
    .string()
    .datetime()
    .transform((date) => new Date(date))
    .pipe(z.date()),
  lang: z.string(),
  slug: z.string(),
  status: z.enum([`draft`, `published`]),
  tags: z.array(z.string()),
  title: z.string(),
});
export type BlogPostMetadata = z.infer<typeof BlogPostMetadata>;

export type BlogPost = MDXRemoteSerializeResult & {
  readonly frontmatter: BlogPostMetadata;
};
