import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let AuthContext = createContext()
export function AuthContextProvider(props){
  async  function GetUserData(){
let {data} = await axios.get('https://route-posts.routemisr.com/users/profile-data' , {
    headers:{
        Authorization : `Bearer ${localStorage.getItem('token')}`
    }
})
setuserData(data.data.user)




        
    }
const [userToken , setuserToken] = useState(null)
const [userData , setuserData] = useState(null)
useEffect(()=>{
    if (localStorage.getItem('token') ) {
        setuserToken(localStorage.getItem('token'));
        GetUserData()
    }
} , [])




    return <AuthContext.Provider value={{userToken , setuserToken  , userData}}>
       {props.children}     
    </AuthContext.Provider>


}
