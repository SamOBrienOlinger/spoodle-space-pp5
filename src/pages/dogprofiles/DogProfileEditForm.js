import React, { useEffect, useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";
import styles from "../../styles/DogProfileCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useHistory, useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import {NotificationManager} from 'react-notifications';


const DogProfileEditForm = () => {
  const [errors, setErrors] = useState({});

  const [dogProfileData, setDogProfileData] = useState({
    dog_name: "",
    dog_age: "",
    dog_color: "",
    dog_bio: "",
    dog_profile_image: "",
  });

  const { dog_name, dog_age, dog_color, dog_bio, dog_profile_image } =
    dogProfileData;

  const imageInput = useRef(null);
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/dogprofiles/${id}/`);
        const {
          dog_name,
          dog_age,
          dog_color,
          dog_bio,
          dog_profile_image,
          is_owner,
        } = data;

        is_owner
          ? setDogProfileData({
              dog_name,
              dog_age,
              dog_color,
              dog_bio,
              dog_profile_image,
            })
          : history.push("/");
      } catch (err) {
        
      }
    };

    handleMount();
  }, [history, id]);

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
        image: URL.createObjectURL(event.target.files[0]),
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

    if (imageInput?.current?.files[0]) {
      formData.append("dog_profile_image", imageInput.current.files[0]);
    }

    try {
      await axiosReq.put(`/dogprofiles/${id}/`, formData);
      NotificationManager.success('Dog Profile Edited!', 'Success');
      history.push(`/dogprofiles/${id}`);
    } catch (err) {
      
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
        NotificationManager.error('Error', 'Click me!')

      }
    }
  };

  const textFields = (
    <>
      <Form.Group>
        <Form.Label>Dog Name</Form.Label>
        <Form.Control
          as="textarea"
          name="dog_name"
          value={dog_name}
          onChange={handleChange}
          rows={2}
          required
        />
      </Form.Group>

      {errors?.dog_name?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Dog Age</Form.Label>
        <Form.Control
          as="textarea"
          rows={2}
          name="dog_age"
          value={dog_age}
          onChange={handleChange}
          required
        />
      </Form.Group>
      {errors?.dog_age?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Dog Color</Form.Label>
        <Form.Control
          as="textarea"
          rows={2}
          name="dog_color"
          value={dog_color}
          onChange={handleChange}
          required
        />
      </Form.Group>
      {errors?.dog_color?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Dog Bio</Form.Label>
        <Form.Control
          as="textarea"
          rows={4}
          name="dog_bio"
          value={dog_bio}
          onChange={handleChange}
          required
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
        save
      </Button>
    </>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="py-2 p-0 p-md-2 text-center" md={7} lg={6}>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <Form.Group>
              <figure>
                <Image
                  className={appStyles.Image}
                  src={dog_profile_image}
                  fluid
                />
              </figure>
              <div>
                <Form.Label
                  className={`${btnStyles.Button} ${btnStyles.Blue} btn my-auto`}
                  htmlFor="image-upload"
                >
                  Change the image
                </Form.Label>
              </div>

              <Form.File
                id="image-upload"
                accept="image/*"
                onChange={handleChangeImage}
                ref={imageInput}
              />
            </Form.Group>
            {errors?.image?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <div className="d-md-none">{textFields}</div>
          </Container>
        </Col>
        <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2 text-center">
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
};

export default DogProfileEditForm;
