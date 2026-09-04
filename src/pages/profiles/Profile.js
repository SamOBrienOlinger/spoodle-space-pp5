import React, { useState } from "react";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import Icon from "../../components/InterfaceIcon";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useSetProfileData } from "../../contexts/ProfileDataContext";
import styles from "../../styles/FollowProfile.module.css";
export default function Profile({ profile, mobile, imageSize = 44 }) {
  const { id, following_id, image, owner } = profile;
  const currentUser = useCurrentUser();
  const { handleFollow, handleUnfollow } = useSetProfileData();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);
  const follow = async () => {
    if (pending) return;
    setPending(true); setError(false);
    try { const ok = await (following_id ? handleUnfollow(profile) : handleFollow(profile)); if (ok === false) setError(true); }
    catch (err) { setError(true); }
    finally { setPending(false); }
  };
  return <div className={`${styles.Profile} ${mobile ? styles.Mobile : ""}`}>
    <Link className={styles.Person} to={currentUser ? `/profiles/${id}` : "/signin"}><Avatar src={image} height={imageSize} /><span><strong>{owner}</strong><small>Dog person</small></span></Link>
    {currentUser && currentUser.username !== owner && <button type="button" onClick={follow} disabled={pending} aria-pressed={Boolean(following_id)} aria-label={`${following_id ? "Unfollow" : "Follow"} ${owner}`} className={`${styles.Follow} ${following_id ? styles.Following : ""}`}>{pending ? "…" : following_id ? <><Icon name="check" size={14} /><span>Following</span></> : "Follow"}</button>}
    {error && <small role="alert" className={styles.Error}>Couldn’t update. Try again.</small>}
  </div>;
}
