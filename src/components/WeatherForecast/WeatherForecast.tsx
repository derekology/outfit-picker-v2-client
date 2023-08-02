import { useEffect } from 'react';
import { WeatherForecastPresentational } from './WeatherForecastPresentational';
import axios from 'axios';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const OWM_KEY: string = import.meta.env.VITE_OWM_KEY;

export function WeatherForecast(props: {targetCity: string, weatherData: {weatherTemp: number | null, weatherInfo: string}, handleWeatherDataChange: (weatherData: {weatherTemp: number | null, weatherInfo: string}) => void}) { 
    const { targetCity } = props;
    
    useEffect(() => {
        const URL =
        `https://api.openweathermap.org/data/2.5/weather?q=${props.targetCity}&appid=${OWM_KEY}`;

        props.handleWeatherDataChange({weatherTemp: null, weatherInfo: ''});

        const fetchData: () => Promise<void> = async () => {
            const response: {data: {weather: [{description: string}], main: {temp: string}}} = await axios.get(URL);
            
            const data: {weather: [{description: string}], main: {temp: string}} = response.data;
            const weatherInfo: string = data.weather[0].description;
            const weatherTemp: number | null = Math.round(parseFloat(data.main.temp) - 273.15);
    
            const currentWeatherData: {weatherTemp: number, weatherInfo: string} = {
                weatherTemp: weatherTemp,
                weatherInfo: weatherInfo
            };
        
            props.handleWeatherDataChange(currentWeatherData);
        };

        fetchData().catch((error) => {console.log(error)});
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [targetCity]);

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