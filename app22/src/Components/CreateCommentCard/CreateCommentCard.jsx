import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

export default function CreateCommentCard({PostId , queryKey , Change }) {
const query = useQueryClient()


 const {register , handleSubmit , reset} =  useForm({
        defaultValues : {
            content : "" ,
            image : ""
        }
    })
    
    function createCommentFunc(){
      return axios.post(`https://route-posts.routemisr.com/posts/${PostId}/comments ` , formData , {
        headers : {
          Authorization : `Bearer ${localStorage.getItem('token')}`
        }
      })
    }
    
const {data , error , isError , isPending , mutate } = useMutation({
  mutationFn : createCommentFunc ,
  onSuccess : ()=>{
    query.invalidateQueries({queryKey : queryKey}) ;
    reset()
toast.success('Comment Created Successfully')
  } ,
  onError : ()=>{
    toast.error('Can Not Create Comment')
  }
 })



let formData = new FormData()
    function createComment(data){
console.log(data.image[0] , 'createData' , data);
if (!data.content && !data.image[0] ) {
  return
}
if (data.content) {
  formData.append('content' , data.content)
}
if (data.image[0]) {
  formData.append('image' , data.image[0])
}

mutate()
    }
  return<>
  {Change?<><div  className='p-3 mt-4 '>
      <form onSubmit={handleSubmit(createComment)}>
      
<div className="flex items-center mt-1">
      <label className='mx-3' htmlFor="file"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-12">
  <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
</svg>
</label>
        <input {...register('image')} id='file' className='hidden' type="file"  />
  <input {...register('content')} type="text" id="input-9" className="w-full h-10 px-3 text-sm text-gray-700 border border-r-0 rounded-r-none border-blue-500 focus:outline-none rounded shadow-sm" placeholder="Add Your Comment" />
  <button disabled={isPending} type='submit' className="h-10 px-4 text-sm bg-blue-500 border border-l-0 border-blue-500 rounded-r shadow-sm text-blue-50 hover:text-white hover:bg-blue-400 hover:border-blue-400 focus:outline-none">
    {isPending?<><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 animate-spin">
  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
</svg>
</>:    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
</svg> }

</button>
</div>

  </form>
</div></> : "" }

  </>
}
