import React, { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import useResource from "../../hooks/useResource";
import CommunityLayout from "../../components/CommunityLayout";
import RequestState from "../../components/RequestState";
import Post from "./Post";
import Comment from "../comments/Comment";
import CommentCreateForm from "../comments/CommentCreateForm";
import styles from "../../styles/Hub.module.css";

export default function PostPage() {
  const { id } = useParams();
  const location = useLocation();
  const user = useCurrentUser();
  const post = useResource(`/posts/${id}/`);
  const comments = useResource(`/comments/?post=${id}`, true);
  const [busy, setBusy] = useState(false);
  const [moreError, setMoreError] = useState(null);
  const updatePost = updater => post.setData(prev => updater({ results: [prev] }).results[0]);
  const more = async () => {
    if (busy) return;
    setBusy(true); setMoreError(null);
    try { const { data } = await axiosReq.get(comments.data.next, { timeout: 20000 }); if (!Array.isArray(data.results)) throw new Error("Invalid comments"); comments.setData(prev => ({ ...data, results: [...prev.results, ...data.results.filter(item => !prev.results.some(old => old.id === item.id))] })); }
    catch (error) { setMoreError(error); } finally { setBusy(false); }
  };
  return <CommunityLayout><p><Link to={location.state?.from || "/"}>Back to posts</Link></p>{post.loading || post.error ? <RequestState {...post} subject="this post" /> : post.data && <><Post {...post.data} setPosts={updatePost} postPage /><section className={styles.Card}><h2>Comments</h2>{comments.loading || comments.error ? <RequestState {...comments} subject="comments" /> : comments.data && <>{user && <CommentCreateForm post={id} profile_id={user.profile_id} profileImage={user.profile_image} setPost={updatePost} setComments={comments.setData} />}{comments.data.results.length ? comments.data.results.map(comment => <Comment key={comment.id} {...comment} setPost={updatePost} setComments={comments.setData} />) : <p>No comments yet. Start the conversation.</p>}{!user && <Link to={{ pathname: "/signin", state: { from: location.pathname } }}>Sign in to comment</Link>}{moreError && <RequestState error={moreError} retry={more} subject="more comments" />}{comments.data.next && <button className={styles.Button} disabled={busy} onClick={more}>{busy ? "Loading…" : "Load more comments"}</button>}</>}</section></>}</CommunityLayout>;
}
