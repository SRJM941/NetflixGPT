import React, { useRef, useState } from 'react';
import Header from './Header';
import { checkValidData } from '../utils/validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../utils/firebase';
import { updateProfile } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { user_avatar } from '../utils/constant';


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
            <div className='absolute'>
                <img src='https://assets.nflxext.com/ffe/siteui/vlv3/dd4dfce3-1a39-4b1a-8e19-b7242da17e68/86742114-c001-4800-a127-c9c89ca7bbe4/IN-en-20240527-popsignuptwoweeks-perspective_alpha_website_large.jpg' alt='background image'  />
            </div>
            <form onSubmit={(e) => e.preventDefault()} className='absolute p-12 bg-black w-3/12 my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80'>
                <h1 className='font-bold text-3xl py-4'>
                {isSignInForm ? "Sign In" : "Sign Up" }</h1>

                {!isSignInForm && <input ref={name} type='text' placeholder='Name'
                 className='p-4 my-2 w-full bg-gray-700'  />}

                <input 
                  ref={email}
                  type='text' 
                  placeholder='Email Address'
                  className='p-4 my-2 w-full bg-gray-700' 
                />

                <input 
                  ref={password}
                  type='Password' 
                  placeholder='Password'
                  className='p-4 my-2 w-full bg-gray-700'
                />

                <p className='text-red-500 font-bold text-lg py-1'>{errorMessage}</p>

                <button className='p-4 my-4 bg-red-700 w-full cursor-pointer' onClick={handleButtonClick}>
                {isSignInForm ? "Sign In" : "Sign Up" }</button>

                <p className='py-4 cursor-pointer' onClick={toggleSignInForm}>
                {isSignInForm ? "New to NetFlix? Sign Up Now" : "Already register? Sign In Now" }
                </p>
            </form>
        </div>
    );
};

export default Login;