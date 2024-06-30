import * as React from 'react';
import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CircularProgress, Grid, Paper } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { PieChart } from '@mui/x-charts/PieChart';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const WorkShopStatsPage = (): ReactElement => {
	const [loader, setLoader] = React.useState(false);
	const navigate = useNavigate();
	const { workshopId } = useParams();
	const [registrationFormData, setRegistrationFormData] = useState(null);
	const [evaluationFormData, setEvaluationFormData] = useState(null);
	const [registrationAnalytics, setRegistrationAnalytics] = useState(null);
	const [evaluationAnalytics, setEvaluationAnalytics] = useState(null);
	const [loading, setLoading] = useState(false);
	const authToken = localStorage.getItem('authToken');

	React.useEffect(() => {
		const fetchRegistrationForm = async () => {
			setLoading(true);
			try {
				const response = await fetch(
					`https://localhost:44344/api/WorkShop/getRegistrationForm?workshopId=${workshopId}`,
					{
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${authToken}`,
						},
					}
				);
				if (response.ok) {
					const data = await response.json();

					setRegistrationFormData(data);
				} else {
					console.error('Failed to fetch registration form');
				}
			} catch (error) {
				console.error('Error fetching registration form:', error);
			} finally {
				setLoading(false);
			}
		};

		const fetchEvaluationForm = async () => {
			setLoading(true);
			try {
				const response = await fetch(
					`https://localhost:44344/api/WorkShop/getEvaluationForm?workshopId=${workshopId}`,
					{
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${authToken}`,
						},
					}
				);
				if (response.ok) {
					const data = await response.json();
					setEvaluationFormData(data);
				} else {
					console.error('Failed to fetch evaluation form');
				}
			} catch (error) {
				console.error('Error fetching evaluation form:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchRegistrationForm();
		fetchEvaluationForm();
	}, [workshopId]);

	useEffect(() => {
		const fetchEvaluationFormAnalytics = async () => {
			setLoading(true);
			try {
				const response = await fetch(
					`https://localhost:44344/api/Form/getAnalytics?formId=${evaluationFormData?.form?.id}`,
					{
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${authToken}`,
						},
					}
				);
				if (response.ok) {
					const data = await response.json();
					setEvaluationAnalytics(data);
				} else {
					console.error('Failed to fetch evaluation analytics');
				}
			} catch (error) {
				console.error('Error fetching evaluation analytics:', error);
			} finally {
				setLoading(false);
			}
		};

		const fetchRegistrationFormAnalytics = async () => {
			setLoading(true);
			try {
				const response = await fetch(
					`https://localhost:44344/api/Form/getAnalytics?formId=${registrationFormData?.form?.id}`,
					{
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${authToken}`,
						},
					}
				);
				if (response.ok) {
					const data = await response.json();
					console.log(data);
					setRegistrationAnalytics(data);
				} else {
					console.error('Failed to fetch registration analytics');
				}
			} catch (error) {
				console.error('Error fetching registration analytics:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchEvaluationFormAnalytics();
		fetchRegistrationFormAnalytics();
	}, [registrationFormData, evaluationFormData]);

	const downloadPDF = () => {
		setLoader(true);
		window.print();
		setLoader(false);
	};

	const pdfDownloader = (id: string, workshopId: any) => {
		const capture = document.querySelector('.' + id);
		html2canvas(capture)
			.then((canvas) => {
				const imgData = canvas.toDataURL('image/png');
				const doc = new jsPDF('p', 'mm', 'a4');
				const componentWidth = doc.internal.pageSize.getWidth();
				const componentHeight = doc.internal.pageSize.getHeight();
				doc.addImage(imgData, 'PNG', 0, 0, componentWidth, componentHeight);
				doc.save(`workshop-stats-${workshopId}.pdf`);
			})
			.catch((error) => {
				console.error('Error generating PDF:', error);
			});
	};

	const size = {
		width: 700,
		height: 200,
	};
	return (
		<div>
			<Grid container justifyContent="space-between" alignItems="center" mb={2}>
				<Grid item>
					<Button
						sx={{
							color: '#f3db43',
							backgroundColor: '#233062',
							'&:hover': {
								backgroundColor: '#1b255a',
							},
							mb: 2,
						}}
						onClick={() => navigate(`/workshop/${workshopId}`)}>
						<ArrowBackIcon />
					</Button>
				</Grid>
				<Grid item>
					<Button
						onClick={downloadPDF}
						disabled={loader}
						sx={{
							color: '#233062',
							//   backgroundColor: '#233062',
							//   '&:hover': {
							//     backgroundColor: '#1b255a',
							//   },
							mb: '2',
						}}>
						<PictureAsPdfIcon />
					</Button>
				</Grid>
			</Grid>
			{loading ? (
				<CircularProgress />
			) : (
				<Grid container spacing={4}>
					<Grid item xs={12} sm={12}>
						<Typography variant="h6" gutterBottom>
							Registration Form Statistics
						</Typography>
						<Grid item xs={12} sm={12} md={12}>
							<Grid container spacing={2}>
								{registrationAnalytics?.questions.map((question, index) => (
									<Grid item xs={12} sm={12} md={9} lg={6} key={index}>
										<Card sx={{ width: '100%' }}>
											<CardContent>
												<Typography variant="subtitle1" gutterBottom>
													{question.question}
												</Typography>
												<PieChart
													series={[
														{
															data: question.responses.map((response) => ({
																value: response.responseCount,
																label: `${response.response}`,
															})),
															arcLabel: (item) =>
																`${
																	question.responses.find(
																		(response) =>
																			response.response === item.label
																	).percentage
																}`,
														},
													]}
													width={550}
													height={170}
													sx={{}}
												/>
											</CardContent>
										</Card>
									</Grid>
								))}
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={12}>
						<Typography variant="h6" gutterBottom>
							Evaluation Form Statistics
						</Typography>
						<Grid container spacing={2}>
							{evaluationAnalytics?.questions.map((question, index) => (
								<Grid item xs={12} sm={12} md={9} lg={6} key={index}>
									<Card sx={{ width: '100%' }}>
										<CardContent>
											<Typography variant="subtitle1" gutterBottom>
												{question.question}
											</Typography>
											<PieChart
												series={[
													{
														data: question.responses.map((response) => ({
															value: response.responseCount,
															label: `${response.response}`,
														})),
														arcLabel: (item) =>
															`${
																question.responses.find(
																	(response) => response.response === item.label
																).percentage
															}`,
													},
												]}
												width={550}
												height={170}
											/>
										</CardContent>
									</Card>
								</Grid>
							))}
						</Grid>
					</Grid>
				</Grid>
			)}
		</div>
	);
};
