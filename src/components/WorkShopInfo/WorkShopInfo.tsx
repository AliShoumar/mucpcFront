import React, { ReactElement, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IWorkShopCardItem } from '../../interfaces/IWorkShopCard';
import { Button, Grid, IconButton, Box } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import ChecklistIcon from '@mui/icons-material/Checklist';
import PostAddIcon from '@mui/icons-material/PostAdd';
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import { WorkShopInfoList } from '../WorkShopInfoList/WorkShopInfoList';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const WorkShopInfo = (): ReactElement => {
  const navigate = useNavigate();
  const { workshopId } = useParams();
  const [workshop, setWorkshop] = useState<IWorkShopCardItem | null>(null);
  const authToken = localStorage.getItem('authToken');

  async function fetchWorkshopData() {
    try {
      const response = await fetch(`https://localhost:44344/api/WorkShop/get?workshopId=${workshopId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch workshop');
      }
      const data = await response.json();
      setWorkshop(data);
    } catch (error) {
      console.error('Error fetching workshop:', error.message);
    }
  }

  async function deleteWorkshop(id: string) {
    try {
      const response = await fetch(`https://localhost:44344/api/WorkShop/delete/?workshopId=${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to delete workshop');
      }
      toast.success('Workshop deleted successfully');
      console.log('Workshop deleted successfully');
      navigate('/workshop/list');
    } catch (error) {
      console.error('Error deleting workshop:', error.message);
      toast.error('Failed to delete workshop');
    }
  }

  useEffect(() => {
    fetchWorkshopData();
  }, [workshopId]);

  return (
    <Box sx={{ p: { xs: 2, sm: 4, md: 8 } }}>
      <Grid container spacing={2} alignItems="center" justifyContent="space-between">
        <Grid item>
          <IconButton onClick={() => navigate('/workshop/list')}>
            <ArrowBackIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <Grid container spacing={1}>
            <Grid item>
              <IconButton onClick={() => navigate(`/workshop/${workshopId}/form`)}>
                <PostAddIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton onClick={() => navigate(`/workshop/${workshopId}/students-filled-form`)}>
                <ChecklistIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton onClick={() => navigate(`/workshop/${workshopId}/students`)}>
                <ChecklistRtlIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton onClick={() => navigate(`/workshop/${workshopId}/stats`)}>
                <QueryStatsIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton onClick={() => navigate(`/workshop/${workshopId}/edit`)}>
                <EditIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton onClick={() => deleteWorkshop(workshopId)}>
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <WorkShopInfoList workshop={workshop} />
    </Box>
  );
};
