import React, { useState } from 'react';
import Axios from 'axios';
import Recipe from './components/Recipes';
import Alert from './components//Alert';
import { v4 as uuidv4 } from 'uuid';
import './App.css';

const App = () => {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [alert, setAlert] = useState('');

  const APP_ID = process.env.REACT_APP_APP_ID;
  const APP_KEY = process.env.REACT_APP_APP_KEY;
  const url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

  const getData = async () => {
    if (query !== '') {
      const result = await Axios.get(url);
      if (!result.data.more) {
        return setAlert('No food found with that name');
      }
      setRecipes(result.data.hits);
      setAlert('');
      setQuery('');
    } else {
      setAlert('Please fill in');
    }
  };

  const onChange = (e) => {
    setQuery(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    getData();
  };

  return (
    <div className="App">
      <h1> Recipe Search </h1>{' '}
      <form className="search-form" onSubmit={onSubmit}>
        {alert !== '' && <Alert alert={alert} />}
        <input
          type="text"
          placeholder="Search Food"
          autoComplete="off"
          onChange={onChange}
        />
        <input type="submit" value="search" />
      </form>
      <div className="recipes">
        {recipes !== [] &&
          recipes.map((recipe) => <Recipe key={uuidv4()} recipe={recipe} />)}
      </div>
    </div>
  );
};

export default App;
