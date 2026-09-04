import React from "react";
import { useProfileData } from "../contexts/ProfileDataContext";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import { isPagesPreview } from "../config/deployment";
import Profile from "../pages/profiles/Profile";
import styles from "../styles/FeedRightRail.module.css";
export default function SuggestedProfiles({ limit = 4 }) {
  const { popularProfiles, profilesLoading, profilesError } = useProfileData();
  const currentUser = useCurrentUser();
  if (isPagesPreview) return null;
  const profiles = (popularProfiles.results || []).filter(p => p.owner !== currentUser?.username).slice(0, limit);
  return <section className={styles.Panel} aria-labelledby="suggested-people-title"><span className={styles.Eyebrow}>Good company starts here</span><h2 className={styles.PanelTitle} id="suggested-people-title">People to follow</h2>
    {profilesLoading ? <p className={styles.EmptyProfiles} role="status">Finding your fellow dog people…</p> : profilesError ? <p className={styles.EmptyProfiles}>Profiles couldn’t be loaded just now.</p> : profiles.length ? <div className={styles.ProfileList}>{profiles.map(profile => <Profile key={profile.id} profile={profile} imageSize={38} />)}</div> : <p className={styles.EmptyProfiles}>Other community profiles will appear here.</p>}
  </section>;
}
