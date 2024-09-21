import React, { useRef, useState } from 'react';
import Header from './Header';
import { checkValidData } from '../utils/validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../utils/firebase';
import { updateProfile } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { BG_URL, user_avatar } from '../utils/constant';

const Login = () => {

    const [isSignInForm,setisSignInForm] = useState(true);
    const [errorMessage,setErrorMessage] = useState(null);
    const dispatch = useDispatch();

    const email = useRef(null);
    const password = useRef(null);
    const name = useRef(null);

    const handleButtonClick = () => {
        // validate the form data
        const message = checkValidData(email.current.value, password.current.value);
        setErrorMessage(message);

        if(message) return;
        
        //Sign In Sign Up Logic
        if(!isSignInForm){
            //Sign Up Logic
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                updateProfile(user, {
                    displayName: name.current.value, photoURL: user_avatar
                  }).then(() => {
                    const {uid, email, displayName, photoURL } = auth.currentUser;
                    dispatch(addUser({uid: uid, email: email,displayName: displayName, photoURL:photoURL} ));
                  }).catch((error) => {
                    setErrorMessage(error.message);
                  });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMessage(errorCode+"-"+errorMessage);
            });
        }else{
            //Sign IN Logic
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
                 // Signed in 
                 const user = userCredential.user;
            })
            .catch((error) => {
                 const errorCode = error.code;
                 const errorMessage = error.message;
                 setErrorMessage(errorCode+"-"+errorMessage);
            });
        }
    }

    const toggleSignInForm = () => {
       setisSignInForm(!isSignInForm);
    }

    return (
        <div>
            <Header/>
            <div className='absolute inset-0'>
                <img className='h-full w-full object-cover' src={BG_URL} alt='background_image' />
            </div>

            <div className="relative flex justify-center items-center min-h-screen">
                <form 
                    onSubmit={(e) => e.preventDefault()} 
                    className='w-full max-w-md p-8 md:p-12 bg-black text-white rounded-lg bg-opacity-80 mx-4'
                >
                    <h1 className='font-bold text-2xl md:text-3xl py-4'>
                    {isSignInForm ? "Sign In" : "Sign Up" }
                    </h1>

                    {!isSignInForm && (
                        <input 
                            ref={name} 
                            type='text' 
                            placeholder='Name'
                            className='p-3 md:p-4 my-2 w-full bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-700'
                        />
                    )}

                    <input 
                        ref={email}
                        type='email' 
                        placeholder='Email Address'
                        className='p-3 md:p-4 my-2 w-full bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-700'
                    />

                    <input 
                        ref={password}
                        type='password' 
                        placeholder='Password'
                        className='p-3 md:p-4 my-2 w-full bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-700'
                    />

                    {errorMessage && (
                        <p className='text-red-500 font-bold text-sm md:text-lg py-2'>{errorMessage}</p>
                    )}

                    <button 
                        className='p-3 md:p-4 my-4 bg-red-700 w-full rounded-md text-white font-semibold hover:bg-red-800 transition duration-300 ease-in-out'
                        onClick={handleButtonClick}
                    >
                    {isSignInForm ? "Sign In" : "Sign Up"}
                    </button>

                    <p 
                        className='py-4 cursor-pointer text-center text-sm md:text-base underline hover:text-gray-400'
                        onClick={toggleSignInForm}
                    >
                    {isSignInForm ? "New to Netflix? Sign Up Now" : "Already registered? Sign In Now"}
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
