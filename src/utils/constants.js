export const STATUSES = ["Pending", "In Progress", "Completed"];
export const PRIORITIES = ["Low", "Medium", "High"];

export const STATUS_STYLES = {
  Pending: { dot: "bg-slate-400", chip: "bg-slate-200 text-[#222]" },
  "In Progress": { dot: "bg-amber-500", chip: "bg-amber-100 text-amber-800" },
  Completed: { dot: "bg-emerald-500", chip: "bg-emerald-100 text-emerald-800" },
};

export const PRIORITY_STYLES = {
  Low: "text-indigo-600",
  Medium: "text-amber-600",
  High: "text-red-600",
};
