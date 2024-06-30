import React, { ReactElement } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Grid,
} from '@mui/material';
import { IActivityStatistics } from '../../interfaces/IActivityStatistics';

interface Props {
  tableData: IActivityStatistics;
}

export const WorkShopStatsTable: React.FC<Props> = ({
  tableData,
}): ReactElement => {
  return (
    <>
       <Typography variant="h4" align="center" sx={{ }} gutterBottom>
        Activity Statistics
      </Typography>
      <Typography align="center" sx={{ marginBottom: '20px' }}>
        Student Count:{' '}
        {tableData.registeredStudents ? tableData.registeredStudents : '0'}
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <TableContainer component={Paper}>
            <Table aria-label="student major table">
              <TableHead>
                <TableRow>
                  {Object.keys(tableData.studentMajor[0]).map((key) => (
                    <TableCell key={key} align="center">
                      {key}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData.studentMajor.map((row) => (
                  <TableRow key={row.major}>
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
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <TableContainer component={Paper}>
            <Table aria-label="student from which year table">
              <TableHead>
                <TableRow>
                  {Object.keys(tableData.studentFromWhichYear[0]).map((key) => (
                    <TableCell key={key} align="center">
                      {key}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData.studentFromWhichYear.map((row) => (
                  <TableRow key={row.year}>
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
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <TableContainer component={Paper}>
            <Table aria-label="student gender table">
              <TableHead>
                <TableRow>
                  {Object.keys(tableData.studentGender[0]).map((key) => (
                    <TableCell key={key} align="center">
                      {key}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData.studentGender.map((row) => (
                  <TableRow key={row.gender}>
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
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <TableContainer component={Paper}>
            <Table aria-label="students with special needs table">
              <TableHead>
                <TableRow>
                  {Object.keys(tableData.StudentWithSpecialNeeds[0]).map((key) => (
                    <TableCell key={key} align="center">
                      {key}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData.StudentWithSpecialNeeds.map((row) => (
                  <TableRow key={row.specialNeeds}>
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
        </Grid>
      </Grid>
    </>
  );
};
