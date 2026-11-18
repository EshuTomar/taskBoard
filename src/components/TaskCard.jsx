import { CalendarDays, Eye, Flag, Pencil, Trash2 } from "lucide-react";
import { PRIORITY_STYLES, STATUSES } from "../utils/constants";
import { formatDate, isOverdue } from "../utils/date";

function IconBtn({ label, onClick, className = "", children }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      title={label}
      className={`rounded-md p-1.5 text-[#333] transition-colors hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-violet-600 ${className}`}
    >
      {children}
    </button>
  );
}

export default function TaskCard({ task, onView, onEdit, onDelete, onStatusChange }) {
  const overdue = isOverdue(task);
  return (
    <article className="min-w-0 rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <h3 className="min-w-0 break-words text-sm font-semibold leading-snug">{task.title}</h3>
        <div className="-mr-1.5 -mt-1.5 flex shrink-0">
          <IconBtn label="View task" onClick={onView}><Eye size={15} /></IconBtn>
          <IconBtn label="Edit task" onClick={onEdit}><Pencil size={15} /></IconBtn>
          <IconBtn label="Delete task" onClick={onDelete} className="hover:!bg-red-50 hover:text-red-600">
            <Trash2 size={15} />
          </IconBtn>
        </div>
      </div>

      {task.description && (
        <p className="mt-1.5 line-clamp-2 break-words text-xs text-[#333]">{task.description}</p>
      )}

      <div className="mt-3 space-y-1.5 border-t border-dashed border-[#ddd] pt-3 text-xs text-[#222]">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <CalendarDays size={14} className="text-[#555]" />
          <span>{formatDate(task.dueDate)}</span>
          {overdue && <span className="font-semibold text-red-600">Overdue</span>}
        </div>
        <div className={`flex items-center gap-1.5 font-medium ${PRIORITY_STYLES[task.priority]}`}>
          <Flag size={13} fill="currentColor" /> {task.priority} Priority
        </div>
      </div>

      <label className="sr-only" htmlFor={`status-${task.id}`}>Change status</label>
      <select
        id={`status-${task.id}`}
        value={task.status}
        onChange={(e) => onStatusChange(e.target.value)}
        className="mt-2 max-w-full cursor-pointer rounded-md border-0 bg-transparent px-0 py-0.5 text-[10px] font-medium text-[#555] outline-none hover:text-violet-700 focus:text-violet-700"
      >
        {STATUSES.map((s) => <option key={s}>{s}</option>)}
      </select>
    </article>
  );
}
