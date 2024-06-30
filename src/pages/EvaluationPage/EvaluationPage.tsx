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
import { toast } from 'react-toastify';
import { Header2 } from '../../components/Header2.0/Header2';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

export const EvaluationPage = () => {
    const [workshops, setWorkshops] = useState([]);
    const [selectedWorkshop, setSelectedWorkshop] = useState(null);
    const [openEvaluationDialog, setOpenEvaluationDialog] = useState(false);
    const [evaluationFormData, setEvaluationFormData] = useState(null);
    const [responseObject, setResponseObject] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const authToken = localStorage.getItem('authToken');

    useEffect(() => {
        fetchWorkshops();
    }, []);

    const fetchWorkshops = async () => {
        const studentId = localStorage.getItem('userId');
        try {
            const response = await fetch(
                // `https://localhost:44344/api/Student/workShops?studentId=${studentId}`,
                'https://localhost:44344/api/WorkShop/getall',
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setWorkshops(data);
        } catch (error) {
            console.error('Error fetching workshops:', error);
            setError('Error fetching workshops');
        }
    };

    const handleEvaluationClick = (workshop) => {
        setSelectedWorkshop(workshop);
        fetchEvaluationForm(workshop.id);
    };

    const fetchEvaluationForm = async (workshopId) => {
        setLoading(true);
        try {
            const response = await fetch(
                `https://localhost:44344/api/WorkShop/getEvaluationForm/?workshopId=${workshopId}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );
            if (!response.ok) {
                throw new Error('No evaluation form available');
            }
            const data = await response.json();
			console.log(data)
            setEvaluationFormData(data);
            setResponseObject(new Array(data.questions.length).fill(''));
            setLoading(false);
            setOpenEvaluationDialog(true);
        } catch (error) {
            console.error('Error fetching evaluation form:', error.message);
            setLoading(false);
        }
    };

	const handleSubmitEvaluation = async () => {
		if (responseObject.includes('')) {
			toast.error('Please fill all the fields');
			return;
		}
	
		const studentId = localStorage.getItem('userId');
		const requestData = {
			formId: evaluationFormData.form.id,
			studentId: parseInt(studentId),
			questionsResponses: responseObject.map((response, index) => ({
				response,
				formQuestionId: evaluationFormData.questions[index].id,
			})),
		};
	
		console.log(JSON.stringify(requestData));
		console.log(selectedWorkshop.id);
	
		try {
			const response = await fetch(
				`https://localhost:44344/api/WorkShop/evaluate?workshopId=${selectedWorkshop.id}`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${authToken}`,
					},
					body: JSON.stringify(requestData),
				}
			);
	
			if (!response.ok) {
				throw new Error(`Student is not registered in this workshop!`);
			}
	
			toast.success('Evaluation submitted successfully');
			setOpenEvaluationDialog(false);
		} catch (error) {
			console.error('Error submitting evaluation:', error);
			toast.error('Student is not registered in this workshop!');
		}
	};
	
    const handleInputChange = (type, index, value, questionId) => {
        const newResponseObject = [...responseObject];
        newResponseObject[index] = value;
        setResponseObject(newResponseObject);
    };

    const navigate = useNavigate();

    return (
        <>
            <Header2 />
            <Button
                onClick={() => navigate('/students')}
                style={{ margin: '0.8rem 0.6rem' }}
                sx={{
                    color: '#f3db43',
                    backgroundColor: '#233062',
                    '&:hover': {
                        backgroundColor: '#1b255a',
                    },
                }}
            >
                <ArrowBackIcon />
            </Button>
            <Grid container spacing={3}>
                {workshops.length > 0 ? (
                    workshops.map((workshop) => (
                        <Grid item xs={12} sm={6} md={4} key={workshop.id}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        {workshop.title}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                        component="p"
                                    >
                                        {workshop.description}
                                    </Typography>
                                    <Button
                                        sx={{
                                            color: '#f3db43',
                                            backgroundColor: '#233062',
                                            '&:hover': {
                                                backgroundColor: '#1b255a',
                                            },
                                            marginRight: 2,
											marginTop:2
                                        }}
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => handleEvaluationClick(workshop)}
                                    >
                                        Evaluate
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                ) : (
                    <Typography
                        variant="h6"
                        color="textSecondary"
                        sx={{ margin: '20px' }}
                    >
                        No workshops available at the moment.
                    </Typography>
                )}
            </Grid>

            <Dialog
                open={openEvaluationDialog}
                onClose={() => setOpenEvaluationDialog(false)}
            >
                <DialogTitle>Evaluation Form</DialogTitle>
                <DialogContent>
                    {loading ? (
                        <CircularProgress />
                    ) : (
                        evaluationFormData && (
                            <>
                                {evaluationFormData.questions.map((question, index) => (
                                    <div key={question.id}>
                                        <Typography variant="subtitle1">
                                            {question.question}
                                        </Typography>

                                        {(question.type === 'mcq' || question.type === 'MCQ') ? (
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
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleSubmitEvaluation}
                                    sx={{
                                        color: '#f3db43',
                                        backgroundColor: '#233062',
                                        '&:hover': {
                                            backgroundColor: '#1b255a',
                                        },
                                        marginRight: 2,
										marginTop:2,

                                    }}
                                >
                                    Submit Evaluation
                                </Button>
                            </>
                        )
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
};
