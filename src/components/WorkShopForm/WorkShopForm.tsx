import { useState, useEffect, ReactElement } from 'react';
import {
  Button,
  TextField,
  MenuItem,
  Grid,
  Box
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const WorkShopForm = (): ReactElement => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    number: '',
    title: '',
    description: '',
    numberOfHours: 0,
    targetedFaculties: '',
    price: 0,
    duration: '',
    objectives: '',
    deliveryType: '',
    instructorId: 0,
    dateAndTime: new Date().toISOString(),
    speaker: '',
    organizedBy: '',
    registrationLink: 'http://localhost:5173/students',
    maxNumberOfAttendees: 0,
  });

  const [instructors, setInstructors] = useState([]);
  const authToken = localStorage.getItem('authToken');

  useEffect(() => {
    fetchInstructors();
  }, []);

  const fetchInstructors = async () => {
    try {
      const response = await fetch('https://localhost:44344/api/Instructor/getall', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setInstructors(data);
      } else {
        toast.error('Failed to fetch instructors');
      }
    } catch (error) {
      console.error('Error fetching instructors:', error.message);
      toast.error('Failed to fetch instructors');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://localhost:44344/api/WorkShop/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        toast.success('Workshop created successfully');
        navigate('/workshop');
      } else {
        toast.error('Failed to create workshop');
      }
    } catch (error) {
      console.error('Error creating workshop:', error.message);
      toast.error('Failed to create workshop');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <Box sx={{ p: 2 }}>
      <Button onClick={() => navigate('/workshop')}   variant="contained"
            sx={{
              color: '#f3db43',
              backgroundColor: '#233062',
              '&:hover': {
                backgroundColor: '#1b255a',
              },
              mb: '2'            }}>
        <ArrowBackIcon />
      </Button>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              id="title"
              label="Title"
              variant="filled"
              name="title"
              fullWidth
              value={formData.title}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
          <TextField
              id="maxNumberOfAttendees"
              label="Max Number Of Attendees"
              variant="filled"
              type="number"
              fullWidth
              name="maxNumberOfAttendees"
              value={formData.maxNumberOfAttendees}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="numberOfHours"
              label="Number of Hours"
              variant="filled"
              type="number"
              fullWidth
              name="numberOfHours"
              value={formData.numberOfHours}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="targetedFaculties"
              label="Targeted Faculties"
              variant="filled"
              fullWidth
              name="targetedFaculties"
              value={formData.targetedFaculties}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="price"
              label="Price"
              variant="filled"
              type="number"
              fullWidth
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="duration"
              label="Duration"
              variant="filled"
              fullWidth
              name="duration"
              value={formData.duration}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="objectives"
              label="Objectives"
              variant="filled"
              fullWidth
              name="objectives"
              value={formData.objectives}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="deliveryType"
              label="Delivery Type"
              variant="filled"
              fullWidth
              name="deliveryType"
              value={formData.deliveryType}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="dateAndTime"
              label="Date and Time"
              variant="filled"
              type="datetime-local"
              fullWidth
              name="dateAndTime"
              value={formData.dateAndTime}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              id="instructorId"
              label="Instructor"
              variant="filled"
              fullWidth
              name="instructorId"
              value={formData.instructorId}
              onChange={handleChange}
            >
              {instructors.map((instructor) => (
                <MenuItem key={instructor.id} value={instructor.id}>
                  {`${instructor.firstName} ${instructor.lastName}`}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="speaker"
              label="Speaker"
              variant="filled"
              fullWidth
              name="speaker"
              value={formData.speaker}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="organizedBy"
              label="Organized By"
              variant="filled"
              fullWidth
              name="organizedBy"
              value={formData.organizedBy}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            {/* <TextField
              id="registrationLink"
              label="Registration Link"
              variant="filled"
              fullWidth
              name="registrationLink"
              value={formData.registrationLink}
              onChange={handleChange}
            /> */}
              <TextField
              id="description"
              label="Description"
              variant="filled"
              multiline
              rows={4}
              fullWidth
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
          
          </Grid>
        </Grid>
        <Box sx={{ mt: 2, textAlign: 'right' }}>
          <Button type="submit" 
          
          variant="contained"
          sx={{
            color: '#f3db43',
            backgroundColor: '#233062',
            '&:hover': {
              backgroundColor: '#1b255a',
            }
          
          }}
          color="primary">
            <ArrowUpwardIcon />
          </Button>
        </Box>
      </form>
    </Box>
  );
};
