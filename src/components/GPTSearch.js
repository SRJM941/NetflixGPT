import React from 'react';
import GptSearchBar from './GptSearchBar';
import GptMovieSuggestions from './GptMovieSuggestions';
import { BG_URL  } from '../utils/constant';

const GPTSearch = () => {
    return (
        <>
           <div className='fixed -z-10'>
                <img className='' src={BG_URL} alt='background_image'/>
        </div>
        <div className='pt-[30%] md:p-0'>
            <GptSearchBar/>
            <GptMovieSuggestions/>
        </div>
        </>
    );
};

export default GPTSearch;