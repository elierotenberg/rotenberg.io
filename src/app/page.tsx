import type { Metadata } from "next";

import { myself } from "../lib/Self";
import type { FunctionComponent, ReactNode } from "react";

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
    <section className="flex flex-col gap-3">
      <a href={`#${id}`}>
        <h2 id={id} className="text-lg font-medium sm:text-2xl">
          {title}
        </h2>
      </a>
      {children}
    </section>
  );
};

const ListItem: FunctionComponent<{
  readonly title: ReactNode;
  readonly date?: undefined | ReactNode;
  readonly description?: undefined | ReactNode;
  readonly picture?: undefined | ReactNode;
}> = ({ date, description, picture, title }) => {
  return (
    <div className="flex flex-row items-center gap-4 rounded-sm bg-white px-3 py-4 shadow-sm">
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
    <main className="container mx-auto flex max-w-6xl flex-col gap-8 px-4 py-5">
      <header className="flex flex-row items-center gap-4 rounded-sm bg-white px-3 py-4 shadow-sm">
        <div className="w-16 sm:w-24">{myself.picture}</div>
        <div className="flex flex-1 flex-col">
          <h1 className="mb-0 text-xl font-semibold sm:text-3xl">
            {myself.name}
          </h1>
          <p className="text-sm sm:text-lg">{myself.description}</p>
          <ol className="mt-1 flex flex-row items-center gap-1.5 sm:mt-3">
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
        <ol className="flex flex-row flex-wrap gap-3 rounded-sm bg-white px-3 py-4 shadow-sm">
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
        <ol className="flex flex-col gap-3">
          {myself.positions.current.map(({ key, ...position }) => (
            <ListItem key={key} {...position} />
          ))}
        </ol>
      </Section>
      <Section id="past-positions" title="Past positions">
        <ol className="flex flex-col gap-3">
          {myself.positions.past.map(({ key, ...position }) => (
            <ListItem key={key} {...position} />
          ))}
        </ol>
      </Section>
      <Section id="research" title="Research">
        <ol className="flex flex-col gap-3">
          {myself.research.map(({ key, ...position }) => (
            <ListItem key={key} {...position} />
          ))}
        </ol>
      </Section>
      <Section id="education" title="Education">
        <ol className="flex flex-col gap-3">
          {myself.education.map(({ key, ...position }) => (
            <ListItem key={key} {...position} />
          ))}
        </ol>
      </Section>
      <Section id="random-quotes" title="Random Quotes">
        <ol className="flex flex-col gap-3">
          {myself.randomQuotes.map(({ footnote, key, text }) => (
            <div
              key={key}
              className="flex flex-col gap-4 rounded-sm bg-white px-3 py-4 shadow-sm"
            >
              <blockquote className="text-base italic">{text}</blockquote>
              <div className="self-end">{footnote}</div>
            </div>
          ))}
        </ol>
      </Section>
    </main>
  );
}
