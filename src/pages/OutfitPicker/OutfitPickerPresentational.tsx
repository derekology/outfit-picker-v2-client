import { CityPicker } from "../../components/CityPicker/CityPicker";
import { WeatherForecast } from "../../components/WeatherForecast/WeatherForecast";
import { Picker } from "../../components/Picker/Picker";
import { OutfitDisplay } from "../../components/OutfitDisplay/OutfitDisplay";
import { Link } from "react-router-dom";

import { Outfit } from "../../interfaces/Outfit";

export function OutfitPickerPresentational(props: {
  targetCity: string;
  handleCityChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  weatherData: { weatherTemp: number | null; weatherInfo: string };
  handleWeatherDataChange: (e: {
    weatherTemp: number | null;
    weatherInfo: string;
  }) => void;
  appropriateWeight: string | null;
  handleSelectedOutfitUpdate: (selectedOutfit: Outfit) => void;
  selectedOutfit: Outfit | null;
  loggedInUid: string;
  handleSetCurrentPage: (page: React.MouseEvent<any>) => void;
}) {
  return (
    <>
      <CityPicker
        targetCity={props.targetCity}
        handleCityChange={props.handleCityChange}
      />
      <br />
      <WeatherForecast
        targetCity={props.targetCity}
        weatherData={props.weatherData}
        handleWeatherDataChange={props.handleWeatherDataChange}
      />
      <Picker
        appropriateWeight={props.appropriateWeight}
        loggedInUid={props.loggedInUid}
        handleSelectedOutfitUpdate={props.handleSelectedOutfitUpdate}
      />
      {props.selectedOutfit && (
        <OutfitDisplay selectedOutfit={props.selectedOutfit} />
      )}
      <br />
      {props.loggedInUid === "demo" && (
        <em>
          To add your own clothes, log in on the{" "}
          <Link
            to="/closet"
            data-target-page="closet"
            onClick={props.handleSetCurrentPage}
          >
            Closet
          </Link>{" "}
          page.
        </em>
      )}
    </>
  );
}
