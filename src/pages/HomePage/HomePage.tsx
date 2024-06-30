import { ReactElement } from 'react';
import Directory from '../../components/directory/directory.component';

export const HomePage = (): ReactElement => {
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				padding: '20px 80px',
			}}
			className="homepage">
			<Directory />
		</div>
	);
};
