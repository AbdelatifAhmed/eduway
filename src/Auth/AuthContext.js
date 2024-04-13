import React, { createContext, useState } from "react";

export const AuthContext = createContext({});

export default function AuthProvider({children}) {
  const [Auth ,setAuth] = useState()
  return <AuthContext.Provider value={{Auth,setAuth}}>
    {children}
  </AuthContext.Provider>;
} 
