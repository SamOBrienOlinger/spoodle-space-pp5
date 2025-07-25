import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefaults";
import { useCurrentUser } from "./contexts/CurrentUserContext";

import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";

import PostCreateForm from "./pages/posts/PostCreateForm";
import PostPage from "./pages/posts/PostPage";
import PostsPage from "./pages/posts/PostsPage";
import PostEditForm from "./pages/posts/PostEditForm";

import ProfilePage from "./pages/profiles/ProfilePage";
import UsernameForm from "./pages/profiles/UsernameForm";
import UserPasswordForm from "./pages/profiles/UserPasswordForm";
import ProfileEditForm from "./pages/profiles/ProfileEditForm";
import DogProfileCreateForm from "./pages/dogprofiles/DogProfileCreateForm";
import DogProfilePage from "./pages/dogprofiles/DogProfilePage";
import DogProfilesPage from "./pages/dogprofiles/DogProfilesPage";
import DogProfileEditForm from "./pages/dogprofiles/DogProfileEditForm";

import DogHealthPage from "./pages/doghealth/DogHealthPage";
import DogsHealthPage from "./pages/doghealth/DogsHealthPage";
import DogHealthCreateForm from "./pages/doghealth/DogHealthCreateForm";
import DogHealthEditForm from "./pages/doghealth/DogHealthEditForm";

import DogDangerPage from "./pages/dogdanger/DogDangerPage";
import DogDangersPage from "./pages/dogdanger/DogDangersPage";
import DogDangerCreateForm from "./pages/dogdanger/DogDangerCreateForm";
import DogDangerEditForm from "./pages/dogdanger/DogDangerEditForm";

import NotFound from "./components/NotFound";

import {NotificationContainer} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
// import MaintenancePopup from './components/MaintenancePopup';


function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";

  return (
    <div className={styles.App}>
      {/* <MaintenancePopup /> */}
      <NavBar />
      <Container className={styles.Main}>
      <NotificationContainer/>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <PostsPage message="No results found. Adjust the search keyword." />
            )}
          />
           <Route
            exact
            path="/dogprofilespage"
            render={() => (
              <DogProfilesPage
                message="No results found. Adjust the search keyword or follow a user."
                filter={`owner__followed__owner__profile=${profile_id}&`}
              />
            )}
          />

          <Route
            exact
            path="/dogshealthpage"
            render={() => (
              <DogsHealthPage
                message="No results found. Adjust the search keyword or follow a user."
                filter={`owner__followed__owner__profile=${profile_id}&`}
              />
            )}
          />

          <Route
            exact
            path="/dogdangerspage"
            render={() => (
              <DogDangersPage
                message="No results found. Adjust the search keyword or follow a user."
                filter={`owner__followed__owner__profile=${profile_id}&`}
              />
            )}
          />

          <Route
            exact
            path="/feed"
            render={() => (
              <PostsPage
                message="No results found. Adjust the search keyword or follow a user."
                filter={`owner__followed__owner__profile=${profile_id}&`}
              />
            )}
          />
          <Route
            exact
            path="/liked"
            render={() => (
              <PostsPage
                message="No results found. Adjust the search keyword or like a post."
                filter={`likes__owner__profile=${profile_id}&ordering=-likes__created_at&`}
              />
            )}
          />

          
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />

          <Route exact path="/posts/create" render={() => <PostCreateForm />} />
          <Route exact path="/posts/:id" render={() => <PostPage />} />
          <Route exact path="/posts/:id/edit" render={() => <PostEditForm />} />

          <Route exact path="/profiles/:id" render={() => <ProfilePage />} />

          <Route exact path="/dogprofiles/create" render={() => <DogProfileCreateForm />} />
          <Route exact path="/dogprofiles/:id" render={() => <DogProfilePage />} />
          <Route exact path="/dogprofiles/" render={() => <DogProfilesPage />} />
          <Route exact path="/dogprofiles/:id/edit" render={() => <DogProfileEditForm />} />

          <Route exact path="/doghealth/create" render={() => <DogHealthCreateForm />} />
          <Route exact path="/doghealth/:id/" render={() => <DogHealthPage />} />
          <Route exact path="/doghealth/" render={() => <DogsHealthPage />} />

          <Route exact path="/doghealth/:id/edit" render={() => <DogHealthEditForm />} />

          <Route exact path="/dogdanger/create" render={() => <DogDangerCreateForm />} />
          <Route exact path="/dogdanger/:id" render={() => <DogDangerPage />} />

          <Route exact path="/dogdangers/" render={() => <DogDangersPage />} />
          <Route exact path="/dogdanger/:id/edit" render={() => <DogDangerEditForm />} />
          
          <Route
            exact
            path="/profiles/:id/edit/username"
            render={() => <UsernameForm />}
          />
          <Route
            exact
            path="/profiles/:id/edit/password"
            render={() => <UserPasswordForm />}
          />
          <Route
            exact
            path="/profiles/:id/edit"
            render={() => <ProfileEditForm />}
          />
          
          <Route render={() => <NotFound />} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;