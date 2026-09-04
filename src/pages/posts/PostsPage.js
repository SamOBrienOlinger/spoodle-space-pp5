import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";

import Post from "./Post";
import Asset from "../../components/Asset";
import Avatar from "../../components/Avatar";
import AppSidebar from "../../components/AppSidebar";
import FeedRightRail from "../../components/FeedRightRail";
import PopularProfiles from "../profiles/PopularProfiles";

import appStyles from "../../App.module.css";
import styles from "../../styles/PostsPage.module.css";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

import NoResults from "../../assets/no-results.png";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";

function PostsPage({ message, filter = "" }) {
  const [posts, setPosts] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const [query, setQuery] = useState("");
  const { pathname, search } = useLocation();
  const currentUser = useCurrentUser();

  useEffect(() => {
    const queryFromUrl = new URLSearchParams(search).get("q") || "";
    setQuery(queryFromUrl);
  }, [search]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const encodedQuery = encodeURIComponent(query.trim());
        const { data } = await axiosReq.get(
          `/posts/?${filter}search=${encodedQuery}`
        );
        setPosts(data);
      } catch (err) {
        setPosts({ results: [] });
      } finally {
        setHasLoaded(true);
      }
    };

    setHasLoaded(false);
    const timer = setTimeout(fetchPosts, 500);

    return () => clearTimeout(timer);
  }, [filter, query, pathname, currentUser]);

  return (
    <Row className={styles.Layout}>
      <Col lg={3} xl={2} className={`${styles.LeftColumn} d-none d-lg-block`}>
        <AppSidebar />
      </Col>

      <Col xs={12} lg={6} xl={7} className={styles.FeedColumn}>
        {!currentUser && (
          <section className={styles.Welcome}>
            <h1 className={styles.Header}>Welcome to SpoodleSpace</h1>
            <p>
              Share dog photos, follow other owners, and keep dog profile,
              health and safety information together in one community.
            </p>
            <div className={styles.WelcomeActions}>
              <Link className={styles.PrimaryAction} to="/signin">
                Sign in
              </Link>
              <Link className={styles.SecondaryAction} to="/signup">
                Create account
              </Link>
            </div>
          </section>
        )}

        {currentUser && (
          <section className={styles.Composer} aria-label="Create a post">
            <div className={styles.ComposerTop}>
              <Avatar src={currentUser.profile_image} height={44} />
              <Link className={styles.ComposerPrompt} to="/posts/create">
                Share with the SpoodleSpace community...
              </Link>
            </div>
            <div className={styles.ComposerActions}>
              <Link className={styles.ComposerAction} to="/posts/create">
                <i className="far fa-image" aria-hidden="true" />
                <span>Add photo</span>
              </Link>
              <Link className={styles.CreatePostButton} to="/posts/create">
                Create post
              </Link>
            </div>
          </section>
        )}

        {currentUser && (
          <div className={`${styles.SearchRegion} d-lg-none`}>
            <i
              className={`fas fa-search ${styles.SearchIcon}`}
              aria-hidden="true"
            />
            <Form
              className={styles.SearchBar}
              onSubmit={(event) => event.preventDefault()}
            >
              <Form.Control
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                type="search"
                aria-label="Search posts by owner or title"
                placeholder="Search posts by owner or title..."
              />
            </Form>
          </div>
        )}

        <PopularProfiles mobile />

        {hasLoaded ? (
          posts.results.length ? (
            <InfiniteScroll
              dataLength={posts.results.length}
              loader={<Asset spinner />}
              hasMore={Boolean(posts.next)}
              next={() => fetchMoreData(posts, setPosts)}
            >
              {posts.results.map((post) => (
                <Post key={post.id} {...post} setPosts={setPosts} />
              ))}
            </InfiniteScroll>
          ) : (
            <Container className={appStyles.Content}>
              <Asset src={NoResults} message={message} />
            </Container>
          )
        ) : (
          <Container className={appStyles.Content}>
            <Asset spinner />
          </Container>
        )}
      </Col>

      <Col lg={3} xl={3} className={`${styles.RightColumn} d-none d-lg-block`}>
        <FeedRightRail />
      </Col>
    </Row>
  );
}

export default PostsPage;
