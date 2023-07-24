import axios from 'axios';

import { PickerPresentational } from './PickerPresentational';

import { ClothingExisting } from '../../interfaces/ClothingExisting';
import { Outfit } from '../../interfaces/Outfit';

export function Picker(props: {appropriateWeight: string | null, loggedInUid: string, handleSelectedOutfitUpdate: (selectedOutfit: Outfit) => void}) {

    const pickOutfit = async () => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/getClothing`, { query: {
              owner: props.loggedInUid,
              weight: props.appropriateWeight,
              isAvailable: true
            }});
    
            const clothingData = res.data;

            const topsArray = clothingData.filter((item: ClothingExisting) => item.type === 'Top');
            const bottomsArray = clothingData.filter((item: ClothingExisting) => item.type === 'Bottom');

            if (topsArray.length === 0 && bottomsArray.length === 0) {
                alert('No appropriate clothing items found. Please add more clothing items to your wardrobe.')
            } else if (topsArray.length === 0) {
                props.handleSelectedOutfitUpdate({top: null, bottom: bottomsArray[Math.floor(Math.random() * bottomsArray.length)]});
            } else if (bottomsArray.length === 0) {
                props.handleSelectedOutfitUpdate({top: topsArray[Math.floor(Math.random() * topsArray.length)], bottom: null});
            } else {
                const targetTopIndex = Math.floor(Math.random() * topsArray.length);
                const targetBottomIndex = Math.floor(Math.random() * bottomsArray.length);    
                props.handleSelectedOutfitUpdate({top: topsArray[targetTopIndex], bottom: bottomsArray[targetBottomIndex]});
            }

        } catch (error) {
            console.error('Error fetching clothing data:', error);
        };
    };

    return (
        <> 
            {props.appropriateWeight &&
                <div>
                    <PickerPresentational pickOutfit={pickOutfit} />
                </div>
            }
        </>
    )
}