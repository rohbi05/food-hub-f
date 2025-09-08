// src/context/SignupContext.jsx
import { createContext, useContext, useState } from "react";

const SignupContext = createContext();

export const SignupProvider = ({ children }) => {
  const [role, setRole] = useState(null);

  return (
    <SignupContext.Provider value={{ role, setRole }}>
      {children}
    </SignupContext.Provider>
  );
};

export const useSignup = () => useContext(SignupContext);
