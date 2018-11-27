import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import CommuteIcon from '@material-ui/icons/Commute';
import EventIcon from '@material-ui/icons/Event';
import GavelIcon from '@material-ui/icons/Gavel';

const mainListItems = (props) => {

  return (
    <div>
      <ListItem button onClick={() => props.onVehicle()}>
        <ListItemIcon>
          <CommuteIcon />
        </ListItemIcon>
        <ListItemText primary="Vehicles" />
      </ListItem>
      <ListItem button onClick={() => props.onReservation()}>
        <ListItemIcon>
          <EventIcon />
        </ListItemIcon>
        <ListItemText primary="Reservations" />
      </ListItem>
      <ListItem button onClick={() => props.onTicket()}>
        <ListItemIcon>
          <GavelIcon />
        </ListItemIcon>
        <ListItemText primary="Ticket" />
      </ListItem>
    </div>
  );
};

export default mainListItems;
