import FormPage, { FormField, PhotoField, formErrors } from "../../components/FormPage";
import React, { useState, useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import {
  useSetCurrentUser,
} from "../../contexts/CurrentUserContext";
import {NotificationManager} from 'react-notifications';

const ProfileEditForm = () => {
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
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let active = true;
    setLoading(true); setLoadError(null);
    axiosReq.get(`/profiles/${id}/`, { timeout: 20000 }).then(({ data }) => {
      if (!data || !data.is_owner) throw Object.assign(new Error("Not permitted"), { response: { status: 403 } });
      if (active) setProfileData({ name: data.name || "", content: data.content || "", image: data.image || "" });
    }).catch(error => { if (active) setLoadError(error); }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [id, attempt]);

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
    <FormPage loading={loading} loadError={loadError} onRetry={() => setAttempt(n => n + 1)} title="Edit my profile" description="Add a photo and tell the community a little about yourself." icon="user" onSubmit={handleSubmit} errors={errors} submitLabel="Save changes" busyLabel="Saving…" onCancel={() => history.goBack()}>
      <PhotoField name="image" label="Profile photo" value={image} inputRef={imageFile} onChange={event => { if (event.target.files.length) { URL.revokeObjectURL(image); setProfileData({ ...profileData, image: URL.createObjectURL(event.target.files[0]) }); } }} error={errors?.image} portrait />
      <FormField label="Bio" name="content" value={content} onChange={handleChange} error={errors?.content} as="textarea" rows={5} />
    </FormPage>
  );
};

export default ProfileEditForm;
