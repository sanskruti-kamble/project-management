import { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function CreateProject(props) {
  const [name, setName] = useState("");
  const [managerId, setManagerId] = useState("");

  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    getUserFromLocalStorage();
  }, []);

  function getUserFromLocalStorage() {
    const accounts = JSON.parse(localStorage.getItem("accounts"));
    setAccounts(accounts ?? []);
  }

  function toggleIsChecked(id) {
    setAccounts(
      accounts.map((user) => {
        if (id === user.id) {
          return {
            ...user,
            isChecked: !user.isChecked,
          };
        }
        return user;
      })
    );
  }

  function resetFormField() {
    setName("");
    setManagerId("");
    getUserFromLocalStorage();
  }

  async function createProjectHandler(event) {
    await props.createProject(
      event,
      name,
      managerId,
      accounts.filter((user) => user.isChecked).map((user) => user.id)
    );
    toast.success(`Project ${name} is created successfully!`);
    resetFormField();
  }

  return (
    <>
      <section>
        <form onSubmit={(event) => createProjectHandler(event)}>
          <h3 className=" mb-0 fw-bold">Create Project</h3>
          <p className="mb-1 pb-2 fst-italic text-muted">
            Create your team to work on your Project!!
          </p>

          <div className="mt-4 d-flex gap-3">
            <div className="" style={{ flex: 1 }}>
              <label className="pb-2">Project Name</label>
              <input
                type="text"
                placeholder="Ex. Food website"
                className="form-control"
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>

            <div className="" style={{ flex: 1 }}>
              <label className="pb-2" htmlFor="ManagerId">
                Manager
              </label>

              <select
                className="form-control"
                required
                value={managerId}
                onChange={(event) => setManagerId(event.target.value)}
              >
                <option value="">Please select Manager</option>
                {accounts
                  .filter((user) => user.designation === "manager")
                  .map((user) => (
                    <option value={user.id} key={user.id}>
                      {user.id} : {user.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <div className="mt-3">
            <label className="mb-2 d-block" htmlFor="DeveloperId">
              Developers
            </label>
            {accounts
              .filter((user) => user.designation === "developer")
              .map((user) => (
                <Fragment key={user.id}>
                  <input
                    className="me-2 form-check-input"
                    type="checkbox"
                    id={"ch" + user.id}
                    checked={user.isChecked}
                    onChange={() => toggleIsChecked(user.id)}
                  />
                  <label className="me-4" htmlFor={"ch" + user.id}>
                    {user.id} : {user.name}
                  </label>
                </Fragment>
              ))}
          </div>

          <button type="submit" className="mt-4 btn btn-primary">
            Create Project
          </button>
        </form>
      </section>
    </>
  );
}
