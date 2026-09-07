import { notFound } from "next/navigation";
import { projects } from "../../data/projects";
import { ProjectArticle } from "./ProjectArticle";

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!projects.some((project) => project.slug === slug)) {
    notFound();
  }

  // The article renders on the client because every string in it is language dependent.
  return <ProjectArticle slug={slug} />;
}
