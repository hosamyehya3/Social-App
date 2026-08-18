import React, { useRef, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';
import {Button, Input, Modal, TextArea} from "@heroui/react";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
export default function DropDown({ PostId }) {
  const query = useQueryClient()
  const navigate = useNavigate()

  function DeletePost() {
    return axios.delete(`https://route-posts.routemisr.com/posts/${PostId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
  }

  const { mutate: MutateFunction } = useMutation({
    mutationFn: DeletePost,
    onSuccess: () => {
      Swal.fire({
        title: "Deleted!",
        text: "Your Post has been deleted.",
        icon: "success"
      });
      toast.success('Delete Post Success');
      
      query.invalidateQueries({ queryKey: ['getAllPosts'] })
      query.invalidateQueries({ queryKey: ['getprofilePosts'] })
      query.invalidateQueries({ queryKey: ['getSinglePost'] })
      
      navigate('/home')
    },
    onError: () => {
      toast.error('Failed to Delete Post')
    }
  })

  function confirmDelete() {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        MutateFunction();
      }
    });
  }


// update
  const [upLoadedImg, setupLoadedImg] = useState(null)
  let image = useRef(null)
  let body = useRef(null)
  function handleImagePreview(e) {
    let imgSrc = URL.createObjectURL(e.target.files[0])
    setupLoadedImg(imgSrc)
  }
function prepareData(){
  let formData = new FormData()
  if ( body.current.value ) {
    formData.append('body' , body.current.value)
  }
  if (image.current.files[0]) {
    formData.append('image' , image.current.files[0])
  }
  
return formData
}



function UpdataPost(){
  return axios.put(`https://route-posts.routemisr.com/posts/${PostId}` , prepareData() , {
    headers : {
      Authorization : `Bearer ${localStorage.getItem('token')}`
    }
  })
}

const {data:DataOfUpdata , mutate:FuncOfUpdata} = useMutation({
  mutationFn : UpdataPost ,
  onSuccess : ()=>{
    toast.success('Edite Post successifly');
  query.invalidateQueries({ queryKey: ['getAllPosts'] })
      query.invalidateQueries({ queryKey: ['getprofilePosts'] })
      query.invalidateQueries({ queryKey: ['getSinglePost'] })
  },
  onError : ()=>{
    toast.error('Try Again...')
  }
})
  return (
    <>
    <div className='flex justify-center items-center gap-5'>
      <div>
         <Modal>
      <Button className={'edite cursor '} variant="secondary">
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
</svg>

</Button>
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-[360px]">
            <Modal.CloseTrigger />
            <Modal.Header>
        
              <Modal.Heading>Edite Post</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
                             <div className='flex gap-2 items-end'>
                                  <TextArea
                                  ref={body}
                                    aria-label="Quick project update"
                                    className="h-32 w-96"
                                    placeholder="What is on your Mind ...?"
                                  />
                                  <label htmlFor='img'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                    </svg>
                                    <Input ref={image} onChange={handleImagePreview} id='img' type='file' hidden />
                                  </label>
              
                                </div>
                                <div className='relative'>
                                  <img src={upLoadedImg} alt="" />
                                  {upLoadedImg ? <>              <svg onClick={handleCloseImage} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 absolute top-0 right-0">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                  </svg></> : ""}
              
                                </div>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={FuncOfUpdata} className="w-full" slot="close">
               Updata
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
      </div>
 

<div>
<svg onClick={confirmDelete} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 hover:text-red-500 cursor">
  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
</svg>
</div>



    </div>


    </>
  )
}
