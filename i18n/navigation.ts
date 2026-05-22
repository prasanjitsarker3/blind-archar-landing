// Locale-aware navigation utilities generated from routing config.
// Use these instead of next/link and next/navigation in locale-aware pages.

import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
