import React, { useContext, useState } from 'react'
import Home from '../Components/Home/Home';
import CommentCard from '../Components/CommentCard/CommentCard';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Dropdown, Button, Label, Description, Header, Kbd, Separator } from '@heroui/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { id } from 'zod/v4/locales';
import Spinner from '../Components/Spinner/Spinner';
import CreateCommentCard from '../Components/CreateCommentCard/CreateCommentCard';
import { FaThumbsUp , FaComment , FaShare } from "react-icons/fa";
import { toast } from 'react-toastify';
import { AuthContext } from '../Context/AuthContext';
import DropDown from '../Components/DropDown/DropDown';
export default function PostCard({posts , isSinglePost=false}) {
const [Change , setChange] = useState(false)
function click(){
  if (Change == false) {
    setChange(true)
  }else{
setChange(false)
  }

}
  const query = useQueryClient()
 const {userData} = useContext(AuthContext)
    function getAllCommentsPost(){
     return axios.get(`https://route-posts.routemisr.com/posts/${posts.id}/comments` , {
      headers : {
        Authorization : `Bearer ${localStorage.getItem('token')}` 
      } 
     })
    }
    
  const {data , isLoading , isError , error} = useQuery({
      queryKey : ['getPostComments'] ,
      queryFn : getAllCommentsPost ,
      enabled : isSinglePost
    })

function makeLikeInPost(){
  return axios.put(`https://route-posts.routemisr.com/posts/${posts.id}/like` , {}  , {
    headers: {
      Authorization : `Bearer ${localStorage.getItem('token')}`
    }
  })

}
const {data:dataOfLike , isPending:Pending , isError:HasError , error:errorOfLike , mutate:FuncLike} = useMutation({
  mutationFn : makeLikeInPost ,
  onSuccess : ()=>{
    query.invalidateQueries({
      queryKey : ['getAllPosts'] ,
      
    })  
    query.invalidateQueries({
      queryKey : ['getprofilePosts'] ,
      
    })  
    query.invalidateQueries({
      queryKey : ['getSinglePost'] ,
      
    })  
  } ,
  onError : ()=>{
    toast.error('Try Again')
  }
})
console.log(posts);

function postSharePost(){
  return axios.post(`https://route-posts.routemisr.com/posts/${posts.id}/share` , {
  "body": JSON.stringify(posts.image) ,
} , {
    headers : {
      Authorization : `Bearer ${localStorage.getItem('token')}`
    }
  }
 
)
}
const {data:ShareData , mutate:ShareFunc} =  useMutation({
  mutationFn : postSharePost ,
  onSuccess : ()=>{
    toast.success('post shared successfully')
    query.invalidateQueries({ queryKey: ['getAllPosts'] })
    query.invalidateQueries({ queryKey: ['getSinglePost'] })
    
  },
  onError : ()=>{
    toast.error('Share Post Failed ')
  }

})

console.log(ShareData?.data.data.post.sharedPost);

    if (isLoading) {
      return <Spinner/>
    }
    if (isError) {
     return <div className='h-screen font-bold text-4xl w-full flex justify-center items-center text-red-500'>
 <h2>{error?.message}</h2>
  </div>
    }
  return <>
{/* <CreateCommentCard PostId={posts.id}/> */}

 <div className="bg-gray-200 p-4 rounded  border-t-4 border-sky-500 w-1/2 mx-auto mb-8 mt-5 shadow">
  <header className="flex justify-between items-center space-x-3 mb-3">
    <Link to={`/PostDetails/${posts.id}`}>    <div className='flex items-center '>
      
    <img className='w-10 h-10 rounded-full' src={posts.user.photo} alt={posts.user.name} />
    <div>
      <p className="font-semibold">{posts.user.name}</p>
      <p className="text-xs text-gray-500">{posts.createdAt}</p>
    </div>
    </div></Link>
    <div>
       {userData?.id === posts?.user._id ? <><DropDown PostId={posts.id}/> </> : ""}
    </div>
  </header>

  {posts.body && <p className="mb-3">{posts.body}</p>}
 {posts.image &&  <img src={posts.image} alt="" className="rounded max-h-96 w-full object-cover mb-3" />}
  <div className="flex justify-between text-gray-600 text-sm font-semibold">
      {/* like like */}
    <button  onClick={FuncLike}  className="flex cursor items-center space-x-1 hover:text-blue-600">
      <FaThumbsUp size={20}/>
      <span >{posts.likesCount <= 0 ? "" : posts.likesCount+" Like"  }  </span>
    </button>
      {/* like comment */}
    <button  onClick={click}  className="flex cursor  items-center  space-x-1 hover:text-blue-600">
      
      <FaComment size={20}/>
      <span>Comment</span>
    </button>
    {/* like share */}
    <button onClick={ShareFunc} className="flex cursor items-center space-x-1 hover:text-blue-600">
      <FaShare size={20}/>
      <span className='cursor'>{posts.sharesCount <= 0 ? "" : posts.sharesCount+" Share" } </span>
    </button>
  </div>
  <CreateCommentCard Change={Change} PostId={posts.id} queryKey={isSinglePost? ['getPostComments'] : ['getAllPosts']}/>
  {/* <CommentCard comment={posts?.topComment}/> */}
  {/* {posts.topcomment && <CommentCard comment={posts?.topComment}/>} */}
  {!isSinglePost ? <CommentCard comment={posts?.topComment}/> : data?.data.data.comments.map((comment)=>{return <CommentCard key={comment._id} comment={comment}/>})}
  {/* {data?.data.data.comments.map((comment)=>{return <CommentCard comment={comment}/>})} */}
</div>

  </>
}
