"use client";

import { useEffect, useState } from "react";

const API = "https://forums-backend-production-b81e.up.railway.app";

export default function CommentSection({ postId }) {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const fetchComments = async () => {
    try {
      const res = await fetch(
        `${API}/api/posts/${postId}/comments`,
        {
          cache: "no-store",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch comments");
      }

      const data = await res.json();
      setComments(data);
    } catch (err) {
      console.error(err);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const handleComment = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login to comment.");
      return;
    }

    if (!content.trim()) {
      alert("Please write a comment.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        `${API}/api/posts/${postId}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            content,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to post comment");
      }

      setContent("");

      // Reload comments
      fetchComments();

    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-semibold mb-6">
        Comments ({comments.length})
      </h2>

      {/* Comment Box */}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write a comment..."
        rows={4}
        className="w-full rounded-lg border border-gray-700 bg-[#0f172a] p-3 text-white outline-none focus:border-blue-500"
      />

      <button
        onClick={handleComment}
        disabled={loading}
        className="mt-4 rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Posting..." : "Post Comment"}
      </button>

      {/* Comments */}
      <div className="mt-8">
        {fetching ? (
          <p className="text-gray-500">
            Loading comments...
          </p>
        ) : comments.length === 0 ? (
          <p className="text-gray-500">
            No comments yet. Be the first to comment!
          </p>
        ) : (
          <div className="space-y-4">
            {comments.map((comment) => (
              <div
                key={comment._id}
                className="rounded-lg border border-gray-700 p-4"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">
                    {comment.author}
                  </h3>

                  <span className="text-sm text-gray-500">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <p className="mt-3 whitespace-pre-wrap text-gray-300">
                  {comment.content}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}