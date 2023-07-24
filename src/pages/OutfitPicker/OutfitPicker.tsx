import { useState, useEffect } from 'react';

import { OutfitPickerPresentational } from './OutfitPickerPresentational';

import { Outfit } from '../../interfaces/Outfit';

export function OutfitPicker(props: { loggedInUid: string, handleSetCurrentPage: (page: React.MouseEvent<any>) => void }) {
    const [targetCity, setTargetCity] = useState<string>('Vancouver');
    const [weatherData, setWeatherData] = useState<{weatherTemp: number | null, weatherInfo: string}>({weatherTemp: null, weatherInfo: ''});
    const [appropriateWeight, setAppropriateWeight] = useState<string | null>(null);
    const [selectedOutfit, setSelectedOutfit] = useState<Outfit>({top: null, bottom: null});

    const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTargetCity(e.target.value);
    };

    const handleWeatherDataChange = (e: {weatherTemp: number | null, weatherInfo: string}) => {
        setWeatherData(e);
    };

    const setWeight = (weatherData: {weatherTemp: number | null, weatherInfo: string}) => {
        if (!weatherData.weatherTemp) return null;

        if (weatherData.weatherTemp > 20) {
            return 'Light';
          } else if (weatherData.weatherTemp <= 20 && weatherData.weatherTemp > 14) {
            return 'Medium';
          } else {
            return 'Heavy';
          }
    }

    const handleSelectedOutfitUpdate = (selectedOutfit: Outfit) => {
        setSelectedOutfit(selectedOutfit);
    };

    useEffect(() => {
        if (weatherData.weatherTemp === null || weatherData.weatherInfo === '') return;
        setAppropriateWeight(setWeight(weatherData));
    }, [weatherData]);

    useEffect(() => {
        setSelectedOutfit({top: null, bottom: null})
    }, [targetCity, weatherData, appropriateWeight])

    return (
        <>
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