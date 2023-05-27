// import React, { useRef } from "react";
// import { useHistory } from "react-router";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
// import Alert from "react-bootstrap/Alert";
// import Image from "react-bootstrap/Image";
// import Asset from "../../components/Asset";
// import Upload from "../../assets/upload.png";
import styles from "../../styles/DogProfileCreateEditForm.module.css";
// import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

function DogHealthCreateForm({ errors, handleSubmit, handleChange, dogHealthData }) {
  const {
    vet_name,
    vet_phone,
    vet_email,
    chipped,
    kennel_cough,
    rabies,
    allergies,
  } = dogHealthData;

  // const imageInput = useRef(null);
  // const history = useHistory();

  // const handleChangeImage = (event) => {
  //   if (event.target.files.length) {
  //     handleChange({
  //       target: {
  //         name: "dog_profile_image",
  //         value: URL.createObjectURL(event.target.files[0]),
  //       },
  //     });
  //   }
  // };

  return (
    <Form onSubmit={handleSubmit} className={styles.DogHealthCreateForm}>
      <Form.Group>
        <Form.Label>Vet Name</Form.Label>
        <Form.Control
          type="text"
          name="vet_name"
          value={vet_name}
          onChange={handleChange}
          isInvalid={errors?.vet_name}
        />
        {errors?.vet_name && (
          <Form.Control.Feedback type="invalid">
            {errors.vet_name}
          </Form.Control.Feedback>
        )}
      </Form.Group>

      <Form.Group>
        <Form.Label>Vet Phone</Form.Label>
        <Form.Control
          type="text"
          name="vet_phone"
          value={vet_phone}
          onChange={handleChange}
          isInvalid={errors?.vet_phone}
        />
        {errors?.vet_phone && (
          <Form.Control.Feedback type="invalid">
            {errors.vet_phone}
          </Form.Control.Feedback>
        )}
      </Form.Group>

      <Form.Group>
        <Form.Label>Vet Email</Form.Label>
        <Form.Control
          type="email"
          name="vet_email"
          value={vet_email}
          onChange={handleChange}
          isInvalid={errors?.vet_email}
        />
        {errors?.vet_email && (
          <Form.Control.Feedback type="invalid">
            {errors.vet_email}
          </Form.Control.Feedback>
        )}
      </Form.Group>

      <Form.Group>
        <Form.Label>Chipped</Form.Label>
        <Form.Control
          type="text"
          name="chipped"
          value={chipped}
          onChange={handleChange}
          isInvalid={errors?.chipped}
        />
        {errors?.chipped && (
          <Form.Control.Feedback type="invalid">
            {errors.chipped}
          </Form.Control.Feedback>
        )}
      </Form.Group>

      <Form.Group>
        <Form.Label>Kennel Cough</Form.Label>
        <Form.Control
          type="text"
          name="kennel_cough"
          value={kennel_cough}
          onChange={handleChange}
          isInvalid={errors?.kennel_cough}
        />
        {errors?.kennel_cough && (
          <Form.Control.Feedback type="invalid">
            {errors.kennel_cough}
          </Form.Control.Feedback>
        )}
      </Form.Group>

      <Form.Group>
        <Form.Label>Rabies</Form.Label>
        <Form.Control
          type="text"
          name="rabies"
          value={rabies}
          onChange={handleChange}
          isInvalid={errors?.rabies}
        />
        {errors?.rabies && (
          <Form.Control.Feedback type="invalid">
            {errors.rabies}
          </Form.Control.Feedback>
        )}
      </Form.Group>

      <Form.Group>
        <Form.Label>Allergies</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          name="allergies"
          value={allergies}
          onChange={handleChange}
          isInvalid={errors?.allergies}
        />
        {errors?.allergies && (
          <Form.Control.Feedback type="invalid">
            {errors.allergies}
          </Form.Control.Feedback>
        )}
      </Form.Group>

      <Button type="submit" className={`${btnStyles.button} ${btnStyles.blue}`}>
        Submit
      </Button>
    </Form>
  );
}

export default DogHealthCreateForm;


// import React, { useRef, useState } from "react";
// import { useHistory } from "react-router";
// import { axiosReq } from "../../api/axiosDefaults";
// import { useRedirect } from "../../hooks/useRedirect";
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
// import Container from "react-bootstrap/Container";
// import Alert from "react-bootstrap/Alert";
// import Image from "react-bootstrap/Image";
// import Asset from "../../components/Asset";
// import Upload from "../../assets/upload.png";
// import styles from "../../styles/DogHealthCreateEditForm.module.css";
// import appStyles from "../../App.module.css";
// import btnStyles from "../../styles/Button.module.css";

// function DogHealthCreateForm() {
//   useRedirect("loggedOut");
//   const [errors, setErrors] = useState({});

