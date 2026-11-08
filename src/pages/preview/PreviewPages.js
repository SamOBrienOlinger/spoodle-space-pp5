import React, { useEffect, useRef } from "react";
import { Link, Route, Switch, useLocation } from "react-router-dom";
import CommunityLayout from "../../components/CommunityLayout";
import DogHubContent from "../../components/DogHubContent";
import LiveAccountNotice from "../../components/LiveAccountNotice";
import ProfileTabs, { profileView } from "../../components/ProfileTabs";
import { previewDogData } from "../../config/deployment";
import Post from "../posts/Post";
import { PreviewPostForm } from "../posts/PostForm";
import PostsPage from "../posts/PostsPage";
import { sampleDogRecords, sampleMember, samplePosts } from "./content";
import styles from "../../styles/Hub.module.css";

function SampleDog() {
  return <CommunityLayout>
    <header className={styles.Card}>
      <h1>{previewDogData.label}</h1>
      <p>Milo’s sample records show how a dog’s profile, health and behaviour details fit together.</p>
      <p><strong>3 sample records</strong> · Read-only</p>
    </header>
    <DogHubContent sampleRecords={sampleDogRecords} />
  </CommunityLayout>;
}

function SampleProfile() {
  const { search } = useLocation();
  const view = profileView(search);
  const dog = sampleDogRecords.profile;
  return <CommunityLayout>
    <header className={styles.Card}>
      <h1>{sampleMember}</h1>
      <p>Sample member profile. Explore the posts, introduction and dog records shown on a member’s page.</p>
    </header>
    <section className={styles.Card}>
      <div className={styles.Summary}>
        <img src={dog.dog_profile_image} alt={dog.dog_name} width="76" height="76" />
        <div>
          <h2>{dog.dog_name}</h2>
          <p>{dog.dog_age} · {dog.dog_color}</p>
          <Link to={previewDogData.path}>View dog details</Link>
        </div>
      </div>
    </section>
    <ProfileTabs selected={view} dogLabel={previewDogData.label} />
    {view === "posts" && <section aria-labelledby="profile-sample-posts">
      <h2 id="profile-sample-posts" className="sr-only">Sample member posts</h2>
      {samplePosts.map(post => <Post key={post.id} {...post} preview />)}
    </section>}
    {view === "about" && <section className={styles.Card}>
      <h2>About this sample member</h2>
      <p>Dog walks, muddy trails and everyday moments with Milo.</p>
    </section>}
    {view === "dog" && <DogHubContent sampleRecords={sampleDogRecords} />}
  </CommunityLayout>;
}

export default function PreviewPages() {
  const { pathname } = useLocation();
  const previousPath = useRef(pathname);
  useEffect(() => {
    if (previousPath.current === pathname) return;
    previousPath.current = pathname;
    document.getElementById("main-content")?.focus({ preventScroll: true });
    window.scrollTo(0, 0);
  }, [pathname]);

  return <Switch>
    <Route exact path="/" component={PostsPage} />
    <Route exact path="/search" render={() => <PostsPage searchPage />} />
    <Route exact path="/posts/create" component={PreviewPostForm} />
    <Route exact path={previewDogData.path} component={SampleDog} />
    <Route exact path="/profile" component={SampleProfile} />
    <Route exact path={["/signin", "/signup"]} render={() => <CommunityLayout><LiveAccountNotice account /></CommunityLayout>} />
    <Route render={() => <CommunityLayout><LiveAccountNotice /></CommunityLayout>} />
  </Switch>;
}
