import { z } from "zod";

export const BlogPost = z.object({
  content: z.string(),
  data: z.object({
    abstract: z.string(),
    cover: z.string(),
    date: z.string(),
    lang: z.enum(["en", "fr"]),
    slug: z.string(),
    status: z.enum(["draft", "published"]),
    tags: z.array(z.string()),
    title: z.string(),
  }),
});

export type BlogPost = z.infer<typeof BlogPost>;
