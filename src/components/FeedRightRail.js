import React from "react";
import SuggestedProfiles from "./SuggestedProfiles";
import AccountLink from "./AccountLink";
import Icon from "./InterfaceIcon";
import { isPagesPreview } from "../config/deployment";
import styles from "../styles/FeedRightRail.module.css";

export default function FeedRightRail() {
  return <aside className={styles.RightRail} aria-label="Suggested people">
    {isPagesPreview ? <section className={styles.Panel}><Icon name="people" size={26} /><h2 className={styles.PanelTitle}>Find your people</h2><p className={styles.SupportingText}>Follow fellow dog owners and share the everyday moments.</p><AccountLink to="/signup" className={styles.JoinLink}>Join SpoodleSpace <Icon name="arrow" size={17} /></AccountLink></section> : <SuggestedProfiles limit={4} />}
  </aside>;
}
