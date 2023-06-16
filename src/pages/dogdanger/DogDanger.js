import React from "react";
import styles from "../../styles/DogProfile.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

import { Link, useHistory } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";

import Card from "react-bootstrap/Card";
import Media from "react-bootstrap/Media";
import { MoreDropdown } from "../../components/MoreDropdown";

const DogDanger = (props) => {
  const {
        owner,
        id,

        updated_at,
        
        profile_id,
        profile_image,
        dog_profile_image,
        dog_name,
        
        bites_babies,
        bites_kids,
        bites_teenagers,
        bites_burglars,
        dangerously_cute,
        
        dogDangerPage,
      } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();
  
  const handleEdit = () => {
    history.push(`/dogdanger/${id}/edit`);
  }

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/dogdanger/${id}/`);
      history.goBack();
    } catch (err) {
      // console.log(err);
    }
  };


  return (
    <Card className={styles.dogDanger}>
      <Card.Body>
        <Media className="align-items-center justify-content-between">
        {/* <Link to={`/dogprofiles/${dog_profile_id}`}>
           <Avatar src={dog_profile_image} height={55} /> */}

           <Link to={`/profiles/${profile_id}`}>
           <Avatar src={profile_image} height={55} />
          {owner}
        </Link>
          <div className="my-3 d-flex align-items-center">
            <span><i className="fas fa-dog"></i>Doggy Danger</span>
            <span>{updated_at}</span>
            {is_owner && dogDangerPage && (
              <MoreDropdown
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            )}
          </div>
        </Media>
      </Card.Body>

      <Link to={`/dogdanger/${id}`}>
        <Card.Img class="card_image" src={dog_profile_image} alt={dog_name} />
      </Link>

      <Card.Body>  
        
        {bites_babies && <Card.Title className="text-center">Bites Babies?</Card.Title>}
        {bites_babies && <Card.Text>{bites_babies}</Card.Text>}

        {bites_kids && <Card.Title className="text-center">Bites Kids?</Card.Title>}
        {bites_kids && <Card.Text>{bites_kids}</Card.Text>}
        
        {bites_teenagers && <Card.Title className="text-center">Bites Teenagers?</Card.Title>}
        {bites_teenagers && <Card.Text>{bites_teenagers}</Card.Text>}
           
        {bites_burglars && <Card.Title className="text-center">Bites Burglars?</Card.Title>}
        {bites_burglars && <Card.Text>{bites_burglars}</Card.Text>}  

        {dangerously_cute && <Card.Title className="text-center">Dangeroulsy Cute?</Card.Title>}
        {dangerously_cute && <Card.Text>{dangerously_cute}</Card.Text>}
        
        </Card.Body>
    </Card>
        );
      };
      
export default DogDanger;
