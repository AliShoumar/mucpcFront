import * as React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import {
	Checkbox,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Stack,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { toast } from 'react-toastify';

interface Question {
	id: number;
	label: string;
}

export const WorkShopFormPage = () => {
	const [checked, setChecked] = React.useState<Question[]>([]);
	const [left, setLeft] = React.useState([
		{ id: 0, label: "Trainer's Familiarity with Training Program Topics" },
		{ id: 1, label: "Clarity of Trainer's Presentation Organization" },
		{ id: 2, label: "Trainer's Ability to Encourage Participants to Interact" },
		{ id: 3, label: "Trainer's Effective Time Management" },
		{ id: 4, label: 'Training Material Covered Course Topics' },
		{ id: 5, label: 'Practical Examples Availability' },
		{ id: 6, label: 'Benefit from Training Material' },
		{
			id: 7,
			label: 'Suitable Training Room (Lighting, Air Conditioning, Chairs)',
		},
	]);
	const authToken = localStorage.getItem('authToken');
	const [right, setRight] = React.useState<Question[]>([]);

	const [newQuestion, setNewQuestion] = React.useState<string>('');
	const { workshopId } = useParams();
	const [workshop, setWorkshop] = React.useState({});

	const [formType, setFormType] = React.useState<string>('registration');

	React.useEffect(() => {
		const fetchWorkshop = async () => {
			try {
				const response = await fetch(
					`https://localhost:44344/api/Workshop/get?workshopId=${workshopId}`,
					{
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${authToken}`,
						},
					}
				);
				if (response.ok) {
					const workshopData = await response.json();
					setWorkshop(workshopData);
				} else {
					toast.error('Failed to fetch workshop data');
				}
			} catch (error) {
				console.error('Error fetching workshop data:', error.message);
				toast.error('Failed to fetch workshop data');
			}
		};
		fetchWorkshop();
		return () => { };
	}, [workshopId]);

	const formData = {
		title: workshop.title,
		description: workshop.description,
		workShopId: workshopId,
		registrationForm: formType === 'registration',
		evaluationForm: formType === 'evaluation',
		questions: [
			{
				question: 'What is your major?',
				type: 'mcq',
				options: ['Computer Science', 'Engineering', 'Other'],
				formId: 0,
			},
			{
				question: 'Which year are you from (1st to 6th)?',
				type: 'mcq',
				options: ['1st', '2nd', '3rd', '4th', '5th', '6th'],
				formId: 0,
			},
			{
				question: 'What is your gender?',
				type: 'mcq',
				options: ['Male', 'Female'],
				formId: 0,
			},
			{
				question: 'Do you have any special needs?',
				type: 'mcq',
				options: ['Yes', 'No'],
				formId: 0,
			},
			...right.map((item) => ({
				question: item.label,
				type: 'mcq',
				options: ['Poor', 'Good', 'Excellent'],
				formId: 0,
			})),
			{
				question: 'Faculty',
				type: 'mcq',
				options: [
					'Business Administration',
					'Religions & Human Sciences',
					'Mass Communication and Fine Arts',
					'Engineering',
					'Sciences',
					'Education',
				],
				formId: 0,
			},
		],
	};

	const leftChecked = checked.filter(
		(item) => left.findIndex((q) => q.id === item.id) !== -1
	);
	const rightChecked = checked.filter(
		(item) => right.findIndex((q) => q.id === item.id) !== -1
	);

	const handleToggle = (question: Question) => () => {
		const currentIndex = checked.findIndex((item) => item.id === question.id);
		const newChecked = [...checked];

		if (currentIndex === -1) {
			newChecked.push(question);
		} else {
			newChecked.splice(currentIndex, 1);
		}

		setChecked(newChecked);
	};

	const handleAllRight = () => {
		setRight(right.concat(left));
		setLeft([]);
		setChecked([]);
	};

	const handleCheckedRight = () => {
		setRight(right.concat(leftChecked));
		setLeft(left.filter((q) => !leftChecked.some((item) => item.id === q.id)));
		setChecked(
			checked.filter((item) => !leftChecked.some((q) => q.id === item.id))
		);
	};

	const handleCheckedLeft = () => {
		setLeft(left.concat(rightChecked));
		setRight(
			right.filter((q) => !rightChecked.some((item) => item.id === q.id))
		);
		setChecked(
			checked.filter((item) => !rightChecked.some((q) => q.id === item.id))
		);
	};

	const handleAllLeft = () => {
		setLeft(left.concat(right));
		setRight([]);
		setChecked([]);
	};

	const handleAddQuestion = () => {
		if (newQuestion.trim() !== '') {
			const id = left.length > 0 ? left[left.length - 1].id + 1 : 0;
			const updatedLeft = [...left, { id, label: newQuestion }];
			setLeft(updatedLeft);
			setNewQuestion('');
		}
	};

	const customList = (items: Question[]) => (
		<Paper sx={{ width: 400, height: 360, overflow: 'auto' }}>
			<List dense component="div" role="list">
				{items.map((value: Question) => {
					const labelId = `transfer-list-item-${value.id}-label`;

					return (
						<ListItemButton
							key={value.id}
							role="listitem"
							onClick={handleToggle(value)}>
							<ListItemIcon>
								<Checkbox
									checked={
										checked.findIndex((item) => item.id === value.id) !== -1
									}
									tabIndex={-1}
									disableRipple
									inputProps={{
										'aria-labelledby': labelId,
									}}
									sx={{
									
										'&.Mui-checked': {
										  color: '#1b255a',
										},
									
										'&.Mui-focusVisible': {
										  backgroundColor: '#1b255a',
										},
										'&.MuiCheckbox-indeterminate': {
										  color: '#f3db43',
										},
									  }}
								/>
							</ListItemIcon>
							<ListItemText id={labelId} primary={value.label} />
						</ListItemButton>
					);
				})}
			</List>
		</Paper>
	);
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(JSON.stringify(formData))
		try {
			const response = await fetch(`https://localhost:44344/api/Form/create`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',

					Authorization: `Bearer ${authToken}`,
				},
				body: JSON.stringify(formData),
			});
			if (response.ok) {
				toast.success('Form created successfully');
				navigate(`/workshop/${workshopId}`);
			} else {
				toast.error(`Workshop already have ${formType == 'registration' ? 'registration' : 'evaluation'} form`);
			}
		} catch (error) {
			console.error('Error creating form:', error.message);
			toast.error('Failed to create form');
		}
	};

	return (
		<section>
			<Stack>
				<div
					style={{
						margin: '2rem 4rem',
					}}>
					<Button onClick={() => navigate(`/workshop/${workshopId}`)} 	variant="contained"
						sx={{
							color: '#f3db43',
							backgroundColor: '#233062',
							'&:hover': {
								backgroundColor: '#1b255a',
							},
							marginRight: 2,
						}}>
						<ArrowBackIcon />
					</Button>
				</div>
				<Grid container spacing={2} justifyContent="center" alignItems="center">
					<Grid item>{customList(left)}</Grid>

					<Grid item>
						<Grid container direction="column" alignItems="center">
							<TextField
								select
								label="Select Form Type"
								value={formType}
								onChange={(e) => setFormType(e.target.value as string)}
								variant="outlined"
								sx={{ width: '200px', marginBottom: '16px' }}>
								<MenuItem value="registration">Registration Form</MenuItem>
								<MenuItem value="evaluation">Evaluation Form</MenuItem>
							</TextField>
							<Button
								 sx={{
									my: 0.5,
								
									'&:hover': {
									  backgroundColor: '#1b255a', 
									  color: '#f3db43', 
									},
									'&:focus': {
									  backgroundColor: '#1b255a', 
									  color: '#f3db43', 
									},
									'&:active': {
									  backgroundColor: '#1b255a', 
									  color: '#f3db43', 
									},
								  }}
								variant="outlined"
								size="small"
								onClick={handleAllRight}
								disabled={left.length === 0}
								aria-label="move all right">
								≫
							</Button>
							<Button
								 sx={{
									my: 0.5,
								
									'&:hover': {
									  backgroundColor: '#1b255a', 
									  color: '#f3db43', 
									},
									'&:focus': {
									  backgroundColor: '#1b255a', 
									  color: '#f3db43', 
									},
									'&:active': {
									  backgroundColor: '#1b255a', 
									  color: '#f3db43', 
									},
								  }}
								variant="outlined"
								size="small"
								onClick={handleCheckedRight}
								disabled={leftChecked.length === 0}
								aria-label="move selected right">
								&gt;
							</Button>
							<Button
								 sx={{
									my: 0.5,
								
									'&:hover': {
									  backgroundColor: '#1b255a', 
									  color: '#f3db43', 
									},
									'&:focus': {
									  backgroundColor: '#1b255a', 
									  color: '#f3db43', 
									},
									'&:active': {
									  backgroundColor: '#1b255a', 
									  color: '#f3db43', 
									},
								  }}
								variant="outlined"
								size="small"
								onClick={handleCheckedLeft}
								disabled={rightChecked.length === 0}
								aria-label="move selected left">
								&lt;
							</Button>
							<Button
								 sx={{
									my: 0.5,
								
									'&:hover': {
									  backgroundColor: '#1b255a', 
									  color: '#f3db43', 
									},
									'&:focus': {
									  backgroundColor: '#1b255a', 
									  color: '#f3db43', 
									},
									'&:active': {
									  backgroundColor: '#1b255a', 
									  color: '#f3db43', 
									},
								  }}
								variant="outlined"
								size="small"
								onClick={handleAllLeft}
								disabled={right.length === 0}
								aria-label="move all left">
								≪
							</Button>
						</Grid>
					</Grid>
					<Grid item>{customList(right)}</Grid>
				</Grid>
				<Grid
					paddingTop={'40px'}
					container
					spacing={6}
					justifyContent={'center'}
					alignItems={'center'}>
					<Grid item>
						<TextField
							sx={{
								width: '400px',
							}}
							label="New Question"
							variant="outlined"
							value={newQuestion}
							onChange={(e) => setNewQuestion(e.target.value)}
						/>
					</Grid>
					<Grid item>
						<Button
							onClick={handleAddQuestion}
							variant="outlined"
							sx={{
								color: '#f3db43',
								backgroundColor: '#233062',
								'&:hover': {
									backgroundColor: '#1b255a',
								},
								marginRight: 2,
							}}
					>
							Add Question
						</Button>
						<Button 
							sx={{
								color: '#f3db43',
								backgroundColor: '#233062',
								'&:hover': {
									backgroundColor: '#1b255a',
								},
								marginRight: 2,
							}}
						variant="outlined" onClick={handleSubmit}>
							Done
						</Button>
					</Grid>
				</Grid>
			</Stack>
		</section>
	);
};
