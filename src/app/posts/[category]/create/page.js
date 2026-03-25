"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

export default function CreatePostPage() {
  const router = useRouter();
  const { category } = useParams(); // ✅ DO NOT use ({ params })

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch(
      `https://forums-backend-production-b81e.up.railway.app/api/posts/${category}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          author,
          content,
        }),
      }
    );

    if (!res.ok) {
      throw new Error("Failed to create post");
    }

    alert("Post created");

    router.push(`/posts/${category}`);
  } catch (err) {
    console.error(err);
    alert("Error creating post");
  }
};
  return (
    <div className="max-w-2xl mx-auto p-8">
      <Link
        href={`/posts/${category}`}   
        className="text-gray-400 hover:text-white mb-6 inline-block"
      >
        ← Back to Posts
      </Link>

      <h1 className="text-3xl font-bold mb-8 capitalize">
        Create Post in {category}
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <input
          type="text"
          placeholder="Title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-3 rounded-lg bg-[#0f172a] border border-gray-700"
        />

        <input
          type="text"
          placeholder="Author"
          required
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="p-3 rounded-lg bg-[#0f172a] border border-gray-700"
        />

        <textarea
          rows="6"
          placeholder="Content..."
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="p-3 rounded-lg bg-[#0f172a] border border-gray-700"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Publish Post
        </button>
      </form>
    </div>
  );
}