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
import Post from "../posts/Post";
import { fetchMoreData } from "../../utils/utils";
import NoResults from "../../assets/no-results.png";
import { ProfileEditDropdown } from "../../components/MoreDropdown";

// import DogProfile from "../dogprofiles/DogProfile";

// import { NavLink } from "react-bootstrap";

import { NavLink } from "react-router-dom";


function ProfilePage() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [profilePosts, setProfilePosts] = useState({ results: [] });
  // const [profileDogProfiles, setProfileDogProfiles] = useState({ results: [] });

  const currentUser = useCurrentUser();
  const { id } = useParams();

  const { setProfileData, handleFollow, handleUnfollow } = useSetProfileData();
  const { pageProfile } = useProfileData();

  const [profile] = pageProfile.results;
  const is_owner = currentUser?.username === profile?.owner;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{ data: pageProfile }, { data: profilePosts }] =
        // const [{ data: pageProfile }, { data: profilePosts }, { data: profileDogProfiles}] =
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
        // setProfileDogProfiles(profileDogProfiles);
        setHasLoaded(true);
      } catch (err) {
        // console.log(err);
      }
    };
    fetchData();
  }, [id, setProfileData]);

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
      <p className="text-center">{profile?.owner}'s posts</p>
      <hr />
      {profilePosts.results.length ? (
        <InfiniteScroll
          children={profilePosts.results.map((post) => (
            <Post key={post.id} {...post} setPosts={setProfilePosts} />
          ))}
          dataLength={profilePosts.results.length}
          loader={<Asset spinner />}
          hasMore={!!profilePosts.next}
          next={() => fetchMoreData(profilePosts, setProfilePosts)}
        />
      ) : (
        <Asset
          src={NoResults}
          message={`No results found, ${profile?.owner} hasn't posted yet.`}
        />
      )}
    </>
  );

  // const mainDogProfiles = (
  //   <>
  //           <hr />
  //     <p className="text-center">{profile?.owner}'s dog profile</p>
  //     <hr />
  //     {profileDogProfiles.results.length ? (
  //       <InfiniteScroll
  //         children={profileDogProfiles.results.map((dogprofile) => (
  //           <DogProfile key={dogprofile.id} {...dogprofile} setProfileDogprofiles={setProfileDogProfiles} />
  //         ))}
  //         dataLength={profileDogProfiles.results.length}
  //         loader={<Asset spinner />}
  //         hasMore={!!profileDogProfiles.next}
  //         next={() => fetchMoreData(profileDogProfiles, setProfileDogProfiles)}
  //     />
  // ) : (
  //   <Asset
  //     src={NoResults}
  //     message={`No results found, ${profile?.owner} hasn't added a dog profile yet.`}
  //     />
  //     )}
  //   </>
  // );

  return (
    <Row>
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <PopularProfiles mobile />
        <Container className={appStyles.Content}>
          {hasLoaded ? (
            <>
              {mainProfile}
              {mainProfilePosts}
            </>
          ) : (
            <Asset spinner />
          )}

          {hasLoaded ? (
            <>
              <Button>
                <NavLink
                  className={styles.NavLink}
                  activeClassName={styles.Active}
                  to={`/dogprofiles/${id}`}
                >
                  <i className="fas fa-dog"></i>
                  <p className="text-center">{profile?.owner}'s doggy profile</p>
                </NavLink>
              </Button>
            </>
          ) : (
            <Asset
              src={NoResults}
              message={`No results found, ${profile?.owner} hasn't added a dog profile yet.`}
            />
          )}

           {hasLoaded ? (
            <>
              <Button>
                <NavLink
                  className={styles.NavLink}
                  activeClassName={styles.Active}
                  to={`/dogprofiles/${id}/doghealthpage`}
                >
                  <i className="fas fa-dog"></i>
                  <p className="text-center">{profile?.owner}'s doggy health details</p>
                </NavLink>
              </Button>
            </>
          ) : (
            <Asset
              src={NoResults}
              message={`No results found, ${profile?.owner} hasn't added a any details yet.`}
            />
          )}

           {hasLoaded ? (
            <>
              <Button>
                <NavLink
                  className={styles.NavLink}
                  activeClassName={styles.Active}
                  to={`/dogprofiles/${id}/dogdangerpage`}
                >
                  <i className="fas fa-dog"></i>
                  <p className="text-center">{profile?.owner}'s doggy danger details</p>
                </NavLink>
              </Button>
            </>
          ) : (
            <Asset
              src={NoResults}
              message={`No results found, ${profile?.owner} hasn't added any details yet.`}
            />
          )}

          {/* <>
            {/* <Row className="text-center">
              <Col lg={3} className="text-lg-right">
                {currentUser && !is_owner && (
                  <>
                    {profile?.following_id ? (
                      <Button>
                        <NavLink
                          className={styles.NavLink}
                          activeClassName={styles.Active}
                          to="/"
                        >
                          <i className="fas fa-dog"></i>
                          <p className="text-center">{profile?.owner}'s dog profile</p>
                        </NavLink>
                      </Button>
                    ) : (
                      <div>
                        <Button>
                          <NavLink
                            className={styles.NavLink}
                            activeClassName={styles.Active}
                            to="/"
                          >
                            <i className="fas fa-dog"></i>
                            <p className="text-center">{profile?.owner}'s dog health</p>
                          </NavLink>
                        </Button>
                        <Asset
                          src={NoResults}
                          message={`No results found, ${profile?.owner} hasn't added a dog profile yet.`}
                        />
                      </div>
                    )}

                    
                  </>
                )}
              </Col>
            </Row>
          </> */}
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        <PopularProfiles />
      </Col>
    </Row>
  );
  
}

export default ProfilePage;
