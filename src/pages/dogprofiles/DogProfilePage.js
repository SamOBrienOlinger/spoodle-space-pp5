import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Asset from "../../components/Asset";
import appStyles from "../../App.module.css";
import NoResults from "../../assets/no-results.png";
import { axiosReq } from "../../api/axiosDefaults";

function DogProfilePage() {
  const { id } = useParams();
  const [dogProfile, setDogProfile] = useState(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const fetchDogProfile = async () => {
      try {
        const { data } = await axiosReq.get(`/dogprofiles/${id}/`);
        setDogProfile(data);
        setHasLoaded(true);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDogProfile();
  }, [id]);

  return (
    <div className={appStyles.Content}>
      {hasLoaded ? (
        dogProfile ? (
          <div>
            <h1>{dogProfile.dog_name}</h1>
            <p>Age: {dogProfile.dog_age}</p>
            <p>Color: {dogProfile.dog_color}</p>
            <p>Bio: {dogProfile.dog_bio}</p>
            {/* Render other dog profile details as needed */}
          </div>
        ) : (
          <Asset src={NoResults} message={`No dog profile found for ID ${id}`} />
        )
      ) : (
        <Asset spinner />
      )}
    </div>
  );
}

export default DogProfilePage;


// import React, { useEffect, useState } from "react";
// import Container from "react-bootstrap/Container";
// import DogProfile from "./DogProfile";
// import { axiosReq } from "../../api/axiosDefaults";
// import { useCurrentUser } from "../../contexts/CurrentUserContext";

// function DogProfilePage() {
//   const currentUser = useCurrentUser();
//   const [dogprofile, setDogProfile] = useState(null);

//   useEffect(() => {
//     const fetchDogProfile = async () => {
//       try {
//         const response = await axiosReq.get(`/dogprofiles/${currentUser.id}/`);
//         const dogprofile = response.data;
//         setDogProfile(dogprofile);
//       } catch (err) {
//         console.log(err);
//       }
//     };

//     if (currentUser) {
//       fetchDogProfile();
//     }
//   }, [currentUser]);

//   return (
//     <Container>
//       {dogprofile ? (
//         <DogProfile {...dogprofile} dogProfilePage />
//       ) : (
//         <span>No dog profile found for the current user.</span>
//       )}
//     </Container>
//   );
// }

// export default DogProfilePage;





// import React, { useState } from "react";
// import Col from "react-bootstrap/Col";
// import Row from "react-bootstrap/Row";
// import Container from "react-bootstrap/Container";
// import appStyles from "../../App.module.css";
// import PopularProfiles from "../profiles/PopularProfiles";
// // import { useParams } from "react-router";
// // import { axiosReq } from "../../api/axiosDefaults";
// import DogProfile from "./DogProfile";
// import DogProfileCreateForm from "./DogProfileCreateForm";
// // import { useCurrentUser } from "../../contexts/CurrentUserContext";


// function DogProfilePage() {
//   // const { id } = useParams();
//   const [dogprofile, setDogProfile] = useState({ results: [] });
//   // const currentUser = useCurrentUser();

//   // useEffect(() => {
//   //   const handleMount = async () => {
//   //     try {
//   //       const [{ data: dogprofile }] = await Promise.all([
//   //         axiosReq.get(`/dogprofiles/${id}/`),
//   //       ]);
//   //       setDogProfile({ results: [dogprofile] });
//   //     } catch (err) {
//   //       // Handle error
//   //     }
//   //   };

//   //   handleMount();
//   // }, [id]);

//   return (
//     <Container className={appStyles.Content}>
//       <Row className="h-100">
//         <Col className="py-2 p-0 p-lg-2" lg={8}>
//           <PopularProfiles mobile />
//           <DogProfile {...dogprofile.results[0]} dogProfilePage />
//             <DogProfileCreateForm
//               profile_id={dogprofile.results[0]?.profile_id}
//               // dogprofile={id}
//               setDogProfile={setDogProfile}
//             />
//           ) : (
//             <span>No dog profiles yet, be the first to comment!</span>
//           )
//         </Col>
//         <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
//           <PopularProfiles />
//         </Col>
//       </Row>
//     </Container>
//   );
// }
  

// export default DogProfilePage;