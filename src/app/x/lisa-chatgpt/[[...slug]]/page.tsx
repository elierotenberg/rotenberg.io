import type { Metadata } from "next";
import {
  getLisaChatGptFlatIndexFile,
  getLisaChatGptIntro,
} from "../../../../lib/LisaChatGpt.server";
import { MainContainer } from "../../../../components/MainContainer";
import ReactMarkdown from "react-markdown";
import type { FunctionComponent, ReactNode } from "react";
import Link from "next/link";
import slugify from "slugify";
import { BackToTopButton } from "../../../../components/BackToTopButton";
import remarkGfm from "remark-gfm";

import styles from "./styles.module.css";
import { VscQuestion } from "react-icons/vsc";

type Props = {
  readonly params: {
    readonly slug?:
      | [sectionId: string]
      | [sectionId: string, itemId: string]
      | [sectionId: string, itemId: string, valueItem: string]
      | [
          sectionId: string,
          itemId: string,
          valueItem: string,
          promptSlug: string,
        ];
  };
};

const Section: FunctionComponent<{
  readonly children: ReactNode;
}> = ({ children }) => (
  <section className="flex flex-col gap-6 rounded-md border-1 border-slate-300 p-6">
    {children}
  </section>
);

const normalize = (slug: string) =>
  slugify(slug, { lower: true, strict: true });

const fixMarkdown = (input: string): string => {
  const output = input
    .split("\n")
    .map((line) => line.trim())
    .join("\n");
  return output;
};

