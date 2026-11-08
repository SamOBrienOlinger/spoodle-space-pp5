import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { Link, useLocation, useRouteMatch } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDog } from "@fortawesome/free-solid-svg-icons";
import { previewDogData } from "../config/deployment";
import styles from "../styles/DoggyDataMenu.module.css";

export default function DoggyDataMenu({ mobile = false, toggleClassName, activeClassName }) {
  const { path, label, records } = previewDogData;
  const { search } = useLocation();
  const active = Boolean(useRouteMatch({ path, exact: true }));
  const requested = new URLSearchParams(search).get("dogTab");
  const selected = records.some(([key]) => key === requested) ? requested : "profile";
  const id = mobile ? "doggy-data-mobile" : "doggy-data-desktop";
  const menuId = `${id}-choices`;

  return (
    <Dropdown className={mobile ? styles.Header : undefined} focusFirstItemOnShow="keyboard" onSelect={() => window.scrollTo(0, 0)}>
      <Dropdown.Toggle
        as="button"
        type="button"
        id={id}
        aria-controls={menuId}
        className={`${toggleClassName} ${styles.Toggle}${active ? ` ${activeClassName}` : ""}`}
      >
        <FontAwesomeIcon icon={faDog} className={styles.DogIcon} aria-hidden="true" />
        <span>{label}</span>
      </Dropdown.Toggle>
      <Dropdown.Menu
        id={menuId}
        align={mobile ? "right" : { lg: "left" }}
        className={`${styles.Menu} ${mobile ? styles.HeaderMenu : styles.SidebarMenu}`}
        renderOnMount
      >
        {records.map(([key, text]) => (
          <Dropdown.Item
            key={key}
            as={Link}
            to={`${path}?dogTab=${key}`}
            aria-current={active && selected === key ? "page" : undefined}
            className={styles.MenuItem}
          >
            {text}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}
