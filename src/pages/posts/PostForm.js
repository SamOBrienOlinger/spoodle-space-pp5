import React, { useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import FormPage, { FormField, formErrors } from "../../components/FormPage";
import PhotoPicker from "../../components/PhotoPicker";
import RequestState from "../../components/RequestState";
import CommunityLayout from "../../components/CommunityLayout";
import { axiosReq } from "../../api/axiosDefaults";
import { useRedirect } from "../../hooks/useRedirect";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import useDraft from "../../hooks/useDraft";
import { invalidateFeed } from "../../utils/feedMemory";

export default function PostForm({ edit = false }) {
  useRedirect("loggedOut");
  const user = useCurrentUser();
  const { id } = useParams();
  // Mount the draft only after the account is known; never reuse another account's text.
  if (!user) return <CommunityLayout><RequestState loading subject="your account" /></CommunityLayout>;
  return <PostEditor key={`${user.profile_id}:${edit ? id : "new"}`} user={user} id={id} edit={edit} />;
}

function PostEditor({ user, id, edit }) {
  const history = useHistory();
  const draftKey = `spoodle-post:${user?.profile_id || "guest"}:${edit ? id : "new"}`;
  const [fields, setFields, clearDraft] = useDraft(draftKey, { title: "", content: "" });
  const [photo, setPhoto] = useState("");
  const file = useRef(null);
  const removed = useRef(false);
  const preview = useRef(null);
  const [preparing, setPreparing] = useState(false);
  const [errors, setErrors] = useState({});
  const [loadError, setLoadError] = useState(null);
  const [loaded, setLoaded] = useState(!edit);
  const [attempt, setAttempt] = useState(0);
  const [progress, setProgress] = useState(null);
  // Read the original text once; subsequent renders must not overwrite an edited draft.
  const initialDraft = useRef(undefined);
  if (initialDraft.current === undefined) {
    try { initialDraft.current = sessionStorage.getItem(draftKey); } catch (_) { initialDraft.current = ""; }
  }
  useEffect(() => {
    let active = true;
    if (edit) {
      setLoaded(false); setLoadError(null);
      axiosReq.get(`/posts/${id}/`, { timeout: 20000 }).then(({ data }) => {
        if (!data || typeof data.title !== "string") throw new Error("Invalid post");
        if (!data.is_owner) throw Object.assign(new Error("Not permitted"), { response: { status: 403 } });
        if (!active) return;
        if (!initialDraft.current) setFields({ title: data.title, content: data.content || "" });
        setPhoto(data.image || ""); setLoaded(true);
      }).catch(error => { if (active) setLoadError(error); });
    }
    return () => { active = false; };
    // setFields is stable; the record or explicit retry controls the fetch.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [edit, id, attempt]);
  useEffect(() => () => { if (preview.current) URL.revokeObjectURL(preview.current); }, []);
  const changePhoto = next => {
    if (preview.current) URL.revokeObjectURL(preview.current);
    file.current = next; removed.current = !next;
    preview.current = next ? URL.createObjectURL(next) : null;
    setPhoto(preview.current || ""); setErrors(prev => ({ ...prev, image: undefined }));
  };
  const submit = async event => {
    event.preventDefault();
    if (preparing) return;
    setErrors({}); setProgress(file.current ? 0 : null);
    const body = new FormData(); body.append("title", fields.title); body.append("content", fields.content);
    if (file.current) body.append("image", file.current);
    else if (removed.current && edit) body.append("image", "");
    try {
      const config = { timeout: 60000, onUploadProgress: event => { if (event.total) setProgress(Math.round(event.loaded * 100 / event.total)); } };
      const { data } = edit ? await axiosReq.put(`/posts/${id}/`, body, config) : await axiosReq.post("/posts/", body, config);
      if (!data || data.id == null) throw new Error("Invalid post response");
      clearDraft(); invalidateFeed(); history.push(`/posts/${data.id}`);
    } catch (error) { setErrors(formErrors(error)); setProgress(null); }
  };
  if (edit && !loaded) return <CommunityLayout><RequestState loading={!loadError} error={loadError} retry={() => setAttempt(n => n + 1)} subject="your post" /></CommunityLayout>;
  return <FormPage title={edit ? "Edit post" : "Create post"} description="Share a moment with the SpoodleSpace community." icon="photo" onSubmit={submit} errors={errors} submitLabel={edit ? "Save changes" : "Post"} busyLabel="Saving…" submitDisabled={preparing} onCancel={() => history.goBack()}>
    <PhotoPicker value={photo} onChange={changePhoto} onBusyChange={setPreparing} error={errors.image} />
    <FormField label="Title" name="title" required maxLength={255} value={fields.title} onChange={event => setFields({ ...fields, title: event.target.value })} error={errors.title} />
    <FormField label="Content" name="content" hint="Optional. Share the story behind the moment." as="textarea" rows={5} value={fields.content} onChange={event => setFields({ ...fields, content: event.target.value })} error={errors.content} />
    {progress !== null && <div role="status"><label htmlFor="photo-upload-progress">{progress === 100 ? "Upload complete. Saving your post…" : `Uploading photo: ${progress}%`}</label><progress id="photo-upload-progress" value={progress} max="100" /></div>}
  </FormPage>;
}
