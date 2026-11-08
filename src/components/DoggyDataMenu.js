import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { Link, useLocation, useRouteMatch } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDog } from "@fortawesome/free-solid-svg-icons";
import { doggyData } from "../config/deployment";
import styles from "../styles/DoggyDataMenu.module.css";

export default function DoggyDataMenu({ toggleClassName, activeClassName }) {
  const { path, label, records } = doggyData;
  const { search } = useLocation();
  const active = Boolean(useRouteMatch({ path, exact: true }));
  const requested = new URLSearchParams(search).get("dogTab");
  const selected = records.some(([key]) => key === requested) ? requested : "profile";
  return (
    <Dropdown focusFirstItemOnShow="keyboard" onSelect={() => window.scrollTo(0, 0)}>
      <Dropdown.Toggle
        as="button"
        type="button"
        id="doggy-data"
        aria-controls="doggy-data-choices"
        className={`${toggleClassName} ${styles.Toggle}${active ? ` ${activeClassName}` : ""}`}
      >
        <FontAwesomeIcon icon={faDog} className={styles.DogIcon} aria-hidden="true" />
        <span>{label}</span>
      </Dropdown.Toggle>
      <Dropdown.Menu
        id="doggy-data-choices"
        alignRight
        className={styles.Menu}
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
