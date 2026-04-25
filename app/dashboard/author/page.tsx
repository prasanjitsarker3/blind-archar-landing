import { AuthorPostsPanel } from "@/components/AuthorComponents/author-posts-panel";
import { AuthorProfileSection } from "@/components/AuthorComponents/author-profile-section";

export default function AuthorDashboardPage() {
  return (
    <div className="space-y-6">
      <AuthorProfileSection />
      <AuthorPostsPanel />
    </div>
  );
}
