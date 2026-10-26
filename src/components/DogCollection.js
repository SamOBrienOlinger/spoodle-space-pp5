import React, { useState } from "react";
import { Link } from "react-router-dom";
import { axiosReq } from "../api/axiosDefaults";
import CommunityLayout from "./CommunityLayout";
import DogRecordCard, { dogSections } from "./DogRecordCard";
import RequestState from "./RequestState";
import useResource from "../hooks/useResource";
import styles from "../styles/Hub.module.css";

export default function DogCollection({ kind, filter = "" }) {
  const section = dogSections[kind];
  const [input, setInput] = useState("");
  const [query, setQuery] = useState("");
  const params = new URLSearchParams(filter); params.set("search", query);
  const resource = useResource(`/${section.endpoint}/?${params}`, true);
  const [moreError, setMoreError] = useState(null);
  const [busy, setBusy] = useState(false);
  const more = async () => {
    if (busy) return;
    setBusy(true); setMoreError(null);
    try { const { data } = await axiosReq.get(resource.data.next, { timeout: 20000 }); if (!Array.isArray(data.results)) throw new Error("Invalid response"); resource.setData(prev => ({ ...data, results: [...prev.results, ...data.results] })); }
    catch (error) { setMoreError(error); } finally { setBusy(false); }
  };
  return <CommunityLayout><header className={styles.Card}><h1>{section.title}</h1><Link to="/my-dog">Manage my dog</Link><form className={styles.Search} onSubmit={e => { e.preventDefault(); setQuery(input.trim()); setMoreError(null); }}><input aria-label={`Search ${section.title.toLowerCase()}`} type="search" value={input} onChange={e => setInput(e.target.value)} /><button className={styles.Button}>Search</button></form></header>{resource.loading || resource.error ? <RequestState {...resource} subject="dog records" /> : resource.data && <>{resource.data.results.length ? resource.data.results.map(record => <DogRecordCard kind={kind} key={record.id} record={record} />) : <section className={styles.State}><h2>No matching records</h2><p>Try another search or add your own details in My dog.</p></section>}{moreError && <RequestState error={moreError} retry={more} subject="more dog records" />}{resource.data.next && <button className={styles.Button} disabled={busy} onClick={more}>{busy ? "Loading…" : "Load more"}</button>}</>}</CommunityLayout>;
}
