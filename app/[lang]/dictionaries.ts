import "server-only";

const dictionaries = {
  es: () =>
    import("../../dictionaries/es.json").then((mod) => mod.default),
  en: () =>
    import("../../dictionaries/en.json").then((mod) => mod.default),
};

export type Locale = keyof typeof dictionaries;

export const locales: Locale[] = ["es", "en"];
export const defaultLocale: Locale = "es";

export const hasLocale = (locale: string): locale is Locale =>
  locale in dictionaries;

export const getDictionary = async (locale: Locale) =>
  dictionaries[locale]();
