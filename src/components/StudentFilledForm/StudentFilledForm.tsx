import React, { useState, useEffect } from 'react';
import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  Box
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export const StudentFilledForm = () => {
  const [registerRequests, setRegisterRequests] = useState([]);
  const [studentDetails, setStudentDetails] = useState({});
  const [open, setOpen] = useState(false);
  const [dialogData, setDialogData] = useState(null);
  const { workshopId } = useParams();
  const authToken = localStorage.getItem('authToken');

  const fetchRegisterRequests = async () => {
    try {
      const response = await fetch(
        `https://localhost:44344/api/WorkShop/getRegisterRequests?workshopId=${workshopId}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setRegisterRequests(data);
        await fetchStudents(data);
        console.log(data);
      } else {
        console.error('Failed to fetch registration requests');
        toast.error('Failed to fetch registration requests');
      }
    } catch (error) {
      console.error('Error fetching registration requests:', error);
    }
  };

  const fetchStudents = async (requests) => {
    try {
      const studentIds = requests.map((request) => request.studentId);
      const studentDetails = {};
      for (const id of studentIds) {
        const response = await fetch(
          `https://localhost:44344/api/Student/get?studentId=${id}`, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        if (response.ok) {
          const studentData = await response.json();
          studentDetails[id] = studentData;
        } else {
          console.error(`Failed to fetch student details for student ID ${id}`);
        }
      }
      setStudentDetails(studentDetails);
    } catch (error) {
      console.error('Error fetching student details:', error);
    }
  };

  useEffect(() => {
    fetchRegisterRequests();
  }, [workshopId]);

  const handleAcceptReject = async (requestId, isAccepted) => {
    try {
      const response = await fetch(
        `https://localhost:44344/api/RegisterReguest/verify?requestId=${requestId}&isAccepted=${isAccepted}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (response.ok) {
        console.log(`Request ${requestId} successfully ${isAccepted ? 'accepted' : 'rejected'}`);
        await fetchRegisterRequests();
      } else {
        console.error(`Failed to ${isAccepted ? 'accept' : 'reject'} request ${requestId}`);
      }
    } catch (error) {
      console.error('Error handling accept/reject:', error);
    }
  };

  const handleInfoClick = async (requestId) => {
    try {
      const response = await fetch(
        `https://localhost:44344/api/Form/getResponse?responseId=${requestId}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setDialogData(data);
        setOpen(true);
      } else {
        console.error(`Failed to fetch response data for request ID ${requestId}`);
        toast.error(`Failed to fetch response data`);
      }
    } catch (error) {
      console.error('Error fetching response data:', error);
      toast.error('Error fetching response data');
    }
  };

  const handleClose = () => {
    setOpen(false);
    setDialogData(null);
  };

  return (
    registerRequests.length === 0 ? (
      <Typography variant="h6" color="textSecondary" sx={{ margin: '20px' }}>
        There are no registration requests.
      </Typography>
    ) : (
      <>
        <TableContainer style={{ width: '100%', margin: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Register Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {registerRequests.map((request, index) => (
                <TableRow key={index}>
                  <TableCell>{studentDetails[request.studentId]?.firstName}</TableCell>
                  <TableCell>{studentDetails[request.studentId]?.lastName}</TableCell>
                  <TableCell>{studentDetails[request.studentId]?.user?.email}</TableCell>
                  <TableCell>{request.status}</TableCell>
                  <TableCell>{new Date(request.requestDateTime).toLocaleString()}</TableCell>
                  <TableCell>
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
                      onClick={() => handleAcceptReject(request.id, true)}
                    >
                      Accept
                    </Button>
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
                      onClick={() => handleAcceptReject(request.id, false)}
                    >
                      Reject
                    </Button>
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
                      onClick={() => handleInfoClick(request.id)}
                    >
                      Info
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
          <DialogTitle>Form Responses</DialogTitle>
          <DialogContent>
            {dialogData?.questionsResponses && (
              <List>
                {dialogData.questionsResponses.map((qr, index) => (
                  <ListItem key={index} alignItems="flex-start">
                    <ListItemText
                      primary={qr.formQuestion.question}
                      secondary={qr.response}
                    />
                  </ListItem>
                ))}
              </List>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </>
    )
  );
};
