import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as "en" | "bn")) {
    locale = routing.defaultLocale;
  }

  // Explicit static imports — bundler (webpack/turbopack) cannot statically
  // analyze template-literal dynamic imports, causing an empty module at runtime.
  const messages =
    locale === "bn"
      ? (await import("../messages/bn.json")).default
      : (await import("../messages/en.json")).default;

  return { locale, messages };
});
