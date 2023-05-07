import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

// import Asset from "../../components/Asset";

import styles from "../../styles/DogProfilePage.module.css";
import appStyles from "../../App.module.css";
// import btnStyles from "../../styles/Button.module.css";

// import PopularProfiles from "..profiles/PopularProfiles";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import DogHealth from "./DogHealth";
import { Form } from "react-bootstrap";

import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { Link } from "react-router-dom";

function DogHealthPage() {

    const { id } = useParams();
    const [doghealth, setDogHealth] = useState({ results: [] });
  
    const currentUser = useCurrentUser();
    const dog_profile_image = currentUser?.dog_profile_image;
    // const [comments, setComments] = useState({ results: [] });
    // const [dogprofiles] = useState({ results: [] });

    useEffect(() => {
      const handleMount = async () => {
        try {
          const [{ data: doghealth }] = await Promise.all([
              // const [{ data: dogprofile }, { data: comments }] = await Promise.all([
            axiosReq.get(`/doghealth/${id}`),
              // axiosReq.get(`/comments/?dogprofile=${id}`),
            ]);
            setDogHealth({ results: [doghealth] });
            // setComments(comments);
        } catch (err) {
            // console.log(err);
        }
    };
    
    handleMount();
  }, [id]);

    return (
      <Row className="h-100">
        <Col className="py-2 p-0 p-lg-2" lg={8}>
          <DogHealth {...doghealth.results[0]} setDogHealth={setDogHealth} dogHealthPage />
            <Container className={appStyles.Content}>
              {currentUser ? (
                <Form className={styles.DogHealth}
                  dogprofile_id={currentUser.profile_id}
                  dogProfileImage={dog_profile_image}
                  doghealth={id}
                  setDogHealth={setDogHealth}
                />
                  // setComments={setComments}
              ) : (
                    <span>No dog health details...yet</span>
                  )}

<div className={styles.PostBar}>
          {/* {is_owner ? ( */}

          <div className={"text-center"}>
            <OverlayTrigger
              placement="top"
            //   overlay={<Tooltip>Go back to <span className="text-center">{dog_name}</span>'s profiles</Tooltip>}
              overlay={<Tooltip>Go back to dog profile</Tooltip>}
            >

            <Link to={`/dogprofiles/${id}`}>
              <i className="far fa-dog" />
            </Link>  
              
            </OverlayTrigger> 
          {/* ) : currentUser ? ( */}
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>See Doggy Danger</Tooltip>}
            >
            
            <Link to={`/dogdanger/${id}`}>
            <i className="far fa-dog" />
            </Link>
            
            </OverlayTrigger>
          </div>
        </div>

        </Container>
      </Col>
    </Row>  
  );
}

export default DogHealthPage