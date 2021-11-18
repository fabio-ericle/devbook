import React, { createContext, useState } from "react";

type UserType = {
   name: string;
   email: string;
};

type PropsUserContext = {
   state: UserType;
   setState: React.Dispatch<React.SetStateAction<UserType>>
};

const DEFAULT_VALUES = {
   state: {
      name: '',
      email: '' 
   },
   setState: () => {}
}

const UserContext = createContext<PropsUserContext>(DEFAULT_VALUES);

const UserContextProvider: React.FC = ({children}) => {
   const [state, setState] = useState(DEFAULT_VALUES.state);
   
   return(
      <UserContext.Provider
         value={{
            state, setState
         }}
      >
         { children }
      </UserContext.Provider>
   );
};

export { UserContextProvider };
export default UserContext;