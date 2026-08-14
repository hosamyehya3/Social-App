// import { useMutation } from '@tanstack/react-query';
// import axios from 'axios';
// import React from 'react'
// import { useForm } from 'react-hook-form';
// import { Link  } from 'react-router-dom';
// import { toast } from 'react-toastify';

// export default function ProfileCard({userData}) {
//     console.log(userData);
//     // bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900
//     let dataBirth = userData?.dateOfBirth
//     let newDate = new Date(dataBirth).toLocaleDateString()
//     console.log(newDate);
// const {handleSubmit , register , } = useForm({
//     defaultValues : {
//         photo:""
//     }
// })
// function getiImgProfile(){
//     return axios.put(`https://route-posts.routemisr.com/users/upload-photo` , formData , {
//         headers :{
//             Authorization : `Bearer ${localStorage.getItem('token')}`
//         }
//     } )
// } 
// const {data , error , isError , isPending , mutate} = useMutation({
//     mutationFn : getiImgProfile ,
//     onSuccess : ()=>{
//         toast.success('Photo Created Successfully')
//     } , 
//     onError : ()=>{
//         toast.error('Can Not Updata Photo')
//     }

// })
// let formData = new FormData();
// function createPhoto(data){
// formData.append('photo' , data?.photo[0] )
// if (data.photo[0]) {
//   formData.append('photo' , data.photo[0])
// }
// mutate(formData)
// }



    
//   return <>
//   <form onSubmit={handleSubmit(createPhoto)}>
//  <section className="flex justify-center text-sky-500 items-center min-h-screen   p-4">
//   <div className="max-w-md w-full bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl transform hover:scale-[1.02] transition-transform duration-500 ease-in-out p-8 relative overflow-hidden border border-white/20">
//     <div className="absolute -top-20 -right-20 w-40 h-40 bg-sky-500 rounded-full mix-blend-multiply filter blur-xl opacity-70" />
//     <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-sky-500 rounded-full mix-blend-multiply filter blur-xl opacity-70" />
//     <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 via-transparent to-blue-400/10 rounded-3xl" />
//     <div className="flex justify-center -mt-20 mb-6 relative z-10 mt-5">
//       <div className="relative group">
//         <div className="absolute inset-0  bg-gradient-to-br from-sky-400 to-sky-500 rounded-full blur-md group-hover:blur-lg transition-all duration-500" />
//         <label htmlFor="img">
//         <img className="w-40 h-40 object-cover rounded-full border-4 border-white/80 shadow-xl hover:scale-105 transform transition-all duration-400 relative z-10" src={userData?.photo} alt="Profile Image" />

