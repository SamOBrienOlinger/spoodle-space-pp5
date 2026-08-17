import React from "react";
import styles from "../styles/Avatar.module.css";
import {
  normalizeProfileImage,
  useDefaultProfileImage,
} from "../utils/profileImages";

const Avatar = ({ src, height = 45, text, alt }) => {
  return (
    <span>
      <img
        className={styles.Avatar}
        src={normalizeProfileImage(src)}
        height={height}
        width={height}
        alt={alt || (text ? `${text}'s profile picture` : "User profile picture")}
        onError={useDefaultProfileImage}
      />
      {text}
    </span>
  );
};

export default Avatar;
