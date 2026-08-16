// import React, { useState } from 'react';
// import { Button, Input } from '@heroui/react';
// import { useForm } from 'react-hook-form';

// export default function Register() {
//   const { register, handleSubmit , setError ,formState } = useForm(
//     {defaultValues:{
//       name:"",
//       email:"",
//       password:"",
//       rePassword:"",
//       dateOfBirth:"",
//       gender:""

//     }, mode:'onBlur'
//   }
    
//   );

//   function submitForm(userData) {
//     if (userData.password === userData.rePassword) {
//       console.log("Match");
//       console.log(userData);
      
//     }else{
// setError("rePassword" , 'Not Match')
//     }
//   }

//   return (
//     <>
//       <div className="bg-gray-200 min-h-screen p-5">
//         <div className="bg-white w-1/2 mx-auto rounded-md p-7">
//           <h2 className='text-center text-2xl font-bold text-sky-500 my-4'>Register Now</h2>
          
//           <form onSubmit={handleSubmit(submitForm)}>
//             <div className="flex flex-col gap-7">
              
//               <div>
//                 <Input {...register("name" , {
//                   required : {value : true , message :"Name Is Requried"},
//                   minLength : {value : 5 , message : "min 5 charaters"} , 
//                   maxLength : {value : 10 , message : "Max 10 charaters"}
//                 })} aria-label="Name" className="w-full" placeholder="Enter your name" />
//                 {formState.errors.name && formState.touchedFields.name?  <p className=' italic text-red-500 font-bold  '>{formState.errors.name?.message}</p> : null   }
                                              
//               </div>
              
//               <div>
//                 <Input {...register('email' , {
//                   required : {value : true , message :"Email Is Required"},
//                   pattern : {value : /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ , message: "Invaild Email"}
//                 })} aria-label="Email" className="w-full" placeholder="Enter your Email" />
//                 {/* <p className='italic text-red-500 font-bold'>{formState.errors.email?.message}</p> */}
//                                 {formState.errors.email ?  <p className=' italic text-red-500 font-bold  '>{formState.errors.email && formState.touchedFields.email?.message}</p> : null   }

//               </div>
              
//               <div>
//                 <Input {...register('password' , {
//                   required : {value:true , message : "Password Is Requried"} ,
//                   pattern : {value : /^[A-Z][a-z0-9]{5,8}$/ , message :"Wrong in Password"} 
//                 })} type='password' aria-label="Password" className="w-full" placeholder="Enter your Password" />
//                                 {/* <p className='italic text-red-500 font-bold'>{formState.errors.password?.message}</p> */}
//                                                 {formState.errors.password && formState.touchedFields.password?  <p className=' italic text-red-500 font-bold  '>{formState.errors.password?.message}</p> : null   }


//               </div>
              
//               <div>
//                 <Input {...register('rePassword')} type='password' aria-label="rePassword" className="w-full" placeholder="Enter your rePassword" />
//                                                 {/* <p className='italic text-red-500 font-bold'>{formState.errors.rePassword?.message}</p> */}
//                                                                 {formState.errors.rePassword && formState.touchedFields.rePassword ?  <p className=' italic text-red-500 font-bold  '>{formState.errors.rePassword?.message}</p> : null   }


//               </div>
              
//               <div className="flex gap-4">
//                 <div className='w-full'>
//                   <Input {...register('dateOfBirth' , {
//                     valueAsDate : true ,
//                     required : {value : true , message : "Date Is Required"},
//                     validate : function(DateValue){
//                       let currentYear = new Date().getFullYear()
//                       let userDate = DateValue.getFullYear()
//                       let correctVaildaition = currentYear - userDate
//                       if (  correctVaildaition > 20 ) {
//                         return true
//                       } else {
//                         return false
//                       }
//                     }
//                   })} type='date' aria-label="dateOfBirth" className="w-full" placeholder="Enter your dateOfBirth" />
//                                                   {/* <p className='italic text-red-500 font-bold'>{formState.errors.dateOfBirth?.message}</p> */}
//                                                                   {formState.errors.dateOfBirth && formState.touchedFields.dateOfBirth ?  <p className=' italic text-red-500 font-bold  '>{formState.errors.dateOfBirth?.message}</p> : null   }


