export default function DeleteModal({ selectedTask, setDisplayTaskModal }) {
  return (
    <div>
      <h2>Delete this task?</h2>
      <p>
        Are you sure you want to delete the {`'${selectedTask.title}'`} task and
        its subtasks? This action cannot be reversed.
      </p>
      <button>Delete</button>
      <button onClick={() => setDisplayTaskModal(false)}>Cancel</button>
    </div>
  );
}
