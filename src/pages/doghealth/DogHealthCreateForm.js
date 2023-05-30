import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import styles from "../../styles/DogProfileCreateEditForm.module.css";
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