//   const [dogHealthData, setDogHealthData] = useState({  
//     vet_name: ""
//     vet_phone: ""
//     vet_email: ""
//     chipped: ""
//     kennel_cough: ""
//     rabies: ""
//     allergies: ""
//     dog_profile_image,
//     dog_name: ""
//   });
//   const { 
//     vet_name,
//     vet_phone,
//     vet_email,
//     chipped,
//     kennel_cough,
//     rabies,
//     allergies,
//     dog_profile_image } = dogHealthData;

//   const handleChange = (event) => {
//     setDogHealthData({
//       ...dogHealthData,
//       [event.target.name]: event.target.value,
//     });
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const formData = new FormData();


//     allergies

//     formData.append("vet_name", vet_name);
//     formData.append("vet_phone", vet_phone);
//     formData.append("vet_email", vet_email);
//     formData.append("chipped", chipped);
//     formData.append("kennel_cough", kennel_cough);
//     formData.append("rabies", rabies);
//     formData.append("allergies", allergies);

//     try {
//       const { data } = await axiosReq.post("/dogsHealth/", formData);
//       history.push(`/dogsHealth/${data.id}`);
//     } catch (err) {
//       if (err.response?.status !== 401) {
//         setErrors(err.response?.data);
//       }
//     }
//   };

//   const textFields = (
//     <div className="text-center">
//        <Form.Group>
//          <Form.Label>Dog Name</Form.Label>
//          <Form.Control
//           type="text"
//           name="dog_name"
//           value={dog_name}
//           onChange={handleChange}
//         />
//       </Form.Group>
//       {errors?.dog_name?.map((message, idx) => (
//         <Alert variant="warning" key={idx}>
//           {message}
//         </Alert>
//       ))}

//       <Form.Group>
//         <Form.Label>Dog Age</Form.Label>
//         <Form.Control
//           as="textarea"
//           rows={6}
//           name="dog_age"
//           value={dog_age}
//           onChange={handleChange}
//         />
//       </Form.Group>
//       {errors?.dog_age?.map((message, idx) => (
//         <Alert variant="warning" key={idx}>
//           {message}
//         </Alert>
//       ))}

//       <Form.Group>
//         <Form.Label>Dog Color</Form.Label>
//         <Form.Control
//           as="textarea"
//           rows={6}
//           name="dog_color"
//           value={dog_color}
//           onChange={handleChange}
//         />
//       </Form.Group>
//       {errors?.dog_color?.map((message, idx) => (
//         <Alert variant="warning" key={idx}>
//           {message}
//         </Alert>
//       ))}

//       <Form.Group>
//         <Form.Label>Dog Bio</Form.Label>
//         <Form.Control
//           as="textarea"
//           rows={6}
//           name="dog_bio"
//           value={dog_bio}
//           onChange={handleChange}
//         />
//       </Form.Group>
//       {errors?.dog_bio?.map((message, idx) => (
//         <Alert variant="warning" key={idx}>
//           {message}
//         </Alert>
//       ))}

//       <Button
//         className={`${btnStyles.Button} ${btnStyles.Blue}`}
//         onClick={() => history.goBack()}
//         // type="submit"
//       >
//         cancel
//       </Button>
//       <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
//         create
//       </Button>
//     </div>
//   );

//   return (
//     <Form onSubmit={handleSubmit}>
//       <Row>
//          <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
//            <Container
//             className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
//           >
//             <Form.Group className="text-center">
//               {dog_profile_image ? (
//                 <>
//                   <figure>
//                     <Image className={appStyles.Image} src={dog_profile_image} rounded />
//                   </figure>
//                   <div>
//                     <Form.Label
//                       className={`${btnStyles.Button} ${btnStyles.Blue} btn`}
//                       htmlFor="image-upload"
//                     >
//                       Change the image
//                     </Form.Label>
//                   </div>
//                 </>
//               ) : (
//                 <Form.Label
//                   className="d-flex justify-content-center"
//                   htmlFor="image-upload"
//                 >
//                   <Asset
//                     src={Upload}
//                     message="Click or tap to upload an image"
//                   />
//                 </Form.Label>
//               )}

//               <Form.File
//                 id="image-upload"
//                 accept="image/*"
//                 onChange={handleChangeImage}
//                 ref={imageInput}
//               />
//             </Form.Group>
//             {errors?.dog_profile_image?.map((message, idx) => (
//               <Alert variant="warning" key={idx}>
//                 {message}
//               </Alert>
//             ))}

//             <div className="d-md-none">{textFields}</div>
//           </Container>
//         </Col>
//         <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
//           <Container className={appStyles.Content}>{textFields}</Container>
//         </Col>
//       </Row>
//     </Form>
//   );
// }

// export default DogHealthCreateForm;