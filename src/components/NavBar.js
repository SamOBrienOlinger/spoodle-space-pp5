import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import logo from "../assets/logo-spoodlespace.webp";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <Navbar className={styles.NavBar} expand="md" fixed="top">
      <Container>
        <NavLink to="/">
          <Navbar.Brand>
            <img src={logo} alt="logo" height="45" />
          </Navbar.Brand>
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-left">
            <NavLink
              // exact
              className={styles.NavLink}
              activeClassName={styles.Active}
              to="/"
            >
              <i className="fas fa-home"></i>Home
            </NavLink>
            <NavLink
              exact
              className={styles.NavLink}
              activeClassName={styles.Active}
              to="/signin"
            >
              <i className="fas fa-sign-in-alt"></i>Login
            </NavLink>
            <NavLink
              exact
              to="/signup"
              className={styles.NavLink}
              activeClassName={styles.Active}
            >
              <i className="fas fa-user-plus"></i>Join
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;


// import React from "react";
// import { Navbar, Container, Nav } from "react-bootstrap";
// import logo from "../assets/logo-spoodlespace.webp";
// import styles from "../styles/NavBar.module.css";

// const NavBar = () => {
//   return (
//     <Navbar className={styles.NavBar} expand="md" fixed="top">
//       <Container>
//         <Navbar.Brand>
//           <img src={logo} alt="logo" height="45" />
//         </Navbar.Brand>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="ml-auto text-left">
//             <Nav.Link>
//               <i className="fas fa-home"></i>Home
//             </Nav.Link>
//             <Nav.Link>
//               <i className="fas fa-sign-in-alt"></i>Sign in
//             </Nav.Link>
//             <Nav.Link>
//               <i className="fas fa-user-plus"></i>Sign up
//             </Nav.Link>
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// };

// export default NavBar;