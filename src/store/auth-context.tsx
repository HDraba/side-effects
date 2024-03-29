import React, { PropsWithChildren, useEffect, useState } from 'react';

type AuthContext = {
  isLoggedIn: boolean;
  onLogout: () => void;
  onLogin: (ermail: string, password: string) => void;
};

type AuthContextProviderProps = PropsWithChildren<{}>;

const AuthContext = React.createContext<AuthContext | null>(null);

export const AuthContextProvider = (props: AuthContextProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');

    if (storedUserLoggedInInformation === '1') setIsLoggedIn(true);
  }, []);

  const loginHandler = () => {
    localStorage.setItem('isLoggedIn', '1')
    setIsLoggedIn(true);
  };
  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn')
    setIsLoggedIn(false);
  };
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
