import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useHistory } from "react-router-dom";
import axios from "axios";
import AccountLink from "../../components/AccountLink";
import { isPagesPreview, liveAppOrigin } from "../../config/deployment";
import { feedMemory } from "../../utils/feedMemory";
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

const EMPTY_POSTS = { results: [] };
const dogPhoto = "https://res.cloudinary.com/dzhbg6go0/image/upload/v1670254218/CockapooClub/furry-fun_gsmi28.webp";
const sample = { id: "design-sample", owner: "SpoodleSpace", title: "The little moments are the big ones.", content: "Muddy paws. Fresh air. Very good company. A photo-post layout example, not a live community post.", image: dogPhoto, profile_image: dogPhoto, updated_at: "Design sample", likes_count: 0, comments_count: 0 };

export default function PostsPage({ message, filter = "", searchPage = false }) {
  const [postState, setPostState] = useState({ key: null, data: { results: [] } });
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");
  const [pageError, setPageError] = useState("");
  const [loadingMore, setLoadingMore] = useState(false);
  const [retry, setRetry] = useState(0);

  const { pathname, search } = useLocation();
  const order = new URLSearchParams(search).get("sort") || "";
  const query = new URLSearchParams(search).get("q") || "";
  const currentUser = useCurrentUser();
  const history = useHistory();
  const feedGeneration = useRef(0);
  const cacheKey = `${currentUser?.profile_id || "guest"}:${pathname}:${search}`;
  const posts = postState.key === cacheKey ? postState.data : EMPTY_POSTS;
  const setPosts = updater => setPostState(prev => ({ key: cacheKey, data: typeof updater === "function" ? updater(prev.key === cacheKey ? prev.data : { results: [] }) : updater }));
  const restored = useRef(false);
  const cacheRef = useRef(null);
  const updateParameter = (key, value) => {
    const params = new URLSearchParams(search);
    if (value) params.set(key, value); else params.delete(key);
    history.replace({ pathname, search: params.toString() });
  };
  useEffect(() => {
    const capture = () => { if (cacheRef.current) cacheRef.current.scroll = window.scrollY; };
    window.addEventListener("scroll", capture, { passive: true });
    return () => window.removeEventListener("scroll", capture);
  }, []);
  useLayoutEffect(() => {
    if (!loaded || error || isPagesPreview || postState.key !== cacheKey) return;
    const cached = feedMemory.get(cacheKey);
    const entry = { posts, scroll: cached?.scroll || 0 };
    feedMemory.set(cacheKey, entry); cacheRef.current = entry;
    // Limit retained routes to avoid unbounded feed memory.
    if (feedMemory.size > 12) feedMemory.delete(feedMemory.keys().next().value);
    if (restored.current) {
      window.scrollTo(0, entry.scroll); restored.current = false;
    }
  }, [loaded, postState, posts, cacheKey, error]);
  const clearSearch = () => {
    const params = new URLSearchParams(search);
    params.delete("q");
    history.replace({ pathname, search: params.toString() ? `?${params}` : "" });
  };
  useEffect(() => {
    if (isPagesPreview) { setLoaded(true); return; }
    const cached = feedMemory.get(cacheKey);
    if (cached && !retry) {
      restored.current = true;
      setPostState({ key: cacheKey, data: cached.posts }); setLoaded(true); setError("");
      return;
    }
    let active = true;
    cacheRef.current = null;
    feedGeneration.current += 1;
    setLoadingMore(false);
    const source = axios.CancelToken.source();
    const params = new URLSearchParams(filter);
    params.set("search", query.trim());
    if (["-likes_count", "-comments_count"].includes(order)) params.set("ordering", order);
    setLoaded(false); setError(""); setPageError("");
    const timer = setTimeout(async () => {
      try {
        const { data } = await axiosReq.get(`/posts/?${params.toString()}`, { cancelToken: source.token, timeout: 20000 });
        if (!data || !Array.isArray(data.results)) throw new Error("Invalid feed response");
        if (active) setPostState({ key: cacheKey, data });
      } catch (err) {
        if (active && !axios.isCancel(err)) setError("We couldn’t load the community feed. Your posts haven’t been changed.");
      } finally { if (active) setLoaded(true); }
    }, query ? 300 : 0);
    return () => { active = false; feedGeneration.current += 1; clearTimeout(timer); source.cancel(); };
  }, [filter, query, order, pathname, currentUser, retry, cacheKey]);
  const loadMore = async () => {
    if (loadingMore || !posts.next) return;
    const generation = feedGeneration.current;
    setLoadingMore(true); setPageError("");
    try {
      const { data } = await axiosReq.get(posts.next, { timeout: 20000 });
      if (!Array.isArray(data.results)) throw new Error("Invalid feed response");
      if (generation !== feedGeneration.current) return;
      setPosts(prev => ({ ...prev, next: data.next, results: [...prev.results, ...data.results.filter(p => !prev.results.some(old => old.id === p.id))] }));
    } catch (err) { if (generation === feedGeneration.current) setPageError("More posts couldn’t be loaded. Please try again."); }
    finally { if (generation === feedGeneration.current) setLoadingMore(false); }
  };
  const liked = pathname === "/liked";
  const following = pathname === "/feed";
  return <div className={styles.Layout}>
    <div className={styles.LeftColumn}><AppSidebar /></div>
    <div className={styles.FeedColumn}>
      {currentUser && !searchPage && <h1 className="sr-only">{liked ? "Liked posts" : following ? "Following posts" : "Community posts"}</h1>}
      {!currentUser && !searchPage && <section className={`${styles.Welcome} ss-enter`} aria-labelledby="feed-welcome-title">
        <img className={styles.WelcomePhoto} src={dogPhoto} alt="A happy cockapoo running on the grass" width="1170" height="780" />
        <div className={styles.WelcomeCopy}>
          <h1 id="feed-welcome-title">Welcome to SpoodleSpace</h1>
          <p className={styles.WelcomeLead}>The most Spoodley &amp; Cockapoopy Space you're ever going to sniff out</p>
          <p>Share everyday moments, meet fellow dog owners and keep your dog’s details together.</p>
          <div className={styles.WelcomeActions}><a className={styles.PrimaryAction} href="#community-posts">Explore posts</a><AccountLink className={styles.PrimaryAction} to="/signup">Join SpoodleSpace</AccountLink></div>
        </div>
      </section>}
      {searchPage && <section className={styles.WelcomeCopy}><h1>Search posts</h1><p>Find community posts by username or title.</p></section>}
      {currentUser && !searchPage && <section className={styles.Composer} aria-label="Create a post"><div className={styles.ComposerTop}><Avatar src={currentUser.profile_image} height={44} /><Link className={styles.ComposerPrompt} to="/posts/create">Share with the SpoodleSpace community…</Link><Link className={styles.CreatePostButton} to="/posts/create" aria-label="Create post"><Icon name="plus" size={19} /><span>Post</span></Link></div><div className={styles.ComposerBottom}><span>A photo, a thought, a little update.</span><Link to="/posts/create"><Icon name="photo" size={16} />Add photo</Link></div></section>}
      {(currentUser || searchPage) && <>
        <nav className={styles.FeedTabs} aria-label="Post feeds"><NavLink exact to="/" activeClassName={styles.Selected}>All posts</NavLink><NavLink to="/feed" activeClassName={styles.Selected}>Following</NavLink><NavLink to="/liked" activeClassName={styles.Selected}>Liked</NavLink></nav>
        <div className={styles.FeedControls}><label className={searchPage ? styles.PageSearch : styles.MobileSearch}><Icon name="search" size={18} /><input aria-label="Search posts by owner or title" type="search" value={query} onChange={e => updateParameter("q", e.target.value)} placeholder="Search owner or title" /></label><label className={styles.SortLabel}>Sort<select aria-label="Sort posts" value={order} onChange={e => updateParameter("sort", e.target.value)}><option value="">{liked ? "Recently liked" : "Latest first"}</option><option value="-likes_count">Most liked</option><option value="-comments_count">Most discussed</option></select></label></div>
      </>}
      <div id="community-posts" tabIndex="-1" />
      {isPagesPreview ? <><div className={styles.PreviewLabel}><span>Layout example</span><p>The card below is a design sample. Real posts and account actions stay on the <a href={liveAppOrigin}>Heroku app</a>.</p></div><Post {...sample} preview /></> : (!loaded || postState.key !== cacheKey) && !error ? <FeedSkeleton /> : error ? <section className={styles.Empty} role="alert"><Icon name="retry" size={30} /><h3>A small pause in the walk.</h3><p>{error}</p><button onClick={() => setRetry(n => n + 1)} className={styles.PrimaryAction}>Try again</button></section> : posts.results.length ? <div aria-label="Community posts">{posts.results.map((post, i) => <div className={i < 3 ? styles.Reveal : undefined} style={{ "--enter-delay": `${Math.min(i, 2) * 55}ms` }} key={post.id}><Post {...post} setPosts={setPosts} /></div>)}{pageError && <p role="alert" className={styles.LoadError}>{pageError}</p>}{posts.next && <button className={styles.LoadMore} disabled={loadingMore} onClick={loadMore}>{loadingMore ? "Loading more…" : pageError ? "Retry loading posts" : "A few more good dogs"}<Icon name="arrow" size={18} /></button>}</div> : <section className={styles.Empty}><Icon name={liked ? "heart" : "search"} size={32} /><h3>{query ? "No tails on this trail." : liked ? "A home for your favourites." : "It’s a little quiet here."}</h3><p>{query ? "Try another owner’s username or a shorter post title." : liked ? "Like a community post and you’ll find it here." : message}</p>{query ? <button className={styles.PrimaryAction} onClick={clearSearch}>Clear search</button> : currentUser ? <Link className={styles.PrimaryAction} to={liked ? "/" : "/posts/create"}>{liked ? "Explore posts" : "Share the first moment"}</Link> : <AccountLink className={styles.PrimaryAction} to="/signin">Join the conversation</AccountLink>}</section>}
      <div className={styles.MobilePeople}><PopularProfiles mobile /></div>
    </div>
    <div className={styles.RightColumn}><FeedRightRail /></div>
  </div>;
}
