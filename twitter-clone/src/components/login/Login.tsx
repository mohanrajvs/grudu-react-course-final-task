import { Link } from "react-router-dom";
import Card from "../Card/Card";
import styles from "./Login.module.css";
import Layout from "../layout/layout";

const Login = () => {
  return (
    <Layout>
      <div className={styles["login-form"]}>
        <Card>
          <form>
            <h2>Login</h2>
            <input
              type="text"
              name="username"
              id="usename"
              placeholder="Username"
            />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
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
