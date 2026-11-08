import React from "react";
import FeedRightRail from "./FeedRightRail";
import styles from "../styles/PostsPage.module.css";

export default function CommunityLayout({ children }) {
  return <div className={styles.Layout}><main id="main-content" tabIndex={-1} className={styles.FeedColumn}>{children}</main><div className={styles.RightColumn}><FeedRightRail /></div></div>;
}
