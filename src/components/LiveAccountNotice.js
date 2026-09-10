import React from "react";
import { Link } from "react-router-dom";
import { liveAppOrigin, liveAccountUrl } from "../config/deployment";
import styles from "../styles/LiveAccountNotice.module.css";

export function PreviewBanner() {
  return (
    <div className={styles.Banner} role="note">
      <span><strong>Design preview.</strong> Accounts and live posts are on Heroku.</span>
      <a href={liveAppOrigin}>Open live SpoodleSpace</a>
    </div>
  );
}

export default function LiveAccountNotice({ action = "signin" }) {
  const signingUp = action === "signup";
  return (
    <section className={styles.Notice} aria-labelledby="live-account-heading">
      <p className={styles.Eyebrow}>GitHub Pages design preview</p>
      <h1 id="live-account-heading">{signingUp ? "Create your SpoodleSpace account" : "Sign in to SpoodleSpace"}</h1>
      <p>This preview cannot sign you in. Your account is on the Heroku app, where the frontend connects to the backend.</p>
      <p>No password is needed on this preview page.</p>
      <a className={styles.Continue} href={liveAccountUrl(action)}>
        {signingUp ? "Create account on Heroku" : "Continue to Heroku sign-in"}
      </a>
      <p className={styles.Host}>spoodle-space-pp5.herokuapp.com</p>
      <Link to="/">Back to the design preview</Link>
    </section>
  );
}
