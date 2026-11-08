import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/LiveAccountNotice.module.css";

export function PreviewBanner() {
  return (
    <div className={styles.Banner} role="note">
      <span><strong>Design preview.</strong> Sample content and local drafting. Accounts and live activity are unavailable.</span>
    </div>
  );
}

export default function LiveAccountNotice({ account = false }) {
  return (
    <section className={styles.Notice} aria-labelledby="live-account-heading">
      <p className={styles.Eyebrow}>GitHub Pages design preview</p>
      <h1 id="live-account-heading">{account ? "Accounts are unavailable in this preview" : "This page is unavailable in the preview"}</h1>
      <p>Explore the sample profile, dog records and posts in the design preview.</p>
      <Link to="/">Back to the design preview</Link>
    </section>
  );
}
