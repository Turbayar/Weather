import {useState, useEffect} from 'react';
import './App.css';

const axios = require("axios");

function App() {
  const [location, setLocation] = useState();
  const [place, setPlace] = useState([]);

  const getData = async() => {
    const loc = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=pk.eyJ1IjoidHVyYmF5YXIiLCJhIjoiY2wwYWc4Mm96MDBxdDNkbWo5eWNjZ21vZiJ9.yQUAfjQWJdDuxktSX7AqAA`);
    setPlace(loc.data.features)
    console.log(place)
  } 


  const getName = (e) => {
     setLocation(e.target.value)
  }

  return (
    <div className="App">
      <input type='text' onChange={getName} ></input>
      <button onClick={getData}> Click</button>
      {
        place.map(({place_name, center}, i)=>{
          return <p key={i} > {place_name} == {center[1]}, {center[0]}</p>
        })
      }
    </div>
  );
}

export default App;
