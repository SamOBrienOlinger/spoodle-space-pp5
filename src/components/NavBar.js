import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import { Link, NavLink, useHistory, useLocation } from "react-router-dom";
import { isPagesPreview } from "../config/deployment";
import logo from "../assets/logo2-spoodlespace.png";
import Avatar from "./Avatar";
import AccountLink from "./AccountLink";
import SiteNavigation from "./SiteNavigation";
import styles from "../styles/NavBar.module.css";
import { useCurrentUser, useSetCurrentUser } from "../contexts/CurrentUserContext";
import { removeTokenTimestamp } from "../utils/utils";

const NavBar = () => {
  const navbarRef = useRef(null);
  useEffect(() => {
    const navbar = navbarRef.current;
    if (!navbar) return;
    const updateHeight = () => {
      // Reserve space for the whole fixed header as its rows resize.
      const height = Math.ceil(navbar.getBoundingClientRect().height);
      document.documentElement.style.setProperty("--spoodle-nav-height", `${height}px`);
    };
    updateHeight();
    const observer = window.ResizeObserver ? new ResizeObserver(updateHeight) : null;
    observer?.observe(navbar);
    window.addEventListener("resize", updateHeight);
    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", updateHeight);
      document.documentElement.style.removeProperty("--spoodle-nav-height");
    };
  }, []);
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const [searchTerm, setSearchTerm] = useState("");
  const [signingOut, setSigningOut] = useState(false);
  const [accountError, setAccountError] = useState("");
  const history = useHistory();
  const location = useLocation();
  useEffect(() => {
    setSearchTerm(new URLSearchParams(location.search).get("q") || "");
  }, [location.search]);
  const handleSearch = (event) => {
    event.preventDefault();
    const cleanedSearch = searchTerm.trim();
    const feedPath = isPagesPreview ? "/search/" : ["/", "/feed", "/liked", "/search"].includes(location.pathname) ? location.pathname : "/search";
    const params = new URLSearchParams(location.search);
    if (cleanedSearch) params.set("q", cleanedSearch); else params.delete("q");
    history.push({ pathname: feedPath, search: params.toString() });
  };
  const signOut = async () => {
    if (signingOut) return;
    setSigningOut(true);
    setAccountError("");
    try {
      await axios.post("/dj-rest-auth/logout/");
      removeTokenTimestamp();
      setCurrentUser(null);
      history.push("/");
    } catch (_) {
      setAccountError("Sign-out did not complete. Please try again.");
    } finally {
      setSigningOut(false);
    }
  };
  return (
    <Navbar
      as="header"
      role="banner"
      ref={navbarRef}
      className={styles.NavBar}
      expand={false}
      fixed="top"
    >
      <Container fluid className={styles.NavContainer}>
        {!isPagesPreview && <div className={`${styles.DesktopAccount} d-none d-lg-flex`}>
          {currentUser ? (
            <Dropdown focusFirstItemOnShow="keyboard">
              <Dropdown.Toggle as="button" type="button" id="site-account" className={styles.AccountLink} aria-label={`Account menu for ${currentUser.username}`}>
                <Avatar src={currentUser.profile_image} height={34} />
                <span className={styles.AccountName}>{currentUser.username}</span>
              </Dropdown.Toggle>
              <Dropdown.Menu className={styles.AccountMenu}>
                <Dropdown.Item as={Link} to={`/profiles/${currentUser.profile_id}`} className={styles.AccountItem}>My profile</Dropdown.Item>
                <Dropdown.Item as={Link} to="/liked" className={styles.AccountItem}>Liked posts</Dropdown.Item>
                <Dropdown.Item as="button" type="button" disabled={signingOut} onClick={signOut} className={styles.AccountItem}>{signingOut ? "Signing out…" : "Sign out"}</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <>
              <AccountLink className={styles.SignInLink} to="/signin">Sign in</AccountLink>
              <AccountLink className={styles.SignUpLink} to="/signup">Sign up</AccountLink>
            </>
          )}
          {accountError && <p className={styles.AccountError} role="alert">{accountError}</p>}
        </div>}
        <NavLink to="/" className={styles.BrandLink}>
          <Navbar.Brand className={styles.Brand}>
            <svg className={styles.LogoFilter} width="0" height="0" aria-hidden="true" focusable="false">
              <defs>
                <filter id="spoodlespace-logo-white" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
                  {/* The original white artwork stays intact; its purple backing becomes transparent. */}
                  <feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 1.25 0 0 -0.25" />
                </filter>
              </defs>
            </svg>
            <img src={logo} alt="SpoodleSpace" height="45" />
          </Navbar.Brand>
        </NavLink>
        <Form className={`${styles.SearchForm} d-none d-md-flex`} onSubmit={handleSearch} role="search">
          <i className="fas fa-search" aria-hidden="true" />
          <Form.Control value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} type="search" aria-label="Search posts by owner or title" placeholder="Search posts by owner or title..." />
        </Form>
      </Container>
      <SiteNavigation />
    </Navbar>
  );
};
export default NavBar;
