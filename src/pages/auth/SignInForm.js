import React, { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import { Link, useHistory } from "react-router-dom";
import styles from "../../styles/SignInUpForm.module.css";
import appStyles from "../../App.module.css";
import { useSetCurrentUser } from "../../contexts/CurrentUserContext";
import { useRedirect } from "../../hooks/useRedirect";
import { setTokenTimestamp } from "../../utils/utils";

// HTTP/proxy failures are not evidence that a user's password is incorrect.
const loginErrors = (error) => {
  const status = error.response?.status;
  const data = error.response?.data;
  if (error.code === "SESSION_NOT_ESTABLISHED") {
    return { non_field_errors: ["The sign-in response did not establish a session. Please try again on the Heroku app."] };
  }
  if (!error.response) {
    return { non_field_errors: ["The sign-in service could not be reached. Please check your connection and try again."] };
  }
  if (status === 404 || status === 405) {
    return { non_field_errors: ["The sign-in service is unavailable at this address. Please use the Heroku app."] };
  }
  if (status >= 500) {
    return { non_field_errors: ["The sign-in service is temporarily unavailable. Please try again shortly."] };
  }
  if (data && typeof data === "object" && !Array.isArray(data)) {
    const result = {};
    ["username", "password", "non_field_errors"].forEach((field) => {
      if (Array.isArray(data[field])) result[field] = data[field].filter((value) => typeof value === "string");
      else if (typeof data[field] === "string") result[field] = [data[field]];
    });
    if (typeof data.detail === "string") result.non_field_errors = [data.detail];
    if (Object.keys(result).length) return result;
  }
  return { non_field_errors: ["Sign-in could not be completed. Please try again."] };
};

export default function SignInForm() {
  const setCurrentUser = useSetCurrentUser();
  useRedirect("loggedIn");
  const history = useHistory();
  const [signInData, setSignInData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setErrors({});
    try {
      const { data } = await axios.post("/dj-rest-auth/login/", signInData, { timeout: 20000 });
      // Verify the first-party cookie session instead of displaying optimistic success.
      const { data: user } = await axios.get("/dj-rest-auth/user/", { timeout: 20000 });
      if (!user || typeof user.username !== "string") {
        const error = new Error("No authenticated user returned");
        error.code = "SESSION_NOT_ESTABLISHED";
        throw error;
      }
      setTokenTimestamp(data);
      setCurrentUser(user);
      setSubmitting(false);
      // goBack() could take a user straight back to the GitHub Pages preview.
      history.replace("/feed");
    } catch (error) {
      setErrors(loginErrors(error));
      setSubmitting(false);
    }
  };
  const handleChange = (event) => {
    setSignInData({ ...signInData, [event.target.name]: event.target.value });
  };
  const messages = (field) => (errors[field] || []).map((message, index) => (
    <Alert key={`${field}-${index}`} variant="danger">{message}</Alert>
  ));
  return (
    <Row className={styles.Row}>
      <Col className="my-auto p-0 p-md-2" md={6}>
        <Container className={`${appStyles.Content} p-4`}>
          <h1 className={styles.Header}>Sign in</h1>
          <Form onSubmit={handleSubmit} aria-busy={submitting}>
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" autoComplete="username" autoCapitalize="none" autoCorrect="off" spellCheck={false} required placeholder="Enter your username" name="username" className={styles.Input} value={signInData.username} onChange={handleChange} disabled={submitting} />
            </Form.Group>
            {messages("username")}
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" autoComplete="current-password" required placeholder="Enter your password" name="password" className={styles.Input} value={signInData.password} onChange={handleChange} disabled={submitting} />
            </Form.Group>
            {messages("password")}
            <Button className={styles.SubmitButton} type="submit" disabled={submitting}>
              {submitting ? "Signing in..." : "Sign in"}
            </Button>
            <div className="mt-3" aria-live="polite">{messages("non_field_errors")}</div>
          </Form>
        </Container>
        <Container className={`mt-3 ${appStyles.Content}`}>
          <Link className={styles.Link} to="/signup">Not a SpoodleSpacer yet? Sign up</Link>
        </Container>
      </Col>
      <Col md={6} className={`my-auto d-none d-md-block p-2 ${styles.SignUpCol}`}>
        <Image className={appStyles.FillerImage} alt="A dog enjoying the outdoors" src="https://res.cloudinary.com/dzhbg6go0/image/upload/v1670254218/CockapooClub/furry-fun_gsmi28.webp" />
      </Col>
    </Row>
  );
}
