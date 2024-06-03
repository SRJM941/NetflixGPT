import React, { useEffect } from 'react';
//import { FaUserAstronaut } from "react-icons/fa";
import { auth } from '../utils/firebase';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { logo } from '../utils/constant';


const Header = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();
    const user = useSelector(store => store.user);
    const handleSignOut = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
            navigate("/error");
        });
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
              const {uid, email, displayName, photoURL } = user;
              dispatch(addUser({uid: uid, email: email,displayName: displayName, photoURL:photoURL} ));
              navigate("/browse");
            } else {
              // User is signed out
              dispatch(removeUser());
              navigate("/");
            }
          });
        return () => unsubscribe(); 
    },[]);

    return (
        <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between'>
            <img 
            className='w-44'
            src={logo}
            alt='logo' 
            />
           {user && ( <div className='flex'>
                <img className='w-12 h-12' alt="user"  src={user?.photoURL}/>
                <button onClick={handleSignOut} className='font-bold text-white'>(Sign out)</button>
            </div>)}

        </div>
    );
};

export default Header;