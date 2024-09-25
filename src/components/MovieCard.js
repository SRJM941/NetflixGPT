import React from 'react';
import { useDispatch } from 'react-redux';
import { IMG_URL } from '../utils/constant';
import { addDisplayMovie } from '../utils/moviesSlice';

const MovieCard = ({ data }) => {
    const dispatch = useDispatch();

    const handleMovieCardClick = () => {
        dispatch(addDisplayMovie(data));
    }
    
    return (
        <div 
            className='w-36 sm:w-48 mx-2 cursor-pointer transition-transform transform hover:scale-105' 
            onClick={handleMovieCardClick}
        >
            <img 
                className='w-full h-auto rounded-md shadow-md' 
                src={IMG_URL + data?.poster_path} 
                alt={data?.original_title} 
            />
            <div className='text-white font-bold mt-2 text-sm sm:text-base text-center'>
                {data?.title}
            </div>
        </div>
    )
}

export default MovieCard;
