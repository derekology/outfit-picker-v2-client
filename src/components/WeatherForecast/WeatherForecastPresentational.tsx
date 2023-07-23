import styles from './WeatherForecast.module.css';

export function WeatherForecastPresentational(props: {currentWeather: string}) {
    return (
        <>
            <div className={styles.weatherForecast}>
                {props.currentWeather}
            </div>
        </>
    )
}