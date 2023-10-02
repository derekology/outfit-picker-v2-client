import { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";

import { OutfitPickerPresentational } from './OutfitPickerPresentational';

import { Outfit } from '../../interfaces/Outfit';

export function OutfitPicker(props: { loggedInUid: string, handleSetCurrentPage: (page: React.MouseEvent<HTMLAnchorElement>) => void }) {
    const [targetCity, setTargetCity] = useState<string>('Richmond,%20CA');
    const [weatherData, setWeatherData] = useState<{weatherTemp: number | null, weatherInfo: string}>({weatherTemp: null, weatherInfo: ''});
    const [appropriateWeight, setAppropriateWeight] = useState<string | null>(null);
    const [selectedOutfit, setSelectedOutfit] = useState<Outfit>({top: null, bottom: null});

    const handleCityChange: (e: React.ChangeEvent<HTMLSelectElement>) => void = (e: React.ChangeEvent<HTMLSelectElement>) => {
        /**
         * Sets the target city based on the user's selection.
         */
        setTargetCity(e.target.value);
    };

    const handleWeatherDataChange: (e: {weatherTemp: number | null, weatherInfo: string}) => void = (e: {weatherTemp: number | null, weatherInfo: string}) => {
        /**
         * Sets the weather data based on the API response.
         */
        setWeatherData(e);
    };

    const setWeight: (weatherData: {weatherTemp: number | null, weatherInfo: string}) => "Light" | "Medium" | "Heavy" | null = (weatherData: {weatherTemp: number | null, weatherInfo: string}) => {
        /**
         * Sets the appropriate weight of the outfit based on the weather data.
         * 
         * @param weatherData - The weather data from the API response
         * @returns The appropriate outfit weight for the weather
         */
        if (!weatherData.weatherTemp) return null;

        if (weatherData.weatherTemp > 20) {
            return 'Light';
          } else if (weatherData.weatherTemp <= 20 && weatherData.weatherTemp > 14) {
            return 'Medium';
          } else {
            return 'Heavy';
          }
    }

    const handleSelectedOutfitUpdate: (selectedOutfit: Outfit) => void = (selectedOutfit: Outfit) => {
        /**
         * Sets the selected outfit based on the user's selection.
         */
        setSelectedOutfit(selectedOutfit);
    };

    useEffect(() => {
        /**
         * Sets the appropriate weight of the outfit if the weather data is retrieved.
         */
        if (weatherData.weatherTemp === null || weatherData.weatherInfo === '') return;
        setAppropriateWeight(setWeight(weatherData));
    }, [weatherData]);

    useEffect(() => {
        /**
         * Resets the selected outfit when the target city, weather data, or apporpriate weight for the weather is set or changes.
         */
        setSelectedOutfit({top: null, bottom: null})
    }, [targetCity, weatherData, appropriateWeight])

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Outfit Picker</title>
                <link rel="canonical" href="http://outfitpicker.wooprojects.com/" />
            </Helmet>
            <OutfitPickerPresentational
                targetCity={targetCity}
                handleCityChange={handleCityChange}
                weatherData={weatherData}
                handleWeatherDataChange={handleWeatherDataChange}
                appropriateWeight={appropriateWeight}
                handleSelectedOutfitUpdate={handleSelectedOutfitUpdate}
                selectedOutfit={selectedOutfit}
                loggedInUid={props.loggedInUid} 
                handleSetCurrentPage={props.handleSetCurrentPage}
                />
        </>
    )
}