// import React, { useEffect, useState } from "react";

// import Col from "react-bootstrap/Col";
// import Row from "react-bootstrap/Row";
// import Container from "react-bootstrap/Container";

// import Asset from "../../components/Asset";

// import styles from "../../styles/DogProfilePage.module.css";
// import appStyles from "../../App.module.css";
// import btnStyles from "../../styles/Button.module.css";

// import PopularProfiles from "..profiles/PopularProfiles";
// import { useCurrentUser } from "../../contexts/CurrentUserContext";
// import { useParams } from "react-router";
// import { axiosReq } from "../../api/axiosDefaults";
// import {
//   useDogProfileData,
//   useSetDogProfileData,
// } from "../../contexts/DogProfileDataContext";
// import { Button, Image } from "react-bootstrap";
// import InfiniteScroll from "react-infinite-scroll-component";

// import Post from "../posts/Post";
// import DogProfile from ".dogprofiles/DogProfile";
// import DogProfileCreateForm from "../dogprofiles/DogProfileCreateForm"
// import reactRouterDom from "react-router-dom";
// import { fetchMoreData } from "../../utils/utils";
// import NoResults from "../../assets/no-results.png";
// import { DogProfileEditDropdown } from "../../components/MoreDropdown";

// function DogProfilePage() {
//   const [hasLoaded, setHasLoaded] = useState(false);
  // const [dogProfiles, setDogProfiles] = useState({ results: [] }); 

  // const currentUser = useCurrentUser();
  // const { id } = useParams();

  // const { setDogProfileData, handleEdit, handleDelete } = useSetDogProfileData();
  // // const { pageProfile } = useProfileData();

  // const [dogProfile] = dogProfile.results;
  // const is_owner = currentUser?.username === dogProfile?.owner;


  //   const handleMount = async () => {
  //     try {
  //       const [{ data: dogprofile }] =
  //         await Promise.all([
  //           axiosReq.get(`/dogprofiles/${id}/`),
  //           // axiosReq.get(`/dogprofiles/?dogprofile=${id}`),
  //         ]);
  //       setDogProfile({ results: [dogprofile] });
  //       // setDogProfile(dogprofiles);
  //     } catch (err) {
  //       // console.log(err);
  //     }
  //   };
  //   fetchData();
  // }, [id, setProfileData]);

  //   handleMount();
  // }, [id]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const [ { data: dogProfiles }] =
  //         await Promise.all([
  //           axiosReq.get(`/dogprofiles/?owner__profile=${id}`),
  //         ]);
  //       setDogProfileData((prevState) => ({
  //         ...prevState,
  //         dogProfile: { results: [dogProfile] },
  //       }));
  //       setDogProfiles(dogProfiles);
  //       setHasLoaded(true);
  //     } catch (err) {
  //       // console.log(err);
  //     }
  //   };
  //   fetchData();
  // }, [id, setDogProfileData]);

