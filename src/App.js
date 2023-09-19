import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "./assets/css/main.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-toastify/dist/ReactToastify.css";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Account from "./pages/Account";
import Project from "./pages/Project";
import MainPage from "./pages/MainPage";
import ProjectDetails from "./pages/ProjectDetails";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route index path="/" exact element={<Login />} />
        <Route path="dashboard" element={<Dashboard />}>
          <Route index element={<MainPage />} />
          <Route path="accounts" element={<Account />} />
          <Route path="projects" element={<Project />} />
          <Route path="project-details/:id" element={<ProjectDetails />} />
        </Route>
      </Routes>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}