//                 </div>
                
//                 <div className='w-full '>
//                   <select {...register('gender' , {
//                     required : {value:true , message : "Gender Is Required"}
//                   }) } className="block w-full px-3 py-2 bg-neutral-secondary-medium border rounded-2xl shadow focus:border-2  focus:border-sky-600 border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body">
//                     <option defaultValue disabled>Choose a Gender</option>
//                     <option value="male">Male</option>
//                     <option value="female">Female</option>
//                   </select>
//                                                   {/* <p className='italic text-red-500 font-bold'>{formState.errors.gender?.message}</p> */}
//                                                                   {formState.errors.gender && formState.touchedFields.gender ?  <p className=' italic text-red-500 font-bold  '>{formState.errors.gender?.message}</p> : null   }


//                 </div>
//               </div>

//             </div>
//             <Button type='submit' className='my-5 w-full font-bold hover:text-sky-500 hover:bg-white hover:border hover:border-sky-500'>Submit</Button>
//           </form>
//         </div>
//       </div>











      
//     </>
//   );
// }




import  axios from 'axios'
import React, { useContext, useState } from 'react';
import { Button, Input } from '@heroui/react';
import { useForm } from 'react-hook-form';
import * as zod from 'zod'
import { email, float64 } from 'zod/v4-mini';
import {zodResolver} from '@hookform/resolvers/zod'
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';






