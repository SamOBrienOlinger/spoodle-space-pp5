import React from "react";
import styles from "../styles/PostsPage.module.css";
export default function FeedSkeleton() {
  return <div role="status" aria-label="Loading posts" className={styles.SkeletonStack}>
    {[0, 1].map((n) => <div className={styles.Skeleton} key={n} aria-hidden="true"><div className={styles.SkeletonHeader}><span /><div><b /><b /></div></div><div className={styles.SkeletonLine} /><div className={styles.SkeletonPhoto} /><div className={styles.SkeletonLine} /></div>)}
  </div>;
}
