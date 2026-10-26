import React from "react";
import { NavLink } from "react-router-dom";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import Icon from "./InterfaceIcon";
import styles from "../styles/MobileNavigation.module.css";

export default function MobileNavigation() {
  const user = useCurrentUser();
  const items = [["/", "home", "Home"], ["/search", "search", "Search"], ["/posts/create", "plus", "Post"], ["/my-dog", "paw", "My dog"], [user ? `/profiles/${user.profile_id}` : "/signin", "user", "Profile"]];
  return <nav className={styles.Bar} aria-label="Mobile navigation">{items.map(([to, icon, label]) => <NavLink key={label} exact={to === "/"} to={to} activeClassName={styles.Active}><Icon name={icon} /><span>{label}</span></NavLink>)}</nav>;
}
