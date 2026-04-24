import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-[color-mix(in_oklab,var(--muted),white_20%)] dark:bg-[color-mix(in_oklab,var(--muted),black_10%)]",
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
