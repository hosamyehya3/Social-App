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
import { FaThumbsUp, FaComment, FaShare } from "react-icons/fa";
import { toast } from 'react-toastify';
import { AuthContext } from '../Context/AuthContext';
import DropDown from '../Components/DropDown/DropDown';
export default function PostCard({ posts, isSinglePost = false }) {
  const [Change, setChange] = useState(false)

  function click() {
    if (Change == false) {
      setChange(true)
    } else {
      setChange(false)
    }

  }
  const query = useQueryClient()
  const { userData } = useContext(AuthContext)
  function getAllCommentsPost() {
    return axios.get(`https://route-posts.routemisr.com/posts/${posts.id}/comments`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
  }

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['getPostComments'],
    queryFn: getAllCommentsPost,
    enabled: isSinglePost
  })

  function makeLikeInPost() {
    return axios.put(`https://route-posts.routemisr.com/posts/${posts.id}/like`, {}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })

  }
  const { data: dataOfLike, isPending: Pending, isError: HasError, error: errorOfLike, mutate: FuncLike } = useMutation({
    mutationFn: makeLikeInPost,
    onSuccess: () => {
      query.invalidateQueries({
        queryKey: ['getAllPosts'],

      })
      query.invalidateQueries({
        queryKey: ['getprofilePosts'],

      })
      query.invalidateQueries({
        queryKey: ['getSinglePost'],

      })
    },
    onError: () => {
      toast.error('Try Again')
    }
  })

  function postShareFunc() {
    return axios.post(`https://route-posts.routemisr.com/posts/${posts.id}/share`,
      { body: posts.body || posts.image },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }

    )
  }
  const { data: ShareData, mutate: ShareFunc } = useMutation({
    mutationFn: postShareFunc,
    onSuccess: () => {
      toast.success('post shared successfully')
      query.invalidateQueries({ queryKey: ['getAllPosts'] })
      query.invalidateQueries({ queryKey: ['getSinglePost'] })

    },
    onError: () => {
      toast.error('Share Post Failed ')
    }

  })
  const ShareImg = posts.image


  if (isLoading) {
    return <Spinner />
  }
  if (isError) {
    return <div className='h-screen font-bold text-4xl w-full flex justify-center items-center text-red-500'>
      <h2>{error?.message}</h2>
    </div>
  }

  function getTimeAgo(createdAt) {
    if (!createdAt) return 'A few seconds ago';
    const postDate = new Date(createdAt);
    if (isNaN(postDate)) return 'A few seconds ago';

    const seconds = Math.floor((new Date() - postDate) / 1000);

    if (seconds < 60) return 'A few seconds ago';

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;

    const days = Math.floor(hours / 24);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  }


  return <>
    {/* <CreateCommentCard PostId={posts.id}/> */}

    <div className="bg-gray-200 p-4 rounded  border-t-4 border-sky-500 sm:w-3/4 md:w-1/2 lg:w-1/2 mx-auto mb-8 mt-5 shadow">
      <header className="flex justify-between items-center space-x-3 mb-3">
        <Link to={`/PostDetails/${posts.id}`}>    <div className='flex items-center '>
          <img className='w-10 h-10 rounded-full' src={posts.user?.photo} alt="" />
          <div>
            <p className="font-semibold">{posts.user.name}</p>
            <p className="text-xs text-gray-500">
              {getTimeAgo(posts?.createdAt)}
            </p>

          </div>
        </div></Link>




        <div>
          {userData?.id === posts?.user._id ? <><DropDown PostId={posts.id} /> </> : ""}
        </div>
      </header>
      <Link to={`/GetUserProfile/${posts.user._id}`}>
        {posts.body && <p className="mb-3">{posts.body}</p>}

        {posts.image && <img src={posts.image} alt="" className="rounded max-h-96 w-full object-cover mb-3" />}
      </Link>



      <div className="flex justify-between text-gray-600 text-sm font-semibold">
        {/* like like */}
        <button onClick={FuncLike} className="flex cursor items-center space-x-1 hover:text-blue-600">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
</svg>

          <span >{posts.likesCount <= 0 ? "" : posts.likesCount + " Like"} </span>
        </button>
        {/* like comment */}

        <button onClick={click} className="flex cursor  items-center  space-x-1 hover:text-blue-600">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
          </svg>
          {posts.commentsCount <= 0 ? "" : posts.commentsCount + " Comment"}
        </button>
        {/* like share */}
        <button onClick={ShareFunc} className="flex cursor items-center space-x-1 hover:text-blue-600">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
  <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
</svg>

          <span className='cursor'>{posts.sharesCount <= 0 ? "" : posts.sharesCount + " Share"} </span>
        </button>
      </div>
      <CreateCommentCard Change={Change} PostId={posts.id} queryKey={isSinglePost ? ['getPostComments'] : ['getAllPosts']} />
      {/* <CommentCard comment={posts?.topComment}/> */}
      {/* {posts.topcomment && <CommentCard comment={posts?.topComment}/>} */}
      {!isSinglePost ? <CommentCard comment={posts?.topComment} /> : data?.data.data.comments.map((comment) => { return <CommentCard key={comment._id} comment={comment} /> })}
      {/* {data?.data.data.comments.map((comment)=>{return <CommentCard comment={comment}/>})} */}
    </div>






  </>
}


