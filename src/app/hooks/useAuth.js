"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setLoading(false);
          router.push("/authenticate/login");
          return;
        }

        const res = await fetch(
          "https://forums-backend-production-b81e.up.railway.app/auth/verify",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          setLoading(false);
          router.push("/authenticate/login");
          return;
        }

        const data = await res.json();
        setUser(data.user);
      } catch (err) {
        router.push("/authenticate/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  return { user, loading };
}