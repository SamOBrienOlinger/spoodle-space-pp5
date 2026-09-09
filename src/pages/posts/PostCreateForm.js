import FormPage, { FormField, PhotoField, formErrors } from "../../components/FormPage";
import React, { useRef, useState } from "react";
import { useHistory } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import { useRedirect } from "../../hooks/useRedirect";
import {NotificationManager} from 'react-notifications';

function PostCreateForm() {
  useRedirect("loggedOut");
  const [errors, setErrors] = useState({});

  const [postData, setPostData] = useState({
    title: "",
    content: "",
    image: "",
  });
  const { title, content, image } = postData;

  const imageInput = useRef(null);
  const history = useHistory();

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
    if (imageInput.current?.files[0]) {
      formData.append("image", imageInput.current.files[0]);
    }

    try {
      const { data } = await axiosReq.post("/posts/", formData);
      NotificationManager.success('Post Created!', 'Success');
      history.push(`/posts/${data.id}`);
    } catch (err) {
      
      if (err.response?.status !== 401) {
        setErrors(formErrors(err));
        NotificationManager.error('Please try again', 'Oopsadoodle!')
      }
    }
  };

  return (
    <FormPage title="Create post" description="Share a moment with the SpoodleSpace community." icon="photo" onSubmit={handleSubmit} errors={errors} submitLabel="Post" busyLabel="Posting…" onCancel={() => history.goBack()}>
      <PhotoField name="image" label="Post photo" value={image} inputRef={imageInput} onChange={handleChangeImage} error={errors?.image}  />
      <FormField label="Title" name="title" value={title} onChange={handleChange} error={errors?.title} type="text" placeholder="Give your post a title" />
      <FormField label="Content" name="content" value={content} onChange={handleChange} error={errors?.content} as="textarea" rows={5} placeholder="What would you like to share?" />
    </FormPage>
  );
}

export default PostCreateForm;
