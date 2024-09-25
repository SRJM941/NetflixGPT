import React, { useRef } from 'react';
import lang from '../utils/languageConstants';
import { useDispatch, useSelector } from 'react-redux';
import { API_OPTIONS } from '../utils/constant';
import { addGptMoovieResult } from '../utils/gptSlice';
import axios from 'axios';

const GptSearchBar = () => {
    const dispatch = useDispatch();
    const searchText = useRef(null);
    const langKey = useSelector((store) => store.config.lang);
    const language = lang[langKey] || lang['en'];

    const searchMovieTMDB = async (movie) => {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`, API_OPTIONS);
        const json = await response.json();
        return json.results;
    };

    const handleGptSearchClick = async () => {
        try {
            const gptQuery = `Act as a Movie Recommendation system and suggest some movies for the query: ${searchText.current.value}. Only give names of 5 movies, comma-separated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmal, Koi Mil Gaya`;

            const baseURL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent";
            const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;

            const url = `${baseURL}?key=${API_KEY}`;

            const response = await axios.post(url, {
                "contents": [{ parts: [{ text: gptQuery }] }]
            }, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const movieText = response.data.candidates[0].content.parts[0].text;

            const movieArray = movieText.split(',').map(movie => movie.trim());
            const promiseArray = movieArray.map(movie => searchMovieTMDB(movie));
            const tmdbResults = await Promise.all(promiseArray);

            dispatch(addGptMoovieResult({ movieNames: movieArray, movieResults: tmdbResults }));

        } catch (error) {
            console.error("Error fetching data from GPT model:", error);
        }
    };

    return (
        <div className='flex justify-center w-full pt-[35%] md:pt-[10%]'>
            <form className='w-full md:w-1/2 lg:w-1/3 bg-black grid grid-cols-12 p-2 rounded-lg' onSubmit={(e) => e.preventDefault()}>
                <input
                    ref={searchText}
                    type='text'
                    className='p-4 m-2 col-span-9 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-600 w-full'
                    placeholder={language.gptSearchPlaceholder}
                />
                <button
                    className='m-2 col-span-3 py-2 bg-red-700 text-white rounded-lg transition duration-200 hover:bg-red-600 w-full'
                    onClick={handleGptSearchClick}
                >
                    {language.search}
                </button>
            </form>
        </div>
    );
};

export default GptSearchBar;
