import React from "react";
import { Link } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useRedirect } from "../../hooks/useRedirect";
import useResource from "../../hooks/useResource";
import CommunityLayout from "../../components/CommunityLayout";
import DogHubContent from "../../components/DogHubContent";
import RequestState from "../../components/RequestState";
import styles from "../../styles/Hub.module.css";

export default function MyDogPage() {
  const user = useCurrentUser();
  useRedirect("loggedOut");
  const profile = useResource(user ? `/profiles/${user.profile_id}/` : null);
  return <CommunityLayout><header className={styles.Card}><h1>My dog</h1><p>A familiar place for your dog’s profile, health and behaviour details.</p>{profile.data && <p>{["dog_profile", "dog_health", "dog_danger"].filter(key => profile.data[key]).length} of 3 records started. Add or update a section below.</p>}</header>{!user ? <p><Link to="/signin">Sign in to see your dog</Link></p> : profile.loading || profile.error ? <RequestState {...profile} subject="your dog records" /> : profile.data && <DogHubContent profile={profile.data} own onChanged={profile.retry} />}</CommunityLayout>;
}
