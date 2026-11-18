import { CheckCircle2, CircleDashed, ListChecks, Loader } from "lucide-react";

export default function SummaryCards({ tasks }) {
  const count = (s) => tasks.filter((t) => t.status === s).length;
  const items = [
    { label: "Total tasks", value: tasks.length, Icon: ListChecks, tone: "bg-violet-100 text-violet-600" },
    { label: "Pending", value: count("Pending"), Icon: CircleDashed, tone: "bg-slate-100 text-[#222]" },
    { label: "In Progress", value: count("In Progress"), Icon: Loader, tone: "bg-amber-100 text-amber-600" },
    { label: "Completed", value: count("Completed"), Icon: CheckCircle2, tone: "bg-emerald-100 text-emerald-600" },
  ];

  return (
    <section aria-label="Task summary" className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {items.map(({ label, value, Icon, tone }) => (
        <div key={label} className="flex min-w-0 items-center gap-3 rounded-xl bg-white p-4 shadow-sm">
          <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${tone}`}>
            <Icon size={20} />
          </span>
          <div className="min-w-0">
            <p className="text-2xl font-bold leading-none">{value}</p>
            <p className="mt-1 truncate text-xs font-medium text-[#333]">{label}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
