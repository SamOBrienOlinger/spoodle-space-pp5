import React, { useEffect, useRef, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";

// import styles from "../../styles/DogProfileCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

import { useHistory, useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

import {
  useCurrentUser,
  useSetCurrentUser,
} from "../../contexts/CurrentUserContext";

// function DogProfileEditForm() {
const DogProfileEditForm = () => {

  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const imageFile = useRef();

  const [errors, setErrors] = useState({});

  const [dogProfileData, setDogProfileData] = useState({
    dog_name: "",
    dog_age: "",
    dog_color: "",
    dog_bio: "",
    dog_profile_image: "",
  });
  const { dog_name, dog_age, dog_color, dog_bio, dog_profile_image, } = dogProfileData;

  // const imageInput = useRef(null);
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    const handleMount = async () => {
      if (currentUser?.dog_profile_id?.toString() === id) {
        try {
          const { data } = await axiosReq.get(`/dogprofiles/${id}/`);
          const { dog_name, dog_age, dog_color, dog_bio, dog_profile_image } = data;
          setDogProfileData({ dog_name, dog_age, dog_color, dog_bio, dog_profile_image, })
        } catch (err) {
        // console.log(err);
        history.push("/");
      }
    } else {
      history.push("/");
    }
  };

    handleMount();
  }, [currentUser, history, id]);

  const handleChange = (event) => {
    setDogProfileData({
      ...dogProfileData,
      [event.target.name]: event.target.value,
    });
  };

  // const handleChangeImage = (event) => {
  //   if (event.target.files.length) {
  //     URL.revokeObjectURL(dog_profile_image);
  //     setDogProfileData({
  //       ...dogProfileData,
  //       image: URL.createObjectURL(event.target.files[0]),
  //     });
  //   }
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("dog name", dog_name);
    formData.append("dog age", dog_age);
    formData.append("dog color", dog_color);
    formData.append("dog bio", dog_bio);
    formData.append("dog profile image", imageFile.current.files[0]);

    if (imageFile?.current?.files[0]) {
      formData.append("dog profile image", imageFile.current.files[0]);
    }

    try {
      const { data } = await axiosReq.put(`/dogprofiles/${id}/`, formData);
      setCurrentUser((currentUser) => ({
        ...currentUser,
        profile_image: data.dog_profile,
      }));
      history.goBack();
    } catch (err) {
      // console.log(err);
      setErrors(err.response?.data);
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
          <Container className={appStyles.Content}>
            <Form.Group>
            {dog_profile_image && (
                <figure>
                  <Image src={dog_profile_image} fluid />
                </figure>
              )}
              {errors?.dog_profile_image?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))}
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
                onChange={(e) => {
                  if (e.target.files.length) {
                    setDogProfileData({
                      ...dogProfileData,
                      dog_profile_image: URL.createObjectURL(e.target.files[0]),
                    });
                  }
                }}
              />
            </Form.Group>
            <div className="d-md-none">{textFields}</div>
          </Container>
        </Col>
        <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2 text-center">
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
}

export default DogProfileEditForm;