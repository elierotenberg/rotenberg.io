import type { Metadata } from "next";

import { myself } from "../lib/Self";
import type { FunctionComponent, ReactNode } from "react";
import { MainContainer } from "../components/MainContainer";
import { BackToTopButton } from "../components/BackToTopButton";

export const metadata: Metadata = {
  description: "Broad-spectrum hobbyist",
  title: "Elie Rotenberg",
};

const Section: FunctionComponent<{
  readonly id: string;
  readonly title: string;
  readonly children: ReactNode;
}> = ({ children, id, title }) => {
  return (
    <section className="flex flex-col gap-6">
      <a href={`#${id}`} className="self-start">
        <h2 id={id} className="text-lg font-medium sm:text-2xl">
          {title}
        </h2>
      </a>
      {children}
      <BackToTopButton />
    </section>
  );
};

const SectionList: FunctionComponent<{
  readonly children: ReactNode;
}> = ({ children }) => (
  <ol className="flex flex-col gap-6" role="list">
    {children}
  </ol>
);

const SectionListItem: FunctionComponent<{
  readonly title: ReactNode;
  readonly date?: undefined | ReactNode;
  readonly description?: undefined | ReactNode;
  readonly picture?: undefined | ReactNode;
}> = ({ date, description, picture, title }) => {
  return (
    <div className="flex flex-row items-center gap-4 rounded-md border-1 border-slate-300 px-5 py-6">
      <div className="flex flex-1 flex-col">
        <h3 className="text-base">{title}</h3>
        {date && <span className="text-sm">{date}</span>}
        {description && <div className="text-sm">{description}</div>}
      </div>
      {picture && (
        <div className="flex w-16 flex-col items-center justify-center bg-white sm:w-24">
          {picture}
        </div>
      )}
    </div>
  );
};

export default function Home() {
  return (
    <MainContainer>
      <header className="flex flex-row items-center gap-5 rounded-md border-1 border-slate-300 px-5 py-6">
        <div className="w-16 sm:w-24">
          {
            <myself.Picture className="rounded-full border-1 border-slate-300" />
          }
        </div>
        <div className="flex flex-1 flex-col">
          <h1 className="mb-0 text-xl font-semibold sm:text-3xl">
            {myself.name}
          </h1>
          <p className="text-sm sm:text-lg">{myself.description}</p>
          <ol
            className="mt-1 flex flex-row items-center gap-1.5 sm:mt-3"
            role="list"
          >
            {myself.links.map(({ IconType, href, key, title }) => (
              <li key={key}>
                <a href={href} target="_blank">
                  <IconType className="h-5 w-5" />
                  <span className="hidden">{title}</span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </header>
      <Section id="interests" title="Interests">
        <ol
          className="flex flex-row flex-wrap gap-3 rounded-md border-1 border-slate-300 px-5 py-6"
          role="list"
        >
          {myself.interests.map((interest, key) => (
            <li
              className="rounded-md bg-blue-50 px-2 py-0.5 text-sm sm:text-base"
              key={key}
            >
              {interest}
            </li>
          ))}
        </ol>
      </Section>
      <Section id="current-positions" title="Current positions">
        <SectionList>
          {myself.positions.current.map(({ key, ...position }) => (
            <SectionListItem key={key} {...position} />
          ))}
        </SectionList>
      </Section>
      <Section id="past-positions" title="Past positions">
        <SectionList>
          {myself.positions.past.map(({ key, ...position }) => (
            <SectionListItem key={key} {...position} />
          ))}
        </SectionList>
      </Section>
      <Section id="research" title="Research">
        <SectionList>
          {myself.research.map(({ key, ...position }) => (
            <SectionListItem key={key} {...position} />
          ))}
        </SectionList>
      </Section>
      <Section id="education" title="Education">
        <SectionList>
          {myself.education.map(({ key, ...position }) => (
            <SectionListItem key={key} {...position} />
          ))}
        </SectionList>
      </Section>
      <Section id="random-quotes" title="Random Quotes">
        <SectionList>
          {myself.randomQuotes.map(({ footnote, key, text }) => (
            <div
              key={key}
              className="flex flex-col gap-4 rounded-md border-1 border-slate-300 px-5 py-6"
            >
              <blockquote className="text-base italic">{text}</blockquote>
              <div className="self-end">{footnote}</div>
            </div>
          ))}
        </SectionList>
      </Section>
    </MainContainer>
  );
}
