import { setRequestLocale } from "next-intl/server";
import { PublicShell } from "@/components/layout/public-shell";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function PublicLocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <PublicShell>{children}</PublicShell>;
}
