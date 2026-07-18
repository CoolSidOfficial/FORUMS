"use client";

import { useEffect, useState } from "react";

const API = "https://forums-backend-production-b81e.up.railway.app";

export default function CommentSection({ postId }) {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // Reply state
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyContent, setReplyContent] = useState("");
  const [replyLoading, setReplyLoading] = useState(false);

  const fetchComments = async () => {
    try {
      const res = await fetch(
        `${API}/api/posts/${postId}/comments`,
        {
          cache: "no-store",
        }
      );

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

  // New Comment
  const handleComment = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first.");
      return;
    }

    if (!content.trim()) {
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

      if (!res.ok) {
        throw new Error("Failed to comment");
      }

      setContent("");
      fetchComments();
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Reply
  const handleReply = async (commentId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first.");
      return;
    }

    if (!replyContent.trim()) {
      return;
    }

    try {
      setReplyLoading(true);

      const res = await fetch(
        `${API}/api/comments/${commentId}/replies`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            content: replyContent,
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to reply");
      }

      setReplyContent("");
      setReplyingTo(null);

      fetchComments();
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setReplyLoading(false);
    }
  };

  return (
    <div className="mt-10">

      <h2 className="text-2xl font-semibold mb-6">
        Comments ({comments.length})
      </h2>

      {/* New Comment */}

      <textarea
        rows={4}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write a comment..."
        className="w-full rounded-lg border border-gray-700 bg-[#0f172a] p-3"
      />

      <button
        onClick={handleComment}
        disabled={loading}
        className="mt-4 rounded-lg bg-blue-600 px-5 py-2"
      >
        {loading ? "Posting..." : "Post Comment"}
      </button>

      {/* Comments */}

      <div className="mt-8">

        {fetching ? (
          <p>Loading...</p>
        ) : comments.length === 0 ? (
          <p className="text-gray-500">
            No comments yet.
          </p>
        ) : (
          <div className="space-y-6">

            {comments.map((comment) => (

              <div
                key={comment._id}
                className="rounded-lg border border-gray-700 p-4"
              >

                <div className="flex justify-between">

                  <h3 className="font-semibold">
                    {comment.author}
                  </h3>

                  <span className="text-sm text-gray-500">
                    {new Date(
                      comment.createdAt
                    ).toLocaleDateString()}
                  </span>

                </div>

                <p className="mt-3 whitespace-pre-wrap">
                  {comment.content}
                </p>

                {/* Reply Button */}

                <button
                  onClick={() =>
                    setReplyingTo(
                      replyingTo === comment._id
                        ? null
                        : comment._id
                    )
                  }
                  className="mt-3 text-blue-400 hover:underline"
                >
                  Reply
                </button>

                {/* Reply Box */}

                {replyingTo === comment._id && (
                  <div className="mt-4">

                    <textarea
                      rows={3}
                      value={replyContent}
                      onChange={(e) =>
                        setReplyContent(
                          e.target.value
                        )
                      }
                      placeholder="Write a reply..."
                      className="w-full rounded-lg border border-gray-700 bg-[#0f172a] p-3"
                    />

                    <button
                      onClick={() =>
                        handleReply(comment._id)
                      }
                      disabled={replyLoading}
                      className="mt-3 rounded-lg bg-green-600 px-4 py-2"
                    >
                      {replyLoading
                        ? "Replying..."
                        : "Send Reply"}
                    </button>

                  </div>
                )}

                {/* Replies */}

                {comment.replies &&
                  comment.replies.length > 0 && (

                    <div className="mt-6 ml-8 border-l border-gray-700 pl-5 space-y-4">

                      {comment.replies.map((reply) => (

                        <div key={reply._id}>

                          <div className="flex justify-between">

                            <h4 className="font-medium">
                              {reply.author}
                            </h4>

                            <span className="text-xs text-gray-500">
                              {new Date(
                                reply.createdAt
                              ).toLocaleDateString()}
                            </span>

                          </div>

                          <p className="mt-2 whitespace-pre-wrap text-gray-300">
                            {reply.content}
                          </p>

                        </div>

                      ))}

                    </div>

                  )}

              </div>

            ))}

          </div>
        )}

      </div>

    </div>
  );
}