import { AuthenticationManager } from '../../components/LogInPopup/AuthenticationManager';

export function LoginPopup() {
    return (
        <>
            <span id='logInTitle'>Log in / Sign up</span>
            <div className='toggled-form'>
                <span id='firebaseui-auth-container'></span>
                <AuthenticationManager />
            </div>
        </>
    )
}