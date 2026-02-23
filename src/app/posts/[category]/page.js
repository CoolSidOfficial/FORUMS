import Link from "next/link";
// Dummy Data
const samplePosts = [
  {
    _id: "1",
    title: "Best Budget Smartphone 2026",
    author: "Siddhant",
    createdAt: "2026-02-20",
    content:
      "This is a detailed review of the best budget smartphone available in 2026 with amazing performance and battery life.",
  },
  {
    _id: "2",
    title: "Top 5 Flagship Phones Compared",
    author: "Admin",
    createdAt: "2026-02-18",
    content:
      "We compare the top 5 flagship smartphones based on performance, camera quality, and battery efficiency.",
  },
  {
    _id: "3",
    title: "Is Foldable Worth It?",
    author: "TechGuy",
    createdAt: "2026-02-15",
    content:
      "Foldable phones are evolving rapidly. Let’s explore whether they are worth your investment in 2026.",
  },
];

export default function PostsByCategory({ params }) {
  return (
    <div className="max-w-4xl mx-auto p-8">
  

      {/* Top Navigation */}
      <div className="flex justify-between items-center mb-10">

        {/* Left Side - Back Button */}
        <Link
          href="/tabs/categories"
          className="text-gray-400 hover:text-white transition"
        >
          ← Back to Categories
        </Link>

        {/* Right Side - Create Button */}
       <div className="flex justify-end mb-6">

</div>
      </div>

      {/* Page Title */}
      <h1 className="text-3xl font-bold text-center capitalize mb-12">
        {params.category} Posts
      </h1>

      {/* Posts Column */}
      <div className="flex flex-col p-2  ">   {/* 🔥 increased spacing */}

        {samplePosts.map((post) => (
          <div
            key={post._id}
            className="border mt-2 border-gray-700 rounded-xl p-6 hover:shadow-lg transition"
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