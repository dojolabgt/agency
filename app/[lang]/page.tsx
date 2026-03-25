import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "./dictionaries";
import Hero from "./hero";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  return <Hero dict={dict} lang={lang} />;
}
