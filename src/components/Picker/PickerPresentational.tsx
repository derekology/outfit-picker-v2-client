import styles from './Picker.module.css'

export function PickerPresentational(props: {pickOutfit: () => void}) {
    return (
        <>
            <div>
                <button className={styles.btn} onClick={props.pickOutfit}>Choose an outfit</button>                
            </div>
        </>
    )
}