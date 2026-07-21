import type { ReactNode } from "react";
import { Navigate } from "react-router";
import { isSessionActive } from "../model/session";

interface RequireAuthProps {
  children: ReactNode;
}

export function RequireAuth({ children }: RequireAuthProps) {
  if (!isSessionActive()) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}