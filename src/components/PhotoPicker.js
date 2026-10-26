import React, { useEffect, useRef, useState } from "react";
import { IMAGE_HELP, preparePhoto } from "../utils/photos";
import { FieldError } from "./FormPage";
import styles from "../styles/FormPage.module.css";

export default function PhotoPicker({ value, onChange, onBusyChange, error }) {
  const input = useRef(null);
  const generation = useRef(0);
  const [busy, setBusy] = useState(false);
  const [localError, setError] = useState("");
  const [note, setNote] = useState("");
  useEffect(() => () => { generation.current += 1; }, []);
  const select = async event => {
    const file = event.target.files[0];
    if (!file) return;
    const ticket = ++generation.current;
    setError(""); setNote(""); setBusy(true); onBusyChange(true);
    try {
      const prepared = await preparePhoto(file);
      if (generation.current !== ticket) return;
      onChange(prepared);
      setNote(prepared === file ? "Photo ready." : "Photo resized and prepared for upload. Review the preview before posting.");
    } catch (err) { if (generation.current === ticket) setError(err.message); }
    finally { if (generation.current === ticket) { setBusy(false); onBusyChange(false); input.current.value = ""; } }
  };
  return <div className={styles.PhotoField}>
    <label className={styles.PhotoLabel} htmlFor="post-photo">Post photo <span>(optional)</span></label>
    <p id="post-photo-hint">{IMAGE_HELP} Large JPEG and PNG photos are automatically resized or compressed before upload.</p>
    {value && <img className={styles.Photo} src={value} alt="Selected upload preview" />}
    <input ref={input} id="post-photo" type="file" name="image" accept="image/jpeg,image/png,image/webp,image/gif" onChange={select} disabled={busy} aria-describedby={`post-photo-hint${localError || error ? " post-photo-error" : ""}`} aria-invalid={Boolean(localError || error) || undefined} />
    {value && <div className={styles.Actions}><button className={styles.SecondaryButton} type="button" disabled={busy} onClick={() => input.current.click()}>Replace photo</button><button className={styles.SecondaryButton} type="button" disabled={busy} onClick={() => { onChange(null); setError(""); setNote("Photo removed. You can post without a photo."); }}>Remove photo</button></div>}
    <p role="status">{busy ? "Preparing photo…" : note}</p><FieldError id="post-photo-error" error={localError || error} />
  </div>;
}
