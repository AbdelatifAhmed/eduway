import React, { createContext, useState } from "react";

export const facultyContext = createContext({});

export default function FacultyProvider({children}) {
  const [globalFaculty ,setGlobalFaculty] = useState()
  return <facultyContext.Provider value={{globalFaculty,setGlobalFaculty}}>
    {children}
  </facultyContext.Provider>;
} 
