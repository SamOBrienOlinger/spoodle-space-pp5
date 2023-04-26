import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import DogProfile from "./DogProfile";
import Asset from "../../components/Asset";

import appStyles from "../../App.module.css";
import styles from "../../styles/DogProfilesPage.module.css";
import { useLocation } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

import NoResults from "../../assets/no-results.png";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import DogProfiles from "../dogprofiles/DogProfilesPage";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

function DogProfilesPage({ message, filter = "" }) {
  const [dogprofiles, setDogProfiles] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();

  const [query, setQuery] = useState("");

  const currentUser = useCurrentUser();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axiosReq.get(`/dogprofiles/?${filter}search=${query}`);
        setDogProfiles(data);
        setHasLoaded(true);
      } catch (err) {        
      }
    };

    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchPosts();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [filter, query, pathname, currentUser]);


  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <DogProfiles mobile />
        <i className={`fas fa-search ${styles.SearchIcon}`} />
        <Form
          className={styles.SearchBar}
          onSubmit={(event) => event.preventDefault()}
        >
          <Form.Control
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            type="text"
            className="mr-sm-2"
            placeholder="Search posts"
          />
        </Form>

        {hasLoaded ? (
          <>
            {/* {posts?.results?.length ? ( */}
            {dogprofiles.results.length ? (
              <InfiniteScroll
                children={dogprofiles.results.map((dogprofile) => (
                  <DogProfile key={dogprofile.id} {...dogprofile} setDogProfiles={setDogProfiles} />
                ))}
                dataLength={dogprofiles.results.length}
                loader={<Asset spinner />}
                hasMore={!!dogprofiles.next}
                next={() => fetchMoreData(dogprofiles, setDogProfiles)}
              />
            ) : (
              <Container className={appStyles.Content}>
                <Asset src={NoResults} message={message} />
              </Container>
            )}
          </>
        ) : (
          <Container className={appStyles.Content}>
            <Asset spinner />
          </Container>
        )}
      </Col>
      <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
        <DogProfiles />
      </Col>
    </Row>
  );
}





// function DogProfilesPage() {

//     return (
//       <div>
//         <h1>Hi this is the DogProfile..S..Page</h1>
  
//           <p>I have reached the usage limit of my billing account, again, and can't continue using gitpod workspaces</p>
  
//       </div>
//     )
//   };
//   export default DogProfilesPage;

export default DogProfilesPage;