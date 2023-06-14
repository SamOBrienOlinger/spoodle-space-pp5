import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import appStyles from "../../App.module.css";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import PopularProfiles from "../profiles/PopularProfiles";
import NoResults from "../../components/NotFound";
import DogDanger from "./DogDanger";


function DogDangerPage() {
  const { id } = useParams();
  const [dogDanger, setDogDanger] = useState(null);
  const currentUser = useCurrentUser();

  useEffect(() => {
    const fetchDogDanger = async () => {
      try {
        const { data } = await axiosReq.get(`/dogdanger/${id}`);
        console.info(`Hello here's the User's Doggy Danger details Page${JSON.stringify(data)}`);
        setDogDanger(data);
      } catch (error) {
        console.error(`no profile? ${JSON.stringify(currentUser)} == ${id}`);
      }
    };

    fetchDogDanger();
  }, [id, currentUser]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <PopularProfiles mobile />

        {dogDanger ? (
          <DogDanger {...dogDanger} setDogDanger={setDogDanger} dogDangerPage />
        ) : (
          <NoResults message={`No results found, the doggy's danger details do not exist.`} />
        )}

        <Container className={appStyles.Content}>
          {dogDanger?.profile_id && (
            <DogDanger profile_id={currentUser.profile_id} dogdanger={id} />
          )}
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        <PopularProfiles />
      </Col>
    </Row>
  );
}

export default DogDangerPage;