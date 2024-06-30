import React, { useState } from 'react';
import {
    Button,
    Stack,
    Table,
    TableCell,
    TableContainer,
    TableRow,
    TablePagination,
} from '@mui/material';
import { WorkShopListTablHead } from './WorkShopListTableHead';
import { IWorkShopCardItem } from '../../interfaces/IWorkShopCard';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from 'react-router-dom';
import { formatDate } from './../../utils/formatData';

interface Props {
    workshopArray: IWorkShopCardItem[];
    setSortId: (value:string) => void
    setIsDesc: (value:boolean) => void
    sortId:string
    isDesc:boolean
}

export const WorkSHopListTableContent: React.FC<Props> = ({
    workshopArray,
    setSortId,
    setIsDesc,
    sortId,
    isDesc
}): React.ReactElement => {
    const navigate = useNavigate();
    const [orderDirection, setOrderDirection] = useState<'asc' | 'desc'>('asc');
    const [valueToOrderBy, setValueToOrderBy] = useState<string>('Id');
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(5); // Default rows per page


    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Reset to first page when changing rows per page
    };

    return (
        <>
            <TableContainer>
                <Table>
                    <WorkShopListTablHead
                        valueToOrderBy={valueToOrderBy}
                        orderDirection={orderDirection}
                        setSortId={setSortId}
							setIsDesc={setIsDesc}
                            sortId={sortId}
                            isDesc={isDesc}
                    />
                    {workshopArray
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((workshop, index) => (
                            <TableRow key={workshop.number}>
                                <TableCell>{workshop.number}</TableCell>
                                <TableCell>{workshop.title}</TableCell>
                                <TableCell>{formatDate(new Date(workshop.dateAndTime))}</TableCell>
                                <TableCell>{workshop.price}</TableCell>
                                <TableCell>{workshop.duration}</TableCell>
                                <TableCell>{workshop.semester}</TableCell>
                                <TableCell>{workshop.maxNumberOfAttendees}</TableCell>
                                <TableCell>
                                    <Stack direction="row" spacing={1}>
                                        <Button
                                            variant="contained"
                                            endIcon={<SendIcon />}
                                            onClick={() => {
                                                navigate(`/workshop/${workshop.id}`);
                                            }}
                                            sx={{
                                                color: '#f3db43', 
                                                backgroundColor: '#233062', 
                                                '&:hover': {
                                                  backgroundColor: '#1b255a', 
                                                },
                                              }}
                                        >
                                            Info
                                        </Button>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                </Table>  
				<TablePagination
                rowsPerPageOptions={[5, 10, 20]}
                component="div"
                count={workshopArray.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            </TableContainer>
          
        </>
    );
};
