import { useState, useEffect } from 'react';
import API from '../API';

export const useRecommendation = (userPreferences, movieId = null) => {
    const [recommendedMovies, setRecommendedMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                setLoading(true);
                setError(false);

                let recommended = [];

                if (movieId) {
                    // Nếu có movieId, lấy phim tương tự
                    const similarMovies = await API.fetchSimilarMovies(movieId);
                    recommended = similarMovies.results;
                } else if (userPreferences.genres.length > 0) {
                    // Nếu người dùng có sở thích thể loại, fetch phim theo thể loại
                    for (let genreId of userPreferences.genres) {
                        const movies = await API.fetchMoviesByGenre(genreId);
                        recommended = [...recommended, ...movies.results];
                    }
                } else {
                    // Nếu không có sở thích, lấy danh sách phim phổ biến
                    const popularMovies = await API.fetchMovies();
                    recommended = popularMovies.results;
                }

                setRecommendedMovies(recommended);
                setLoading(false);
            } catch (error) {
                setError(true);
            }
        };

        fetchRecommendations();
    }, [userPreferences, movieId]);

    return { recommendedMovies, loading, error };
};
