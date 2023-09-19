import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function SideBar() {
  const navigate = useNavigate();
  const [accountData, setAccountData] = useState({});

  useEffect(() => {
    setLoginAccountData();
  }, []);

  function logoutHandler() {
    localStorage.removeItem("loggedAccount");
    navigate("/");
    toast.success("You are logged out!");
  }

  function setLoginAccountData() {
    const loginData = JSON.parse(localStorage.getItem("loggedAccount"));
    setAccountData(loginData ?? {});
  }

  return (
    <section className="h-100 w-25 p-4 d-flex flex-column align-items-start justify-content-between bg-primary">
      <h2 className="fw-bold text-light">Welcome {accountData?.name}!</h2>

      <div className="w-100 ps-0 fst-italic d-flex flex-column align-items-start justify-content-between">
        <h4
          className="w-100 p-2 bg-light rounded"
          onClick={() => navigate("/dashboard")}
        >
          Dashboard
        </h4>
        {accountData.designation === "admin" && (
          <h4
            className="w-100 p-2 bg-light rounded"
            onClick={() => navigate("/dashboard/accounts")}
          >
            Accounts
          </h4>
        )}
        <h4
          className="w-100 mb-2 p-2 bg-light rounded"
          onClick={() => navigate("/dashboard/projects")}
        >
          Projects
        </h4>
      </div>

      <button className="btn btn-light" onClick={() => logoutHandler()}>
        Logout
      </button>
    </section>
  );
}
