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
import styles from "../../styles/DogProfileCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import {NotificationManager} from 'react-notifications';


function DogDangerCreateForm() {
  useRedirect("loggedOut");
  const [errors, setErrors] = useState({});

  const [dogDangerData, setDogDangerData] = useState({
    bites_babies: "",
    bites_kids: "",
    bites_teenagers: "",
    bites_burglars: "",
    dangerously_cute: "",
  });
  const {
    bites_babies,
    bites_kids,
    bites_teenagers,
    bites_burglars,
    dangerously_cute,
  } = dogDangerData;

  const history = useHistory();

  const handleChange = (event) => {
    setDogDangerData({
      ...dogDangerData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("bites_babies", bites_babies);
    formData.append("bites_kids", bites_kids);
    formData.append("bites_teenagers", bites_teenagers);
    formData.append("bites_burglars", bites_burglars);
    formData.append("dangerously_cute", dangerously_cute);
    try {
      const { data } = await axiosReq.post("/dogdanger/", formData);
      NotificationManager.success('Dog Danger details Created!', 'Success');
      history.push(`/dogdanger/${data.id}`);
    } catch (err) {
      
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
        NotificationManager.error('Please try again', 'Oopsadoodle!')
      }
    }
  };

  const textFields = (
    <div className="text-center">
      <Form.Group>
        <Form.Label>Bites Babies?</Form.Label>
        <Form.Control
          type="text"
          name="bites_babies"
          value={bites_babies}
          onChange={handleChange}
          required
        />
      </Form.Group>
      {errors?.title?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Bites Kids?</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          name="bites_kids"
          value={bites_kids}
          onChange={handleChange}
          required
        />
      </Form.Group>
      {errors?.content?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Bites Teenagers?</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          name="bites_teenagers"
          value={bites_teenagers}
          onChange={handleChange}
          required
        />
      </Form.Group>
      {errors?.content?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Bites Burglars?</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          name="bites_burglars"
          value={bites_burglars}
          onChange={handleChange}
          required
        />
      </Form.Group>
      {errors?.content?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Dangerously Cute?</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          name="dangerously_cute"
          value={dangerously_cute}
          onChange={handleChange}
          required
        />
      </Form.Group>
      {errors?.content?.map((message, idx) => (
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
        <div className="d-md-none">{textFields}</div>
      </Container>
    </Col>
      <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
      {/* <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2"> */}
        <Container className={appStyles.Content}>{textFields}</Container>
     </Col>
    </Row>
  </Form>
  );
}

export default DogDangerCreateForm;
