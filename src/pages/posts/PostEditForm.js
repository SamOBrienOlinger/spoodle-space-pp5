import FormPage, { FormField, PhotoField, formErrors } from "../../components/FormPage";
import React, { useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import {NotificationManager} from 'react-notifications';

function PostEditForm() {
  const [errors, setErrors] = useState({});

  const [postData, setPostData] = useState({
    title: "",
    content: "",
    image: "",
  });
  const { title, content, image } = postData;

  const imageInput = useRef(null);
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/posts/${id}/`);
        const { title, content, image, is_owner } = data;

        is_owner ? setPostData({ title, content, image }) : history.push("/");
      } catch (err) {
        
      }
    };

    handleMount();
  }, [history, id]);

  const handleChange = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setPostData({
        ...postData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({});
    const formData = new FormData();

    formData.append("title", title);
    formData.append("content", content);

    if (imageInput?.current?.files[0]) {
      formData.append("image", imageInput.current.files[0]);
    }

    try {
      await axiosReq.put(`/posts/${id}/`, formData);
      NotificationManager.success('Post Edited!', 'Success');
      history.push(`/posts/${id}`);
    } catch (err) {
      
      if (err.response?.status !== 401) {
        setErrors(formErrors(err));
        NotificationManager.error('Please try again', 'Oopsadoodle!')
      }
    }
  };

  return (
    <FormPage title="Edit post" description="Share a moment with the SpoodleSpace community." icon="photo" onSubmit={handleSubmit} errors={errors} submitLabel="Save changes" busyLabel="Saving…" onCancel={() => history.goBack()}>
      <PhotoField name="image" label="Post photo" value={image} inputRef={imageInput} onChange={handleChangeImage} error={errors?.image}  />
      <FormField label="Title" name="title" value={title} onChange={handleChange} error={errors?.title} type="text" placeholder="Give your post a title" />
      <FormField label="Content" name="content" value={content} onChange={handleChange} error={errors?.content} as="textarea" rows={5} placeholder="What would you like to share?" />
    </FormPage>
  );
}

export default PostEditForm;
