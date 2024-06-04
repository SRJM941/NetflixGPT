import React from 'react';
import lang from '../utils/languageConstants';
import { useSelector } from 'react-redux';

const GptSearchBar = () => {

    const langKey = useSelector((store)=>store.config.lang);
    const language = lang[langKey] || lang['en'];
    return (
        <div className='pt-[10%] flex justify-center'>
            <form className='w-1/2 bg-black grid grid-cols-12'>
                <input 
                  type='text' 
                  className='p-4 m-4 col-span-9' 
                  placeholder={language.gptSearchPlaceholder}/>
                <button className='m-4 col-span-3 py-2 px-4 bg-red-700 text-white rounded-lg'>
                {language.search} </button>
            </form>
        </div>
    );
};

export default GptSearchBar;