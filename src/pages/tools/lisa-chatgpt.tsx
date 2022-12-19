import Head from "next/head";
import React, { useEffect, useState } from "react";
import type { FunctionComponent, ReactNode } from "react";
import type { BoxProps } from "@chakra-ui/react";
import {
  Box,
  Container,
  Flex,
  Heading,
  Icon,
  Link,
  ListItem,
  Select,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import {
  MdOutlineChat,
  MdOutlineLiveHelp,
  MdOutlineNorth,
  MdWarningAmber,
} from "react-icons/md";
import ReactMarkdown from "react-markdown";
import "github-markdown-css";
import remarkGfm from "remark-gfm";
import type { IconType } from "react-icons";
import { useRouter } from "next/router";

import sections from "../../data/lisa-chatgpt-data.json";

type ArrayElement<T> = T extends readonly (infer U)[] ? U : never;

type Section = ArrayElement<typeof sections>;
type Item = ArrayElement<Section[`items`]>;
type Response = Item[`responses`][keyof Item[`responses`]];

const AlertBox: FunctionComponent<{
  readonly icon: IconType;
  readonly centerIcon?: boolean;
  readonly id?: string;
  readonly bgColor: BoxProps[`bgColor`];
  readonly borderColor: BoxProps[`borderColor`];
  readonly sx?: BoxProps[`sx`];
  readonly children: ReactNode;
}> = ({ icon, centerIcon, id, bgColor, borderColor, sx, children }) => (
  <Box
    id={id}
    position={`relative`}
    borderWidth={1}
    p={2}
    bgColor={bgColor}
    borderColor={borderColor}
    sx={sx}
  >
    <Icon
      as={icon}
      w={6}
      h={6}
      position="absolute"
      left={2}
      top={centerIcon ? `50%` : 2}
      transform={centerIcon ? `translateY(-50%)` : undefined}
      display={{ base: `none`, sm: `block` }}
    />
    <Box pl={{ base: 2, sm: 10 }} pr={{ base: 2, sm: 4 }}>
      {children}
    </Box>
  </Box>
);

const Conversation: FunctionComponent<{ readonly response: Response }> = ({
  response: { question, prompt, response },
}) => {
  return (
    <Flex
      flexDirection={`column`}
      w="100%"
      alignItems={`stretch`}
      gap={2}
      id={question}
    >
      <AlertBox
        borderColor="blue.100"
        bgColor={`blue.50`}
        icon={MdOutlineLiveHelp}
      >
        <Text fontWeight={600} fontSize="sm">
          {prompt.replace(/, formatted as a markdown table/, ``)}
        </Text>
      </AlertBox>
      <AlertBox
        borderColor={`green.100`}
        bgColor="white"
        icon={MdOutlineChat}
        sx={{
          "& .markdown-body": {
            fontSize: {
              base: `xs`,
              sm: `sm`,
            },
          },
          "& .markdown-body table th, & .markdown-body table td": {
            p: {
              base: 1,
              sm: 2,
            },
          },
        }}
      >
        <ReactMarkdown className="markdown-body" remarkPlugins={[remarkGfm]}>
          {response.slice(prompt.length)}
        </ReactMarkdown>
      </AlertBox>
      <Flex justifyContent={`end`} pr={4}>
        <Link href="#top">
          Back to top <Icon as={MdOutlineNorth} mb={-0.5} />
        </Link>
      </Flex>
    </Flex>
  );
};

const introMd = `
The LISA project is an interacting network of concepts, tools, and individuals gathered together to develop and execute both the collective and individualized educational programs necessary to foster healthy adaptations as youth make the journey from childhood to intellectual and social maturity.

The LISA framework is made of serveral components. The FACETS[^1] helps teachers structure their observation of children and assess their individual strengths and needs. Then, they are presented with practical guidance to adapt their educational approach.

All the LISA content is created by field experts carefully reviewing and summarizing state of the art, evidence-based practices. However, as a funny experiment, we have crafted specific queries for OpenAI's Chat GPT[^2] bot to see what it would come up with. This page presents the raw, unreviewed, unedited results.

If you would like to know more about the LISA project, please reach out to anirudh.krishnakumar@ifea.education.

[^1]: Leventhal, Bennett & Konishcheva, Kseniia & Rotenberg, Elie & Krishnakumar, Anirudh & Page, Naima & Gares, Laure & Almaraz, Laetitia & Falissard, Bruno & Klein, Arno & Lindner, Ariel. (2022). 2.82 Functional Activity, Cognition, Emotion and Thinking Scale (FACETS): Initial Examination of Reliability and Utility. Journal of the American Academy of Child & Adolescent Psychiatry. 61. S210. [10.1016/j.jaac.2022.09.226](https://doi.org/10.1016/j.jaac.2022.09.226).

[^2]: ChatGPT, OpenAI https://chat.openai.com/chat.
`;

const Intro: FunctionComponent = () => {
  return (
    <Box
      flexDirection={`column`}
      sx={{
        "& .markdown-body": {
          bg: `transparent`,
          fontSize: `sm`,
        },
        "& .markdown-body section": {
          border: 0,
        },
        "& .markdown-body #footnote-label, & .markdown-body .data-footnote-backref":
          {
            display: `none`,
          },
      }}
    >
      <ReactMarkdown className="markdown-body" remarkPlugins={[remarkGfm]}>
        {introMd}
      </ReactMarkdown>
    </Box>
  );
};

const ConversationLinks: FunctionComponent = () => (
  <UnorderedList pl={4} fontSize="sm">
    <ListItem>
      <Link href="#summary">
        Components, signs of strengths and difficulties
      </Link>
    </ListItem>
    <ListItem>
      <Link href="#help">How to help</Link>
    </ListItem>
    <ListItem>
      <Link href="#identify_strength">Identifying strengths</Link>
    </ListItem>
    <ListItem>
      <Link href="#identify_difficulties">Identifying difficulties</Link>
    </ListItem>
    <ListItem>
      <Link href="#components">Identifying components</Link>
    </ListItem>
  </UnorderedList>
);

const Disclaimer: FunctionComponent = () => (
  <AlertBox
    bgColor={`yellow.50`}
    borderColor={`yellow.300`}
    icon={MdWarningAmber}
    centerIcon
  >
    <Text fontSize={`sm`}>
      The following responses have been generated by Chat GPT, a conversational
      AI, and has NOT been reviewed by experts.
      <br />
      Thus, the information may be inaccurate, inappropriate, or actually
      damaging.
      <br />
      <Text as="b">
        If you want to actually learn more on how to support children at home
        and at school, please refer to a trained professional.
      </Text>
    </Text>
  </AlertBox>
);

const LisaChatGptPage: FunctionComponent = () => {
  const router = useRouter();

  const [sectionSlug, setSectionSlug] = useState<undefined | string>(undefined);

  useEffect(() => {
    const section_slug = router.query.section;
    if (typeof section_slug !== `string` || section_slug.length === 0) {
      setSectionSlug(undefined);
      return;
    }
    if (
      typeof section_slug === `string` &&
      section_slug !== sectionSlug &&
      sections.some((section) => section.section_slug === section_slug)
    ) {
      setSectionSlug(section_slug);
    }
  }, [router.query.section, sectionSlug]);

  const [itemSlug, setItemSlug] = useState<undefined | string>(undefined);

  useEffect(() => {
    const section = sections.find(
      (section) => section.section_slug === sectionSlug,
    );
    if (!section) {
      return;
    }
    const item_slug = router.query.item;
    if (typeof item_slug !== `string` || item_slug.length === 0) {
      setItemSlug(undefined);
      return;
    }
    if (
      typeof item_slug === `string` &&
      item_slug !== itemSlug &&
      section.items.some((item) => item.item_slug === item_slug)
    ) {
      setItemSlug(item_slug);
    }
  }, [router.query.item, sectionSlug, itemSlug]);

  const section = sections.find(
    (section) => section.section_slug === sectionSlug,
  );

  const item = section?.items.find((item) => item.item_slug === itemSlug);
  return (
    <>
      <Head>
        <title>LISA ChatGPT Demo</title>
      </Head>
      <Container
        maxW={`container.lg`}
        display="flex"
        flexDirection={`column`}
        gap={8}
        pb={10}
        pt={6}
      >
        <Heading>LISA Chat GPT demo</Heading>
        <Intro />
        <AlertBox
          id="top"
          icon={MdOutlineLiveHelp}
          bgColor="blue.50"
          borderColor={`blue.200`}
          centerIcon
        >
          <Flex
            id="top"
            flexWrap={`wrap`}
            flexDirection={{ base: `column`, md: `row` }}
            gap={1}
            alignItems={{ base: `flex-start`, md: `center` }}
          >
            <Box>
              I want to help a kid with
              <Text display={{ base: `inline`, md: `none` }}>:</Text>
            </Box>
            <Select
              size="sm"
              placeholder="Pick a domain"
              w="fit-content"
              display={`inline-block`}
              ml={{ base: 4, md: 0 }}
              value={sectionSlug}
              onChange={({ target: { value: section_slug } }) => {
                if (section_slug !== sectionSlug) {
                  router.replace(
                    { query: { section: section_slug } },
                    undefined,
                    {
                      shallow: true,
                    },
                  );
                }
              }}
              colorScheme="blue"
            >
              {sections.map(({ section_slug, title }) => (
                <option key={section_slug} value={section_slug}>
                  {title}
                </option>
              ))}
            </Select>
            {section && (
              <Select
                size="sm"
                placeholder="Pick a trait"
                w="fit-content"
                display={`inline-block`}
                ml={{ base: 4, md: 0 }}
                value={itemSlug}
                onChange={({ target: { value: item_slug } }) => {
                  if (sectionSlug && item_slug !== itemSlug) {
                    router.replace(
                      {
                        query: { section: sectionSlug, item: item_slug },
                      },
                      undefined,
                      { shallow: true },
                    );
                  }
                }}
                colorScheme="blue"
              >
                {section.items.map(({ item_slug, title }) => (
                  <option key={item_slug} value={item_slug}>
                    {title}
                  </option>
                ))}
              </Select>
            )}
            <Text display={{ base: `none`, md: `inline` }}>.</Text>
          </Flex>
        </AlertBox>
        {item && (
          <Flex flexDirection={`column`} gap={4}>
            <Disclaimer />
            <ConversationLinks />
            <Conversation response={item.responses.summary} />
            <Conversation response={item.responses.help} />
            <Conversation response={item.responses.components} />
            <Conversation response={item.responses.identify_difficulties} />
            <Conversation response={item.responses.identify_strength} />
          </Flex>
        )}
      </Container>
    </>
  );
};

export default LisaChatGptPage;
