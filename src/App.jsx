import { useMemo, useState } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Board from "./components/Board";
import EmptyState from "./components/EmptyState";
import TaskForm from "./components/TaskForm";
import TaskDetails from "./components/TaskDetails";
import ConfirmDialog from "./components/ConfirmDialog";
import { PRIORITIES, STATUSES } from "./utils/constants";

export default function App() {
  const [tasks, setTasks] = useLocalStorage("taskboard.tasks", []);

  // filters
  const [query, setQuery] = useState("");
  const [priority, setPriority] = useState("All");
  const [status, setStatus] = useState("All");

  // UI state
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null); // task being edited (null = creating)
  const [viewingId, setViewingId] = useState(null);
  const [deleting, setDeleting] = useState(null);

  const viewing = tasks.find((t) => t.id === viewingId);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tasks.filter(
      (t) =>
        (priority === "All" || t.priority === priority) &&
        (!q || t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q))
    );
  }, [tasks, query, priority]);

  const counts = {
    All: tasks.length,
    ...Object.fromEntries(STATUSES.map((s) => [s, tasks.filter((t) => t.status === s).length])),
  };

  const filtersActive = query.trim() !== "" || priority !== "All";
  const clearFilters = () => { setQuery(""); setPriority("All"); setStatus("All"); };

  const openCreate = () => { setEditing(null); setFormOpen(true); };
  const openEdit = (task) => { setViewingId(null); setEditing(task); setFormOpen(true); };

  const saveTask = (data) => {
    if (editing) {
      setTasks((prev) => prev.map((t) => (t.id === editing.id ? { ...t, ...data } : t)));
    } else {
      setTasks((prev) => [{ ...data, id: crypto.randomUUID(), createdAt: Date.now() }, ...prev]);
    }
    setFormOpen(false);
    setEditing(null);
  };

  const confirmDelete = () => {
    setTasks((prev) => prev.filter((t) => t.id !== deleting.id));
    setDeleting(null);
  };

  const changeStatus = (id, next) =>
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status: next } : t)));

  const handlers = { view: setViewingId, edit: openEdit, remove: setDeleting, status: changeStatus };
  const statuses = status === "All" ? STATUSES : [status];

  return (
    <div className="flex min-h-screen w-full overflow-x-hidden">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        active={status}
        onSelect={setStatus}
        counts={counts}
        onAdd={openCreate}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header query={query} onQuery={setQuery} onMenu={() => setSidebarOpen(true)} />

        <main className="min-w-0 flex-1 p-4 sm:px-6 sm:py-5">
          <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight text-[#222] sm:text-2xl">Project-1 Workspace</h1>
              </div>
              <p className="mt-1 text-sm font-medium text-[#444]">Plan, organize, and track your team&apos;s work.</p>
            </div>
            <div className="flex items-center gap-2 pt-1">
              
              <span className="ml-1 rounded-lg border border-[#ddd] bg-white px-3 py-1.5 text-xs font-semibold text-[#222] shadow-sm">
                Share
              </span>
            </div>
          </div>

          <div className="mb-5 flex items-center gap-6 overflow-x-auto border-b border-[#ddd] text-sm">
            <span className="whitespace-nowrap border-b-2 border-violet-600 px-0.5 pb-3 font-semibold text-violet-700">Board</span>
            <span className="whitespace-nowrap px-0.5 pb-3 font-medium text-[#555]">List</span>
            <span className="whitespace-nowrap px-0.5 pb-3 font-medium text-[#555]">Calendar</span>
            <span className="whitespace-nowrap px-0.5 pb-3 font-medium text-[#555]">Files</span>
          </div>

          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <label htmlFor="priority-filter" className="sr-only">Filter by priority</label>
              <select
                id="priority-filter"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="rounded-lg border border-[#ddd] bg-white px-3 py-2 text-xs font-medium text-[#222] shadow-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
              >
                {["All", ...PRIORITIES].map((p) => <option key={p} value={p}>{p === "All" ? "Priority: All" : `Priority: ${p}`}</option>)}
              </select>
              {(filtersActive || status !== "All") && (
                <button onClick={clearFilters} className="px-2 text-xs font-semibold text-violet-700 hover:text-violet-900">
                  Clear filters
                </button>
              )}
            </div>
            <button
              onClick={openCreate}
              className="inline-flex items-center gap-1.5 rounded-lg bg-violet-600 px-3.5 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-violet-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
            >
              <span aria-hidden="true" className="text-base leading-none">+</span> Add New
            </button>
          </div>

          {tasks.length > 0 && visible.length === 0 ? (
            <EmptyState filtered onClear={clearFilters} />
          ) : (
            <Board statuses={statuses} tasks={visible} handlers={handlers} />
          )}
        </main>
      </div>

      {formOpen && (
        <TaskForm task={editing} onSave={saveTask} onClose={() => { setFormOpen(false); setEditing(null); }} />
      )}
      {viewing && (
        <TaskDetails
          task={viewing}
          onClose={() => setViewingId(null)}
          onEdit={() => openEdit(viewing)}
          onDelete={() => { setViewingId(null); setDeleting(viewing); }}
        />
      )}
      {deleting && <ConfirmDialog task={deleting} onCancel={() => setDeleting(null)} onConfirm={confirmDelete} />}
    </div>
  );
}
