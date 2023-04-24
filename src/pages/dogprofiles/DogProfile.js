// Custom Model 1

// class DogProfile(models.Model):

//     # owner = models.OneToOneField(User, on_delete=models.CASCADE)
//     # owner = models.OneToOneField(User, related_name='doggy_profile', on_delete=models.CASCADE)
//     # my_dog = models.OneToOneField(User, related_name='my_dog', on_delete=models.CASCADE)
//     owner = models.ForeignKey(User, on_delete=models.CASCADE)
//     # post = models.ForeignKey(Post, on_delete=models.CASCADE)
//     created_at = models.DateTimeField(auto_now_add=True)
//     updated_at = models.DateTimeField(auto_now=True)

//     dog_name = models.CharField(max_length=255, blank=True)
//     dog_age = IntegerField(default=0)
//     dog_color = CharField(max_length=255, blank=True)
//     dog_bio = models.TextField(blank=True)
//     dog_profile_image = models.ImageField(
//         upload_to='images/', default='../default_dog-profile_gtehul.png'
//     )


// import React from "react";
// import styles from "../../styles/Profile.module.css";
// import btnStyles from "../../styles/Button.module.css";
// import { useCurrentUser } from "../../contexts/CurrentUserContext";
// import { Link } from "react-router-dom";
// import Avatar from "../../components/Avatar";
// import { Button } from "react-bootstrap";
// import { useSetProfileData } from "../../contexts/ProfileDataContext";

// const DogProfile = (props) => {
//   const { dogprofile, mobile, imageSize = 55 } = props;
//   const { id, following_id, image, owner } = dogprofile;

//   const currentUser = useCurrentUser();
//   const is_owner = currentUser?.username === owner;

//   const { handleFollow } = useSetProfileData();

//   return (
//     <div
//       className={`my-3 d-flex align-items-center ${mobile && "flex-column"}`}
//     >
//       <div>
//         <Link className="align-self-center" to={`/dogprofiles/${id}`}>
//           <Avatar src={image} height={imageSize} />
//         </Link>
//       </div>
//       <div className={`mx-2 ${styles.WordBreak}`}>
//         <strong>{owner}</strong>
//       </div>
//       <div className={`text-right ${!mobile && "ml-auto"}`}>
//         {!mobile &&
//           currentUser &&
//           !is_owner &&
//           (following_id ? (
//             <Button
//               className={`${btnStyles.Button} ${btnStyles.BlackOutline}`}
//               onClick={() => {}}
//             >
//               unfollow
//             </Button>
//           ) : (
//             <Button
//               className={`${btnStyles.Button} ${btnStyles.Black}`}
//               onClick={() => handleFollow(dogprofile)}
//             >
//               follow
//             </Button>
//           ))}
//       </div>
//     </div>
//   );
// };

import React from "react";
import styles from "../../styles/DogProfile.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

import Card from "react-bootstrap/Card";
import Media from "react-bootstrap/Media";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

import { Link, useHistory } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";
import { MoreDropdown } from "../../components/MoreDropdown";

const Post = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    dog_name,
    dog_age,
    dog_color,
    dog_bio,
    dog_profile_image,
    
    updated_at,
    postPage,
    setPosts,
  } = props;
  
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

    return (
      <Card className={styles.DogProfile}>
        <Card.Body>
        <Media className="align-items-center justify-content-between">
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} height={55} />
            {owner}
          </Link>
          <div className="d-flex align-items-center">
            <span>{updated_at}</span>
            {is_owner && postPage && (
              <MoreDropdown
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            )}
          </div>
        </Media>
       </Card.Body>
       <Link to={`/dogprofiles/${id}`}>
        <Card.Img src={dog_name} alt={dog_name} />
      </Link>
      
      <Card.Body>
        {dog_name && <Card.Title className="text-center">{dog_name}</Card.Title>}
        {dog_age && <Card.Text>{dog_age}</Card.Text>}
        
        
        
        
        
        <div className={styles.PostBar}>
          {is_owner ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Sign in to edit your Doggy Profile!</Tooltip>}
            >
            ( : dog_name? (
              <span onClick={handleEdit}>
                <i className={`far fa-dog ${styles.DogOutline}`} />
              </span>
            ) : currentUser ? (
              <i className={`fas fa-dog ${styles.Dog}` }/>
            </OverlayTrigger>
          )}
        <OverlayTrigger
            placement="top"
            overlay={<Tooltip>Log in to edit Doggy profiles!</Tooltip>}
        >
            <i className="far fa-dog" />
        </OverlayTrigger>
        </div>
      </Card.Body>
    </Card>
  );    
};

export default DogProfile;