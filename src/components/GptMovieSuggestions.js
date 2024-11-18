import React from 'react';
import { useSelector } from 'react-redux';
import MovieList from './MovieList';

const GptMovieSuggestions = () => {
    const { movieResults, movieNames } = useSelector(store => store.gpt);
    
    // Early return if there are no movie names or results
    if (!movieNames || !movieResults || movieNames.length === 0) return null;

    return (
        <div className='p-4 w-screen m-4 bg-black text-white bg-opacity-80'>
            {movieNames.map((movieName, index) => (
                <MovieList 
                    key={movieName} 
                    title={movieName} 
                    movies={movieResults[index] || []} // Default to empty array if undefined
                />
            ))}
        </div>
    );
};

export default GptMovieSuggestions;
