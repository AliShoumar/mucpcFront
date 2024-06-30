import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { Filter } from './../Filter/FIlter';
import { IWorkShopCardItem } from '../../interfaces/IWorkShopCard';
import { WorkSHopListTableContent } from './../WorkShopLIstTable/WorkShopListTableContent';

interface Props {
}

export const WorkShopList: React.FC<Props> = () => {
	const [workshopArray, setWorkshops] = useState<IWorkShopCardItem[]>([]);
	const [error, setError] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);
	const [pageNumber, setPageNumber] = useState<number>(1);
	const [pageSize, setPageSize] = useState<number>(10); // Default page size
	const [filterId, setFilterId] = useState('number');
	const [filterBy, setFilterBy] = useState('');
	const [sortId, setSortId] = useState('Id');
	const [isDesc, setIsDesc] = useState(false);

	useEffect(() => {
		const fetchWorkshops = async () => {
			try {
				setLoading(true);
				const filters = [{ id: filterId, value: filterBy }];
				const sorting = [{ id: sortId, desc: isDesc }];
				console.log(filters);
				console.log(sorting)
				const encodedFilters = encodeURIComponent(JSON.stringify(filters));
				const encodedsort = encodeURIComponent(JSON.stringify(sorting));
				console.log(encodedFilters);
				const response = await fetch(
					`https://localhost:44344/api/WorkShop?OrderBy=${encodedsort}&ColumnFilters=${encodedFilters}`
				);
				if (!response.ok) {
					throw new Error('Failed to fetch workshops');
				}
				const data = await response.json();
				setWorkshops(data);
			} catch (error: any) {
				setError(true);
				console.error('Error fetching workshops:', error.message);
			} finally {
				setLoading(false);
			}
		};
		fetchWorkshops();
	}, [filterBy,isDesc,sortId]);

	const handlePageSizeChange = (
		event: React.ChangeEvent<{ value: unknown }>
	) => {
		const newSize = event.target.value as number;
		setPageSize(newSize);
		setPageNumber(1);
	};

	return (
		<>
			<Filter setFilterId={setFilterId} setFilterBy={setFilterBy} />
			<Box display="flex" justifyContent="center"></Box>
			{loading && <LoadingMessage />}
			{error && <ErrorMessage />}
			{!loading && !error && workshopArray.length === 0 && (
				<NoWorkshopsMessage />
			)}
			{!error && !loading && workshopArray.length !== 0 && (
				<>
					<Box display="flex" justifyContent="center">
						<WorkSHopListTableContent
							workshopArray={workshopArray}
							setSortId={setSortId}
							sortId = {sortId}
							isDesc = {isDesc}
							setIsDesc={setIsDesc}
						/>
					</Box>
				</>
			)}
		</>
	);
};

const LoadingMessage = () => <Message height="60vh">Loading...</Message>;

const ErrorMessage = () => (
	<Message height="60vh">Something went wrong</Message>
);

const NoWorkshopsMessage = () => (
	<Message height="40vh">There are no workshops</Message>
);

const Message: React.FC<{ height: string }> = ({ children, height }) => (
	<div
		style={{
			height,
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center',
		}}>
		{children}
	</div>
);
