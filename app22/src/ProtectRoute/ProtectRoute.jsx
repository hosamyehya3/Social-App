import React from 'react'
import Login from '../Auth/Login/Login'

export default function ProtectRoute(props) {
    if (localStorage.getItem('token') ) {
        return props.children
    }else{
return <Login/>
    }
 
}
