import React from "react";
import styles from "../../styles/DogProfile.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Link, useHistory } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";
import Card from "react-bootstrap/Card";
import Media from "react-bootstrap/Media";
import { MoreDropdown } from "../../components/MoreDropdown";

const DogProfile = (props) => {
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
    dogProfilePage,
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
        <Card.Img class="card_image" src={dog_profile_image} alt={dog_name} />
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
      </Card.Body>
    </Card>
  );
};

export default DogProfile;
