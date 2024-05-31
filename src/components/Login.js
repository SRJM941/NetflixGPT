import React, { useState } from 'react';
import Header from './Header';

const Login = () => {

    const [isSignInForm,setisSignInForm] = useState(true);

    const toggleSignInForm = () => {
       setisSignInForm(!isSignInForm);
    }


    return (
        <div>
            <Header/>
            <div className='absolute'>
                <img src='https://assets.nflxext.com/ffe/siteui/vlv3/dd4dfce3-1a39-4b1a-8e19-b7242da17e68/86742114-c001-4800-a127-c9c89ca7bbe4/IN-en-20240527-popsignuptwoweeks-perspective_alpha_website_large.jpg' alt='background image'  />
            </div>
            <form className='absolute p-12 bg-black w-3/12 my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80'>
                <h1 className='font-bold text-3xl py-4'>
                {isSignInForm ? "Sign In" : "Sign Up" }</h1>

                {!isSignInForm && <input type='text' placeholder='Name'
                 className='p-4 my-2 w-full bg-gray-700'  />}

                <input type='text' placeholder='Email Address'
                 className='p-4 my-2 w-full bg-gray-700'  />

                <input type='Password' placeholder='Password'
                 className='p-4 my-2 w-full bg-gray-700'  />

                <button className='p-4 my-4 bg-red-700 w-full cursor-pointer'>
                {isSignInForm ? "Sign In" : "Sign Up" }</button>

                <p className='py-4 cursor-pointer' onClick={toggleSignInForm}>
                {isSignInForm ? "New to NetFlix? Sign Up Now" : "Already register? Sign In Now" }
                </p>
            </form>
        </div>
    );
};

export default Login;