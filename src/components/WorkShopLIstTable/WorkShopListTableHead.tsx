import {
	private_createTypography,
	TableCell,
	TableHead,
	TableRow,
	TableSortLabel,
} from '@mui/material';
import { ReactElement } from 'react';
import { OrderDirection } from './WorkShopListTableContent';

interface Props {
	valueToOrderBy: String;
	orderDirection: OrderDirection;
	setSortId: (value:string) => void
    setIsDesc: (value:boolean) => void
	isDesc:boolean
	sortId:string
}

export const WorkShopListTablHead: React.FC<Props> = ({
	valueToOrderBy,
	orderDirection,
	sortId,
	setSortId,
	isDesc,
	setIsDesc
}): ReactElement => {
	const createSortHandler = (property:string) => {
		setSortId(property)
		setIsDesc(!isDesc)
	}
	return (
		<TableHead>
			<TableRow>
				<TableCell key={'Id'}>
					<TableSortLabel
						active={sortId === 'Id'}
						direction={isDesc ? 'desc':"asc"}
						onClick={()=>createSortHandler("Id")}
						>
						Id
					</TableSortLabel>
				</TableCell>
				<TableCell key={'Title'}>
					<TableSortLabel
						active={sortId === 'Title'}
						direction={isDesc ? 'desc':"asc"}
						onClick={()=> createSortHandler("Title")}
						>
						Title
					</TableSortLabel>
				</TableCell>
				<TableCell key={'dateAndTime'}>
					<TableSortLabel
						active={sortId === 'dateAndTime'}
						direction={isDesc ? 'desc':"asc"}
						onClick={()=> createSortHandler("dateAndTime")}
						>
						Date
					</TableSortLabel>
				</TableCell>
				<TableCell key={'Price'}>
					<TableSortLabel
						active={sortId === 'Price'}
						direction={isDesc ? 'desc':"asc"}
						onClick={()=> createSortHandler("Price")}
						>
						Price
					</TableSortLabel>
				</TableCell>
				<TableCell key={'duration'}>
					<TableSortLabel
						active={sortId === 'duration'}
						direction={isDesc ? 'desc':"asc"}
						onClick={()=> createSortHandler("duration")}
						>
						Duration
					</TableSortLabel>
				</TableCell>
				<TableCell key={'Semester'}>
					<TableSortLabel
						active={sortId === 'Semester'}
						direction={isDesc ? 'desc':"asc"}
						onClick={()=> createSortHandler("Semester")}
						>
						Semester
					</TableSortLabel>
				</TableCell>
				<TableCell key={'maxNumberOfAttendees'}>
					<TableSortLabel
						active={sortId === 'maxNumberOfAttendees'}
						direction={isDesc ? 'desc':"asc"}
						onClick={()=> createSortHandler("maxNumberOfAttendees")}
						>
						Attendance
					</TableSortLabel>
				</TableCell>
				<TableCell key={'Action'}>Action</TableCell>
			</TableRow>
		</TableHead>
	);
};
