import React, { useState, useEffect } from 'react';
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	TextField,
	Box,
	useMediaQuery,
	createTheme,
} from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Header2 } from '../../components/Header2.0/Header2';
import { useTheme } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

const apiUrl = 'https://localhost:44344/api/Instructor/';
const updateUrl = 'update';
const deleteUrl = 'delete/?instructorId=';
const createUrl = 'create/';
const workshopUrl = 'getWorkShops?instructorId=';

export const InstructorTable = () => {
	const [data, setData] = useState([]);
	const [selectedInstructor, setSelectedInstructor] = useState(null);
	const [openEditDialog, setOpenEditDialog] = useState(false);
	const [openCreateDialog, setOpenCreateDialog] = useState(false);
	const [openInfoDialog, setOpenInfoDialog] = useState(false);
	const [editedData, setEditedData] = useState({
		id: 0,
		firstName: '',
		middleName: '',
		lastName: '',
		phoneNumber: '',
		email: '',
		address: '',
		yearsOfExpertise: 0,
		major: '',
		degreeLevel: '',
		workShops: [
			{
				id: 0,
				number: 'string',
				semester: 'string',
				acedemicYear: 0,
				title: 'string',
				description: 'string',
				numberOfHours: 0,
				targetedFaculties: 'string',
				price: 0,
				duration: 'string',
				objectives: 'string',
				deliveryType: 'string',
				dateAndTime: '2024-05-14T03:00:28.196Z',
				speaker: 'string',
				organizedBy: 'string',
				registrationLink: 'string',
				maxNumberOfAttendees: 0,
				rating: 0,
				instructorId: 0,
			},
		],
	});
	const [error, setError] = useState(null);
	const [workshops, setWorkshops] = useState([]);

	useEffect(() => {
		fetchData();
	}, []);
	const token = localStorage.getItem('authToken');
	const fetchData = async () => {
		try {
			const response = await fetch(apiUrl + 'getall', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			if (!response.ok) {
				throw new Error('Failed to fetch data');
			}
			const data = await response.json();
			setData(data);
		} catch (error) {
			setError(error);
			toast.error('Failed to fetch data');
		}
	};

	const handleEditDialogClose = () => {
		setOpenEditDialog(false);
	};

	const handleCreateDialogClose = () => {
		setOpenCreateDialog(false);
	};

	const handleInfoDialogClose = () => {
		setOpenInfoDialog(false);
	};

	const openInfoDialogFunc = (instructor) => {
		setEditedData(instructor);
		setOpenInfoDialog(true);
	};

	const handleRowClick = (instructor) => {
		setSelectedInstructor(instructor);
		openInfoDialogFunc(instructor);
	};

	const handleEditClick = (instructor) => {
		setEditedData(instructor);
		setOpenEditDialog(true);
	};

	const handleDeleteClick = async (instructor) => {
		try {
			const response = await fetch(apiUrl + deleteUrl + instructor.id, {
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			if (!response.ok) {
				throw new Error('Failed to delete data');
			}
			toast.success('Data deleted successfully');

			setData((prevData) =>
				prevData.filter((item) => item.id !== instructor.id)
			);
		} catch (error) {
			console.error('Error deleting data:', error);
			toast.error('Error deleting data');
		}
	};

	const handleSaveEdit = async () => {
		const requestData = {
			...editedData,
			workShops: [
				{
					id: 0,
					number: 'string',
					semester: 'string',
					acedemicYear: 0,
					title: 'string',
					description: 'string',
					numberOfHours: 0,
					targetedFaculties: 'string',
					price: 0,
					duration: 'string',
					objectives: 'string',
					deliveryType: 'string',
					dateAndTime: '2024-05-14T03:00:28.196Z',
					speaker: 'string',
					organizedBy: 'string',
					registrationLink: 'string',
					maxNumberOfAttendees: 0,
					rating: 0,
					isActive: true,
					instructorId: 0,
				},
			],
		};

		console.log(JSON.stringify(requestData));

		try {
			const response = await fetch(apiUrl + updateUrl, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',

					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(requestData),
			});
			if (!response.ok) {
				throw new Error('Failed to update data');
			}
			toast.success('Data updated successfully');
			setOpenEditDialog(false);
			fetchData();
		} catch (error) {
			console.error('Error updating data:', error);
			toast.error('Error updating data');
		}
	};

	const handleCreate = () => {
		setOpenCreateDialog(true);

		setEditedData({
			id: editedData.id,
			firstName: '',
			middleName: '',
			lastName: '',
			phoneNumber: '',
			email: '',
			address: '',
			yearsOfExpertise: 0,
			major: '',
			degreeLevel: '',
			workShops: [
				{
					id: 0,
					number: 'string',
					semester: 'string',
					acedemicYear: 0,
					title: 'string',
					description: 'string',
					numberOfHours: 0,
					targetedFaculties: 'string',
					price: 0,
					duration: 'string',
					objectives: 'string',
					deliveryType: 'string',
					dateAndTime: '2024-05-14T03:00:28.196Z',
					speaker: 'string',
					organizedBy: 'string',
					registrationLink: 'string',
					maxNumberOfAttendees: 0,
					rating: 0,
					instructorId: 0,
				},
			],
		});
	};

	const handleSaveCreate = async () => {
		try {
			const response = await fetch(apiUrl + createUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',

					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(editedData),
			});
			if (!response.ok) {
				throw new Error('Failed to create data');
			}
			toast.success('Data created successfully');
			setOpenCreateDialog(false);
			fetchData();
		} catch (error) {
			console.error('Error creating data:', error);
			toast.error('Error creating data');
		}
	};
	const [openWorkshopsDialog, setOpenWorkshopsDialog] = useState(false);
	const fetchWorkshops = async (instructorId) => {
		try {
			const response = await fetch(apiUrl + workshopUrl + instructorId, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			if (!response.ok) {
				throw new Error('Failed to fetch workshops');
			}
			const workshopData = await response.json();
			setWorkshops(workshopData);
			setOpenWorkshopsDialog(true);
		} catch (error) {
			console.error('Error fetching workshops:', error);
			toast.error('Failed to fetch workshops');
		}
	};
	const handleCloseWorkshopsDialog = () => {
		setOpenWorkshopsDialog(false);
	};
	const handleFetchWorkshops = async (instructorId) => {
		await fetchWorkshops(instructorId);
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
	const nav = useNavigate();

	const handleNavigateToURL = (workshopId) => {
		nav(`/workshop/${workshopId}`);
	};
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
				<Button
					onClick={handleCreate}
					variant="contained"
					sx={{
						color: '#f3db43',
						backgroundColor: '#233062',
						'&:hover': {
							backgroundColor: '#1b255a',
						},
					}}>
					Create
				</Button>
			</div>
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							{isSmallScreen ? null : <TableCell>ID</TableCell>}

							<TableCell>First Name</TableCell>
							{isSmallScreen ? null : <TableCell>Middle Name</TableCell>}
							<TableCell>Last Name</TableCell>
							{isSmallScreen ? null : (
								<>
									<TableCell>Phone Number</TableCell>
									<TableCell>Email</TableCell>
								</>
							)}
							<TableCell>Actions</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{data.map((row) => (
							<TableRow key={row.id}>
								{isSmallScreen ? null : <TableCell>{row.id}</TableCell>}

								<TableCell>{row.firstName}</TableCell>
								{isSmallScreen ? null : <TableCell>{row.middleName}</TableCell>}
								<TableCell>{row.lastName}</TableCell>
								{isSmallScreen ? null : (
									<>
										<TableCell>{row.phoneNumber}</TableCell>
										<TableCell>{row.email}</TableCell>
									</>
								)}
								<TableCell>
									<Button
										onClick={() => handleEditClick(row)}
										sx={{
											color: '#233062',
										}}>
										Edit
									</Button>
									<Button
										onClick={() => handleDeleteClick(row)}
										sx={{
											color: '#233062',
										}}>
										Delete
									</Button>
									<Button
										onClick={() => handleRowClick(row)}
										sx={{
											color: '#233062',
										}}>
										Info
									</Button>
									<Button
										onClick={() => handleFetchWorkshops(row.id)}
										sx={{
											color: '#233062',
										}}>
										Workshops
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<Dialog open={openWorkshopsDialog} onClose={handleCloseWorkshopsDialog}>
				<DialogTitle>Workshops</DialogTitle>
				<DialogContent>
					<TableContainer component={Paper}>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell>ID</TableCell>
									<TableCell>Title</TableCell>
									{isSmallScreen ? null : <TableCell>Description</TableCell>}
									<TableCell>Actions</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{workshops.map((workshop) => (
									<TableRow key={workshop.id}>
										<TableCell>{workshop.number}</TableCell>
										<TableCell>{workshop.title}</TableCell>
										{isSmallScreen ? null :<TableCell>{workshop.description}</TableCell>}
										
										<TableCell>
											<Button
												onClick={() => handleNavigateToURL(workshop.id)}
												sx={{
													color: '#233062',
												}}>
												Info
											</Button>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={handleCloseWorkshopsDialog}
						sx={{
							color: '#233062',
						}}>
						Close
					</Button>
				</DialogActions>
			</Dialog>
			<Dialog open={openEditDialog} onClose={handleEditDialogClose}>
				<DialogTitle>Edit Instructor</DialogTitle>
				<DialogContent>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'row',
							gap: '20px',
							margin: '10px',
						}}>
						<TextField
							label="First Name"
							value={editedData.firstName}
							onChange={(e) =>
								setEditedData({ ...editedData, firstName: e.target.value })
							}
						/>
						<TextField
							label="Middle Name"
							value={editedData.middleName}
							onChange={(e) =>
								setEditedData({ ...editedData, middleName: e.target.value })
							}
						/>
					</Box>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'row',
							gap: '20px',
							margin: '10px',
						}}>
						<TextField
							label="Last Name"
							value={editedData.lastName}
							onChange={(e) =>
								setEditedData({ ...editedData, lastName: e.target.value })
							}
						/>
						<TextField
							label="Phone Number"
							value={editedData.phoneNumber}
							onChange={(e) =>
								setEditedData({ ...editedData, phoneNumber: e.target.value })
							}
						/>
					</Box>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'row',
							gap: '20px',
							margin: '10px',
						}}>
						<TextField
							label="Email"
							value={editedData.email}
							onChange={(e) =>
								setEditedData({ ...editedData, email: e.target.value })
							}
						/>
						<TextField
							label="Address"
							value={editedData.address}
							onChange={(e) =>
								setEditedData({ ...editedData, address: e.target.value })
							}
						/>
					</Box>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'row',
							gap: '20px',
							margin: '10px',
						}}>
						<TextField
							label="Years of Expertise"
							value={editedData.yearsOfExpertise}
							type="number"
							onChange={(e) =>
								setEditedData({
									...editedData,
									yearsOfExpertise: e.target.value,
								})
							}
						/>
						<TextField
							label="Major"
							value={editedData.major}
							onChange={(e) =>
								setEditedData({ ...editedData, major: e.target.value })
							}
						/>
					</Box>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'row',
							gap: '20px',
							margin: '10px',
						}}>
						<TextField
							label="Degree Level"
							value={editedData.degreeLevel}
							onChange={(e) =>
								setEditedData({ ...editedData, degreeLevel: e.target.value })
							}
						/>
					</Box>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={handleEditDialogClose}
						sx={{
							color: '#233062',
						}}>
						Cancel
					</Button>
					<Button
						onClick={handleSaveEdit}
						sx={{
							color: '#233062',
						}}>
						Save
					</Button>
				</DialogActions>
			</Dialog>
			<Dialog open={openCreateDialog} onClose={handleCreateDialogClose}>
				<DialogTitle>Create Instructor</DialogTitle>
				<DialogContent>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'row',
							gap: '20px',
							margin: '10px',
						}}>
						<TextField
							label="First Name"
							value={editedData.firstName}
							onChange={(e) =>
								setEditedData({ ...editedData, firstName: e.target.value })
							}
						/>
						<TextField
							label="Middle Name"
							value={editedData.middleName}
							onChange={(e) =>
								setEditedData({ ...editedData, middleName: e.target.value })
							}
						/>
					</Box>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'row',
							gap: '20px',
							margin: '10px',
						}}>
						<TextField
							label="Last Name"
							value={editedData.lastName}
							onChange={(e) =>
								setEditedData({ ...editedData, lastName: e.target.value })
							}
						/>
						<TextField
							label="Phone Number"
							value={editedData.phoneNumber}
							onChange={(e) =>
								setEditedData({ ...editedData, phoneNumber: e.target.value })
							}
						/>
					</Box>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'row',
							gap: '20px',
							margin: '10px',
						}}>
						<TextField
							label="Email"
							value={editedData.email}
							onChange={(e) =>
								setEditedData({ ...editedData, email: e.target.value })
							}
						/>
						<TextField
							label="Address"
							value={editedData.address}
							onChange={(e) =>
								setEditedData({ ...editedData, address: e.target.value })
							}
						/>
					</Box>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'row',
							gap: '20px',
							margin: '10px',
						}}>
						<TextField
							label="Years of Expertise"
							value={editedData.yearsOfExpertise}
							type="number"
							onChange={(e) =>
								setEditedData({
									...editedData,
									yearsOfExpertise: e.target.value,
								})
							}
						/>
						<TextField
							label="Major"
							value={editedData.major}
							onChange={(e) =>
								setEditedData({ ...editedData, major: e.target.value })
							}
						/>
					</Box>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'row',
							gap: '20px',
							margin: '10px',
						}}>
						<TextField
							label="Degree Level"
							value={editedData.degreeLevel}
							onChange={(e) =>
								setEditedData({ ...editedData, degreeLevel: e.target.value })
							}
						/>
					</Box>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={handleCreateDialogClose}
						sx={{
							color: '#233062',
						}}>
						Cancel
					</Button>
					<Button
						onClick={handleSaveCreate}
						sx={{
							color: '#233062',
						}}>
						Create
					</Button>
				</DialogActions>
			</Dialog>
			<Dialog open={openInfoDialog} onClose={handleInfoDialogClose}>
				<DialogTitle>Instructor Information</DialogTitle>
				<DialogContent>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'center',
							alignItems: 'center',
						}}>
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'row',
								marginRight: '10px',
								marginBottom: '10px',
								gap: '40px',
							}}>
							<p>ID: {editedData.id}</p>
							<p>First Name: {editedData.firstName}</p>
						</Box>
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'row',
								marginRight: '10px',
								marginBottom: '10px',
								gap: '40px',
							}}>
							<p>Middle Name: {editedData.middleName}</p>
							<p>Last Name: {editedData.lastName}</p>
						</Box>
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'row',
								marginRight: '10px',
								marginBottom: '10px',
								gap: '40px',
							}}>
							<p>Phone Number: {editedData.phoneNumber}</p>
							<p>Email: {editedData.email}</p>
						</Box>
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'row',
								marginRight: '10px',
								marginBottom: '10px',
								gap: '40px',
							}}>
							<p>Address: {editedData.address}</p>
							<p>Years of Expertise: {editedData.yearsOfExpertise}</p>
						</Box>
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'row',
								marginRight: '10px',
								marginBottom: '10px',
								gap: '40px',
							}}>
							<p>Major: {editedData.major}</p>
							<p>Degree Level: {editedData.degreeLevel}</p>
						</Box>
					</Box>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={handleInfoDialogClose}
						sx={{
							color: '#233062',
						}}>
						Close
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};
