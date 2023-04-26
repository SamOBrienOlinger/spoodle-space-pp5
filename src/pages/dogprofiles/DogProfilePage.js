import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Asset from "../../components/Asset";

import styles from "../../styles/ProfilePage.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

// import PopularProfiles from "./PopularProfiles";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import {
  useProfileData,
  useSetProfileData,
} from "../../contexts/ProfileDataContext";
import { Button, Image } from "react-bootstrap";
// import InfiniteScroll from "react-infinite-scroll-component";
// import Post from "../posts/Post";
// import DogProfile from "./DogProfile";
// import DogProfileCreateForm from "../dogprofiles/DogProfileCreateForm"
// import reactRouterDom from "react-router-dom";
// import { fetchMoreData } from "../../utils/utils";
// import NoResults from "../../assets/no-results.png";
import { ProfileEditDropdown } from "../../components/MoreDropdown";


// Or from Profilepage.js: 

function DogProfilePage() {
  const [hasLoaded, setHasLoaded] = useState(false);
  // const [profilePosts, setProfilePosts] = useState({ results: [] });

  const currentUser = useCurrentUser();
  const { id } = useParams();

  const { setProfileData, handleEdit } = useSetProfileData();
  const { pageProfile } = useProfileData();

  const [profile] = pageProfile.results;
  const is_owner = currentUser?.username === profile?.owner;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const [{ data: pageProfile }, { data: profilePosts }] =
        const [{ data: pageProfile }] =
          await Promise.all([
            axiosReq.get(`/dogprofiles/${id}/`),
          ]);
        setProfileData((prevState) => ({
          ...prevState,
          pageProfile: { results: [pageProfile] },
        }));
        // setProfilePosts(profilePosts);
        setHasLoaded(true);
      } catch (err) {
        // console.log(err);
      }
    };
    fetchData();
  }, [id, setProfileData]);

  const dogProfile = (
    <>
    {profile?.is_owner && <ProfileEditDropdown id={profile?.id} />}
      <Row noGutters className="px-3 text-center">
        <Col lg={3} className="text-lg-left">
          <Image
            className={styles.ProfileImage}
            roundedCircle
            src={profile?.image}
          />
        </Col>
      </Row>
      <Row>
        <Col>
        {currentUser &&
            !is_owner &&
        <Button
          className={`${btnStyles.Button} ${btnStyles.BlackOutline}`}
          onClick={() => handleEdit(profile)}
        >
          edit
        </Button>
}
        </Col>
      </Row>
    </>
  )


  return (
    <Row>
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <Container className={appStyles.Content}>
          {hasLoaded ? (
            <>
              {dogProfile}
            </>
          ) : (
            <Asset spinner />
          )}
        </Container>
      </Col>
    </Row>
  );
}

export default DogProfilePage;

// Or

// function DogProfilePage() {

//   return (
//     <div>
//       <h1>Hi this is the DogProfile...(no S)...Page</h1>

//         <p>I have reached the usage limit of my billing account, again, and can't continue using gitpod workspaces</p>

//     </div>
//   )
// }; */}