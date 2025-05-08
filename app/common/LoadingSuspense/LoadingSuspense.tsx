"use client";
import { ReactNode, Suspense } from "react";
import DefaultLoading from "./DefaultLoading";
import DefaultError from "./DefaultError";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";

interface LoadingSuspenseProps {
  isLoading: boolean;
  isError?: boolean;
  loadingFallback?: ReactNode;
  errorFallback?: ReactNode;
  children: ReactNode;
}

export default function LoadingSuspense({
  isLoading,
  isError = false,
  loadingFallback = <DefaultLoading />,
  errorFallback = <DefaultError />,
  children,
}: LoadingSuspenseProps) {
  if (isLoading) return loadingFallback;
  else if (isError) return errorFallback;
  return (
    <ErrorBoundary fallback={errorFallback}>
      <Suspense fallback={loadingFallback}>{children}</Suspense>
    </ErrorBoundary>
  );
}
