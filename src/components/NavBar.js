import React, { useEffect, useRef, useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import logo from "../assets/logo2-spoodlespace.png";
import Avatar from "./Avatar";
import AccountLink from "./AccountLink";
import styles from "../styles/NavBar.module.css";
import { useCurrentUser } from "../contexts/CurrentUserContext";

const NavBar = () => {
  const navbarRef = useRef(null);
  useEffect(() => {
    const navbar = navbarRef.current;
    if (!navbar) return;
    const updateHeight = () => {
      const container = navbar.querySelector('[class*="NavContainer"]');
      if (!container) return;
      const style = getComputedStyle(navbar);
      const bottom = Math.max(...Array.from(container.children)
        .filter(element => element.id !== "spoodlespace-navigation")
        .map(element => element.getBoundingClientRect().bottom));
      const height = Math.ceil(bottom - navbar.getBoundingClientRect().top
        + parseFloat(style.paddingBottom) + parseFloat(style.borderBottomWidth));
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
  const [searchTerm, setSearchTerm] = useState("");
  const history = useHistory();
  const location = useLocation();
  useEffect(() => {
    setSearchTerm(new URLSearchParams(location.search).get("q") || "");
  }, [location.search]);
  const handleSearch = (event) => {
    event.preventDefault();
    const cleanedSearch = searchTerm.trim();
    const feedPath = ["/", "/feed", "/liked", "/search"].includes(location.pathname) ? location.pathname : "/search";
    const params = new URLSearchParams(location.search);
    if (cleanedSearch) params.set("q", cleanedSearch); else params.delete("q");
    history.push({ pathname: feedPath, search: params.toString() });
  };
  const searchForm = (className) => (
    <Form className={className} onSubmit={handleSearch} role="search">
      <i className="fas fa-search" aria-hidden="true" />
      <Form.Control value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} type="search" aria-label="Search posts by owner or title" placeholder="Search posts by owner or title..." />
    </Form>
  );
  return (
    <Navbar ref={navbarRef} className={styles.NavBar} expand="lg" fixed="top">
      <Container fluid className={styles.NavContainer}>
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
        {searchForm(`${styles.SearchForm} d-none d-md-flex`)}
        <div className={`${styles.DesktopAccount} d-none d-lg-flex`}>
          {currentUser ? (
            <NavLink className={styles.AccountLink} title={currentUser.username} to={`/profiles/${currentUser.profile_id}`}>
              <Avatar src={currentUser.profile_image} height={34} />
              <span className={styles.AccountName}>{currentUser.username}</span>
            </NavLink>
          ) : (
            <>
              <AccountLink className={styles.SignInLink} to="/signin">Sign in</AccountLink>
              <AccountLink className={styles.SignUpLink} to="/signup">Sign up</AccountLink>
            </>
          )}
        </div>
      </Container>
    </Navbar>
  );
};
export default NavBar;