//         </label>
//         <input id='img' {...register("photo")} className='hidden' type="file" />
//       </div>
//     </div>
//     <div className="text-center  mb-6 relative z-10">
//       <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">
//         <span className="relative text-sky-500 inline-block">
//           {userData?.name}
//           <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-sky-400 to-sky-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
//         </span>
//       </h2>
//       <p className="text-lg font-medium  text-sky-500 tracking-wider">UI/UX Designer &amp; Developer</p>
//     </div>
//     <p className="text-center text-sky-500 mb-8 px-6 relative z-10 transition-all duration-500 ">
//       "Passionate about crafting beautiful digital experiences that blend aesthetics with functionality. Let's create something extraordinary together."
//     </p>
//     <p className="text-center text-sky-500  mb-5 px-6 relative z-10 transition-all duration-500 ">
//     {userData?.email}
//     </p>
//     <p className="text-center text-sky-500  mb-8 px-6 relative z-10 transition-all duration-500 ">
//     {userData?newDate : ""}
//     </p>
//     <div className="flex justify-center space-x-6 relative z-10">
//       {/* Twitter */}
//       <a href="#" className="p-3 rounded-full bg-white/5 backdrop-blur-sm shadow-lg hover:bg-blue-500/30 transition-all duration-300 group">
//         <svg className="w-6 h-6 text-black group-hover:text-black group-hover:scale-110 transition-all duration-300" fill="currentColor" viewBox="0 0 24 24">
//           <path d="M8.29 20.251c7.547 0 11.675-6.155 11.675-11.495 0-.175 0-.35-.012-.524A8.18 8.18 0 0022 5.92a8.273 8.273 0 01-2.357.626 4.077 4.077 0 001.804-2.245 8.198 8.198 0 01-2.605.975 4.106 4.106 0 00-6.993 3.744 11.652 11.652 0 01-8.457-4.287 4.106 4.106 0 001.272 5.482A4.073 4.073 0 012 9.713v.052a4.106 4.106 0 003.292 4.022 4.095 4.095 0 01-1.859.07 4.107 4.107 0 003.834 2.847A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.837" />
//         </svg>
//       </a>
//       {/* LinkedIn */}
//       <a href="#" className="p-3 rounded-full bg-white/5 backdrop-blur-sm shadow-lg hover:bg-blue-600/30 transition-all duration-300 group">
//         <svg className="w-6 h-6 text-black group-hover:text-black group-hover:scale-110 transition-all duration-300" fill="currentColor" viewBox="0 0 24 24">
//           <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.338-.026-3.063-1.866-3.063-1.866 0-2.151 1.456-2.151 2.963v5.704h-3v-10h2.886v1.367h.041c.402-.76 1.386-1.562 2.852-1.562 3.052 0 3.613 2.007 3.613 4.615v5.58z" />
//         </svg>
//       </a>
//       {/* GitHub */}
//       <a href="#" className="p-3 rounded-full bg-white/5 backdrop-blur-sm shadow-lg hover:bg-purple-600/30 transition-all duration-300 group">
//         <svg className="w-6 h-6 text-black group-hover:text-black group-hover:scale-110 transition-all duration-300" fill="currentColor" viewBox="0 0 24 24">
//           <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
//         </svg>
//       </a>
//       {/* Dribbble */}
//       <a href="#" className="p-3 rounded-full bg-white/5 backdrop-blur-sm shadow-lg hover:bg-sky-600/30 transition-all duration-300 group">
//         <svg className="w-6 h-6 text-black group-hover:text-black-300 group-hover:scale-110 transition-all duration-300" fill="currentColor" viewBox="0 0 24 24">
//           <path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10-12c0-5.385-4.365-9.78-9.78-9.78-5.385 0-9.78 4.365-9.78 9.78 0 5.385 4.365 9.78 9.78 9.78 5.385 0 9.78-4.365 9.78-9.78zm-19.56 0c0-5.385 4.365-9.78 9.78-9.78 1.2 0 2.36.22 3.44.62-1.34 2.06-2.14 4.62-2.26 7.36-1.92-.36-3.84-.24-5.64.24-1.04 2.56-1.58 5.46-1.58 8.36 0 .24.02.48.02.72-4.28-1.12-7.6-5.16-7.6-9.72zm3.24 10.02c.36-2.94 1.16-5.64 2.38-7.98 1.48-.36 3.08-.42 4.68-.24.12 1.32.42 2.6.9 3.82-2.56 1.02-4.92 2.42-6.96 4.4zm6.96 1.98c-1.12 0-2.2-.18-3.22-.54.72-2.2 1.86-4.2 3.34-5.88.12 2.58.48 5.1 1.02 7.5-.38.12-.76.18-1.14.18v-.26zm4.32-1.54c-.54-2.4-.9-4.92-1.02-7.5 1.48 1.68 2.62 3.68 3.34 5.88-1.02.36-2.1.54-3.22.54v.26c-.38 0-.76-.06-1.14-.18z" />
//         </svg>
//       </a>
//     </div>
//     {/* Contact Button with Gradient */}
//     <div className="mt-8 text-center relative z-10 ">
//       <button className="px-8 py-3 bg-gradient-to-r from-sky-500 to-sky-500 text-white font-medium rounded-full shadow-lg hover:shadow-xl hover:from-sky-600 hover:to-white-600 transition-all duration-300 transform hover:scale-105">
//         Contact Me
//       </button>
//       <button type='submit' className="mx-4 px-8 py-3 bg-gradient-to-r from-sky-500 to-sky-500 text-white font-medium rounded-full shadow-lg hover:shadow-xl hover:from-sky-600 hover:to-white-600 transition-all duration-300 transform hover:scale-105">
//        Change Photo
//       </button>
//     </div>
//   </div>
// </section>

//   </form>


  
  
  
  
//   </>
// }





import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function ProfileCard({ userData }) {
  console.log(userData);

  // 1. Safe Date Formatting
  const dataBirth = userData?.dateOfBirth;
  const newDate =
    dataBirth && !isNaN(new Date(dataBirth))
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

  // 2. Pass formData directly to the API handler
  function getiImgProfile(formDataPayload) {
    return axios.put(
      `https://route-posts.routemisr.com/users/upload-photo`,
      formDataPayload,
      {
        headers: {
          token: localStorage.getItem('token'), // Route Misr API usually uses `token` header
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

  // 3. Clean Submit Handler
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
                  <img
                    className="w-40 h-40 object-cover rounded-full border-4 border-white/80 shadow-xl hover:scale-105 transform transition-all duration-400 relative z-10"
                    src={userData?.photo}
                    alt="Profile Image"
                  />
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

            {/* Profile Info */}
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

            {/* Action Buttons */}
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