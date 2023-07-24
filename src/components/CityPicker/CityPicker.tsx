import { CityPickerPresentational } from './CityPickerPresentational';

export function CityPicker(props: {targetCity: string, handleCityChange: (e: React.ChangeEvent<HTMLSelectElement>) => void}) {
    return (
        <>
            <CityPickerPresentational targetCity={props.targetCity} handleCityChange={props.handleCityChange} />
        </>
    );
}