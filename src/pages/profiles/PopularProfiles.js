import React from "react";
import { isPagesPreview } from "../../config/deployment";
import { useProfileData } from "../../contexts/ProfileDataContext";
import Profile from "./Profile";
import appStyles from "../../App.module.css";
import styles from "../../styles/PopularProfiles.module.css";
export default function PopularProfiles({ mobile }) {
  const { popularProfiles, profilesLoading, profilesError } = useProfileData();
  if (isPagesPreview) return null;
  return <section className={`${appStyles.Content} ${mobile ? "d-lg-none" : ""}`} aria-label="Popular profiles"><h2 className={styles.MostPopularProfiles}>Meet the community</h2>{profilesLoading ? <p role="status">Loading profiles…</p> : profilesError ? <p>Profiles couldn’t be loaded just now.</p> : popularProfiles.results.length ? <div className={mobile ? styles.MobileProfiles : ""}>{popularProfiles.results.slice(0, mobile ? 4 : 10).map(profile => <Profile key={profile.id} profile={profile} mobile={mobile} />)}</div> : <p>Community profiles will appear here.</p>}</section>;
}
