export default function Task(props) {
  return (
    <>
      <div className="p-3 mb-3 border border-2">
        <h5 className="fw-bold mb-0 ">{props?.task?.name}</h5>
        <p className="fst-lighter text-muted">{props?.task?.description}</p>
        <div className="mt-2 d-flex justify-content-between">
          <div>
            <p
              className={`mb-1 badge  fs-6 ${
                props?.task?.status === "TO-DO"
                  ? "bg-danger"
                  : props?.task?.status === "IN-PROGRESS"
                  ? "bg-warning"
                  : "bg-success"
              }`}
            >
              {props?.task?.status}
            </p>
            <p className="mb-0 text-muted fst-italic">
              {new Date(props?.task?.createdAt)?.toDateString()}
            </p>
          </div>
          {props?.task?.status !== "DONE" && (
            <button
              className="btn btn-primary btn-sm"
              onClick={() => props.changeStatus(props?.task?.id)}
            >
              {props?.task?.status === "TO-DO"
                ? "Start Task"
                : props?.task?.status === "IN-PROGRESS"
                ? "Task Done"
                : ""}
            </button>
          )}
        </div>
      </div>
    </>
  );
}
