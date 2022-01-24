 /*import React, { Component } from 'react';

  export default class Weather extends Component {
    state = {
      temp: "",
      pressure: "",
      temp_min: "",
      temp_max: ""
    }
    componentDidMount() {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.props.city}&appid=98e5bfeb477c9bec9f5ee8de192eaed8`)
        .then(function (response) {
          return response.json();
        })
        .then(
        (result) => {
          let { temp, pressure, temp_min, temp_max } = result.main
          this.setState({
            temp,
            pressure,
            temp_min,
            temp_max
          });
        })
        .catch(function (error) {
          console.log('Request failed', error)
        });
    }
    render() {
      return  (
      {
        <ul>
        <li>temp: {this.state.temp} </li>
        <li>pressure: {this.state.pressure} </li>
        <li>temp_min: {this.state.temp_min} </li>
        <li>temp_max: {this.state.temp_max} </li>
      </ul>})
    }
  }
  

  /*сделать юсэфект для обработки апи и запихнуть результат в юсстейт
  возможно сделать собственный хук
  возможно сделать объект - виджет*/

import React, { useEffect, useState } from 'react';


const GettingWeather = () => {
  const city = 'Kazan';
  const temp = '';
  const [weather, setWeather] = useState(temp);
  useEffect(() => {
    loadWeather();
  }, []);
  const loadWeather = () => {
    console.log('>> Loading weather <<');
    try {
      fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=98e5bfeb477c9bec9f5ee8de192eaed8')
        .then(res => res.json())
        .then(weather => {
          setWeather(weather.main.temp);
        });
    } catch (e) {}
  };
  console.log(`>> Current temp is: ${weather || 'EMPTY'} <<`);
  return ({weather});
};
export { GettingWeather };