import React, { useEffect, useRef, useState } from "react";
import { preparePhoto } from "../utils/photos";
import { FieldError } from "./FormPage";
import styles from "../styles/FormPage.module.css";

export default function PhotoPicker({ value, onChange, onBusyChange, error, demo = false }) {
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
      setNote(prepared === file ? "Photo ready." : demo ?
        "Photo resized for this local preview." : "Photo resized and prepared for upload. Review the preview before posting.");
    } catch (err) { if (generation.current === ticket) setError(err.message); }
    finally { if (generation.current === ticket) { setBusy(false); onBusyChange(false); input.current.value = ""; } }
  };
  const remove = () => {
    onChange(null);
    setError("");
    setNote(demo ? "Photo removed. You can preview a text-only post." : "Photo removed. You can post without a photo.");
    input.current.focus();
  };
  return <div className={styles.PhotoField}>
    <label className="sr-only" htmlFor="post-photo">Post photo</label>
    {value && <img className={styles.Photo} src={value} alt={demo ? "Selected photo preview" : "Selected upload preview"} />}
    <input ref={input} id="post-photo" type="file" name="image" accept="image/jpeg,image/png,image/webp,image/gif" onChange={select} disabled={busy} aria-describedby={localError || error ? "post-photo-error" : undefined} aria-invalid={Boolean(localError || error) || undefined} />
    {value && <div className={styles.Actions}><button className={styles.SecondaryButton} type="button" disabled={busy} onClick={() => input.current.click()}>Replace photo</button><button className={styles.SecondaryButton} type="button" disabled={busy} onClick={remove}>Remove photo</button></div>}
    <p role="status">{busy ? "Preparing photo…" : note}</p><FieldError id="post-photo-error" error={localError || error} />
  </div>;
}
