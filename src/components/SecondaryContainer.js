import React from 'react';
import MovieList from './MovieList';
import { useSelector } from 'react-redux';

const SecondaryContainer = () => {
    const movies = useSelector((store) => store.movies);

    return (
        movies.nowPlayingMovies && (
            <div className='bg-black w-full h-auto'>
                <div className='mt-0 md:-mt-32 pl-4 md:pl-10 relative z-20'>
                    {/* Rendering different categories of movies */}
                    <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} /> 
                    <MovieList title={"Popular"} movies={movies.popularMovies} />
                    <MovieList title={"Upcoming Movies"} movies={movies.upComingMovies} />
                    <MovieList title={"Top Rated"} movies={movies.topRatedMovies} />
                </div>
            </div>
        )
    );
};

export default SecondaryContainer;
