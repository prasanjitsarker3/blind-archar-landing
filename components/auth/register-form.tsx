"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

import Cookies from "js-cookie";

import {
  registerSchema,
  type RegisterFormValues,
} from "@/lib/validations/auth";
import { useRegisterMutation } from "@/store/api/auth.api";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, USER_KEY } from "@/store/api/base-query";
import { ACCESS_COOKIE_OPTIONS, REFRESH_COOKIE_OPTIONS } from "@/store/api/auth.api";
import { useAppDispatch } from "@/store/hooks";
import { setCredentials } from "@/store/slices/auth.slice";
import { getDashboardPath } from "@/lib/auth-redirect";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type Props = { locale?: string };

export function RegisterForm({ locale: localeProp }: Props) {
  const t = useTranslations("auth.register");
  const router = useRouter();
  const localeFromHook = useLocale();
  const locale = localeProp ?? localeFromHook;
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [register, { isLoading }] = useRegisterMutation();

  const {
    register: formRegister,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (values: RegisterFormValues) => {
    try {
      const result = await register({
        name: values.name,
        email: values.email,
        password: values.password,
      }).unwrap();
      Cookies.set(ACCESS_TOKEN_KEY, result.accessToken, ACCESS_COOKIE_OPTIONS);
      Cookies.set(REFRESH_TOKEN_KEY, result.refreshToken, REFRESH_COOKIE_OPTIONS);
      Cookies.set(USER_KEY, JSON.stringify(result.user), REFRESH_COOKIE_OPTIONS);
      dispatch(setCredentials({ user: result.user, accessToken: result.accessToken }));
      router.push(getDashboardPath(locale, result.user.role));
    } catch {
      setError("root", { message: "Registration failed. Please try again." });
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-4"
    >
      {/* Name */}
      <div className="space-y-1.5">
        <label htmlFor="name" className="text-sm font-medium text-foreground">
          {t("name")}
        </label>
        <Input
          id="name"
          type="text"
          autoComplete="name"
          placeholder={t("namePlaceholder")}
          aria-describedby={errors.name ? "name-error" : undefined}
          className={cn(
            errors.name && "border-destructive focus-visible:ring-destructive",
          )}
          {...formRegister("name")}
        />
        {errors.name && (
          <p id="name-error" className="text-xs text-destructive">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-1.5">
        <label htmlFor="email" className="text-sm font-medium text-foreground">
          {t("email")}
        </label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          placeholder={t("emailPlaceholder")}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={cn(
            errors.email && "border-destructive focus-visible:ring-destructive",
          )}
          {...formRegister("email")}
        />
        {errors.email && (
          <p id="email-error" className="text-xs text-destructive">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Password */}
      <div className="space-y-1.5">
        <label
          htmlFor="password"
          className="text-sm font-medium text-foreground"
        >
          {t("password")}
        </label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            placeholder={t("passwordPlaceholder")}
            aria-describedby={errors.password ? "password-error" : undefined}
            className={cn(
              "pr-10",
              errors.password &&
                "border-destructive focus-visible:ring-destructive",
            )}
            {...formRegister("password")}
          />
          <button
            type="button"
            onClick={() => setShowPassword((p) => !p)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
        {errors.password && (
          <p id="password-error" className="text-xs text-destructive">
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Confirm Password */}
      <div className="space-y-1.5">
        <label
          htmlFor="confirmPassword"
          className="text-sm font-medium text-foreground"
        >
          {t("confirmPassword")}
        </label>
        <div className="relative">
          <Input
            id="confirmPassword"
            type={showConfirm ? "text" : "password"}
            autoComplete="new-password"
            placeholder={t("confirmPasswordPlaceholder")}
            aria-describedby={
              errors.confirmPassword ? "confirm-error" : undefined
            }
            className={cn(
              "pr-10",
              errors.confirmPassword &&
                "border-destructive focus-visible:ring-destructive",
            )}
            {...formRegister("confirmPassword")}
          />
          <button
            type="button"
            onClick={() => setShowConfirm((p) => !p)}
            aria-label={showConfirm ? "Hide password" : "Show password"}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {showConfirm ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
        {errors.confirmPassword && (
          <p id="confirm-error" className="text-xs text-destructive">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      {/* Root / server error */}
      {errors.root && (
        <motion.p
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive"
        >
          {errors.root.message}
        </motion.p>
      )}

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {t("submitting")}
          </>
        ) : (
          t("submit")
        )}
      </Button>
    </motion.form>
  );
}
