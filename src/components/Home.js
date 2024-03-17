import React, { useState, useEffect } from 'react';

//API
import API from '../API';

//Config
import { POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL } from '../config';
//Components
import HeroImage from './HeroImage';
import Grid from './Grid';
import Thumb from './Thumb';
import Spinner from './Spinner';
import SearchBar from './SearchBar';
import Button from './Button';


//Hook
import { useHomeFetch } from '../hooks/useHomeFetch';

//Image
import NoImage from '../images/no_image.jpg';

const Home = () => {
    const { state, loading, error, searchTerm, setSearchTerm, setIsLoadingMore } = useHomeFetch(); //useHomeFetch is a custom hook that we created to fetch data from the API and return the state, loading, error and setSearchTerm props
    //fetch data needed and return object with 4 props: state, loading, error and setSearchTerm from the useHomeFetch hook

    if(error) return <div>Something went wrong...</div>;

    console.log(searchTerm);
    return (
        <>
            {!searchTerm && state.results[0] ? (
            <HeroImage 
                image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${state.results[0].backdrop_path}`}
                title={state.results[0].original_title}
                text={state.results[0].overview}
                />           
            ) : null}    
            <SearchBar setSearchTerm={setSearchTerm} /> 
            {/* the 1st: props of the SearchBar function */}
            {/* 2nd(the one in the brackets):receive data from the setSearchTerm prop by using useHomeFetch hook */}
            <Grid header={searchTerm ?'Search Result' : 'Popular Movies'}>
                {state.results.map(movie =>(
                    <Thumb 
                    key={movie.id}
                    clickable
                    image={
                        movie.poster_path
                            ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path
                            : NoImage
                    }
                    movieId={movie.id}
                    />
                ))}
            </Grid>  
            {loading && <Spinner />}
            {/* //if loading is true, display the spinner */}
            {state.page < state.total_pages && !loading && (
                <Button text='Load More' callback={() => setIsLoadingMore(true)} />
            )}
            {/* //if the current page is less than the total pages and the loading is false, display the Load More button */}
        </>

    )
    ;

};

export default Home;
    
    
    