import Image from "next/image";
import { BookOpenText, Link as LinkIcon, Mail, MapPin } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const relatedBlogs = [
  {
    title: "The Future of Artificial Intelligence in Web Development",
    status: "Published",
    metrics: "2,847 views • 8 min read",
  },
  {
    title: "Building Scalable SaaS Products: Lessons Learned",
    status: "Published",
    metrics: "1,456 views • 10 min read",
  },
  {
    title: "Understanding Quantum Computing Basics",
    status: "Draft",
    metrics: "In editing • 12 min read",
  },
];

export function AuthorProfileSection() {
  return (
    <section className="grid gap-4 xl:grid-cols-[1.5fr_1fr]">
      <Card className="overflow-hidden">
        <div className="relative h-44 w-full">
          <Image
            src="/images/author-cover.svg"
            alt="Author cover image"
            fill
            className="object-cover"
            priority
          />
        </div>

        <CardContent className="space-y-4 p-5 sm:p-6">
          <div className="-mt-14 flex flex-wrap items-end justify-between gap-4">
            <div className="flex items-end gap-4">
              <div className="relative h-24 w-24 overflow-hidden rounded-2xl border-4 border-card bg-muted">
                <Image
                  src="/images/author-profile.svg"
                  alt="Author profile image"
                  fill
                  className="object-cover"
                />
              </div>

              <div>
                <h3 className="text-2xl font-(--font-brand) leading-tight">
                  Emma Wilson
                </h3>
                <p className="text-sm text-muted-foreground">
                  Technology and Product Writer
                </p>
              </div>
            </div>
            <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
              Verified Author
            </span>
          </div>

          <p className="text-sm text-muted-foreground">
            Writes practical and research-backed blog posts about product
            development, startup growth, and modern engineering workflows.
          </p>

          <div className="grid gap-3 sm:grid-cols-4">
            <ProfileStat label="Blogs" value="3" />
            <ProfileStat label="Published" value="2" />
            <ProfileStat label="Draft" value="1" />
            <ProfileStat label="Views" value="4,303" />
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <MetaInfo
              icon={<Mail className="h-4 w-4" />}
              label="Email"
              value="emma@blindarchar.com"
            />
            <MetaInfo
              icon={<MapPin className="h-4 w-4" />}
              label="Location"
              value="Berlin"
            />
            <MetaInfo
              icon={<LinkIcon className="h-4 w-4" />}
              label="Website"
              value="emmawrites.blog"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl font-(--font-brand)">
            <BookOpenText className="h-5 w-5" />
            Related Blogs
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {relatedBlogs.map((blog) => (
            <div
              key={blog.title}
              className="rounded-xl border border-border p-3"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-medium leading-tight">
                  {blog.title}
                </p>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                    blog.status === "Published"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {blog.status}
                </span>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                {blog.metrics}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
    </section>
  );
}

function ProfileStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-muted px-3 py-2 text-center">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 text-lg font-semibold">{value}</p>
    </div>
  );
}

function MetaInfo({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-border p-3">
      <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {icon}
        {label}
      </p>
      <p className="mt-2 text-sm font-medium leading-tight">{value}</p>
    </div>
  );
}
