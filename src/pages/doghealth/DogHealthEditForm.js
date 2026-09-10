import FormPage, { FormField, FormSection, formErrors } from "../../components/FormPage";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import {NotificationManager} from 'react-notifications';


function DogHealthEditForm() {
  const [errors, setErrors] = useState({});

  const [dogHealthData, setDogHealthData] = useState({
    vet_name: "",
    vet_phone: "",
    vet_email: "",
    kennel_cough: "",
    rabies: "",
    allergies: "",
  });
  const { vet_name, vet_phone, vet_email, kennel_cough, rabies, allergies } =
    dogHealthData;

  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/doghealth/${id}/`);
        const {
          vet_name,
          vet_phone,
          vet_email,
          kennel_cough,
          rabies,
          allergies,
          is_owner,
        } = data;

        is_owner
          ? setDogHealthData({
              vet_name,
              vet_phone,
              vet_email,
              kennel_cough,
              rabies,
              allergies,
            })
          : history.push("/");
      } catch (err) {
        
      }
    };

    handleMount();
  }, [history, id]);

  const handleChange = (event) => {
    setDogHealthData({
      ...dogHealthData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({});
    const formData = new FormData();

    formData.append("vet_name", vet_name);
    formData.append("vet_phone", vet_phone);
    formData.append("vet_email", vet_email);
    formData.append("kennel_cough", kennel_cough);
    formData.append("rabies", rabies);
    formData.append("allergies", allergies);

    try {
      await axiosReq.put(`/doghealth/${id}/`, formData);
      NotificationManager.success('Doggy health updated!', 'Success');
      history.push(`/doghealth/${id}`);
    } catch (err) {
      
      if (err.response?.status !== 401) {
        setErrors(formErrors(err));
        NotificationManager.error('Please try again', 'Oopsadoodle!')
      }
    }
  };

  return (
    <FormPage title="Doggy health" description="Keep vet contacts and your dog’s health notes together." icon="health" onSubmit={handleSubmit} errors={errors} submitLabel="Save changes" busyLabel="Saving…" onCancel={() => history.goBack()}>
      <FormSection title="Vet details">
        <FormField label="Vet name" name="vet_name" value={vet_name} onChange={handleChange} error={errors?.vet_name} type="text" required />
        <FormSection columns>
          <FormField label="Vet phone" name="vet_phone" value={vet_phone} onChange={handleChange} error={errors?.vet_phone} type="tel" required />
          <FormField label="Vet email" name="vet_email" value={vet_email} onChange={handleChange} error={errors?.vet_email} type="email" required />
        </FormSection>
      </FormSection>
      <FormSection title="Health notes">
        <FormField label="Kennel cough" name="kennel_cough" value={kennel_cough} onChange={handleChange} error={errors?.kennel_cough} as="textarea" rows={3} required />
        <FormField label="Rabies" name="rabies" value={rabies} onChange={handleChange} error={errors?.rabies} as="textarea" rows={3} required />
        <FormField label="Allergies" name="allergies" value={allergies} onChange={handleChange} error={errors?.allergies} as="textarea" rows={3} required />
      </FormSection>
    </FormPage>
  );
}

export default DogHealthEditForm;
