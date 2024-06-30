import { ReactElement } from 'react';
import { Outlet } from 'react-router-dom';
import { Header2 } from '../../components/Header2.0/Header2';




export const WorkShop = (): ReactElement => {
	return (
		<div>
			<Header2/>
			<Outlet/>
		</div>
	);
};
