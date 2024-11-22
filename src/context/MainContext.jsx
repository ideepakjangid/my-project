import React, { createContext, useEffect, useState } from "react";
const Context = createContext();

const MainContext = (props) => {
  const [user, setUser] = useState(null);
  const login = (data) => {
    setUser(data);
    localStorage.setItem("user", JSON.stringify(data));
  };

  const logOut = () => {
    setUser(null);
    localStorage.removeItem("user");
  };
  useEffect(() => {
    const lsUser = localStorage.getItem("user");
    if (lsUser) {
      setUser(JSON.parse(lsUser));
    }
  }, []);
  return (
    <Context.Provider value={{ user, setUser, login, logOut }}>
      {props.children}
    </Context.Provider>
  );
};

export default MainContext;
export { Context };
