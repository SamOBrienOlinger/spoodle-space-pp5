import { FormField, FieldError, formErrors } from "../../components/FormPage";
import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import { axiosRes } from "../../api/axiosDefaults";

import styles from "../../styles/CommentCreateEditForm.module.css";

function CommentEditForm(props) {
  const { id, content, setShowEditForm, setComments } = props;

  const [formContent, setFormContent] = useState(content);
  const [busy, setBusy] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setFormContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (busy || !formContent.trim()) return;
    setBusy(true);
    setErrors({});
    try {
      await axiosRes.put(`/comments/${id}/`, {
        content: formContent.trim(),
      });
      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.map((comment) => {
          return comment.id === id
            ? {
                ...comment,
                content: formContent.trim(),
                updated_at: "now",
              }
            : comment;
        }),
      }));
      setShowEditForm(false);
    } catch (err) {
      setErrors(formErrors(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <Form className={styles.CommentForm} onSubmit={handleSubmit} aria-busy={busy}>
      <FormField id={`comment-edit-${id}`} label="Edit comment" name="content" as="textarea" value={formContent} onChange={handleChange} rows={2} disabled={busy} error={errors.content} />
      <FieldError error={errors.non_field_errors || errors.detail} />
      <div className={styles.Actions}>
        <button className={styles.SecondaryButton} onClick={() => setShowEditForm(false)} type="button" disabled={busy}>Cancel</button>
        <button className={styles.PrimaryButton} disabled={busy || !formContent.trim()} type="submit">{busy ? "Saving…" : "Save changes"}</button>
      </div>
    </Form>
  );
}

export default CommentEditForm;
