import React from "react";
import { Link } from "react-router-dom";
import { errorMessage, isSessionError } from "../utils/errors";
import styles from "../styles/Hub.module.css";

export function SessionLink() {
  return <Link to="/signin" target="_blank" rel="noopener noreferrer">Sign in in a new tab, then return here to retry</Link>;
}

export default function RequestState({ loading, error, retry, subject = "this content" }) {
  if (loading) return <div className={styles.State} role="status">Loading {subject}…</div>;
  if (!error) return null;
  return <section className={styles.State} role="alert"><h2>{error.response?.status === 404 ? "Item unavailable" : "Something interrupted the walk"}</h2><p>{errorMessage(error, subject)}</p>{isSessionError(error) && <p><SessionLink /></p>}<button className={styles.Button} onClick={retry}>Try again</button></section>;
}
