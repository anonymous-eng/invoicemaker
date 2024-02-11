import React, { Fragment, useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { register, login, logout } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, NavLink } from 'react-router-dom';
import {toast} from "react-toastify";

const Header = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [ isSignUp, setIsSignup ] = useState(false);
  const [ showPassword, setShowPassword ] = useState(false);
  const [ showCPassword, setShowCPassword ] = useState(false);
  const [open, setOpen] = useState(false);
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

// const userRegister = useSelector((state) => state.userRegister);
// const { loading: registerLoading, error: registerError, userInfo: registerUserInfo } = userRegister;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const switchMode =() => {
      setIsSignup((prevState) => !prevState)
  }

  const onClose = (e) => {
    if(e.target.id === "wrapper"){
      setShowModal(false);
      clear();
    }
  }

  const clear = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  }

  useEffect(() => {
    if (!userInfo)
      navigate("/");
    
    // eslint-disable-line react-hooks/exhaustive-deps
  }, [userInfo, navigate]);

  const submithandler = () => {
        if(!email || !password){
          toast.warning("Fill all Neccessary Fields", {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          return;
        }
        
        if(isSignUp) {
            if(!name){
              toast.warning("Fill all Neccessary Fields", {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
              return;
            }

            if(!emailPattern.test(email)){
              toast.warning("Please enter a valid email address", {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
              return;
            }

            if(password.length < 6){
              toast.warning("Password should not be less than 6 characters", {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
              return;
            }

            if(password !== confirmpassword){
              toast.warning("Password doesn't match", {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
              return;
            }

            dispatch(register(email, password, name))
        } else {
            dispatch(login(email, password))
        }
        setShowModal(false);
        clear();
    }

  const logoutHandler = () => {
    dispatch(logout());
  };


  return (
    <Fragment>
      <div className="flex p-2 px-10 bg-white justify-between">
        {userInfo && 
          <button onClick={() => setOpen((prev) => !prev) } className=' md:hidden'>
            {open ? "✖" :
            <div>
              <div className='w-5 h-1 bg-gray-600 rounded-xl mb-1'></div>
              <div className='w-5 h-1 bg-gray-600 rounded-xl mb-1'></div>
              <div className='w-5 h-1 bg-gray-600 rounded-xl'></div>
            </div>}
            <div className={ open ?  "left-0 absolute top-[6%] h-screen w-[80%] sm:w-[50%] bg-white z-10 transition-all duration-300" : "-left-96 absolute top-[6%] h-screen w-[80%] sm:w-[35%] bg-white transition-all duration-300" }>
              <ul className='flex flex-col items-center w-full  text-base pt-10'>
                <NavLink className='hover:bg-blue-200 w-full flex justify-center items-center py-4 rounded-lg' to="/dashboard">
                  <li className='flex'>
                    <svg className='hidden sm:flex' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.6927 9.0978L17.9022 5.3073C17.7048 5.1113 17.4381 5.0007 17.1602 5H9.05C8.4704 5 8 5.4704 8 6.05V20.75C8 21.3296 8.4704 21.8 9.05 21.8H20.7924C21.6927 21.8 22 21.3645 22 20.75V9.8398C22.0007 9.5612 21.8901 9.2945 21.6927 9.0978Z" fill="#10F0A6"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M14.5949 4L12.9022 2.3073C12.7048 2.1113 12.4381 2.0007 12.1602 2H4.05C3.4704 2 3 2.4704 3 3.05V17.75C3 18.3296 3.4704 18.8 4.05 18.8H7V6.05C7 4.91812 7.91812 4 9.05 4H14.5949Z" fill="#0EC78A"></path><path id="invoice-dollar-sign" d="M15.3757 14.7281L13.0167 13.8461C12.3573 13.5318 11.9562 12.8472 12.0038 12.1185C11.9975 11.2015 12.6926 10.4308 13.6061 10.344C13.6915 10.3307 13.7538 10.2572 13.7538 10.1711V9.7C13.7538 9.3136 14.0674 9 14.4538 9C14.8402 9 15.1538 9.3136 15.1538 9.7V10.1375C15.1538 10.2341 15.2322 10.3125 15.3288 10.3125H16.2038C16.5902 10.3125 16.9038 10.6261 16.9038 11.0125C16.9038 11.3989 16.5902 11.7125 16.2038 11.7125H14.0163C13.4038 11.7125 13.4038 12.0177 13.4038 12.1185C13.3926 12.2725 13.4381 12.4244 13.5319 12.5469L15.8909 13.4289C16.5517 13.7439 16.9528 14.4299 16.9038 15.16C16.908 16.0763 16.2136 16.8442 15.3015 16.931C15.2161 16.9443 15.1538 17.0178 15.1538 17.1039V17.575C15.1538 17.9614 14.8402 18.275 14.4538 18.275C14.0674 18.275 13.7538 17.9614 13.7538 17.575V17.1375C13.7538 17.0409 13.6754 16.9625 13.5788 16.9625H12.7038C12.3174 16.9625 12.0038 16.6489 12.0038 16.2625C12.0038 15.8761 12.3174 15.5625 12.7038 15.5625H14.8913C15.5038 15.5625 15.5038 15.2573 15.5038 15.1565C15.515 15.0025 15.4695 14.8506 15.3757 14.7281Z" fill="white"></path></svg>
                    <div className=' pl-3 pr-10 font-bold tracking-wider'>DashBoard</div>
                  </li>
                </NavLink>
                
                <NavLink to="/create" className='hover:bg-blue-200 w-full flex justify-center items-center py-4 rounded-lg'>
                  <li className='flex' >
                    <svg className='hidden sm:flex' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 9H19V19.5C19 20.3284 18.3284 21 17.5 21H6.5C5.67157 21 5 20.3284 5 19.5V9Z" fill="#C34BFF"></path><path d="M5 8H19V4.5C19 3.67157 18.3284 3 17.5 3H6.5C5.67157 3 5 3.67157 5 4.5V8Z" fill="#7D01BA"></path><rect x="7" y="11" width="4" height="3" rx="1" fill="#EBC2FF"></rect><rect x="7" y="15" width="4" height="3" rx="1" fill="#EBC2FF"></rect><rect x="13" y="11" width="4" height="3" rx="1" fill="#EBC2FF"></rect><rect x="13" y="15" width="4" height="3" rx="1" fill="#EBC2FF"></rect></svg>
                    <div className='pl-3 pr-10 font-bold tracking-wider'>Create</div>
                </li>
                </NavLink>
                <NavLink to="/invoices" className='hover:bg-blue-200 w-full flex justify-center items-center py-4 rounded-lg'>
                  <li className='flex' >
                    <svg className='hidden sm:flex' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.498 3.44a.763.763 0 0 0-.832.167l-.465.473a.206.206 0 0 1-.275 0l-.847-.854a.763.763 0 0 0-1.083 0l-.847.854a.206.206 0 0 1-.275 0l-.847-.854a.764.764 0 0 0-1.083 0l-.847.854a.206.206 0 0 1-.275 0l-.847-.854a.763.763 0 0 0-1.083 0l-.847.854a.206.206 0 0 1-.275 0l-.465-.473A.763.763 0 0 0 6 4.15V19.85a.763.763 0 0 0 1.305.542l.465-.473a.206.206 0 0 1 .275 0l.847.854a.763.763 0 0 0 1.083 0l.847-.854a.206.206 0 0 1 .275 0l.847.854a.762.762 0 0 0 1.083 0l.847-.854a.206.206 0 0 1 .275 0l.847.854a.762.762 0 0 0 1.083 0l.847-.854a.206.206 0 0 1 .275 0l.465.473a.763.763 0 0 0 1.305-.542V4.15a.763.763 0 0 0-.473-.71ZM16.3 13.334h-.763a.572.572 0 1 1 0-1.144h.763a.572.572 0 1 1 0 1.144Zm.573 2.48a.58.58 0 0 1-.573.572h-.763a.572.572 0 1 1 0-1.144h.763a.58.58 0 0 1 .573.572Zm-.573-5.532h-.763a.572.572 0 1 1 0-1.144h.763a.572.572 0 1 1 0 1.144Zm-7.63 3.052a.572.572 0 0 1 0-1.144h3.815a.572.572 0 1 1 0 1.144H8.67Zm2.862 2.48a.58.58 0 0 1-.572.572H8.67a.572.572 0 0 1 0-1.144h2.29a.58.58 0 0 1 .572.572ZM8.098 9.711a.58.58 0 0 1 .572-.572h3.053a.572.572 0 0 1 0 1.144H8.67a.58.58 0 0 1-.572-.572Z" fill="#00834E"></path><rect x="7" y="11" width="4" height="3" rx="1" fill="#EBC2FF"></rect><rect x="7" y="15" width="4" height="3" rx="1" fill="#EBC2FF"></rect><rect x="13" y="11" width="4" height="3" rx="1" fill="#EBC2FF"></rect><rect x="13" y="15" width="4" height="3" rx="1" fill="#EBC2FF"></rect></svg>
                    <div className='pl-3 pr-10 font-bold tracking-wider'>Invoices</div>
                </li>
                </NavLink>
                <NavLink to="/customers" className='hover:bg-blue-200 w-full flex justify-center items-center py-4 rounded-lg'>
                  <li className='flex' >
                    <svg className='hidden sm:flex' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="#1A4D98" fill-rule="evenodd" d="M9 13.4a6.006 6.006 0 00-6 6c0 .22.18.4.4.4h11.2a.4.4 0 00.4-.4 6.006 6.006 0 00-6-6zm0-8A3.8 3.8 0 119 13a3.8 3.8 0 010-7.6z" clip-rule="evenodd"></path><path fill="#3299FE" fill-rule="evenodd" d="M13.665 11.002L13.8 11a6.006 6.006 0 016 6 .4.4 0 01-.4.4h-3.483a7.225 7.225 0 00-3.65-4.415 5.01 5.01 0 001.399-1.983zm.136-.402a5.002 5.002 0 00-3.04-6.081A3.8 3.8 0 1113.8 10.6zm-3.605-5.008a3.802 3.802 0 012.408 4.816 3.802 3.802 0 00-2.408-4.816zm2.03 5.618zM9.002 13.4c.719.001 1.409.128 2.048.361a6.009 6.009 0 00-2.048-.361z" clip-rule="evenodd"></path><rect x="7" y="11" width="4" height="3" rx="1" fill="#EBC2FF"></rect><rect x="7" y="15" width="4" height="3" rx="1" fill="#EBC2FF"></rect><rect x="13" y="11" width="4" height="3" rx="1" fill="#EBC2FF"></rect><rect x="13" y="15" width="4" height="3" rx="1" fill="#EBC2FF"></rect></svg>
                    <div className='pl-3 pr-10 font-bold tracking-wider'>Customers</div>
                </li>
                </NavLink>
                <li className='hover:bg-blue-200 w-full flex justify-center items-center py-4 rounded-lg'>
                  <button onClick={logoutHandler} className='flex gap-1 justify-center items-center transform transition-all hover:scale-110'>
                    <h2 className='font-semibold text-xl'>Logout</h2>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 12L13 12" stroke="#323232" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M18 15L20.913 12.087V12.087C20.961 12.039 20.961 11.961 20.913 11.913V11.913L18 9" stroke="#323232" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M16 5V4.5V4.5C16 3.67157 15.3284 3 14.5 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H14.5C15.3284 21 16 20.3284 16 19.5V19.5V19" stroke="#323232" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </button>
                </li>
              </ul>
            </div>
          </button>
        }
        <div className='logo text-center'>
          <Link className='flex gap-2 justify-center items-center' to={userInfo ? "/dashboard" : "/"}>
            <svg height="24" width="24" viewBox="0 0 22 26" fill="none" xmlns="http://www.w3.org/2000/svg" class="jss23"><path d="M16.972 0H9.7825C9.68474 0.000548595 9.58747 0.0139488 9.49319 0.0398574C2.0216 1.08702 0.408659 5.22856 0.0795619 6.56197C0.0271451 6.69336 0.000144784 6.83354 0 6.97504V21.7186C0.00199396 23.9951 1.84341 25.8401 4.11552 25.8421H16.972C19.2441 25.8401 21.0855 23.9951 21.0875 21.7186V4.12343C21.0855 1.84695 19.2441 0.00199779 16.972 0Z" fill="url(#logo_back_paint_grad)"></path><path opacity="0.56" d="M6.73171 5.84863C7.79628 5.84863 8.65928 4.98397 8.65928 3.91736V1.13096C8.66015 0.620967 9.00279 0.175134 9.49468 0.0439453C2.02309 1.08748 0.410152 5.22903 0.0810547 6.56244C0.248077 6.12733 0.664544 5.83956 1.12983 5.83776L6.73171 5.84863Z" fill="url(#paint1_linear)"></path><path d="M10.5427 21.5121C7.23368 21.5121 4.56836 19.204 4.56836 16.3343C4.56836 15.852 4.95857 15.461 5.43992 15.461C5.92128 15.461 6.31149 15.852 6.31149 16.3343C6.31149 18.2257 8.21013 19.7656 10.5427 19.7656C12.8753 19.7656 14.7776 18.2257 14.7776 16.3343C14.7567 16.0095 14.9177 15.7001 15.1955 15.5314C15.4732 15.3626 15.8215 15.3626 16.0992 15.5314C16.377 15.7001 16.538 16.0095 16.5171 16.3343C16.5171 19.204 13.8373 21.5121 10.5427 21.5121Z" fill="white"></path><defs><linearGradient id="logo_back_paint_grad" x1="-0.444452" y1="8.52771" x2="9.04942" y2="17.1872" gradientUnits="userSpaceOnUse"><stop stop-color="#5D97F3"></stop><stop offset="0.24" stop-color="#66A0F5"></stop><stop offset="0.47" stop-color="#74AEF8"></stop><stop offset="1" stop-color="#90CAFE"></stop><stop offset="1" stop-color="#92CCFE"></stop></linearGradient><linearGradient id="paint1_linear" x1="0.0810547" y1="6.56063" x2="9.49468" y2="6.56063" gradientUnits="userSpaceOnUse"><stop stop-color="#97CFFF"></stop><stop offset="0.4" stop-color="#A0D5FE"></stop><stop offset="1" stop-color="#B7E3FD"></stop></linearGradient></defs></svg>
            <h2 className='hidden sm:flex tracking-wider font-semibold text-xl'>Invoice Maker</h2>
          </Link>
        </div> 
        {userInfo && 
          <button onClick={logoutHandler} className='hidden md:flex gap-1 justify-center items-center transform transition-all hover:scale-110'>
            <h2 className='font-semibold text-xl'>Logout</h2>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 12L13 12" stroke="#323232" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M18 15L20.913 12.087V12.087C20.961 12.039 20.961 11.961 20.913 11.913V11.913L18 9" stroke="#323232" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M16 5V4.5V4.5C16 3.67157 15.3284 3 14.5 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H14.5C15.3284 21 16 20.3284 16 19.5V19.5V19" stroke="#323232" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        }
        { !userInfo && <div className='login flex space-x-1'>
          <button className='bg-indigo-500 hover:bg-indigo-600 font-bold focus:outline-none text-sm
           text-white  px-3 text-center rounded-lg' 
           onClick={()=> {
            setShowModal(true)
            setIsSignup(false)}}>
            Log In
          </button>
        </div>
        }
      </div>

        { showModal && <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center'
        id="wrapper" onMouseDown={onClose}>
            <div className='bg-white tracking-wider rounded-lg flex flex-col gap-4 p-4 px-6'>
                <h2 className='font-bold text-2xl text-center'> { isSignUp ? "Sign Up" : "Log In"} </h2>
                <hr className='my-2' />

                {isSignUp &&
                  <input className='bg-gray-100  rounded-lg p-2 px-4 w-80 ' value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder='Enter Name *' />}
                
                <input className='bg-gray-100 rounded-lg p-2 px-4 w-80 ' value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Enter Email *' />
                  
                <div className='flex bg-gray-100 rounded-lg border w-80 items-center'>
                  <input className='bg-gray-100 p-2 px-4 rounded-lg w-[100%] ' value={password} onChange={(e) => setPassword(e.target.value)} type={showPassword ? "text" : "password" } placeholder='Password *' />
                  <button className=' bg-purple-400 text-white p-2 m-2 font-bold rounded-lg py-0.5 h-7' 
                    onClick={()=> setShowPassword(!showPassword)}
                  >{showPassword? "Hide" : "Show" }</button>
                </div>
                {isSignUp && <div className='flex bg-gray-100 rounded-lg border w-80 items-center'>
                  <input className='bg-gray-100 p-2 px-4 rounded-lg w-[100%] ' value={confirmpassword} onChange={(e) => setConfirmPassword(e.target.value)} type={showCPassword ? "text" : "password" } placeholder='Confirm Password *' />
                  <button className=' bg-purple-400 text-white p-2 m-2 font-bold rounded-lg py-0.5 h-7' 
                    onClick={()=> setShowCPassword(!showCPassword)}
                  >{showCPassword ? "Hide" : "Show"}</button>
                </div>}
                <button className='bg-indigo-500 hover:bg-indigo-600 font-bold  focus:outline-none text-sm
                 text-white py-2.5 px-5 text-center rounded-lg w-80' onClick={submithandler}> { isSignUp ? "Create Account" : "Log In"} </button>
                <hr className='my-2' />
                <button className='bg-green-600 hover:bg-green-700 font-bold  focus:outline-none text-sm
                  text-white py-2.5 px-5 text-center rounded-lg w-fit mx-auto' onClick={() => {switchMode(); clear();}}>
                    { isSignUp ? "Already have an account? Sign in" : "Don't have an account? Sign Up"}
                </button>
            </div>
          </div>
        }
    </Fragment>
  )
}

export default Header