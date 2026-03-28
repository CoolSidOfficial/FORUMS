"use client";

import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // 🔥 Fake API simulation
  useEffect(() => {
    setTimeout(() => {
      const fakeUser = {
        name: "John Doe",
        email: "john@example.com",
      };

      setUser(fakeUser);
      setName(fakeUser.name);
      setLoading(false);
    }, 500);
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Name cannot be empty");
      return;
    }

    setUpdating(true);

    // simulate API delay
    setTimeout(() => {
      setUser((prev) => ({ ...prev, name }));
      setUpdating(false);
      alert("Profile updated (fake) ✅");
    }, 800);
  };

  if (loading || !user) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-md mx-auto mt-10 p-5 border rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-5 text-center">Your Profile</h1>

      <form onSubmit={handleUpdate} className="flex flex-col gap-4">

        <div>
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            value={user.email}
            disabled
            className="border p-2 w-full bg-gray-100 rounded"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 w-full rounded"
          />
        </div>

        <button
          disabled={updating}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {updating ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
}