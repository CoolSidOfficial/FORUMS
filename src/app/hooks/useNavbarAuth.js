"use client";

import { useEffect, useState } from "react";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setUser(null);
          setLoading(false);
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
          setUser(null);
          setLoading(false);
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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <nav>
      {user ? (
        <p>Welcome, {user.name}</p>
      ) : (
        <a href="/authenticate/login">Login</a>
      )}
    </nav>
  );
}