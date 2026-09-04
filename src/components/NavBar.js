import React, { useEffect, useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import logo from "../assets/logo2-spoodlespace.png";
import Avatar from "./Avatar";
import AccountLink from "./AccountLink";
import { isPagesPreview, liveAccountUrl } from "../config/deployment";
import styles from "../styles/NavBar.module.css";
import { useCurrentUser, useSetCurrentUser } from "../contexts/CurrentUserContext";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle.js";
import { removeTokenTimestamp } from "../utils/utils";

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const [searchTerm, setSearchTerm] = useState("");
  const { expanded, setExpanded, ref } = useClickOutsideToggle();
  const history = useHistory();
  const location = useLocation();
  useEffect(() => {
    setSearchTerm(new URLSearchParams(location.search).get("q") || "");
  }, [location.search]);
  const handleSearch = (event) => {
    event.preventDefault();
    const cleanedSearch = searchTerm.trim();
    history.push(cleanedSearch ? `/?q=${encodeURIComponent(cleanedSearch)}` : "/");
    setExpanded(false);
  };
  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
      removeTokenTimestamp();
      setExpanded(false);
      history.push("/");
    } catch (err) {
      console.log(err.response);
    }
  };
  const navItem = (to, icon, label, exact = false) => isPagesPreview && (to === "/signin" || to === "/signup") ? (
    <a className={styles.MobileNavLink} href={liveAccountUrl(to === "/signup" ? "signup" : "signin")}>
      <i className={icon} aria-hidden="true" /><span>{label}</span>
    </a>
  ) : (
    <NavLink exact={exact} className={styles.MobileNavLink} activeClassName={styles.Active} to={to} onClick={() => setExpanded(false)}>
      <i className={icon} aria-hidden="true" /><span>{label}</span>
    </NavLink>
  );
  const searchForm = (className) => (
    <Form className={className} onSubmit={handleSearch} role="search">
      <i className="fas fa-search" aria-hidden="true" />
      <Form.Control value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} type="search" aria-label="Search posts by owner or title" placeholder="Search posts by owner or title..." />
    </Form>
  );
  return (
    <Navbar expanded={expanded} className={styles.NavBar} expand="lg" fixed="top">
      <Container fluid className={styles.NavContainer}>
        <NavLink to="/" className={styles.BrandLink}>
          <Navbar.Brand className={styles.Brand}><img src={logo} alt="SpoodleSpace" height="45" /></Navbar.Brand>
        </NavLink>
        {searchForm(`${styles.SearchForm} d-none d-md-flex`)}
        <div className={`${styles.DesktopAccount} d-none d-lg-flex`}>
          {currentUser ? (
            <NavLink className={styles.AccountLink} to={`/profiles/${currentUser.profile_id}`}>
              <Avatar src={currentUser.profile_image} text={currentUser.username} height={34} />
            </NavLink>
          ) : (
            <>
              <AccountLink className={styles.SignInLink} to="/signin">Sign in</AccountLink>
              <AccountLink className={styles.SignUpLink} to="/signup">Sign up</AccountLink>
            </>
          )}
        </div>
        <Navbar.Toggle ref={ref} onClick={() => setExpanded(!expanded)} aria-controls="spoodlespace-navigation" aria-label="Toggle navigation" />
        <Navbar.Collapse id="spoodlespace-navigation" className={styles.MobileCollapse}>
          {searchForm(`${styles.MobileSearch} d-md-none`)}
          <Nav className={styles.MobileNav}>
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
                <button className={styles.MobileSignOut} type="button" onClick={handleSignOut}>
                  <i className="fas fa-sign-out-alt" aria-hidden="true" /><span>Sign out</span>
                </button>
              </>
            ) : (
              <>
                {navItem("/signin", "fas fa-sign-in-alt", "Sign in")}
                {navItem("/signup", "fas fa-user-plus", "Sign up")}
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default NavBar;
