import { useQueries, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useContext } from 'react'
import ProfileCard from '../ProfileCard/ProfileCard'
import { AuthContext } from '../../Context/AuthContext'
import PostCard from '../../PostCard/PostCard'
export default function Profile(props) {
let {userData} = useContext(AuthContext)
 function getProfilePosts(){
 return axios.get(`https://route-posts.routemisr.com/users/${userData._id}/posts` , {
    headers : {
      Authorization : `Bearer ${localStorage.getItem('token')}`
    }
  })
}
const {data , isLoading , isError , error} = useQuery({
  queryKey : ['getprofilePosts'],
  queryFn : getProfilePosts
})
console.log(data?.data.data.posts);

  return <>

  <ProfileCard userData={userData} />
  {data?.data.data.posts.map((post)=>{return <PostCard key={post._id} posts={post}/>})}
  
  
  
  
  
  </>
}
