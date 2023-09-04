import React, { useState, useEffect } from 'react';

const AuthContext = React.createContext({
  isLoggedIn: false,
  userData: { user: { name: '' }, token: '' },
  onLogout: () => {},
  onLogin: (object) => {}
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({ user: { name: '' } });

  useEffect(() => {
    console.log(isLoggedIn);
  }, [userData]);

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
      setIsLoggedIn(true);
    } else {
      setUserData(null);
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem('userData');
    setIsLoggedIn(false);
    setUserData({ user: { name: '' } });
  };

  const loginHandler = (object) => {
    localStorage.setItem('userData', JSON.stringify(object));
    setIsLoggedIn(true);
    setUserData(object);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
        userData: userData
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
