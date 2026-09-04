import React from "react";
import { Link } from "react-router-dom";
import SuggestedProfiles from "./SuggestedProfiles";
import AccountLink from "./AccountLink";
import Icon from "./InterfaceIcon";
import { isPagesPreview, liveAppOrigin } from "../config/deployment";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import styles from "../styles/FeedRightRail.module.css";
const shortcuts = [
  { to: "/dogprofilespage", icon: "paw", label: "Dog profiles", text: "Get to know the good dogs", tone: "Lilac" },
  { to: "/dogshealthpage", icon: "health", label: "Health records", text: "Care, all in one place", tone: "Mint" },
  { to: "/dogdangerspage", icon: "safety", label: "Safety & dangers", text: "Know what to look out for", tone: "Peach" },
  { to: "/liked", icon: "heart", label: "Liked posts", text: "Your favourite moments", tone: "Lilac" }
];
export default function FeedRightRail() {
  const currentUser = useCurrentUser();
  return <aside className={styles.RightRail} aria-label="Feed shortcuts">
    <section className={styles.Panel} aria-labelledby="quick-links-title">
      <span className={styles.Eyebrow}>A little care goes a long way</span>
      <h2 id="quick-links-title" className={styles.PanelTitle}>The dog corner</h2>
      <div className={styles.QuickLinks}>{shortcuts.map(({ to, icon, label, text, tone }) => {
        const body = <><span className={`${styles.IconWrap} ${styles[tone]}`}><Icon name={icon} size={21} /></span><span className={styles.ShortcutText}><strong>{label}</strong><small>{text}</small></span><Icon name="arrow" size={15} /></>;
        return isPagesPreview ? <a key={to} className={styles.QuickLink} href={`${liveAppOrigin}${to}`}>{body}</a> : <Link key={to} className={styles.QuickLink} to={currentUser ? to : "/signin"}>{body}</Link>;
      })}</div>
      {!currentUser && <p className={styles.SupportingText}>Sign in to explore your community and dog records.</p>}
    </section>
    {isPagesPreview ? <section className={`${styles.Panel} ${styles.WarmPanel}`}><Icon name="people" size={26} /><h2 className={styles.PanelTitle}>Find your people.</h2><p className={styles.SupportingText}>Follow fellow dog owners. Share the everyday things that make life with a dog so good.</p><AccountLink to="/signup" className={styles.JoinLink}>Join SpoodleSpace <Icon name="arrow" size={17} /></AccountLink></section> : <div id="suggested-people"><SuggestedProfiles limit={4} /></div>}
    <div className={styles.Note}><Icon name="paw" size={26} /><p>More tail wags.<br /><em>Less endless scrolling.</em></p><span>Stay for a moment. Then go for a walk.</span></div>
  </aside>;
}
