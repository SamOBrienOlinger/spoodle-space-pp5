// Custom Model 3

// class dog
Danger(models.Model):

// owner = models.ForeignKey(User, on_delete=models.CASCADE)
// created_at = models.DateTimeField(auto_now_add=True)
// updated_at = models.DateTimeField(auto_now=True)
// bites_babies = models.TextField(blank=True)
// bites_kids = models.TextField(blank=True)
// bites_teenagers = models.TextField(blank=True)
// bites_burglars = models.TextField(blank=True)
// bites_bolsonaro = models.TextField(blank=True)
// dangerously_cute = models.TextField(blank=True

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

const dog
Danger = (props) => {
  const {
        owner,
        id,
        created_at,
        updated_at,

        bites_babies,
        bites_kids,
        bites_teenagers,
        bites_burglars,
        bites_bolsonaro,
        bites_thatcher,
        bites_reagan,
        bites_bush,
        bites_wbush,
        dangerously_cute,
      } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();

  // const { handleEdit, handleDelete } = setDogProfiles();
  
  const handleEdit = () => {
    history.push(`/dog
danger/${id}/edit`);
  }

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/dog
danger/${id}/`);
      history.goBack();
    } catch (err) {
      // console.log(err);
    }
  };


  return (
    <Card className={styles.dog
Danger}>
      <Card.Body>
        <Media className="align-items-center justify-content-between">
        <Link to={`/dogprofiles/${dog_profile_id}`}>
        {/* <Link to={`/profiles/${profile_id}`}> */}
            {/* <Avatar src={dog_profile_image} height={55} /> */}
            <Avatar src={profile_image} height={55} />
            {owner}
          </Link>
          <div className="my-3 d-flex align-items-center">
            <span>{updated_at}</span>
            {is_owner && dog
DangerPage && (
              <MoreDropdown
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            )}
          </div>
        </Media>
      </Card.Body>

      <Link to={`/dog
dangers/${id}`}>
        <Card.Img src={dog_profile_image} alt={dog_name} />
      </Link>
      <Card.Body>  
        
        {bites_babies && <Card.Title className="text-center">{}</Card.Title>}
        {bites_babies && <Card.Text>{bites_babies}</Card.Text>}
        
        {bites_teenagers && <Card.Title className="text-center">{}</Card.Title>}
        {bites_teenagers && <Card.Text>{bites_teenagers}</Card.Text>}
           
        {bites_bolsonaro && <Card.Title className="text-center">{bites_bolsonaro}</Card.Title>}
        {bites_bolsonaro && <Card.Text>{bites_bolsonaro}</Card.Text>}

        {bites_thatcher && <Card.Title className="text-center">{bites_thatcher}</Card.Title>}
        {bites_thatcher && <Card.Text>{bites_thatcher}</Card.Text>}
        
        {bites_reagan && <Card.Title className="text-center">{bites_reagan}</Card.Title>}
        {bites_reagan && <Card.Text>{bites_reagan}</Card.Text>}

        {bites_bush && <Card.Title className="text-center">{bites_wbush}</Card.Title>}
        {bites_bush && <Card.Text>{bites_bush}</Card.Text>}

        {bites_wbush && <Card.Title className="text-center">{bites_wbush}</Card.Title>}
        {bites_wbush && <Card.Text>{bites_wbush}</Card.Text>}

        {dangerously_cute && <Card.Title className="text-center">{dangerously_cute}</Card.Title>}
        {dangerously_cute && <Card.Text>{dangerously_cute}</Card.Text>}
        

                
        <div className={styles.PostBar}>
          {is_owner ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Edit dog
 danger!</Tooltip>}
            >
              <i className="far fa-dog" />
            </OverlayTrigger> 
             

          // ) : dogprofile_id ? (
          //   <span onClick={handleEdit}>
          //     <i className={`fas fa-dog ${styles.Dog}`} />
          //   </span>
            ) : currentUser ? (
              <span onClick={handleDelete}>
                <i className={`far fa-dog ${styles.DogOutline}`} />
              </span>
            ) : (
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Log in to edit dog
 profiles!</Tooltip>}
              >
                <i className="far fa-dog" />
              </OverlayTrigger>
            )}
            {/* {likes_count} */}
            <Link to={`/dog
dangers/${id}`}>
              <i className="far fa-dog" />
            </Link>
          </div>
      </Card.Body>
    </Card>
        );
      };
      
export default dog
Danger;