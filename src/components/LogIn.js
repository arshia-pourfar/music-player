/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react';
import avatar from '../images/avatar.svg';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useAuth } from '../hooks/AuthContext';
import useFetchData from '../hooks/useFetchData';

// import LoginOrSingupForm from '../components/LoginForm'
function LoginOrSingup() {
    const [loginPage, setLoginPage] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [triggerFetch, setTriggerFetch] = useState(false);
    const { setUser } = useAuth();
    const { data, loading, error, setUrl, setMethod, setBody, fetchData } = useFetchData('', 'POST', null, false);

    const handleSubmitLogin = (e) => {
        e.preventDefault();
        setUrl('/api/login');
        setMethod('POST');
        setBody({ username, password });
        setTriggerFetch(true);
    };

    const handleSubmitRegister = (e) => {
        e.preventDefault();
        setUrl('/api/register');
        setMethod('POST');
        setBody({ username, email, password });
        setLoginPage(true);
        setTriggerFetch(true);
    };

    useEffect(() => {
        if (triggerFetch) {
            fetchData();
            setTriggerFetch(false);
        }
        if (data && data.success) {
            localStorage.setItem('user', JSON.stringify(data.results[0]));
            setUser(data.results[0]);
        }
    }, [triggerFetch, fetchData, data, setUser]);
    
    return (
        <section id='user-page' className='relative w-[100vw] custom-h-full flex rounded-l-xl'>
            <img className='object-cover custom-h-full rounded-l-xl' src={require('../images/login.jpg')} alt="" />
            {loginPage ? (
                <div className={'login-content absolute bg-custom-white right-0 transition-all w-[42vw] custom-h-full flex justify-center items-center text-center'}>
                    <form className='w-[360px] relative -top-3' onSubmit={handleSubmitLogin}>
                        <img className='h-[100px] m-auto z-30' src={avatar} />
                        <h2 className="title my-4 text-[#333] font-medium uppercase text-5xl">Welcome</h2>
                        <div className='input-div border-b-2 border-custom-gray'>
                            <div className="i">
                                <i className="fi fi-rr-circle-user text-2xl ms-2 text-custom-black"></i>
                            </div>
                            <input type="text" id="input-username" name="username" onChange={(e) => setUsername(e.target.value)} className='input bg-transparent ms-3' required />
                            <label htmlFor="input-username" className="input-lable font-medium text-gray-400">Email Or Username</label>
                        </div>
                        <div className="input-div border-b-2 border-custom-gray">
                            <div className="i">
                                <i className="fi fi-rr-lock text-2xl ms-2 text-custom-black"></i>
                            </div>
                            <input type="password" id="input-password" name="password" onChange={(e) => setPassword(e.target.value)} className='input bg-transparent ms-3' required />
                            <label htmlFor="input-password" className="input-lable font-medium text-gray-400">Password</label>
                        </div>
                        <div className='relative text-sm h-4'>
                            <a href="#" className='absolute left-0 -top-2 no-underline font-semibold text-gray-500 transition-colors hover:text-[#4DA8D5]'>Forgot Password?</a>
                        </div>
                        <input type="submit" className="btn text-xl" value="Login" />
                        <div className='relative flex items-center justify-center mt-6'>
                            <span className='text-sm font-bold text-gray-400 before:border before:absolute before:w-[36%] before:bottom-[10px] before:left-0 before:border-custom-gray after:border after:absolute after:w-[36%] after:bottom-[10px] after:right-0 after:border-custom-gray'>
                                Or login with
                            </span>
                        </div>
                        <GoogleOAuthProvider clientId="YOUR_CLIENT_ID">
                            <button className='relative border border-custom-gray w-full py-3 rounded-full my-5 flex justify-center items-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 48 48">
                                    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
                                    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
                                    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
                                    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                                </svg>
                                <span className='ms-2 text-base'>Login with Google</span>
                            </button>
                        </GoogleOAuthProvider>
                        <div className=''>
                            <span>Don't have an account? </span>
                            <button type="" onClick={() => setLoginPage(false)} className='text-custom-blue'>
                                Sign Up now
                            </button>
                        </div>
                    </form>
                    {loading && <p>Loading...</p>}
                    {error && <p className='absolute top-0 py-3 w-full bg-red-500 text-custom-white'>Error: {error.message}</p>}
                    {data && data.success && <p className='absolute top-0 py-3 w-full bg-green-500 text-custom-white'>Login successful!</p>}
                    {data && data.success === false && <p className='absolute top-0 py-3 w-full bg-red-500 text-custom-white'>Login failed. {data.message}</p>}
                </div>
            ) : (
                <div className='signup-content absolute bg-custom-white right-0 transition-all w-[40vw] custom-h-full flex justify-center items-center text-center'>
                    <form className='w-[360px] relative' onSubmit={handleSubmitRegister}>
                        <h2 className="title my-4 text-[#333] font-semibold uppercase text-3xl">Create your account</h2>
                        <div className='input-div one border-b-2 border-custom-gray transition-all'>
                            <div className="i">
                                <i className="fi fi-rr-circle-user text-2xl ms-2 text-custom-black"></i>
                            </div>
                            <input type="text" id="input-username" name="username" onChange={(e) => setUsername(e.target.value)} className='input bg-transparent ms-3' required />
                            <label htmlFor="input-username" className="input-lable font-medium text-gray-400">Username</label>
                        </div>
                        <div className='input-div border-b-2 border-custom-gray'>
                            <div className="i">
                                <i className="fi fi-rr-envelope text-2xl ms-2 text-custom-black"></i>
                            </div>
                            <input type="email" id="input-email" name="email" onChange={(e) => setEmail(e.target.value)} className='input bg-transparent ms-3' required />
                            <label htmlFor="input-email" className="input-lable font-medium text-gray-400">Email</label>
                        </div>
                        <div className="input-div border-b-2 border-custom-gray">
                            <div className="i">
                                <i className="fi fi-rr-lock text-2xl ms-2 text-custom-black"></i>
                            </div>
                            <input type="password" id="input-password" name="password" onChange={(e) => setPassword(e.target.value)} className='input bg-transparent ms-3' required />
                            <label htmlFor="input-password" className="input-lable font-medium text-gray-400">Password</label>
                        </div>
                        <input type="submit" className="btn text-xl" value="Sign Up" />
                        <div className='relative flex items-center justify-center mt-6'>
                            <span className='text-sm font-bold text-gray-400 before:border before:absolute before:w-[36%] before:bottom-[10px] before:left-0 before:border-custom-gray after:border after:absolute after:w-[36%] after:bottom-[10px] after:right-0 after:border-custom-gray'>
                                Or login with
                            </span>
                        </div>
                        <GoogleOAuthProvider clientId="YOUR_CLIENT_ID">
                            <button className='relative border border-custom-gray w-full py-3 rounded-full my-5 flex justify-center items-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 48 48">
                                    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
                                    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
                                    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
                                    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                                </svg>
                                <span className='ms-2 text-base'>Login with Google</span>
                            </button>
                        </GoogleOAuthProvider>
                        <div className=''>
                            <span>Already have an account? </span>
                            <button type="" onClick={() => setLoginPage(true)} className='text-custom-blue'>
                                Log In now
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </section>
    );
}

export default LoginOrSingup;

/*<div className="login-content absolute bg-custom-white right-0 w-[40dvw] h-[100dvh] flex justify-center items-center text-center">
              <form className='w-[380px] mt-20 relative' action="#">
                  <h2 className="title mb-8 text-[#333] font-medium uppercase text-5xl">Welcome</h2>
                  <div class="w-full my-6">
                      <div class="relative w-full min-w-[200px] h-11 ">
                          <i className="fi fi-rs-circle-user absolute p-2.5 text-2xl"></i>
                          <input
                              className="peer w-full h-full bg-white focus:outline-0 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-500 placeholder-shown:border-t-blue-gray-200 border focus:border-2 focus:border-t-transparent text-sm p-4 ps-10 rounded-lg focus:border-gray-900"
                              placeholder=" " />
                          <label
                              className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-[5px] peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-9 before:h-1.5 before:mt-[5.2px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[5.2px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                              Username
                          </label>
                      </div>
                  </div>
                  <div class="w-full my-6">
                      <div class="relative w-full min-w-[200px] h-11 ">
                          <i className="fi fi-rs-lock absolute p-2 text-2xl"></i>
                          <input
                              className="peer w-full h-full bg-white focus:outline-0 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-500 placeholder-shown:border-t-blue-gray-200 border focus:border-2 focus:border-t-transparent text-sm p-4 ps-10 rounded-lg focus:border-gray-900"
                              placeholder=" " />
                          <label
                              className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-[5px] peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-9 before:h-1.5 before:mt-[5.2px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[5.2px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                              Password
                          </label>
                      </div>
                      <p class="mt-3 ms-1 text-start text-sm text-gray-700 hidden">
                          <i className='fi fi-sr-info'></i>
                          <span> Use at least 8 characters, one uppercase, one lowercase and one number.</span>
                      </p>
                  </div>
                  <a href="#" className='block text-start no-underline font-semibold text-[#999] text-[0.89rem] transition-colors hover:text-[#F53D37]'>Forgot Password?</a>
                  <input type="submit" className="py-3 w-9/12 rounded-lg text-lg font-bold bg-custom-pink mt-8" value="Login" />
              </form>
          </div> */