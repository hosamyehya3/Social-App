import  axios from 'axios'
import React, { useContext, useState } from 'react';
import { Button, Input } from '@heroui/react';
import { useForm } from 'react-hook-form';
import * as zod from 'zod'
import { email, float64 } from 'zod/v4-mini';
import {zodResolver} from '@hookform/resolvers/zod'
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import img from '../../assets/couple-users-in-smartphones-with-social-media-icons-vector.jpg'





let Loginschema = zod.object({
 email : zod.string().nonempty('Email is Required').email('Invailed Email') ,
  password : zod.string().nonempty('Password is Required').regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/ , 'Invaild Password') ,
 
})
export default function Login() {
  let {setuserToken} = useContext(AuthContext)
  const [apierror , setapierror] = useState(null);
  const [isloading , setisloading] = useState(false)
let navigate = useNavigate()
  const { register, handleSubmit , setError ,formState } = useForm(
    {defaultValues:{

      email:"",
      password:"",

    }, mode:'onBlur' ,
    resolver : zodResolver(Loginschema)
  }
    
  );

  function submitForm(userData) {
   setisloading(true)
      console.log(userData);
      //call api 
      axios.post('https://route-posts.routemisr.com/users/signin' , userData)
      .then((response)=>{console.log(response);
  if ( response.data.message === "signed in successfully" ) {
    setuserToken(response.data.data.token)
        console.log(response.data.message);

        localStorage.setItem("token" , response.data.data.token)
        navigate('/home')
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


    
      <div className="bg-gray-200  sm:block md:block lg:flex  sm:w-full  md:w-full min-h-screen  gap-5 justify-between items-center p-5 ">
        <div className='sm:w-full md:w-full lg:w-1/2'>
          <img className='w-full sm:w-full md:w-1/2 md:mx-auto lg:w-full css' src={img} alt="" />
        </div>
        <div className='my-animate sm:block mx-auto sm:w-full md:w-1/2 md:mx-auto lg:w-1/2 rounded-md lg:flex items-center justify-center  p-7 mx-auto'>
      <div className="bg-white w-full index">
          <h2 className='text-center text-2xl font-bold text-sky-500 my-4'>Login Now</h2>
          
          <form onSubmit={handleSubmit(submitForm)}>
            <div className="flex flex-col gap-7">

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
              

            </div>
         {apierror &&   <div className='bg-red-500 text-center font-bold text-white p-2 my-2 rounded border border-white '>
              <h1>{apierror}</h1>
            </div> }
            <Button isDisabled={isloading} type='submit' className='my-5 w-full font-bold hover:text-sky-500 hover:bg-white hover:border hover:border-sky-500'>{isloading?'Loading...' : 'Submit'}</Button>
          </form>
          <div className=' border-t-2 flex justify-center items-center  border-gray-400 py-3   '>
            <h2 className='semi-bold italic text-gray-500'>Don't have an account ? <span className='font-bold text-sky-500'><Link to={'/Reigster'}>Register</Link></span> </h2>
          </div>
        </div>
        </div>
  
      </div>











      
    </>
  );
}
