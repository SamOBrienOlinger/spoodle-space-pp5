import React from "react";
import { Link, useLocation } from "react-router-dom";
import { previewDogData } from "../config/deployment";
import useResource from "../hooks/useResource";
import RequestState from "./RequestState";
import DogRecordCard, { dogSections } from "./DogRecordCard";
import styles from "../styles/Hub.module.css";

function RecordSection({ kind, profile, own, onChanged }) {
  const section = dogSections[kind];
  const id = profile[section.reference];
  const record = useResource(id ? `/${section.endpoint}/${id}/` : null);
  if (!id) return <section className={styles.Card}><h2>{section.title}</h2><p>{own ? "No record yet. Add the details you want to keep together." : "No details have been added yet."}</p>{own && <Link className={styles.Button} to={`/${section.endpoint}/create`}>Add {section.title.toLowerCase()}</Link>}</section>;
  if (record.loading || record.error) return <RequestState {...record} subject={section.title.toLowerCase()} />;
  return record.data && <DogRecordCard kind={kind} record={record.data} detail onDeleted={onChanged} />;
}

export default function DogHubContent({ profile, own, onChanged, sampleRecords }) {
  const location = useLocation();
  const requested = new URLSearchParams(location.search).get("dogTab");
  const kind = Object.prototype.hasOwnProperty.call(dogSections, requested) ? requested : "profile";
  const linkFor = key => { const params = new URLSearchParams(location.search); params.set("dogTab", key); return { pathname: location.pathname, search: params.toString() }; };
  const tabs = sampleRecords ? previewDogData.records :
    Object.entries(dogSections).map(([key, section]) => [key, key === "profile" ? "Profile" : section.title]);
  return <>
    <nav className={styles.Tabs} aria-label="Dog records">
      {tabs.map(([key, label]) => <Link key={key} to={linkFor(key)} aria-current={kind === key ? "page" : undefined}>{label}</Link>)}
    </nav>
    {sampleRecords ? <DogRecordCard kind={kind} record={sampleRecords[kind]} detail /> :
      <RecordSection key={`${profile.id}-${kind}-${profile[dogSections[kind].reference]}`} kind={kind} profile={profile} own={own} onChanged={onChanged} />}
  </>;
}
