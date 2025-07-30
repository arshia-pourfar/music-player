import React from 'react';
import { useAuth } from '../hooks/AuthContext';
import LoginOrSingup from './LogIn';
const Setting = () => {
    const { user } = useAuth();

    if (user) {
        return (
            <section id='setting-page' className='relative w-full bg-custom-white custom-h-full rounded-l-xl py-5 px-10'>
                <div className='left-section w-[60%] custom-h-full'>
                    <h1 className='font-black block text-5xl'>Setting</h1>
                    <img className='w-24' src='/images/avatar.svg' alt="User Avatar" />
                </div>
                <div className='right-section w-[40%] ps-8 z-[999]'>
                    {/* محتوای بخش راست */}
                </div>
            </section>
        );
    } else {
        return (
            <LoginOrSingup />
        );
    }
};

export default Setting;
