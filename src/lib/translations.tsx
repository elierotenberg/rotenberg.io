export const translations = {
  blog: {
    publishedOn: {
      en: (date: Date) => `Published on ${date.toLocaleDateString(`en-US`)}`,
      fr: (date: Date) => `Publié le ${date.toLocaleDateString(`fr-FR`)}`,
    },
  },
} as const;
