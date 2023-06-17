import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import DogHealth from "./DogHealth";
import Asset from "../../components/Asset";
import appStyles from "../../App.module.css";
import styles from "../../styles/DogsHealthPage.module.css";
import { useLocation } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import NoResults from "../../assets/no-results.png";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import PopularProfiles from "../profiles/PopularProfiles";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

function DogsHealthPage({ message, filter = "" }) {
  const [doghealth, setDogsHealth] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();

  const [query, setQuery] = useState("");

  const currentUser = useCurrentUser();

  useEffect(() => {
    const fetchDogsHealth = async () => {
      try {
        const url = `/doghealth/?search=${query}`;
        const { data } = await axiosReq.get(url);
        console.info(`url /doghealth/?${filter}search=${query}}`);
        setDogsHealth(data);
        setHasLoaded(true);
      } catch (err) {        
      }
    };

    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchDogsHealth();
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
            placeholder="Search Doggy Health details"
          />
        </Form>

        {hasLoaded ? (
          <>
            {doghealth.results.length ? (
              <InfiniteScroll
                children={doghealth.results.map((doghealth) => (
                  <DogHealth key={doghealth.id} {...doghealth} setDogProfiles={setDogsHealth} />
                ))}
                dataLength={doghealth.results.length}
                loader={<Asset spinner />}
                hasMore={!!doghealth.next}
                next={() => fetchMoreData(doghealth, setDogsHealth)}
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

export default DogsHealthPage;
