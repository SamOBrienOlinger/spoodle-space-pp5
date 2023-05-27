import React from "react";
import styles from "../../styles/DogHealth.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Link, useHistory } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";
import Card from "react-bootstrap/Card";
import Media from "react-bootstrap/Media";
import { MoreDropdown } from "../../components/MoreDropdown";

const DogHealth = ({
  id,
  owner,
  profile_id,
  profile_image,
  vet_name,
  vet_phone,
  vet_email,
  chipped,
  kennel_cough,
  rabies,
  allergies,
  updated_at,
  dog_profile_image,
  dog_name,
}) => {
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();

  const handleEdit = () => {
    history.push(`/dogshealth/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/dogshealth/${id}/`);
      history.goBack();
    } catch (err) {
      // console.log(err);
    }
  };

  return (
    <Card className={styles.DogHealth}>
      <Card.Body>
        <Media className="align-items-center justify-content-between">
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} height={55} />
            {owner}
          </Link>
          <div className="d-flex align-items-center">
            <span>{updated_at}</span>
            {is_owner && (
              <MoreDropdown handleEdit={handleEdit} handleDelete={handleDelete} />
            )}
          </div>
        </Media>
      </Card.Body>

      <Link to={`/dogprofiles/${id}`}>
        <Card.Img className="card_image" src={dog_profile_image} alt={dog_name} />
      </Link>

      <Card.Body>
        {vet_name && <Card.Title className="text-center">{vet_name}</Card.Title>}
        {vet_name && <Card.Text>{vet_name}</Card.Text>}

        {vet_phone && <Card.Title className="text-center">{vet_phone}</Card.Title>}
        {vet_phone && <Card.Text>{vet_phone}</Card.Text>}

        {vet_email && <Card.Title className="text-center">{vet_email}</Card.Title>}
        {vet_email && <Card.Text>{vet_email}</Card.Text>}

        {vet_email && <Card.Title className="text-center">{vet_email}</Card.Title>}
        {vet_email && <Card.Text>{vet_email}</Card.Text>}

        {chipped && <Card.Title className="text-center">{chipped}</Card.Title>}
        {chipped && <Card.Text>{chipped}</Card.Text>}

        {kennel_cough && (
          <Card.Title className="text-center">{kennel_cough}</Card.Title>
        )}
        {kennel_cough && <Card.Text>{kennel_cough}</Card.Text>}

        {rabies && <Card.Title className="text-center">{rabies}</Card.Title>}
        {rabies && <Card.Text>{rabies}</Card.Text>}

        {allergies && <Card.Title className="text-center">{allergies}</Card.Title>}
        {allergies && <Card.Text>{allergies}</Card.Text>}
      </Card.Body>
    </Card>
  );
};

export default DogHealth;
