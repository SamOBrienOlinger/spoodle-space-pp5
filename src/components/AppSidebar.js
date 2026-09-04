import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import axios from "axios";
import Avatar from "./Avatar";
import Icon from "./InterfaceIcon";
import AccountLink from "./AccountLink";
import { useCurrentUser, useSetCurrentUser } from "../contexts/CurrentUserContext";
import { removeTokenTimestamp } from "../utils/utils";
import styles from "../styles/AppSidebar.module.css";

export default function AppSidebar() {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const history = useHistory();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const item = (to, icon, label, exact = false) => <NavLink exact={exact} to={to} className={styles.NavItem} activeClassName={styles.Active}><Icon name={icon} /><span>{label}</span></NavLink>;
  const signOut = async () => {
    if (busy) return;
    setBusy(true); setError("");
    try { await axios.post("dj-rest-auth/logout/"); removeTokenTimestamp(); setCurrentUser(null); history.push("/"); }
    catch (err) { setError("Sign-out did not complete. Please try again."); }
    finally { setBusy(false); }
  };
  return <aside className={styles.Sidebar} aria-label="SpoodleSpace navigation">
    <div className={styles.ProfileSummary}>
      {currentUser ? <><Avatar src={currentUser.profile_image} height={46} /><div><strong>{currentUser.username}</strong><NavLink to={`/profiles/${currentUser.profile_id}`}>View my profile <span aria-hidden="true">↗</span></NavLink></div></> : <><span className={styles.BrandPaw}><Icon name="paw" size={26} /></span><div><strong>Your kind of people.</strong><span>The dog kind, of course.</span></div></>}
    </div>
    <nav className={styles.Navigation} aria-label="Main navigation">
      <p className={styles.GroupLabel}>The community</p>
      {item("/", "home", "Home", true)}
      {currentUser && <>{item("/feed", "feed", "Following feed")}{item("/liked", "heart", "Liked posts")}</>}
      {currentUser ? <>
        <p className={styles.GroupLabel}>The dog corner</p>
        {item("/dogprofilespage", "paw", "Dog profiles")}
        {item("/dogshealthpage", "health", "Health records")}
        {item("/dogdangerspage", "safety", "Safety & dangers")}
        <p className={styles.GroupLabel}>Your space</p>
        {item(`/profiles/${currentUser.profile_id}`, "user", "My profile", true)}
        {item(`/profiles/${currentUser.profile_id}/edit`, "settings", "Profile settings")}
        <button className={styles.SignOutButton} type="button" disabled={busy} onClick={signOut}><Icon name="logout" />{busy ? "Signing out…" : "Sign out"}</button>
      </> : <div className={styles.GuestLinks}><AccountLink to="/signin">Sign in <Icon name="arrow" size={17} /></AccountLink><AccountLink to="/signup">Join SpoodleSpace</AccountLink></div>}
    </nav>
    {error && <p role="alert" className={styles.Error}>{error}</p>}
    {currentUser && <NavLink to="/posts/create" className={styles.Create}><Icon name="plus" />Create post</NavLink>}
    <div className={styles.SidebarNote}><Icon name="paw" size={22} /><p>A little space.<br /><em>A lot of dog love.</em></p></div>
  </aside>;
}
