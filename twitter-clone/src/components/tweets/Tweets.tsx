import Header from "../header/Header";
import Layout from "../layout/layout";
import Tweet from "../tweet/Tweet";
import styles from "./Tweets.module.css";

const Tweets = () => {
  return (
    <>
      <Header />
      <Layout>
        <div>
          <div className={styles["action-area"]}>
            <textarea placeholder="What's heppening?" rows={3} />
            <button>Tweet</button>
          </div>
          <div className={styles.tweets}>
            <Tweet />
            <Tweet />
            <Tweet />
            <Tweet />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Tweets;
