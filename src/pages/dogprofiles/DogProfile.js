import React from "react";
import styles from "../../styles/DogProfile.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

import { Link, useHistory } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";

import Card from "react-bootstrap/Card";
import Media from "react-bootstrap/Media";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { MoreDropdown } from "../../components/MoreDropdown";

const DogProfile = (props) => {
  const {
        id,
        owner,
        profile_id,
        profile_image,
        // dog_profile_id,
        // dogprofile_id,
        dog_name,
        dog_age,
        dog_color,
        dog_bio,
        dog_profile_image,
        updated_at,
        dogProfilePage,
        // setDogProfiles,
    } = props;

      // const { profile, mobile, imageSize = 55 } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();

  // const { handleEdit, handleDelete } = setDogProfiles();
  
  const handleEdit = () => {
    history.push(`/dogprofiles/${id}/edit`);
  }

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/dogprofiles/${id}/`);
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
            {is_owner && dogProfilePage && (
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
        
       {dog_age && <Card.Text>{dog_age}</Card.Text>}
        
        
       {dog_color && <Card.Text>{dog_color}</Card.Text>}
       
       
       {dog_bio && <Card.Text>{dog_bio}</Card.Text>}

        {/* {dog_name && <Card.Title className="text-center">{dog_name}</Card.Title>}
        {dog_name && <Card.Text>{dog_name}</Card.Text>}
        
        {dog_age && <Card.Title className="text-center">{dog_age}</Card.Title>}
        {dog_age && <Card.Text>{dog_age}</Card.Text>}
        
        {dog_color && <Card.Title className="text-center">{dog_color}</Card.Title>}
        {dog_color && <Card.Text>{dog_color}</Card.Text>}
       
        {dog_bio && <Card.Title className="text-center">{dog_bio}</Card.Title>}
        {dog_bio && <Card.Text>{dog_bio}</Card.Text>}

        {dog_profile_image && <Card.Title className="text-center">{dog_profile_image}</Card.Title>}
        {dog_profile_image && <Card.Text>{dog_profile_image}</Card.Text>} */}

        <div className={styles.DogProfile}>
          {is_owner ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>See Doggy Health</Tooltip>}
            >

            <Link to={`/doghealth/DogHealth${id}`}>
              <i className="far fa-dog" />
            </Link>  
              
            </OverlayTrigger> 
          ) : currentUser ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>See Doggy Danger</Tooltip>}
            >
            
            <Link to={`/dogdanger/DogDanger${id}`}>
            <i className="far fa-dog" />
            </Link>
            
            </OverlayTrigger>
          
          )  : (
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>X</Tooltip>}
              >
                <i className="far fa-dog" />
              </OverlayTrigger>
          )}
        </div>

            {/* // ) : currentUser ? (
            //   <span onClick={handleDelete}>
            //     <i className={`far fa-dog ${styles.DogOutline}`} />
            //   </span>
            // ) : (
              // <OverlayTrigger */}
              {/* //   placement="top"
              //   overlay={<Tooltip>See Doggy Danger</Tooltip>}
              // >
              // <Link to={`/dogprofiles/${id}`}>
              //   <i className="far fa-dog" />
              // </Link>
              // </OverlayTrigger>
            // )} */}
            {/* <Link to={`/dogprofiles/${id}`}>
              <i className="far fa-dog" />
            </Link> */}
          {/* </div> */}
      </Card.Body>
    </Card>
  );
};
      
export default DogProfile;
