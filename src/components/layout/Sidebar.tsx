import Link from "next/link";
import {
  LayoutDashboard,
  MessageSquare,
  User,
  Wallet,
  Trophy,
  FileText,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Chat", href: "/chat", icon: MessageSquare },
  { label: "Profile", href: "/profile", icon: User },
  { label: "Wallet", href: "/wallet", icon: Wallet },
  { label: "Exam", href: "/exam", icon: FileText },
  { label: "JAMB", href: "/jamb", icon: Trophy },
];

export default function Sidebar() {
  return (
    <aside className="glass hidden min-h-screen w-72 border-r border-white/10 p-6 lg:flex lg:flex-col">
      <div className="mb-10">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-blue-400 font-bold text-white shadow-lg shadow-blue-950/40">
            N
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-white">
              NIRA AI
            </h1>
            <p className="text-xs text-slate-400">Learn. Build. Earn.</p>
          </div>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white"
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="rounded-[28px] border border-blue-500/20 bg-blue-500/10 p-4">
        <p className="text-xs uppercase tracking-wide text-blue-200">
          Active Space
        </p>
        <p className="mt-2 text-sm font-medium leading-6 text-white">
          Your guided learning workspace is ready.
        </p>
      </div>
    </aside>
  );
}