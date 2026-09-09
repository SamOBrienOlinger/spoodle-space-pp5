import FormPage, { FormField, formErrors } from "../../components/FormPage";
import React, { useEffect, useState } from "react";


import { useHistory, useParams } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../../contexts/CurrentUserContext";


const UsernameForm = () => {
  const [username, setUsername] = useState("");
  const [errors, setErrors] = useState({});

  const history = useHistory();
  const { id } = useParams();

  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  useEffect(() => {
    if (currentUser?.profile_id?.toString() === id) {
      setUsername(currentUser.username);
    } else {
      history.push("/");
    }
  }, [currentUser, history, id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({});
    try {
      await axiosRes.put("/dj-rest-auth/user/", {
        username,
      });
      setCurrentUser((prevUser) => ({
        ...prevUser,
        username,
      }));
      history.goBack();
    } catch (err) {
      
      setErrors(formErrors(err));
    }
  };

  return (
    <FormPage title="Change username" description="Choose the name other SpoodleSpacers will see." icon="user" onSubmit={handleSubmit} errors={errors} submitLabel="Save changes" busyLabel="Saving…" onCancel={() => history.goBack()}>
      <FormField label="Username" name="username" value={username} onChange={event => setUsername(event.target.value)} error={errors?.username} type="text" autoComplete="username" autoCapitalize="none" autoCorrect="off" spellCheck={false} required />
    </FormPage>
  );
};

export default UsernameForm;
