import { createContext, useContext, useEffect, useState } from "react";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import { followHelper, unfollowHelper } from "../utils/utils";

const DogProfileDataContext = createContext();
const SetDogProfileDataContext = createContext();

export const useDogProfileData = () => useContext(DogProfileDataContext);
export const useSetDogProfileData = () => useContext(SetDogProfileDataContext);

export const DogProfileDataProvider = ({ children }) => {
  const [profileData, setProfileData] = useState({
    // we will use the pageProfile later!
    pageProfile: { results: [] },
    popularProfiles: { results: [] },
  });

  const currentUser = useCurrentUser();

  const handleFollow = async (clickedProfile) => {
    try {
      const { data } = await axiosRes.post("/followers/", {
        followed: clickedProfile.id,
      });

      setProfileData((prevState) => ({
        ...prevState,
        pageProfile: {
          results: prevState.pageProfile.results.map((profile) =>
            followHelper(profile, clickedProfile, data.id)
          ),
        },
        popularProfiles: {
          ...prevState.popularProfiles,
          results: prevState.popularProfiles.results.map((profile) =>
            followHelper(profile, clickedProfile, data.id)
          ),
        },
      }));
    } catch (err) {
      // console.log(err);
    }
  };

  const handleUnfollow = async (clickedProfile) => {
    try {
      await axiosRes.delete(`/followers/${clickedProfile.following_id}/`);

      setProfileData((prevState) => ({
        ...prevState,
        pageProfile: {
          results: prevState.pageProfile.results.map((profile) =>
            unfollowHelper(profile, clickedProfile)
          ),
        },
        popularProfiles: {
          ...prevState.popularProfiles,
          results: prevState.popularProfiles.results.map((profile) =>
            unfollowHelper(profile, clickedProfile)
          ),
        },
      }));
    } catch (err) {
      // console.log(err);
    }
  };

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(
          "/profiles/?ordering=-followers_count"
        );
        setProfileData((prevState) => ({
          ...prevState,
          popularProfiles: data,
        }));
      } catch (err) {
        // console.log(err);
      }
    };

    handleMount();
  }, [currentUser]);

  return (
    <DogProfileDataContext.Provider value={profileData}>
      <SetDogProfileDataContext.Provider
        value={{ setProfileData, handleFollow, handleUnfollow }}
      >
        {children}
      </SetDogProfileDataContext.Provider>
    </DogProfileDataContext.Provider>

    // <h1>test</h1>
  );
};



// import { createContext, useContext, useEffect, useState } from "react";
// import { axiosReq, axiosRes } from "../api/axiosDefaults";
// import { useCurrentUser } from "../contexts/CurrentUserContext";
// import { followHelper, unfollowHelper } from "../utils/utils";
// import {editHelper, deleteHelper } from "../utils/utils";

// const DogDogProfileDataContext = createContext();
// const SetDogDogProfileDataContext = createContext();

// export const useDogProfileData = () => useContext(DogProfileDataContext);
// export const useSetDogProfileData = () => useContext(SetDogProfileDataContext);

// export const DogProfileDataProvider = ({ children }) => {
//   const [dogProfileData, setDogProfileData] = useState({
    // we will use the pageProfile later!
//     dogPageProfile: { results: [] },
//     popularProfiles: { results: [] },
//   });

//   const currentUser = useCurrentUser();

//   const handleEdit = async (clickedProfile) => {
//     try {
//       const { data } = await axiosRes.dogprofile("/dogprofiles/", {
//         followed: clickedProfile.id,
//       });

    // const handleFollow = async (clickedProfile) => {
    //     try {
    //     const { data } = await axiosRes.post("/followers/", {
    //         followed: clickedProfile.id,
    //     });

    //   setDogProfileData((prevState) => ({
    //     ...prevState,
    //     dogPageProfile: {
    //       results: prevState.dogPageProfile.results.map((dogprofile) =>
    //         EditHelper(dogprofile, clickedDogProfile, data.id)
    //     }),
    // } catch (err) {
    //   console.log(err);
//     }
//   };

//   const handleUnfollow = async (clickedProfile) => {
//     try {
//       await axiosRes.delete(`/followers/${clickedProfile.following_id}/`);

//       setDogProfileData((prevState) => ({
//         ...prevState,
//         dogPageProfile: {
//             results: prevState.dogPageProfile.results.map((dogprofile) =>
//             unfollowHelper(profile, clickedProfile)
//             ),
//         },
//         // popularProfiles: {
//         //   ...prevState.popularProfiles,
//         //   results: prevState.popularProfiles.results.map((profile) =>
//         //     unfollowHelper(profile, clickedProfile)
//         //   ),
//         // },
//     //   }));
//     }));
//   } catch (err) {
//     // console.log(err);
//   }

//   useEffect(() => {
//     const handleMount = async () => {
//       try {
//         const { data } = await axiosReq.get(
//           "/dogprofiles/?ordering=-created_at"
//         );
//         setDogProfileData((prevState) => ({
//           ...prevState,
//           popularProfiles: data,
//         }));
//       } catch (err) {
        // console.log(err);
//       }
//     };

//     handleMount();
//   }, [currentUser]);

//   return (
//     <DogProfileDataContext.Provider value={dogProfileData}>
//     <SetDogProfileDataContext.Provider
//       value={{ setDogProfileData }}
//     >
//       {children}
//     </SetDogProfileDataContext.Provider>
//   </DogProfileDataContext.Provider>

//   );
// };
