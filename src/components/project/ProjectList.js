import ProjectBox from "./ProjectBox";

export default function ProjectList(props) {
  return (
    <>
      <section className="p-2">
        <h3 className="fw-bold mb-3">Project List</h3>
        <div className="my-grid-4">
          {props?.projectList?.map((project) => (
            <ProjectBox key={"p" + project.id} data={project} />
          ))}
        </div>
        {props?.projectList?.length === 0 && (
          <p className="mb-0 fst-italic">No data in project list!!</p>
        )}
      </section>
    </>
  );
}
