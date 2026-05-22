import { getTranslations, setRequestLocale } from "next-intl/server";
import { DashboardShell } from "@/components/layout/dashboard-shell";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function AdminLocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "dashboard.admin" });

  return <DashboardShell title={t("title")}>{children}</DashboardShell>;
}
