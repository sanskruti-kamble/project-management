import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar";

export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    isAccountLoggedIn();
  }, []);

  function isAccountLoggedIn() {
    const loggedAccount = JSON.parse(localStorage.getItem("loggedAccount"));

    if (!loggedAccount) {
      navigate("/");
    }
  }

  return (
    <section className="d-flex" style={{ height: "100vh" }}>
      <SideBar />
      <section className="p-4 h-100 overflow-y-scroll" style={{ flex: 1 }}>
        <Outlet />
      </section>
    </section>
  );
}
