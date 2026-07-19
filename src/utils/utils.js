import jwtDecode from "jwt-decode";
import { axiosReq } from "../api/axiosDefaults";

export const fetchMoreData = async (resource, setResource) => {
  try {
    const { data } = await axiosReq.get(resource.next);
    setResource((prevResource) => ({
      ...prevResource,
      next: data.next,
      results: data.results.reduce((acc, cur) => {
        return acc.some((accResult) => accResult.id === cur.id)
          ? acc
          : [...acc, cur];
      }, prevResource.results),
    }));
  } catch (err) {}
};

export const followHelper = (profile, clickedProfile, following_id) => {
  return profile.id === clickedProfile.id
    ?
      {
        ...profile,
        followers_count: profile.followers_count + 1,
        following_id,
      }
    : profile.is_owner
    ?
      { ...profile, following_count: profile.following_count + 1 }
    : 
    profile;
};

export const unfollowHelper = (profile, clickedProfile) => {
  return profile.id === clickedProfile.id
    ?
      {
        ...profile,
        followers_count: profile.followers_count - 1,
        following_id: null,
      }
    : profile.is_owner
    ?
      { ...profile, following_count: profile.following_count - 1 }
    :
      profile;
};

export const setTokenTimestamp = (data) => {
  try {
    // If the backend returns a refresh_token in the JSON response (token-in-body flow)
    if (data?.refresh_token) {
      const refreshTokenTimestamp = jwtDecode(data.refresh_token).exp;
      localStorage.setItem("refreshTokenTimestamp", refreshTokenTimestamp);
      return;
    }

    // If the backend returns an access_token in the JSON response, use that as a fallback
    if (data?.access_token) {
      const accessTokenTimestamp = jwtDecode(data.access_token).exp;
      localStorage.setItem("refreshTokenTimestamp", accessTokenTimestamp);
      return;
    }

    // If tokens are handled via HttpOnly cookies (JWTCookieAuthentication), we can't read them from JS.
    // Store a simple flag/timestamp so the client-side refresh logic knows the user authenticated.
    localStorage.setItem("refreshTokenTimestamp", Date.now());
  } catch (err) {
    // If decoding fails for any reason, fall back to storing a timestamp flag so other code paths work.
    localStorage.setItem("refreshTokenTimestamp", Date.now());
  }
};

export const shouldRefreshToken = () => {
  return !!localStorage.getItem("refreshTokenTimestamp");
};

export const removeTokenTimestamp = () => {
  localStorage.removeItem("refreshTokenTimestamp");
};
