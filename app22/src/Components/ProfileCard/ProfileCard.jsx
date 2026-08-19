
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import img2 from '../../assets/avatar55.webp'
import { Header } from '@heroui/react';
export default function ProfileCard({ userData }) {

  const dataBirth = userData?.dateOfBirth;
  const newDate = dataBirth && !isNaN(new Date(dataBirth))
    ? new Date(dataBirth).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
    : '';

  const { handleSubmit, register } = useForm({
    defaultValues: {
      photo: '',
    },
  });

  function getiImgProfile(formDataPayload) {
    return axios.put(
      `https://route-posts.routemisr.com/users/upload-photo`,
      formDataPayload,
      {
        headers: {
          token: localStorage.getItem('token'),
        },
      }
    );
  }

  const { data, error, isError, isPending, mutate } = useMutation({
    mutationFn: getiImgProfile,
    onSuccess: () => {
      toast.success('Photo Updated Successfully');
    },
    onError: () => {
      toast.error('Can Not Update Photo');
    },
  });

  function createPhoto(formDataValues) {
    const file = formDataValues?.photo?.[0];

    if (!file) {
      toast.warning('Please select an image first');
      return;
    }

    const formData = new FormData();
    formData.append('photo', file);

    mutate(formData);
  }

  return (
    <>
    <Header>
      <title>Profile</title>
    </Header>
      <form onSubmit={handleSubmit(createPhoto)}>
        <section className="flex justify-center text-sky-500 items-center min-h-screen p-4">
          <div className="max-w-md w-full bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl transform hover:scale-[1.02] transition-transform duration-500 ease-in-out p-8 relative overflow-hidden border border-white/20">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-sky-500 rounded-full mix-blend-multiply filter blur-xl opacity-70" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-sky-500 rounded-full mix-blend-multiply filter blur-xl opacity-70" />
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 via-transparent to-blue-400/10 rounded-3xl" />

            {/* Image Upload Section */}
            <div className="flex justify-center -mt-20 mb-6 relative z-10 mt-5">
              <div className="relative group cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-sky-400 to-sky-500 rounded-full blur-md group-hover:blur-lg transition-all duration-500" />
                <label htmlFor="img" className="cursor-pointer">
                  {userData ? <>
                    <img
                      className="w-40 h-40 object-cover rounded-full border-4 border-white/80 shadow-xl hover:scale-105 transform transition-all duration-400 relative z-10"
                      src={userData?.photo}
                      alt="Profile Image"
                    />
                  </> : <>         <img
                    className="w-40 h-40 object-cover rounded-full border-4 border-white/80 shadow-xl hover:scale-105 transform transition-all duration-400 relative z-10"
                    src={img2}
                    alt="Profile Image"
                  /></>}

                </label>
                <input
                  id="img"
                  {...register('photo')}
                  className="hidden"
                  type="file"
                  accept="image/*"
                />
              </div>
            </div>

            <div className="text-center mb-6 relative z-10">
              <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">
                <span className="relative text-sky-500 inline-block">
                  {userData?.name}
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-sky-400 to-sky-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </span>
              </h2>
              <p className="text-lg font-medium text-sky-500 tracking-wider">
                UI/UX Designer &amp; Developer
              </p>
            </div>

            <p className="text-center text-sky-500 mb-8 px-6 relative z-10 transition-all duration-500">
              "Passionate about crafting beautiful digital experiences that blend aesthetics with functionality."
            </p>

            <p className="text-center text-sky-500 mb-5 px-6 relative z-10 transition-all duration-500">
              {userData?.email}
            </p>

            <p className="text-center text-sky-500 mb-8 px-6 relative z-10 transition-all duration-500">
              {newDate}
            </p>

            <div className="mt-8 text-center relative z-10">
              <button
                type="button"
                className="px-8 py-3 bg-gradient-to-r from-sky-500 to-sky-500 text-white font-medium rounded-full shadow-lg hover:shadow-xl hover:from-sky-600 transition-all duration-300 transform hover:scale-105"
              >
                Contact Me
              </button>

              <button
                type="submit"
                disabled={isPending}
                className="mx-4 px-8 py-3 bg-gradient-to-r from-sky-500 to-sky-500 text-white font-medium rounded-full shadow-lg hover:shadow-xl hover:from-sky-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
              >
                {isPending ? 'Uploading...' : 'Change Photo'}
              </button>
            </div>
          </div>
        </section>
      </form>
    </>
  );
}