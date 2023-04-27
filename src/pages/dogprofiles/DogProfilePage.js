import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Asset from "../../components/Asset";

// import styles from "../../styles/DogProfilePage.module.css";
import appStyles from "../../App.module.css";
// import btnStyles from "../../styles/Button.module.css";

// import PopularProfiles from "./PopularProfiles";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
// import {
//   useProfileData,
//   useSetProfileData,
// } from "../../contexts/ProfileDataContext";
// import { Button, Image } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
// import Post from "../posts/Post";
import DogProfile from "./DogProfile";
import DogProfileCreateForm from "../dogprofiles/DogProfileCreateForm"
// import reactRouterDom from "react-router-dom";
import { fetchMoreData } from "../../utils/utils";
// import NoResults from "../../assets/no-results.png";
// import { ProfileEditDropdown } from "../../components/MoreDropdown";


// Or from Profilepage.js: 

function DogProfilePage() {
  const { id } = useParams();
  const [dogprofile, setDogProfile] = useState({ results: [] }); 
  const [dogprofiles, setDogProfiles] = useState({ results: [] });
//  const { setProfileData, handleEdit } = useSetProfileData();
//  const { pageProfile } = useProfileData();
  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;
  // const is_owner = currentUser?.username === profile?.owner;

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: dogprofile }] =
          await Promise.all([
            axiosReq.get(`/dogprofiles/${id}/`),
          ]);
        setDogProfile({ results: [dogprofile] });
      } catch (err) {
        // console.log(err);
      }
    };

    handleMount();
  }, [id]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>

        <DogProfile {...dogprofile.results[0]} setDogProfiles={setDogProfile} dogProfilePage />
        <Container className={appStyles.Content}>
          {currentUser ? (
            <DogProfileCreateForm
              profile_id={currentUser.profile_id}
              profileImage={profile_image}
              dogprofile={id}
              setDogProfile={setDogProfile}
              // setDogProfiles={setDogProfiles}
            />
          ) : dogprofiles.results.length ? (
            <InfiniteScroll
              children={dogprofiles.results.map((comment) => (
                <DogProfile
                  key={dogprofile.id}
                  {...dogprofile}
                  setDogProfile={setDogProfile}
                />
              ))}
              dataLength={dogprofiles.results.length}
              loader={<Asset spinner />}
              hasMore={!!dogprofiles.next}
              next={() => fetchMoreData(dogprofiles, setDogProfiles)}
            />
          ) : currentUser ? (
            <span>No dog profiles yet, be the first to create one!</span>
          ) : (
            <span>No dog profiles...yet</span>
          )}
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
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