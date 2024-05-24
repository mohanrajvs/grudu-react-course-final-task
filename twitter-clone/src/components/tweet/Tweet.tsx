import { ITweet } from "../tweets/Tweets";
import styles from "./Tweet.module.css";

const Tweet = ({ tweet }: { tweet: ITweet }) => {
  return (
    <div className={styles.tweet}>
      <div className={styles["user-logo"]}>JS</div>
      <div className={styles["tweet-content"]}>
        <h3>{tweet.author_id}</h3>
        <div dangerouslySetInnerHTML={{ __html: tweet.text }} />
      </div>
    </div>
  );
};

export default Tweet;
