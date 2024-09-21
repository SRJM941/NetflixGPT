import React from 'react';
import Header from './Header';
import useNowPlayingMovies from '../hooks/useNowPlayingMovies';
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';
import usePopularMovies from '../hooks/usePopularMovies';
import GPTSearch from './GPTSearch';
import { useSelector } from 'react-redux';
import useTopRatedMovies from './../hooks/useTopRated';
import useUpComingMovies from '../hooks/useUpComingMovies';
import ActiveMovie from './ActiveMovie';

const Browse = () => {
    const showGptSearch = useSelector(store => store.gpt.showGptSearch);
    const movieData = useSelector(store => store.movies.displayMovie);
    useNowPlayingMovies();
    usePopularMovies();
    useTopRatedMovies();
    useUpComingMovies();
    return (
        <div>
            <Header/>
            {
                showGptSearch ? <GPTSearch/> 
                : 
                <>
                {
                    movieData && <ActiveMovie data={movieData}/>
                }
                <MainContainer/>
                <SecondaryContainer/>
                </>
            }
        </div>
    );
};

export default Browse;