"use client";

import { useEffect, useRef } from "react";
import { Provider } from "react-redux";
import Cookies from "js-cookie";

import { makeStore, type AppStore } from "@/store";
import { ACCESS_TOKEN_KEY, USER_KEY } from "@/store/api/base-query";
import { setCredentials } from "@/store/slices/auth.slice";
import type { AuthUser } from "@/store/slices/auth.slice";

function AuthHydrator({ store }: { store: AppStore }) {
  useEffect(() => {
    const accessToken = Cookies.get(ACCESS_TOKEN_KEY);
    const rawUser = Cookies.get(USER_KEY);

    if (accessToken && rawUser) {
      try {
        const user: AuthUser = JSON.parse(rawUser);
        store.dispatch(setCredentials({ user, accessToken }));
      } catch {
        // cookie was corrupted — leave store unauthenticated
      }
    }
  }, [store]);

  return null;
}

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) storeRef.current = makeStore();

  return (
    <Provider store={storeRef.current}>
      <AuthHydrator store={storeRef.current} />
      {children}
    </Provider>
  );
}
