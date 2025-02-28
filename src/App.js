import React from 'react';

// Routing
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
// Components 
import Header from './components/Header';
import Home from './components/Home';
import Movie from './components/Movie';
import NotFound from './components/NotFound';

 // Styles 
import { GlobalStyle } from './GlobalStyle';

const App = () => (
    <Router>
      <Header />
      <Routes>
        <Route path='/react-rmdb' element={<Home />}/>
        <Route path='/react-rmdb/:movieId' element={<Movie/>} />
        <Route path='/*' element={<Home />} />
      </Routes>
      {/* //Routes is a component that we use to define the routes of our application. Inside the Routes component, we define the routes using the Route component. The Route component has two props: path and element. The path prop is the URL path that we want to match, and the element prop is the component that we want to render when the path matches. */}
      <GlobalStyle />
    </Router>
  );

export default App;