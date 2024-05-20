import styles from "./Tweet.module.css";

const Tweet = () => {
  return (
    <div className={styles.tweet}>
      <div className={styles["user-logo"]}>JS</div>
      <div className={styles["tweet-content"]}>
        <h3>Jhon smith</h3>
        <p>
          what is object oriented progemming language please explanin as if i'm
          5.
        </p>
      </div>
    </div>
  );
};

export default Tweet;
