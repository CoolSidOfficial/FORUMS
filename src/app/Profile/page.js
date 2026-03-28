"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/app/store/authStore";

export default function ProfilePage() {
  const user = useAuthStore((s) => s.user);
  const loading = useAuthStore((s) => s.loading);
  const setUser = useAuthStore((s) => s.setUser);

  const [name, setName] = useState(user?.name || "");
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const router = useRouter();

  if (!loading && !user) {
    router.push("/authenticate/login");
    return null;
  }

  if (loading || !user) {
    return <div className="text-center mt-10 text-white">Loading...</div>;
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name.trim()) {
      setError("Name cannot be empty.");
      return;
    }

    setUpdating(true);

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        "https://forums-backend-production-b81e.up.railway.app/auth/update-profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name }),
        }
      );

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || "Update failed.");
        return;
      }

      const data = await res.json();

      // Updates Zustand → navbar reflects new name instantly
      setUser({ ...user, name: data.user?.name || name });
      setSuccess("Profile updated ✅");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 border border-[#0a3592] rounded-lg shadow font-mono">
      <h1 className="text-2xl font-bold mb-5 text-center text-[#286cc5]">
        Your Profile
      </h1>

      <form onSubmit={handleUpdate} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm mb-1 text-gray-400">Email</label>
          <input
            type="email"
            value={user.email}
            disabled
            className="border p-2 w-full bg-gray-800 text-gray-400 rounded cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block text-sm mb-1 text-gray-300">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-600 p-2 w-full rounded bg-[#14274E] text-white focus:outline-none focus:border-[#286cc5]"
          />
        </div>

        {error && <p className="text-red-400 text-sm">{error}</p>}
        {success && <p className="text-green-400 text-sm">{success}</p>}

        <button
          type="submit"
          disabled={updating}
          className="bg-[#2563EB] text-white p-2 rounded hover:bg-blue-700 disabled:opacity-50 transition"
        >
          {updating ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
}