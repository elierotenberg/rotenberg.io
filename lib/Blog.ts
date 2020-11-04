import { promises } from "fs";
import { join } from "path";

import matter from "gray-matter";

import { parseTag, Tag } from "./Tag";

export interface IBlogPostData {
  readonly slug: string;
  readonly title: string;
  readonly lang: string;
  readonly tags: Tag[];
  readonly content: string;
  readonly date: number;
  readonly status: "draft" | "published";
  readonly cover: string;
  readonly abstract: string;
}

const parseBlogPost = (rawContents: string): IBlogPostData => {
  const { orig, ...grayMatter } = matter(rawContents);
  void orig;
  const {
    slug,
    tags,
    title,
    lang,
    status,
    date,
    cover,
    abstract,
  } = grayMatter.data;
  const content = grayMatter.content;
  if (typeof slug !== "string") {
    throw new Error("slug should be a string");
  }
  if (typeof title !== "string") {
    throw new Error("title should be a string");
  }
  if (typeof lang !== "string") {
    throw new Error("lang should be a string");
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
  if (typeof cover !== "string") {
    throw new Error("cover should be a string");
  }
  if (typeof abstract !== "string") {
    throw new Error("abstract s hould be a string");
  }
  return {
    slug,
    tags,
    title,
    lang,
    status,
    content,
    date: date.getTime(),
    cover,
    abstract,
  };
};

const notNull = <T>(x: T | null): x is T => x !== null;

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
          try {
            return parseBlogPost(rawContents);
          } catch (error: unknown) {
            console.error(path, (error as Error).message);
            return null;
          }
        }),
    )
  )
    .filter(notNull)
    .filter((blogPost) => {
      if (!blogPost) {
        return false;
      }
      if (process.env.NODE_ENV === "development") {
        return true;
      }
      return blogPost.status === "published";
    });
