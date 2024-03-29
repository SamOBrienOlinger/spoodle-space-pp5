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
import PopularProfiles from "../profiles/PopularProfiles";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function DogProfilesPage({ message, filter = "" }) {
  const [dogprofiles, setDogProfiles] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();

  const [query, setQuery] = useState("");

  const currentUser = useCurrentUser();

  useEffect(() => {
    const fetchDogProfiles = async () => {
      try {
        const url = `/dogprofiles/?search=${query}`;
        const { data } = await axiosReq.get(url);
        console.info(`url /dogprofiles/?${filter}search=${query}}`);
        setDogProfiles(data);
        setHasLoaded(true);
      } catch (err) {}
    };

    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchDogProfiles();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [filter, query, pathname, currentUser]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <PopularProfiles mobile />
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
            placeholder="Search Doggy Profiles by Spoodlers' Name or their Dog's Name"
          />
        </Form>

        <Link
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/dogprofiles/create"
      >
      <i className="far fa-plus-square"></i><i className="fas fa-dog"></i>Create your Doggy Profiles
      </Link>

        {hasLoaded ? (
          <>
            {dogprofiles.results.length ? (
              <InfiniteScroll
                children={dogprofiles.results.map((dogprofile) => (
                  <DogProfile
                    key={dogprofile.id}
                    {...dogprofile}
                    setDogProfiles={setDogProfiles}
                  />
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
        <PopularProfiles />
      </Col>
    </Row>
  );
}

export default DogProfilesPage;
