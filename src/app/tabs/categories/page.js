import Link from "next/link";

function Categories() {
  const cat_data = [
    { icon: "/icons/smartphone.png", text: "Smartphones", posts: "1", members: "1", link: "/posts/smartphones" },
    { icon: "/icons/laptop.png", text: "Laptops", posts: "1", members: "1", link: "/posts/laptops" },
    { icon: "/icons/console.png", text: "Gaming", posts: "1", members: "2", link: "/posts/gaming" },
    { icon: "/icons/audio.png", text: "Audio", posts: "1", members: "1", link: "/posts/audio" },
    { icon: "/icons/af.png", text: "Air Purifiers", posts: "11", members: "1", link: "/posts/air-purifiers" },
    { icon: "/icons/television.png", text: "Televisions", posts: "11", members: "1", link: "/posts/television" },
  ];

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {cat_data.map((each, index) => (
          <Link
            href={each.link}
            key={index}
            className="bg-[#1F2937] text-white p-6 rounded-xl flex flex-col gap-3 hover:bg-[#263548] hover:border hover:border-[#286cc5] border border-transparent transition-all duration-200"
          >
            <div className="flex items-center gap-3">
              <img src={each.icon} width={36} height={36} alt={each.text} />
              <span className="text-xl font-semibold">{each.text}</span>
            </div>

            <p className="text-gray-400 text-sm">
              Discuss {each.text} and get expert advice
            </p>

            <div className="flex items-center gap-4 text-sm text-gray-500 mt-auto pt-2 border-t border-gray-700">
              <span>📝 {each.posts} Posts</span>
              <span>👥 {each.members} Members</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Categories;