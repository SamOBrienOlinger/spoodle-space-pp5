import React from "react";

import Asset from "./Asset";
import Profile from "../pages/profiles/Profile";
import { useProfileData } from "../contexts/ProfileDataContext";
import styles from "../styles/FeedRightRail.module.css";

const SuggestedProfiles = ({ limit = 4 }) => {
  const { popularProfiles } = useProfileData();
  const profiles = (popularProfiles.results || []).slice(0, limit);

  return (
    <section
      className={`${styles.Panel} ${styles.SuggestedPanel}`}
      aria-labelledby="suggested-people-title"
    >
      <h2 id="suggested-people-title" className={styles.PanelTitle}>
        Suggested people
      </h2>

      {profiles.length ? (
        <div className={styles.ProfileList}>
          {profiles.map((profile) => (
            <Profile
              key={profile.id}
              profile={profile}
              imageSize={42}
            />
          ))}
        </div>
      ) : (
        <Asset spinner />
      )}
    </section>
  );
};

export default SuggestedProfiles;
