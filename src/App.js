// import { Button } from 'bootstrap';
// import Button from "react-bootstrap/Button";
import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import {Route, Switch} from "react-router-dom";
import SignUpForm from "./pages/auth/SignUpForm";

function App() {
  return (
      <div className={styles.App}>
          
          <NavBar />

          <Container className={styles.Main}>
            
            <Switch>
              <Route exact path="/" render={() => <h1>Home page</h1>} />
              <Route exact path="/signin" render={() => <h1>Login</h1>} />
              <Route exact path="/signup" render={() => <SignUpForm />} />
              <Route render={() => <p>Page not found!</p>} />
           
            </Switch>

          </Container>
        
        </div>
  );
}


      // {/* <h1>Welcome to SpoodleSpace fellow Spoodles and Cockapoopers!</h1>
      
      // <div id='container-one'>
      //   <div id='ss-logo'></div>
      // </div> */}

      // {/* <Button variant="primary">Click Me</Button> */}


export default App;