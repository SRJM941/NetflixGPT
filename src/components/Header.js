import React, { useEffect } from 'react';
//import { FaUserAstronaut } from "react-icons/fa";
import { auth } from '../utils/firebase';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { SUPPORTED_LANGUAGES, logo } from '../utils/constant';
import { toggleGptSearchView } from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice';


const Header = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();
    const user = useSelector(store => store.user);
    const showGptSearch = useSelector((store) => store.gpt.showGptSearch)

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

    const handleGptSearchClick = () => {
        // Toggle GPT search
        dispatch(toggleGptSearchView());
    }

    const handleLanguageChange = (e) => {
        //console.log(e.target.value);
        dispatch(changeLanguage(e.target.value));
    }

    return (
        <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between'>
            <img 
            className='w-44 mx-auto md:mx-0'
            src={logo}
            alt='logo' 
            />
           {user && ( <div className='flex justify-between p-2'>
                {showGptSearch && (<select className='p-2 m-2 bg-gray-900 text-white' onChange={handleLanguageChange}>
                    {SUPPORTED_LANGUAGES.map(lang => <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>)}
                   
                </select>)}
                <button className='px-3 py-2 m-4 bg-purple-800 text-white rounded-lg mx-4' onClick={handleGptSearchClick}>GPT Search</button>
                <img className='hidden md:block w-12 h-12' alt="user"  src={user?.photoURL}/>
                <button onClick={handleSignOut} className='font-bold text-white'>(Sign out)</button>
            </div>)}

        </div>
    );
};

export default Header;