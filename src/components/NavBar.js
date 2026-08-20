import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import logo from "../assets/logo2-spoodlespace.png";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";
import Avatar from "./Avatar";
import axios from "axios";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle.js";
import { removeTokenTimestamp } from "../utils/utils";

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const { expanded, setExpanded, ref } = useClickOutsideToggle();

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
      className={styles.NavLink}
      activeClassName={styles.Active}
      to={to}
      onClick={() => setExpanded(false)}
    >
      <i className={icon}></i>
      <span>{label}</span>
    </NavLink>
  );

  return (
    <Navbar
      expanded={expanded}
      className={styles.NavBar}
      expand="lg"
      fixed="top"
    >
      <Container fluid="lg" className={styles.NavContainer}>
        <NavLink to="/" className={styles.BrandLink}>
          <Navbar.Brand className={styles.Brand}>
            <img src={logo} alt="SpoodleSpace" height="45" />
          </Navbar.Brand>
        </NavLink>

        <Navbar.Toggle
          ref={ref}
          onClick={() => setExpanded(!expanded)}
          aria-controls="spoodlespace-navigation"
        />

        <Navbar.Collapse id="spoodlespace-navigation">
          <Nav className={`ml-auto ${styles.NavItems}`}>
            {navItem("/", "fas fa-home", "Home", true)}

            {currentUser ? (
              <>
                {navItem("/feed", "fas fa-stream", "Feed")}
                {navItem("/posts/create", "far fa-plus-square", "Post")}
                {navItem("/dogprofilespage", "fas fa-dog", "Dogs")}
                {navItem("/dogshealthpage", "fas fa-heartbeat", "Health")}
                {navItem("/dogdangerspage", "fas fa-exclamation-triangle", "Safety")}
                {navItem("/liked", "fas fa-heart", "Liked")}

                <NavLink
                  className={`${styles.NavLink} ${styles.ProfileLink}`}
                  activeClassName={styles.Active}
                  to={`/profiles/${currentUser?.profile_id}`}
                  onClick={() => setExpanded(false)}
                >
                  <Avatar
                    src={currentUser?.profile_image}
                    text={currentUser?.username}
                    height={34}
                  />
                </NavLink>

                <NavLink
                  className={`${styles.NavLink} ${styles.SignOut}`}
                  to="/"
                  onClick={handleSignOut}
                >
                  <i className="fas fa-sign-out-alt"></i>
                  <span>Sign out</span>
                </NavLink>
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
