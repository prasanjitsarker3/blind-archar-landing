import { BottomTabNav } from "@/components/layout/bottom-tab-nav";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

type PublicShellProps = {
  children: React.ReactNode;
};

export function PublicShell({ children }: PublicShellProps) {
  return (
    <div className="flex min-h-dvh flex-col bg-[var(--background)] text-[var(--foreground)]">
      <div className="">
        <Navbar />
      </div>
      <main className="flex-1 pb-24 md:pb-0">{children}</main>
      <div className="hidden md:block">
        <Footer />
      </div>
      <BottomTabNav />
    </div>
  );
}
