import React, { useReducer, createContext } from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {}, {});

  return (
    <AppContext.Provider
      value={{
        ...state,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export { AppContext, AppProvider };
