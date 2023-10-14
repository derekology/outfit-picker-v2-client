import axios from 'axios';

import { PickerPresentational } from './PickerPresentational';

import { ClothingExisting } from '../../interfaces/ClothingExisting';
import { Outfit } from '../../interfaces/Outfit';

export function Picker(props: {appropriateWeight: string | null, loggedInUid: string, weatherData: {weatherTemp: number | null, weatherInfo: string}, handleSelectedOutfitUpdate: (selectedOutfit: Outfit) => void, disablePickerButton: boolean, handleDisablePickerButton: (disablePickerButton: boolean) => void}) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const API_URL: string = import.meta.env.VITE_API_URL;

    const pickOutfit: () => void = () => {
        /**
         * Fetches an outfit from the database to display.
         */
        props.handleDisablePickerButton(true);
        let openAICount = 0;

        if (Math.random() > 0.85 && openAICount < 10) {
            pickClothingUsingOpenAI().then(() => {props.handleDisablePickerButton(false);}).catch(() => {
                getAllClothingFromServer().then((data) => {randomlyPickTopAndBottom(data); props.handleDisablePickerButton(false);}).catch((error) => {console.log(error)})
            })
            openAICount++;
            
        } else {
            getAllClothingFromServer().then((data) => {randomlyPickTopAndBottom(data); props.handleDisablePickerButton(false);}).catch((error) => {console.log(error)});
        }
    };

    const pickClothingUsingOpenAI: () => Promise<void> = async () => {
        try {
            const res: {data: {'top': ClothingExisting | null, 'bottom': ClothingExisting | null}} = await axios.post(`${API_URL}/pickClothing`, { 
                query: {
                    owner: props.loggedInUid,
                    weight: props.appropriateWeight,
                    isAvailable: true
                },
                weatherInfo: props.weatherData,
            });

            const chosenOutfit: {'top': ClothingExisting | null, 'bottom': ClothingExisting | null} = res.data;

            if (!chosenOutfit.top && !chosenOutfit.bottom) {
                alert('No appropriate clothing items found. Please add more clothing items to your wardrobe.')
            } else {
                props.handleSelectedOutfitUpdate({top: res.data.top, bottom: res.data.bottom, aiGen: true});
            }
        } catch (error) {
            throw new Error();
        }
    };

    const getAllClothingFromServer: () => Promise<{'tops': ClothingExisting[], 'bottoms': ClothingExisting[]}> = async () => {
        /**
         * Fetches the clothing items from the database based on the appropriate weight for the weather.
         */
        const res: {data: ClothingExisting[]} = await axios.post(`${API_URL}/getClothing`, { query: {
        owner: props.loggedInUid,
        weight: props.appropriateWeight,
        isAvailable: true
        }});

        const clothingData: ClothingExisting[] = res.data;

        const topsArray: ClothingExisting[] = clothingData.filter((item: ClothingExisting) => item.type === 'Top');
        const bottomsArray: ClothingExisting[] = clothingData.filter((item: ClothingExisting) => item.type === 'Bottom');

        return {'tops': topsArray, 'bottoms': bottomsArray};
    };

    const randomlyPickTopAndBottom: (clothingArrays: {'tops': ClothingExisting[], 'bottoms': ClothingExisting[]}) => void =
    (clothingArrays: {'tops': ClothingExisting[], 'bottoms': ClothingExisting[]}) => {     
        const topsArray: ClothingExisting[] = clothingArrays.tops;
        const bottomsArray: ClothingExisting[] = clothingArrays['bottoms'];

        if (topsArray.length === 0 && bottomsArray.length === 0) {
            alert('No appropriate clothing items found. Please add more clothing items to your wardrobe.')
        } else if (topsArray.length === 0) {
            props.handleSelectedOutfitUpdate({top: null, bottom: bottomsArray[Math.floor(Math.random() * bottomsArray.length)], aiGen: false});
        } else if (bottomsArray.length === 0) {
            props.handleSelectedOutfitUpdate({top: topsArray[Math.floor(Math.random() * topsArray.length)], bottom: null, aiGen: false});
        } else {
            const targetTopIndex = Math.floor(Math.random() * topsArray.length);
            const targetBottomIndex = Math.floor(Math.random() * bottomsArray.length);    
            props.handleSelectedOutfitUpdate({top: topsArray[targetTopIndex], bottom: bottomsArray[targetBottomIndex], aiGen: false});
        }
    };

    return (
        <> 
            {props.appropriateWeight &&
                <div>
                    <PickerPresentational pickOutfit={pickOutfit} disablePickerButton={props.disablePickerButton} />
                </div>
            }
        </>
    )
}