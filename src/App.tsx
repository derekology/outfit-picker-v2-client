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
  export interface Window{
    cloudinary: any;
  }
}

firebase.initializeApp(firebaseConfig)

function App() {
  const [loggedInUid, setLoggedInUid] = useState<string>('demo');
  const [currentPage, setCurrentPage] = useState<string>('');
  const [databaseConnectionStatus, setDatabaseConnectionStatus] = useState<boolean>(false);

  const checkDatabaseConnection = async () => {
    let tryCount = 0;
    const maxTries = 10 * 60;
    const testUrl = `${import.meta.env.VITE_API_URL}/connectionCheck`;

    while (!databaseConnectionStatus && tryCount < maxTries) {
      await axios.get(testUrl)
      .then((res) => {
        if (res.status === 200) {
          setDatabaseConnectionStatus(true);
          tryCount = 5;
        } else {
          tryCount++;
          console.log("Unknown error connecting to database.");
          setTimeout(() => {null}, 1000);
        }
      })
      .catch(() => {
        tryCount++
        tryCount % 10 === 0 && console.log('Waiting for database connection...');
        setTimeout(() => {null}, 1000);
      });
    }
  };

  const getPageUrl = () => {
    const currentURL = window.location.href;
    const path = currentURL.replace(window.location.origin, '');
    const sections = path.split('/');
    const filteredSections = sections.filter(section => section !== '');

    return filteredSections[0]
  };

  const handleSetCurrentPage = (page: React.MouseEvent<any>) => {
    const targetPage: string = page.currentTarget.dataset.targetPage;
    targetPage ? setCurrentPage(targetPage) : setCurrentPage(getPageUrl());
  };
  
  useEffect(() => {
    const page = getPageUrl();

    if (['closet', 'about'].includes(page)) {
      setCurrentPage(page);
    } else if (!page) {
      setCurrentPage('home');
    }
  }, []);

  useEffect(() => {
    onAuthStateChanged(firebase.auth() as any, (user) => {
        if (user) {
            setLoggedInUid(user.uid);
        }
    });
  }, []);

  useEffect(() => {
    checkDatabaseConnection();
  }, []);

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
