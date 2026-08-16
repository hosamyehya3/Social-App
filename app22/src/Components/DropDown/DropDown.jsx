import React from 'react'
import { Button, Dropdown, Label } from "@heroui/react";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';
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

  return (
    <>
      <Dropdown>
        <Button aria-label="Menu" variant="secondary">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
          </svg>
        </Button>
        <Dropdown.Popover>
          <Dropdown.Menu onAction={(key) => console.log(`Selected: ${key}`)}>
            <Dropdown.Item id="edit-Post" textValue="Edit Post">
              <Label>Edit Post</Label>
            </Dropdown.Item>
            <Dropdown.Item onClick={confirmDelete} id="delete-Post" textValue="Delete Post" variant="danger">
              <Label>Delete Post</Label>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown.Popover>
      </Dropdown>
    </>
  )
}
