"use client";

import { useEffect, useState } from "react";

const API =
  "https://forums-backend-production-b81e.up.railway.app";

export default function CommentSection({ postId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

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
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-semibold mb-6">
        Comments ({comments.length})
      </h2>

      {loading ? (
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
              className="border border-gray-700 rounded-lg p-4"
            >
              <div className="flex items-center justify-between">
                <p className="font-semibold">
                  {comment.author}
                </p>

                <p className="text-xs text-gray-500">
                  {new Date(
                    comment.createdAt
                  ).toLocaleDateString()}
                </p>
              </div>

              <p className="mt-3 whitespace-pre-wrap text-gray-300">
                {comment.content}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}