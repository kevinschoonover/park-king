import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import axios from "axios";

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
import Snackbar from '@material-ui/core/Snackbar';

import Eject from '@material-ui/icons/Eject';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

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

const url = process.env.REACT_APP_API;

class Dashboard extends React.Component {
  state = {
    open: true,
    menu: VEHICLE_MENU,
    lots: [],
    vehicle_types: [],
    vehicles: [],
    reservations: [],
    tickets: [],
    snacks: false,
    message: "",
  };

  openSnack = (message) => {
    this.setState({ snack: true, message });
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

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ snack: false });
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

  updateVehicles = () => {
    axios.get(url + `/users/${auth.userID()}/vehicles/`)
      .then((response) => {
        const vehicles = response.data;
        this.setState({ vehicles });
      })
      .catch((error) => {
        this.openSnack("Internal Server Error");
      });
  }

  updateReservations = () => {
    let reservations = []
    axios.get(url + `/users/${auth.userID()}/reservations/`)
      .then((response) => {
        reservations = response.data;
        let promises = []

        reservations.forEach((reservation, index) => {
          promises.push(
            axios.get(url + `/vehicles/${reservation.vehicle_id}/`)
              .then((response) => {
                reservation.vehicle = response.data
              })
          );
          promises.push(axios.get(url + `/lots/${reservation.lot_id}/`)
            .then((response) => {
              reservation.lot = response.data
            })
          );
        })

        Promise.all(promises).then((response) =>{
          this.setState({ reservations });
        });
      })
      .catch((error) => {
        this.openSnack("Internal Server Error");
      });
  }

  updateTickets = () => {
    let promises = []
    let tickets = []
    axios.get(url + `/users/${auth.userID()}/tickets/`)
      .then((response) => {
        tickets = response.data
        tickets.forEach((ticket, index) => {
          promises.push(
            axios.get(url + `/vehicles/${ticket.vehicle_id}/`)
              .then((response) => {
                ticket.vehicle = response.data
                return axios.get(url + `/lots/${ticket.lot_id}/`);
              })
              .then((response) => {
                ticket.lot = response.data
              })
          )
        });

        Promise.all(promises)
          .then((response) => {
            this.setState({ tickets });
          })
          .catch((error) => {
            console.log(error.response);
          })
      })
      .catch((error) => {
         this.openSnack("Internal Server Error");
      })
  }

  componentDidMount() {
    axios.get(url + '/lots/')
      .then((response) => {
        this.setState({ lots: response.data });
      })
      .catch((error) => {
        this.openSnack("Internal Server Error");
      });

    axios.get(url + '/vehicle_types/')
      .then((response) => {
        this.setState({ vehicle_types: response.data });
      })
      .catch((error) => {
        this.openSnack("Internal Server Error");
      });

    this.updateVehicles();
    this.updateReservations();
    this.updateTickets();
  }

  render() {
    const { classes } = this.props;
    const menu = this.state.menu;
    let main_menu = null

    switch (menu) {
      case TICKET_MENU:
        main_menu = <Ticket tickets={this.state.tickets} />
        break;
      case RESERVATION_MENU:
        main_menu = <Reservation
                      reservations={this.state.reservations}
                      onForm={() => this.setReservationForm()}
                    />
        break;
      case VEHICLE_MENU:
        main_menu = <Vehicle vehicles={this.state.vehicles} onForm={() => this.setVehicleForm()}/>
        break;
      case RESERVATION_FORM:
        main_menu = <ReservationForm
                      vehicles={this.state.vehicles}
                      lots={this.state.lots}
                      onSubmit={() => { this.updateReservations(); this.setReservationMenu(); }}
                    />
        break;
      case VEHICLE_FORM:
        main_menu = <VehicleForm
                      types={this.state.vehicle_types}
                      onSubmit={() => { this.setVehicleMenu(); this.updateVehicles() }}
                    />
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
                Hello, { auth.user().email }!
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
        <Snackbar
          open={this.state.snacks}
          autoHideDuration={6000}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={this.state.message}
        />

      </MuiPickersUtilsProvider>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);
