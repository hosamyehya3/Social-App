import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useEffect } from 'react'
import { data } from 'react-router-dom'
import Spinner from '../Spinner/Spinner'
import NotifactionsCard from '../NotifactionsCard/NotifactionsCard'

export default function Notifications() {
  function GetNotifications(){
    return axios.get('https://route-posts.routemisr.com/notifications?unread=false&page=1&limit=30' , {
      headers : {
        Authorization :  `Bearer ${localStorage.getItem('token')}`
      }
    })

  }

  
 const {data , isError , error , isLoading} = useQuery({
    queryKey : 'allNotifications' ,
    queryFn : GetNotifications
  })
 
if (isLoading) {
  return <Spinner/>
}
if (isError) {
  return <div className='h-screen font-bold text-4xl w-full flex justify-center items-center text-red-500'>
 <h2>{error?.message}</h2>
  </div>
}



  console.log(data?.data.data.notifications);
  
  return <>
 {data?.data.data.notifications.map((note)=>{return  <NotifactionsCard data={note}/> })}
  
  
  </>
}
