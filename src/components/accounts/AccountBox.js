export default function AccountBox(props) {
  return (
    <>
      <section>
        <div className="p-3 rounded border">
          <h4 className="mb-0 fw-bold">{props.data.name}</h4>
          <h6 className="mb-0 fst-normal text-muted">{props.data.email}</h6>
          <p
            className={`mt-2 mb-4 pb-2 badge fs-6 text-capitalize ${
              props.data.designation === "manager" ? "bg-primary" : "bg-success"
            }`}
          >
            {props.data.designation}
          </p>
          <p className="mb-0 fst-italic text-muted">
            {new Date(props.data?.createdAt)?.toDateString()}
          </p>
        </div>
      </section>
    </>
  );
}
