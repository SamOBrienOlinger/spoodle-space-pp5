import { createContext, useContext, useEffect, useState } from "react";
import { useHistory} from "react-router-dom"
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import { useCurrentUser } from "../contexts/CurrentUserContext";

const DogProfileDataContext = createContext();
const SetDogProfileDataContext = createContext();

export const useDogProfileData = () => useContext(DogProfileDataContext);
export const useSetDogProfileData = () => useContext(SetDogProfileDataContext);

export const DogProfileDataProvider = ({ children }) => {
  const [dogProfileData, setDogProfileData] = useState({
    // we will use the pageProfile later!
    dogPageProfile: { results: [] }
  });

//   const currentUser = useCurrentUser();
  const history = useHistory();

  const handleEdit = () => {
    history.push(`/dogprofiles/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/dogprofiles/${id}/`);
      history.goBack();
    } catch (err) {
      // console.log(err);
    }
  };

//   useEffect(() => {
//     const handleMount = async () => {
//       try {
//         const { data } = await axiosReq.get(
//           "/dogprofiles/?ordering=-created_at"
//         );
//         setDogProfileData(prevState) => ({
//           ...prevState,
//         }));
//       } catch (err) {
//         // console.log(err);
//       }

//     handleMount();
//   }, [currentUser];

  return (
    <DogProfileDataContext.Provider value={dogProfileData}>
      <SetDogProfileDataContext.Provider
        value={{ setDogProfileData, handleEdit, handleDelete }}
      >
        {children}
      </SetDogProfileDataContext.Provider>
    </DogProfileDataContext.Provider>
  );
};