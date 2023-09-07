import React, { useReducer, createContext } from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {}, {});

  const formater = Intl.NumberFormat('de-DE');

  return (
    <AppContext.Provider
      value={{
        ...state,
        formater,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export { AppContext, AppProvider };
