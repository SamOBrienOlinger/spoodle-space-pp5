import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Asset from "../../components/Asset";
import styles from "../../styles/ProfilePage.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import PopularProfiles from "./PopularProfiles";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import {
  useProfileData,
  useSetProfileData,
} from "../../contexts/ProfileDataContext";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import InfiniteScroll from "react-infinite-scroll-component";
import DogProfile from "../dogprofiles/DogProfile";
import Post from "../posts/Post";
import { fetchMoreData } from "../../utils/utils";
import NoResults from "../../assets/no-results.png";
import { ProfileEditDropdown } from "../../components/MoreDropdown";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

function ProfilePage() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [profilePosts, setProfilePosts] = useState({ results: [] });
  const [dogProfiles, setDogProfiles] = useState({ results: [] });

  const currentUser = useCurrentUser();
  const { id } = useParams();

  const { setProfileData, handleFollow, handleUnfollow } = useSetProfileData();
  const { pageProfile } = useProfileData();

  const [profile] = pageProfile.results;
  const is_owner = currentUser?.username === profile?.owner;

  useEffect(() => {
      const fetchData = async () => {
        try {
          const [{ data: pageProfile }, { data: profilePosts }, { data: dogProfiles}] =
            await Promise.all([
              axiosReq.get(`/profiles/${id}/`),
              axiosReq.get(`/posts/?owner__profile=${id}`),
    
              axiosReq.get(`/dogprofiles/?owner__profile=${id}`),
            ]);
          setProfileData((prevState) => ({
            ...prevState,
            pageProfile: { results: [pageProfile] },
          }));
          setProfilePosts(profilePosts);
          setHasLoaded(true);

          setDogProfiles(dogProfiles);
          setHasLoaded(true);
        } catch (err) {
          // console.log(err);
        }
      };
      fetchData();
    }, [id, setProfileData], [id, setDogProfiles]);

  const mainProfile = (
    <>
      {profile?.is_owner && <ProfileEditDropdown id={profile?.id} />}
      <Row noGutters className="px-3 text-center">
        <Col lg={3} className="text-lg-left">
          <Image
            className={styles.ProfileImage}
            roundedCircle
            src={profile?.image}
          />
        </Col>
        <Col lg={6}>
          <h3 className="m-2">{profile?.owner}</h3>
          <Row className="justify-content-center no-gutters">
            <Col xs={3} className="my-2">
              <div>{profile?.posts_count}</div>
              <div>posts</div>
            </Col>
            <Col xs={3} className="my-2">
              <div>{profile?.followers_count}</div>
              <div>followers</div>
            </Col>
            <Col xs={3} className="my-2">
              <div>{profile?.following_count}</div>
              <div>following</div>
            </Col>
          </Row>
        </Col>
        <Col lg={3} className="text-lg-right">
          {currentUser &&
            !is_owner &&
            (profile?.following_id ? (
              <Button
                className={`${btnStyles.Button} ${btnStyles.BlackOutline}`}
                onClick={() => handleUnfollow(profile)}
              >
                unfollow
              </Button>
            ) : (
              <Button
                className={`${btnStyles.Button} ${btnStyles.Black}`}
                onClick={() => handleFollow(profile)}
              >
                follow
              </Button>
            ))}
        </Col>
        {profile?.content && <Col className="p-3">{profile.content}</Col>}
      </Row>
    </>
  );

  const mainProfilePosts = (
    <>
      <hr />
      <p className="text-center" id={styles.ProfilePostsHeading}>
        {profile?.owner}'s posts
      </p>
      <hr />
      {profilePosts.results.length ? (
        <InfiniteScroll
          dataLength={profilePosts.results.length}
          loader={<Asset spinner />}
          hasMore={!!profilePosts.next}
          next={() => fetchMoreData(profilePosts, setProfilePosts)}
        >
          {profilePosts.results.map((post) => (
            <Post key={post.id} {...post} setPosts={setProfilePosts} />
          ))}
        </InfiniteScroll>
      ) : (
        <Asset
          src={NoResults}
          message={`No results found, ${profile?.owner} hasn't posted yet.`}
        />
      )}
      <hr />
      <p className="text-center">{profile?.owner}'s dog profile</p>
      <hr />
      {/* {dogProfiles.results.length ? ( */}
      {dogProfiles?.results?.length ? ( 
        <InfiniteScroll
          children={dogProfiles.results.map((dogprofile) => (
            <DogProfile key={dogprofile.id} {...dogprofile} setDogProfiles={setDogProfiles} />
          ))}
          dataLength={dogProfiles.results.length}
          loader={<Asset spinner />}
          hasMore={!!dogProfiles.next}
          next={() => fetchMoreData(dogProfiles, setDogProfiles)}
        />
      ) : (
        <Asset
          src={NoResults}
          message={`No results found, ${profile?.owner} hasn't created a doggy profile yet.`}
        />
      )}

    </>
  );

  return (
    <>
      <Row>
        <Col className="py-2 p-0 p-lg-2" lg={8}>
          <PopularProfiles mobile />
          <Container className={appStyles.Content}>
            {hasLoaded ? (
              <>
                {mainProfile}

                <Container>
                  <div>
                    {(profile?.following_id || is_owner) && (
                      <div id={styles.linksContainer}>
                        {profile.dog_profile && (
                          <Link
                            className={`${styles.NavLink} ${btnStyles.Button} ${styles["App-purple-Links"]} link`}
                            to={`/dogprofiles/${profile.dog_profile}`}
                          >
                            <i className="fas fa-dog purple-icon" />
                            <p className={styles.ButtonText}>
                              {profile?.owner}'s doggy profile details
                            </p>
                          </Link>
                        )}

                        {!profile.dog_profile && is_owner && (
                          <Link
                            className={`${styles.NavLink} ${btnStyles.Button} ${styles["App-purple-Links"]} link`}
                            to={`/dogprofiles/create`}
                          >
                            <i className="fas fa-dog" />
                            <p
                              className={`${btnStyles.ButtonText} ${styles.ButtonText}`}
                            >
                              {profile?.owner}, Create your doggy profile now
                            </p>
                          </Link>
                        )}

                        {profile.dog_health && (
                          <Link
                            className={`${styles.NavLink} ${btnStyles.Button} ${styles["App-purple-Links"]} link`}
                            to={`/doghealth/${profile.dog_health}`}
                          >
                            <i className="fas fa-dog purple-icon" />
                            <p className={styles.ButtonText}>
                              {profile?.owner}'s doggy health details
                            </p>
                          </Link>
                        )}

                        {!profile.dog_health && is_owner && (
                          <Link
                            className={`${styles.NavLink} ${btnStyles.Button} ${styles["App-purple-Links"]} link`}
                            to={`/doghealth/create`}
                          >
                            <i className="fas fa-dog" />
                            <p
                              className={`${btnStyles.ButtonText} ${styles.ButtonText}`}
                            >
                              {profile?.owner}, Create your doggy health details
                              now
                            </p>
                          </Link>
                        )}

                        {profile.dog_danger && (
                          <Link
                            className={`${styles.NavLink} ${btnStyles.Button} ${styles["App-purple-Links"]} link`}
                            to={`/dogdanger/${profile.dog_danger}`}
                          >
                            <i className="fas fa-dog purple-icon" />
                            <p className={styles.ButtonText}>
                              {profile?.owner}'s doggy danger details
                            </p>
                          </Link>
                        )}

                        {!profile.dog_danger && is_owner && (
                          <Link
                            className={`${styles.NavLink} ${btnStyles.Button} ${styles["App-purple-Links"]} link`}
                            to={`/dogdanger/create`}
                          >
                            <i className="fas fa-dog" />
                            <p
                              className={`${btnStyles.ButtonText} ${styles.ButtonText}`}
                            >
                              {profile?.owner}, Create your Doggy Danger details
                              now
                            </p>
                          </Link>
                        )}
                      </div>
                    )}

                    {!profile?.following_id && !is_owner && (
                      <OverlayTrigger
                        placement="bottom"
                        overlay={
                          <Tooltip>
                            You must follow another Cockapooper to view their
                            Doggy details
                          </Tooltip>
                        }
                      >
                        <div id={styles.linksContainer}>
                          {profile.dog_profile && (
                            <span
                              className={`${styles.NavLink} ${btnStyles.Button} ${styles["App-purple-Links"]} link`}
                            >
                              <i className="fas fa-dog purple-icon" />
                              <p className={styles.ButtonText}>
                                {profile?.owner}'s doggy profile
                              </p>
                            </span>
                          )}
                          {profile.dog_health && (
                            <span
                              className={`${styles.NavLink} ${btnStyles.Button} ${styles["App-purple-Links"]} link`}
                            >
                              <i className="fas fa-dog" />
                              <p
                                className={`${btnStyles.ButtonText} ${styles.ButtonText}`}
                              >
                                {profile?.owner}'s doggy health details
                              </p>
                            </span>
                          )}
                          {profile.dog_danger && (
                            <span
                              className={`${styles.NavLink} ${btnStyles.Button} ${styles["App-purple-Links"]} link`}
                            >
                              <i className="fas fa-dog" />
                              <p
                                className={`${btnStyles.ButtonText} ${styles.ButtonText}`}
                              >
                                {profile?.owner}'s doggy danger details
                              </p>
                            </span>
                          )}
                        </div>
                      </OverlayTrigger>
                    )}
                  </div>
                </Container>

                {mainProfilePosts}
              </>
            ) : (
              <Asset spinner />
            )}
          </Container>
        </Col>
        <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
          <PopularProfiles />
        </Col>
      </Row>
    </>
  );
}

export default ProfilePage;