export default async function Page({ params: { slug } }: Props) {
  const flatIndexFile = await getLisaChatGptFlatIndexFile();
  const intro = await getLisaChatGptIntro();

  const [pageSectionSlug, pageItemSlug, pageValueSlug, pagePromptSlug] =
    slug ?? [];

  const pageSection = Object.entries(flatIndexFile.sections).find(
    ([sectionId]) => normalize(sectionId) === pageSectionSlug,
  );
  const pageItem = Object.entries(pageSection?.[1]?.items ?? {}).find(
    ([itemId]) => normalize(itemId) === pageItemSlug,
  );
  const pageValue = Object.entries(pageItem?.[1]?.values ?? {}).find(
    ([valueId]) => normalize(valueId) === pageValueSlug,
  );
  const pagePrompt = Object.entries(pageValue?.[1]?.prompts ?? {}).find(
    ([promptSlug]) => normalize(promptSlug) === pagePromptSlug,
  )?.[1];

  const pageSections = Object.entries(flatIndexFile.sections);
  const pageItems =
    typeof pageSection === "undefined"
      ? undefined
      : Object.entries(pageSection[1].items);
  const pageValues =
    typeof pageItem === "undefined"
      ? undefined
      : Object.entries(pageItem[1].values);
  const pagePrompts =
    typeof pageValue === "undefined"
      ? undefined
      : Object.entries(pageValue[1].prompts);

  return (
    <MainContainer>
      <header>
        <Section>
          <h1 className="text-4xl font-semibold">LISA ChatGPT</h1>
          <ReactMarkdown remarkPlugins={[remarkGfm]} className={"prose-sm"}>
            {intro}
          </ReactMarkdown>
        </Section>
      </header>
      <Section>
        <fieldset className={"flex flex-col gap-8"}>
          <input
            type="checkbox"
            id="section-details"
            className={styles["toggle-details"]}
          />
          <div className="flex flex-row items-center gap-4">
            <legend className="flex-1 text-lg font-medium" id="item">
              I want to help my children/student in the following broad area:
            </legend>
            <label
              htmlFor="section-details"
              className="inline-flex cursor-pointer flex-row items-center gap-2 self-end rounded-md border-1 border-slate-300 px-4 py-3 text-sm font-bold hover:bg-slate-50 hover:text-sky-500"
            >
              <VscQuestion className="h-5 w-5" />
              Help
            </label>
          </div>
          <ul role="list" className="flex flex-col items-stretch gap-4">
            {pageSections.map(([sectionId, section]) => {
              const sectionSlug = normalize(sectionId);
              const htmlId = `section-${sectionSlug}`;
              const isActive = sectionSlug === pageSectionSlug;
              return (
                <li key={sectionId} className="flex flex-col gap-1">
                  <Link
                    href={`/x/lisa-chatgpt/${sectionSlug}#item`}
                    className="flex flex-row items-center gap-4"
                  >
                    <input
                      type="radio"
                      id={htmlId}
                      name="section"
                      checked={isActive}
                      readOnly
                      className="cursor-pointer"
                    />
                    <label
                      htmlFor={htmlId}
                      className="flex-1 cursor-pointer text-lg font-medium"
                    >
                      {section.title}
                    </label>
                  </Link>
                  <aside
                    className={`prose-sm flex-1 pl-8 ${
                      isActive ? "block" : styles.details
                    }`}
                  >
                    <ReactMarkdown remarkPlugins={[remarkGfm]} skipHtml>
                      {fixMarkdown(section.description)}
                    </ReactMarkdown>
                  </aside>
                </li>
              );
            })}
          </ul>
        </fieldset>
        <BackToTopButton />
      </Section>
      {pageSectionSlug && pageItems && (
        <Section>
          <fieldset className="flex flex-col gap-8">
            <input
              type="checkbox"
              id="item-details"
              className={styles["toggle-details"]}
            />
            <div className="flex flex-row items-center gap-4">
              <legend className="flex-1 text-lg font-medium" id="item">
                I want to help my children/student in the following, more
                specific area:
              </legend>
              <label
                htmlFor="item-details"
                className="inline-flex cursor-pointer flex-row items-center gap-2 self-end rounded-md border-1 border-slate-300 px-4 py-3 text-sm font-bold hover:bg-slate-50 hover:text-sky-500"
              >
                <VscQuestion className="h-5 w-5" />
                Help
              </label>
            </div>
            <ul role="list" className="flex flex-col items-stretch gap-4">
              {pageItems.map(([itemId, item]) => {
                const itemSlug = normalize(itemId);
                const htmlId = `item-${itemSlug}`;
                const isActive = itemSlug === pageItemSlug;
                return (
                  <li key={itemId} className="flex flex-col gap-1">
                    <Link
                      href={`/x/lisa-chatgpt/${pageSectionSlug}/${itemSlug}#value`}
                      className="flex flex-row items-center gap-4"
                    >
                      <input
                        type="radio"
                        id={htmlId}
                        name="item"
                        checked={isActive}
                        readOnly
                        className="cursor-pointer"
                      />
                      <label
                        htmlFor={htmlId}
                        className="flex-1 cursor-pointer text-lg font-medium"
                      >
                        {item.title}
                      </label>
                    </Link>
                    <aside
                      className={`prose-sm flex-1 pl-8 ${
                        isActive ? "block" : styles.details
                      }`}
                    >
                      <ReactMarkdown remarkPlugins={[remarkGfm]} skipHtml>
                        {fixMarkdown(item.description)}
                      </ReactMarkdown>
                    </aside>
                  </li>
                );
              })}
            </ul>
          </fieldset>
          <BackToTopButton />
        </Section>
      )}
      {pageItemSlug && pageSectionSlug && pageValues && (
        <Section>
          <fieldset className="flex flex-col gap-8">
            <input
              type="checkbox"
              id="value-details"
              className={styles["toggle-details"]}
            />
            <div className="flex flex-row items-center gap-4">
              <legend className="flex-1 text-lg font-medium" id="value">
                In this area, my children/student displays the following
                behavior:
              </legend>
              <label
                htmlFor="value-details"
                className="inline-flex cursor-pointer flex-row items-center gap-2 self-end rounded-md border-1 border-slate-300 px-4 py-3 text-sm font-bold hover:bg-slate-50 hover:text-sky-500"
              >
                <VscQuestion className="h-5 w-5" />
                Help
              </label>
            </div>
            <ul role="list" className="flex flex-col items-stretch gap-4">
              {pageValues.map(([valueId, value]) => {
                const valueSlug = normalize(valueId);
                const htmlId = `value-${valueSlug}`;
                const isActive = valueSlug === pageValueSlug;
                return (
                  <li key={valueId} className="flex flex-col gap-1">
                    <Link
                      href={`/x/lisa-chatgpt/${pageSectionSlug}/${pageItemSlug}/${valueSlug}#prompt`}
                      className="flex flex-row items-center gap-4"
                    >
                      <input
                        type="radio"
                        id={htmlId}
                        name="value"
                        checked={isActive}
                        readOnly
                        className="cursor-pointer"
                      />
                      <label
                        htmlFor={htmlId}
                        className="flex-1 cursor-pointer text-lg font-medium"
                      >
                        {value.title}
                      </label>
                    </Link>
                    <aside
                      className={`prose-sm flex-1 pl-8 ${
                        isActive ? "block" : styles.details
                      }`}
                    >
                      <ReactMarkdown remarkPlugins={[remarkGfm]} skipHtml>
                        {fixMarkdown(value.description)}
                      </ReactMarkdown>
                    </aside>
                  </li>
                );
              })}
            </ul>
          </fieldset>
          <BackToTopButton />
        </Section>
      )}
      {pageValueSlug && pageItemSlug && pageSectionSlug && pagePrompts && (
        <Section>
          <fieldset className="flex flex-col gap-8" id="prompt">
            <legend className="text-lg font-medium">I am:</legend>
            <ul role="list" className="flex flex-col items-stretch gap-4">
              {pagePrompts.map(([promptId, prompt]) => {
                const promptSlug = normalize(promptId);
                const htmlId = `prompt-${promptSlug}`;
                return (
                  <li key={promptId}>
                    <Link
                      href={`/x/lisa-chatgpt/${pageSectionSlug}/${pageItemSlug}/${pageValueSlug}/${promptSlug}#guide`}
                      className="flex flex-row items-center gap-4"
                    >
                      <input
                        type="radio"
                        id={htmlId}
                        name="prompt"
                        checked={promptSlug === pagePromptSlug}
                        readOnly
                        className="cursor-pointer"
                      />
                      <label
                        htmlFor={htmlId}
                        className="flex-1 cursor-pointer text-lg font-medium"
                      >
                        a <b>{prompt.selfRole}</b> looking to support my{" "}
                        <b>{prompt.subjectRole}</b> <b>{prompt.context}</b>
                      </label>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </fieldset>
          <BackToTopButton />
        </Section>
      )}
      {pagePrompt && (
        <Section>
          <h2 id="guide" className="text-lg font-medium">
            This is the generated guide:
          </h2>
          <details className="rounded-md border-1 border-slate-300 bg-slate-50 p-3">
            <summary className="cursor-pointer italic">View prompt</summary>
            <pre className=" whitespace-pre-line text-sm">
              {fixMarkdown(pagePrompt.input)}
            </pre>
          </details>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            skipHtml
            className={styles.output}
          >
            {fixMarkdown(pagePrompt.output)}
          </ReactMarkdown>
          <BackToTopButton />
        </Section>
      )}
    </MainContainer>
  );
}

export async function generateMetadata({
  params: { slug },
}: Props): Promise<Metadata> {
  const flatIndexFile = await getLisaChatGptFlatIndexFile();
  const [slugSectionId, slugItemId, slugValueId, slugPromptSlug] = slug ?? [];

  const section = Object.entries(flatIndexFile.sections).find(
    ([sectionId]) => normalize(sectionId) === slugSectionId,
  )?.[1];
  const item = Object.entries(section?.items ?? {}).find(
    ([itemId]) => normalize(itemId) === slugItemId,
  )?.[1];
  const value = Object.entries(item?.values ?? {}).find(
    ([valueId]) => normalize(valueId) === slugValueId,
  )?.[1];
  const prompt = Object.entries(value?.prompts ?? {}).find(
    ([promptSlug]) => normalize(promptSlug) === slugPromptSlug,
  )?.[1];

  if (!section) {
    return {
      title: "LISA ChatGPT",
    };
  }
  if (!item) {
    return {
      title: `LISA ChatGPT > ${section.title}`,
    };
  }
  if (!value) {
    return {
      title: `LISA ChatGPT > ${section.title} > ${item.title}`,
    };
  }
  if (!prompt) {
    return {
      title: `LISA ChatGPT > ${section.title} > ${item.title} > ${value.title}`,
    };
  }
  return {
    title: `LISA ChatGPT > ${section.title} > ${item.title} > ${value.title} > ${prompt.selfRole} > ${prompt.subjectRole}`,
  };
}

export async function generateStaticParams(): Promise<Props["params"][]> {
  const flatIndexFile = await getLisaChatGptFlatIndexFile();
  const params: Props["params"][] = [{ slug: undefined }];

  for (const [sectionId, section] of Object.entries(flatIndexFile.sections)) {
    params.push({ slug: [normalize(sectionId)] });
    for (const [itemId, item] of Object.entries(section.items)) {
      params.push({ slug: [normalize(sectionId), normalize(itemId)] });
      for (const [valueItem, value] of Object.entries(item.values)) {
        params.push({
          slug: [normalize(sectionId), normalize(itemId), normalize(valueItem)],
        });
        for (const promptSlug of Object.keys(value.prompts)) {
          params.push({
            slug: [
              normalize(sectionId),
              normalize(itemId),
              normalize(valueItem),
              normalize(promptSlug),
            ],
          });
        }
      }
    }
  }

  return params;
}
