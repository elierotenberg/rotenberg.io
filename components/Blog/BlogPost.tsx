import { Heading, Text, Box } from "@chakra-ui/core";
import { useRouter } from "next/router";
import React, { Fragment, FunctionComponent } from "react";

import { IBlogPostData } from "../../lib/Blog";
import { flattenTags } from "../../lib/Tag";
import { translations } from "../../lib/translations";
import { useCanonicalUrl } from "../../lib/url";
import { Link } from "../Link";
import { Markdown } from "../Markdown/Markdown";
import { Page } from "../Page";
import { TagList } from "../TagList";

interface IBlogPostProps {
  readonly blogPost: IBlogPostData;
}

export const BlogPost: FunctionComponent<IBlogPostProps> = ({ blogPost }) => {
  const { asPath } = useRouter();
  return (
    <Page
      withFooter={true}
      withNavBar={true}
      title={blogPost.title}
      lang={blogPost.lang}
      head={
        <Fragment>
          <meta name="description" content={blogPost.abstract} />
          <meta
            name="keywords"
            content={flattenTags(blogPost.tags).join(", ")}
          />
          <meta name="robots" content="index, follow" />
          <meta property="og:title" content={blogPost.title} />
          <meta property="og:type" content="article" />
          <meta property="og:description" content={blogPost.abstract} />
          <meta property="og:image" content={useCanonicalUrl(blogPost.cover)} />
          <meta property="og:locale" content={blogPost.lang} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:creator" content="@elierotenberg" />
          <meta name="twitter:title" content={blogPost.title} />
          <meta name="twitter:description" content={blogPost.abstract} />
          <meta
            name="twitter:image"
            content={useCanonicalUrl(blogPost.cover)}
          />
        </Fragment>
      }
    >
      <Box as="article">
        <Heading as="h1" fontSize={28} mb={2} mt={4}>
          <Link href={asPath.replace(/\#.*$/, "")}>{blogPost.title}</Link>
        </Heading>
        <Text fontSize={14} mt={2} mb={2} fontStyle="italic">
          {translations.blog.publishedOn[blogPost.lang === "fr" ? "fr" : "en"](
            new Date(blogPost.date),
          )}
        </Text>
        <TagList mb={4} tags={blogPost.tags} />
        <Markdown content={blogPost.content} headingOffset={1} />
      </Box>
    </Page>
  );
};
