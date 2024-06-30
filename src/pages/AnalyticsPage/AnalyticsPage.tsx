import React, { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Dialog,
    DialogTitle,
    DialogContent,
    Typography,
    Button,
    Select,
    MenuItem,
    Box,
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Header2 } from '../../components/Header2.0/Header2';

const AnalyticsPage: React.FC = () => {
    const [academicYears, setAcademicYears] = useState<number[]>([]);
    const [totalWorkshops, setTotalWorkshops] = useState<number | null>(null);
    const [totalInstructors, setTotalInstructors] = useState<number | null>(null);
    const [highestRatedWorkshop, setHighestRatedWorkshop] = useState<any | null>(null);
    const [highestRatedInstructor, setHighestRatedInstructor] = useState<any | null>(null);
    const [highestRatedWorkshopInYear, setHighestRatedWorkshopInYear] = useState<any | null>(null);
    const [highestRatedInstructorInYear, setHighestRatedInstructorInYear] = useState<any | null>(null);
    const [workshopsInYear, setWorkshopsInYear] = useState<number | null>(null);
    const [selectedYear, setSelectedYear] = useState<number>(23);
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogData, setDialogData] = useState<any | null>(null);
    const [workshopSpecific,setWorkshopSpecific] = useState([]);


    const authToken = localStorage.getItem('authToken');
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const urls = [
                    'https://localhost:44344/api/Analytics/academicYears',
                    'https://localhost:44344/api/Analytics/totalNumberOfWorkshops',
                    'https://localhost:44344/api/Analytics/totalNumberOfInstructors',
                    'https://localhost:44344/api/Analytics/highestRatedWorkshop',
                    'https://localhost:44344/api/Analytics/highestRatedInstructor',
                    `https://localhost:44344/api/Analytics/highestRatedWorkshopInAnAcademicYear?year=${selectedYear}`,
                    `https://localhost:44344/api/Analytics/highestRatedInstructorInAnAcademicYear?year=${selectedYear}`,
                    `https://localhost:44344/api/Analytics/numberOfWorkShopsInAnAcademicYear?year=${selectedYear}`,
                    `https://localhost:44344/api/WorkShop/getByAcademicYear?AcademicYear=${selectedYear}`,
                ];

                const responses = await Promise.all(
                    urls.map((url) =>
                        fetch(url, {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${authToken}`,
                            },
                        })
                    )
                );
                const data = await Promise.all(responses.map((res) => res.json()));

                setAcademicYears(data[0]);
                setTotalWorkshops(data[1]);
                setTotalInstructors(data[2]);
                setHighestRatedWorkshop(data[3]);
                setHighestRatedInstructor(data[4]);
                setHighestRatedWorkshopInYear(data[5]);
                setHighestRatedInstructorInYear(data[6]);
                setWorkshopsInYear(data[7]);
                setWorkshopSpecific(data[8]);

            } catch (error) {
                console.error('Error fetching analytics data:', error);
                toast.error('Error fetching analytics data');
            }
        };

        fetchData();

        return () => {
        };
    }, [selectedYear]);

    const handleHighestRatedWorkshopClick = async () => {
        try {
            const response = await fetch('https://localhost:44344/api/Analytics/highestRatedWorkshop',{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`,
                },
            });
            const data = await response.json();
            setDialogData(data);
            setOpenDialog(true);
        } catch (error) {
            console.error('Error fetching highest rated workshop:', error);
            toast.error('Error fetching highest rated workshop');
        }
    };

    const handleHighestRatedInstructorClick = async () => {
        try {
            const response = await fetch('https://localhost:44344/api/Analytics/highestRatedInstructor',{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`,
                },
            });
            const data = await response.json();
            setDialogData(data);
            setOpenDialog(true);
        } catch (error) {
            console.error('Error fetching highest rated instructor:', error);
            toast.error('Error fetching highest rated instructor');
        }
    };

    const handleHighestRatedWorkshopInYearClick = async () => {
        try {
            const response = await fetch(`https://localhost:44344/api/Analytics/highestRatedWorkshopInAnAcademicYear?year=${selectedYear}`,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`,
                },
            });
            const data = await response.json();
            setDialogData(data);
            setOpenDialog(true);
        } catch (error) {
            console.error('Error fetching highest rated workshop in an academic year:', error);
            toast.error('Error fetching highest rated workshop in an academic year');
        }
    };

    const handleHighestRatedInstructorInYearClick = async () => {
        try {
            const response = await fetch(`https://localhost:44344/api/Analytics/highestRatedInstructorInAnAcademicYear?year=${selectedYear}`,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`,
                },
            });
            const data = await response.json();
            setDialogData(data);
            setOpenDialog(true);
        } catch (error) {
            console.error('Error fetching highest rated instructor in an academic year:', error);
            toast.error('Error fetching highest rated instructor in an academic year');
        }
    };

    return (
        <>
            <Header2 />
            <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} justifyContent="space-between" p={3}>
                <div style={{ flex: 1 ,margin:'20px'}}>
                    <h2 style={{ marginBottom: '20px' }}>Analytics Data</h2>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Title</TableCell>
                                    <TableCell>Data</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>Academic Years</TableCell>
                                    <TableCell>{academicYears.join(', ')}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Total Number of Workshops</TableCell>
                                    <TableCell>{totalWorkshops}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Total Number of Instructors</TableCell>
                                    <TableCell>{totalInstructors}</TableCell>
                                </TableRow>
                                <TableRow onClick={handleHighestRatedWorkshopClick} style={{ cursor: 'pointer' }}>
                                    <TableCell>Highest Rated Workshop</TableCell>
                                    <TableCell>{highestRatedWorkshop ? highestRatedWorkshop.title : '-'}</TableCell>
                                </TableRow>
                                <TableRow onClick={handleHighestRatedInstructorClick} style={{ cursor: 'pointer' }}>
                                    <TableCell>Highest Rated Instructor</TableCell>
                                    <TableCell>{highestRatedInstructor ? `${highestRatedInstructor.firstName} ${highestRatedInstructor.lastName}` : '-'}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <div style={{ flex: 1 , margin:'20px'}}>
                    <h2 style={{ marginBottom: '20px' }}>Analytics Data in Year {selectedYear}</h2>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Title</TableCell>
                                    <TableCell>Data</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow onClick={handleHighestRatedWorkshopInYearClick} style={{ cursor: 'pointer' }}>
                                    <TableCell>Highest Rated Workshop</TableCell>
                                    <TableCell>{highestRatedWorkshopInYear ? highestRatedWorkshopInYear.title : '-'}</TableCell>
                                </TableRow>
                                <TableRow onClick={handleHighestRatedInstructorInYearClick} style={{ cursor: 'pointer' }}>
                                    <TableCell>Highest Rated Instructor</TableCell>
                                    <TableCell>{highestRatedInstructorInYear ? `${highestRatedInstructorInYear.firstName} ${highestRatedInstructorInYear.lastName}` : '-'}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Number of Workshops</TableCell>
                                    <TableCell>{workshopsInYear}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Select
                        value={selectedYear}
                        onChange={(event) => setSelectedYear(Number(event.target.value))}
                        style={{ marginTop: '10px', minWidth: '200px' }}
                    >
                        <MenuItem value={23}>Year 23</MenuItem>
                        <MenuItem value={24}>Year 24</MenuItem>
                    </Select>
                </div>
            </Box>
            <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} justifyContent="space-between" p={3}>
                <div style={{ flex: 1, margin: '20px' }}>
                    <h2 style={{ marginBottom: '20px' }}>Workshop Specific Data</h2>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Number</TableCell>
                                    <TableCell>Title</TableCell>
                                    <TableCell>Description</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {workshopSpecific.map((workshop, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{workshop.number}</TableCell>
                                        <TableCell>{workshop.title}</TableCell>
                                        <TableCell>{workshop.description}</TableCell>
                                    
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </Box>
            {console.log(workshopSpecific)}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>Details</DialogTitle>
                <DialogContent>
                    {dialogData && Object.entries(dialogData).map(([key, value]) => (
                        <Typography key={key} variant="body1">
                            {`${key}: ${value}`}
                        </Typography>
                    ))}
                    <Button onClick={() => setOpenDialog(false)}>Close</Button>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default AnalyticsPage;
