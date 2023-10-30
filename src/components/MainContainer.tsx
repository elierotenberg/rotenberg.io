import type { FunctionComponent, ReactNode } from "react";

export const MainContainer: FunctionComponent<{
  readonly children: ReactNode;
}> = ({ children }) => (
  <main
    id="top"
    className="container mx-auto flex max-w-6xl flex-col gap-10 px-4 py-5"
  >
    {children}
  </main>
);
