import { notFound } from "next/navigation";
import { hasLocale, getDictionary, type Locale } from "../../dictionaries";
import ProjectDetail from "./project-detail";
import en from "../../../../dictionaries/en.json";

export function generateStaticParams() {
  return en.work.projects.flatMap((project) =>
    (["es", "en"] as const).map((lang) => ({ lang, slug: project.slug }))
  );
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang as Locale);
  const projects = dict.work.projects as any[];
  const projectIndex = projects.findIndex((p: any) => p.slug === slug);

  if (projectIndex === -1) notFound();

  const project = projects[projectIndex];
  const nextProject = projects[(projectIndex + 1) % projects.length];

  return (
    <ProjectDetail
      dict={dict as any}
      lang={lang}
      project={project}
      nextProject={nextProject}
    />
  );
}
