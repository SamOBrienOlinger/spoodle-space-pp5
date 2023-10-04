import React from "react";
import styles from "../../styles/DogHealth.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Link, useHistory } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";
import Card from "react-bootstrap/Card";
import Media from "react-bootstrap/Media";
import { MoreDropdown } from "../../components/MoreDropdown";
import {NotificationManager} from 'react-notifications';


const DogHealth = (props) => {
  const {
    id,
    owner,
    owner_id,

    updated_at,

    profile_id,
    profile_image,

    vet_name,
    vet_phone,
    vet_email,
    kennel_cough,
    rabies,
    allergies,

    dogHealthPage,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();
  const profileId=currentUser?.profile_id

  const handleEdit = () => {
    history.push(`/doghealth/${id}/edit`);
  };

  const handleDelete = async () => {
    NotificationManager.warning('Are you sure you want to delete?', 'Click to delete', 5000,() => {
      try {
        axiosRes.delete(`/doghealth/${id}/`);
        NotificationManager.success('Dog Health Deleted!', 'Success');
        history.push(`/profiles/${profileId}/`);
      } catch (err) {
        NotificationManager.error('Please try again', 'Oopsadoodle!')
        // console.log(err);
      }
    });    
  };

  return (
    <Card className={styles.DogHealth}>
      <Card.Body>
        <Media className="align-items-center justify-content-between">
          <Link to={`/profiles/${owner_id}`}>
            <Avatar src={profile_image} height={55} />
            {owner}
          </Link>
          <Link to="/dogshealthpage">
            <span>
              <i className="fas fa-dog"></i>
              <p>Doggy Health</p>
            </span>
          </Link>
          <div className={`d-flex align-items-center ${styles.iconText}`}>
            <span>{updated_at}</span>
            {is_owner && dogHealthPage && (
              <MoreDropdown
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                profile_id={profile_id}
              />
            )}
          </div>
        </Media>
      </Card.Body>
      <Card.Body className="text-center">
        {vet_name && <Card.Title className="text-center">Vet Name</Card.Title>}
        {vet_name && <Card.Text>{vet_name}</Card.Text>}

        {vet_phone && (
          <Card.Title className="text-center">Vet Phone</Card.Title>
        )}
        {vet_phone && <Card.Text>{vet_phone}</Card.Text>}

        {vet_email && (
          <Card.Title className="text-center">Vet Email</Card.Title>
        )}
        {vet_email && <Card.Text>{vet_email}</Card.Text>}

        {kennel_cough && (
          <Card.Title className="text-center">Kennel Cough</Card.Title>
        )}
        {kennel_cough && <Card.Text>{kennel_cough}</Card.Text>}

        {rabies && <Card.Title className="text-center">Rabies</Card.Title>}
        {rabies && <Card.Text>{rabies}</Card.Text>}

        {allergies && (
          <Card.Title className="text-center">Allergies</Card.Title>
        )}
        {allergies && <Card.Text>{allergies}</Card.Text>}
      </Card.Body>
    </Card>
  );
};

export default DogHealth;
