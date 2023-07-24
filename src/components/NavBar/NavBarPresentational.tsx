import { Link } from 'react-router-dom';

import styles from './NavBar.module.css';

export function NavBarPresentational(props: { currentPage: string, handleSetCurrentPage: (e: React.MouseEvent<HTMLAnchorElement>) => void }) {
    const setCurrentPageAsActive = (page: string) => {
        if (page === props.currentPage) {
            return styles.active;
        } else {
            return '';
        }
    }

    return (
        <>
          <div className={styles.navMenuContainer}>
            <div className={styles.navMenu}>
              <Link to='/' onClick={props.handleSetCurrentPage} data-target-page='home' className={`${setCurrentPageAsActive('home')} ${styles.navItem}`}>
                Picker
              </Link>
              <Link to='/closet' onClick={props.handleSetCurrentPage} data-target-page='closet' className={`${setCurrentPageAsActive('closet')} ${styles.navItem}`}>
                Closet
              </Link>
              <Link to='/about' onClick={props.handleSetCurrentPage} data-target-page='about' className={`${setCurrentPageAsActive('about')} ${styles.navItem}`}>
                About
              </Link>
            </div>
          </div>
        </>
    )
}