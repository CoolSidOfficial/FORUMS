"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function useAuth() {

  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const checkAuth = async () => {

      try {

        const res = await fetch("https://forums-backend-production-b81e.up.railway.app/auth/verify", {
          credentials: "include" 
        });

        if (!res.ok) {
          router.push("https://forums-self.vercel.app/authenticate/login");
          return;
        }

        const data = await res.json();

        setUser(data.user);

      } catch (err) {

        router.push("https://forums-self.vercel.app/authenticate/login");

      } finally {

        setLoading(false);

      }

    };

    checkAuth();

  }, [router]);

  return { user, loading };
}