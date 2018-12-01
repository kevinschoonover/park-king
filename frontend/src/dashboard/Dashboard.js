import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { auth } from '../auth';

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

import Eject from '@material-ui/icons/Eject';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';

import { MuiPickersUtilsProvider } from 'material-ui-pickers';
// pick utils
import MomentUtils from '@date-io/moment';

import { styles } from './styles';
import MainListItems from './listItems';
import Ticket from './Ticket';
import Vehicle from './Vehicle';
import Reservation from './Reservation';
import VehicleForm from './VehicleForm';
import ReservationForm from './ReservationForm';

const TICKET_MENU = "ticket";
const VEHICLE_MENU = "vehicle";
const RESERVATION_MENU = "reservation";
const VEHICLE_FORM = "vehicle_form";
const RESERVATION_FORM = "reservation_form";

class Dashboard extends React.Component {
  state = {
    open: true,
    menu: VEHICLE_MENU,
  };

  logOut = () => {
    auth.signOut();
    this.props.history.push("/");
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

  setVehicleForm = () => {
    this.setState({ menu: VEHICLE_FORM });
  };

  setReservationForm = () => {
    this.setState({ menu: RESERVATION_FORM });
  };

  render() {
    const { classes } = this.props;
    const menu = this.state.menu;
    let main_menu = null

    switch (menu) {
      case TICKET_MENU:
        main_menu = <Ticket />
        break;
      case RESERVATION_MENU:
        main_menu = <Reservation onForm={() => this.setReservationForm()}/>
        break;
      case VEHICLE_MENU:
        main_menu = <Vehicle onForm={() => this.setVehicleForm()}/>
        break;
      case RESERVATION_FORM:
        main_menu = <ReservationForm onSubmit={() => this.setReservationMenu()}/>
        break;
      case VEHICLE_FORM:
        main_menu = <VehicleForm onSubmit={() => this.setVehicleMenu()}/>
        break;
      default:
        break;
    }

    return (
      <MuiPickersUtilsProvider utils={MomentUtils}>
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
              <IconButton color="inherit" onClick={this.logOut}>
                <Eject/>
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
      </MuiPickersUtilsProvider>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);
