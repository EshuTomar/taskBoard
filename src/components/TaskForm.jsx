import { useState } from "react";
import Modal from "./Modal";
import Button from "./Button";
import { PRIORITIES, STATUSES } from "../utils/constants";

const EMPTY = { title: "", description: "", priority: "Medium", dueDate: "", status: "Pending" };

function validate(v) {
  const errors = {};
  if (!v.title.trim()) errors.title = "Enter a title for the task.";
  else if (v.title.trim().length > 80) errors.title = "Title must be 80 characters or fewer.";
  if (v.description.length > 300) errors.description = "Description must be 300 characters or fewer.";
  if (!v.dueDate) errors.dueDate = "Choose a due date.";
  return errors;
}

function Field({ label, required, error, htmlFor, children }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-[#222]">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {error && (
        <p id={`${htmlFor}-error`} role="alert" className="mt-1 text-xs font-medium text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

const inputCls = (err) =>
  `min-h-11 w-full min-w-0 rounded-lg border bg-white px-3 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-violet-200 sm:py-2 ${
    err ? "border-red-400" : "border-[#ddd] focus:border-violet-500"
  }`;

export default function TaskForm({ task, onSave, onClose }) {
  const [values, setValues] = useState(task ? { ...EMPTY, ...task } : EMPTY);
  const [errors, setErrors] = useState({});

  const set = (field) => (e) => {
    setValues((v) => ({ ...v, [field]: e.target.value }));
    if (errors[field]) setErrors((er) => ({ ...er, [field]: undefined }));
  };

  const submit = (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) return;
    onSave({ ...values, title: values.title.trim(), description: values.description.trim() });
  };

  return (
    <Modal title={task ? "Edit task" : "New task"} onClose={onClose}>
      <form onSubmit={submit} noValidate className="space-y-4">
        <Field label="Title" required htmlFor="title" error={errors.title}>
          <input id="title" autoFocus value={values.title} onChange={set("title")} placeholder="e.g. Design onboarding flow"
            aria-invalid={!!errors.title} className={inputCls(errors.title)} />
        </Field>

        <Field label="Description" htmlFor="description" error={errors.description}>
          <textarea id="description" rows={3} value={values.description} onChange={set("description")}
            placeholder="Add details (optional)" className={`${inputCls(errors.description)} min-h-24 resize-y`} />
        </Field>

        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <Field label="Priority" htmlFor="priority">
            <select id="priority" value={values.priority} onChange={set("priority")} className={inputCls()}>
              {PRIORITIES.map((p) => <option key={p}>{p}</option>)}
            </select>
          </Field>
          <Field label="Status" htmlFor="status">
            <select id="status" value={values.status} onChange={set("status")} className={inputCls()}>
              {STATUSES.map((s) => <option key={s}>{s}</option>)}
            </select>
          </Field>
        </div>

        <Field label="Due date" required htmlFor="dueDate" error={errors.dueDate}>
          <input id="dueDate" type="date" value={values.dueDate} onChange={set("dueDate")}
            aria-invalid={!!errors.dueDate} className={inputCls(errors.dueDate)} />
        </Field>

        <div className="grid grid-cols-2 gap-2 pt-2">
          <Button type="button" variant="secondary" onClick={onClose} className="w-full px-2.5">Cancel</Button>
          <Button type="submit" className="w-full px-2.5">{task ? "Save changes" : "Create task"}</Button>
        </div>
      </form>
    </Modal>
  );
}
