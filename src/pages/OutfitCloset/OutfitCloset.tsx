import { useState } from 'react';

import { LoginPopup } from '../../components/LogInPopup/LogInPopup';
import { ClothingAdder } from '../../components/ClothingAdder/ClothingAdder';
import { ClothingDisplay } from '../../components/ClothingDisplay/ClothingDisplay';

export function OutfitCloset(props: { loggedInUid: string, setLoggedInUid: (uid: string) => void }) {
    const [updateMade, setUpdateMade] = useState<boolean>(false);

    const handleUpdateMade = () => {
        setUpdateMade(!updateMade);
    }

    const handleLoggedInUidUpdate = (uid: string) => {
        props.setLoggedInUid(uid);
    }

    return (
        <>  
            { props.loggedInUid === 'demo' ? <LoginPopup /> : <ClothingAdder loggedInUid={props.loggedInUid} handleUpdateMade={handleUpdateMade} handleLoggedInUidUpdate={handleLoggedInUidUpdate} /> }
            <ClothingDisplay loggedInUid={props.loggedInUid} updateMade={updateMade} />
        </>
    )
}