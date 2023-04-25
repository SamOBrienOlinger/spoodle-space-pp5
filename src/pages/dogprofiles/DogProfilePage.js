import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

// import Asset from "../../components/Asset";

// import styles from "../../styles/ProfilePage.module.css";
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
// import InfiniteScroll from "react-infinite-scroll-component";
// import Post from "../posts/Post";
import DogProfile from "./DogProfile";
import DogProfileCreateForm from "../dogprofiles/DogProfileCreateForm"
// import reactRouterDom from "react-router-dom";
// import { fetchMoreData } from "../../utils/utils";
// import NoResults from "../../assets/no-results.png";
// import { ProfileEditDropdown } from "../../components/MoreDropdown";

function DogProfilePage() {
  const { id } = useParams();
  const [dogprofile, setDogProfile] = useState({ results: [] });

  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: dogprofile }] = await Promise.all([
          axiosReq.get(`/dogprofiles/${id}`),
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
            />
            ) : (
              <span>No Doggy Profiles yet!</span>
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
// };



// Or from Profilepage.js: 

// const [hasLoaded, setHasLoaded] = useState(false);
//   const [profilePosts, setProfilePosts] = useState({ results: [] });

//   const currentUser = useCurrentUser();
//   const { id } = useParams();

//   const { setProfileData, handleFollow, handleUnfollow } = useSetProfileData();
//   const { pageProfile } = useProfileData();

//   const [profile] = pageProfile.results;
//   const is_owner = currentUser?.username === profile?.owner;

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [{ data: pageProfile }, { data: profilePosts }] =
//           await Promise.all([
//             axiosReq.get(`/profiles/${id}/`),
//             axiosReq.get(`/posts/?owner__profile=${id}`),
//           ]);
//         setProfileData((prevState) => ({
//           ...prevState,
//           pageProfile: { results: [pageProfile] },
//         }));
//         setProfilePosts(profilePosts);
//         setHasLoaded(true);
//       } catch (err) {
//         // console.log(err);
//       }
//     };
//     fetchData();
//   }, [id, setProfileData]);

//   const mainProfile = (
//     <>
//       {profile?.is_owner && <ProfileEditDropdown id={profile?.id} />}
//       <Row noGutters className="px-3 text-center">
//         <Col lg={3} className="text-lg-left">
//           <Image
//             className={styles.ProfileImage}
//             roundedCircle
//             src={profile?.image}
//           />
//         </Col>

//         return (
  // <Row>
  // <Col className="py-2 p-0 p-lg-2" lg={8}>
  //   <PopularProfiles mobile />
  //   <Container className={appStyles.Content}>
  //     {hasLoaded ? (
  //       <>
  //         {mainProfile}
  //         {mainProfilePosts}
  //       </>
  //     ) : (
  //       <Asset spinner />
  //     )}
  //   </Container>
  // </Col>
//         );
//       }