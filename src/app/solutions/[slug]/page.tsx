import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SOLUTIONS_LIST_DATA } from "@/data/solutions/solutionsData";
import { SolutionPlaceholder } from "@/components/Solutions/Pages/Placeholder/SolutionPlaceholder";
import { AiSolutionsPage } from "@/components/Solutions/Pages/AiSolutions/AiSolutionsPage";

type SolutionPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return SOLUTIONS_LIST_DATA.map((solution) => ({ slug: solution.id }));
}

export async function generateMetadata({ params }: SolutionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const solution = SOLUTIONS_LIST_DATA.find((item) => item.id === slug);

  if (!solution) {
    return { title: "Solution not found" };
  }

  return {
    title: solution.title,
    description: solution.description,
    alternates: {
      canonical: `/solutions/${solution.id}`,
    },
  };
}

export default async function SolutionPage({ params }: SolutionPageProps) {
  const { slug } = await params;
  const solution = SOLUTIONS_LIST_DATA.find((item) => item.id === slug);

  if (!solution) {
    notFound();
  }

  if (slug === "ai-solutions") {
    return <AiSolutionsPage />;
  }

  // Fallback for solutions that don't have a specific page built yet
  return <SolutionPlaceholder solution={solution} />;
}
