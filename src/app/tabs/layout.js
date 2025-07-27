"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Header from "../components/Header";
export default function TabsLayout({ children }) {
  const pathname = usePathname();

  const tabs = [
    { name: "Categories", href: "/tabs/categories" },
    { name: "Trending", href: "/tabs/trending" },
    { name: "Live Chat", href: "/tabs/live-chat" },
    { name: "Resources", href: "/tabs/resources" },
  ];

  return (
    <div>
      <Header />
      <ul className="flex gap-3 bg-[#1F2937] text-2xl w-max ml-32 mt-9 p-2 rounded-md">
        {tabs.map((tab) => (
          <li
            key={tab.href}
            className={
              pathname.startsWith(tab.href)
                ? "text-white font-semibold"
                : "text-[#A1A1AA] hover:text-white"
            }
          >
            <Link href={tab.href} className="px-4 py-2 block">
              {tab.name}
            </Link>
          </li>
        ))}
      </ul>
      <main className="px-32 mt-10">{children}</main>
    </div>
  );
}
