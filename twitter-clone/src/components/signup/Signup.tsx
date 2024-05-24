import { Link } from "react-router-dom";
import Card from "../Card/Card";
import styles from "./Signup.module.css";
import Layout from "../layout/layout";
import { useState, ChangeEvent, FormEvent } from "react";
import * as EmailValidator from "email-validator";
import { adduser, getUsers } from "../../utility";

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
}

const ALLOWED_PASSWORD_SYMBOLS = "@$!%*?&";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    fullname: "",
    password: "",
  });
  const [validations, setValidations] = useState<string[]>([]);
  const [creationStatus, setCreationStatus] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dataValidations = await validator(formData);
    setValidations(dataValidations);
    console.log(dataValidations);
    if (!dataValidations.length) {
      createUser(formData);
    }
  };

  const validator = async (e: typeof formData) => {
    const validations = [];
    if (e.username.length < 1) {
      validations.push("add some user name");
    }
    if (!EmailValidator.validate(e.email)) {
      validations.push("invalid emailId");
    }
    const regex = new RegExp(`[${ALLOWED_PASSWORD_SYMBOLS}]`);
    if (e.password.length < 1) {
      validations.push("password required");
    }
    if (e.password.length > 256) {
      validations.push("password should not exceed 256 characters");
    }
    if (!regex.test(e.password)) {
      validations.push("password should contain atleat a symbol");
    }
    if (e.fullname.length < 1) {
      validations.push("fullname should contain minimum one character");
    }
    if (e.fullname.length > 256) {
      validations.push("full should not exceed 256 character");
    }
    if (!validations.length) {
      try {
        const users: IUser[] = await getUsers();
        if (
          users.some(
            (user) =>
              user.email === formData.email || user.id === formData.username
          )
        ) {
          validations.push("user with this email or username already exist");
        }
      } catch (e) {
        validations.push("unable to connect server");
      }
    }

    return validations;
  };

  const createUser = async (e: typeof formData) => {
    try {
      adduser(e);
      setCreationStatus("user created succesfully");
    } catch (e) {
      setCreationStatus("unable to create user");
    }
  };

  return (
    <Layout>
      <div className={styles["signup-form"]}>
        <Card>
          {validations.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
          {creationStatus && <p>{creationStatus}</p>}
          <form onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
            <input
              type="text"
              name="username"
              id="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Username"
              required
            />
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
              required
            />
            <input
              type="text"
              name="fullname"
              id="fullname"
              value={formData.fullname}
              onChange={handleInputChange}
              placeholder="Full Name"
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
            <button type="submit">Sign Up</button>
          </form>
        </Card>
        <p>
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </Layout>
  );
};

export default SignUp;
