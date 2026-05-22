import type { UserRole } from "@/store/slices/auth.slice";

export function getDashboardPath(locale: string, role: UserRole): string {
  switch (role) {
    case "ADMIN":
      return `/${locale}/dashboard/admin`;
    case "AUTHOR":
      return `/${locale}/dashboard/author`;
    default:
      return `/${locale}`;
  }
}
