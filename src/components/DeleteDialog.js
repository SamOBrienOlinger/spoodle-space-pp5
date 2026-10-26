import React, { useRef, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { axiosRes } from "../api/axiosDefaults";
import { formErrors } from "../utils/errors";
import { SessionLink } from "./RequestState";
import styles from "../styles/Post.module.css";

export default function DeleteDialog({ show, onClose, url, label, onDeleted }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);
  const pending = useRef(false);
  const remove = async () => {
    if (pending.current) return;
    pending.current = true; setBusy(true); setError(null);
    try { await axiosRes.delete(url, { timeout: 20000 }); onDeleted(); onClose(); }
    catch (err) { setError(formErrors(err)); }
    finally { pending.current = false; setBusy(false); }
  };
  return <Modal show={show} onHide={() => !busy && onClose()} onExited={() => setError(null)} centered aria-labelledby="delete-record-title">
    <Modal.Header closeButton={!busy}><Modal.Title id="delete-record-title">Delete {label}?</Modal.Title></Modal.Header>
    <Modal.Body>This removes {label} and cannot be undone.{error && <div role="alert"><p>{(error.non_field_errors || error.detail || ["Deletion failed. Please try again."]).join(" ")}</p>{error.session && <SessionLink />}</div>}</Modal.Body>
    <Modal.Footer><button className={styles.Cancel} disabled={busy} onClick={onClose}>Keep {label}</button><button className={styles.Delete} disabled={busy} onClick={remove}>{busy ? "Deleting…" : `Delete ${label}`}</button></Modal.Footer>
  </Modal>;
}
