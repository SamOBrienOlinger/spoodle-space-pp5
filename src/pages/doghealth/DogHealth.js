import React from "react";
import styles from "../../styles/DogHealth.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

import { Link, useHistory } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";

// import { Image } from "react-bootstrap";

import Card from "react-bootstrap/Card";
import Media from "react-bootstrap/Media";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { MoreDropdown } from "../../components/MoreDropdown";
// import { Button } from "react-bootstrap";

const DogHealth = (props) => {
  const {
        id,
        owner,
        profile_id,
        profile_image,

        dog_name,
        
        vet_name,
        vet_phone,
        vet_email,
        chipped,
        kennel_cough,
        rabies,
        allergies,
        
        dog_profile_image,
        updated_at,
        
        dogHealthPage,
    } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();
  
  const handleEdit = () => {
    history.push(`/doghealth/${id}/edit`);
  }

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/doghealth/${id}/`);
      history.goBack();
    } catch (err) {
      // console.log(err);
    }
  };

  return (
    <Card className={styles.DogProfile}>
      <Card.Body>
        <Media className="align-items-center justify-content-between">
        {/* <Link to={`/dogprofiles/${dogprofile_id}`}> */}
        <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} height={55} />
            {/* <Avatar src={dog_profile_image} height={55} /> */}
            {owner}
          </Link>
          <div className="my-3 d-flex align-items-center">
            <span>{updated_at}</span>
            {is_owner && dogHealthPage && (
              <MoreDropdown
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            )}
          </div>
        </Media>
      </Card.Body>

      <Link to={`/dogprofiles/${id}`}>
        <Card.Img src={dog_profile_image} alt={dog_name} />
      </Link>

      <Card.Body>

       {dog_name && <Card.Title className="text-center">{dog_name}</Card.Title>}
        
       {vet_name && <Card.Text>{vet_name}</Card.Text>}
        
       {vet_phone && <Card.Text>{vet_phone}</Card.Text>}
       
       {vet_email && <Card.Text>{vet_email}</Card.Text>}

       {chipped && <Card.Text>{chipped}</Card.Text>}

       {kennel_cough && <Card.Text>{kennel_cough}</Card.Text>}

       {rabies && <Card.Text>{rabies}</Card.Text>}

       {allergies && <Card.Text>{allergies}</Card.Text>}

       {dog_profile_image && <Card.Text>{dog_profile_image}</Card.Text>}

       <div className={styles.PostBar}>
          {/* {current user? ( */}

            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Click to find out more about <span className="text-center">{dog_name}</span> </Tooltip>}
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
   </Card.Body>
  </Card>
  );
};

export default DogHealth;