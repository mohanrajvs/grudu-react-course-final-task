import { Link } from "react-router-dom";
import Card from "../Card/Card";
import styles from "./Signup.module.css";
import Layout from "../layout/layout";

const SignUp = () => {
  return (
    <Layout>
      <div className={styles["signup-form"]}>
        <Card>
          <form>
            <h2>Sign Up</h2>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              required
            />
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              required
            />
            <input
              type="text"
              name="fullname"
              id="fullname"
              placeholder="Full Name"
              required
            />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              required
            />
            <button type="submit">Sign Up</button>
          </form>
        </Card>
        <p>
          Already have an account? <Link to="/">Log in</Link>
        </p>
      </div>
    </Layout>
  );
};

export default SignUp;
