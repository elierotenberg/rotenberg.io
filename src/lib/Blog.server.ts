import "server-only";
import { BlogPost } from "./Blog";
import { readFile, readdir } from "fs/promises";
import { extname, join } from "path";
import matter from "gray-matter";

export async function getBlogPosts(): Promise<BlogPost[]> {
  const files = await readdir(
    join(process.cwd(), "src", "data", "blog", "posts"),
  ).then((files) =>
    files.filter((file) => extname(file).toLowerCase() === ".md"),
  );
  return Promise.all(
    files.map(async (file) => {
      const content = await readFile(
        join(process.cwd(), "src", "data", "blog", "posts", file),
        { encoding: "utf-8" },
      );
      return BlogPost.parse(matter(content));
    }),
  );
}

export async function getBlogPost(slug: string): Promise<BlogPost> {
  const blogPost = (await getBlogPosts()).find(
    (post) => post.data.slug === slug,
  );
  if (!blogPost) {
    throw new Error(`No blog post found with slug "${slug}"`);
  }
  return blogPost;
}
