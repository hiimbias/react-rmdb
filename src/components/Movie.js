import React, { Component } from "react"; 
import { useParams } from "react-router-dom";
import API from '../API';

// Config
import { IMAGE_BASE_URL, POSTER_SIZE } from '../config';

// Components
import BreadCrumb from './BreadCrumb';
import Grid from './Grid';
import Spinner from './Spinner';
import MovieInfo from './MovieInfo';
import MovieInfoBar from './MovieInfoBar';
import Actor from "./Actor";
import MovieRecommendations from './MovieRecommendations'; // Import movie recommendations

// Image
import NoImage from '../images/no_image.jpg';



class Movie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movie: {},
            loading: true,
            error: false,
        };
    }

    fetchMovie = async () => {
        const { movieId } = this.props; // Lấy movieId từ props
        try {
            this.setState({ error: false, loading: true });

            const movie = await API.fetchMovie(movieId);
            const credits = await API.fetchCredits(movieId);

            // Get directors only
            const directors = credits.crew.filter(
                member => member.job === 'Director'
            );

            this.setState({
                movie: {
                    ...movie,
                    actors: credits.cast,
                    directors
                },
                loading: false,
            });

        } catch (error) {
            this.setState({ error: true, loading: false });
        }
    }

    componentDidMount() {
        this.fetchMovie();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.movieId !== this.props.movieId) {
            this.fetchMovie();
        }
    }

    render() {
        const { movie, loading, error } = this.state;

        if (loading) return <Spinner />;
        if (error) return <div>Something went wrong...</div>;

        return (
            <>
                <BreadCrumb movieTitle={movie.original_title} />
                <MovieInfo movie={movie} />
                <MovieInfoBar 
                    time={movie.runtime} 
                    budget={movie.budget} 
                    revenue={movie.revenue} 
                />

                <Grid header="Actors">
                    {movie.actors?.map(actor => (
                        <Actor
                            key={actor.credit_id}
                            name={actor.name}
                            character={actor.character}
                            imageUrl={
                                actor.profile_path
                                    ? `${IMAGE_BASE_URL}${POSTER_SIZE}${actor.profile_path}`
                                    : NoImage
                            }
                        />
                    ))}
                </Grid>

                <MovieRecommendations movieGenres={movie.genres} />
            </>
        );
    }
}

// Truyền movieId từ useParams() vào Movie
const MovieWithParams = () => {
    const { movieId } = useParams();
    return <Movie movieId={movieId} />;
};

export default MovieWithParams;

