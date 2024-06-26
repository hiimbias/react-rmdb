import React from "react";
import { useParams } from "react-router-dom";
// Config
import { IMAGE_BASE_URL, POSTER_SIZE } from '../config';

//Components
import BreadCrumb from './BreadCrumb';
import Grid from './Grid';
import Spinner from './Spinner';
import MovieInfo from './MovieInfo';
import MovieInfoBar from './MovieInfoBar';
import Actor from "./Actor";
//Hook 
import { useMovieFetch } from "../hooks/useMovieFetch";

//Image
import NoImage from '../images/no_image.jpg';


const Movie = () => {

    const { movieId } = useParams(); 
    // useParams will active when the route is /:movieId
    // useParams is a hook that returns an object of key/value pairs of URL parameters. Use it to access match.params of the current <Route>.
    const { state: movie , loading, error } = useMovieFetch(movieId); 
    //fetch data needed and return object with 3 props: state, loading, error from the useMovieFetch hook
    if (loading) return <Spinner />;
    if (error) return <div>Something went wrong...</div>;

    console.log(movie);
    
    return (
        <>
            <BreadCrumb movieTitle={movie.original_title} />
            <MovieInfo movie={movie} />
            <MovieInfoBar time={movie.runtime} 
            budget={movie.budget} 
            revenue={movie.revenue} />

            <Grid header='Actors'>
                {movie.actors.map(actor => (
                    <Actor
                        key = {actor.credit_id}
                        name = {actor.name}
                        character = {actor.character}
                        imageUrl = {
                            actor.profile_path
                            ? `${IMAGE_BASE_URL}${POSTER_SIZE}${actor.profile_path}`
                            : NoImage
                        }
                    />
                ))}
            </Grid>
        </>
    )
}

export default Movie;