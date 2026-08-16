import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { data } from 'react-router-dom'

export default function useApi() {
function getposts(){
  return axios.get('https://route-posts.routemisr.com/posts' ,{
    params : {
      limit : 100 
      
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

select : (data)=>{
    return data?.data.data.posts
}
})
}
