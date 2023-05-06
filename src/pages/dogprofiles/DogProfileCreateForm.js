import React, { useRef, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";

import Asset from "../../components/Asset";

import Upload from "../../assets/upload.png";

import styles from "../../styles/DogProfileCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

import { useHistory } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import { useRedirect } from "../../hooks/useRedirect";

function DogProfileCreateForm() {
  useRedirect("loggedOut");
  const [errors, setErrors] = useState({});

  const [dogProfileData, setDogProfileData] = useState({  
    dog_name: "",
    dog_age: "",
    dog_color: "",
    dog_bio: "",
    dog_profile_image: "",
  });
  const { dog_name, dog_age, dog_color, dog_bio, dog_profile_image } = dogProfileData;

  const imageInput = useRef(null);
  const history = useHistory();

  const handleChange = (event) => {
    setDogProfileData({
      ...dogProfileData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(dog_profile_image);
      setDogProfileData({
        ...dogProfileData,
        dog_profile_image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("dog_name", dog_name);
    formData.append("dog_age", dog_age);
    formData.append("dog_color", dog_color);
    formData.append("dog_bio", dog_bio);
    formData.append("dog_profile_image", imageInput.current.files[0]);

    try {
      const { data } = await axiosReq.post("/dogprofiles/", formData);
      history.push(`/dogprofiles/${data.id}`);
    } catch (err) {
      // console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  const textFields = (
    <div className="text-center">
      <Form.Group>
        <Form.Label>Doggy Name</Form.Label>
        <Form.Control
          type="text"
          name="dog_name"
          value={dog_name}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.dog_name?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Doggy Age</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          name="dog_age"
          value={dog_age}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.dog_age?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Doggy Color</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          name="dog_color"
          value={dog_color}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.dog_color?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Doggy Bio</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          name="dog_bio"
          value={dog_bio}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.dog_bio?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Button
        className={`${btnStyles.Button} ${btnStyles.Blue}`}
        onClick={() => history.goBack()}
      >
        cancel
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
        create
      </Button>
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <Form.Group className="text-center">
              {dog_profile_image ? (
                <>
                  <figure>
                    <Image className={appStyles.Image} src={dog_profile_image} rounded />
                  </figure>
                  <div>
                    <Form.Label
                      className={`${btnStyles.Button} ${btnStyles.Blue} btn`}
                      htmlFor="image-upload"
                    >
                      Change doggy image
                    </Form.Label>
                  </div>
                </>
              ) : (
                <Form.Label
                  className="d-flex justify-content-center"
                  htmlFor="image-upload"
                >
                  <Asset
                    src={Upload}
                    message="Click or tap to upload an image"
                  />
                </Form.Label>
              )}

              <Form.File
                id="image-upload"
                accept="image/*"
                onChange={handleChangeImage}
                ref={imageInput}
              />
            </Form.Group>
            {errors?.dog_profile_image?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <div className="d-md-none">{textFields}</div>
          </Container>
        </Col>
        <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
}

export default DogProfileCreateForm;


// function DogProfileCreateForm() {
 
//         <h1>Hi, I'm a doggy, create my profile please?</h1>

// };

// export default DogProfileCreateForm;