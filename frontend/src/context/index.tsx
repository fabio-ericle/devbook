import React from "react";

import { UserContextProvider } from './user/index';

const GlobalContext: React.FC = ({ children }) => {
   return <UserContextProvider>{ children }</UserContextProvider>
}

export default GlobalContext;