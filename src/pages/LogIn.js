/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react';
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
            <img className='object-cover custom-h-full rounded-l-xl' src='/images/login.jpg' alt="" />
            {loginPage ? (
                <div className={'login-content absolute bg-custom-white right-0 transition-all w-[42vw] custom-h-full flex justify-center items-center text-center'}>
                    <form className='w-[360px] relative -top-3' onSubmit={handleSubmitLogin}>
                        <img className='h-[100px] m-auto z-30' src='/images/avatar.svg' />
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