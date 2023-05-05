import React, { useState, useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";

import { axiosReq } from "../../api/axiosDefaults";
// import {
//   useCurrentUser,
//   useSetCurrentUser,
// } from "../../contexts/CurrentUserContext";

import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
// import styles from "../../styles/DogProfileCreateEditForm.module.css";


// const DogProfileEditForm = () => {
function DogProfileEditForm() {
  // const currentUser = useCurrentUser();
  // const setCurrentUser = useSetCurrentUser();

  const { id } = useParams();
  const history = useHistory();
  // const imageFile = useRef();
  const imageInput = useRef(null);



  const [dogProfileData, setDogProfileData] = useState({
    dog_name: "",
    dog_age: "",
    dog_color: "",
    dog_bio: "",
    dog_profile_image: "",
  });
  const { 
    dog_name, 
    dog_age, 
    dog_color, 
    dog_bio, 
    dog_profile_image,
    is_owner 
} = dogProfileData;

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const handleMount = async () => {
      // if (currentUser?.dogprofile_id?.toString() === id) {
      try {
          const { data } = await axiosReq.get(`/dogprofiles/${id}/`);
          const { 
        dog_name, 
        dog_age, 
        dog_color, 
        dog_bio, 
        dog_profile_image } = data;

      is_owner ? setDogProfileData({     
        dog_name, 
        dog_age, 
        dog_color, 
        dog_bio, 
        dog_profile_image }) : history.push("/");
    } catch (err) {
      // console.log(err);
    }
  };

  //   handleMount();
  // }, [currentUser, history, id]);

  handleMount();
}, [is_owner, history, id]);

  const handleChange = (event) => {
    setDogProfileData({
      ...dogProfileData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    
    formData.append("dog name", dog_name);
    formData.append("dog age", dog_age);
    formData.append("dog color", dog_color);
    formData.append("dog bio", dog_bio);

    if (imageInput?.current?.files[0]) {
      formData.append("dog image", imageInput?.current?.files[0]);
    }

    try {
      await axiosReq.put(`/dogprofiles/${id}/`, formData);
      history.push(`/dogprofiles/${id}`);
    } catch (err) {
      // console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };
  
  //   try {
  //     const { data } = await axiosReq.put(`/dogprofiles/${id}/`, formData);
  //     setCurrentUser((currentUser) => ({
  //       ...currentUser,
  //       dog_profile_image: data.dog_profile_image,
  //     }));
  //     history.goBack();
  //   } catch (err) {
  //     // console.log(err);
  //     setErrors(err.response?.data);
  //   }
  // };

  const textFields = (
    <>
      <Form.Group>
        <Form.Label>Dog name</Form.Label>
        <Form.Control
          as="textarea"
          value={dog_name}
          onChange={handleChange}
          name="dog name"
          rows={1}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Dog age</Form.Label>
        <Form.Control
          as="textarea"
          value={dog_age}
          onChange={handleChange}
          name="dog age"
          rows={1}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Dog color</Form.Label>
        <Form.Control
          as="textarea"
          value={dog_color}
          onChange={handleChange}
          name="dog color"
          rows={1}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Dog bio</Form.Label>
        <Form.Control
          as="textarea"
          value={dog_bio}
          onChange={handleChange}
          name="dog bio"
          rows={7}
        />
      </Form.Group>

      {/* {errors?.content?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert> */}

{errors?.dog_name?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Button
        className={`${btnStyles.Button} ${btnStyles.Blue}`}
        onClick={() => history.goBack()}
      >
        cancel
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
        save
      </Button>
    </>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="py-2 p-0 p-md-2 text-center" md={7} lg={6}>
          <Container className={appStyles.Content}>
            <Form.Group>
              {dog_profile_image && (
                <figure>
                  <Image src={dog_profile_image} fluid />
                </figure>
              )}
              {errors?.dog_profile_image?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))}
              <div>
                <Form.Label
                  className={`${btnStyles.Button} ${btnStyles.Blue} btn my-auto`}
                  htmlFor="image-upload"
                >
                  Change the image
                </Form.Label>
              </div>
              <Form.File
                id="image-upload"
                ref={imageInput}
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files.length) {
                    setDogProfileData({
                      ...dogProfileData,
                      dog_profile_image: URL.createObjectURL(e.target.files[0]),
                    });
                  }
                }}
              />
            </Form.Group>
            <div className="d-md-none">{textFields}</div>
          </Container>
        </Col>
        <Col md={5} lg={6} className="d-none d-md-block p-0 p-md-2 text-center">
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
};

export default DogProfileEditForm;

// CommentCreateForm.js

// import React, { useState } from "react";

// import Form from "react-bootstrap/Form";
// import { axiosRes } from "../../api/axiosDefaults";

// import styles from "../../styles/CommentCreateEditForm.module.css";

// function CommentEditForm(props) {
//   const { id, content, setShowEditForm, setComments } = props;

//   const [formContent, setFormContent] = useState(content);

//   const handleChange = (event) => {
//     setFormContent(event.target.value);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       await axiosRes.put(`/comments/${id}/`, {
//         content: formContent.trim(),
//       });
//       setComments((prevComments) => ({
//         ...prevComments,
//         results: prevComments.results.map((comment) => {
//           return comment.id === id
//             ? {
//                 ...comment,
//                 content: formContent.trim(),
//                 updated_at: "now",
//               }
//             : comment;
//         }),
//       }));
//       setShowEditForm(false);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <Form onSubmit={handleSubmit}>
//       <Form.Group className="pr-1">
//         <Form.Control
//           className={styles.Form}
//           as="textarea"
//           value={formContent}
//           onChange={handleChange}
//           rows={2}
//         />
//       </Form.Group>
//       <div className="text-right">
//         <button
//           className={styles.Button}
//           onClick={() => setShowEditForm(false)}
//           type="button"
//         >
//           cancel
//         </button>
//         <button
//           className={styles.Button}
//           disabled={!content.trim()}
//           type="submit"
//         >
//           save
//         </button>
//       </div>
//     </Form>
//   );
// }

// export default CommentEditForm;