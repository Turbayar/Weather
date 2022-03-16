import { useState, useEffect } from "react";
import "./App.css";
import React from 'react';
import WeatherIcon from 'react-icons-weather';

const axios = require("axios");

function App() {
  const [location, setLocation] = useState();
  const [place, setPlace] = useState([]);
  const [dark, setDark] = useState();

  const getData = async () => {
    const loc = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=pk.eyJ1IjoidHVyYmF5YXIiLCJhIjoiY2wwYWc4Mm96MDBxdDNkbWo5eWNjZ21vZiJ9.yQUAfjQWJdDuxktSX7AqAA`
    );
    setPlace(loc.data.features);
    console.log(place);
  };

  const getName = (e) => {
    setLocation(e.target.value);
  };

  let arr = [];

  const getWeather = (coordinate) => {
    console.log(coordinate);
    let url = `https://api.darksky.net/forecast/81d38b9c958eb018e01083a72b0926b5/${coordinate[1]},${coordinate[0]}`;
    axios
      .get(url)
      .then((res) => {
        console.log(res.data.daily.data);
        res.data.daily.data.forEach((cur) => {
          let temp = (cur.temperatureHigh - 32) * 0.5556;
          let fixedTemp = temp.toFixed(2);
          let curtime = (cur.time);
          let date = new Date(curtime * 1000);
          let month = date.getMonth();
          let day = date.getDate();
          let time = (month+1) + " сарын " + day + "-нд";
          let icon = cur.icon;
          console.log(time);
          arr.push({fixedTemp, time, icon});
        });
        setDark(arr);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

 
  if (dark)
    return (
      <div  className="app">
        
        {dark.map((element, i) => (   
          <h1 key={i} >   {element.time} гадаа {element.fixedTemp}  C° градус <WeatherIcon name="darksky" iconId={element.icon} flip="horizontal" rotate="90" /> </h1>   
        ))}
      </div>
      // <div className="App">
      //   <h1> Яг одоо гадаа {dark} C° градус </h1>{" "}
      // </div>
    );
  else
    return (
      <div className="app">
        <div className="search" >
          <input type="text" placeholder="Find City" onChange={getName} />
          <button onClick={getData}> Search </button>
        </div>
        <div className="container">
          {place.map(({ place_name, center }, i) => {
            return (
              <div key={i} className="list">
                <button onClick={() => getWeather(center)}>
                  Choose {i + 1}
                </button>
                <p key={i}>{place_name}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
}

export default App;
