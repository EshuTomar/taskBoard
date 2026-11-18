import { Bell, Menu, Search } from "lucide-react";

export default function Header({ query, onQuery, onMenu }) {
  return (
    <header className="sticky top-0 z-20 flex h-[60px] items-center gap-3 border-b border-[#ddd]/80 bg-white/95 px-4 backdrop-blur sm:px-6">
      <button onClick={onMenu} aria-label="Open menu" className="rounded-lg p-2 text-[#222] transition hover:bg-slate-100 lg:hidden">
        <Menu size={20} />
      </button>
      <div className="relative mx-auto w-full max-w-[330px]">
        <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#555]" />
        <input
          type="search"
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          placeholder="Search tasks..."
          aria-label="Search tasks"
          className="w-full rounded-lg border border-[#ddd]/80 bg-slate-50 py-2 pl-9 pr-3 text-xs text-[#222] outline-none transition placeholder:text-[#555] focus:border-violet-300 focus:bg-white focus:ring-2 focus:ring-violet-100"
        />
      </div>
      <div className="ml-auto flex shrink-0 items-center gap-2">
        <button aria-label="Notifications" className="rounded-lg p-2 text-[#333] transition hover:bg-slate-100 hover:text-[#222]">
          <Bell size={17} />
        </button>
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 text-[10px] font-bold text-white" aria-label="User profile">
          JD
        </span>
      </div>
    </header>
  );
}
