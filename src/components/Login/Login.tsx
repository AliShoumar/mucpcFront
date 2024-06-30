import React, { useState } from "react";
import { Button, createTheme, TextField } from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'; 
import {jwtDecode} from 'jwt-decode';

const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& label.Mui-focused': {
            color: '#233062',
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: '#233062',
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#233062',
            },
            '&:hover fieldset': {
              borderColor: '#233062',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#233062',
            },
          },
        },
      },
    },
  },
});


export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    const loginData = {
      email: email,
      password: password
    };
    console.log(
      JSON.stringify(loginData)
    )
    try {
      const response = await fetch('https://localhost:44344/api/Auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
      });

      if (response.ok) {
        const token = await response.text();
        localStorage.setItem('authToken', token);

        const decodedToken = jwtDecode(token);
        console.log('Decoded Token:', decodedToken);

        const userId = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
        const userRole = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

        localStorage.setItem('userId', userId);
        localStorage.setItem('userRole', userRole);
		
		userRole==='Manager'&& navigate("/homepage");
		userRole==='Student'&& navigate("/students");
        
        toast.success('Login successful');
      } else {
        toast.error('Invalid email or password');
        console.error('Login failed');
      }
    } catch (error) {
      toast.error('Invalid email or password');
      console.error('Error:', error);
    }
  };

  return (
    <main>
      <form onSubmit={handleLogin}>
        <TextField   sx={{
          color: '#233062',
          '& .MuiInputLabel-root': { color: '#233062' },
          '& .MuiInput-root:before': { borderBottomColor: '#233062' },
          '& .MuiInput-root:after': { borderBottomColor: '#233062' },
          '& .MuiInputBase-input': { color: '#233062' },
        }}
          id="email"
          label="Email"
          variant="standard"
          fullWidth
          style={{ marginBottom: '1.5rem' }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
        sx={{
          color: '#233062',
          '& .MuiInputLabel-root': { color: '#233062' },
          '& .MuiInput-root:before': { borderBottomColor: '#233062' },
          '& .MuiInput-root:after': { borderBottomColor: '#233062' },
          '& .MuiInputBase-input': { color: '#233062' },
        }}
          id="password"
          label="Password"
          variant="standard"
          fullWidth
          style={{ marginBottom: "1.5rem" }}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <section style={{ marginLeft: "5.8rem", marginTop: "1rem" }}>
          <Button variant="outlined" type="submit"   sx={{
            color: '#233062',
            borderColor: '#233062',
            '&:hover': {
              borderColor: '#233062',
              backgroundColor: '#e0e0e0',
            },
          }}>
            Login
            <LoginIcon />
          </Button>
        </section>
      </form>
    </main>
  );
};
