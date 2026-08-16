import React from 'react'
import { NavLink } from 'react-router-dom'

export default function CommentCard({comment}) {

   console.log(comment?._id); //////
   
    
    
  return <>
  {comment?<>  <div className=" w-100% bg-black touch text-white my-3 mx-auto border px-6 py-4 rounded-lg">
  <div className="flex items-center  mb-6">
    <img src={comment?.commentCreator.photo} alt={comment?.commentCreator.name} className="w-12 border border-2 h-12 rounded-full mr-4" />
    <div>
      <div className="text-lg font-medium ">{comment?.commentCreator.name}</div>
      <div className="text-sm">{comment?.createdAt}</div>
    </div>
  </div>
  <p className="text-sm leading-relaxed mb-6">
    {comment?.content}</p>
  <div className="flex justify-between items-center hide">
    <div>
      <NavLink className="important mr-4"><i className="far fa-thumbs-up" /> Like</NavLink>
      <NavLink className="important"><i className="far fa-comment-alt" /> Reply</NavLink>
    </div>
    <div className="flex items-center">
      <NavLink  className="important  mr-4"><i className="far fa-flag" /> Report</NavLink>
      <NavLink className="important"><i className="far fa-share-square" /> Share</NavLink>
    </div>
  </div>
</div>
  </>  : ""}


  
  
  
  
  </>
}
