import { useEffect, useState } from "react";
import Task from "../components/task/Task";
import { useNavigate, useParams } from "react-router-dom";
import CreateTask from "../components/task/CreateTask";
import { generateId } from "../utility/HelperFunction";

export default function ProjectDetails() {
  const params = useParams();
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [projectData, setProjectData] = useState({});
  const [toDoCount, setToDoCount] = useState(0);
  const [inProgressCount, setInProgressCount] = useState(0);
  const [doneCount, setDoneCount] = useState(0);
  const [accountData, setAccountData] = useState({});

  useEffect(() => {
    setProjectDataHandler();
    setLoginAccountData();
  }, []);

  useEffect(() => {
    statusCountCheck();
   
  }, [tasks]);

  useEffect(()=>{ setTaskDataHandler();},[accountData])

  async function setLoginAccountData() {
    const loginData = await JSON.parse(localStorage.getItem("loggedAccount"));
    await setAccountData(loginData ?? {});
  }

  async function statusCountCheck() {
    let toDo = 0,
      inProgress = 0,
      done = 0;

    await tasks.map((task) => {
      if (task.status === "TO-DO") {
        toDo = toDo + 1;
        return task;
      } else if (task.status === "IN-PROGRESS") {
        inProgress = inProgress + 1;
        return task;
      } else {
        done = done + 1;
        return task;
      }
    });

    setToDoCount(toDo);
    setInProgressCount(inProgress);
    setDoneCount(done);
  }

  function navigateToProjectsPage() {
    navigate("/dashboard/projects");
  }

  async function getProjectFromLocalStorage() {
    const allProjects = await JSON.parse(localStorage.getItem("projects"));
    return allProjects ?? [];
  }

  async function setProjectDataHandler() {
    const allProjects = await getProjectFromLocalStorage();

    const projectDetails = await allProjects.find(
      (project) => project?.id === parseInt(params?.id)
    );

    if (projectDetails) {
      setProjectData(projectDetails ?? {});
    } else {
      navigateToProjectsPage();
    }
  }

  async function getTasksFromLocalStorage() {
    const allTasks = await JSON.parse(localStorage.getItem("tasks"));
    return allTasks ?? [];
  }

  async function setTaskDataHandler() {
    const allTasks = await getTasksFromLocalStorage();

    const filterTasks = await allTasks?.filter((task) =>
      accountData.designation === "developer"
        ? task?.projectId === params?.id &&
          task?.developerId === accountData?.id
        : task?.projectId === params?.id
    );

    setTasks(filterTasks ?? []);
  }

  async function createTaskHandler(event, name, developerId, description) {
    event.preventDefault();

    const newTask = {
      id: generateId(),
      name: name,
      projectId: params?.id,
      status: "TO-DO",
      developerId: parseInt(developerId),
      description: description,
      createdAt: new Date(),
    };

    const oldTasks = await getTasksFromLocalStorage();

    const newTasks = [...oldTasks, newTask];
    await localStorage.setItem("tasks", JSON.stringify(newTasks));

    await setTaskDataHandler();
  }

  async function changeTaskStatus(id) {
    const allTasks = await getTasksFromLocalStorage();

    const updatedTasks = await allTasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          status:
            task?.status === "TO-DO"
              ? "IN-PROGRESS"
              : task?.status === "IN-PROGRESS"
              ? "DONE"
              : "DONE",
        };
      } else {
        return task;
      }
    });

    await localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    await setTaskDataHandler();
  }

  return (
    <>
      <section className="p-4 rounded shadow">
        <h2 className="mb-0 fw-bold">{projectData?.name}</h2>
        <p className="text-muted fst-italic">
          {new Date(projectData?.createdAt)?.toDateString()}
        </p>
        <div className="d-flex gap-3">
          <div className="p-2 d-flex align-items-end rounded shadow border-start border-4 border-danger">
            <h6 className="me-3 mb-0">Todo</h6>
            <h3 className="mb-0 text-danger">{toDoCount}</h3>
          </div>

          <div className="p-2 d-flex align-items-end rounded shadow border-start border-4 border-warning">
            <h6 className="me-3 mb-0">In Progress</h6>
            <h3 className="mb-0 text-warning">{inProgressCount}</h3>
          </div>

          <div className="p-2 d-flex align-items-end rounded shadow border-start border-4 border-success">
            <h6 className="me-3 mb-0">Done</h6>
            <h3 className="mb-0 text-success">{doneCount}</h3>
          </div>
        </div>
      </section>
      {accountData.designation === "manager" && (
        <section className="mt-4 p-4 rounded shadow">
          <CreateTask createTask={createTaskHandler} project={projectData} />
        </section>
      )}
      <section className="mt-4 p-4 rounded shadow">
        <h4 className="fw-bold">Task List</h4>

        <div className="my-grid-6">
          {tasks.map((task) => (
            <Task key={task.id} task={task} changeStatus={changeTaskStatus} />
          ))}
        </div>
        {tasks.length === 0 && (
          <p className="mb-0 fst-italic">No tasks in list!!</p>
        )}
      </section>
    </>
  );
}
