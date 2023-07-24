import { useEffect } from 'react';
import * as firebaseui from 'firebaseui';
import firebase from 'firebase/compat/app';

import 'firebaseui/dist/firebaseui.css';
import './AuthenticationManager.css'

export function AuthenticationManager() {
    useEffect(() => {
        const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth());
        ui.start('#firebaseui-auth-container', {
            signInOptions: [
                {
                    provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
                    requireDisplayName: false
                },
                {
                    provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                    requireDisplayName: false
                },
                {
                    provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
                    requireDisplayName: false
                },
            ],
        });
    }, []);

    return (<></>)
}