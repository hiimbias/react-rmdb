import { useState, useEffect, useRef } from "react";
//API
import API from '../API';

const initialstate = {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0
};

export const useHomeFetch = () => {
    const [searchTerm, setSearchTerm] = useState('');//state to hold the value of the input
    const [state, setState] = useState(initialstate);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    console.log(searchTerm);
    const fetchMovies = async (page, searchTerm = "") => {
        try  {
            setError(false);
            setLoading(true);

            const movies = await API.fetchMovies(searchTerm, page);
            console.log(movies);

            setState(prev => ({
                ...movies,
                results:
                    page > 1 ? [...prev.results, ...movies.results] : [...movies.results]
            }));
        } catch(error) {
            setError(true);
        }
        setLoading(false);
    };
    //Initial and search
    useEffect(() => {
        setState(initialstate);//wipe out the old state before make a new search or it will append the new search result to the old one
        fetchMovies(1,searchTerm);//fetch movies with the search termn (pick the first page of the search result)
    }, [searchTerm])//each time the search term changes, the useEffect will be triggered

    //Load More
    useEffect(() => {
        if (!isLoadingMore) return;//if isLoadingMore is false, return

        fetchMovies(state.page + 1, searchTerm);//fetch the next page of the search result, search term is the same as the previous search term
        setIsLoadingMore(false);//set isLoadingMore to false to prevent the useEffect from being triggered again

    }, [isLoadingMore, searchTerm, state.page])

    return { state, loading, error, searchTerm, setSearchTerm, setIsLoadingMore };

};