import type { FunctionComponent } from "react";
import { VscArrowUp } from "react-icons/vsc";

export const BackToTopButton: FunctionComponent = () => {
  return (
    <a
      href="#top"
      className="inline-flex flex-row items-center gap-2 self-end rounded-md border-1 border-slate-300 px-4 py-3 text-sm hover:bg-slate-50"
    >
      Back to top
      <VscArrowUp className="h-5 w-5" />
    </a>
  );
};
