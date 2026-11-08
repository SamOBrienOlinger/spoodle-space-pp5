import React from "react";
import SuggestedProfiles from "./SuggestedProfiles";
import { Link } from "react-router-dom";
import Icon from "./InterfaceIcon";
import { isPagesPreview, previewDogData } from "../config/deployment";
import styles from "../styles/FeedRightRail.module.css";

export default function FeedRightRail() {
  return <aside className={styles.RightRail} aria-label={isPagesPreview ? "About this demo" : "Suggested people"}>
    {isPagesPreview ? <section className={styles.Panel}><Icon name="paw" size={26} /><h2 className={styles.PanelTitle}>Meet the demo dog</h2><p className={styles.SupportingText}>See how a dog’s profile, health and behaviour details fit together.</p><Link to={previewDogData.path} className={styles.JoinLink}>Explore {previewDogData.label} <Icon name="arrow" size={17} /></Link></section> : <SuggestedProfiles limit={4} />}
  </aside>;
}
