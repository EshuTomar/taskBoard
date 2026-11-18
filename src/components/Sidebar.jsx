import { CheckCircle2, CircleDashed, FolderKanban, LayoutDashboard, Loader, Plus, X } from "lucide-react";

const NAV = [
  { key: "All", label: "All tasks", Icon: LayoutDashboard },
  { key: "Pending", label: "Pending", Icon: CircleDashed },
  { key: "In Progress", label: "In Progress", Icon: Loader },
  { key: "Completed", label: "Completed", Icon: CheckCircle2 },
];

export default function Sidebar({ open, onClose, active, onSelect, counts, onAdd }) {
  return (
    <>
      {open && <div className="fixed inset-0 z-30 bg-slate-900/40 lg:hidden" onClick={onClose} />}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-60 flex-col border-r border-[#ddd] bg-white px-3 py-4 transition-transform duration-200 lg:static lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-7 flex items-center justify-between px-1">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-violet-600 text-sm font-bold text-white shadow-sm shadow-violet-200">T</span>
            <span className="text-[15px] font-bold tracking-tight text-[#555]">TaskBoard</span>
          </div>
          <button onClick={onClose} aria-label="Close menu" className="rounded-lg p-1.5 text-[#333] hover:bg-slate-100 lg:hidden">
            <X size={18} />
          </button>
        </div>

        <button
          onClick={() => { onAdd(); onClose(); }}
          className="mb-6 flex w-full items-center justify-center gap-2 rounded-lg bg-violet-600 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
        >
          <Plus size={16} /> Add New
        </button>

        <p className="mb-2 px-2 text-[10px] font-bold uppercase tracking-[0.12em] text-[#555]">Workspace</p>
        <button
          onClick={() => { onSelect("All"); onClose(); }}
          aria-current={active === "All" ? "page" : undefined}
          className={`mb-5 flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-semibold transition-colors ${
            active === "All" ? "bg-violet-50 text-violet-700" : "text-[#222] hover:bg-slate-50"
          }`}
        >
          <LayoutDashboard size={17} />
          <span className="flex-1 text-left">Dashboard</span>
          <span className="rounded-md bg-white/80 px-1.5 py-0.5 text-xs font-medium text-[#333]">{counts.All}</span>
        </button>

        <div className="mb-2 flex items-center gap-2 px-2">
          <FolderKanban size={15} className="text-[#333]" />
          <p className="text-[11px] uppercase font-semibold  tracking-[0.12em] text-[#555]">Project-1 Workspace</p>
        </div>
        <nav aria-label="Task views" className="space-y-1">
          {NAV.map(({ key, label, Icon }) => {
            if (key === "All") return null;
            const selected = active === key;
            return (
              <button
                key={key}
                onClick={() => { onSelect(key); onClose(); }}
                aria-current={selected ? "page" : undefined}
                className={`flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium transition-colors ${
                  selected ? "bg-violet-50 text-violet-700" : "text-[#222] hover:bg-slate-50"
                }`}
              >
                <Icon size={17} />
                <span className="flex-1 text-left">{label}</span>
                <span className="rounded-md bg-slate-100 px-1.5 text-xs text-[#222]">{counts[key]}</span>
              </button>
            );
          })}
        </nav>

        <p className="mt-auto border-t border-slate-100 px-2 pt-4 text-xs leading-relaxed text-[#555]">Your tasks are saved securely in this browser.</p>
      </aside>
    </>
  );
}
