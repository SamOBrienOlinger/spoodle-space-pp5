import { FormField, FieldError, formErrors } from "../../components/FormPage";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import Form from "react-bootstrap/Form";

import styles from "../../styles/CommentCreateEditForm.module.css";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";

function CommentCreateForm(props) {
  const { post, setPost, setComments, profileImage, profile_id } = props;
  const [content, setContent] = useState("");
  const [busy, setBusy] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (busy || !content.trim()) return;
    setBusy(true);
    setErrors({});
    try {
      const { data } = await axiosRes.post("/comments/", {
        content,
        post,
      });
      setComments((prevComments) => ({
        ...prevComments,
        results: [data, ...prevComments.results],
      }));
      setPost((prevPost) => ({
        results: [
          {
            ...prevPost.results[0],
            comments_count: prevPost.results[0].comments_count + 1,
          },
        ],
      }));
      setContent("");
    } catch (err) {
      setErrors(formErrors(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <Form className={styles.CommentForm} onSubmit={handleSubmit} aria-busy={busy}>
      <div className={styles.Composer}>
        <Link to={`/profiles/${profile_id}`} aria-label="My profile"><Avatar src={profileImage} /></Link>
        <div className={styles.Content}>
          <FormField id={`comment-create-${post}`} label="Add a comment" name="content" as="textarea" value={content} onChange={handleChange} rows={2} placeholder="Join the conversation…" disabled={busy} error={errors.content} />
          <FieldError error={errors.non_field_errors || errors.detail} />
        </div>
      </div>
      <div className={styles.Actions}><button className={styles.PrimaryButton} disabled={busy || !content.trim()} type="submit">{busy ? "Posting…" : "Post comment"}</button></div>
    </Form>
  );
}

export default CommentCreateForm;
