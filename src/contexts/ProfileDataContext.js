import { createContext, useContext, useEffect, useState } from "react";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import { isPagesPreview } from "../config/deployment";
import { followHelper, unfollowHelper } from "../utils/utils";

const ProfileDataContext = createContext();
const SetProfileDataContext = createContext();
export const useProfileData = () => useContext(ProfileDataContext);
export const useSetProfileData = () => useContext(SetProfileDataContext);
export const ProfileDataProvider = ({ children }) => {
  const [profileData, setProfileData] = useState({ pageProfile: { results: [] }, popularProfiles: { results: [] } });
  const currentUser = useCurrentUser();
  const [profilesLoading, setProfilesLoading] = useState(!isPagesPreview);
  const [profilesError, setProfilesError] = useState(false);
  const handleFollow = async (clickedProfile) => {
    try {
      const { data } = await axiosRes.post("/followers/", { followed: clickedProfile.id });
      setProfileData(prev => ({ ...prev, pageProfile: { results: prev.pageProfile.results.map(profile => followHelper(profile, clickedProfile, data.id)) }, popularProfiles: { ...prev.popularProfiles, results: prev.popularProfiles.results.map(profile => followHelper(profile, clickedProfile, data.id)) } }));
      return true;
    } catch (err) { return false; }
  };
  const handleUnfollow = async (clickedProfile) => {
    try {
      await axiosRes.delete(`/followers/${clickedProfile.following_id}/`);
      setProfileData(prev => ({ ...prev, pageProfile: { results: prev.pageProfile.results.map(profile => unfollowHelper(profile, clickedProfile)) }, popularProfiles: { ...prev.popularProfiles, results: prev.popularProfiles.results.map(profile => unfollowHelper(profile, clickedProfile)) } }));
      return true;
    } catch (err) { return false; }
  };
  useEffect(() => {
    if (isPagesPreview) { setProfilesLoading(false); return; }
    let active = true;
    setProfilesLoading(true); setProfilesError(false);
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get("/profiles/?ordering=-followers_count", { timeout: 20000 });
        if (!data || !Array.isArray(data.results)) throw new Error("Invalid profile response");
        if (active) setProfileData(prev => ({ ...prev, popularProfiles: data }));
      } catch (err) { if (active) setProfilesError(true); }
      finally { if (active) setProfilesLoading(false); }
    };
    handleMount();
    return () => { active = false; };
  }, [currentUser]);
  return <ProfileDataContext.Provider value={{ ...profileData, profilesLoading, profilesError }}><SetProfileDataContext.Provider value={{ setProfileData, handleFollow, handleUnfollow }}>{children}</SetProfileDataContext.Provider></ProfileDataContext.Provider>;
};
