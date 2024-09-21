import React from 'react';
import MovieCard from './MovieCard';

const MovieList = ({ title, movies }) => {
    return (
        <div className='p-2'>
            <h1 className='text-lg md:text-3xl py-2 text-white'>{title}</h1>
            <div className='flex overflow-x-auto scrollbar-hide'>
                <div className='flex space-x-2'> {/* Added space between cards */}
                    {movies?.map((e) => (
                        <MovieCard key={e.id} data={e} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MovieList;
