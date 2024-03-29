import React from "react";
import styles from "../../styles/DogDanger.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Link, useHistory } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";
import Card from "react-bootstrap/Card";
import Media from "react-bootstrap/Media";
import { MoreDropdown } from "../../components/MoreDropdown";
import {NotificationManager} from 'react-notifications';


const DogDanger = (props) => {
  const {
    id,
    owner,
    owner_id,

    updated_at,

    profile_id,
    profile_image,

    bites_babies,
    bites_kids,
    bites_teenagers,
    bites_burglars,
    dangerously_cute,

    dogDangerPage,
  } = props;

  console.log("id:", id);
  console.log("owner_id:", owner_id);

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();
  const profileId=currentUser?.profile_id

  const handleEdit = () => {
    history.push(`/dogdanger/${id}/edit`);
  };

  const handleDelete = async () => {
    NotificationManager.warning('Are you sure you want to delete?', 'Click HERE to delete', 5000,() => {
      try {
        axiosRes.delete(`/dogdanger/${id}/`);
        NotificationManager.success('Dog Danger details Deleted!', 'Success');
        history.push(`/profiles/${profileId}/`);
      } catch (err) {
        NotificationManager.error('Please try again', 'Oopsadoodle!')
        
      }
    });
  }

  return (
    <Card className={styles.DogDanger}>
      <Card.Body>
        <Media className="align-items-center justify-content-between">
          <Link to={`/profiles/${owner_id}`}>
            <Avatar src={profile_image} height={55} />
            {owner}
          </Link>
          <Link to="/dogdangerspage">
            <span>
              <i className="fas fa-dog"></i>
              <p>Doggy Danger</p>
            </span>
          </Link>

          <div className={`d-flex align-items-center ${styles.iconText}`}>
            <span>{updated_at}</span>

            {is_owner && dogDangerPage && (
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
        {bites_babies && (
          <Card.Title className="text-center">Bites Babies?</Card.Title>
        )}
        {bites_babies && <Card.Text>{bites_babies}</Card.Text>}

        {bites_kids && (
          <Card.Title className="text-center">Bites Kids?</Card.Title>
        )}
        {bites_kids && <Card.Text>{bites_kids}</Card.Text>}

        {bites_teenagers && (
          <Card.Title className="text-center">Bites Teenagers?</Card.Title>
        )}
        {bites_teenagers && <Card.Text>{bites_teenagers}</Card.Text>}

        {bites_burglars && (
          <Card.Title className="text-center">Bites Burglars?</Card.Title>
        )}
        {bites_burglars && <Card.Text>{bites_burglars}</Card.Text>}

        {dangerously_cute && (
          <Card.Title className="text-center">Dangeroulsy Cute?</Card.Title>
        )}
        {dangerously_cute && <Card.Text>{dangerously_cute}</Card.Text>}
      </Card.Body>
    </Card>
  );
};

export default DogDanger;
