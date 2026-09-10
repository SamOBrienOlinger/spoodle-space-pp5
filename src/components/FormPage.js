import React, { useEffect, useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import AppSidebar from "./AppSidebar";
import FeedRightRail from "./FeedRightRail";
import Icon from "./InterfaceIcon";
import styles from "../styles/FormPage.module.css";

const messages = value => (Array.isArray(value) ? value : [value]).filter(item => typeof item === "string" && item.trim());

export const formErrors = error => {
  const data = error.response?.data;
  if (data && typeof data === "object" && !Array.isArray(data)) {
    const errors = Object.fromEntries(Object.entries(data).map(([key, value]) => [key, messages(value)]));
    if (Object.values(errors).some(value => value.length)) return errors;
  }
  return { non_field_errors: ["Your changes couldn’t be saved. Please try again."] };
};

export function FieldError({ error, id }) {
  const items = messages(error);
  return items.length ? <div id={id} className={styles.FieldError} role="alert">{items.map((message, index) => <p key={index}>{message}</p>)}</div> : null;
}

export function FormField({ label, name, id = name, error, hint, ...props }) {
  const hasError = messages(error).length > 0;
  const describedBy = [hint && `${id}-hint`, hasError && `${id}-error`].filter(Boolean).join(" ");
  return <Form.Group controlId={id} className={styles.Field}>
    <Form.Label>{label}{props.required && <span className={styles.Required} aria-hidden="true"> *</span>}</Form.Label>
    <Form.Control name={name} aria-invalid={hasError || undefined} aria-describedby={describedBy || undefined} {...props} />
    {hint && <p id={`${id}-hint`} className={styles.Hint}>{hint}</p>}
    <FieldError id={`${id}-error`} error={error} />
  </Form.Group>;
}

export function FormSection({ title, children, columns = false }) {
  return <fieldset className={styles.Section}>
    {title && <legend>{title}</legend>}
    <div className={columns ? styles.Columns : styles.Stack}>{children}</div>
  </fieldset>;
}

export function PhotoField({ name = "image", label = "Photo", value, inputRef, onChange, error, portrait = false }) {
  const id = `${name}-upload`;
  return <div className={styles.PhotoField}>
    <label htmlFor={id} className={styles.PhotoLabel}>{label}</label>
    <div className={`${styles.Upload} ${portrait ? styles.PortraitUpload : ""}`}>
      {value ? <img className={portrait ? styles.Portrait : styles.Photo} src={value} alt={`${label} preview`} /> : <span className={styles.UploadIcon}><Icon name="photo" size={28} /></span>}
      <div className={styles.UploadControl}>
        <p>{value ? "Choose a new photo to replace this one." : "Add a favourite photo."}</p>
        <input id={id} name={name} type="file" accept="image/*" ref={inputRef} onChange={onChange} aria-describedby={`${id}-hint${messages(error).length ? ` ${id}-error` : ""}`} aria-invalid={messages(error).length > 0 || undefined} />
        <small id={`${id}-hint`}>Choose an image from your device.</small>
      </div>
    </div>
    <FieldError id={`${id}-error`} error={error} />
  </div>;
}

export default function FormPage({ title, description, icon = "paw", onSubmit, onCancel, submitLabel = "Save changes", busyLabel = "Saving…", errors, children, auth = false, footer }) {
  const [busy, setBusy] = useState(false);
  const pending = useRef(false);
  const mounted = useRef(true);
  useEffect(() => () => { mounted.current = false; }, []);
  const submit = async event => {
    event.preventDefault();
    if (pending.current) return;
    pending.current = true;
    setBusy(true);
    try { await onSubmit(event); }
    finally { pending.current = false; if (mounted.current) setBusy(false); }
  };
  return <div className={auth ? styles.AuthLayout : styles.Layout}>
    {!auth && <div className={styles.LeftColumn}><AppSidebar /></div>}
    <main className={styles.Main}>
      <section className={styles.Card} aria-labelledby="form-page-title">
        <header className={styles.Header}>
          <span className={styles.HeaderIcon}><Icon name={icon} size={24} /></span>
          <div><h1 id="form-page-title">{title}</h1><p>{description}</p></div>
        </header>
        <Form onSubmit={submit} aria-labelledby="form-page-title" aria-busy={busy}>
          <fieldset className={styles.FormBody} disabled={busy}>
            {children}
            <FieldError error={errors?.non_field_errors} />
            <FieldError error={errors?.detail} />
            <div className={`${styles.Actions} ${auth ? styles.AuthActions : ""}`}>
              {onCancel && <button className={styles.SecondaryButton} type="button" onClick={onCancel}>Cancel</button>}
              <button className={styles.PrimaryButton} type="submit" disabled={busy}>{busy ? busyLabel : submitLabel}</button>
            </div>
          </fieldset>
        </Form>
      </section>
      {footer && <p className={styles.Footer}>{footer}</p>}
    </main>
    {!auth && <div className={styles.RightColumn}><FeedRightRail /></div>}
  </div>;
}
