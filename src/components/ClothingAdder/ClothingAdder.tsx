import { useState } from 'react';
import axios from 'axios';

import { ClothingAdderPresentational } from './ClothingAdderPresentational';
import { ADDIMAGEICON, CANCELEDIT } from '../../assets/ClothingIcons.tsx';

import { Clothing } from '../../interfaces/Clothing.tsx';

export function ClothingAdder(props: { loggedInUid: string, handleUpdateMade: () => void, handleLoggedInUidUpdate: (uid: string) => void }) {
    const [showAddClothingForm, setShowAddClothingForm] = useState<boolean>(false);
    
    const [clothingType, setClothingType] = useState<string | null>(null);
    const [clothingArticle, setClothingArticle] = useState<string | null>(null);
    const [clothingColour, setClothingColour] = useState<string | null>(null);
    const [clothingWeight, setClothingWeight] = useState<string | null>('Light');
    const [clothingImageUrl, setClothingImageUrl] = useState<string>('');

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const API_URL: string = import.meta.env.VITE_API_URL

    const handleShowAddClothingForm: () => void = () => {
        /**
         * Toggles the display of the add clothing form.
         */
        setShowAddClothingForm(!showAddClothingForm);
    }

    const handleClothingTypeChange: (e: React.ChangeEvent<HTMLInputElement>) => void = (e: React.ChangeEvent<HTMLInputElement>) => {
        /**
         * Updates the clothing type state.
         */
        setClothingType(e.target.value);
    }

    const handleClothingArticleChange: (e: React.ChangeEvent<HTMLInputElement>) => void = (e: React.ChangeEvent<HTMLInputElement>) => {
        /**
         * Updates the clothing article state.
         */
        setClothingArticle(e.target.value);
    }

    const handleClothingColourChange: (e: React.ChangeEvent<HTMLInputElement>) => void = (e: React.ChangeEvent<HTMLInputElement>) => {
        /**
         * Update the clothing colour state.
         */
        setClothingColour(e.target.value);
    }

    const handleClothingWeightChange: (e: React.ChangeEvent<HTMLSelectElement>) => void = (e: React.ChangeEvent<HTMLSelectElement>) => {
        /**
         * Updates the clothing weight state.
         */
        setClothingWeight(e.target.value);
    }

    const handleImageUpload: () => void = () => {
        /**
         * Opens the Cloudinary widget to upload an image and stores the returned hosted URL.
         */
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        window.cloudinary.openUploadWidget(
            { cloud_name: 'wooprojects', upload_preset: 'op_newimg' },
            (error: {error: string}, result: {event: string, info: {secure_url: string}}) => {
              if (!error && result && result.event === "success") {
                const imageUrl: string = result.info.secure_url;
                setClothingImageUrl(imageUrl);
            }
            }).open();
    }

    const generateUploadButton: () => JSX.Element = () => {
        /**
         * Generates the upload button for the clothing image.
         */
        return (
            <>
                <button className="sec-btn" onClick={handleImageUpload} >                        
                    {ADDIMAGEICON} Upload
                </button>
                {clothingImageUrl && <span onClick={() => setClothingImageUrl('')}>{CANCELEDIT}</span>}
            </>
        )
    }

    const resetClothingForm: () => void = () => {
        /**
         * Resets the clothing form.
         */
        setClothingType(null);
        setClothingArticle(null);
        setClothingColour(null);
        setClothingWeight(null);
        setClothingImageUrl('');
    }

    const handleAddClothing: () => void = () => {
        /**
         * Adds the clothing to the database.
         */
        if (!props.loggedInUid || !clothingType || !clothingArticle || !clothingColour || !clothingWeight) {
            console.log(clothingType, clothingArticle, clothingColour, clothingWeight)
            alert('Error. Please fill out all required fields.')
            return;
        }

        const clothingToAdd: Clothing = {
            owner: props.loggedInUid,
            type: clothingType,
            article: clothingArticle,
            colour: clothingColour,
            weight: clothingWeight,
            imageUrl: clothingImageUrl,
            isAvailable: true
        }

        axios.post(`${API_URL}/addClothing`, clothingToAdd)
        .then(() => {
            props.handleUpdateMade();
            resetClothingForm();
            setShowAddClothingForm(false);
        })
        .catch(() => {
            alert('Database error. Please try again later.');
        });
    }

    
    return (
        <>
            <button onClick={handleShowAddClothingForm} >{ showAddClothingForm ? 'Cancel' : 'Add Something'}</button>
            { showAddClothingForm &&
                <>
                    <ClothingAdderPresentational 
                        handleClothingTypeChange={handleClothingTypeChange}
                        handleClothingArticleChange={handleClothingArticleChange}
                        handleClothingColourChange={handleClothingColourChange}
                        handleClothingWeightChange={handleClothingWeightChange}
                        handleAddClothing={handleAddClothing}
                        generateUploadButton={generateUploadButton}
                    />
                </> 
            }
        </>
    )
}