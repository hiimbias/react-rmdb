import React from "react";

//Styles
import { Wrapper } from "./Button.styles";

const Button = ({ text, callback }) => (
    <Wrapper type="button" onClick={callback}>
        {text}
    </Wrapper> //button triggers the callback function when clicked
);

export default Button; //export the Button component