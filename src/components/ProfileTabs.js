import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "../styles/Hub.module.css";

const tabs = [["posts", "Posts"], ["about", "About"], ["dog", "My dog"]];

export function profileView(search) {
  const view = new URLSearchParams(search).get("view");
  return tabs.some(([key]) => key === view) ? view : "posts";
}

export default function ProfileTabs({ selected, dogLabel = "My dog" }) {
  const location = useLocation();
  return <nav className={styles.Tabs} aria-label="Profile sections">
    {tabs.map(([key, label]) => {
      const params = new URLSearchParams(location.search);
      params.set("view", key);
      return <Link key={key} to={{ pathname: location.pathname, search: params.toString() }} aria-current={selected === key ? "page" : undefined}>
        {key === "dog" ? dogLabel : label}
      </Link>;
    })}
  </nav>;
}
