import React, { Component } from 'react';

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





//Image
import NoImage from '../images/no_image.jpg';

const initialstate = {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0
};

class Home extends Component {
    state = {
        movies: initialstate,
        searchTerm: '',
        isLoadingMore: false,
        loading: false,
        error: false
    };

    fetchMovies = async (page, searchTerm = "") => {
        try  {
            this.setState({ error: false, loading: true });

            const movies = await API.fetchMovies(searchTerm, page);
            
            console.log('movies');
            console.log(movies);
            console.log('fetchMovies');

            this.setState(prev => ({

                ...prev,
                movies: {
                    ...movies,
                    results:
                        page > 1 ? [...prev.movies.results, ...movies.results] : [...movies.results]
                },
                loading: false,
            }));
        } catch(error) {
            this.setState({ error: true, loading: false });
        }
    }; 

    handleSearch = searchTerm => {
        this.setState({ movies: initialstate, searchTerm }, () => {
            this.fetchMovies(1, this.state.searchTerm);
        });
    }

    handleLoadMore = () => {
        this.fetchMovies(this.state.movies.page + 1, this.state.searchTerm);
    }


    componentDidMount() {
        this.fetchMovies(1);
    } //fetch the movies when the component is mounted


    render() {

        const { movies, searchTerm, loading, error } = this.state;

        if(error) return <div>Something went wrong...</div>;

        console.log(searchTerm);

        return (
            <>
                {!searchTerm && movies.results[0] ? (
                <HeroImage 
                    image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${movies.results[0].backdrop_path}`}
                    title={movies.results[0].original_title}
                    text={movies.results[0].overview}
                    />           
                ) : null}    
                <SearchBar setSearchTerm={this.handleSearch} /> 
                {/* the 1st: props of the SearchBar function */}
                {/* 2nd(the one in the brackets):receive data from the setSearchTerm prop by using useHomeFetch hook */}
                <Grid header={searchTerm ?'Search Result' : 'Popular Movies'}>
                    {movies.results.map(movie =>(
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
                {movies.page < movies.total_pages && !loading && (
                    <Button text='Load More' callback={this.handleLoadMore} />
                )}
                {/* //if the current page is less than the total pages and the loading is false, display the Load More button */}
            </>
    
        )
    };
}

export default Home;
    
    
    