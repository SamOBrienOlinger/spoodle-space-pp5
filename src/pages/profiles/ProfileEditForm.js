import FormPage, { FormField, PhotoField, formErrors } from "../../components/FormPage";
import React, { useState, useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../../contexts/CurrentUserContext";
import {NotificationManager} from 'react-notifications';

const ProfileEditForm = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const { id } = useParams();
  const history = useHistory();
  const imageFile = useRef();

  const [profileData, setProfileData] = useState({
    name: "",
    content: "",
    image: "",
  });
  const { name, content, image } = profileData;

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const handleMount = async () => {
      if (currentUser?.profile_id?.toString() === id) {
        if (currentUser?.dog_profile_id) {
          history.push(`/dogprofiles/${currentUser.dog_profile_id}/edit`);
          return;
        }

        try {
          const { data } = await axiosReq.get(`/profiles/${id}/`);
          const { name, content, image } = data;
          setProfileData({ name, content, image });
        } catch (err) {
          
          history.push("/");
        }
      } else {
        history.push("/");
      }
    };

    handleMount();
  }, [currentUser, history, id]);

  const handleChange = (event) => {
    setProfileData({
      ...profileData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({});
    const formData = new FormData();
    formData.append("name", name);
    formData.append("content", content);

    if (imageFile?.current?.files[0]) {
      formData.append("image", imageFile?.current?.files[0]);
    }

    try {
      const { data } = await axiosReq.put(`/profiles/${id}/`, formData);
      NotificationManager.success('Profile Edited!', 'Success');
      setCurrentUser((currentUser) => ({
        ...currentUser,
        profile_image: data.image,
      }));
      history.goBack();
    } catch (err) {
      
      setErrors(formErrors(err));
      NotificationManager.error('Please try again', 'Oopsadoodle!')
    }
  };

  return (
    <FormPage title="Edit my profile" description="Add a photo and tell the community a little about yourself." icon="user" onSubmit={handleSubmit} errors={errors} submitLabel="Save changes" busyLabel="Saving…" onCancel={() => history.goBack()}>
      <PhotoField name="image" label="Profile photo" value={image} inputRef={imageFile} onChange={event => { if (event.target.files.length) { URL.revokeObjectURL(image); setProfileData({ ...profileData, image: URL.createObjectURL(event.target.files[0]) }); } }} error={errors?.image} portrait />
      <FormField label="Bio" name="content" value={content} onChange={handleChange} error={errors?.content} as="textarea" rows={5} />
    </FormPage>
  );
};

export default ProfileEditForm;
