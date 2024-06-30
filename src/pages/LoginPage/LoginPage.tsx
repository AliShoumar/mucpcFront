import { ReactElement } from 'react';
import {AppNav} from './../../components/AppNav/AppNav';
import styles from './LoginPage.module.css';
import { Outlet } from 'react-router-dom';

export const LoginPage = (): ReactElement => {
	return (
		<main className={styles.login_page}>
			 <div>
      <img 
        src="https://ums.mu.edu.lb/assets/images/logo.png" 
        alt="Logo" 
        style={{ width: '160px', height: '160px' }} 
      />
    </div>
			<div className={styles.container}>
				<AppNav/>
				<Outlet/>
			</div>
		</main>
	);
};
