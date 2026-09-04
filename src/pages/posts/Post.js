import React, { useRef, useState } from "react";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import { Link, useHistory } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Avatar from "../../components/Avatar";
import Icon from "../../components/InterfaceIcon";
import { axiosRes } from "../../api/axiosDefaults";
import { MoreDropdown } from "../../components/MoreDropdown";
import styles from "../../styles/Post.module.css";

export default function Post({ id, owner, profile_id, profile_image, comments_count = 0, likes_count = 0, like_id, title, content, image, updated_at, postPage, setPosts, preview = false }) {
  const currentUser = useCurrentUser();
  const isOwner = currentUser?.username === owner;
  const history = useHistory();
  const [pending, setPending] = useState(false);
  const pendingRef = useRef(false);
  const [error, setError] = useState("");
  const [celebrate, setCelebrate] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const toggleLike = async () => {
    if (pendingRef.current || preview || isOwner || !currentUser) return;
    pendingRef.current = true; setPending(true); setError(""); setCelebrate(false);
    try {
      let nextLike = null;
      if (like_id) await axiosRes.delete(`/likes/${like_id}/`);
      else { const { data } = await axiosRes.post("/likes/", { post: id }); nextLike = data.id; }
      setPosts(prev => ({ ...prev, results: prev.results.map(post => post.id === id ? { ...post, like_id: nextLike, likes_count: Math.max(0, post.likes_count + (nextLike ? 1 : -1)) } : post) }));
      if (nextLike) setCelebrate(true);
    } catch (err) { setError("Your like didn’t update. Please try again."); }
    finally { pendingRef.current = false; setPending(false); }
  };
  const deletePost = async () => {
    if (pendingRef.current) return;
    pendingRef.current = true; setPending(true); setError("");
    try { await axiosRes.delete(`/posts/${id}/`); setConfirmDelete(false); history.push("/"); }
    catch (err) { setError("The post wasn’t deleted. Please try again."); }
    finally { pendingRef.current = false; setPending(false); }
  };
  const author = <><Avatar src={profile_image} height={42} /><div><strong>{owner}</strong><span>{updated_at}</span></div></>;
  const photo = image && !imageFailed ? <img src={image} alt={title || `Photo posted by ${owner}`} loading="lazy" decoding="async" onError={() => setImageFailed(true)} /> : <span className={styles.ImageFallback}><Icon name="photo" size={32} /><span>Photo unavailable</span></span>;
  return <>
    <Card as="article" className={styles.Post} aria-labelledby={`post-title-${id}`}>
      <header className={styles.AuthorRow}>
        {preview ? <div className={styles.Author}>{author}</div> : <Link className={styles.Author} to={currentUser ? `/profiles/${profile_id}` : "/signin"}>{author}</Link>}
        {preview ? <span className={styles.SampleBadge}>Design sample</span> : isOwner && postPage ? <MoreDropdown handleEdit={() => history.push(`/posts/${id}/edit`)} handleDelete={() => setConfirmDelete(true)} /> : <Icon name="paw" className={styles.PostMark} size={18} />}
      </header>
      <div className={styles.Copy}><h3 id={`post-title-${id}`}>{title || "A community moment"}</h3>{content && <p>{content}</p>}</div>
      {preview ? <div className={styles.Photo}>{photo}</div> : <Link className={styles.Photo} to={`/posts/${id}`} aria-label={`Open post: ${title || "community moment"}`}>{photo}<span className={styles.PhotoHint}>View post <Icon name="arrow" size={15} /></span></Link>}
      <footer className={styles.PostBar}>
        {currentUser && !preview ? <button type="button" className={`${styles.Action} ${like_id ? styles.Liked : ""}`} onClick={toggleLike} disabled={pending || isOwner} aria-pressed={Boolean(like_id)} aria-label={`${like_id ? "Unlike" : "Like"} ${title || "post"}`} title={isOwner ? "You cannot like your own post" : undefined}><Icon name="heart" className={celebrate ? styles.HeartPop : ""} /><span>{pending ? "Updating…" : like_id ? "Liked" : "Like"}</span><b aria-live="polite">{likes_count}</b></button> : preview ? <button className={styles.Action} disabled title="Likes are available on the live app"><Icon name="heart" /><span>Like</span></button> : <Link className={styles.Action} to="/signin"><Icon name="heart" /><span>Like</span><b>{likes_count}</b></Link>}
        {preview ? <button className={styles.Action} disabled title="Comments are available on the live app"><Icon name="comment" /><span>Comment</span></button> : <Link className={styles.Action} to={`/posts/${id}`}><Icon name="comment" /><span>Comment</span><b>{comments_count}</b></Link>}
        {!preview && <Link to={`/posts/${id}`} className={styles.OpenPost} aria-label={`View ${title || "post"}`}><Icon name="arrow" size={18} /></Link>}
      </footer>
      {error && !confirmDelete && <p className={styles.Error} role="alert">{error}</p>}
    </Card>
    <Modal show={confirmDelete} onHide={() => { if (!pending) setConfirmDelete(false); }} centered aria-labelledby={`delete-title-${id}`}>
      <Modal.Header closeButton={!pending}><Modal.Title id={`delete-title-${id}`}>Delete this post?</Modal.Title></Modal.Header>
      <Modal.Body>This removes your post and cannot be undone.{error && <p className={styles.Error} role="alert">{error}</p>}</Modal.Body>
      <Modal.Footer><button className={styles.Cancel} disabled={pending} onClick={() => setConfirmDelete(false)}>Keep post</button><button className={styles.Delete} disabled={pending} onClick={deletePost}>{pending ? "Deleting…" : "Delete post"}</button></Modal.Footer>
    </Modal>
  </>;
}
