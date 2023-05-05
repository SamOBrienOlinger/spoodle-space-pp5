import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Asset from "../../components/Asset";

import styles from "../../styles/DogProfilePage.module.css";
import appStyles from "../../App.module.css";
// import btnStyles from "../../styles/Button.module.css";

// import PopularProfiles from "..profiles/PopularProfiles";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import DogProfile from "./DogProfile";
import { Form } from "react-bootstrap";

// import Comment from "../comments/Comment";

// import CommentCreateForm from "../comments/CommentCreateForm";

// import {
//   useDogProfileData,
//   useSetDogProfileData,
// } from "../../contexts/DogProfileDataContext";
// import { Button, Image } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";

// import Post from "../posts/Post";
// import DogProfile from ".dogprofiles/DogProfile";
// import DogProfileCreateForm from "../dogprofiles/DogProfileCreateForm"
// import reactRouterDom from "react-router-dom";
import { fetchMoreData } from "../../utils/utils";
// import NoResults from "../../assets/no-results.png";
// import { DogProfileEditDropdown } from "../../components/MoreDropdown";

function DogProfilePage() {

  const { id } = useParams();
  const [dogprofile, setDogProfile] = useState({ results: [] });

  const currentUser = useCurrentUser();
  const dog_profile_image = currentUser?.dog_profile_image;
  const [comments, setComments] = useState({ results: [] });
  const [dogprofiles] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        // const [{ data: dogprofile }] = await Promise.all([
          const [{ data: dogprofile }, { data: comments }] = await Promise.all([
          axiosReq.get(`/dogprofiles/${id}`),
          axiosReq.get(`/comments/?dogprofile=${id}`),
        ]);
        setDogProfile({ results: [dogprofile] });
        setComments(comments);
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
            <Form className={styles.DogProfile}
              dogprofile_id={currentUser.profile_id}
              dogProfileImage={dog_profile_image}
              dogprofile={id}
              setDogProfile={setDogProfile}
              setComments={setComments}
            />
           ) : dogprofiles.results.length ? (
              "Dog Profiles"
            ) : null}
            {dogprofiles.results.length ? (
              <InfiniteScroll
                children={dogprofiles.results.map((comment) => (
                  <DogProfile
                    key={dogprofile.id}
                    {...dogprofile}
                    setPost={setDogProfile}
                    setComments={setComments}
                  />
                ))}
                dataLength={comments.results.length}
                loader={<Asset spinner />}
                hasMore={!!comments.next}
                next={() => fetchMoreData(comments, setComments)}
              />
            ) : currentUser ? (
              <span>No comments yet, be the first to comment!</span>
            ) : (
              <span>No comments... yet</span>
            )}
        </Container>
      </Col>
    </Row>  
  );
}


//    return (
    
//     <div>
//       <div img></div>
    
//       <h1>Doggy Profile</h1>

//       <h2>Dog Name</h2>

//         <p>placeholder</p>

//       <h2>Dog Age</h2>
//         <p>placeholder</p>

//       <h2>Dog Color</h2>

//         <p>placeholder</p>

//       <h2>Dog Bio</h2>

//         <p>placeholder</p>

//       <div>

//         <button a href='./dogprofiles/dogprofilescreateform'>
//           Add doggy profile
//         </button>

//       </div>
//     </div>
//   );
// }  

export default DogProfilePage;
