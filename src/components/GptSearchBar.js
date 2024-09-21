import React, { useRef } from 'react';
import lang from '../utils/languageConstants';
import { useDispatch, useSelector } from 'react-redux';
import { API_OPTIONS } from '../utils/constant';
import { addGptMoovieResult } from '../utils/gptSlice';
import axios from 'axios';


const GptSearchBar = () => {
 
    const dispatch = useDispatch();
    const searchText = useRef(null); 
    const langKey = useSelector((store)=>store.config.lang);
    const language = lang[langKey] || lang['en'];

    const searchMovieTMDB = async(movie) => {
        const data = await fetch("https://api.themoviedb.org/3/search/movie?query="+movie+"&include_adult=false&language=en-US&page=1",API_OPTIONS);
        const json = await data.json();
        return json.results;
    }
    
    const handleGptSearchClick = async () => {
      try {
        // Define the query for the GPT model
        const gptQuery = "Act as a Movie Recommendation system and suggest some movies for the query: " + searchText.current.value + " only give names of 5 movies, comma separated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmal, Koi Mil Gaya";
    
        // Define the base URL and the API key
        const baseURL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent";
        const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
        console.log(API_KEY);
    
        // Corrected template literal syntax for the URL
        const url = `${baseURL}?key=${API_KEY}`;
    
        // Make the API request using axios
        const response = await axios({
          url: url,
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          data: {"contents":[{parts:[{text:gptQuery}]}]},
        });
        console.log("res ", response);
        // Extract the text from the response
        const movieText = response.data.candidates[0].content.parts[0].text;
    
        // Split the text into an array by commas and trim any whitespace
        const movieArray = movieText.split(',').map(movie => movie.trim());
        console.log(movieArray);
        const promiseArray = movieArray.map((movie)=> searchMovieTMDB(movie));
        console.log(promiseArray);
        const tmdbResults = await Promise.all(promiseArray);

        dispatch(addGptMoovieResult({movieNames: movieArray,movieResults: tmdbResults}));
        // Log or use the array of movies
        
      } catch (error) {
        console.error("Error fetching data from GPT model:", error);
      }
  }
    
    return (
        <div className='pt-[35%]  md:pt-[10%] flex justify-center'>
            <form className='w-full md:w-1/2 bg-black grid grid-cols-12' onSubmit={(e)=>e.preventDefault()}>
                <input 
                  ref={searchText}
                  type='text' 
                  className='p-4 m-4 col-span-9' 
                  placeholder={language.gptSearchPlaceholder}/>
                <button className='m-4 col-span-3 py-2 px-4 bg-red-700 text-white rounded-lg' 
                onClick={handleGptSearchClick}>
                {language.search} </button>
            </form>
        </div>
    );
};

export default GptSearchBar;