import FormPage, { FormField } from "../../components/FormPage";
import React, { useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
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
  return (
    <FormPage title="Welcome back" description="Sign in to your SpoodleSpace community." icon="paw" onSubmit={handleSubmit} errors={errors} submitLabel="Sign in" busyLabel="Signing in…" auth footer={<>New to SpoodleSpace? <Link to="/signup">Sign up</Link></>}>
      <FormField label="Username" name="username" value={signInData.username} onChange={handleChange} error={errors?.username} type="text" autoComplete="username" autoCapitalize="none" autoCorrect="off" spellCheck={false} required placeholder="Enter your username" />
      <FormField label="Password" name="password" value={signInData.password} onChange={handleChange} error={errors?.password} type="password" autoComplete="current-password" required placeholder="Enter your password" />
    </FormPage>
  );
}
