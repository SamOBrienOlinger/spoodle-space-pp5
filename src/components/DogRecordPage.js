import React from "react";
import { Link, useParams } from "react-router-dom";
import CommunityLayout from "./CommunityLayout";
import DogRecordCard, { dogSections } from "./DogRecordCard";
import RequestState from "./RequestState";
import useResource from "../hooks/useResource";

export default function DogRecordPage({ kind }) {
  const { id } = useParams();
  const section = dogSections[kind];
  const resource = useResource(`/${section.endpoint}/${id}/`);
  return <CommunityLayout><p><Link to={`/my-dog?dogTab=${kind}`}>My dog</Link></p>{resource.loading || resource.error ? <RequestState {...resource} subject={section.title.toLowerCase()} /> : resource.data && <DogRecordCard kind={kind} record={resource.data} detail />}</CommunityLayout>;
}
