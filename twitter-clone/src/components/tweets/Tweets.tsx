import { FormEvent, useEffect, useRef, useState } from "react";
import Header from "../header/Header";
import Tweet from "../tweet/Tweet";
import styles from "./Tweets.module.css";
import { getTweets, postTweet } from "../../utility";

export interface ITweet {
  id: string;
  author_id: string;
  text: string;
}

const Tweets = () => {
  const [tweets, setTweets] = useState<ITweet[]>([]);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const fetchTweets = async () => {
      const tweetsData = await getTweets();
      setTweets(tweetsData.reverse());
    };
    fetchTweets();
  }, []);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    if (textAreaRef.current) {
      const { value } = textAreaRef.current;
      if (value && value.trim().length > 0 && value.trim().length < 141) {
        try {
          const user = JSON.parse(localStorage.getItem("user")!);
          await postTweet({
            id: tweets.length + "",
            author_id: user.id,
            text: value,
          });
          const updatedTweets = await getTweets();
          setTweets(updatedTweets.reverse());
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  return (
    <>
      <Header />
      <section>
        <form onSubmit={submitHandler}>
          <textarea
            ref={textAreaRef}
            className={styles.textarea}
            placeholder="What's heppening?"
            maxLength={140}
            rows={3}
          />
          <button>Tweet</button>
        </form>
        <div className={styles.tweets}>
          {tweets &&
            tweets.map((tweet) => <Tweet key={tweet.id} tweet={tweet} />)}
        </div>
      </section>
    </>
  );
};

export default Tweets;
