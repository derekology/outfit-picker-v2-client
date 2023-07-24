import { useState } from 'react';
import axios from 'axios';
import firebase from 'firebase/compat/app';

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

    const handleShowAddClothingForm = () => {
        setShowAddClothingForm(!showAddClothingForm);
    }

    const handleClothingTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setClothingType(e.target.value);
    }

    const handleClothingArticleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setClothingArticle(e.target.value);
    }

    const handleClothingColourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setClothingColour(e.target.value);
    }

    const handleClothingWeightChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setClothingWeight(e.target.value);
    }

    const handleImageUpload = () => {
        window.cloudinary.openUploadWidget(
            { cloud_name: 'wooprojects', upload_preset: 'op_newimg' },
            (error: any, result: any) => {
              if (!error && result && result.event === "success") {
                const imageUrl: string = result.info.secure_url;
                setClothingImageUrl(imageUrl);
            }
            }).open();
    }

    const generateUploadButton = () => {
        return (
            <>
                <button className="sec-btn" onClick={handleImageUpload} >                        
                    {ADDIMAGEICON} Upload
                </button>
                {clothingImageUrl && <span onClick={() => setClothingImageUrl('')}>{CANCELEDIT}</span>}
            </>
        )
    }

    const resetClothingForm = () => {
        setClothingType(null);
        setClothingArticle(null);
        setClothingColour(null);
        setClothingWeight(null);
        setClothingImageUrl('');
    }

    const handleAddClothing = () => {
        if (!props.loggedInUid || !clothingType || !clothingArticle || !clothingColour || !clothingWeight) {
            console.log(clothingType, clothingArticle, clothingColour, clothingWeight)
            alert('Error. Please fill out all required fields.');
            return;
        };

        const clothingToAdd: Clothing = {
            owner: props.loggedInUid,
            type: clothingType,
            article: clothingArticle,
            colour: clothingColour,
            weight: clothingWeight,
            imageUrl: clothingImageUrl,
            isAvailable: true
        }

        axios.post(`${import.meta.env.VITE_API_URL}/addClothing`, clothingToAdd)
        .then(() => {
            props.handleUpdateMade();
            resetClothingForm();
            setShowAddClothingForm(false);
        })
        .catch(() => {
            alert('Database error. Please try again later.');
        });
    }

    const handleLogOut = () => {
        firebase.auth().signOut()
        .then(() => {
            props.handleLoggedInUidUpdate('demo');
        })
        .catch(() => {
            alert('Error logging out. Please try again later.');
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
                        handleLogOut={handleLogOut}
                    />
                </> 
            }
        </>
    )
}