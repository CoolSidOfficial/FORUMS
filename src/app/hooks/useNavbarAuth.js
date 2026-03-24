"use client";

import { useEffect, useState } from "react";

export default function useNavbarAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(
          "https://forums-backend-production-b81e.up.railway.app/auth/verify",
          { credentials: "include" }
        );

        if (!res.ok) {
          setUser(null); 
          return;
        }

        const data = await res.json();
        setUser(data.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return { user, loading };
}