import { createContext, useState } from "react";

export let CounterContext = createContext()
export function CounterContextProvider(props){
    
const [count , setcount]= useState(0)
const [username , setusername] = useState("hosam")

    return <CounterContext.Provider value={{username , setusername}}>
{props.children}
    </CounterContext.Provider>
}