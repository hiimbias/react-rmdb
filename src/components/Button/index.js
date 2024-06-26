import React from "react";

//Styles
import { Wrapper } from "./Button.styles";

import PropTypes from 'prop-types';

const Button = ({ text, callback }) => (
    <Wrapper type="button" onClick={callback}>
        {text}
    </Wrapper> //button triggers the callback function when clicked
);

Button.propsTypes = {
    text: PropTypes.string,
    callback: PropTypes.func
};

export default Button; //export the Button component