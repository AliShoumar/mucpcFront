import {
	Avatar,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Typography,
} from '@mui/material';
import React, { ReactElement } from 'react';
import QRCode from 'react-qr-code';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';

interface props {
	value: string;
}

export const QrCode: React.FC<props> = ({ value }): ReactElement => {
	return (
		<List>
			<ListItem alignItems="flex-start">
				<ListItemAvatar>
					<Avatar>
						<ImportContactsIcon />
					</Avatar>
				</ListItemAvatar>
				<ListItemText
					primary={'QrCode'}
					secondary={
						value != null ? (
							<React.Fragment>
								<div
									style={{
										width: '100%',
										display: 'flex',
										flexDirection: 'row',
										alignItems: 'center',
										justifyContent: 'start',
										margin: '1rem 0.3rem',
									}}>
									<Typography
										sx={{ display: 'inline' }}
										component="span"
										variant="body2"
										color="text.primary">
										<div
											style={{
												height: 'auto',
												margin: '0 auto',
												maxWidth: 140,
												width: '100%',
											}}>
											<QRCode
												size={256}
												style={{
													height: 'auto',
													maxWidth: '100%',
													width: '100%',
												}}
												value={value}
												viewBox={`0 0 256 256`}
											/>
										</div>
									</Typography>
								</div>
							</React.Fragment>
						) : (
							<Typography>No QrCode Available</Typography>
						)
					}
				/>
			</ListItem>
		</List>
	);
};
