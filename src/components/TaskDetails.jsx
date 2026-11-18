import { CalendarDays, Flag, Pencil, Trash2 } from "lucide-react";
import Modal from "./Modal";
import Button from "./Button";
import StatusBadge from "./StatusBadge";
import { PRIORITY_STYLES } from "../utils/constants";
import { formatDate, isOverdue } from "../utils/date";

export default function TaskDetails({ task, onClose, onEdit, onDelete }) {
  return (
    <Modal title="Task details" onClose={onClose}>
      <h3 className="break-words text-lg font-semibold">{task.title}</h3>
      <div className="mt-2 flex flex-wrap items-center gap-3">
        <StatusBadge status={task.status} />
        <span className={`inline-flex items-center gap-1.5 text-sm font-medium ${PRIORITY_STYLES[task.priority]}`}>
          <Flag size={14} fill="currentColor" /> {task.priority} priority
        </span>
      </div>

      <p className="mt-4 whitespace-pre-wrap break-words text-sm text-[#222]">
        {task.description || <span className="italic text-[#555]">No description added.</span>}
      </p>

      <div className="mt-4 flex items-center gap-2 text-sm text-[#222]">
        <CalendarDays size={16} /> Due {formatDate(task.dueDate)}
        {isOverdue(task) && <span className="font-semibold text-red-600">Overdue</span>}
      </div>

      <div className="mt-6 flex flex-wrap justify-end gap-2">
        <Button variant="secondary" onClick={onDelete}><Trash2 size={16} /> Delete</Button>
        <Button onClick={onEdit}><Pencil size={16} /> Edit task</Button>
      </div>
    </Modal>
  );
}
