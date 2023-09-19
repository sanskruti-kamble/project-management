import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function CreateTask(props) {
  const [taskName, setTaskName] = useState("");
  const [developerId, setDeveloperId] = useState("");
  const [description, setDescription] = useState("");

  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    getUserFromLocalStorage();
  }, []);

  function resetFields() {
    setTaskName("");
    setDeveloperId("");
    setDescription("");
  }

  async function getUserFromLocalStorage() {
    const accounts = await JSON.parse(localStorage.getItem("accounts"));
    setAccounts(accounts ?? []);
  }

  async function createTaskHandler(event) {
    await props.createTask(event, taskName, developerId, description);
    toast.success(`Task ${taskName} is successfully created !!`);
    resetFields();
  }

  return (
    <>
      <form onSubmit={(event) => createTaskHandler(event)}>
        <h3 className="mb-0 fw-bold">Create Task</h3>
        <p className="fst-italic text-muted"> Assign a task to your Team!</p>
        <div className="mt-4 d-flex gap-3">
          <div style={{ flex: 1 }}>
            <label className="mb-2" htmlFor="Task Name">
              Task name
            </label>
            <input
              className="form-control"
              id="Task Name"
              type="text"
              placeholder="create colorful UI"
              value={taskName}
              onChange={(event) => setTaskName(event.target.value)}
            />
          </div>

          <div style={{ flex: 1 }}>
            <label className="mb-2" htmlFor="Assignment">
              Assign developer on this task
            </label>
            <select
              className="form-control"
              value={developerId}
              onChange={(event) => setDeveloperId(event.target.value)}
            >
              <option value="">Please select a developer</option>
              {accounts
                .filter((user) =>props?.project?.developersId?.includes(user?.id))
                .map((user) => [
                  <option value={user?.id} key={user?.id}>
                    {user?.id} : {user?.name}
                  </option>,
                ])}
            </select>
          </div>
        </div>

        <div className="mt-3">
          <label htmlFor="Description">Description</label>
          <textarea
            className="mt-2 form-control"
            id="Description"
            type="textarea"
            placeholder="Project description here....!!"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>
        <div>
          <button className="mt-4 btn btn-primary" type="submit">
            Create Task
          </button>
        </div>
      </form>
    </>
  );
}
