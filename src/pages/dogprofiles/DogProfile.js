import React from "react";
import styles from "../../styles/DogProfile.module.css";

import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Link, useHistory } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";

import Card from "react-bootstrap/Card";
import Media from "react-bootstrap/Media";

import { MoreDropdown } from "../../components/MoreDropdown";

// import { Image } from "react-bootstrap";

// import OverlayTrigger from "react-bootstrap/OverlayTrigger";

// import Tooltip from "react-bootstrap/Tooltip";

// import btnStyles from "../../styles/Button.module.css";

// import { Link } from "react-router-dom";

// import Button from "react-bootstrap/Button";

// import { useSetDogProfileData } from "../../contexts/DogProfileDataContext";

// import { Card } from "react-bootstrap";

const DogProfile = (props) => {
  const {
      id,
      owner,
      profile_id,
      profile_image,
      // dog_profile_id,
      dog_name,
      dog_age,
      dog_color,
      dog_bio,
      dog_profile_image,
      updated_at,
      dogProfilePage,
      // setDogProfiles,

      mobile,

      // created_at,
  } = props;

  // const { id, dog_profile_image, owner } = dogprofile; 

      const currentUser = useCurrentUser();
      const is_owner = currentUser?.username === owner;
      const history = useHistory();

      const handleEdit = () => {
        history.push(`/dogprofiles/${id}/edit`);
      };

      const handleDelete = async () => {
        try {
          await axiosRes.delete(`/dogprofiles/${id}/`);
          history.goBack();
        } catch (err) {
          // console.log(err);
        }
      };

//  const {handleEdit, handleDelete} = useSetDogProfile();

  return (
    <div
    className={`my-3 d-flex align-items-center ${mobile && "flex-column"}`}
    >
    
      <Card className={styles.DogProfile}>
        <Card.Body>
          <Media className="align-items-center justify-content-between">
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} height={55} />
            {owner}
          </Link>
          <div className="d-flex align-items-center">
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
          {dog_name && <Card.Text>{dog_name}</Card.Text>}
          
          {dog_age && <Card.Title className="text-center">{dog_age}</Card.Title>}
          {dog_age && <Card.Text>{dog_age}</Card.Text>}
          
          {dog_color && <Card.Title className="text-center">{dog_color}</Card.Title>}
          {dog_color && <Card.Text>{dog_color}</Card.Text>}
        
          {dog_bio && <Card.Title className="text-center">{dog_bio}</Card.Title>}
          {dog_bio && <Card.Text>{dog_bio}</Card.Text>}

          {dog_profile_image && <Card.Title className="text-center">{dog_profile_image}</Card.Title>}
          {dog_profile_image && <Card.Text>{dog_profile_image}</Card.Text>} 

          {/* <div className={`text-right ${!mobile && "ml-auto"}`}>
            {currentUser &&
            !is_owner && 
            (dog_profile_id ? (
            
            
              <Button
                className={`${btnStyles.Button} ${btnStyles.BlackOutline}`}
                onClick={() => handleEdit(dogprofile)}
              >
                Edit
              </Button>
            
            ) : (
            
              <Button
                className={`${btnStyles.Button} ${btnStyles.Black}`}
                onClick={() => handleDelete(dogprofile)}
              >
                delete
              </Button> */}
          
          {/* ))}  */}
          {/* </div>  */}
          
        </Card.Body>
      </Card>
    </div>  
  );
};

export default DogProfile;




//   return (
//     <Card className={styles.DogProfile}>
//       <Card.Body>
//         <Media className="align-items-center justify-content-between">
//         <Link to={`/dogprofiles/${dog_profile_id}`}>
//         {/* <Link to={`/profiles/${profile_id}`}> */}
//             {/* <Avatar src={dog_profile_image} height={55} /> */}
//             <Avatar src={profile_image} height={55} />
//             {owner}
//           </Link>
//           <div className="my-3 d-flex align-items-center">
//             <span>{updated_at}</span>
//             {is_owner && dogProfilePage && (
//               <MoreDropdown
//                 handleEdit={handleEdit}
//                 handleDelete={handleDelete}
//               />
//             )}
//           </div>
//         </Media>
//       </Card.Body>

//       <Link to={`/dogprofiles/${id}`}>
//         <Card.Img src={dog_profile_image} alt={dog_name} />
//       </Link>
//       <Card.Body>
//         {dog_name && <Card.Title className="text-center">{dog_name}</Card.Title>}
//         {dog_name && <Card.Text>{dog_name}</Card.Text>}
        
//         {dog_age && <Card.Title className="text-center">{dog_age}</Card.Title>}
//         {dog_age && <Card.Text>{dog_age}</Card.Text>}
        
//         {dog_color && <Card.Title className="text-center">{dog_color}</Card.Title>}
//         {dog_color && <Card.Text>{dog_color}</Card.Text>}
       
//         {dog_bio && <Card.Title className="text-center">{dog_bio}</Card.Title>}
//         {dog_bio && <Card.Text>{dog_bio}</Card.Text>}

//         {dog_profile_image && <Card.Title className="text-center">{dog_profile_image}</Card.Title>}
//         {dog_profile_image && <Card.Text>{dog_profile_image}</Card.Text>}
        
//         <div className={styles.PostBar}>
//           {is_owner ? (
//             <OverlayTrigger
//               placement="top"
//               overlay={<Tooltip>Edit dog
//  profile!</Tooltip>}
//             >
//               <i className="far fa-dog" />
//             </OverlayTrigger> 
             

//           // ) : dogprofile_id ? (
//           //   <span onClick={handleEdit}>
//           //     <i className={`fas fa-dog ${styles.Dog}`} />
//           //   </span>
//             ) : currentUser ? (
//               <span onClick={handleDelete}>
//                 <i className={`far fa-dog ${styles.DogOutline}`} />
//               </span>
//             ) : (
//               <OverlayTrigger
//                 placement="top"
//                 overlay={<Tooltip>Log in to edit dog
//  profiles!</Tooltip>}
//               >
//                 <i className="far fa-dog" />
//               </OverlayTrigger>
//             )}
//             {/* {likes_count} */}
//             <Link to={`/dogprofiles/${id}`}>
//               <i className="far fa-dog" />
//             </Link>
//           </div>
//       </Card.Body>
//     </Card>
//         );