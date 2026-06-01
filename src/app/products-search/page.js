"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ProductSearch() {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const product_data = [
    {
      name: "iPhone 15 Pro Max 256GB",
      price: 134900,
      rating: 4.3,
      platform: "amazon.in",
      comments: 89,
      users: 45,
      active_minutes_ago: 2,
    },
    {
      name: "Samsung Galaxy S24 Ultra",
      price: 129999,
      rating: 4.5,
      platform: "flipkart.com",
      comments: 67,
      users: 32,
      active_minutes_ago: 5,
    },
    {
      name: "MacBook Pro M3 14-inch",
      price: 169900,
      rating: 4.7,
      platform: "amazon.in",
      comments: 124,
      users: 78,
      active_minutes_ago: 10,
    },
    {
      name: "AirPods Pro (2nd Gen)",
      price: 24900,
      rating: 4.4,
      platform: "flipkart.com",
      comments: 156,
      users: 89,
      active_minutes_ago: 15,
    },
  ];

  const product_categories = [
    {
      id: 1,
      name: "Smartphones",
      discussed_times: 234,
      logo: "https://images.samsung.com/is/image/samsung/p6pim/in/smartphones/galaxy-s23-ultra/s23-ultra-5g-black-select-256gb-1-1.jpg",
    },
    {
      id: 2,
      name: "Laptops",
      discussed_times: 234,
      logo: "https://images.samsung.com/is/image/samsung/p6pim/in/laptops/galaxybook-pro-14-2023/sbp14-2023-1-1.jpg",
    },
    {
      id: 3,
      name: "Audio",
      discussed_times: 234,
      logo: "https://images.samsung.com/is/image/samsung/p6pim/in/audio/galaxy-buds-pro-4/galaxy-buds-pro-4-1-1.jpg",
    },
    {
      id: 4,
      name: "Gaming",
      discussed_times: 234,
      logo: "https://images.samsung.com/is/image/samsung/p6pim/in/gaming/galaxy-controller-s4/galaxy-controller-s4-1-1.jpg",
    },
  ];

  // 🔥 MAIN FUNCTION (future backend connect point)
  async function handleSearch() {
    if (!url) return;

    setLoading(true);

    try {
      const res = await fetch("/api/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();

      if (data?.slug) {
        router.push(`/product/${data.slug}`);
      }
    } catch (err) {
      console.error("Search failed:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* HEADER */}
      <header className="flex bg-black p-4 items-center border-b border-gray-700">
        <Link href="/tabs/categories" className="font-semibold p-4">
          ← Back to forum
        </Link>

        <div className="text-2xl ml-4">Product Search</div>

        <div className="bg-orange-500 w-max rounded-xl text-xs p-1 ml-4 text-center">
          Amazon & Flipkart
        </div>
      </header>

      {/* SEARCH SECTION */}
      <div className="flex flex-col mt-24 items-center">
        <div className="bg-[#072a5f] p-6 rounded-lg w-full max-w-4xl">
          <div className="text-white text-4xl">
            Find Product Comments
          </div>

          <div className="text-gray-300 text-lg mt-6">
            Paste any Amazon or Flipkart product link
          </div>

          <div className="flex mt-10 gap-4">
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="text-white border text-lg w-full h-12 rounded-lg p-3 bg-black"
              placeholder="Paste Amazon or Flipkart Product URL..."
            />

            <button
              onClick={handleSearch}
              className="bg-amber-600 px-6 py-2 text-lg font-bold rounded"
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>

          <ul className="p-4 text-gray-300 list-disc text-sm mt-6">
            <li>Supports Amazon.in and Flipkart.com product links</li>
            <li>If no comments exist, a new section will be created</li>
            <li>Same link = same discussion page</li>
          </ul>
        </div>

        {/* RECENT DISCUSSIONS */}
        <div className="w-full max-w-6xl mt-12">
          <div className="text-3xl p-4">Recent Product Discussions</div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {product_data.map((each, index) => (
              <div key={index} className="p-6 bg-emerald-800 rounded">
                <div className="text-xl font-semibold">{each.name}</div>
                <div className="text-sm text-gray-200">
                  {each.platform}
                </div>

                <div className="mt-2 text-green-300">
                  ₹{each.price.toLocaleString()}
                </div>

                <div className="text-yellow-200">
                  ⭐ {each.rating}
                </div>

                <div className="mt-2 text-sm">
                  {each.comments} comments • {each.users} users
                </div>

                <div className="text-xs text-gray-300">
                  Active {each.active_minutes_ago} min ago
                </div>

                <Link
                  href={`/product/demo-${index}`}
                  className="mt-4 inline-block bg-orange-600 px-3 py-1 rounded"
                >
                  View Comments
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* CATEGORIES */}
        <div className="bg-[#1F2937] p-6 rounded-lg mt-12 w-full max-w-6xl">
          <div className="text-4xl">Popular Product Categories</div>
          <div className="text-gray-400 text-lg">
            Most discussed product types
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
            {product_categories.map((each) => (
              <div key={each.id} className="text-center">
                <img
                  src={each.logo}
                  alt={each.name}
                  className="w-24 h-24 mx-auto rounded"
                />

                <div className="bg-[#374151] p-2 rounded mt-2">
                  {each.name}
                </div>

                <div className="bg-[#374151] p-2 rounded mt-2">
                  {each.discussed_times} discussions
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}