import FormPage, { FormField, FormSection, formErrors } from "../../components/FormPage";
import { useHistory, useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import React, { useEffect, useState } from "react";
import {NotificationManager} from 'react-notifications';


const DogDangerEditForm = () => {
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
  const { id } = useParams();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/dogdanger/${id}/`);
        const {
          bites_babies,
          bites_kids,
          bites_teenagers,
          bites_burglars,
          dangerously_cute,
          is_owner,
        } = data;

        is_owner
          ? setDogDangerData({
              bites_babies,
              bites_kids,
              bites_teenagers,
              bites_burglars,
              dangerously_cute,
            })
          : history.push("/");
      } catch (err) {
        
      }
    };

    handleMount();
  }, [history, id]);

  const handleChange = (event) => {
    setDogDangerData({
      ...dogDangerData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({});
    const formData = new FormData();

    formData.append("bites_babies", bites_babies);
    formData.append("bites_kids", bites_kids);
    formData.append("bites_teenagers", bites_teenagers);
    formData.append("bites_burglars", bites_burglars);
    formData.append("dangerously_cute", dangerously_cute);

    try {
      await axiosReq.put(`/dogdanger/${id}/`, formData);
      NotificationManager.success('Doggy danger updated!', 'Success');
      history.push(`/dogdanger/${id}`);
    } catch (err) {
      
      if (err.response?.status !== 401) {
        setErrors(formErrors(err));
        NotificationManager.error('Please try again', 'Oopsadoodle!')
      }
    }
  };

  return (
    <FormPage title="Doggy danger" description="Share the behaviour details others should know about your dog." icon="safety" onSubmit={handleSubmit} errors={errors} submitLabel="Save changes" busyLabel="Saving…" onCancel={() => history.goBack()}>
      <FormSection title="Behaviour details">
        <FormField label="Bites babies?" name="bites_babies" value={bites_babies} onChange={handleChange} error={errors?.bites_babies} as="textarea" rows={2} required />
        <FormField label="Bites kids?" name="bites_kids" value={bites_kids} onChange={handleChange} error={errors?.bites_kids} as="textarea" rows={2} required />
        <FormField label="Bites teenagers?" name="bites_teenagers" value={bites_teenagers} onChange={handleChange} error={errors?.bites_teenagers} as="textarea" rows={2} required />
        <FormField label="Bites burglars?" name="bites_burglars" value={bites_burglars} onChange={handleChange} error={errors?.bites_burglars} as="textarea" rows={2} required />
        <FormField label="Dangerously cute?" name="dangerously_cute" value={dangerously_cute} onChange={handleChange} error={errors?.dangerously_cute} as="textarea" rows={2} required />
      </FormSection>
    </FormPage>
  );
};

export default DogDangerEditForm;
