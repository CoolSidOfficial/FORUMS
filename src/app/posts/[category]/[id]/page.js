import Link from "next/link";

export default async function PostPage({ params }) {
  const { id, category } = await params;

  const res = await fetch(
    `https://forums-backend-production-b81e.up.railway.app/api/posts/post/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return (
      <div className="p-10 text-center">
        Post not found
      </div>
    );
  }

  const post = await res.json();

  return (
    <div className="max-w-3xl mx-auto p-8">

      <Link
        href={`/posts/${category}`}
        className="text-gray-400 hover:text-white"
      >
        ← Back to Posts
      </Link>


      {/* POST */}
      <div className="mt-6 border border-gray-700 rounded-xl p-6">

        <h1 className="text-3xl font-bold mb-4">
          {post.title}
        </h1>


        <p className="text-gray-400 text-sm mb-6">
          By {post.author} •{" "}
          {new Date(post.createdAt).toLocaleDateString()}
        </p>


        <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
          {post.content}
        </p>

      </div>


      {/* COMMENTS */}
      <div className="mt-10">

        <h2 className="text-2xl font-semibold mb-4">
          Comments
        </h2>


        <textarea
          placeholder="Write a comment..."
          className="w-full border border-gray-700 rounded-lg p-3 mb-4 bg-transparent"
        />


        <button className="bg-blue-600 px-4 py-2 rounded-lg">
          Post Comment
        </button>


        <div className="mt-6">
          <p className="text-gray-500">
            No comments yet. Be the first to comment!
          </p>
        </div>


      </div>

    </div>
  );
}