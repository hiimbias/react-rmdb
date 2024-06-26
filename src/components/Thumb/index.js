import React from "react";
import { Link } from "react-router-dom";


//Styles
import { Image } from "./Thumb.styles";

import PropTypes from 'prop-types';

const Thumb = ({ image, movieId, clickable }) => (
    <div>
        {clickable ? (
            <Link to={`/${movieId}`}>
                <Image src={image} alt='movie-thumb' />
            </Link>
        ) : (
            <Image src={image} alt='movie-thumb' />    
        )} 
        {/* //If the clickable prop is true, we render a Link component that wraps the Image component. The Link component has a to prop that is set to the movieId prop. If the clickable prop is false, we render the Image component without the Link component. */}
    </div>
);

Thumb.propTypes = {
    image: PropTypes.string,
    movieId: PropTypes.number,
    clickable: PropTypes.bool //We also set the clickable prop to be a boolean.
};
export default Thumb;