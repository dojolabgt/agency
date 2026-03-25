import { locales, type Locale } from "./dictionaries";

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

// Segment layout — html/body are handled by app/layout.tsx
export default async function LangLayout({
  children,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}) {
  return <>{children}</>;
}
