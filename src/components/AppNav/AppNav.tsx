import { ReactElement } from "react";
import {NavLink} from 'react-router-dom';
import styles from './AppNav.module.css';

export const AppNav =():ReactElement =>{
    return <nav className={styles.nav}>
        <ul>
           <li>
            <NavLink to={'/login'}>LogIn</NavLink>
           </li>
           <li>
            <NavLink to={'/signup'}>SignUp</NavLink>
           </li>
        </ul>
    </nav>
}