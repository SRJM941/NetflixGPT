import React from 'react';
import { IMG_CDN_URL } from '../utils/constant';

const MovieCard = ({posterPath}) => {
    if(!posterPath) return null;
    return (
        <div className='w-30 md:w-36 pr-4'>
            <img alt='Movie Card' src={IMG_CDN_URL + posterPath}/> 
        </div>
    );
};

export default MovieCard;