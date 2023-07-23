import { useEffect } from 'react';
import { WeatherForecastPresentational } from './WeatherForecastPresentational';
import axios from 'axios';

const OWM_KEY = import.meta.env.VITE_OWM_KEY;

export function WeatherForecast(props: {targetCity: string, weatherData: {weatherTemp: number | null, weatherInfo: string}, handleWeatherDataChange: Function}) {    
    const URL =
    `https://api.openweathermap.org/data/2.5/weather?q=${props.targetCity}&appid=${OWM_KEY}`;

    const fetchData: Function = async () => {
        const response = await axios.get(URL);
        const data = response.data;
        const weatherInfo: string = data.weather[0].description;
        const weatherTemp: number = Math.round(parseFloat(data.main.temp) - 273.15);

        const currentWeatherData = {
            weatherTemp: weatherTemp,
            weatherInfo: weatherInfo
        };

        props.handleWeatherDataChange(currentWeatherData);
    };

    useEffect(() => {
        props.handleWeatherDataChange({weatherTemp: '', weatherInfo: ''})
        fetchData();
    }, [props.targetCity]);

    return (
        <>
            <WeatherForecastPresentational currentWeather={
                props.weatherData.weatherTemp === null || props.weatherData.weatherInfo === '' ?
                'Loading...' :
                `${props.weatherData.weatherTemp}°C | ${props.weatherData.weatherInfo}`
                } />
        </>
    )
}