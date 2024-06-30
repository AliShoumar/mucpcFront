import {
	Button,
	Card,
	CardContent,
	CardHeader,
	CardMedia,
	Typography,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { ReactElement } from 'react';
import { IWorkShopCardItem } from './../../interfaces/IWorkShopCard';
import { useNavigate } from 'react-router-dom';

interface Props {
	workShop: IWorkShopCardItem;
	id:number
}

export const WorkShopCard: React.FC<Props> = ({ workShop, id }): ReactElement => {
	const navigate = useNavigate();
	return (
		<div>
			<Card sx={{ maxWidth: 320,
			borderRadius:'10px',
			}}>
				<CardHeader title={workShop.title} subheader={workShop.date} />
				{/* <CardMedia
					sx={{ height: 180 , 
					paddingLeft:'5px',
					paddingRight:'5px'
				}}
					component={'img'}
					image={!workShop.img ? './../../../public/default.jpg' : workShop.img}
				/> */}
				<CardContent
					sx={{
						width: '100%',
						marginLeft: 1,
					}}>
					<Typography variant="body2">
						<b>Instructor : </b>
						{workShop.instructor}
					</Typography>
					<Typography component={'span'} variant="body2">
						<b>Duration : </b> {workShop.duration}
					</Typography>
					<Typography component={'span'} sx={{marginLeft:'1.5rem'}}>
						<b>At : </b> {workShop.startTime}
					</Typography>
					<Typography variant="body2" component={'div'}>
						<b>Price : </b> {workShop.isFree ? 'Free' : workShop.price}
					</Typography>
					<Button
						aria-label="Info About The Event"
						sx={{
							marginLeft: 24,
						}}
						onClick={() =>{
							navigate(`/workshop/${id}`)
						}}
						>
						<ArrowForwardIcon color="primary" sx={{ fontSize: 38 }} />
					</Button>
				</CardContent>
			</Card>
		</div>
	);
};
