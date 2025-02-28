import React, {useState, useEffect, useRef, Component} from "react";

import searchIcon from "../../images/search-icon.svg";
// Styles
import { Wrapper, Content } from "./SearchBar.styles";

import PropTypes from 'prop-types';

// SearchBar component không có props, chỉ có setSearchTerm từ useHomeFetch.js, đây là function được truyền từ useHomeFetch.js, do ban đầu không có sẵn function này

// const SearchBar = ({ setSearchTerm }) => {
//     const [state, setState] = useState('');//state to hold the value of the input
//     const initial = useRef(true);//useRef to check if the component is being rendered for the first time
    
//     //useEffect to check if the component is being rendered for the first time
//     // because we don't want to run the code inside the useEffect when the component is being rendered for the first time
//     useEffect(() => {
//         if (initial.current) {
//             initial.current = false;
//             return;
//         }
//     })//check if the component is being rendered for the first time

//     useEffect(() => {

//         const timer = setTimeout(() => {
//             setSearchTerm(state);//set the search term to the value of the input
//         }, [500]);

//         return () => clearTimeout(timer);

//     },[setSearchTerm, state])//set a timer to delay the search (everytime search term changes, the timer will be reset to 500ms) - the state will be set to the value of the input

//     return (
//         <Wrapper>
//             <Content>
//                 <img src={searchIcon} alt='search-icon' />
//                 <input
//                     type='text' //input type
//                     placeholder="Search Movie" //placeholder text
//                     onChange={event => setState(event.currentTarget.value)} //set the state to the value of the input when the input changes
//                     value={state}//display the current value of the state
//                     />
//             </Content>
//         </Wrapper>
//     );
// };

class SearchBar extends React.Component {
    state = { value: ''};
    timeout = null;

    componentDidUpdate(_prevProps, prevState) {
        if (this.state.value !== prevState.value) {
            const {setSearchTerm} = this.props; //get the setSearchTerm from the props, the props is passed from the parent component

            clearTimeout(this.timeout);
            
            this.timeout = setTimeout(() => {
                const { value } = this.state;
                setSearchTerm(value);//set the search term to the value of the input
            }, [500]);
        }
    }

    render() {

        const { value } = this.state; //get the value from the state

        return (
            <Wrapper>
                <Content>
                    <img src={searchIcon} alt='search-icon' />
                    <input
                        type='text' //input type
                        placeholder="Search Movie" //placeholder text
                        onChange={event => this.setState( {value: event.currentTarget.value})} //set the state to the value of the input when the input changes
                        value={value}//display the current value of the state
                        />
                </Content>
            </Wrapper>
        );
    }
};

SearchBar.propTypes = {
    callback : PropTypes.func
}

export default SearchBar;
