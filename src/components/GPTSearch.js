import React from 'react';
import GptSearchBar from './GptSearchBar';
import GptMovieSuggestions from './GptMovieSuggestions';
import { BG_URL, logo } from '../utils/constant';

const GPTSearch = () => {
    return (
        <div>
            <div className='absolute -z-10'>
                <img src={BG_URL} alt='background image'  />
            </div>
            <GptSearchBar/>
            <GptMovieSuggestions/>
        </div>
    );
};

export default GPTSearch;