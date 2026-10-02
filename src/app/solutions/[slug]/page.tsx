import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SOLUTIONS_LIST_DATA } from "@/data/solutions/solutionsData";
import { SolutionPlaceholder } from "@/components/Solutions/Pages/Placeholder/SolutionPlaceholder";
import { AiSolutionsPage } from "@/components/Solutions/Pages/AiSolutions/AiSolutionsPage";
import { WebApplicationsPage } from "@/components/Solutions/Pages/WebApplications/WebApplicationsPage";
import { MobileApplicationsPage } from "@/components/Solutions/Pages/MobileApplications/MobileApplicationsPage";
import { CloudInfrastructurePage } from "@/components/Solutions/Pages/CloudInfrastructure/CloudInfrastructurePage";
import { EnterpriseSolutionsPage } from "@/components/Solutions/Pages/EnterpriseSolutions/EnterpriseSolutionsPage";
import { CustomSoftwarePage } from "@/components/Solutions/Pages/CustomSoftware/CustomSoftwarePage";

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

  if (slug === "web-applications") {
    return {
      title: "Web Applications",
      description:
        "Infinium Softech designs and builds responsive, secure web applications and business platforms around real workflows.",
      alternates: {
        canonical: "/solutions/web-applications",
      },
    };
  }

  if (slug === "mobile-applications") {
    return {
      title: "Mobile Applications",
      description:
        "Infinium Softech designs and builds native and cross-platform mobile apps for customers, teams, and field operations.",
      alternates: {
        canonical: "/solutions/mobile-applications",
      },
    };
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

  if (slug === "web-applications") {
    return <WebApplicationsPage />;
  }

  if (slug === "mobile-applications") {
    return <MobileApplicationsPage />;
  }

  if (slug === "cloud-infrastructure") {
    return <CloudInfrastructurePage />;
  }

  if (slug === "enterprise-systems") {
    return <EnterpriseSolutionsPage />;
  }

  if (slug === "custom-software") {
    return <CustomSoftwarePage />;
  }

  // Fallback for solutions that don't have a specific page built yet
  return <SolutionPlaceholder solution={solution} />;
}
