import React from "react";
import { NavLink } from "react-router-dom";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import { doggyData, isPagesPreview } from "../config/deployment";
import DoggyDataMenu from "./DoggyDataMenu";
import Icon from "./InterfaceIcon";
import styles from "../styles/SiteNavigation.module.css";

export default function SiteNavigation() {
  const user = useCurrentUser();
  const accountPath = user ? `/profiles/${user.profile_id}` : "/signin";
  const items = [
    ["/", "home", "Home"],
    [isPagesPreview ? "/search/" : "/search", "search", "Search"],
    [isPagesPreview ? "/posts/create/" : "/posts/create", "plus", "Post"],
    [doggyData.path, "dog", doggyData.label],
    [isPagesPreview ? "/profile/" : accountPath, "user", "Profile"],
  ];
  return (
    <nav className={styles.Bar} aria-label="Main navigation">
      {items.map(([to, icon, label]) => to === doggyData.path ? (
        <DoggyDataMenu key={to} toggleClassName={styles.Item} activeClassName={styles.Active} />
      ) : (
        <NavLink key={label} exact={isPagesPreview || to === "/"} to={to} className={styles.Item} activeClassName={styles.Active}>
          <Icon name={icon} />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
