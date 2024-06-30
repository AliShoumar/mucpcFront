import { Button } from '@mui/material';
import { ReactElement } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { StudentFilledForm } from './../../components/StudentFilledForm/StudentFilledForm';

export const StudentFilledFormPage = (): ReactElement => {
	const navigate = useNavigate();
	const { workshopId } = useParams();
	return (
		<main>
			<section>
				<div
					style={{
						margin: '2rem 4rem',
						display: 'flex',
						justifyContent: 'space-between',
					}}>
					<Button   variant="contained"
            sx={{
              color: '#f3db43',
              backgroundColor: '#233062',
              '&:hover': {
                backgroundColor: '#1b255a',
              }
            }} onClick={() => navigate(`/workshop/${workshopId}`)}>
						<ArrowBackIcon />
					</Button>
				</div>

				<StudentFilledForm />
			</section>
		</main>
	);
};
