import { useState } from "react";
import { toast } from "react-toastify";

export default function AddManagerOrDeveloper(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [isManagerOrDeveloper, setIsManagerOrDeveloper] = useState("manager");

  function resetFormFields() {
    setFirstName("");
    setLastName("");
    setUserEmail("");
    setUserPassword("");
    setIsManagerOrDeveloper("manager");
  }

  async function addUserHandler(event){
    await props.addUser(
      event,
      `${firstName} ${lastName}`,
      userEmail,
      isManagerOrDeveloper,
      userPassword
    );
    toast.success(`Account for ${firstName} ${lastName} created successfully!!`)
    resetFormFields();
  }

  return (
    <>
      <form
        onSubmit={(event) =>
        addUserHandler(event)
        }
      >
        <h3 className="mb-0 fw-bold">Add Manager or Developer</h3>
        <p className="mb-4 fst-italic text-muted">
          Create your own team to work on Project!
        </p>

        <div className="d-flex gap-3">
          <div style={{ flex: 1 }}>
            <label htmlFor="firstName">First name</label>
            <input
              className=" form-control"
              type="text"
              id="firstName"
              placeholder="First name"
              required
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label htmlFor="lastName">Last name</label>
            <input
              className="form-control"
              type="text"
              id="lastName"
              placeholder="Last name"
              required
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
            />
          </div>
        </div>
        <div className="mt-3 d-flex gap-3">
          <div className="" style={{ flex: 1 }}>
            <label>Email Id</label>
            <input
              className="form-control"
              type="email"
              placeholder="abc@xyz"
              required
              value={userEmail}
              onChange={(event) => setUserEmail(event.target.value)}
            />
          </div>

          <div className="" style={{ flex: 1 }}>
            <label>Password</label>
            <input
              className="form-control"
              type="password"
              placeholder="Enter Password!"
              required
              value={userPassword}
              onChange={(event) => setUserPassword(event.target.value)}
            />
          </div>
        </div>

        <label className="mt-3">Choose account type</label>
        <div className="mt-1 d-flex gap-4">
          <div className="form-check-inline">
            <input
              className="me-2 form-check-input"
              type="radio"
              name="designation"
              value="manager"
              id="manager account"
              checked={isManagerOrDeveloper === "manager"}
              onChange={(event) => setIsManagerOrDeveloper(event.target.value)}
            />
            <label className="form-check-label" htmlFor="manager account">
              Manager
            </label>
          </div>
          <div className="form-check-inline">
            <input
              className="me-2 form-check-input"
              type="radio"
              name="designation"
              value="developer"
              id="developer account"
              checked={isManagerOrDeveloper === "developer"}
              onChange={(event) => setIsManagerOrDeveloper(event.target.value)}
            />
            <label className="form-check-label" htmlFor="developer account">
              Developer
            </label>
          </div>
        </div>

        <button className="mt-3 btn btn-primary text-capitalize" type="submit">
          Add {isManagerOrDeveloper}
        </button>
      </form>
    </>
  );
}
