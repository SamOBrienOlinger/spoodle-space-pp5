import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import styles from "../styles/MoreDropdown.module.css";
import { useHistory } from "react-router";

const ThreeDots = React.forwardRef(({ onClick, "aria-expanded": expanded }, ref) => (
  <button type="button" ref={ref} aria-label="More options" aria-haspopup="menu" aria-expanded={expanded}
    style={{ border: 0, background: "transparent", borderRadius: 10, minWidth: 44, minHeight: 44, color: "#6b587c" }}
    onClick={(event) => { event.preventDefault(); onClick(event); }}>
    <span aria-hidden="true" style={{ fontSize: 22 }}>⋯</span>
  </button>
));
export const MoreDropdown = ({ handleEdit, handleDelete }) => <Dropdown className="ml-auto" drop="left"><Dropdown.Toggle as={ThreeDots} /><Dropdown.Menu className="text-center" popperConfig={{ strategy: "fixed" }}><Dropdown.Item className={styles.DropdownItem} onClick={handleEdit} aria-label="edit"><i className="fas fa-edit" /></Dropdown.Item><Dropdown.Item className={styles.DropdownItem} onClick={handleDelete} aria-label="delete"><i className="fas fa-trash-alt" /></Dropdown.Item></Dropdown.Menu></Dropdown>;
export const ProfileEditDropdown = ({ id }) => {
  const history = useHistory();
  return <Dropdown className={`ml-auto px-3 ${styles.Absolute}`} drop="left"><Dropdown.Toggle as={ThreeDots} /><Dropdown.Menu><Dropdown.Item onClick={() => history.push(`/profiles/${id}/edit`)} aria-label="edit-profile"><i className="fas fa-edit" /> edit profile</Dropdown.Item><Dropdown.Item onClick={() => history.push(`/profiles/${id}/edit/username`)} aria-label="edit-username"><i className="far fa-id-card" />change username</Dropdown.Item><Dropdown.Item onClick={() => history.push(`/profiles/${id}/edit/password`)} aria-label="edit-password"><i className="fas fa-key" />change password</Dropdown.Item></Dropdown.Menu></Dropdown>;
};
