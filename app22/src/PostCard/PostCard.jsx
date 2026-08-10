import React from 'react'
import Home from '../Components/Home/Home';
import CommentCard from '../Components/CommentCard/CommentCard';
export default function PostCard({posts}) {
    
  return <>

 <div className="bg-gray-200 p-4 rounded w-1/2 mx-auto mb-5 mt-3 shadow">
  <header className="flex items-center space-x-3 mb-3">
    <img className='w-10 h-10 rounded-full' src={posts.user.photo} alt={posts.user.name} />
    <div>
      <p className="font-semibold">{posts.user.name}</p>
      <p className="text-xs text-gray-500">{posts.createdAt}</p>
    </div>
  </header>
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
  <CommentCard comment={posts?.topComment}/>
</div>


  
  
  
  
  
  
  
  
  </>
}
