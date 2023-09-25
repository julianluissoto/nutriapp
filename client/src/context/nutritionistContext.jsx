// UserContext.js

import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const logout = async () => {
    await axios.get("/logout");

    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node,
};

export const useUser = () => useContext(UserContext);
