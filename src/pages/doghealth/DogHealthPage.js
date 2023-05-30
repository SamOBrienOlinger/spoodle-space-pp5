import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Asset from "../../components/Asset";
import appStyles from "../../App.module.css";
import NoResults from "../../assets/no-results.png";
import { axiosReq } from "../../api/axiosDefaults";
import { Card } from "react-bootstrap";

function DogHealthPage() {
  const { id } = useParams();
  const [dogHealth, setDogHealth] = useState(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const fetchDogHealth = async () => {
      try {
        const { data } = await axiosReq.get(`/dogHealths/${id}/`);
        setDogHealth(data);
        setHasLoaded(true);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDogHealth();
  }, [id]);

  return (
    <div className={appStyles.Content}>
      {hasLoaded ? (
        dogHealth ? (
          <div>
            <h1>{dogHealth.dog_name}</h1>
              
              {/* <img src={dogHealth.dog_Health_image} alt={dogHealth.dog_name} />  */}
              
              <Card.Img src={dogHealth.dog_Health_image} alt={dogHealth.dog_name} />

              {/* <p>Age: {dogHealth.dog_age}</p>
              <p>Color: {dogHealth.dog_color}</p>
              <p>Bio: {dogProfile.dog_bio}</p> */}
          </div>
        ) : (
          <Asset src={NoResults} message={`No dog Health found for ID ${id}`} />
        )
      ) : (
        <Asset spinner />
      )}
    </div>
  );
}

export default DogHealthPage;


// import React from "react";

// function DogHealthPage() {
//     return <p className="text-center">hello dog world</p>;
//   }
  
//   export default DogHealthPage;
