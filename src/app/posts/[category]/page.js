import Link from "next/link";
import posts from "./sample";

export default async function PostsByCategory({ params }) {
  const { category } = await params;

  const filteredPosts = posts.filter(
    (post) => post.category === category
  );

  return (
    <div className="max-w-4xl mx-auto p-8">

      <div className="flex justify-between items-center mb-10">

        <Link
          href="/tabs/categories"
          className="text-gray-400 hover:text-white transition"
        >
          ← Back to Categories
        </Link>

        <Link
          href={`/posts/${category}/create`}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Create Post
        </Link>

      </div>

      <h1 className="text-3xl font-bold text-center capitalize mb-12">
        {category} Posts
      </h1>

      <div className="flex flex-col gap-6">

        {filteredPosts.map((post) => (
          <div
            key={post._id}
            className="border border-gray-700 rounded-xl p-6 hover:shadow-lg transition"
          >
            <h2 className="text-2xl font-semibold mb-3">
              {post.title}
            </h2>

            <p className="text-gray-400 text-sm mb-4">
              By {post.author} •{" "}
              {new Date(post.createdAt).toLocaleDateString()}
            </p>

            <p className="text-gray-300 mb-4">
              {post.content.slice(0, 140)}...
            </p>

            <Link
              href={`/posts/view/${post._id}`}
              className="text-blue-500 hover:text-blue-400 transition"
            >
              Read more →
            </Link>
          </div>
        ))}

      </div>
    </div>
  );
}