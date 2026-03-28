"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/app/store/authStore";

export default function AuthInit({ children }) {
  const checkAuth = useAuthStore((s) => s.checkAuth);
  const loading = useAuthStore((s) => s.loading);

  useEffect(() => {
    checkAuth();
  }, []);

  if (loading) return null;

  return children;
}