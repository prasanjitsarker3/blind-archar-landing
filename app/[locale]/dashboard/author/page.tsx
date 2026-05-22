import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { AuthorProfileSection } from "@/components/AuthorComponents/author-profile-section";
import { AuthorPostsPanel } from "@/components/AuthorComponents/author-posts-panel";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "dashboard.author" });
  return { title: t("title") };
}

export default async function AuthorDashboardLocalePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "dashboard.author" });

  return (
    <div className="space-y-6">
      <AuthorProfileSection />
      <AuthorPostsPanel />
    </div>
  );
}
