import React from 'react';
import GptSearchBar from './GptSearchBar';
import GptMovieSuggestions from './GptMovieSuggestions';
import { BG_URL } from '../utils/constant';

const GPTSearch = () => {
    return (
        <>
            <div className='fixed inset-0 -z-10'>
                <img className='object-cover w-full h-full' src={BG_URL} alt='background_image' />
            </div>
            <div className='flex flex-col items-center pt-[30%] md:pt-0'>
                <GptSearchBar />
                <GptMovieSuggestions />
            </div>
        </>
    );
};

export default GPTSearch;
