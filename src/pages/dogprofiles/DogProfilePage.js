import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import PopularProfiles from "../profiles/PopularProfiles";
import NoResults from "../../components/NotFound";
import DogProfile from "./DogProfile";


function DogProfilePage() {
  const { id } = useParams();
  const [dogProfile, setDogProfile] = useState(null);
  const currentUser = useCurrentUser();

  useEffect(() => {
    const fetchDogProfile = async () => {
      try {
        const { data } = await axiosReq.get(`/dogprofiles/${id}`);
        console.info(`Hello here's the User's Doggy Profile details${JSON.stringify(data)}`);
        setDogProfile(data);
      } catch (error) {
        console.error(`no profile? ${JSON.stringify(currentUser)} == ${id}`);
      }
    };

    fetchDogProfile();
  }, [id, currentUser]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <PopularProfiles mobile />

        {dogProfile ? (
          <DogProfile {...dogProfile} setDogProfile={setDogProfile} dogProfilePage />
        ) : (
          <NoResults message={`No results found, the doggy's profile details do not exist.`} />
        )}
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        <PopularProfiles />
      </Col>
    </Row>
  );
}

export default DogProfilePage;