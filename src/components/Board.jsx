import TaskCard from "./TaskCard";
import { STATUS_STYLES } from "../utils/constants";
import { Plus } from "lucide-react";

export default function Board({ statuses, tasks, handlers, onAdd }) {
  return (
    <div className="grid min-w-0 grid-cols-1 items-start gap-3 md:grid-cols-2 lg:grid-cols-3">
      {statuses.map((status) => {
        const items = tasks
          .filter((t) => t.status === status)
          .sort((a, b) => a.dueDate.localeCompare(b.dueDate));
        const colors = {
          Pending: "bg-slate-100 text-[#222]",
          "In Progress": "bg-amber-100/80 text-amber-700",
          Completed: "bg-emerald-100/80 text-emerald-700",
        };
        return (
          <section key={status} aria-label={status} className="min-w-0 rounded-xl bg-slate-100/80 border border-[#ddd] p-2.5">
            <div className="mb-2.5 flex min-h-8 items-center gap-2">
              <span className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-semibold ${colors[status]}`}>
                <span className={`h-2 w-2 rounded-full ${STATUS_STYLES[status].dot}`} />
                {status}
              </span>
              <span className="text-xs font-medium text-[#555]">{items.length}</span>
              <div className="ml-auto flex items-center gap-0.5">
                <button aria-label={`Add task to ${status}`} onClick={onAdd} className="rounded-md p-1 text-[#555] transition hover:bg-white hover:text-violet-600">
                  <Plus size={15} />
                </button>
              </div>
            </div>
            <div className="space-y-2.5">
              {items.length === 0 && (
                <p className="rounded-lg border border-dashed border-[#ddd] bg-white/70 px-3 py-6 text-center text-xs text-[#555]">
                  No tasks in this section
                </p>
              )}
              {items.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onView={() => handlers.view(task.id)}
                  onEdit={() => handlers.edit(task)}
                  onDelete={() => handlers.remove(task)}
                  onStatusChange={(s) => handlers.status(task.id, s)}
                />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
