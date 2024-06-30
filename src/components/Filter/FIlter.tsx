import React, { ReactElement } from 'react';
import {
  Fab,
  FormControl,
  InputLabel,
  NativeSelect,
  TextField,
  Grid,
  Box,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInput-underline:before': {
            borderBottomColor: '#233062',
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: '#233062',
          },
          '& .MuiInputBase-input': {
            color: '#233062',
          },
          '& .MuiInputLabel-root': {
            color: '#233062',
          },
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          '& .MuiInputLabel-root': {
            color: '#233062',
          },
          '& .MuiNativeSelect-root': {
            color: '#233062',
          },
          '& .MuiNativeSelect-icon': {
            color: '#233062',
          },
        },
      },
    },
    MuiFab: {
      styleOverrides: {
        primary: {
          backgroundColor: '#233062',
          '&:hover': {
            backgroundColor: '#1b255a',
          },
        },
      },
    },
  },
});


interface Props {
  setFilterId: (id: string) => void;
  setFilterBy: (value: string) => void;
}

export const Filter = ({ setFilterId, setFilterBy }: Props): ReactElement => {
  const navigate = useNavigate();

  const handleFilterIdChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setFilterId(event.target.value as string);
  };

  const handleFilterByChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterBy(event.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
    <Box sx={{ flexGrow: 1, mt: 3, mb: 3, ml: 3, mr: 3 }}>
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            id="standard-basic"
            label="Filter"
            variant="standard"
            fullWidth
            onChange={handleFilterByChange}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth variant="standard">
            <InputLabel htmlFor="uncontrolled-native">By</InputLabel>
            <NativeSelect defaultValue={'number'} onChange={handleFilterIdChange}>
              <option value={'title'}>Title</option>
              <option value={'number'}>Id</option>
              <option value={'semester'}>Semester</option>
              <option value={'Price'}>Price</option>
              <option value={'acedemicYear'}>AcedemicYear</option>
              <option value={'duration'}>Duration</option>
              <option value={'numberOfHours'}>Number Of Hours</option>
              <option value={'maxNumberOfAttendees'}>Max Number Of Attendens</option>
            </NativeSelect>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={4} textAlign="center">
          <Fab
            sx={{
              color:"#f3db43",
              bgcolor: '#233062'
            }}
            aria-label="add"
            onClick={() => navigate('/workshop/new')}
          >
            <AddIcon />
          </Fab>
        </Grid>
      </Grid>
    </Box>
    </ThemeProvider>
  );
};
