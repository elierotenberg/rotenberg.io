import "server-only";
import { FlatIndexFile } from "./LisaChatGpt";
import { load } from "js-yaml";
import { join } from "path";
import { readFile } from "fs/promises";

export async function getLisaChatGptFlatIndexFile(): Promise<FlatIndexFile> {
  return FlatIndexFile.parse(
    load(
      await readFile(
        join(process.cwd(), "src", "data", "lisa-chatgpt", "flat-index.yml"),
        { encoding: "utf-8" },
      ),
    ),
  );
}

export async function getLisaChatGptIntro(): Promise<string> {
  return await readFile(
    join(process.cwd(), "src", "data", "lisa-chatgpt", "lisa-intro.md"),
    { encoding: "utf-8" },
  );
}
