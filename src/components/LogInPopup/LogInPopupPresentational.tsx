import { AuthenticationManager } from '../../components/LogInPopup/AuthenticationManager';

export function LoginPopupPresentational(props: { showLoginForm: boolean, handleShowLoginFormClick: () => void }) {
    return (
        <>
            <button onClick={props.handleShowLoginFormClick}>{props.showLoginForm ? 'Cancel' : 'Log in / Sign up'}</button>
            {props.showLoginForm &&
                <>
                    <div className='toggled-form'>
                        <span id='firebaseui-auth-container'></span>
                        <AuthenticationManager />
                    </div>
                </>
            }
        </>
    )
}