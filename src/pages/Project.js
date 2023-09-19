import { useEffect, useState } from "react";
import CreateProject from "../components/project/CreateProject";
import ProjectList from "../components/project/ProjectList";
import { generateId } from "../utility/HelperFunction";

export default function Project(props) {
  const [projects, setProjects] = useState([]);
  const [accountData, setAccountData] = useState({});

  useEffect(() => {
    const oldProjects = getItemFromLocalStorage();
    const filterProjects = filterProjectList(oldProjects);
    setProjects(filterProjects);
  }, [accountData]);

  useEffect(() => {
    setLoginAccountData();
  }, []);

  function filterProjectList(oldProjects) {
    return (
      oldProjects.filter((project) => {
        if (accountData?.designation === "developer") {
          if (project?.developersId?.includes(accountData?.id)) {
            return project;
          }
          return null;
        } else if (accountData?.designation === "manager") {
          if (project?.managerId === accountData?.id) {
            return project;
          }
          return null;
        }
        return project;
      }) ?? []
    );
  }

  function setLoginAccountData() {
    const loginData = JSON.parse(localStorage.getItem("loggedAccount"));
    setAccountData(loginData ?? {});
  }

  function getItemFromLocalStorage() {
    const oldProjects = JSON.parse(localStorage.getItem("projects"));
    return oldProjects ?? [];
  }

  async function createProject(event, name, managerId, developersId) {
    event.preventDefault();

    const newProject = {
      id: generateId(),
      name: name,
      managerId: parseInt(managerId),
      developersId: developersId,
      createdAt: new Date(),
    };
    console.log(newProject);

    const oldProjects = getItemFromLocalStorage();

    const newProjects = [...oldProjects, newProject];
    await localStorage.setItem("projects", JSON.stringify(newProjects));

    const oldProjects2 = getItemFromLocalStorage();
    const filterProjects = filterProjectList(oldProjects2);
    setProjects(filterProjects);
  }

  return (
    <>
      <div className=" d-flex flex-column justify-content-between">
        {accountData?.designation === "admin" && (
          <div className="p-4 rounded shadow">
            <CreateProject createProject={createProject} />
          </div>
        )}
        <div className="mt-4 p-4 rounded shadow">
          <ProjectList projectList={projects} />
        </div>
      </div>
    </>
  );
}
