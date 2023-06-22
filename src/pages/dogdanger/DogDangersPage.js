import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import DogDanger from "./DogDanger";
import Asset from "../../components/Asset";
import appStyles from "../../App.module.css";
import styles from "../../styles/DogDangersPage.module.css";
import { useLocation } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import NoResults from "../../assets/no-results.png";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import PopularProfiles from "../profiles/PopularProfiles";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

function DogDangersPage({ message, filter = "" }) {
  const [dogdanger, setDogDangers] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();

  const [query, setQuery] = useState("");

  const currentUser = useCurrentUser();

  useEffect(() => {
    const fetchDogDangers = async () => {
      try {
        const url = `/dogdanger/?search=${query}`;
        const { data } = await axiosReq.get(url);
        console.info(`url /dogdanger/?${filter}search=${query}}`);
        setDogDangers(data);
        setHasLoaded(true);
      } catch (err) {}
    };

    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchDogDangers();
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
            placeholder="Search Doggy Danger Details by Spoodlers' Name or if they are Dangerously Cute"
          />
        </Form>

        {hasLoaded ? (
          <>
            {dogdanger.results.length ? (
              <InfiniteScroll
                children={dogdanger.results.map((dogdanger) => (
                  <DogDanger
                    key={dogdanger.id}
                    {...dogdanger}
                    setdogdanger={setDogDangers}
                  />
                ))}
                dataLength={dogdanger.results.length}
                loader={<Asset spinner />}
                hasMore={!!dogdanger.next}
                next={() => fetchMoreData(dogdanger, setDogDangers)}
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

export default DogDangersPage;
