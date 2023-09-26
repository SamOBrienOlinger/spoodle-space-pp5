import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import styles from "../../styles/DogHealthCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useHistory, useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

function DogHealthEditForm() {
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
  const { id } = useParams();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/doghealth/${id}/`);
        const {
          vet_name,
          vet_phone,
          vet_email,
          kennel_cough,
          rabies,
          allergies,
          is_owner,
        } = data;

        is_owner
          ? setDogHealthData({
              vet_name,
              vet_phone,
              vet_email,
              kennel_cough,
              rabies,
              allergies,
            })
          : history.push("/");
      } catch (err) {
        // console.log(err);
      }
    };

    handleMount();
  }, [history, id]);

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
      await axiosReq.put(`/doghealth/${id}/`, formData);
      history.push(`/doghealth/${id}`);
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
        <Form.Label>Vet Name</Form.Label>
        <Form.Control
          type="text"
          name="vet_name"
          value={vet_name}
          onChange={handleChange}
          required
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
          required
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
          required
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
          required
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
          required
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
          required
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
        save
      </Button>
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <div className={`d-flex align-items-center ${styles.iconText}`}>
        <span>
          <i className="fas fa-dog"></i>
          Doggy Health
        </span>
      </div>
      <Row>
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
          <div className="d-md-none">{textFields}</div>
        </Col>
        <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
          <Container className={`Container ${appStyles.Content}`}>
            {textFields}
          </Container>
        </Col>
      </Row>
    </Form>
  );
}

export default DogHealthEditForm;
