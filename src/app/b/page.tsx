import type { Metadata } from "next";
import { getBlogPosts } from "../../lib/Blog.server";
import { DateFormat } from "../../components/DateFormat";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog posts",
};

export default async function Page() {
  const blogPosts = await getBlogPosts();

  return (
    <main className="container mx-auto max-w-6xl px-4 py-5">
      <ol className="flex flex-col gap-4">
        {blogPosts.map(
          ({ data: { abstract, cover, date, slug, tags, title } }) => (
            <article
              key={slug}
              className="flex flex-row items-stretch gap-4 rounded-sm bg-white px-4 py-4 shadow-sm"
            >
              <div className="flex flex-1 flex-col">
                <Link href={`/b/p/${slug}`}>
                  <h2 className="mb-1 text-base">{title}</h2>
                </Link>
                <span className="mb-2 text-xs">
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
                <div className="mb-3 text-sm">{abstract}</div>
                <ul className="flex flex-row flex-wrap gap-1">
                  {tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-md bg-slate-100 px-2 py-1 text-xs"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative flex w-24 flex-col items-center justify-center bg-white sm:w-48">
                <Image
                  src={cover}
                  fill
                  alt={title}
                  style={{
                    objectFit: "contain",
                  }}
                />
              </div>
            </article>
          ),
        )}
      </ol>
    </main>
  );
}
