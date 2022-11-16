import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

const App = () => {
  
  const API_KEY = process.env.REACT_APP_API_KEY;
  const today = new Date().toLocaleDateString('fr-FR').split('/').reverse().join('-'); 
  
  const [contentText, setContentText] = useState("");
  const [contentImg, setContentImg] = useState("");
  const [dateValue, setDateValue] = useState(today);
  
  const handleApi = async() =>
  {
    let response = await fetch(`https://api.nasa.gov/planetary/apod?date=${dateValue}&api_key=${API_KEY}`);
    let data = await response.json();
    setContentText(data.explanation)
    setContentImg(data.url)
  }

  const handleSetDate = async(event) =>
  {
    setDateValue(event.target.value)
  }
  
  return (
    <div className="App">
      <h1>
        Astronomy Picture of the Day
      </h1>
      {/* <input id="searchTerm" type="text" placeholder="Enter search term" /> */}
      <input type="date" id="start" name="trip-start"
        defaultValue={`${dateValue}`} onChange={handleSetDate}
        max={`${today}`}>
      </input>
      <button id="search" onClick={() => handleApi()}>
        Search
      </button>
      {contentText && (
        <div id="content">
          {contentText}
          <img src={`${contentImg}`} alt="nasa" ></img>
        </div>
      )}
    </div>
  );
}

export default App;
