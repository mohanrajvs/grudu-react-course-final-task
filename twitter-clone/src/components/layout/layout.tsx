import { ReactNode } from "react";
import styles from "./layout.module.css";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={styles.layout}>
      <section>{children}</section>
    </div>
  );
};

export default Layout;
