import posts from "../sample";
import Link from "next/link";

export default async function PostPage({ params }) {
  const { id, category } = await params;

  const post = posts.find((p) => p._id === id);

  if (!post) {
    return <div className="p-10 text-center">Post not found</div>;
  }

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

        <p className="text-gray-300 leading-relaxed">
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

        {/* Example comments */}
        <div className="mt-6 space-y-4">

          <div className="border border-gray-700 rounded-lg p-4">
            <p className="text-sm text-gray-400 mb-1">
              Rahul • 2 hours ago
            </p>
            <p>This was really helpful!</p>
          </div>

        </div>

      </div>

    </div>
  );
}