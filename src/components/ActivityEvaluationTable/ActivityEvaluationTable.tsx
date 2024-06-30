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

interface Props {
    studentCount: number;
}

export const ActivityEvaluationTable: React.FC<Props> = ({
    studentCount,
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
            <Typography variant="h4" style={{
                marginTop:'4rem'
            }}>Activity Evaluation</Typography>
            <Typography>
                Student Count: {studentCount}
            </Typography>

            <TableContainer component={Paper} sx={{ width: 700 }}>
                <Table sx={{ minWidth: 700 }} aria-label="evaluation table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Criteria</TableCell>
                            <TableCell>Poor</TableCell>
                            <TableCell>Good</TableCell>
                            <TableCell>Excellent</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>Trainer's Familiarity with Training Program Topics</TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Clarity of Trainer's Presentation Organization</TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Trainer's Ability to Encourage Participants to Interact</TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Trainer's Effective Time Management</TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Training Material Covered Course Topics</TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Practical Examples Availability</TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Benefit from Training Material</TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Suitable Training Room (Lighting, Air Conditioning, Chairs)</TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};
