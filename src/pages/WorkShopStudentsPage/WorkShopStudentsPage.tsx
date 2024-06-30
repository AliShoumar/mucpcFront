import { Button } from '@mui/material';
import { ReactElement } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { WorkShopStudents } from '../../components/WorkShopStudents/WorkShopStudents';

export const WorkSHOpStudentsPage = (): ReactElement => {
	const navigate = useNavigate();
	const { workshopId } = useParams();
	return (
		<main>
			<section>
				<div
					style={{
						margin: '2rem 4rem',
					}}>
					<Button onClick={() => navigate(`/workshop/${workshopId}`)}>
						<ArrowBackIcon />
					</Button>
				</div>
				<WorkShopStudents />
			</section>
		</main>
	);
};
