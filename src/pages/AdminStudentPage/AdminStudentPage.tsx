import React, { useState, useEffect } from 'react';
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Modal,
  TextField,
  Box,
  createTheme,
  useMediaQuery,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Grid,
} from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Header2 } from '../../components/Header2.0/Header2';

export const AdminStudentPage = () => {
  const [studentData, setStudentData] = useState([]);
  const [open, setOpen] = useState(false);
  const [newAdminOpen, setNewAdminOpen] = useState(false);
  const [newStudentPassword, setNewStudentPassword] = useState('');
  const [studentId, setStudentId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [major, setMajor] = useState('');
  const [faculty, setFaculty] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const authToken = localStorage.getItem('authToken');

  useEffect(() => {
    fetchStudentData();
  }, []);

  const fetchStudentData = async () => {
    try {
      const response = await fetch('https://localhost:44344/api/Student/getall', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      });
      const data = await response.json();
      setStudentData(data);
    } catch (error) {
      console.error('Error fetching student data:', error);
      toast.error('Failed to fetch student data.');
    }
  };

  const handleStudentEdit = (id) => {
    setOpen(true);
    setStudentId(id);
  };

  const handleStudentClose = () => {
    setOpen(false);
    setNewStudentPassword('');
  };

  const handleStudentUpdate = async () => {
    try {
      const response = await fetch(
        `https://localhost:44344/api/Auth/resetPassword?userId=${studentId}&newPassword=${newStudentPassword}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (response.ok) {
        toast.success('Password updated successfully.');
      } else {
        console.error('Failed to update password.');
        toast.error('Failed to update password.');
      }
      handleStudentClose();
    } catch (error) {
      console.error('Error updating password:', error);
      toast.error('Error updating password.');
    }
  };

  const handleDeleteStudent = async (studentId) => {
    try {
      const response = await fetch(
        `https://localhost:44344/api/Student/delete?studentId=${studentId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (response.ok) {
        fetchStudentData();
        toast.success('Student deleted successfully.');
      } else {
        console.error('Failed to delete student.');
        toast.error('Failed to delete student.');
      }
    } catch (error) {
      console.error('Error deleting student:', error);
      toast.error('Error deleting student.');
    }
  };

  const handleCreateStudent = () => {
    setNewAdminOpen(true);
  };

  const handleCreateAdminClose = () => {
    setNewAdminOpen(false);
    setNewEmail('');
    setNewPassword('');
  };

  const handleStudentCreate = async () => {
    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(newEmail)) {
        toast.error('Please enter a valid email address.');
        return;
      }

      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(newPassword)) {
        toast.error(
          'Password must have at least one uppercase letter, one lowercase letter, one digit, and one special character.'
        );
        return;
      }

      const response = await fetch(
        'https://localhost:44344/api/Student/create',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            firstName,
            middleName,
            lastName,
            email: newEmail,
            phoneNumber,
            major,
            faculty,
            password: newPassword,
          }),
        }
      );

      if (response.ok) {
        toast.success('Student created successfully.');
        fetchStudentData();
        setNewAdminOpen(false);
      } else {
        console.error('Failed to create student.');
        toast.error('Failed to create student.');
      }
    } catch (error) {
      console.error('Error creating student:', error);
      toast.error('Error creating student.');
    }
  };

  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1920,
      },
    },
  });
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div>
      <Header2 />
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'end',
          marginTop: '15px',
          marginBottom: '15px',
        }}>
        <Button
          variant="contained"
          color="primary"
        
                  
          sx={{
              color: '#f3db43', 
              backgroundColor: '#233062', 
              '&:hover': {
                backgroundColor: '#1b255a', 
              },
            }}
          onClick={handleCreateStudent}>
          Create Student
        </Button>
      </div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Middle Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Reset</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {studentData.map((student) => (
              <TableRow key={student.userId}>
                <TableCell>{student.userId}</TableCell>
                <TableCell>{student.user.email}</TableCell>
                <TableCell>{student.firstName}</TableCell>
                <TableCell>{student.middleName}</TableCell>
                <TableCell>{student.lastName}</TableCell>
                <TableCell>
                  <Button
                   variant="contained"
                  
                  sx={{
                      color: '#f3db43', 
                      backgroundColor: '#233062', 
                      '&:hover': {
                        backgroundColor: '#1b255a', 
                      },
                    }}

                    onClick={() => handleStudentEdit(student.userId)}>
                    Reset
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDeleteStudent(student.userId)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal open={open} onClose={handleStudentClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            width: 400,
          }}>
          <TextField
            label="Reset Password"
            fullWidth
            type="password"
            value={newStudentPassword}
            onChange={(e) => setNewStudentPassword(e.target.value)}
            margin="normal"
          />
          <Button
            variant="contained"
            sx={{
              color: '#f3db43',
              backgroundColor: '#233062',
              '&:hover': {
                backgroundColor: '#1b255a',
              },
              marginRight: 2
            }}
            onClick={handleStudentUpdate}>
            Update
          </Button>
          <Button 
            variant="contained"
            sx={{
              color: '#f3db43',
              backgroundColor: '#233062',
              '&:hover': {
                backgroundColor: '#1b255a',
              },
            }}
          onClick={handleStudentClose}>
            Cancel
          </Button>
        </Box>
      </Modal>
      <Modal open={newAdminOpen} onClose={handleCreateAdminClose}>
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        width: 600,
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="First Name"
            fullWidth
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Middle Name"
            fullWidth
            value={middleName}
            onChange={(e) => setMiddleName(e.target.value)}
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Last Name"
            fullWidth
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Email"
            fullWidth
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Phone Number"
            fullWidth
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Major"
            fullWidth
            value={major}
            onChange={(e) => setMajor(e.target.value)}
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Faculty</InputLabel>
            <Select
              value={faculty}
              onChange={(e) => setFaculty(e.target.value)}
            >
              <MenuItem value="Engineering">Engineering</MenuItem>
              <MenuItem value="Science">Science</MenuItem>
              <MenuItem value="Business">Business</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Password"
            fullWidth
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            margin="normal"
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            sx={{
              color: '#f3db43',
              backgroundColor: '#233062',
              '&:hover': {
                backgroundColor: '#1b255a',
              },
              marginRight: 2
            }}
            onClick={handleStudentCreate}
          >
            Create
          </Button>
          <Button
            variant="contained"
            sx={{
              color: '#f3db43',
              backgroundColor: '#233062',
              '&:hover': {
                backgroundColor: '#1b255a',
              },
            }}
            onClick={handleCreateAdminClose}
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    </Box>
  </Modal>
    </div>
  );
};
