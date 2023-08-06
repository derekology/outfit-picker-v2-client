import { useEffect } from 'react';
import * as firebaseui from 'firebaseui';
import firebase from 'firebase/compat/app';

import 'firebaseui/dist/firebaseui.css';
import './AuthenticationManager.css'

export function AuthenticationManager() {
    useEffect(() => {
        /**
         * Initializes the FirebaseUI authentication widget in the appropriate container.
         */
        const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth());
        const container = '#firebaseui-auth-container';
        ui.start(container, {
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