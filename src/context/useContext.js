//context
import { createContext} from "react";
//useAuth
import useAuth from "../hooks/useAuth";
const Context = createContext()

const UserProvider = ({children}) => {
    const {authenticated,register,logout,login} = useAuth()
    return <Context.Provider value={{authenticated,register,logout,login}}>
            {children}
        </Context.Provider>
    
}

export { UserProvider,Context}