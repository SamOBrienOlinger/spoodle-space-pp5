import React, { useState } from "react";
import axios from "axios";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import { useCurrentUser, useSetCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosReq, axiosRes } from "../../api/axiosDefaults";
import { removeTokenTimestamp } from "../../utils/utils";
import useResource from "../../hooks/useResource";
import CommunityLayout from "../../components/CommunityLayout";
import RequestState from "../../components/RequestState";
import DogHubContent from "../../components/DogHubContent";
import Post from "../posts/Post";
import styles from "../../styles/Hub.module.css";

function DogSummary({ id, own }) {
  const dog = useResource(id ? `/dogprofiles/${id}/` : null);
  if (!id) return <section className={styles.Card}><h2>{own ? "Your dog" : "Dog profile"}</h2><p>No dog profile yet.</p>{own && <Link to="/my-dog">Add your dog’s details</Link>}</section>;
  if (dog.loading || dog.error) return <RequestState {...dog} subject="dog profile" />;
  return dog.data && <section className={styles.Card}><div className={styles.Summary}>{dog.data.dog_profile_image && <img src={dog.data.dog_profile_image} alt={dog.data.dog_name || "Dog profile"} />}<div><h2>{dog.data.dog_name || "Dog profile"}</h2><p>{[dog.data.dog_age, dog.data.dog_color].filter(Boolean).join(" · ")}</p><Link to={own ? "/my-dog" : `/dogprofiles/${id}`}>View dog details</Link></div></div></section>;
}

export default function ProfilePage() {
  const { id } = useParams();
  const location = useLocation();
  const history = useHistory();
  const user = useCurrentUser();
  const setUser = useSetCurrentUser();
  const profile = useResource(`/profiles/${id}/`);
  const posts = useResource(`/posts/?owner__profile=${id}`, true);
  const [busy, setBusy] = useState(false);
  const [actionError, setActionError] = useState("");
  const [moreError, setMoreError] = useState(null);
  const [moreBusy, setMoreBusy] = useState(false);
  const params = new URLSearchParams(location.search);
  const selected = ["posts", "about", "dog"].includes(params.get("view")) ? params.get("view") : "posts";
  const own = Boolean(user && user.username === profile.data?.owner);
  const tabLink = view => { const next = new URLSearchParams(location.search); next.set("view", view); return { pathname: location.pathname, search: next.toString() }; };
  const follow = async () => {
    if (busy) return;
    setBusy(true); setActionError("");
    try {
      if (profile.data.following_id) await axiosRes.delete(`/followers/${profile.data.following_id}/`);
      else await axiosRes.post("/followers/", { followed: profile.data.id });
      profile.retry();
    } catch (_) { setActionError("Following didn’t update. Please try again."); }
    finally { setBusy(false); }
  };
  const signOut = async () => {
    if (busy) return;
    setBusy(true); setActionError("");
    try { await axios.post("/dj-rest-auth/logout/"); removeTokenTimestamp(); setUser(null); history.push("/"); }
    catch (_) { setActionError("Sign-out did not complete. Please try again."); }
    finally { setBusy(false); }
  };
  const more = async () => {
    if (moreBusy) return;
    setMoreBusy(true); setMoreError(null);
    try { const { data } = await axiosReq.get(posts.data.next, { timeout: 20000 }); if (!Array.isArray(data.results)) throw new Error("Invalid posts"); posts.setData(prev => ({ ...data, results: [...prev.results, ...data.results] })); }
    catch (error) { setMoreError(error); } finally { setMoreBusy(false); }
  };
  return <CommunityLayout>{profile.loading || profile.error ? <RequestState {...profile} subject="this profile" /> : profile.data && <>
    <header className={styles.Card}><div className={styles.Summary}><img src={profile.data.image} alt={`${profile.data.owner}'s profile`} /><div><h1>{profile.data.owner}</h1>{profile.data.name && <p>{profile.data.name}</p>}</div></div>
      <dl className={styles.Stats}>{["posts", "followers", "following"].map(label => <div key={label}><dt>{label}</dt><dd>{profile.data[`${label}_count`] || 0}</dd></div>)}</dl>
      {user && !own && <button className={styles.Button} disabled={busy} onClick={follow}>{busy ? "Updating…" : profile.data.following_id ? "Unfollow" : "Follow"}</button>}
      {own && <details><summary>Account settings</summary><div className={styles.Actions}><Link to={`/profiles/${id}/edit`}>Edit profile</Link><Link to={`/profiles/${id}/edit/username`}>Change username</Link><Link to={`/profiles/${id}/edit/password`}>Change password</Link><Link to="/liked">Liked posts</Link><button className={styles.Button} disabled={busy} onClick={signOut}>{busy ? "Signing out…" : "Sign out"}</button></div></details>}
      {actionError && <p role="alert">{actionError}</p>}
    </header>
    <DogSummary id={profile.data.dog_profile} own={own} />
    <nav className={styles.Tabs} aria-label="Profile sections">{[["posts", "Posts"], ["about", "About"], ["dog", "My dog"]].map(([key, label]) => <Link key={key} to={tabLink(key)} aria-current={selected === key ? "page" : undefined}>{label}</Link>)}</nav>
    {selected === "about" && <section className={styles.Card}><h2>About {profile.data.owner}</h2><p>{profile.data.content || "No introduction yet."}</p>{own && <Link to={`/profiles/${id}/edit`}>Edit your introduction</Link>}</section>}
    {selected === "dog" && <DogHubContent profile={profile.data} own={own} onChanged={profile.retry} />}
    {selected === "posts" && (posts.loading || posts.error ? <RequestState {...posts} subject="profile posts" /> : posts.data && <>{posts.data.results.length ? posts.data.results.map(post => <Post key={post.id} {...post} setPosts={posts.setData} />) : <section className={styles.State}><h2>No posts yet</h2>{own ? <Link to="/posts/create">Share your first moment</Link> : <p>This member hasn’t posted yet.</p>}</section>}{moreError && <RequestState error={moreError} retry={more} subject="more posts" />}{posts.data.next && <button className={styles.Button} disabled={moreBusy} onClick={more}>{moreBusy ? "Loading…" : "Load more posts"}</button>}</>)}
  </>}</CommunityLayout>;
}
