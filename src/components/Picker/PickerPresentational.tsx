export function PickerPresentational(props: {pickOutfit: () => void, disablePickerButton: boolean}) {
    return (
        <>
            <div>
                <button onClick={props.pickOutfit} disabled={props.disablePickerButton}>Choose an outfit</button>                
            </div>
        </>
    )
}