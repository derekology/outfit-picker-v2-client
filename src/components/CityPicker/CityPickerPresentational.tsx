import styles from './CityPicker.module.css'

export function CityPickerPresentational(props: {targetCity: string, handleCityChange: (e: React.ChangeEvent<HTMLSelectElement>) => void}) {
    return (
        <>
            <div className={'styles.weatherPicker'}>
                <div style={{fontSize: '0.75rem'}}>Dress for a day in...</div>
                <select
                    className={styles.selectBox}
                    style={{minWidth: '160px', width: props.targetCity.length + 3 + 'ch'}}
                    onChange={props.handleCityChange}
                    value={props.targetCity}
                >
                    <option value="Richmond, CA">Richmond, CA</option>
                    <option value="Hong Kong, HK">Hong Kong, HK</option>
                    <option value="Toronto, CA">Toronto, CA</option>
                </select>
            </div>
        </>
    )
}