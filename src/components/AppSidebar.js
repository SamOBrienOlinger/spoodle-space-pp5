import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import axios from "axios";
import Icon from "./InterfaceIcon";
import AccountLink from "./AccountLink";
import DoggyDataMenu from "./DoggyDataMenu";
import { useCurrentUser, useSetCurrentUser } from "../contexts/CurrentUserContext";
import { removeTokenTimestamp } from "../utils/utils";
import { isPagesPreview, previewDogData, previewNavigation } from "../config/deployment";
import styles from "../styles/AppSidebar.module.css";

export default function AppSidebar() {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const history = useHistory();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const item = (to, icon, label, exact = false) => <NavLink key={to} exact={exact} to={to} className={styles.NavItem} activeClassName={styles.Active}><Icon name={icon} /><span>{label}</span></NavLink>;
  const signOut = async () => {
    if (busy) return;
    setBusy(true); setError("");
    try { await axios.post("dj-rest-auth/logout/"); removeTokenTimestamp(); setCurrentUser(null); history.push("/"); }
    catch (err) { setError("Sign-out did not complete. Please try again."); }
    finally { setBusy(false); }
  };
  return <aside className={styles.Sidebar} aria-label="SpoodleSpace navigation">
    <nav className={styles.Navigation} aria-label="Main navigation">
      {isPagesPreview ? previewNavigation.map(([to, icon, label]) =>
        to === previewDogData.path
          ? <DoggyDataMenu key={to} toggleClassName={styles.NavItem} activeClassName={styles.Active} />
          : item(to, icon, label, true)
      ) : <>
        {item("/", "home", "Home", true)}
        {currentUser ? <>
          {item(`/profiles/${currentUser.profile_id}`, "user", "My profile")}
          {item("/my-dog", "paw", "My dog")}
          {item("/liked", "heart", "Liked posts")}
          <button className={styles.SignOutButton} type="button" disabled={busy} onClick={signOut}><Icon name="logout" />{busy ? "Signing out…" : "Sign out"}</button>
        </> : <div className={styles.GuestLinks}>
          <AccountLink to="/signin">Sign in <Icon name="arrow" size={17} /></AccountLink>
          <AccountLink to="/signup">Join SpoodleSpace</AccountLink>
        </div>}
      </>}
    </nav>
    {error && <p role="alert" className={styles.Error}>{error}</p>}
  </aside>;
}
