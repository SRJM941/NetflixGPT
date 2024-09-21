import { useDispatch, useSelector } from "react-redux";
import { addDisplayMovieTrailer, addTrailerVideo } from "../utils/moviesSlice";
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constant";

const useMovieTrailer = (movieId, isTrailer=true) => {
    
    const dispatch = useDispatch();
    const trailerVideo = useSelector(store => store.movies.trailerVideo)

    const getMovieVideos = async () => {
        const data = await fetch("https://api.themoviedb.org/3/movie/" +
        movieId +
        "/videos?language=en-US", API_OPTIONS);
        const json = await data.json();
        const filterData = json.results.filter((video) => video.type==="Trailer");
        const trailer = filterData.length ? filterData[0] : json.results[0];
        if(isTrailer){
            dispatch(addTrailerVideo(trailer));
        }else{
            dispatch(addDisplayMovieTrailer(trailer));
        }
    }

    useEffect(() => {
        if(!trailerVideo || !isTrailer){
            getMovieVideos();
        } 
    },[]);

}

export default useMovieTrailer;