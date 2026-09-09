import FormPage, { FormField, formErrors } from "../../components/FormPage";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";



import axios from "axios";
import { useRedirect } from "../../hooks/useRedirect";

import {NotificationManager} from 'react-notifications';


const SignUpForm = () => {
  useRedirect("loggedIn");
  const [signUpData, setSignUpData] = useState({
    username: "",
    password1: "",
    password2: "",
  });
  const { username, password1, password2 } = signUpData;

  const [errors, setErrors] = useState({});

  const history = useHistory();

  const handleChange = (event) => {
    setSignUpData({
      ...signUpData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({});
    try {
      await axios.post("/dj-rest-auth/registration/", signUpData);
      NotificationManager.success('Please Sign In', 'Welcome to SpoodleSpace!');
      history.push("/signin");
    } catch (err) {
      setErrors(formErrors(err));
      NotificationManager.error('Please try again', 'Oopsadoodle!')
    }
  };

  return (
    <FormPage title="Join SpoodleSpace" description="A space for you, your dog and your community." icon="paw" onSubmit={handleSubmit} errors={errors} submitLabel="Create account" busyLabel="Creating account…" auth footer={<>Already have an account? <Link to="/signin">Sign in</Link></>}>
      <FormField label="Username" name="username" value={username} onChange={handleChange} error={errors?.username} type="text" autoComplete="username" autoCapitalize="none" autoCorrect="off" spellCheck={false} required placeholder="Choose a username" />
      <FormField label="Password" name="password1" value={password1} onChange={handleChange} error={errors?.password1} type="password" autoComplete="new-password" required placeholder="Create a password" />
      <FormField label="Confirm password" name="password2" value={password2} onChange={handleChange} error={errors?.password2} type="password" autoComplete="new-password" required placeholder="Repeat your password" />
    </FormPage>
  );
};

export default SignUpForm;
