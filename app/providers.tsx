"use client";

import { Provider } from "react-redux";
import { store } from "@/lib/store";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppRouterCacheProvider options={{ enableCssLayer: true }}>
        <Provider store={store}>{children}</Provider>
      </AppRouterCacheProvider>
    </>
  );
}
