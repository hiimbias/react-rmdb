


import React, { useState, useEffect } from 'react';
import API from '../../API';
import NoImage from '../../images/no_image.jpg';
import { IMAGE_BASE_URL, POSTER_SIZE } from '../../config';
import Thumb from '../Thumb'; // Sử dụng component Thumb để đồng nhất layout
import Grid from '../Grid'; // Sử dụng component Grid để đồng nhất layout

const MovieRecommendations = ({ movieGenres }) => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchMoviesByGenre = async () => {
            try {
                setLoading(true);
                setError(false);

                if (!movieGenres || movieGenres.length === 0) {
                    setLoading(false);
                    return;
                }

                const genreId = movieGenres[0].id;
                const recommendedMovies = await API.fetchMoviesByGenre(genreId);
                
                setMovies(recommendedMovies.results);
                setLoading(false);
            } catch (error) {
                setError(true);
            }
        };

        fetchMoviesByGenre();
    }, [movieGenres]);

    if (loading) return <p>Loading recommendations...</p>;
    if (error) return <p>Something went wrong...</p>;

    return (
        <>
            <Grid header="Recommended Movies">
                {movies.map(movie => (
                    <Thumb
                        key={movie.id}
                        clickable
                        image={
                            movie.poster_path
                                ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
                                : NoImage
                        }
                        movieId={movie.id}
                    />
                ))}
            </Grid>
        </>
    );
};

export default MovieRecommendations;

