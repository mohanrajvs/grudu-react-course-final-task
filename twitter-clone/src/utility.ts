import { IUser } from "./components/signup/Signup";
import { ITweet } from "./components/tweets/Tweets";

import bcrypt from "bcryptjs";

export const getUsers = async () => {
  try {
    const usersResponse = await fetch("http://localhost:3001/users");
    const users: IUser[] = await usersResponse.json();
    return users;
  } catch (e) {
    throw new Error("unable fetch users");
  }
};

export const adduser = async (e: {
  username: string;
  email: string;
  fullname: string;
  password: string;
}) => {
  try {
    const hash = await hashPassword(e.password);

    const userData = {
      id: e.username,
      name: e.fullname,
      email: e.email,
      password: hash,
    };
    await fetch("http://localhost:3001/users", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (e) {
    throw new Error("unable fetch users");
  }
};

export const getTweets = async () => {
  try {
    const tweetsResponse = await fetch("http://localhost:3001/tweets");
    const tweets: ITweet[] = await tweetsResponse.json();
    return tweets;
  } catch (e) {
    throw new Error("unable fetch users");
  }
};

export const postTweet = async (tweet: {
  id: string;
  author_id: string;
  text: string;
}) => {
  try {
    await fetch("http://localhost:3001/tweets", {
      method: "POST",
      body: JSON.stringify(tweet),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (e) {
    throw new Error("unable fetch users");
  }
};

// Number of salt rounds (10 is a common value)
const saltRounds = 10;

// Function to hash a password
export const hashPassword = async (password: string) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (err) {
    console.error("Error hashing password:", err);
    throw err;
  }
};

export const verifyPassword = async (password: string, hash: string) => {
  try {
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch;
  } catch (err) {
    console.error("Error verifying password:", err);
    throw err;
  }
};
