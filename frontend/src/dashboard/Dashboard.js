import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';

import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';

import { styles } from './styles';
import MainListItems from './listItems';
import Ticket from './Ticket';
import Vehicle from './Vehicle';
import Reservation from './Reservation';

const TICKET_MENU = "ticket"
const VEHICLE_MENU = "vehicle"
const RESERVATION_MENU = "reservation"

class Dashboard extends React.Component {
  state = {
    open: true,
    menu: VEHICLE_MENU,
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  setTicketMenu = () => {
    this.setState({ menu: TICKET_MENU });
  };

  setVehicleMenu = () => {
    this.setState({ menu: VEHICLE_MENU });
  };

  setReservationMenu = () => {
    this.setState({ menu: RESERVATION_MENU });
  };

  render() {
    const { classes } = this.props;
    const menu = this.state.menu;
    let main_menu = null

    if (menu === TICKET_MENU) {
      main_menu = <Ticket />
    } else if (menu === VEHICLE_MENU) {
      main_menu = <Vehicle />
    } else if (menu === RESERVATION_MENU) {
      main_menu = <Reservation />
    }

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="absolute"
          className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
        >
          <Toolbar disableGutters={!this.state.open} className={classes.toolbar}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(
                classes.menuButton,
                this.state.open && classes.menuButtonHidden,
              )}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            >
              Hello, Kevin!
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
          }}
          open={this.state.open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            <MainListItems onTicket={() => this.setTicketMenu()}
                           onVehicle={() => this.setVehicleMenu()}
                           onReservation={() => this.setReservationMenu()} />
          </List>
          <Divider />
        </Drawer>
        <main className={classes.content}>
          { main_menu }
        </main>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);
