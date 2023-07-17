export const translations = {
  blog: {
    publishedOn: {
      fr: (date: Date) => `Publié le ${date.toLocaleDateString(`fr-FR`)}`,
      en: (date: Date) => `Published on ${date.toLocaleDateString(`en-US`)}`,
    },
  },
} as const;
