import React, { useContext, useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import img from "../../assets/5299595.png";
import img2 from "../../assets/avatar55.webp";
import { AuthContext } from '../../Context/AuthContext';

export default function Navbar() {
const Navbar = document.getElementById('nav');
  
  let { userToken, setuserToken, userData } = useContext(AuthContext)
  let navigate = useNavigate()
  const [isopen, setisopen] = useState(true)
  function LogOut() {
    setuserToken(null)
    localStorage.removeItem('token')
    navigate('/login')
  }


  function toggleNav() {

    if (isopen) {
      setisopen(false)
const bodyElement = document.body.classList.add('bg-black')
localStorage.setItem('light' , JSON.stringify(isopen))

 Navbar.classList.add('BG');
    } else {
      setisopen(true)
localStorage.setItem('dark' , JSON.stringify(isopen))
const bodyElement = document.body.classList.remove('bg-black')
Navbar.classList.remove('BG');

    }
  }




  return <>

    <nav  className=" w-full glass   border-b border-default">
      <div id='nav' className="w-full  md:gap-10 flex md:flex-nowrap flex-wrap items-center justify-between mx-auto p-4">
        <span className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={img} className="h-7" alt="Flowbite Logo" />
          <span className="self-center text-xl text-heading font-semibold whitespace-nowrap">SOCIAL APP</span>
        </span>



        <button onClick={toggleNav}
          className="h-10 w-10 rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700">
            {!isopen ? <>   <svg className="fill-violet-700 " fill="currentColor" viewBox="0 0 20 20">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg></> : <>   <svg className="fill-yellow-500 " fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fillRule="evenodd" clipRule="evenodd" />
          </svg></>}
       
       
        </button>



        <button onClick={toggleNav} data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-body rounded-base md:hidden hover:bg-neutral-secondary-soft hover:text-heading focus:outline-none focus:ring-2 focus:ring-neutral-tertiary" aria-controls="navbar-default" aria-expanded="false">
          <span className="sr-only">Open main menu</span>
          <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeWidth={2} d="M5 7h14M5 12h14M5 17h14" /></svg>
        </button>
        <div className={`${isopen ? 'hidden' : ''}  w-full md:flex md:justify-between`} id="navbar-default">
          <ul className="font-medium flex mx-auto flex-col p-4 md:p-0 mt-4 border border-default rounded-base items-center bg-neutral-secondary-soft md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-neutral-primary">
            {userToken !== null ? <>
              <li>
                <NavLink to={'/home'} className="block py-2 px-3 text-black bg-brand rounded md:bg-transparent md:text-fg-brand md:p-0" aria-current="page">Home</NavLink>
              </li>
              <li>
                <NavLink to={'/notifications'} className="block py-2 px-3 text-black bg-brand rounded md:bg-transparent md:text-fg-brand md:p-0" aria-current="page">Notifications</NavLink>
              </li>
              <li>
                <NavLink to={'/profile'} className="block py-2 px-3 text-black bg-brand rounded md:bg-transparent md:text-fg-brand md:p-0" aria-current="page">Profile</NavLink>
              </li>
            </> : ""}
            {userToken == null ? <>
              <li>
                <NavLink to={'/login'} className="block py-2 px-3 text-black bg-brand rounded md:bg-transparent md:text-fg-brand md:p-0" aria-current="page">Login</NavLink>
              </li>
              <li>
                <NavLink to={'/reigster'} className="block py-2 px-3 text-black bg-brand rounded md:bg-transparent md:text-fg-brand md:p-0" aria-current="page">Reigster</NavLink>
              </li>

            </> : ""}



          </ul>
          {userData?.photo ? <>
            {localStorage.getItem('token') !== null ? <>
              <Link to={'/profile'}>
                <div className='hidden md:flex lg:flex px-5 boxProfile px-2 bg-transparent font-semibold py-2  flex items-center justify-center '>
                  {userData?.name}

                  <div className='  w-[30px]'>
                    {userData ? <>       {userData.photo == "" ? <>
                      <img className='border rounded-3xl mx-2 ' src={img2} alt="" />
                    </> : <><img className='border  rounded-3xl mx-2' src={userData?.photo} alt="" /></>} </> : ""}

                  </div>



                </div></Link></> : ""}
          </> : null}


        </div>

        <ul className=' w-[100px]  font-bold flex flex-col p-4 md:p-0 mt-4 border border-default rounded-base bg-neutral-secondary-soft md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-neutral-primary'>
          {userToken !== null ? <>  <li>
            <span onClick={LogOut} className=" hover block py-2 px-3 text-black bg-brand  sm:text-[15px]   md:bg-transparent md:text-fg-brand md:p-0" aria-current="page">LOG OUT</span>
          </li></> : ""}

        </ul>







      </div>
    </nav>





  </>
}
