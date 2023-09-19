import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  async function loginHandler(event) {
    event.preventDefault();

    if (username === "admin@davzon.com" && password === "admin@123") {
      toast.success("You are logged in as admin!");
      localStorage.setItem(
        "loggedAccount",
        JSON.stringify({
          id: 1,
          name: "Admin",
          email: "admin@davzon.com",
          designation: "admin",
          password: "admin@123",
          createdAt: new Date(),
        })
      );
      navigate("/dashboard");
    } else {
      const accounts =
        (await JSON.parse(localStorage.getItem("accounts"))) ?? [];
      const account = await accounts.find(
        (account) => account.email === username && account.password === password
      );

      if (account) {
        toast.success(`You are logged in as ${account.designation}`);
        localStorage.setItem("loggedAccount", JSON.stringify(account));
        navigate("/dashboard");
      } else {
       toast.warning("Enter the correct Credentials!");
      }
    }
  }

  return (
    <>
      <section
        className="d-flex justify-content-center align-items-center bg-auth"
        style={{ height: "100vh" }}
      >
        <div className="p-5 bg-white rounded shadow ">
          <form onSubmit={(event) => loginHandler(event)}>
            <div>
              <h2 className="mb-0 fw-bold">Welcome back User!!</h2>
              <p>
                <i>Please enter your Credentials!!</i>
              </p>
            </div>

            <div className="mb-2">
              <label htmlFor="userName" className="form-label">
                Username
              </label>
              <input
                type="email"
                className="form-control"
                id="userName"
                placeholder="name@example.com"
                required
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div class="input-group mb-3">
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  className="form-control"
                  id="password"
                  placeholder="123@abc"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
                <span
                  class="input-group-text"
                  id="basic-addon1"
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                >
                  <i
                    className={`bi ${
                      isPasswordVisible ? "bi-eye-slash" : "bi-eye"
                    }`}
                  />
                </span>
              </div>
            </div>
            <div>
              <button className="btn btn-primary" type="submit">
                Login
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
