import { ClipboardList, SearchX } from "lucide-react";
import Button from "./Button";

export default function EmptyState({ filtered, onAdd, onClear }) {
  const Icon = filtered ? SearchX : ClipboardList;
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-violet-100 text-violet-600">
        <Icon size={26} />
      </span>
      <h2 className="mt-4 text-base font-semibold">{filtered ? "No tasks match your filters" : "No tasks yet"}</h2>
      <p className="mt-1 max-w-sm text-sm text-[#333]">
        {filtered
          ? "Try a different search or clear the filters to see all tasks."
          : "Create your first task to start tracking what’s pending, in progress and done."}
      </p>
      <div className="mt-5">
        {filtered ? <Button variant="secondary" onClick={onClear}>Clear filters</Button>
                  : <Button onClick={onAdd}>Add your first task</Button>}
      </div>
    </div>
  );
}
