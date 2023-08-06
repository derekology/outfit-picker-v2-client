export function PickerPresentational(props: {pickOutfit: () => void}) {
    return (
        <>
            <div>
                <button onClick={props.pickOutfit}>Choose an outfit</button>                
            </div>
        </>
    )
}