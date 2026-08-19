import React, { useContext, useEffect, useState } from 'react'
import { CounterContext, CounterContextProvider } from '../../Context/CounterContext';
import axios from 'axios';
import PostCard from '../../PostCard/PostCard';
import { id } from 'zod/v4/locales';
import Spinner from '../Spinner/Spinner';
import { useQuery } from '@tanstack/react-query';
import CreatePostCard from '../CreatePostCard/CreatePostCard';
import useApi from '../../useApi';
import { Header } from '@heroui/react';


export default function Home() {
// const [allposts , setallposts] = useState(null)
// const [error , seterror] = useState(null)
// const [iserror, setiserror] = useState(false)
//   const [isLoading, setisLoading] = useState(true)

// if (!localStorage.getItem("token")) {
//   return <>
//   <div className='h-screen bg-red-500 flex text-4xl justify-center w-full items-center font-bold text-white'>
// <h1>NOT ALLOWED</h1>
//   </div>
  
//   </>
// }


// useEffect(()=>{
//   getposts()
// } , [])
// function getposts(){
//   axios.get('https://route-posts.routemisr.com/posts' , { 
//     params : {
//       sort : 'createdAt'
//     } ,
//     headers :{
//       Authorization : `Bearer ${localStorage.getItem('token')}`
//     }
//   })
//   .then((response)=>{console.log(response.data.data.posts);
// setallposts(response.data.data.posts)


    
//   })
//   .catch((error)=>{console.log(error.response.data.message);
//     setiserror(true)
//     seterror('THERE IS ERROR CHICK YOUR CONNECTING')
//   })
//   .finally(()=>{
//     setisLoading(false)
//   })
// }


// if ( isLoading ) {
//   return <Spinner/>
// }
// if (error) {
//   return <div className='h-screen font-bold text-4xl w-full flex justify-center items-center text-red-500'>
//  <h2>{error}</h2>
//   </div>
// }
function getposts(){
  return axios.get('https://route-posts.routemisr.com/posts' ,{
    params : {
      limit : 100 ,
      
      
    } ,
    headers:{
      Authorization : `Bearer ${localStorage.getItem('token')}`

    }
  })
}

const {data , error , isError , isLoading} = useQuery({
  queryKey:['getAllPosts'] ,
  queryFn : getposts ,
  staleTime : 3000 ,
  // refetchOnMount : true ,
  // refetchOnWindowFocus : true ,
  // refetchInterval : 1000 ,
  // refetchOnReconnect : true ,
// gcTime : 5000 ,
// retry : 5 ,


})

// const {data , error , isError , isLoading} =  useApi()
console.log(data);

if ( isLoading ) {  
  return <Spinner/>
}
if (error) {
  
  return <div className='h-screen font-bold text-4xl w-full flex justify-center items-center text-red-500'>
 <h2>{error?.message}</h2>
  </div>
}
  return <>
  <Header>
    <title>Home</title>
  </Header>
  <CreatePostCard/>
{data?.data.data.posts?.map((post)=>{return <PostCard isSinglePost={false} key={post._id} posts={post}/>})}
  
  </>
}
