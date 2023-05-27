// Custom Model 3

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
// import OverlayTrigger from "react-bootstrap/OverlayTrigger";
// import Tooltip from "react-bootstrap/Tooltip";
import { MoreDropdown } from "../../components/MoreDropdown";

const DogDanger = (props) => {
  const {
        owner,
        id,
        updated_at,
        
        profile_id,
        profile_image,

        // dog_profile_id,
        dog_profile_image,

        dog_name,

        dogDangerPage,

        bites_babies,
        bites_kids,
        bites_teenagers,
        bites_burglars,
        bites_bolsonaro,
        bites_trump,
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
        
        {bites_babies && <Card.Title className="text-center">{}</Card.Title>}
        {bites_babies && <Card.Text>{bites_babies}</Card.Text>}

        {bites_kids && <Card.Title className="text-center">{}</Card.Title>}
        {bites_kids && <Card.Text>{bites_kids}</Card.Text>}
        
        {bites_teenagers && <Card.Title className="text-center">{}</Card.Title>}
        {bites_teenagers && <Card.Text>{bites_teenagers}</Card.Text>}
           
        {bites_burglars && <Card.Title className="text-center">{}</Card.Title>}
        {bites_burglars && <Card.Text>{bites_burglars}</Card.Text>}  
      
        {bites_trump && <Card.Title className="text-center">{}</Card.Title>}
        {bites_trump && <Card.Text>{bites_trump}</Card.Text>}

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
        
        </Card.Body>
    </Card>
        );
      };
      
export default DogDanger;
                
        /* <div className={styles.PostBar}>
          {is_owner ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Add or Edit your doggy's danger!</Tooltip>}
            >
              <i className="far fa-dog" />
            </OverlayTrigger> 

            ) : currentUser ? (
              <span onClick={handleEdit}>
                <i className={`far fa-dog ${styles.DogOutline}`} />
              </span>
            ) : (
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Log in to Add or edit your doggy's danger!</Tooltip>}
              >
                <i className="far fa-dog" />
              </OverlayTrigger>
            )}

            <Link to={`/dogdangers/${id}`}>
              <i className="far fa-dog" />
            </Link>
          </div> */
      /* </Card.Body>
    </Card>
        );
      };
      
export default DogDanger; */