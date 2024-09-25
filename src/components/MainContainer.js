import React from 'react';
import { useSelector } from 'react-redux';
import VideoTitle from './VideoTitle';
import VideoBackground from './VideoBackground';

const MainContainer = () => {
    const movies = useSelector(store => store.movies?.nowPlayingMovies);
    if (!movies) return null;  // Return null to avoid potential rendering issues

    const mainMovie = movies[0];  // Ensure this index is within bounds
    const { original_title, overview, id } = mainMovie || {};  // Safeguard destructuring

    return (
        <div className='relative pt-[56.25%] md:pt-0 bg-black w-full h-auto'>
            {/* VideoTitle component handles the title and overview text */}
            <VideoTitle title={original_title} overview={overview} />
            
            {/* VideoBackground component displays the video or movie background */}
            <VideoBackground movieId={id} />
        </div>
    );
};

export default MainContainer;
