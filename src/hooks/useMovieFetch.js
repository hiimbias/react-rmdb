import { useState, useEffect, useCallback } from 'react';

import API from '../API';

import { isPersistedState } from '../helpers';

export const useMovieFetch = movieId => {
    const [state, setState] = useState({});
    const [loading, setLoading] = useState(true); //set loading to true by default, start by fetching data for the movie
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                setLoading(true);
                setError(false);

            const movie = await API.fetchMovie(movieId);
            const credits = await API.fetchCredits(movieId);
            
            //Get directors only
            const directors = credits.crew.filter(
                member => member.job === 'Director'
            );
            // filter is a method that creates a new array with all elements that pass the test implemented by the provided function. In this case, we are filtering the crew array to get only the directors.
            // filter is a method in JavaScript that creates a new array with all elements that pass the test implemented by the provided function. In this case, we are filtering the crew array to get only the directors.
            
            console.log(credits);
            setState({
                ...movie,
                actors: credits.cast,
                directors
            });

            

            setLoading(false);


            } catch (error) {
                setError(true);
            }

        }

        // check if the movieId is in the sessionStorage
        const sessionState = isPersistedState(movieId);

        if (sessionState) {
            console.log('Grabbing from sessionStorage');
            setState(sessionState);
            setLoading(false);
            return;
        }



        fetchMovie(); // call the fetchMovie function
    }, [movieId])



    // Write to sessionStorage
    useEffect(() => {
        // if (!movieId) return;

        // console.log('Writing to sessionStorage');
        sessionStorage.setItem(movieId, JSON.stringify(state));
    }, [movieId, state]);
    
    return {state, loading, error};
}