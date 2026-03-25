"use client";

import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(
        "https://forums-backend-production-b81e.up.railway.app/auth/me",
        { credentials: "include" }
      );

      if (!res.ok) {
        window.location.href = "/authenticate/login";
        return;
      }

      const data = await res.json();
      setUser(data.user);
      setName(data.user.name);
      setLoading(false);
    };

    fetchUser();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const res = await fetch(
      "https://forums-backend-production-b81e.up.railway.app/auth/update",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ name }),
      }
    );

    if (res.ok) {
      alert("Profile updated!");
    } else {
      alert("Update failed");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-5">Your Profile</h1>

      <form onSubmit={handleUpdate} className="flex flex-col gap-4">
        
        <input
          type="email"
          value={user.email}
          disabled
          className="border p-2 bg-gray-100"
        />

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2"
        />

        <button className="bg-blue-500 text-white p-2 rounded">
          Update Profile
        </button>
      </form>
    </div>
  );
}