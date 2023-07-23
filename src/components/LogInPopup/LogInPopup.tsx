import { useState } from 'react'

import { LoginPopupPresentational } from './LogInPopupPresentational';

export function LoginPopup() {
    const [showLoginForm, setShowLoginForm] = useState<boolean>(false);

    const handleShowLoginFormClick = () => {
        setShowLoginForm(!showLoginForm);
    }

    return (
        <>
            <LoginPopupPresentational showLoginForm={showLoginForm} handleShowLoginFormClick={handleShowLoginFormClick} />
        </>
    )
}