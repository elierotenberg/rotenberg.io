import { promises } from "fs";
import { join } from "path";

import matter from "gray-matter";

import { parseTag, Tag } from "./Tag";

export interface IBlogPostData {
  readonly slug: string;
  readonly title: string;
  readonly tags: Tag[];
  readonly content: string;
  readonly date: number;
  readonly status: "draft" | "published";
}

const parseBlogPost = (rawContents: string): IBlogPostData => {
  const { orig, ...grayMatter } = matter(rawContents);
  void orig;
  const { slug, tags, title, status, date } = grayMatter.data;
  const content = grayMatter.content;
  if (typeof slug !== "string") {
    throw new Error("slug should be a string");
  }
  if (typeof title !== "string") {
    throw new Error("title should be a string");
  }
  for (const tag of tags) {
    parseTag(tag);
  }
  if (!(date instanceof Date)) {
    throw new Error("date should be a Date");
  }
  if (!["draft", "published"].includes(status)) {
    throw new Error("status should be 'draft' or 'publlished'");
  }
  return {
    slug,
    tags,
    title,
    status,
    content,
    date: date.getTime(),
  };
};

const basePath = join(process.cwd(), "posts");
export const loadBlogPosts = async (): Promise<IBlogPostData[]> =>
  (
    await Promise.all(
      (await promises.readdir(basePath, "utf-8"))
        .filter((path) => path.endsWith(".md"))
        .map(async (path) => {
          const rawContents = await promises.readFile(join(basePath, path), {
            encoding: "utf-8",
          });
          return parseBlogPost(rawContents);
        }),
    )
  ).filter((blogPost) => {
    if (process.env.NODE_ENV === "development") {
      return true;
    }
    return blogPost.status === "published";
  });