//   return (
//         <Row>
//           <Col className="py-2 p-0 p-lg-2" lg={8}>
//             <PopularProfiles mobile />
//             <Container className={appStyles.Content}>
//               {hasLoaded ? (
//                 <>
//                   {/* {mainProfile}
//                   {mainProfilePosts} */}
//                   {/* {createDogProfile} */}
//                   { DogProfilePage}
//                 </>
//               ) : (
//                 <Asset spinner />
//               )}
//             </Container>
//           </Col>
//           <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
//             <PopularProfiles />
//           </Col>
//         </Row>
//       );
// }
  

  // const createDogProfile = (
  //   <>
  //     {dogProfile?.is_owner && <DogProfileEditDropdown id={dogProfile?.id} />}
  //     <Row noGutters className="px-3 text-center">
  //       <Col lg={3} className="text-lg-left">
  //         <Image
  //           // className={styles.DogProfileImage}
  //           className={styles.DogProfilePage}
  //           roundedCircle
  //           src={dogProfile?.image}
  //         />
  //       </Col>
  //       <Col lg={6}>
  //         <h3 className="m-2">{dogProfile?.owner}</h3>
  //         <Row className="justify-content-center no-gutters">
  //           <Col xs={3} className="my-2">
  //             {/* <div>{dogProfile?.posts_count}</div> */}
  //             <div>{dogProfile?.setDogProfiles}</div>
  //             <div> dog profile</div>
  //           </Col>
  //         </Row>
  //       </Col>
  //       <Col lg={3} className="text-lg-right">
  //         {currentUser &&
  //           !is_owner &&
  //           (dogProfile?.dogProfile_id ? (
  //             <Button
  //               className={`${btnStyles.Button} ${btnStyles.BlackOutline}`}
  //               onClick={() => handleEdit(dogProfile)}
  //             >
  //               Edit dog profile 
  //             </Button>
  //           ) : (
  //             <Button
  //               className={`${btnStyles.Button} ${btnStyles.Black}`}
  //               onClick={() => handleDelete(dogProfile)}
  //             >
  //               Delete dog profile
  //             </Button>
  //           ))}
  //       </Col>
  //       {dogProfile?.content && <Col className="p-3">{dogProfile.content}</Col>}
  //     </Row>
  //   </>
  // );

  //   return (
  //     <Row>
  //       <Col className="py-2 p-0 p-lg-2" lg={8}>
  //         <PopularProfiles mobile />
  //         <Container className={appStyles.Content}>
  //           {hasLoaded ? (
  //             <>
  //               {/* {mainProfile}
  //               {mainProfilePosts} */}
  //               {createDogProfile}
  //             </>
  //           ) : (
  //             <Asset spinner />
  //           )}
  //         </Container>
  //       </Col>
  //       <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
  //         <PopularProfiles />
  //       </Col>
  //     </Row>
  //   );
  // }

  // return (
  //   <Row className="h-100">
  //     <Col className="py-2 p-0 p-lg-2" lg={8}>

  //       <DogProfile {...dogprofile.results[0]} setDogProfiles={setDogProfile} dogProfilePage />
  //       <Container className={appStyles.Content}>
  //         {currentUser ? (
  //           <DogProfileCreateForm
  //             profile_id={currentUser.profile_id}
  //             profileImage={profile_image}
  //             dogprofile={id}
  //             setDogProfile={setDogProfile}
  //             // setDogProfiles={setDogProfiles}
  //           />
  //         ) : dogprofiles.results.length ? (
  //           <InfiniteScroll
  //             children={dogprofiles.results.map((dogprofiles) => (
  //               <DogProfile
  //                 key={dogprofile.id}
  //                 {...dogprofile}
  //                 setDogProfile={setDogProfile}
  //                 setDogProfiles={setDogProfiles}
  //               />
  //             ))}
  //             dataLength={dogprofiles.results.length}
  //             loader={<Asset spinner />}
  //             hasMore={!!dogprofiles.next}
  //             next={() => fetchMoreData(dogprofiles, setDogProfiles)}
  //           />
  //         ) : currentUser ? (
  //           <span>No dog profiles yet, be the first to create one!</span>
  //         ) : (
  //           <span>No dog profiles...yet</span>
  //         )}
  //       </Container>
  //     </Col>
  //     <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
  //       <DogProfile />
      
  //     </Col>
  //   </Row>
  // );

function DogProfilePage() {

   return (
    
    <div>
      <div img></div>
    
      <h1>Doggy Profile</h1>

      <h2>Dog Name</h2>

        <p>placeholder</p>

      <h2>Dog Age</h2>
        <p>placeholder</p>

      <h2>Dog Color</h2>

        <p>placeholder</p>

      <h2>Dog Bio</h2>

        <p>placeholder</p>

      <div>

        <button a href='./dogprofiles/dogprofilescreateform'>
          Add doggy profile
        </button>

      </div>
    </div>
  );
}  

export default DogProfilePage;
