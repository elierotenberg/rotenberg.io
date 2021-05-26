import * as t from "typed-assert";

export type BlogPostData = {
  readonly slug: string;
  readonly title: string;
  readonly lang: string;
  readonly tags: string[];
  readonly date: number;
  readonly status: `draft` | `published`;
  readonly cover: string;
  readonly abstract: string;
};

export const parseBlogPostData = (input: unknown): BlogPostData => {
  t.isRecord(input);
  const data = input as Omit<BlogPostData, `date`> & {
    readonly date: string;
  };
  t.isString(data.slug);
  t.isString(data.title);
  t.isString(data.lang);
  t.isArrayOfType(data.tags, t.isString);
  t.isString(data.date);
  const date = new Date(data.date).getTime();
  t.isOneOf(data.status, [`draft`, `published`]);
  t.isString(data.cover);
  t.isString(data.abstract);
  return {
    ...data,
    date,
  };
};
