import FormPage, { FormField, FormSection, PhotoField, formErrors } from "../../components/FormPage";
import React, { useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import {NotificationManager} from 'react-notifications';


const DogProfileEditForm = () => {
  const [errors, setErrors] = useState({});

  const [dogProfileData, setDogProfileData] = useState({
    dog_name: "",
    dog_age: "",
    dog_color: "",
    dog_bio: "",
    dog_profile_image: "",
  });

  const { dog_name, dog_age, dog_color, dog_bio, dog_profile_image } =
    dogProfileData;

  const imageInput = useRef(null);
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/dogprofiles/${id}/`);
        const {
          dog_name,
          dog_age,
          dog_color,
          dog_bio,
          dog_profile_image,
          is_owner,
        } = data;

        is_owner
          ? setDogProfileData({
              dog_name,
              dog_age,
              dog_color,
              dog_bio,
              dog_profile_image,
            })
          : history.push("/");
      } catch (err) {
        
      }
    };

    handleMount();
  }, [history, id]);

  const handleChange = (event) => {
    setDogProfileData({
      ...dogProfileData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(dog_profile_image);
      setDogProfileData({
        ...dogProfileData,
        dog_profile_image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({});
    const formData = new FormData();

    formData.append("dog_name", dog_name);
    formData.append("dog_age", dog_age);
    formData.append("dog_color", dog_color);
    formData.append("dog_bio", dog_bio);

    if (imageInput?.current?.files[0]) {
      formData.append("dog_profile_image", imageInput.current.files[0]);
    }

    try {
      await axiosReq.put(`/dogprofiles/${id}/`, formData);
      NotificationManager.success('Doggy profile updated!', 'Success');
      history.push(`/dogprofiles/${id}`);
    } catch (err) {
      
      if (err.response?.status !== 401) {
        setErrors(formErrors(err));
        NotificationManager.error('Error', 'Click me!')

      }
    }
  };

  return (
    <FormPage title="Doggy profile" description="Keep your dog’s photo and details up to date." icon="paw" onSubmit={handleSubmit} errors={errors} submitLabel="Save changes" busyLabel="Saving…" onCancel={() => history.goBack()}>
      <PhotoField name="dog_profile_image" label="Dog photo" value={dog_profile_image} inputRef={imageInput} onChange={handleChangeImage} error={errors?.dog_profile_image} portrait />
      <FormField label="Dog name" name="dog_name" value={dog_name} onChange={handleChange} error={errors?.dog_name} type="text" required />
      <FormSection columns>
        <FormField label="Dog age" name="dog_age" value={dog_age} onChange={handleChange} error={errors?.dog_age} type="text" required placeholder="e.g. 3 years" />
        <FormField label="Dog colour" name="dog_color" value={dog_color} onChange={handleChange} error={errors?.dog_color} type="text" required />
      </FormSection>
      <FormField label="Dog bio" name="dog_bio" value={dog_bio} onChange={handleChange} error={errors?.dog_bio} as="textarea" rows={4} required />
    </FormPage>
  );
};

export default DogProfileEditForm;
