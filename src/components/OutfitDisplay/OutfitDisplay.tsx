
import { Outfit } from '../../interfaces/Outfit'

export function OutfitDisplay(props: {selectedOutfit: Outfit}) {
    return (
        <>
            <div>
                <div>{props.selectedOutfit['top']?.imageUrl && <img src={props.selectedOutfit['top']?.imageUrl} alt="Top" width="100px" />}</div>
                <div>{props.selectedOutfit['bottom']?.imageUrl && <img src={props.selectedOutfit['bottom']?.imageUrl} alt="Bottom" width="100px" />}</div>
            </div>
            <div>
                <br />
                <div>{props.selectedOutfit['top'] && `${props.selectedOutfit['top'].weight} ${props.selectedOutfit['top'].colour} ${props.selectedOutfit['top'].article}`}</div>
                <div>{props.selectedOutfit['top']?.imageUrl === '' && ` (No image)`}</div>
                <div>{props.selectedOutfit['bottom'] && `${props.selectedOutfit['bottom'].weight} ${props.selectedOutfit['bottom'].colour} ${props.selectedOutfit['bottom'].article}`}</div>
                <div>{props.selectedOutfit['bottom']?.imageUrl === '' && ` (No image)`}</div>
            </div>
        </>
    )
}