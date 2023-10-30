import { z } from "zod";

export const FlatIndexFile = z.object({
  sections: z.record(
    z.object({
      description: z.string(),
      items: z.record(
        z.object({
          description: z.string(),
          itemId: z.string(),
          title: z.string(),
          values: z.record(
            z.object({
              description: z.string(),
              prompts: z.record(
                z.object({
                  context: z.string(),
                  input: z.string(),
                  model: z.string(),
                  output: z.string(),
                  selfRole: z.string(),
                  slug: z.string(),
                  subjectRole: z.string(),
                }),
              ),
              title: z.string(),
              value: z.number(),
            }),
          ),
        }),
      ),
      sectionId: z.string(),
      title: z.string(),
    }),
  ),
});

export type FlatIndexFile = z.infer<typeof FlatIndexFile>;
