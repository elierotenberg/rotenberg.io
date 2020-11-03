export type Tag = string | { readonly color: string; readonly label: string };

export const parseTag = (input: unknown): Tag => {
  if (typeof input === "string") {
    return input;
  }
  if (typeof input === "object" && input !== null) {
    const tag = input as Exclude<Tag, string>;
    if (typeof tag.color === "string" && typeof tag.label === "string") {
      return { color: tag.color, label: tag.label };
    }
  }
  throw new Error("not a tag");
};
