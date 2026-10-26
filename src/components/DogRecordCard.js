import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import DeleteDialog from "./DeleteDialog";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import styles from "../styles/Hub.module.css";

export const dogSections = {
  profile: { endpoint: "dogprofiles", reference: "dog_profile", title: "Dog profile", fields: [["dog_name", "Name"], ["dog_age", "Age"], ["dog_color", "Colour"], ["dog_bio", "About your dog"]] },
  health: { endpoint: "doghealth", reference: "dog_health", title: "Health", fields: [["vet_name", "Vet"], ["vet_phone", "Vet phone"], ["vet_email", "Vet email"], ["kennel_cough", "Kennel cough"], ["rabies", "Rabies"], ["allergies", "Allergies"]] },
  behaviour: { endpoint: "dogdanger", reference: "dog_danger", title: "Behaviour", fields: [["bites_babies", "Around babies"], ["bites_kids", "Around children"], ["bites_teenagers", "Around teenagers"], ["bites_burglars", "Around intruders"], ["dangerously_cute", "Personality"]] },
};

export default function DogRecordCard({ kind, record, detail = false, onDeleted }) {
  const section = dogSections[kind];
  const user = useCurrentUser();
  const history = useHistory();
  const [confirm, setConfirm] = useState(false);
  const own = Boolean(user && user.username === record.owner);
  return <article className={styles.Card}>
    <div className={styles.Summary}>
      {kind === "profile" && record.dog_profile_image && <img src={record.dog_profile_image} alt={record.dog_name || "Dog profile"} />}
      <div><h2>{kind === "profile" ? record.dog_name || section.title : section.title}</h2><p>{record.profile_id && <Link to={`/profiles/${record.profile_id}`}>{record.owner}</Link>}{record.updated_at && <> · Updated {record.updated_at}</>}</p></div>
    </div>
    <dl className={styles.DetailList}>{section.fields.map(([field, label]) => record[field] ? <React.Fragment key={field}><dt>{label}</dt><dd>{record[field]}</dd></React.Fragment> : null)}</dl>
    {!section.fields.some(([field]) => record[field]) && <p>No details added yet.</p>}
    <div className={styles.Actions}>
      {!detail && <Link to={`/${section.endpoint}/${record.id}`}>View details</Link>}
      {own && detail && <><Link className={styles.Button} to={`/${section.endpoint}/${record.id}/edit`}>Edit {section.title.toLowerCase()}</Link><button className={styles.Button} onClick={() => setConfirm(true)}>Delete {section.title.toLowerCase()}</button></>}
    </div>
    <DeleteDialog show={confirm} onClose={() => setConfirm(false)} url={`/${section.endpoint}/${record.id}/`} label={section.title.toLowerCase()} onDeleted={() => onDeleted ? onDeleted() : history.push(`/my-dog?dogTab=${kind}`)} />
  </article>;
}
