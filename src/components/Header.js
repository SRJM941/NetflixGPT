import React, { useEffect } from 'react';
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
    const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

    const handleSignOut = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            navigate("/error");
        });
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const { uid, email, displayName, photoURL } = user;
                dispatch(addUser({ uid, email, displayName, photoURL }));
                navigate("/browse");
            } else {
                dispatch(removeUser());
                navigate("/");
            }
        });
        return () => unsubscribe(); 
    }, []);

    const handleGptSearchClick = () => {
        dispatch(toggleGptSearchView());
    };

    const handleLanguageChange = (e) => {
        dispatch(changeLanguage(e.target.value));
    };

    return (
    <div className='absolute w-screen px-4 sm:px-8 py-1 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between items-center'>
        <img 
            className='w-28 sm:w-36 mx-auto md:mx-0'  // Reduced width of the logo
            src={logo} 
            alt='logo' 
        />
        {user && (
            <div className='flex items-center justify-end w-full mt-1 md:mt-0'>  
                {showGptSearch && (
                    <select className='p-1 m-1 bg-gray-900 text-white rounded-md' onChange={handleLanguageChange}>
                        {SUPPORTED_LANGUAGES.map(lang => (
                            <option key={lang.identifier} value={lang.identifier}>
                                {lang.name}
                            </option>
                        ))}
                    </select>
                )}
                <button 
                    className='px-2 py-1 m-1 bg-purple-800 text-white rounded-lg hover:bg-purple-700 transition duration-300'  // Reduced padding
                    onClick={handleGptSearchClick}
                >
                    {showGptSearch ? "Homepage" : "GPT Search"}
                </button>
                <img 
                    className='hidden md:block w-10 h-10 rounded-full'  // Reduced size of user image
                    alt="user"  
                    src={user?.photoURL} 
                />
                <button 
                    onClick={handleSignOut} 
                    className='font-bold text-white m-1'  // Reduced margin
                >
                    (Sign out)
                </button>
            </div>
        )}
    </div>
);
};

export default Header;
