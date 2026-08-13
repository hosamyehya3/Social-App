import React from 'react'
import Home from '../Components/Home/Home';
import CommentCard from '../Components/CommentCard/CommentCard';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { id } from 'zod/v4/locales';
import Spinner from '../Components/Spinner/Spinner';
import CreateCommentCard from '../Components/CreateCommentCard/CreateCommentCard';
export default function PostCard({posts , isSinglePost=false}) {
  
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
 <div className="bg-gray-200 p-4 rounded w-1/2 mx-auto mb-5 mt-3 shadow">
<Link to={`/PostDetails/${posts.id}`}>
  <header className="flex items-center space-x-3 mb-3">
    <img className='w-10 h-10 rounded-full' src={posts.user.photo} alt={posts.user.name} />
    <div>
      <p className="font-semibold">{posts.user.name}</p>
      <p className="text-xs text-gray-500">{posts.createdAt}</p>
    </div>
  </header>
</Link>
  {posts.body && <p className="mb-3">{posts.body}</p>}
 {posts.image &&  <img src={posts.image} alt={posts.pody} className="rounded max-h-96 w-full object-cover mb-3" />}
  <div className="flex justify-between text-gray-600 text-sm font-semibold">
    <button className="flex items-center space-x-1 hover:text-blue-600">
      <i className="fas fa-thumbs-up" /><span className='cursor'>{posts.likesCount <= 0 ? "" : posts.likesCount} Like</span>
    </button>
    <button className="flex items-center space-x-1 hover:text-blue-600">
      <i className="fas fa-comment" /><span className='cursor'>Comment</span>
    </button>
    <button className="flex items-center space-x-1 hover:text-blue-600">
      <i className="fas fa-share" /><span className='cursor'>{posts.sharesCount <= 0 ? "" : posts.sharesCount } Share</span>
    </button>
  </div>
  <CreateCommentCard PostId={posts.id} queryKey={isSinglePost? ['getPostComments'] : ['getAllPosts']}/>
  {/* <CommentCard comment={posts?.topComment}/> */}
  {/* {posts.topcomment && <CommentCard comment={posts?.topComment}/>} */}
  {!isSinglePost ? <CommentCard comment={posts?.topComment}/> : data?.data.data.comments.map((comment)=>{return <CommentCard key={comment._id} comment={comment}/>})}
  {/* {data?.data.data.comments.map((comment)=>{return <CommentCard comment={comment}/>})} */}
</div>


  
  
  
  
  
  
  
  
  </>
}
