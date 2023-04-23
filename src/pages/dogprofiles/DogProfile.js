import React from "react";
// import styles from "../../styles/Post.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

import Card from "react-bootstrap/Card";
import Media from "react-bootstrap/Media";
// import OverlayTrigger from "react-bootstrap/OverlayTrigger";
// import Tooltip from "react-bootstrap/Tooltip";

import { Link, useHistory } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";
import { MoreDropdown } from "../../components/MoreDropdown";

const DogProfile = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    updated_at,
    // 'id',
    // 'owner',
    // 'is_owner',
    // 'created_at',
    // 'updated_at',
    // 'profile_id',

    dog_name,
    dog_age,
    dog_color,
    dog_bio,
    dog_profile_image,

    dogProfilePage,
    setDogProfiles
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();
  const [showEditForm, setShowEditForm] = useState(false);

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

  // const handleLike = async () => {
  //   try {
  //     const { data } = await axiosRes.post("/likes/", { post: id });
  //     setDogProfiles((prevDogProfiles) => ({
  //       ...prevDogProfiles,
  //       results: prevDogProfiles.results.map((post) => {
  //         return post.id === id
  //           ? { ...post, likes_count: post.likes_count + 1, like_id: data.id }
  //           : post;
  //       }),
  //     }));
  //   } catch (err) {
  //     // console.log(err);
  //   }
  // };

  return (
    <>
      <hr />
      <div>
        
        <Media className="align-items-center justify-content-between">
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} />
            {owner}
          </Link>
          <Link to={`/dogprofiles/${id}`}>
          <Card.Img src={dog_profile_image} />
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
          <Media.Body className="align-self-center ml-2">
            <span className={styles.Owner}>{owner}</span>
            <span className={styles.Date}>{updated_at}</span>
            {showEditForm ? (
              <DogProfileEditForm
                id={id}
                profile_id={profile_id}

                dog_name = {dog_name}
                dog_age = {dog_age}
                dog_color = {dog_color}
                dog_bio = {dog_bio}
                dog_profile_image = {dog_profile_image}
                setDogProfiles={setDogProfiles}
                setShowEditForm={setShowEditForm}
              />
            ) : (
              <p></p>
            )}
          </Media.Body>

      </Media>
    </div>
  </>
 );
};

export default DogProfile;