import React from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

import Avatar from "./Avatar";
import AccountLink from "./AccountLink";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";
import { removeTokenTimestamp } from "../utils/utils";
import styles from "../styles/AppSidebar.module.css";

const AppSidebar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
      removeTokenTimestamp();
    } catch (err) {
      console.log(err.response);
    }
  };

  const navItem = (to, icon, label, exact = false) => (
    <NavLink
      exact={exact}
      className={styles.NavItem}
      activeClassName={styles.Active}
      to={to}
    >
      <i className={icon} aria-hidden="true" />
      <span>{label}</span>
    </NavLink>
  );

  return (
    <aside className={styles.Sidebar} aria-label="SpoodleSpace navigation">
      {currentUser && (
        <div className={styles.ProfileSummary}>
          <Avatar
            src={currentUser.profile_image}
            text={currentUser.username}
            height={48}
          />
          <NavLink
            className={styles.ProfileLink}
            to={`/profiles/${currentUser.profile_id}`}
          >
            View my profile
          </NavLink>
        </div>
      )}

      <nav className={styles.Navigation}>
        {navItem("/", "fas fa-home", "Home", true)}

        {currentUser ? (
          <>
            {navItem("/feed", "fas fa-stream", "Following feed")}
            {navItem("/posts/create", "far fa-plus-square", "Create post")}
            {navItem(`/profiles/${currentUser.profile_id}`, "fas fa-user", "My profile")}
            {navItem("/dogprofilespage", "fas fa-dog", "Dog profiles")}
            {navItem("/dogshealthpage", "fas fa-heartbeat", "Health records")}
            {navItem("/dogdangerspage", "fas fa-exclamation-triangle", "Safety & dangers")}
            {navItem("/liked", "fas fa-heart", "Liked posts")}
            {navItem(`/profiles/${currentUser.profile_id}/edit`, "fas fa-cog", "Profile settings")}

            <button
              className={styles.SignOutButton}
              type="button"
              onClick={handleSignOut}
            >
              <i className="fas fa-sign-out-alt" aria-hidden="true" />
              <span>Sign out</span>
            </button>
          </>
        ) : (
          <>
            <AccountLink className={styles.NavItem} to="/signin">
              <i className="fas fa-sign-in-alt" aria-hidden="true" />
              <span>Sign in</span>
            </AccountLink>
            <AccountLink className={styles.NavItem} to="/signup">
              <i className="fas fa-user-plus" aria-hidden="true" />
              <span>Sign up</span>
            </AccountLink>
          </>
        )}
      </nav>
    </aside>
  );
};

export default AppSidebar;
