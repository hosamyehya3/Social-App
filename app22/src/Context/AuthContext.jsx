import { createContext, useEffect, useState } from "react";

export let AuthContext = createContext()
export function AuthContextProvider(props){
const [userToken , setuserToken] = useState(null)
useEffect(()=>{
    if (localStorage.getItem('token') ) {
        setuserToken(localStorage.getItem('token'))
    }
} , [])



    return <AuthContext.Provider value={{userToken , setuserToken}}>
       {props.children}     
    </AuthContext.Provider>


}
