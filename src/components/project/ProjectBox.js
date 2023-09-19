import { Link } from "react-router-dom";

export default function ProjectBox(props) {
  return (
    <>
      <div className="p-3 rounded border">
        <h4 className="fw-bold mb-3">{props?.data?.name}</h4>
        <Link
          className="text-primary"
          to={`/dashboard/project-details/${props?.data?.id}`}
        >
          View details
          <i className="bi bi-arrow-right ms-2" />
        </Link>
        <p className="mb-0 fst-italic text-muted">
          {new Date(props?.data?.createdAt)?.toDateString()}
        </p>
      </div>
    </>
  );
}
