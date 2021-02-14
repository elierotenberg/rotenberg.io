import { Heading, Text, Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { Fragment, FunctionComponent, ReactElement } from "react";

import { BlogPostData } from "../../lib/Blog";
import { translations } from "../../lib/translations";
import { useCanonicalUrl } from "../../lib/url";
import { Link } from "../Link";
import { MdxProvider } from "../MdxProvider/MdxProvider";
import { Page } from "../Page";
import { TagList } from "../TagList";

interface IBlogPostProps {
  readonly blogPostData: BlogPostData;
  readonly children: ReactElement;
}

export const BlogPost: FunctionComponent<IBlogPostProps> = ({
  blogPostData,
  children,
}) => {
  const { asPath } = useRouter();
  return (
    <Page
      withFooter={true}
      withNavBar={true}
      title={blogPostData.title}
      lang={blogPostData.lang}
      head={
        <Fragment>
          <meta name="description" content={blogPostData.abstract} />
          <meta name="keywords" content={blogPostData.tags.join(", ")} />
          <meta name="robots" content="index, follow" />
          <meta property="og:title" content={blogPostData.title} />
          <meta property="og:type" content="article" />
          <meta property="og:description" content={blogPostData.abstract} />
          <meta
            property="og:image"
            content={useCanonicalUrl(blogPostData.cover)}
          />
          <meta property="og:locale" content={blogPostData.lang} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:creator" content="@elierotenberg" />
          <meta name="twitter:title" content={blogPostData.title} />
          <meta name="twitter:description" content={blogPostData.abstract} />
          <meta
            name="twitter:image"
            content={useCanonicalUrl(blogPostData.cover)}
          />
        </Fragment>
      }
    >
      <Box as="article">
        <Heading as="h1" fontSize={28} mb={2} mt={4}>
          <Link href={asPath.replace(/\#.*$/, "")}>{blogPostData.title}</Link>
        </Heading>
        <Text fontSize={14} mt={2} mb={2} fontStyle="italic">
          {translations.blog.publishedOn[
            blogPostData.lang === "fr" ? "fr" : "en"
          ](new Date(blogPostData.date))}
        </Text>
        <TagList mb={4} tags={blogPostData.tags} />
        <MdxProvider>{children}</MdxProvider>
      </Box>
    </Page>
  );
};
