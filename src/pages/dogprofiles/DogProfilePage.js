import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
// import Container from "react-bootstrap/Container";
// import appStyles from "../../App.module.css";
// import PopularProfiles from "../profiles/PopularProfiles";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import DogProfile from "./DogProfile";
// import DogProfileCreateForm from "./DogProfileCreateForm";
// import { useCurrentUser } from "../../contexts/CurrentUserContext";


function DogProfilePage() {
  const { id } = useParams();
  const [dogprofile, setDogProfile] = useState({ results: [] });
  // const currentUser = useCurrentUser();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: dogprofile }] = await Promise.all([
          axiosReq.get(`/dogprofiles/${id}/`),
        ]);
        setDogProfile({ results: [dogprofile] });
      } catch (err) {
        // Handle error
      }
    };

    handleMount();
  }, [id]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        {/* <PopularProfiles mobile /> */}
        <DogProfile {...dogprofile.results[0]} dogProfilePage />
        {/* <Container className={appStyles.Content}>
    {currentUser ? (
      <DogProfileCreateForm
        profile_id={dogprofile.results[0]?.profile_id}
        dogprofile={id}
        setDogProfile={setDogProfile}
      />
    ) : (
      <span>No dog profiles yet, be the first to comment!</span>
    )}
  </Container> */}
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        {/* <PopularProfiles /> */}
      </Col>
    </Row>
  );
}

export default DogProfilePage;


  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const [{ data: pageProfile }] =
  //         await Promise.all([
  //           axiosReq.get(`/profiles/${id}/`),
  //           axiosReq.get(`/dogprofiles/?owner__profile=${id}`),
  //         ]);
  //       setDogProfileData((prevState) => ({
  //         ...prevState,
  //         pageProfile: { results: [pageProfile] },
  //       }));
  //       // setDogProfiles(dogProfiles);
  //       // setHasLoaded(true);
  //     } catch (err) {
  //       // console.log(err);
  //     }
  //   };
  //   fetchData();
  // }, [id, setDogProfileData]);


  // const createDogProfile = (
  //   <>
  //     {profile?.is_owner && <ProfileEditDropdown id={profile?.id} />}
  //     <Row noGutters className="px-3 text-center">
  //       <Col lg={3} className="text-lg-left">
  //         <Image
  //           className={styles.DogProfileImage}
  //           roundedCircle
  //           src={profile?.image}
  //         />
  //       </Col>
        
  //       {profile?.content && <Col className="p-3">{profile.content}</Col>}
  //     </Row>
  //   </>
  // );
  // const createDogProfile = (
  //   <>
  //     {profile?.is_owner && <ProfileEditDropdown id={profile?.id} />}
  //     <hr />
  //     <p className="text-center">{profile?.owner}'s posts</p>
  //     <hr />
  //     {dogProfiles.results.length ? (
  //     // {dogPProfiles?.results?.length ? ( 
  //       <InfiniteScroll
  //         children={dogProfiles.results.map((post) => (
  //           <DogProfile key={DogProfile.id} {...post} setPosts={setDogProfiles} />
  //         ))}
  //         dataLength={dogProfiles.results.length}
  //         loader={<Asset spinner />}
  //         hasMore={!!dogProfiles.next}
  //         next={() => fetchMoreData(dogProfiles, setDogProfiles)}
  //       />
  //     ) : (
  //       <Asset
  //         src={NoResults}
  //         message={`No results found, ${profile?.owner} hasn't created a dog
//  profile yet.`}
  //       />
  //     )}
  //   </>
  // );

  //   return (
  //     <Row>
  //       <Col className="py-2 p-0 p-lg-2" lg={8}>
  //         {/* <PopularProfiles mobile /> */}
  //         <Container className={appStyles.Content}>
            
  //             <>
  //               {createDogProfile}
  //             </>

  //             <Asset spinner />

  //         </Container>
  //       </Col>
  //       <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
  //         {/* <PopularProfiles /> */}
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
// }


              /* {currentUser ? (
              <DogProfileCreateForm    
                  dog_name =
                  dog_age =
                  dog_color =
                  dog_bio =
                  dog_profile_image={dog_profile_image}
                />
              
              ) : null} */

              /* dogprofile_id={currentUser.profile_id}
              dog_profile_image={dog_profile_image}
              dogprofile={id}
              setDogProfile={setDogProfile} */

          /* {currentUser ? (
            <Row
            dogprofile_id={currentUser.profile_id}
            dog_profile_image={dog_profile_image}
            dogprofile={id}
            setDogProfile={setDogProfile}
          />
        ) : null} */