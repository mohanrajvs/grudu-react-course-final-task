import { Link, useNavigate } from "react-router-dom";
import Card from "../Card/Card";
import styles from "./Login.module.css";
import Layout from "../layout/layout";
import { ChangeEvent, FormEvent, useState } from "react";
import { getUsers, verifyPassword } from "../../utility";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [authValidation, setAuthValidation] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      formData.username.trim().length &&
      formData.password &&
      formData.password.trim().length
    ) {
      const users = await getUsers();
      const user = users.find((user) => user.id === formData.username);
      if (user) {
        try {
          const passwordMatch = await verifyPassword(
            formData.password,
            user.password
          );
          if (passwordMatch) {
            setAuthValidation("authenticated");
            localStorage.setItem("user", JSON.stringify(user));
            navigate("/");
          } else {
            throw new Error("invalid password");
          }
        } catch (e) {
          setAuthValidation("invalid user name or password");
        }
      } else {
        setAuthValidation("invalid user name or password");
      }
    }
  };

  return (
    <Layout>
      <div className={styles["login-form"]}>
        <Card>
          {authValidation && <p>{authValidation}</p>}
          <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <input
              type="text"
              name="username"
              id="usename"
              placeholder="Username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
              required
            />
            <button type="submit">Log in</button>
          </form>
        </Card>
        <p>
          Don't have an account <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </Layout>
  );
};

export default Login;
