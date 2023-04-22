import React, { useState } from "react";
// import styles from "../../styles/Profile.module.css";
import styles from "../../styles/Comment.module.css";
// import Card from "react-bootstrap/Card";
import Media from "react-bootstrap/Media";
// import OverlayTrigger from "react-bootstrap/OverlayTrigger";
// import Tooltip from "react-bootstrap/Tooltip";
import { MoreDropdown } from "../../components/MoreDropdown";

import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";

import { axiosRes } from "../../api/axiosDefaults";

import DogProfileEditForm from "./DogProfileEditForm"

// import { useSetProfileData } from "../../contexts/ProfileDataContext";

const DogProfile = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    updated_at,
    dogprofile,
    setDogProfile,
  } = props;

  const { dog_name, dog_age, dog_color, dog_bio, dog_profile_image,} = dogprofile;

  const [showEditForm, setShowEditForm] = useState(false);
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/dogprofile/${id}/`);
      setDogProfile((prevDogprofile) => ({
        results: [
          {
            ...prevDogprofile.results[0],
          },
        ],
      }));

      setDogProfile((prevDogprofile) => ({
        ...prevDogprofile,
        results: prevDogprofile.results.filter((dogprofile) => dogprofile.id !== id),
      }));
    } catch (err) {}
  };

  return (
    <>
      <hr />
      <Media>
        <Link to={`/profiles/${profile_id}`}>
          <Avatar src={profile_image} />
        </Link>
        <Media.Body className="align-self-center ml-2">
          <span className={styles.Owner}>{owner}</span>
          <span className={styles.Date}>{updated_at}</span>
          {showEditForm ? (
            <DogProfileEditForm
              // id={id}
              // profile_id={dogprofile_id}
              // content={content}
              // profileImage={profile_image}
              id = {profile_id}
              profile_id = {dogprofile}
              dogName = {dog_name}
              dogAge = {dog_age}
              dogColor = {dog_color}
              dogBio = {dog_bio}
              DogProfileImage = {dog_profile_image}
              setDogProfile={setDogProfile}
              setShowEditForm={setShowEditForm}
            />
          ) : (
            // <p>{content}</p>
            
            <div> 
              <p>{profile_id}</p>
              <p>{dogprofile}</p>
              <P>{dog_name}</P>
              <P>{dog_age}</P>
              <P>{dog_color}</P>
              <P>{dog_bio}</P>
              <P>{dog_profile_image}</P>
            </div>
          )}
        </Media.Body>
        {is_owner && !showEditForm && (
          <MoreDropdown
            handleEdit={() => setShowEditForm(true)}
            handleDelete={handleDelete}
          />
        )}
      </Media>
    </>
  );
};


//   const currentUser = useCurrentUser();
//   const is_owner = currentUser?.username === owner;
//   const history = useHistory();
  
//   const handleEdit = () => {
//     history.push(`/DogProfiles/${id}/edit`);
//   };

//   const handleDelete = async () => {
//     try {
//       await axiosRes.delete(`/DogProfiles/${id}/`);
//       history.goBack();
//     } catch (err) {
//       // console.log(err);
//     }
//   };

//   const handleLike = async () => {
//     try {
//       const { data } = await axiosRes.post("/likes/", { post: id });
//       setPosts((prevPosts) => ({
//         ...prevPosts,
//         results: prevPosts.results.map((post) => {
//           return post.id === id
//             ? { ...post, likes_count: post.likes_count + 1, like_id: data.id }
//             : post;
//         }),
//       }));
//     } catch (err) {
//       // console.log(err);
//     }
//   };
    
//   // const { handleFollow } = useSetProfileData();

//   return (
//     <Card>
//     <Card.Body>
//       <Media className="align-items-center justify-content-between">
//         <Link to={`/profiles/${profile_id}`}>
//           <Avatar src={profile_image} height={55} />
//           {owner}
//         </Link>
//         <div className="d-flex align-items-center">
//           <span>{updated_at}</span>
//           {is_owner && DogProfilePage && (
//             <MoreDropdown
//               handleEdit={handleEdit}
//               handleDelete={handleDelete}
//             />
//           )}
//         </div>
//       </Media>
//     </Card.Body>

//     <Link to={`/DogProfiles/${id}`}>
//       <Card.Img src={image} alt={title} />
//     </Link>
//     <Card.Body>
//         {title && <Card.Title className="text-center">{title}</Card.Title>}
//         {content && <Card.Text>{content}</Card.Text>}
//         <div className={styles.PostBar}>
//           {is_owner ? (
//             <OverlayTrigger
//               placement="top"
//               overlay={<Tooltip>You can't edit someone else's dog profile!</Tooltip>}
//             >
//               <i className="far fa-heart" />
//             </OverlayTrigger>
//             ) : (
//               <OverlayTrigger
//                 placement="top"
//                 overlay={<Tooltip>Log in to edit your dog profile!</Tooltip>}
//               >
//                 <i className="far fa-heart" />
//               </OverlayTrigger>
//             )}
//         </div>
//       </Card.Body>
//     </Card>
//   );
// };

export default DogProfile;