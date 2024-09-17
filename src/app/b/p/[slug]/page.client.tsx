"use client";

import hljs from "highlight.js";
import hljsJavascript from "highlight.js/lib/languages/javascript";
import hljsTypeScript from "highlight.js/lib/languages/typescript";
import "highlight.js/styles/github-dark.css";
import { useEffect } from "react";

export const RegisterHightlightJs = () => {
  useEffect(() => {
    hljs.registerLanguage("javascript", hljsJavascript);
    hljs.registerLanguage("js", hljsJavascript);
    hljs.registerLanguage("typescript", hljsTypeScript);
    hljs.registerLanguage("ts", hljsTypeScript);
  }, []);

  return null;
};
