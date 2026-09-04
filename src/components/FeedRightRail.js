import React from "react";
import { Link } from "react-router-dom";

import SuggestedProfiles from "./SuggestedProfiles";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import styles from "../styles/FeedRightRail.module.css";

const FeedRightRail = () => {
  const currentUser = useCurrentUser();

  const quickLinks = [
    {
      to: "/dogprofilespage",
      icon: "fas fa-dog",
      label: "Dog profiles",
    },
    {
      to: "/dogshealthpage",
      icon: "fas fa-heartbeat",
      label: "Health records",
    },
    {
      to: "/dogdangerspage",
      icon: "fas fa-exclamation-triangle",
      label: "Safety & dangers",
    },
    {
      to: "/liked",
      icon: "fas fa-heart",
      label: "Liked posts",
    },
  ];

  return (
    <aside className={styles.RightRail} aria-label="Feed shortcuts">
      {currentUser ? (
        <section className={styles.Panel} aria-labelledby="quick-links-title">
          <h2 id="quick-links-title" className={styles.PanelTitle}>
            Quick links
          </h2>
          <div className={styles.QuickLinks}>
            {quickLinks.map(({ to, icon, label }) => (
              <Link className={styles.QuickLink} to={to} key={to}>
                <span className={styles.IconWrap} aria-hidden="true">
                  <i className={icon} />
                </span>
                <span>{label}</span>
                <i className="fas fa-chevron-right" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </section>
      ) : (
        <section className={styles.Panel} aria-labelledby="join-title">
          <h2 id="join-title" className={styles.PanelTitle}>
            Join SpoodleSpace
          </h2>
          <p className={styles.SupportingText}>
            Sign in to follow profiles, like posts and share updates.
          </p>
          <div className={styles.AuthLinks}>
            <Link className={styles.PrimaryLink} to="/signin">
              Sign in
            </Link>
            <Link className={styles.SecondaryLink} to="/signup">
              Create account
            </Link>
          </div>
        </section>
      )}

      <div id="suggested-people" className={styles.SuggestedPeople}>
        <SuggestedProfiles limit={4} />
      </div>
    </aside>
  );
};

export default FeedRightRail;
