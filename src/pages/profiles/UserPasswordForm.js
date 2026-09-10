import FormPage, { FormField, formErrors } from "../../components/FormPage";
import React, { useEffect, useState } from "react";


import { useHistory, useParams } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";


const UserPasswordForm = () => {
  const history = useHistory();
  const { id } = useParams();
  const currentUser = useCurrentUser();

  const [userData, setUserData] = useState({
    new_password1: "",
    new_password2: "",
  });
  const { new_password1, new_password2 } = userData;

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    if (currentUser?.profile_id?.toString() !== id) {
      history.push("/");
    }
  }, [currentUser, history, id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({});
    try {
      await axiosRes.post("/dj-rest-auth/password/change/", userData);
      history.goBack();
    } catch (err) {
      
      setErrors(formErrors(err));
    }
  };

  return (
    <FormPage title="Change password" description="Choose a new password for your SpoodleSpace account." icon="settings" onSubmit={handleSubmit} errors={errors} submitLabel="Update password" busyLabel="Saving…" onCancel={() => history.goBack()}>
      <FormField label="New password" name="new_password1" value={new_password1} onChange={handleChange} error={errors?.new_password1} type="password" autoComplete="new-password" required />
      <FormField label="Confirm new password" name="new_password2" value={new_password2} onChange={handleChange} error={errors?.new_password2} type="password" autoComplete="new-password" required />
    </FormPage>
  );
};

export default UserPasswordForm;
