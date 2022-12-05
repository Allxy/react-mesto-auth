import { createContext, useContext, useEffect, useState } from "react";
import { dataApi } from "../utils/Api";

export const CurrentUser = createContext();

export const useUser = () => useContext(CurrentUser);

const CurrentUserProvider = (props) => {
  const [currentUser, setCurrentUser] = useState({
    name: "",
    about: "",
    avatar: ""
  });

  useEffect(() => {
    dataApi.getUser()
      .then((user) => setCurrentUser(user))
      .catch((err) => console.error(err.message));
  }, []);

  return (
    <CurrentUser.Provider value={[currentUser, setCurrentUser]}>
      {props.children}
    </CurrentUser.Provider>
  );
};

export default CurrentUserProvider;
