import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import { ReactElement } from 'react';
import { IActivityStatistics } from '../../interfaces/IActivityStatistics';

interface Props {
    tableData: IActivityStatistics;
}

export const StatPdfTemplate: React.FC<Props> = ({
    tableData,
}): ReactElement => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '2rem',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
            <Typography variant="h4">Activity Statistics</Typography>
            <Typography>
                Student Count:{' '}
                {tableData.registeredStudents ? tableData.registeredStudents : '0'}
            </Typography>

            <TableContainer component={Paper} sx={{ width: 700 }}>
                <Table sx={{ minWidth: 700 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {Object.entries(tableData.studentMajor[0]).map(([key, value]) => {
                                return <TableCell align="center">{key}</TableCell>;
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableData.studentMajor.map((row) => (
                            <TableRow
                                key={row.major}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell align="center" component="th" scope="row">
                                    {row.major}
                                </TableCell>
                                <TableCell align="center">{row.count}</TableCell>
                                <TableCell align="center">{row.percent}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TableContainer component={Paper} sx={{ width: 700 }}>
                <Table sx={{ minWidth: 700 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {Object.entries(tableData.studentFromWhichYear[0]).map(([key, value]) => {
                                return <TableCell align="center">{key}</TableCell>;
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableData.studentFromWhichYear.map((row) => (
                            <TableRow
                                key={row.year}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell align="center" component="th" scope="row">
                                    {row.year}
                                </TableCell>
                                <TableCell align="center">{row.count}</TableCell>
                                <TableCell align="center">{row.percent}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TableContainer component={Paper} sx={{ width: 700 }}>
                <Table sx={{ minWidth: 700 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {Object.entries(tableData.studentGender[0]).map(([key, value]) => {
                                return <TableCell align="center">{key}</TableCell>;
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableData.studentGender.map((row) => (
                            <TableRow
                                key={row.gender}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell align="center" component="th" scope="row">
                                    {row.gender}
                                </TableCell>
                                <TableCell align="center">{row.count}</TableCell>
                                <TableCell align="center">{row.percent}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TableContainer component={Paper} sx={{ width: 700 }}>
                <Table sx={{ minWidth: 700 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {Object.entries(tableData.StudentWithSpecialNeeds[0]).map(([key, value]) => {
                                return <TableCell align="center">{key}</TableCell>;
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableData.StudentWithSpecialNeeds.map((row) => (
                            <TableRow
                                key={row.specialNeeds}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell align="center" component="th" scope="row">
                                    {row.specialNeeds}
                                </TableCell>
                                <TableCell align="center">{row.count}</TableCell>
                                <TableCell align="center">{row.percent}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};
