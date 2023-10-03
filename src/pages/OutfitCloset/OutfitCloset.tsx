import { useState } from 'react';
import firebase from 'firebase/compat/app';
import { Helmet } from "react-helmet";

import { LoginPopup } from '../../components/LogInPopup/LogInPopup';
import { ClothingAdder } from '../../components/ClothingAdder/ClothingAdder';
import { ClothingDisplay } from '../../components/ClothingDisplay/ClothingDisplay';

import styles from './OutfitCloset.module.css';

export function OutfitCloset(props: { loggedInUid: string, setLoggedInUid: (uid: string) => void }) {
    const [updateMade, setUpdateMade] = useState<boolean>(false);

    const handleUpdateMade = () => {
        /**
         * Raises a flag when an update is made, or lower it when a pending update is handled.
         */
        setUpdateMade(!updateMade);
    }

    const handleLoggedInUidUpdate = (uid: string) => {
        /**
         * Sets logged in id to id of logged in user.
         */
        props.setLoggedInUid(uid);
    }

    const handleLogOut = () => {
        /**
         * Sets logged in id to default when user logs out.
         */
        firebase.auth().signOut()
        .then(() => {
            handleLoggedInUidUpdate('demo');
        })
        .catch(() => {
            alert('Error logging out. Please try again later.');
        });
    }

    return (
        <>  
            <Helmet>
                <meta charSet="utf-8" />
                <title>Closet | Outfit Picker</title>
                <link rel="canonical" href="http://outfitpicker.wooprojects.com/closet" />
            </Helmet>
            { props.loggedInUid === 'demo' ? <LoginPopup /> : 
                <>
                    <ClothingAdder loggedInUid={props.loggedInUid} handleUpdateMade={handleUpdateMade} handleLoggedInUidUpdate={handleLoggedInUidUpdate} />
                    <span className={styles.logOutLink} onClick={handleLogOut}>Log Out</span>
                </>
                }
            <ClothingDisplay loggedInUid={props.loggedInUid} updateMade={updateMade} />
        </>
    )
}