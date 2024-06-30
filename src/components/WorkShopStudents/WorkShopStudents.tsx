import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
	Table,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TableBody,
	TableSortLabel,
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const WorkShopStudents = () => {
	const { workshopId } = useParams();
	const [students, setStudents] = useState([]);
	const authToken = localStorage.getItem('authToken');

	useEffect(() => {
		const fetchStudents = async () => {
			try {
				const response = await fetch(
                    `https://localhost:44344/api/WorkShop/getRegisteredEmails?workshopId=${workshopId}`
					, {
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${authToken}`,
						},
					}
				);
				if (!response.ok) {
					const errorData = await response.json();
					throw new Error(errorData.message || 'Failed to fetch data');
				}
				const data = await response.json();
				console.log(data);
				setStudents(data);
			} catch (error) {
				toast.error('Something went wrong');
				console.error('Error fetching data:', error);
			}
		};

		fetchStudents();
	}, [workshopId]);

	return (
		<>
			<ToastContainer />
			{students.length === 0 ? (
				<p>No students</p>
			) : (
				<TableContainer style={{ width: 'auto', margin: 'auto' }}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell key={'Key'}>
									<TableSortLabel>Email</TableSortLabel>
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{students.map((student, index) => (
								<TableRow key={index}>
									<TableCell>{student}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			)}
		</>
	);
};
