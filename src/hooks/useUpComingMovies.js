import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constant";
import { addUpCominMovies } from "../utils/moviesSlice";
import { useEffect } from "react";

const useUpComingMovies = () => {

    const dispatch = useDispatch();
   
    const upComingMovies =useSelector(store => store.movies.upComingMovies);
    const getUpCominMovies = async () => {
        const data = await fetch('https://api.themoviedb.org/3/movie/upcoming?page=1', API_OPTIONS);
        const json = await data.json(); 
        dispatch(addUpCominMovies(json.results));
    }

    useEffect(()=>{
        if(!upComingMovies){
            getUpCominMovies();
        }

    },[]);

};
export default useUpComingMovies;