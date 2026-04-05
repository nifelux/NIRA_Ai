"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Briefcase,
  User,
} from "lucide-react";

export default function MobileNav() {
  const pathname = usePathname();

  const nav = [
    {
      name: "Home",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Study",
      href: "/study",
      icon: BookOpen,
    },
    {
      name: "Career",
      href: "/career",
      icon: Briefcase,
    },
    {
      name: "Profile",
      href: "/profile",
      icon: User,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-[#020617]/90 backdrop-blur lg:hidden">
      <div className="grid grid-cols-4">
        {nav.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-1 py-3 text-[11px] font-medium transition ${
                active
                  ? "text-blue-400"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Icon
                size={20}
                className={active ? "text-blue-400" : "text-slate-500"}
              />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}