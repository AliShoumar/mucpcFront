import React, { ReactElement } from 'react';
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Box,
  Grid
} from '@mui/material';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import { capitalizeFirstLetter } from '../../utils/CapitalizeFirstLetter';
import { renderValue } from '../../utils/renderValues';
import { IWorkShopCardItem } from '../../interfaces/IWorkShopCard';
import { QrCode } from '../QrCode/QrCode';

interface Props {
  workshop: IWorkShopCardItem | null; 
}

export const WorkShopInfoList: React.FC<Props> = ({ workshop }): ReactElement => {
  if (!workshop) {
    return <Box>No workshop data available</Box>;
  }

  return (
    <Box sx={{ p: { xs: 2, sm: 4, md: 6, lg: 6 } }}>
      <Grid container spacing={2}>
        {Object.entries(workshop).map(([key, value]) => (
          <Grid item xs={12} md={6} key={key}>
            <List>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar>
                    <ImportContactsIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={capitalizeFirstLetter(key)}
                  secondary={
                    <Typography
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {renderValue(value)}
                    </Typography>
                  }
                />
              </ListItem>
            </List>
          </Grid>
        ))}
        {workshop.registrationLink && (
          <Grid item xs={9} md={3}>
            <Box display="flex" justifyContent="center">
              <QrCode value={workshop.registrationLink} />
            </Box>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};
