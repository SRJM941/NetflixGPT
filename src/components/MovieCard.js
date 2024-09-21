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
        <div className='sm:w-48 w-36 mr-3 cursor-pointer  ' onClick={handleMovieCardClick}>


            <img src={IMG_URL + data?.poster_path} alt={data?.original_title} />
            <div className='text-white font-bold relative  '>{data?.title}</div>

        </div>
    )
}

export default MovieCard