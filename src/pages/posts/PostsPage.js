import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import axios from "axios";
import AccountLink from "../../components/AccountLink";
import { isPagesPreview, liveAppOrigin } from "../../config/deployment";
import Post from "./Post";
import Avatar from "../../components/Avatar";
import Icon from "../../components/InterfaceIcon";
import AppSidebar from "../../components/AppSidebar";
import FeedRightRail from "../../components/FeedRightRail";
import FeedSkeleton from "../../components/FeedSkeleton";
import PopularProfiles from "../profiles/PopularProfiles";
import styles from "../../styles/PostsPage.module.css";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

const dogPhoto = "https://res.cloudinary.com/dzhbg6go0/image/upload/v1670254218/CockapooClub/furry-fun_gsmi28.webp";
const sample = { id: "design-sample", owner: "SpoodleSpace", title: "The little moments are the big ones.", content: "Muddy paws. Fresh air. Very good company. A photo-post layout example, not a live community post.", image: dogPhoto, profile_image: dogPhoto, updated_at: "Design sample", likes_count: 0, comments_count: 0 };

export default function PostsPage({ message, filter = "" }) {
  const [posts, setPosts] = useState({ results: [] });
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");
  const [pageError, setPageError] = useState("");
  const [loadingMore, setLoadingMore] = useState(false);
  const [retry, setRetry] = useState(0);
  const [order, setOrder] = useState("");
  const { pathname, search } = useLocation();
  const [query, setQuery] = useState(new URLSearchParams(search).get("q") || "");
  const currentUser = useCurrentUser();
  useEffect(() => { setQuery(new URLSearchParams(search).get("q") || ""); }, [search]);
  useEffect(() => {
    if (isPagesPreview) { setLoaded(true); return; }
    let active = true;
    const source = axios.CancelToken.source();
    const params = new URLSearchParams(filter);
    params.set("search", query.trim());
    if (order) params.set("ordering", order);
    setLoaded(false); setError(""); setPageError("");
    const timer = setTimeout(async () => {
      try {
        const { data } = await axiosReq.get(`/posts/?${params.toString()}`, { cancelToken: source.token, timeout: 20000 });
        if (!data || !Array.isArray(data.results)) throw new Error("Invalid feed response");
        if (active) setPosts(data);
      } catch (err) {
        if (active && !axios.isCancel(err)) setError("We couldn’t load the community feed. Your posts haven’t been changed.");
      } finally { if (active) setLoaded(true); }
    }, query ? 300 : 0);
    return () => { active = false; clearTimeout(timer); source.cancel(); };
  }, [filter, query, order, pathname, currentUser, retry]);
  const loadMore = async () => {
    if (loadingMore || !posts.next) return;
    setLoadingMore(true); setPageError("");
    try {
      const { data } = await axiosReq.get(posts.next, { timeout: 20000 });
      if (!Array.isArray(data.results)) throw new Error("Invalid feed response");
      setPosts(prev => ({ ...prev, next: data.next, results: [...prev.results, ...data.results.filter(p => !prev.results.some(old => old.id === p.id))] }));
    } catch (err) { setPageError("More posts couldn’t be loaded. Please try again."); }
    finally { setLoadingMore(false); }
  };
  const liked = pathname === "/liked";
  const following = pathname === "/feed";
  return <div className={styles.Layout}>
    <div className={styles.LeftColumn}><AppSidebar /></div>
    <div className={styles.FeedColumn}>
      <section className={`${styles.Welcome} ss-enter`} aria-labelledby="feed-welcome-title">
        <div className={styles.WelcomeCopy}>
          <span className={styles.Eyebrow}><Icon name="paw" size={16} />A space for dog people</span>
          <h1 id="feed-welcome-title">{currentUser ? <>Good dogs.<br /><em>Great company.</em></> : <>Little paws.<br /><em>Big connections.</em></>}</h1>
          <p>{currentUser ? "Share a moment. Find your people. Make yourself at home." : "Photos, friendships and your dog’s world, all in one happy place."}</p>
          {!currentUser && <div className={styles.WelcomeActions}><AccountLink className={styles.PrimaryAction} to="/signup">Find your people <Icon name="arrow" size={17} /></AccountLink><AccountLink className={styles.SecondaryAction} to="/signin">Sign in</AccountLink></div>}
        </div>
        <div className={styles.WelcomeArt} aria-hidden="true"><span className={styles.Orbit} /><img src={dogPhoto} alt="" /><span className={styles.Sticker}><Icon name="heart" size={16} />100% dog people</span><span className={styles.ArtPaw}><Icon name="paw" size={27} /></span></div>
      </section>
      {currentUser && <section className={styles.Composer} aria-label="Create a post"><div className={styles.ComposerTop}><Avatar src={currentUser.profile_image} height={44} /><Link className={styles.ComposerPrompt} to="/posts/create">What’s making tails wag?</Link><Link className={styles.CreatePostButton} to="/posts/create"><Icon name="plus" size={19} /><span>Create post</span></Link></div><div className={styles.ComposerBottom}><span>A photo, a thought, a little update.</span><Link to="/posts/create"><Icon name="photo" size={16} />Add photo</Link></div></section>}
      <div className={styles.FeedHeading}><div><span className={styles.Eyebrow}>Around the community</span><h2>{liked ? "Your favourites" : following ? "From your people" : "The latest tail-waggers"}</h2></div><Icon name={liked ? "heart" : "paw"} size={27} /></div>
      {currentUser && <>
        <nav className={styles.FeedTabs} aria-label="Post feeds"><NavLink exact to="/" activeClassName={styles.Selected}>All posts</NavLink><NavLink to="/feed" activeClassName={styles.Selected}>Following</NavLink><NavLink to="/liked" activeClassName={styles.Selected}>Liked</NavLink></nav>
        <div className={styles.FeedControls}><label className={styles.MobileSearch}><Icon name="search" size={18} /><input aria-label="Search posts by owner or title" type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search owner or title" /></label><label className={styles.SortLabel}>Sort<select aria-label="Sort posts" value={order} onChange={e => setOrder(e.target.value)}><option value="">{liked ? "Recently liked" : "Latest first"}</option><option value="-likes_count">Most liked</option><option value="-comments_count">Most discussed</option></select></label></div>
      </>}
      {isPagesPreview ? <><div className={styles.PreviewLabel}><span>Layout example</span><p>The card below is a design sample. Real posts and account actions stay on the <a href={liveAppOrigin}>Heroku app</a>.</p></div><Post {...sample} preview /></> : !loaded ? <FeedSkeleton /> : error ? <section className={styles.Empty} role="alert"><Icon name="retry" size={30} /><h3>A small pause in the walk.</h3><p>{error}</p><button onClick={() => setRetry(n => n + 1)} className={styles.PrimaryAction}>Try again</button></section> : posts.results.length ? <div aria-label="Community posts">{posts.results.map((post, i) => <div className={i < 3 ? styles.Reveal : undefined} style={{ "--enter-delay": `${Math.min(i, 2) * 55}ms` }} key={post.id}><Post {...post} setPosts={setPosts} /></div>)}{pageError && <p role="alert" className={styles.LoadError}>{pageError}</p>}{posts.next && <button className={styles.LoadMore} disabled={loadingMore} onClick={loadMore}>{loadingMore ? "Loading more…" : pageError ? "Retry loading posts" : "A few more good dogs"}<Icon name="arrow" size={18} /></button>}</div> : <section className={styles.Empty}><Icon name={liked ? "heart" : "search"} size={32} /><h3>{query ? "No tails on this trail." : liked ? "A home for your favourites." : "It’s a little quiet here."}</h3><p>{query ? "Try another owner’s username or a shorter post title." : liked ? "Like a community post and you’ll find it here." : message}</p>{query ? <button className={styles.PrimaryAction} onClick={() => setQuery("")}>Clear search</button> : currentUser ? <Link className={styles.PrimaryAction} to={liked ? "/" : "/posts/create"}>{liked ? "Explore posts" : "Share the first moment"}</Link> : <AccountLink className={styles.PrimaryAction} to="/signin">Join the conversation</AccountLink>}</section>}
      <div className={styles.MobilePeople}><PopularProfiles mobile /></div>
    </div>
    <div className={styles.RightColumn}><FeedRightRail /></div>
  </div>;
}
