import React from "react";
import AppSidebar from "./AppSidebar";
import FeedRightRail from "./FeedRightRail";
import styles from "../styles/PostsPage.module.css";

export default function CommunityLayout({ children }) {
  return <div className={styles.Layout}><div className={styles.LeftColumn}><AppSidebar /></div><main className={styles.FeedColumn}>{children}</main><div className={styles.RightColumn}><FeedRightRail /></div></div>;
}
