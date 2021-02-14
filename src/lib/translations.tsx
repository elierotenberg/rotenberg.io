export const translations = {
  blog: {
    publishedOn: {
      fr: (date: Date) => `Publié le ${date.toLocaleDateString()}`,
      en: (date: Date) => `Published on ${date.toLocaleDateString()}`,
    },
  },
} as const;
