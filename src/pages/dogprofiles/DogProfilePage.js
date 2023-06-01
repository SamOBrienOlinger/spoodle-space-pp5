import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Asset from "../../components/Asset";
import appStyles from "../../App.module.css";
import NoResults from "../../assets/no-results.png";
import { axiosReq } from "../../api/axiosDefaults";
import { Card } from "react-bootstrap";

function DogProfilePage() {
  const { id } = useParams();
  const [dogProfile, setDogProfile] = useState(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const fetchDogProfile = async () => {
      try {
        const { data } = await axiosReq.get(`/dogprofiles/${id}/`);
        setDogProfile(data);
        setHasLoaded(true);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDogProfile();
  }, [id]);

  return (
    <div className={appStyles.Content}>
      {hasLoaded ? (
        dogProfile ? (
          <div>
            <h1>{dogProfile.dog_name}</h1>

            <Card.Img src={dogProfile.dog_profile_image} alt={dogProfile.dog_name} />

            <p>Age: {dogProfile.dog_age}</p>
            <p>Color: {dogProfile.dog_color}</p>
            <p>Bio: {dogProfile.dog_bio}</p>
          </div>
        ) : (
          <Asset src={NoResults} message={`No dog profile found for {profile?.owner} ${id}`} />
        )
      ) : (
        <Asset spinner />
      )}
    </div>
  );
}

export default DogProfilePage;
