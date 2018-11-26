import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import CommuteIcon from '@material-ui/icons/Commute';
import EventIcon from '@material-ui/icons/Event';
import GavelIcon from '@material-ui/icons/Gavel';

export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <CommuteIcon />
      </ListItemIcon>
      <ListItemText primary="Vehicles" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <EventIcon />
      </ListItemIcon>
      <ListItemText primary="Reservations" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <GavelIcon />
      </ListItemIcon>
      <ListItemText primary="Ticket" />
    </ListItem>
  </div>
);
