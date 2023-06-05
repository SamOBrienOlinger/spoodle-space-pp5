import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import appStyles from "../../App.module.css";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import DogProfile from "./DogProfile";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import PopularProfiles from "../profiles/PopularProfiles";
import NoResults from "../../components/NotFound";

function DogProfilePage() {
  const { id } = useParams();
  const [dogProfile, setDogProfile] = useState(null);
  const currentUser = useCurrentUser();

  useEffect(() => {
    const fetchDogProfile = async () => {
      try {
        const { data } = await axiosReq.get(`/dogprofiles/${id}`);
        setDogProfile(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDogProfile();
  }, [id]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <PopularProfiles mobile />

        {dogProfile ? (
          <DogProfile {...dogProfile} setDogProfile={setDogProfile} dogProfilePage />
        ) : (
          <NoResults message={`No results found, the dog profile does not exist.`} />
        )}

        <Container className={appStyles.Content}>
          {dogProfile?.profile_id && (
            <DogProfile profile_id={currentUser.profile_id} dogprofile={id} />
          )}
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        <PopularProfiles />
      </Col>
    </Row>
  );
}

export default DogProfilePage;

// import React, { useEffect, useState } from "react";
// import Col from "react-bootstrap/Col";
// import Row from "react-bootstrap/Row";
// import Container from "react-bootstrap/Container";
// import appStyles from "../../App.module.css";
// import { useParams } from "react-router";
// import { axiosReq } from "../../api/axiosDefaults";
// import DogProfile from "./DogProfile";
// import { useCurrentUser } from "../../contexts/CurrentUserContext";
// import PopularProfiles from "../profiles/PopularProfiles";
// import NoResults from "../../components/NotFound";

// function DogProfilePage() {
//   const { id } = useParams();
//   const [dogProfile, setDogProfile] = useState(null);
//   const currentUser = useCurrentUser();

//   useEffect(() => {
//     const fetchDogProfile = async () => {
//       try {
//         const { data } = await axiosReq.get(`/dogprofiles/${id}`);
//         setDogProfile(data);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchDogProfile();
//   }, [id]);

//   return (
//     <Row className="h-100">
//       <Col className="py-2 p-0 p-lg-2" lg={8}>
//         <PopularProfiles mobile />

//         {dogProfile ? (
//           <>
//             <DogProfile {...dogProfile} setDogProfile={setDogProfile} dogProfilePage />
//             <Container className={appStyles.Content}>
//               <DogProfile profile_id={currentUser.profile_id} dogprofile={id} />
//             </Container>
//           </>
//         ) : (
//           <NoResults message={`No results found, the dog profile does not exist.`} />
//         )}
//       </Col>
//       <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
//         <PopularProfiles />
//       </Col>
//     </Row>
//   );
// }

// export default DogProfilePage;



// import React, { useEffect, useState } from "react";
// import Col from "react-bootstrap/Col";
// import Row from "react-bootstrap/Row";
// import Container from "react-bootstrap/Container";
// import appStyles from "../../App.module.css";
// import { useParams } from "react-router";
// import { axiosReq } from "../../api/axiosDefaults";
// import DogProfile from "./DogProfile";
// import { useCurrentUser } from "../../contexts/CurrentUserContext";
// // import Asset from "../../components/Asset";
// import PopularProfiles from "../profiles/PopularProfiles";
// import NoResults from "../../components/NotFound";

// function DogProfilePage() {
//   const { id } = useParams();
//   const [dogprofile, setDogProfile] = useState({ results: [] });

//   const currentUser = useCurrentUser();

//   const [profile, setProfile] = useState(null);

//   useEffect(() => {
//     const handleMount = async () => {
//       try {
//         const [{ data: dogprofile }] = await Promise.all([
//           axiosReq.get(`/dogprofiles/${id}`),
//         ]);
//         setDogProfile({ results: [dogprofile] });
//         console.info(`dogprofile: ${JSON.stringify(dogprofile)}`);
//         setProfile(dogprofile);
//       } catch (err) {
//         console.log(err);
//       }
//     };

//     handleMount();
//   }, [id]);

//   return (
//     <Row className="h-100">
//       <Col className="py-2 p-0 p-lg-2" lg={8}>
//         <PopularProfiles mobile />


        
        // <DogProfile {...dogprofile.results[0]} setDogProfile={setDogProfile} dogProfilePage />
        // <Container className={appStyles.Content}>
        //   {dogprofile?.results?.length > 0 ? (
        //     <DogProfile
        //     profile_id={currentUser.profile_id}
        //     dogprofile = {id}
        //     />
        //   ) : (
        //     <Asset
        //       src={NoResults}
        //       message={`No results found, ${profile?.owner} hasn't added a doggy profile yet.`}
        //     />
//             <NoResults message={`No results found, ${profile?.owner} hasn't added a doggy profile yet.`} />

//           )}




//         </Container>
//       </Col>
//       <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
//         <PopularProfiles />
//       </Col>
//     </Row>
//   );
// }

// export default DogProfilePage;



// // import React, { useEffect, useState } from "react";
// // import { useParams } from "react-router-dom";

// // import Asset from "../../components/Asset";
// // import appStyles from "../../App.module.css";
// // import NoResults from "../../assets/no-results.png";
// // import { axiosReq } from "../../api/axiosDefaults";
// // import { Card } from "react-bootstrap";

// // function DogProfilePage() {
// //   const { id } = useParams();
// //   const [dogProfile, setDogProfile] = useState(null);
// //   const [hasLoaded, setHasLoaded] = useState(false);

// //   useEffect(() => {
// //     const fetchDogProfile = async () => {
// //       try {
// //         const { data } = await axiosReq.get(`/dogprofiles/${id}/`);
// //         setDogProfile(data);
// //         setHasLoaded(true);
// //       } catch (error) {
// //         console.error(error);
// //       }
// //     };

// //     fetchDogProfile();
// //   }, [id]);

// //   return (
// //     <div className={appStyles.Content}>
// //       {hasLoaded ? (
// //         dogProfile ? (
// //           <div>
// //             <h1>{dogProfile.dog_name}</h1>

// //             <Card.Img src={dogProfile.dog_profile_image} alt={dogProfile.dog_name} />

// //             <p>Age: {dogProfile.dog_age}</p>
// //             <p>Color: {dogProfile.dog_color}</p>
// //             <p>Bio: {dogProfile.dog_bio}</p>
// //           </div>
// //         ) : (
// //           <Asset src={NoResults} message={`No dog profile found for {profile?.owner} ${id}`} />
// //         )
// //       ) : (
// //         <Asset spinner />
// //       )}
// //     </div>
// //   );
// // }

// // export default DogProfilePage;
