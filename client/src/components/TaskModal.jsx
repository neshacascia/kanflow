export default function TaskModal({ boardId }) {
  function addNewTask(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const title = formData.get('title');
    const description = formData.get('desc');
  }

  return (
    <div>
      <h2>Add New Task</h2>
      <form onSubmit={addNewTask}>
        <label>
          Title
          <input
            type="text"
            name="title"
            placeholder="e.g. Take coffee break"
          />
        </label>

        <label>
          Description
          <textarea
            name="desc"
            placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little."
          ></textarea>
        </label>
        <button type="submit">Create Task</button>
      </form>
    </div>
  );
}
