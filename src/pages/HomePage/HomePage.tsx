import { ReactElement } from 'react';
import Directory from '../../components/directory/directory.component';
import { createTheme, useMediaQuery } from '@mui/material';

export const HomePage = (): ReactElement => {

	const theme = createTheme({
		breakpoints: {
			values: {
				xs: 0,
				sm: 600,
				md: 960,
				lg: 1280,
				xl: 1920,
			},
		},
	});
	const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

	

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				padding: isSmallScreen? '': '20px 80px',
			}}
			className="homepage">
			<Directory />
		</div>
	);
};
