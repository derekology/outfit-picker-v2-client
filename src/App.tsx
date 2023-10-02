import { useState, useEffect } from 'react';
import { NavBar } from './components/NavBar/NavBar';
import { Routes, Route, Navigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import { onAuthStateChanged } from 'firebase/auth';
import axios from 'axios';

import { OutfitPicker } from './pages/OutfitPicker/OutfitPicker';
import { OutfitCloset } from './pages/OutfitCloset/OutfitCloset';
import { AboutPage } from './pages/AboutPage/AboutPage';
import { LoadingSpinner } from './components/LoadingSpinner/LoadingSpinner';

import { firebaseConfig } from './firebaseConfig';
import './App.css'

declare global {
  export interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cloudinary: any;
  }
}

firebase.initializeApp(firebaseConfig)

function App() {
  const [loggedInUid, setLoggedInUid] = useState<string>('demo');
  const [currentPage, setCurrentPage] = useState<string>('');
  const [databaseConnectionStatus, setDatabaseConnectionStatus] = useState<boolean>(false);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const API_URL: string = import.meta.env.VITE_API_URL;

  const getPageUrl: () => string = () => {
    /**
     * Returns the current page slug based on the URL.
     * 
     * @returns The current page slug
     */
    const currentURL = window.location.href;
    const path = currentURL.replace(window.location.origin, '');
    const sections = path.split('/');
    const filteredSections = sections.filter(section => section !== '');

    return filteredSections[0]
  };

  const handleSetCurrentPage: (page: React.MouseEvent<HTMLAnchorElement>) => void = (page: React.MouseEvent<HTMLAnchorElement>) => {
    /**
     * Sets the current page slug based on the clicked link.
     * 
     * @param page - The clicked link
     */
    const targetPage: string = page.currentTarget.dataset.targetPage ? page.currentTarget.dataset.targetPage : '';
    targetPage ? setCurrentPage(targetPage) : setCurrentPage(getPageUrl());
  };
  
  useEffect(() => {
    /**
     * Sets the current active page based on the URL.
     */
    const page: string = getPageUrl();

    if (['closet', 'about'].includes(page)) {
      setCurrentPage(page);
    } else if (!page) {
      setCurrentPage('home');
    }
  }, []);

  useEffect(() => {
    /**
     * Sets the logged in user ID based on the Firebase auth state.
     */
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any
    onAuthStateChanged(firebase.auth() as any, (user) => {
        if (user) {
            setLoggedInUid(user.uid);
        }
    });
  }, []);

  useEffect(() => {
    /**
     * Checks the database connection status.
     */
    const checkDatabaseConnection = async () => {
      let tryCount = 0;
      const maxTries = 10 * 60;
      const testUrl = `${API_URL}/connectionCheck`;
    
      while (!databaseConnectionStatus && tryCount < maxTries) {
        try {
          const res = await axios.get(testUrl);
          if (res.status === 200) {
            setDatabaseConnectionStatus(true);
            tryCount = maxTries;
            break;
          } else {
            tryCount++;
            console.log("Waiting for database connection...");
            await new Promise(resolve => setTimeout(resolve, 1000));
          }
        } catch (error) {
          tryCount++;
          if (tryCount % 10 === 0) {
            console.log('Waiting for database connection...');
          }
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
    };    

    checkDatabaseConnection().catch((err) => console.log(err));
  }, [API_URL, databaseConnectionStatus]);

  return (
    <>
    <NavBar currentPage={currentPage} handleSetCurrentPage={handleSetCurrentPage} />
    { !databaseConnectionStatus ? <LoadingSpinner /> :
      <div className="routeContent">
        <Routes>
          <Route path="/" element={ <OutfitPicker loggedInUid={loggedInUid} handleSetCurrentPage={handleSetCurrentPage} /> } />
          <Route path="/closet" element={ <OutfitCloset loggedInUid={loggedInUid} setLoggedInUid={setLoggedInUid} /> } />
          <Route path="/about" element={ <AboutPage /> } />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
      }
    </>
  )
}

export default App;
