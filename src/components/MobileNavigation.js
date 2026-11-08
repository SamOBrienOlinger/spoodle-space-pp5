import React from "react";
import { NavLink } from "react-router-dom";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import { isPagesPreview, previewDogData, previewNavigation } from "../config/deployment";
import DoggyDataMenu from "./DoggyDataMenu";
import Icon from "./InterfaceIcon";
import styles from "../styles/MobileNavigation.module.css";

export default function MobileNavigation() {
  const user = useCurrentUser();
  const items = isPagesPreview ? previewNavigation : [["/", "home", "Home"], ["/search", "search", "Search"], ["/posts/create", "plus", "Post"], ["/my-dog", "paw", "My dog"], [user ? `/profiles/${user.profile_id}` : "/signin", "user", "Profile"]];
  return (
    <nav className={`${styles.Bar} ${isPagesPreview ? styles.InHeader : styles.AtBottom}`} aria-label="Mobile navigation">
      {items.map(([to, icon, label]) => isPagesPreview && to === previewDogData.path ? (
        <DoggyDataMenu key={to} mobile toggleClassName={styles.Item} activeClassName={styles.Active} />
      ) : (
        <NavLink key={label} exact={isPagesPreview || to === "/"} to={to} className={styles.Item} activeClassName={styles.Active}>
          <Icon name={icon} />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