let schema = zod.object({
  name : zod.string().nonempty('Required is Name').min(3 , 'Min 3 Charaters').max(10, 'Max 10 Charaters') ,
  username : zod.string().nonempty('Required is username').regex(/^[A-Z][a-z0-9]{5,10}$/ , 'invaild username') ,

  email : zod.string().nonempty('Email is Required').email('Invailed Email') ,
  password : zod.string().nonempty('Password is Required').regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/ , 'Invaild Password') ,
  gender : zod.string().nonempty('Gender is Required') ,
  dateOfBirth : zod.coerce.date('Date is required').refine((dateValue)=>{
    let currentYear = new Date().getFullYear()
    let yearOfUser = dateValue.getFullYear()
    let legelAge = currentYear - yearOfUser
    if (legelAge > 20) {
      return true
    }else {
      return false
    }
  },'Age must be greater 20') ,
  rePassword : zod.string().nonempty('Repassword is Requried')
  
}).refine((obj)=>{
  if (obj.rePassword === obj.password ) {
    return true
  }else {return false}
} , {path:['rePassword'] , message : 'Repassword and Password not Matched '})
export default function Reigster() {
  let {setuserToken} = useContext(AuthContext)
  const [apierror , setapierror] = useState(null);
  const [isloading , setisloading] = useState(false)
let navigate = useNavigate()
  const { register, handleSubmit , setError ,formState } = useForm(
    {defaultValues:{
      name:"",
      uaername:"",
      email:"",
      password:"",
      rePassword:"",
      dateOfBirth:"",
      gender:""

    }, mode:'onBlur' ,
    resolver : zodResolver(schema)
  }
    
  );

  function submitForm(userData) {
   setisloading(true)
      console.log(userData);
      //call api 
      axios.post('https://route-posts.routemisr.com/users/signup' , userData)
      .then((response)=>{console.log(response);
  if ( response.data.success ) {
        console.log(true);
        setuserToken(response.data.data.token)
        localStorage.setItem("token" , response.data.data.token)
        navigate('/login')
      }


      })
    
      .catch((error)=>{console.log(error.response.data.message);
        setapierror(error.response.data.message)

      }) 
      .finally(()=>{
                setisloading(false)

      })
 
  }

  return (
    <>
            <div class="">
  
</div>
      <div className="bg-gray-200 bubblell water-container min-h-screen p-5 ">
      <div className="bubble"></div>
      <div className="bubble2 bubbleSlow"></div>
      <div className='bubble-right bubbleSlow2'></div>
      <div className='bubble-right2 bubbleSlow2'></div>
      <div className='bubble-right bubbleSlow'></div>
        <div className="bg-white w-1/2 mx-auto rounded-md action  p-7">
          <h2 className='text-center text-2xl font-bold text-sky-500 my-4'>Register Now</h2>
          
          <form onSubmit={handleSubmit(submitForm)}>
            <div className="flex  flex-col gap-7">
              
              <div>
                <Input {...register("name")} aria-label="Name" className="w-full" placeholder="Enter your name" />
                {formState.errors.name && formState.touchedFields.name?  <p className=' italic text-red-500 font-bold  '>{formState.errors.name?.message}</p> : null   }
                                              
              </div>
              <div>
                <Input {...register("username")} aria-label="username" className="w-full" placeholder="Enter your username" />
                {formState.errors.username && formState.touchedFields.username?  <p className=' italic text-red-500 font-bold  '>{formState.errors.username?.message}</p> : null   }
                                              
              </div>
              
              <div>
                <Input {...register('email')} aria-label="Email" className="w-full" placeholder="Enter your Email" />
                {/* <p className='italic text-red-500 font-bold'>{formState.errors.email?.message}</p> */}
                                {formState.errors.email ?  <p className=' italic text-red-500 font-bold  '>{formState.errors.email && formState.touchedFields.email?.message}</p> : null   }

              </div>
              
              <div>
                <Input {...register('password')} type='password' aria-label="Password" className="w-full" placeholder="Enter your Password" />
                                {/* <p className='italic text-red-500 font-bold'>{formState.errors.password?.message}</p> */}
                                                {formState.errors.password && formState.touchedFields.password?  <p className=' italic text-red-500 font-bold  '>{formState.errors.password?.message}</p> : null   }


              </div>
              
              <div>
                <Input {...register('rePassword')} type='password' aria-label="rePassword" className="w-full" placeholder="Enter your rePassword" />
                                                {/* <p className='italic text-red-500 font-bold'>{formState.errors.rePassword?.message}</p> */}
                                                                {formState.errors.rePassword && formState.touchedFields.rePassword ?  <p className=' italic text-red-500 font-bold  '>{formState.errors.rePassword?.message}</p> : null   }


              </div>
              
              <div className="flex gap-4">
                <div className='w-full'>
                  <Input {...register('dateOfBirth')} type='date' aria-label="dateOfBirth" className="w-full" placeholder="Enter your dateOfBirth" />
                                                  {/* <p className='italic text-red-500 font-bold'>{formState.errors.dateOfBirth?.message}</p> */}
                                                                  {formState.errors.dateOfBirth && formState.touchedFields.dateOfBirth ?  <p className=' italic text-red-500 font-bold  '>{formState.errors.dateOfBirth?.message}</p> : null   }


                </div>
                
                <div className='w-full '>
                  <select {...register('gender') } defaultValue={""} className="block w-full px-3 py-2 bg-neutral-secondary-medium border rounded-2xl shadow focus:border-2  focus:border-sky-600 border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body">
                    <option defaultValue  value={""}  disabled>Choose a Gender</option>
                    <option selected value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                                                  {/* <p className='italic text-red-500 font-bold'>{formState.errors.gender?.message}</p> */}
                                                                  {formState.errors.gender && formState.touchedFields.gender ?  <p className=' italic text-red-500 font-bold  '>{formState.errors.gender?.message}</p> : null   }


                </div>
              </div>

            </div>
         {apierror &&   <div className=' bg-red-500 text-center font-bold text-white p-2 my-2 rounded border border-white '>
              <h1>{apierror}</h1>
            </div> }
            <Button isDisabled={isloading} type='submit' className='my-5 button w-full font-bold hover:text-sky-500 hover:bg-white hover:border hover:border-sky-500'>{isloading?'Loading...' : 'Submit'}</Button>
          </form>
          <div className='border-t-1 border-gray-500 py-3 flex justify-center '>
        <h2 className='font-bold italic text-gray-500'> Have an account ? <span className='px-2 font-bold text-sky-500'><Link to={'/login'}>Login</Link></span> now</h2>   
          </div>
        </div>
      </div>











      
    </>
  );
}
