import { Button, TextField, Breadcrumbs, Link } from "@mui/material";
import { useState } from "react";
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'; 

export const SignUp = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [major, setMajor] = useState('');
  const [faculty, setFaculty] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const navigate = useNavigate();
  const handleSubmit = async () => {
    try {
      const formData = {
        firstName,
        middleName,
        lastName,
        major,
        faculty,
        email,
        password
      };
  
      const response = await fetch('https://localhost:44344/api/Student/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
  
      if (response.ok) {
        console.log('User created successfully!');
  
        // Log the user in after signup
        const loginResponse = await fetch('https://localhost:44344/api/Auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        });
  
        if (loginResponse.ok) {
          const token = await loginResponse.text();
          localStorage.setItem('authToken', token);
          
          const decodedToken = jwtDecode(token);
          const userId = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
          const userRole = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
          
          localStorage.setItem('userId', userId);
          localStorage.setItem('userRole', userRole);
  
          // Navigate to '/students'
          navigate('/students');
          toast.success('Login successful');
        } else {
          console.error('Login failed after signup.');
          toast.success('Something went wrong');
        }
      } else {
        toast.success('Something went wrong');
        console.error('Failed to create user.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  const steps = ['Info', 'Education', 'Account'];


  return (
    <main>
      <Breadcrumbs aria-label="breadcrumb">
        {steps.map((label, index) => (
          <Link key={label} color={activeStep === index ? 'inherit' : '#233062'} onClick={() => setActiveStep(index)}   sx={{
            color: activeStep === index ? '#f3db43' : '#233062',
            cursor: 'pointer',
            
          }}>
            {label}
          </Link>
        ))}
      </Breadcrumbs>

      {activeStep === 0 && (
        <div>
          <TextField
            label="First Name"
            variant="standard"
            fullWidth
            style={{ marginBottom: '0.4rem' }}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            sx={{
              color: '#233062',
              '& .MuiInputLabel-root': { color: '#233062' },
              '& .MuiInput-root:before': { borderBottomColor: '#233062' },
              '& .MuiInput-root:after': { borderBottomColor: '#233062' },
              '& .MuiInputBase-input': { color: '#233062' },
            }}
          />
          <TextField
            label="Middle Name"
            variant="standard"
            fullWidth
            style={{ marginBottom: '0.4rem' }}
            value={middleName}
            onChange={(e) => setMiddleName(e.target.value)}
            sx={{
              color: '#233062',
              '& .MuiInputLabel-root': { color: '#233062' },
              '& .MuiInput-root:before': { borderBottomColor: '#233062' },
              '& .MuiInput-root:after': { borderBottomColor: '#233062' },
              '& .MuiInputBase-input': { color: '#233062' },
            }}
          />
          <TextField
            label="Last Name"
            variant="standard"
            fullWidth
            style={{ marginBottom: '1.5rem' }}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            sx={{
              color: '#233062',
              '& .MuiInputLabel-root': { color: '#233062' },
              '& .MuiInput-root:before': { borderBottomColor: '#233062' },
              '& .MuiInput-root:after': { borderBottomColor: '#233062' },
              '& .MuiInputBase-input': { color: '#233062' },
            }}
          />
        </div>
      )}

      {activeStep === 1 && (
        <div>
          <TextField
            label="Major"
            variant="standard"
            fullWidth
            style={{ marginBottom: '0.4rem' }}
            value={major}
            onChange={(e) => setMajor(e.target.value)}
            sx={{
              color: '#233062',
              '& .MuiInputLabel-root': { color: '#233062' },
              '& .MuiInput-root:before': { borderBottomColor: '#233062' },
              '& .MuiInput-root:after': { borderBottomColor: '#233062' },
              '& .MuiInputBase-input': { color: '#233062' },
            }}
          />
          <TextField
            label="Faculty"
            variant="standard"
            fullWidth
            style={{ marginBottom: '1.5rem' }}
            value={faculty}
            onChange={(e) => setFaculty(e.target.value)}
            sx={{
              color: '#233062',
              '& .MuiInputLabel-root': { color: '#233062' },
              '& .MuiInput-root:before': { borderBottomColor: '#233062' },
              '& .MuiInput-root:after': { borderBottomColor: '#233062' },
              '& .MuiInputBase-input': { color: '#233062' },
            }}
          />
        </div>
      )}

      {activeStep === 2 && (
        <div>
          <TextField
            label="Email"
            variant="standard"
            fullWidth
            style={{ marginBottom: '0.4rem' }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              color: '#233062',
              '& .MuiInputLabel-root': { color: '#233062' },
              '& .MuiInput-root:before': { borderBottomColor: '#233062' },
              '& .MuiInput-root:after': { borderBottomColor: '#233062' },
              '& .MuiInputBase-input': { color: '#233062' },
            }}
          />
          <TextField
            label="Password"
            variant="standard"
            type="password"
            fullWidth
            style={{ marginBottom: '1.5rem' }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              color: '#233062',
              '& .MuiInputLabel-root': { color: '#233062' },
              '& .MuiInput-root:before': { borderBottomColor: '#233062' },
              '& .MuiInput-root:after': { borderBottomColor: '#233062' },
              '& .MuiInputBase-input': { color: '#233062' },
            }}
          />
        </div>
      )}

      <div>
        {activeStep !== 0 && (
          <Button onClick={handleBack} style={{ marginRight: '1rem' }}
          sx={{
            color: '#233062',
            borderColor: '#233062',
            '&:hover': {
              borderColor: '#233062',
              backgroundColor: '#e0e0e0',
            },
          }}
          >
            Back
          </Button>
        )}
        {activeStep !== steps.length - 1 && (
          <Button
            variant="outlined"
            onClick={handleNext}
            style={{ marginRight: '1rem' }}
            sx={{
              color: '#233062',
              borderColor: '#233062',
              '&:hover': {
                borderColor: '#233062',
                backgroundColor: '#e0e0e0',
              },
            }}
          >
            Next
          </Button>
        )}
        {activeStep === steps.length - 1 && (
          <Button
            variant="outlined"
            onClick={handleSubmit}
            sx={{
              color: '#233062',
              borderColor: '#233062',
              '&:hover': {
                borderColor: '#233062',
                backgroundColor: '#e0e0e0',
              },
            }}
          >
            Sign Up
            <HowToRegIcon />
          </Button>
        )}
      </div>
    </main>
  );
};

export default SignUp;
