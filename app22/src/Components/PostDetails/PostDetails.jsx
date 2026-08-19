import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { useParams } from 'react-router-dom'
import PostCard from '../../PostCard/PostCard'
import Spinner from '../Spinner/Spinner'

export default function PostDetails() {
let {id} = useParams()
console.log(id);

    function getPostsDetails(){
      return  axios.get(`https://route-posts.routemisr.com/posts/${id}` , {
            headers : {
                Authorization : `Bearer ${localStorage.getItem('token')} `
            }
        })
    }
    
 const {data , isLoading , error , isError} =   useQuery({
        queryKey : ['getSinglePost' , id] ,
        queryFn : getPostsDetails
    })
    console.log(data?.data.data.post);
    if (isLoading) {
        return <Spinner/>
    }
    if (isError) {
        return  <div className='h-screen font-bold text-4xl w-full flex justify-center items-center text-red-500'>
 <h2>{error?.message}</h2>
  </div>
    }
  return <>
  <PostCard isSinglePost={true} posts = {data?.data.data.post}/>
  
  </>
}
