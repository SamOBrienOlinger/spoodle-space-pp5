import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import PopularProfiles from "../profiles/PopularProfiles";
import NoResults from "../../components/NotFound";
import DogHealth from "./DogHealth";

function DogHealthPage() {
  const { id } = useParams();
  const [dogHealth, setDogHealth] = useState(null);
  const currentUser = useCurrentUser();

  useEffect(() => {
    const fetchDogHealth = async () => {
      try {
        const { data } = await axiosReq.get(`/doghealth/${id}/`);
        console.info(
          `Hello here's the User's Doggy Health details page${JSON.stringify(data)}`
        );
        setDogHealth(data);
      } catch (error) {
        console.error(`no profile? ${JSON.stringify(currentUser)} == ${id}`);
      }
    };

    fetchDogHealth();
  }, [id, currentUser]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <PopularProfiles mobile />

        {dogHealth ? (
          <DogHealth {...dogHealth} setDogHealth={setDogHealth} dogHealthPage />
        ) : (
          <NoResults
            message={`No results found, the doggy's health details do not exist.`}
          />
        )}
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        <PopularProfiles />
      </Col>
    </Row>
  );
}

export default DogHealthPage;
