import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

type PublicShellProps = {
  children: React.ReactNode;
};

export function PublicShell({ children }: PublicShellProps) {
  return (
    <div className="min-h-dvh bg-[var(--background)] text-[var(--foreground)]">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
