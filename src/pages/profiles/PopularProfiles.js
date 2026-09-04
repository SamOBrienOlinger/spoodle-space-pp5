import React from "react";
import { isPagesPreview } from "../../config/deployment";
import { Container } from "react-bootstrap";
import appStyles from "../../App.module.css";
import styles from "../../styles/PopularProfiles.module.css";
import Asset from "../../components/Asset";
import { useProfileData } from "../../contexts/ProfileDataContext";
import Profile from "./Profile";

const PopularProfiles = ({ mobile }) => {
  const { popularProfiles } = useProfileData();
  // A static preview must not show a permanently loading live-data panel.
  if (isPagesPreview) return null;
  return (
    <Container className={`${appStyles.Content} ${mobile ? "d-lg-none text-center mb-3" : ""}`}>
      {popularProfiles.results.length ? (
        <>
          <p className={styles.MostPopularProfiles}>Most Followed SpoodleSpacers</p>
          {mobile ? (
            <div className={styles.MobileProfiles}>
              {popularProfiles.results.slice(0, 4).map((profile) => <Profile key={profile.id} profile={profile} mobile />)}
            </div>
          ) : popularProfiles.results.map((profile) => <Profile key={profile.id} profile={profile} />)}
        </>
      ) : <Asset spinner />}
    </Container>
  );
};
export default PopularProfiles;
