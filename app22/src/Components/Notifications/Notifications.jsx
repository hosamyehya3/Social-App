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
 console.log(data);
 
if (isLoading) {
  return <Spinner/>
}
if (isError) {
  return <div className='h-screen font-bold text-4xl w-full flex justify-center items-center text-red-500'>
 <h2>{error?.message}</h2>
  </div>
}



  
  
  return <>
{data == null? <>
<div className='flex justify-center italic h-screen text-sky-500 text-4xl font-bold items-center'>
  <h2>No Notifications</h2>
  </div>
</> : ""}
 {data?.data.data.notifications.map((note)=>{return  <NotifactionsCard data={note}/> }) }
 
  
  
  </>
}
