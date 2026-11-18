import Modal from "./Modal";
import Button from "./Button";

export default function ConfirmDialog({ task, onCancel, onConfirm }) {
  return (
    <Modal title="Delete task?" onClose={onCancel} size="max-w-sm">
      <p className="text-sm text-[#222]">
        “<span className="break-words font-semibold text-[#555]">{task.title}</span>” will be permanently
        deleted. This can’t be undone.
      </p>
      <div className="mt-5 flex justify-end gap-2">
        <Button variant="secondary" onClick={onCancel}>Keep task</Button>
        <Button variant="danger" onClick={onConfirm}>Delete task</Button>
      </div>
    </Modal>
  );
}
