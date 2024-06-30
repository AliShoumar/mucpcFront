import React, { useState, useEffect } from 'react';
import {
	Grid,
	Card,
	CardContent,
	Typography,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	TextField,
	CircularProgress,
} from '@mui/material';
import { Header2 } from '../../components/Header2.0/Header2';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { AdminStudentPage } from '../AdminStudentPage/AdminStudentPage';
import InfoIcon from '@mui/icons-material/Info';

export const StudentWorkshopsPage = () => {
	const [responses, setResponses] = useState({
		registration: [],
		evaluation: [],
	});
	const [formIds, setFormIds] = useState({ registration: 0, evaluation: 0 });
	const [workshops, setWorkshops] = useState([]);
	const [selectedWorkshop, setSelectedWorkshop] = useState(null);
	const [dialogState, setDialogState] = useState({
		register: false,
		details: false,
	});
	const [registrationFormData, setRegistrationFormData] = useState(null);
	const [evaluationFormData, setEvaluationFormData] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const navigate = useNavigate();

	const authToken = localStorage.getItem('authToken');
	const userRole = localStorage.getItem('userRole');

	useEffect(() => {
		fetch('https://localhost:44344/api/WorkShop/getall')
			.then((response) => {
				if (!response.ok) throw new Error('Network response was not ok');
				return response.json();
			})
			.then(setWorkshops)
			.catch((error) => console.error('Error fetching workshops:', error));
	}, []);

	const handleInputChange = (type, index, value, questionId) => {
		const updatedResponse = [...responses[type]];
		updatedResponse[index] = { response: value, formQuestionId: questionId };
		setResponses({ ...responses, [type]: updatedResponse });
	};

	const handleRegisterClick = (workshop) => {
		setSelectedWorkshop(workshop);
		fetchRegistrationForm(workshop.id);
	};

	const handleCloseDialog = (type) => {
		setDialogState({ ...dialogState, [type]: false });
		setRegistrationFormData(null); // Reset form data on close
	};

	const handleRegister = () => {
		const type = registrationFormData ? 'registration' : 'evaluation';
		const formData =
			type === 'registration' ? registrationFormData : evaluationFormData;
		const formResponses = responses[type];

		if (formResponses.length !== formData.questions.length) {
			toast.error('Please fill all the fields');
			return;
		}

		const studentId = parseInt(localStorage.getItem('userId'));
		const requestData = {
			studentId,
			formResponse: {
				formId: formIds[type],
				studentId,
				questionsResponses: formResponses.map((item) => ({
					response: item.response,
					formQuestionId: item.formQuestionId,
				})),
			},
		};

		const endpoint =
			type === 'registration'
				? `register?workshopId=${selectedWorkshop.id}`
				: `evaluate?workshopId=${selectedWorkshop.id}`;
		console.log(JSON.stringify(requestData));
		fetch(`https://localhost:44344/api/WorkShop/${endpoint}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${authToken}`,
			},
			body: JSON.stringify(requestData),
		})
			.then((data) => {
				toast.success(
					`${
						type === 'registration' ? 'Registration' : 'Form'
					} submitted successfully`
				);
				handleCloseDialog('register');
			})
			.catch((error) => {
				console.error(`Error submitting ${type}:`, error);
				toast.error(`An error occurred while submitting the ${type}`);
			});
	};

	const fetchRegistrationForm = (workshopId) => {
		setLoading(true);
		setRegistrationFormData(null);
		fetch(
			`https://localhost:44344/api/WorkShop/getRegistrationForm/?workshopId=${workshopId}`,
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${authToken}`,
				},
			}
		)
			.then((response) => {
				if (!response.ok) {
					toast.error('No registration form available');
					throw new Error('No registration form available');
				}
				return response.json();
			})
			.then((data) => {
				setRegistrationFormData(data);
				setFormIds((prev) => ({ ...prev, registration: data.form.id }));
				setLoading(false);
				setDialogState((prev) => ({ ...prev, register: true }));
			})
			.catch((error) => {
				console.error('Error fetching registration form:', error);
				setLoading(false);
			});
	};

	const handleDetailsClick = (workshop) => {
		setSelectedWorkshop(workshop);
		setDialogState({ ...dialogState, details: true });
	};
	if (userRole === 'Manager') {
		return (
			<>
				<AdminStudentPage />
			</>
		);
	}
	return (
		<>
			<Header2 />

			<Button
				variant="contained"
				onClick={() => navigate('/evaluate')}
				sx={{
					margin: '25px',
					color: '#f3db43',
					backgroundColor: '#233062',
					'&:hover': {
						backgroundColor: '#1b255a',
					},
				}}>
				Evaluate
			</Button>
			<Grid container spacing={3}>
				{workshops.map((workshop) => (
					<Grid item xs={12} sm={6} md={4} key={workshop.id}>
						<Card>
							<CardContent>
								<Typography variant="h6" gutterBottom>
									{workshop.title}
								</Typography>
								<Typography variant="body2" color="textSecondary" component="p">
									{workshop.description}
								</Typography>
								<Typography variant="body2" color="textSecondary" component="p">
									Price: ${workshop.price}
								</Typography>
								<Typography variant="body2" color="textSecondary" component="p">
									Duration: {workshop.duration}
								</Typography>
								<Button
									variant="contained"
									color="primary"
									onClick={() => handleRegisterClick(workshop)}
									sx={{
										color: '#f3db43',
										backgroundColor: '#233062',
										'&:hover': {
											backgroundColor: '#1b255a',
										},
										marginRight: 2,
									}}
									>
									Register
								</Button>
								<Button
									variant="contained"
									color="primary"
									onClick={() => handleDetailsClick(workshop)}
									sx={{
										color: '#f3db43',
										backgroundColor: '#233062',
										'&:hover': {
											backgroundColor: '#1b255a',
										},
										marginRight: 2,
									}}
									>
										<InfoIcon/>
								</Button>
							</CardContent>
						</Card>
					</Grid>
				))}
			</Grid>

			<Dialog
				open={dialogState.register}
				onClose={() => handleCloseDialog('register')}>
				<DialogTitle>Register for Workshop</DialogTitle>
				<DialogContent>
					{loading ? (
						<CircularProgress />
					) : (
						registrationFormData && (
							<>
								{registrationFormData.questions.map((question, index) => (
									<div key={index}>
										<Typography variant="subtitle1">
											{question.question}
										</Typography>
										{question.type === 'mcq' ? (
											question.options.split(',').map((option, i) => (
												<div key={i}>
													<input
														type="radio"
														id={`option-${i}`}
														name={`question-${index}`}
														value={option}
														onChange={() =>
															handleInputChange(
																'registration',
																index,
																option,
																question.id
															)
														}
													/>
													<label htmlFor={`option-${i}`}>{option}</label>
												</div>
											))
										) : (
											<TextField
												margin="normal"
												label={question.label}
												fullWidth
												onChange={(e) =>
													handleInputChange(
														'registration',
														index,
														e.target.value,
														question.id
													)
												}
											/>
										)}
									</div>
								))}
							</>
						)
					)}
					<Button
						variant="contained"
						color="primary"
						onClick={handleRegister}
						disabled={loading}
						sx={{
							color: '#f3db43',
							backgroundColor: '#233062',
							'&:hover': {
								backgroundColor: '#1b255a',
							},
							marginTop: 2,
							marginBottom:1,
							
						}}
						>
						Register
					</Button>
				</DialogContent>
			</Dialog>

			<Dialog
				open={dialogState.details}
				onClose={() => handleCloseDialog('details')}>
				<DialogTitle>Workshop Details</DialogTitle>
				<DialogContent>
					{selectedWorkshop ? (
						<>
							<Typography variant="body1">
								<strong>Title:</strong> {selectedWorkshop.title}
							</Typography>
							<Typography variant="body1">
								<strong>Description:</strong> {selectedWorkshop.description}
							</Typography>
							<Typography variant="body1">
								<strong>Price:</strong> ${selectedWorkshop.price}
							</Typography>
							<Typography variant="body1">
								<strong>Duration:</strong> {selectedWorkshop.duration}
							</Typography>
							<Typography variant="body1">
								<strong>Date And Time:</strong> {selectedWorkshop.dateAndTime}
							</Typography>
							<Typography variant="body1">
								<strong>Speakers:</strong> {selectedWorkshop.speaker}
							</Typography>
							<Typography variant="body1">
								<strong>Organized By:</strong> {selectedWorkshop.organizedBy}
							</Typography>
							<Typography variant="body1">
								<strong>Targeted Faculties:</strong>{' '}
								{selectedWorkshop.targetedFaculties}
							</Typography>
							<Typography variant="body1">
								<strong>Registration Link:</strong>{' '}
								{selectedWorkshop.registrationLink}
							</Typography>
							<Typography variant="body1">
								<strong>Maximum Number of Attendees:</strong>{' '}
								{selectedWorkshop.maxNumberOfAttendees}
							</Typography>
						</>
					) : (
						<Typography variant="body1" color="error">
							{error}
						</Typography>
					)}
				</DialogContent>
			</Dialog>
		</>
	);
};
