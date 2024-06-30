import { Typography } from "@mui/material";
import { ReactElement } from "react";
import { Link } from "react-router-dom";
import styles from './Header.module.css';

export const Header = ():ReactElement =>{

    return <header className={styles.header}>
        <div className={styles.logo_container}>
            <Typography  className={styles.logo}>
                MUCPC
            </Typography>
        </div>

        <nav className={styles.nav}>
            <ul className={styles.main_nav}>
                <li>
                     <Link to={'/workshop'}>WorkShops</Link>
                </li>
                <li>
                     <Link to={'/instructors'}>Instructors</Link>
                </li>
                <li>
                     <Link to={'/students'}>Students</Link>
                </li>
            </ul>
        </nav>
    </header>
}