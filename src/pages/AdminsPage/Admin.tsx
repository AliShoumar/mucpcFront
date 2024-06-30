import React, { useState, useEffect } from 'react';
import {
	Table,
	TableContainer,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	Button,
	Modal,
	TextField,
	Box,
	createTheme,
	useMediaQuery,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
} from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Header2 } from '../../components/Header2.0/Header2';

export const Admin = () => {
	const [adminData, setAdminData] = useState([]);
	const [roles, setRoles] = useState([]);
	const [editAdminId, setEditAdminId] = useState(null);
	const [newEmail, setNewEmail] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [newStudentPassword, setNewStudentPassword] = useState('');
	const [open, setOpen] = useState(false);
	const [newAdminOpen, setNewAdminOpen] = useState(false);
	const [selectedRole, setSelectedRole] = useState('Admin');
	const [studentData, setStudentData] = useState([]);
	const [studentId, setStudentId] = useState('');

	const [firstName, setFirstName] = useState('');
	const [middleName, setMiddleName] = useState('');
	const [lastName, setLastName] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [major, setMajor] = useState('');
	const [faculty, setFaculty] = useState('');
	const authToken = localStorage.getItem('authToken');

	useEffect(() => {
		if (selectedRole == 'Admin') {
			fetchData();
			fetchRoles();
		} else if (selectedRole == 'Student') {
			fetchStudentData();
		}
	}, [selectedRole]);

	const fetchData = async () => {
		try {
			const response = await fetch('https://localhost:44344/api/Admin/getall', {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${authToken}`,
				},
			});
			const data = await response.json();
			setAdminData(data);
		} catch (error) {
			console.error('Error fetching admin data:', error);
			toast.error('Failed to fetch admin data.');
		}
	};

	const fetchStudentData = async () => {
		try {
			const response = await fetch(
				'https://localhost:44344/api/Student/getall',
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${authToken}`,
					},
				}
			);
			const data = await response.json();
			setStudentData(data);
		} catch (error) {
			console.error('Error fetching student data:', error);
			toast.error('Failed to fetch student data.');
		}
	};

	const fetchRoles = async () => {
		try {
			const response = await fetch('https://localhost:44344/api/Role/getall', {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${authToken}`,
				},
			});
			const data = await response.json();
			setRoles(data);
		} catch (error) {
			console.error('Error fetching roles:', error);
			toast.error('Failed to fetch roles.');
		}
	};

	useEffect(() => {
		if (editAdminId !== null) {
			setOpen(true);
		}
	}, [editAdminId]);

	const getRoleName = (roleId) => {
		const role = roles.find((role) => role.id === roleId);
		return role ? role.roleName : 'Unknown';
	};

	const handleEdit = (adminId) => {
		setEditAdminId(adminId);
	};

	const handleClose = () => {
		setEditAdminId(null);
		setOpen(false);
		setNewEmail('');
		setNewPassword('');
	};
	const handleStudentClose = () => {
		setOpen(false);
		setNewStudentPassword('');
	};

	const handleStudentEdit = (id) => {
		setOpen(true);
		setStudentId(id);
	};
	const handleStudentUpdate = async () => {
		console.log({ studentId, newStudentPassword });
		try {
			const response = await fetch(
				`https://localhost:44344/api/Auth/resetPassword?userId=${studentId}&newPassword=${newStudentPassword}`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',

						Authorization: `Bearer ${authToken}`,
					},
				}
			);
			if (response.ok) {
				toast.success('Password updated successfully.');
			} else {
				console.error('Failed to update password.');
				toast.error('Failed to update password.');
			}
			handleStudentClose();
		} catch (error) {
			console.error('Error updating password:', error);
			toast.error('Error updating password.');
		}
	};

	const handleUpdate = async () => {
		try {
			const passwordRegex =
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

			if (!passwordRegex.test(newPassword)) {
				toast.error(
					'Password must have at least one uppercase letter, one lowercase letter, one digit, one special character, and be at least 8 characters long.'
				);
				return;
			}

			console.log({ editAdminId, newPassword });
			const response = await fetch(
				`https://localhost:44344/api/Auth/resetPassword?userId=${editAdminId}&newPassword=${newPassword}`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${authToken}`,
					},
				}
			);
			if (response.ok) {
				toast.success('Password updated successfully.');
			} else {
				const errorMessage = await response.text();
				console.error('Error response:', errorMessage);
				toast.error('Failed to update password. Please try again later.');
			}
			handleClose();
		} catch (error) {
			console.error('Error updating password:', error);
			toast.error(
				'An error occurred while updating the password. Please try again later.'
			);
		}
	};

	const handleDeleteStudent = async (studentId) => {
		try {
			const response = await fetch(
				`https://localhost:44344/api/Student/delete?studentId=${studentId}`,
				{
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${authToken}`,
					},
				}
			);
			if (response.ok) {
				fetchStudentData();
				toast.success('Student deleted successfully.');
			} else {
				console.error('Failed to delete admin.');
				toast.error('Failed to delete admin.');
			}
		} catch (error) {
			console.error('Error deleting admin:', error);
			toast.error('Error deleting admin.');
		}
	};
	const handleDelete = async (adminId) => {
		try {
			const response = await fetch(
				`https://localhost:44344/api/Admin/delete?adminId=${adminId}`,
				{
					method: 'DELETE',

					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${authToken}`,
					},
				}
			);
			if (response.ok) {
				setAdminData((prevAdminData) =>
					prevAdminData.filter((admin) => admin.id !== adminId)
				);
				toast.success('Admin deleted successfully.');
			} else {
				console.error('Failed to delete admin.');
				toast.error('Failed to delete admin.');
			}
		} catch (error) {
			console.error('Error deleting admin:', error);
			toast.error('Error deleting admin.');
		}
	};

	const handleCreateAdmin = () => {
		setNewAdminOpen(true);
	};
	const handleCreateStudent = () => {
		setNewAdminOpen(true);
	};

	const handleCreateAdminClose = () => {
		setNewAdminOpen(false);
		setNewEmail('');
		setNewPassword('');
	};

	const handleCreateAdminSubmit = async () => {
		try {
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!emailRegex.test(newEmail)) {
				toast.error('Please enter a valid email address.');
				return;
			}

			const passwordRegex =
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
			if (!passwordRegex.test(newPassword)) {
				toast.error(
					'Password must have at least one uppercase letter, one lowercase letter, one digit, and one special character.'
				);
				return;
			}
			const response = await fetch('https://localhost:44344/api/Admin/create', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',

					Authorization: `Bearer ${authToken}`,
				},
				body: JSON.stringify({
					email: newEmail,
					password: newPassword,
					roleId: 1,
				}),
			});
			if (response.ok) {
				fetchData();
				toast.success('Admin created successfully.');
				setNewAdminOpen(false);
			} else {
				console.error('Failed to create admin.');
				toast.error('Failed to create admin.');
			}
		} catch (error) {
			console.error('Error creating admin:', error);
			toast.error('Error creating admin.');
		}
	};
	const handleStudentCreate = async () => {
		try {
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!emailRegex.test(newEmail)) {
				toast.error('Please enter a valid email address.');
				return;
			}

			const passwordRegex =
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
			if (!passwordRegex.test(newPassword)) {
				toast.error(
					'Password must have at least one uppercase letter, one lowercase letter, one digit, and one special character.'
				);
				return;
			}

			const response = await fetch(
				'https://localhost:44344/api/Student/create',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',

						Authorization: `Bearer ${authToken}`,
					},
					body: JSON.stringify({
						firstName,
						middleName,
						lastName,
						email: newEmail,
						phoneNumber,
						major,
						faculty,
						password: newPassword,
					}),
				}
			);

			if (response.ok) {
				toast.success('Student created successfully.');
				fetchStudentData();
				setNewAdminOpen(false);
			} else {
				console.error('Failed to create student.');
				toast.error('Failed to create student.');
			}
		} catch (error) {
			console.error('Error creating student:', error);
			toast.error('Error creating student.');
		}
	};

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
		<div>
			<Header2 />

			<div
				style={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'end',
					marginTop: '15px',
					marginBottom: '15px',
				}}>
				{/* <FormControl style={{ marginRight: '15px' }}>
					<InputLabel id="role-select-label">Role</InputLabel>
					<Select
						labelId="role-select-label"
						id="role-select"
						value={selectedRole}
						onChange={(e) => setSelectedRole(e.target.value)}
						label="Role">
						<MenuItem value="Admin">Admin</MenuItem>
						<MenuItem value="Student">Student</MenuItem>
					</Select>
				</FormControl> */}
				{selectedRole === 'Admin' && (
					<Button
						variant="contained"
						sx={{
							color: '#f3db43',
							backgroundColor: '#233062',
							'&:hover': {
								backgroundColor: '#1b255a',
							},
							marginRight: 2,
						}}
						onClick={handleCreateAdmin}>
						Create Admin
					</Button>
				)}
				{selectedRole === 'Student' && (
					<Button
						variant="contained"
						color="primary"
						onClick={handleCreateStudent}>
						Create Student
					</Button>
				)}
			</div>

			{selectedRole == 'Admin' && (
				<>
					<TableContainer>
						<Table>
							<TableHead>
								<TableRow>
									{isSmallScreen ? null : (
										<>
											<TableCell>ID</TableCell>
										</>
									)}

									<TableCell>Email</TableCell>
									{isSmallScreen ? null : (
										<>
											<TableCell>Password</TableCell>
											<TableCell>Role</TableCell>
										</>
									)}

									<TableCell>Reset</TableCell>
									<TableCell>Delete</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{adminData.map((admin) => (
									<TableRow key={admin.id}>
										{isSmallScreen ? null : (
											<>
												<TableCell>{admin.id}</TableCell>
											</>
										)}

										<TableCell>{admin.email}</TableCell>
										{isSmallScreen ? null : (
											<>
												<TableCell>*****</TableCell>
												<TableCell>{getRoleName(admin.roleId)}</TableCell>
											</>
										)}

										<TableCell>
											<Button
												variant="contained"
												sx={{
													color: '#f3db43',
													backgroundColor: '#233062',
													'&:hover': {
														backgroundColor: '#1b255a',
													},
												}}
												onClick={() => handleEdit(admin.id)}>
												Reset
											</Button>
										</TableCell>
										<TableCell>
											<Button
												variant="contained"
												color="error"
												onClick={() => handleDelete(admin.id)}>
												Delete
											</Button>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
					<Modal open={open} onClose={handleClose}>
						<Box
							sx={{
								position: 'absolute',
								top: '50%',
								left: '50%',
								transform: 'translate(-50%, -50%)',
								bgcolor: 'background.paper',
								boxShadow: 24,
								p: 4,
								width: 400,
							}}>
							<TextField
								label="Reset Password"
								fullWidth
								value={newPassword}
								onChange={(e) => setNewPassword(e.target.value)}
								margin="normal"
							/>
							<Button
								variant="contained"
								sx={{
									color: '#f3db43',
									backgroundColor: '#233062',
									'&:hover': {
										backgroundColor: '#1b255a',
									},
									marginRight: 2,
								}}
								onClick={handleUpdate}>
								Update
							</Button>
							<Button
								variant="contained"
								sx={{
									color: '#f3db43',
									backgroundColor: '#233062',
									'&:hover': {
										backgroundColor: '#1b255a',
									},
									marginRight: 2,
								}}
								onClick={handleClose}>
								Cancel
							</Button>
						</Box>
					</Modal>
					<Modal open={newAdminOpen} onClose={handleCreateAdminClose}>
						<Box
							sx={{
								position: 'absolute',
								top: '50%',
								left: '50%',
								transform: 'translate(-50%, -50%)',
								bgcolor: 'background.paper',
								boxShadow: 24,
								p: 4,
								width: 400,
							}}>
							<TextField
								label="Email"
								fullWidth
								value={newEmail}
								onChange={(e) => setNewEmail(e.target.value)}
								margin="normal"
							/>
							<TextField
								label="Password"
								fullWidth
								value={newPassword}
								onChange={(e) => setNewPassword(e.target.value)}
								margin="normal"
							/>
							<Button
								variant="contained"
								sx={{
									color: '#f3db43',
									backgroundColor: '#233062',
									'&:hover': {
										backgroundColor: '#1b255a',
									},
									marginRight: 2,
								}}
								onClick={handleCreateAdminSubmit}>
								Create Admin
							</Button>
							<Button
								variant="contained"
								sx={{
									color: '#f3db43',
									backgroundColor: '#233062',
									'&:hover': {
										backgroundColor: '#1b255a',
									},
									marginRight: 2,
								}}
								onClick={handleCreateAdminClose}>
								Cancel
							</Button>
						</Box>
					</Modal>
				</>
			)}

			{selectedRole == 'Student' && (
				<>
					<TableContainer>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell>ID</TableCell>
									<TableCell>Email</TableCell>
									<TableCell>First Name</TableCell>
									<TableCell>Middle Name</TableCell>
									<TableCell>Last Name</TableCell>
									<TableCell>Reset</TableCell>
									<TableCell>Delete</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{studentData.map((student) => (
									<TableRow key={student.userId}>
										<TableCell>{student.userId}</TableCell>
										<TableCell>{student.user.email}</TableCell>
										<TableCell>{student.firstName}</TableCell>
										<TableCell>{student.middleName}</TableCell>
										<TableCell>{student.lastName}</TableCell>
										<TableCell>
											<Button
												variant="contained"
												color="primary"
												onClick={() => handleStudentEdit(student.userId)}>
												Reset
											</Button>
										</TableCell>
										<TableCell>
											<Button
												variant="contained"
												color="error"
												onClick={() => handleDeleteStudent(student.userId)}>
												Delete
											</Button>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>

					<Modal open={open} onClose={handleStudentClose}>
						<Box
							sx={{
								position: 'absolute',
								top: '50%',
								left: '50%',
								transform: 'translate(-50%, -50%)',
								bgcolor: 'background.paper',
								boxShadow: 24,
								p: 4,
								width: 400,
							}}>
							<TextField
								label="Reset Password"
								fullWidth
								value={newStudentPassword}
								onChange={(e) => setNewStudentPassword(e.target.value)}
								margin="normal"
							/>
							<Button
								variant="contained"
								color="primary"
								onClick={handleStudentUpdate}>
								Update
							</Button>
							<Button variant="contained" onClick={handleStudentClose}>
								Cancel
							</Button>
						</Box>
					</Modal>
					<Modal open={newAdminOpen} onClose={handleCreateAdminClose}>
						<Box
							sx={{
								position: 'absolute',
								top: '50%',
								left: '50%',
								transform: 'translate(-50%, -50%)',
								bgcolor: 'background.paper',
								boxShadow: 24,
								p: 4,
								width: 400,
							}}>
							<TextField
								label="First Name"
								fullWidth
								value={firstName}
								onChange={(e) => setFirstName(e.target.value)}
								margin="normal"
							/>
							<TextField
								label="Middle Name"
								fullWidth
								value={middleName}
								onChange={(e) => setMiddleName(e.target.value)}
								margin="normal"
							/>
							<TextField
								label="Last Name"
								fullWidth
								value={lastName}
								onChange={(e) => setLastName(e.target.value)}
								margin="normal"
							/>
							<TextField
								label="Email"
								fullWidth
								value={newEmail}
								onChange={(e) => setNewEmail(e.target.value)}
								margin="normal"
							/>
							<TextField
								label="Phone Number"
								fullWidth
								value={phoneNumber}
								onChange={(e) => setPhoneNumber(e.target.value)}
								margin="normal"
							/>
							<TextField
								label="Major"
								fullWidth
								value={major}
								onChange={(e) => setMajor(e.target.value)}
								margin="normal"
							/>
							<TextField
								label="Faculty"
								fullWidth
								value={faculty}
								onChange={(e) => setFaculty(e.target.value)}
								margin="normal"
							/>
							<TextField
								label="Password"
								fullWidth
								type="password"
								value={newPassword}
								onChange={(e) => setNewPassword(e.target.value)}
								margin="normal"
							/>
							<Button
								variant="contained"
								color="primary"
								onClick={handleStudentCreate}>
								Create Student
							</Button>
							<Button variant="contained" onClick={handleCreateAdminClose}>
								Cancel
							</Button>
						</Box>
					</Modal>
				</>
			)}
		</div>
	);
};
