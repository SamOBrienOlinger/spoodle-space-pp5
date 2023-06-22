import React, { useState } from "react";
import { useHistory } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import { useRedirect } from "../../hooks/useRedirect";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import styles from "../../styles/DogHealthCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

function DogHealthCreateForm() {
  useRedirect("loggedOut");
  const [errors, setErrors] = useState({});

  const [dogHealthData, setDogHealthData] = useState({
    vet_name: "",
    vet_phone: "",
    vet_email: "",
    kennel_cough: "",
    rabies: "",
    allergies: "",
  });

  const { vet_name, vet_phone, vet_email, kennel_cough, rabies, allergies } =
    dogHealthData;

  const history = useHistory();

  const handleChange = (event) => {
    setDogHealthData({
      ...dogHealthData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("vet_name", vet_name);
    formData.append("vet_phone", vet_phone);
    formData.append("vet_email", vet_email);
    formData.append("kennel_cough", kennel_cough);
    formData.append("rabies", rabies);
    formData.append("allergies", allergies);

    try {
      const { data } = await axiosReq.post("/doghealth/", formData);
      history.push(`/doghealth/${data.id}`);
    } catch (err) {
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  const textFields = (
    <div className="text-center">
      <Form.Group>
        <Form.Label>Vet Name</Form.Label>
        <Form.Control
          type="text"
          name="vet_name"
          value={vet_name}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.vet_name?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Vet Phone</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          name="vet_phone"
          value={vet_phone}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.vet_phone?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Vet Email</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          name="vet_email"
          value={vet_email}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.vet_email?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Kennel Cough</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          name="kennel_cough"
          value={kennel_cough}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.kennel_cough?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Rabies</Form.Label>
        <Form.Control
          type="text"
          name="rabies"
          value={rabies}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.rabies?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Allergies</Form.Label>
        <Form.Control
          type="text"
          name="allergies"
          value={allergies}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.allergies?.map((message, idx) => (
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
        {/* <Col className="py-2 p-0 p-md-2" md={7} lg={8}> */}
        <Container
          className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
        >
          <div className="d-md-none">{textFields}</div>
        </Container>
        {/* </Col> */}
        <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
}

export default DogHealthCreateForm;
