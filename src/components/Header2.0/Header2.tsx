import { ReactElement, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Header2.module.css';
import {
	Avatar,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { toast } from 'react-toastify';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

export const Header2 = (): ReactElement => {
	const nav = useNavigate();
	const [userRole, setUserRole] = useState('');
	const [userData, setUserData] = useState<any>(null);
	const [openDialog, setOpenDialog] = useState(false);
	const [oldPassword, setOldPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');

	useEffect(() => {
		const role = localStorage.getItem('userRole');
		if (role) {
			setUserRole(role);
		}

		const fetchUserData = async () => {
			try {
				const authToken = localStorage.getItem('authToken');
				const userId = localStorage.getItem('userId');
				let endpoint = '';

				if (role === 'Manager') {
					endpoint = `https://localhost:44344/api/Admin/get?adminId=${userId}`;
				} else if (role === 'Staff') {
					endpoint = `https://localhost:44344/api/Instructor/get?instructorId=${userId}`;
				} else if (role === 'Student') {
					endpoint = `https://localhost:44344/api/Student/get?studentId=${userId}`;
				}

				if (endpoint) {
					const response = await fetch(endpoint, {
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${authToken}`,
						},
					});

					if (response.ok) {
						const data = await response.json();
						console.log(data);
						setUserData(data);
					} else {
						console.error('Failed to fetch user data');
					}
				}
			} catch (error) {
				console.error('Error fetching user data:', error);
			}
		};

		if (role) {
			fetchUserData();
		}
	}, []);

	const handleLogout = () => {
		localStorage.removeItem('authToken');
		localStorage.removeItem('userId');
		localStorage.removeItem('userRole');

		nav('/');
		toast.success('Logout successfully');
	};

	const handleDialogClose = () => {
		setOpenDialog(false);
	};

	const handleProfileClick = () => {
		setOpenDialog(true);
	};

	const handleChangePassword = async () => {
		const authToken = localStorage.getItem('authToken');
		const adminId = localStorage.getItem('userId');
		const url = `https://localhost:44344/api/Auth/changePassword?adminId=${adminId}`;

		const body = {
			oldPassword,
			newPassword,
		};

		try {
			const response = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${authToken}`,
				},
				body: JSON.stringify(body),
			});

			if (response.ok) {
				toast.success('Password updated successfully');
				setOpenDialog(false);
			} else {
				const errorData = await response.json();
				toast.error(
					`Error: ${errorData.message || 'Failed to update password'}`
				);
			}
		} catch (error) {
			toast.error(`Error: ${error.message}`);
		}
	};

	return (
		<header className={styles.header}>
			{userRole === 'Manager' ? (
				<Link to={'/homepage'}>
					<img
						src="https://ums.mu.edu.lb/assets/images/logo.png"
						alt="Logo"
						style={{ width: '100px', height: '100px' }}
					/>
				</Link>
			) : (
				<img
					src="https://ums.mu.edu.lb/assets/images/logo.png"
					alt="Logo"
					style={{ width: '100px', height: '100px' }}
				/>
			)}
			<div className={styles.leftnav}>
				<Button onClick={handleLogout}>
					<Avatar sx={{ bgcolor: '#233062',color:"#f3db43" }}>
						<LogoutIcon />
					</Avatar>
				</Button>
				<Button onClick={handleProfileClick}>
					<Avatar sx={{ bgcolor: '#233062',color:"#f3db43" }}>
						<AccountBoxIcon />
					</Avatar>
				</Button>
			</div>
			<Dialog open={openDialog} onClose={handleDialogClose}>
				<DialogTitle>User Profile</DialogTitle>
				<DialogContent>
					{userData && (
						<div>
							{userRole === 'Manager' && (
								<div>
									<TextField
										autoFocus
										margin="dense"
										id="email"
										label="Email"
										type="email"
										fullWidth
										value={userData.email}
										disabled
									/>
								</div>
							)}
							{userRole === 'Student' && (
								<div>
									<TextField
										margin="dense"
										id="firstName"
										label="First Name"
										fullWidth
										value={userData.firstName}
										disabled
									/>
									<TextField
										margin="dense"
										id="middleName"
										label="Middle Name"
										fullWidth
										value={userData.middleName}
										disabled
									/>
									<TextField
										margin="dense"
										id="lastName"
										label="Last Name"
										fullWidth
										value={userData.lastName}
										disabled
									/>
								</div>
							)}
							<TextField
								margin="dense"
								id="oldPassword"
								label="Old Password"
								type="password"
								fullWidth
								value={oldPassword}
								onChange={(e) => setOldPassword(e.target.value)}
							/>
							<TextField
								margin="dense"
								id="newPassword"
								label="New Password"
								type="password"
								fullWidth
								value={newPassword}
								onChange={(e) => setNewPassword(e.target.value)}
							/>
						</div>
					)}
				</DialogContent>
				<DialogActions>
					<Button
						onClick={handleDialogClose}
                        sx={{
							color: '#233062',
							borderColor: '#233062',
							'&:hover': {
                                color:'yellow',
								backgroundColor: '#1b255a',
								borderColor: 'yellow',
							},
						}}>
						Close
					</Button>
					<Button
						onClick={handleChangePassword}
						sx={{
							color: '#233062',
							borderColor: '#233062',
							'&:hover': {
                                color:'yellow',
								backgroundColor: '#1b255a',
								borderColor: 'yellow',
							},
						}}>
						Save Changes
					</Button>
				</DialogActions>
			</Dialog>
		</header>
	);
};
