import type { Metadata } from "next";
import { getBlogPost, getBlogPosts } from "../../../../lib/Blog.server";
import Link from "next/link";
import { DateFormat } from "../../../../components/DateFormat";

import ReactMarkdown from "react-markdown";
import type { Components as ReactMarkdownComponents } from "react-markdown";
import Image from "next/image";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkToc from "remark-toc";
import { MainContainer } from "../../../../components/MainContainer";
import { BackToTopButton } from "../../../../components/BackToTopButton";

type Props = {
  readonly params: {
    readonly slug: string;
  };
};

const markdownComponents: ReactMarkdownComponents = {
  img: ({ alt = "", src = "", title }) => (
    <span className="block text-center">
      <span className="relative block h-48 sm:h-64">
        <Image
          alt={alt}
          src={src}
          fill
          style={{
            margin: 0,
            objectFit: "contain",
          }}
        />
      </span>
      {title && <span className="mt-2 text-sm italic">{title}</span>}
    </span>
  ),
};

export default async function Page({ params: { slug } }: Props) {
  const {
    content,
    data: { date, tags, title },
  } = await getBlogPost(slug);
  return (
    <MainContainer>
      <Link href={`/b/p/${slug}`}>
        <h1 className="mb-2 text-2xl font-semibold">{title}</h1>
      </Link>
      <span className="mb-2 text-base">
        <span className="hidden">{date}</span>
        <DateFormat
          date={date}
          options={{
            day: "numeric",
            month: "short",
            year: "numeric",
          }}
        />
      </span>
      <ul className="flex flex-row flex-wrap gap-1">
        {tags.map((tag) => (
          <li key={tag} className="rounded-md bg-slate-100 px-2 py-1 text-sm">
            {tag}
          </li>
        ))}
      </ul>
      <article className="prose-sm prose-ul:list-disc">
        <ReactMarkdown
          components={markdownComponents}
          rehypePlugins={[
            rehypeSlug,
            [rehypeAutolinkHeadings, { behavior: "wrap" }],
          ]}
          remarkPlugins={[remarkToc]}
        >
          {content}
        </ReactMarkdown>
      </article>
      <BackToTopButton />
    </MainContainer>
  );
}

export async function generateMetadata({
  params: { slug },
}: Props): Promise<Metadata> {
  const blogPost = await getBlogPost(slug);
  return {
    description: blogPost.data.abstract,
    title: blogPost.data.title,
  };
}

export async function generateStaticParams(): Promise<Props["params"][]> {
  const blogPosts = await getBlogPosts();

  return blogPosts.map(({ data: { slug } }) => ({
    slug,
  }));
}
