import React, { createContext, useState } from "react";
import useAuth from '../hooks/useAuth';

export const facultyContext = createContext({});

export default function FacultyProvider({children}) {
  const [globalFaculty ,setGlobalFaculty] = useState()
  return <facultyContext.Provider value={{globalFaculty,setGlobalFaculty}}>
    {children}
  </facultyContext.Provider>;
} 
