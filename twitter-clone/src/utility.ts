import { IUser } from "./components/signup/Signup";
import { ITweet } from "./components/tweets/Tweets";

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
    const userData = {
      id: e.username,
      name: e.fullname,
      email: e.email,
      password: e.password,
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
