import React, { Component } from 'react'
import { Link } from "react-router-dom";

import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Fab from '@material-ui/core/Fab';

import { Map, TileLayer, Popup, Polygon } from 'react-leaflet'

const styles = theme => ({
  overlay: {
    position: "absolute",
    height: 300,
    width: 300,
    right: 0,
    marginRight: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 2,
    zIndex: 1000,
    pointerEvents: "auto",
  },
  profile: {
    position: "absolute",
    right: 0,
    bottom: 0,
    marginRight: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit * 4,
    zIndex: 1000,
    pointerEvents: "auto",
    fontSize: 26,
  },
  header: {
    marginTop: theme.spacing.unit
  },
  lotLabel: {
    marginLeft: theme.spacing.unit * 2,
    fontSize: 26,
    padding: 0
  },
  lotContainer: {},
  size: {},
	sizeIcon: {
		fontSize: 36,
	},
})

class FullMap extends Component {
  state = {
    lat: 37.954403,
    lng: -91.774891,
    zoom: 17,
    lots: [],
    show: {},
  }

  handleChange = name => event => {
    let state_copy = JSON.parse(JSON.stringify(this.state.show))
    state_copy[name] = event.target.checked
    this.setState({show: state_copy});
  };

  componentDidMount() {
    const lots = [
      {
        name: "S",
        location: [
          [37.95587,-91.78055],
          [37.95639,-91.78023],
          [37.95751,-91.77680],
          [37.95659,-91.77682],
          [37.95593,-91.77848],
          [37.95545,-91.78023],
        ]
      },
      {
        name: "H",
        location: [
          [37.95509,-91.78012],
          [37.95505,-91.77723],
          [37.95466,-91.77727],
          [37.95465,-91.78011],
        ]
      }
    ]

    let show = {};
    for (let i = 0; i < lots.length; i++) {
      const lot = lots[i]
      show[lot.name] = true
    }

    this.setState({lots});
    this.setState({show});

  }

  renderPolygons() {
    let polygons = []

    for(let i=0; i < this.state.lots.length; i++) {
      const lot = this.state.lots[i]

      if (this.state.show[lot.name]) {
        polygons.push(
          <Polygon color="purple" positions={lot.location} key={i}>
            <Popup>
              Lot {lot.name}
            </Popup>
          </Polygon>
        )
      }
    }

    return polygons
  }

  renderLots() {
    const { classes } = this.props

    let lots = []
    for (let i=0; i < this.state.lots.length; i++) {
      const lot = this.state.lots[i]
      lots.push(
        <Grid
					container
					alignItems="center"
					spacing={8}
					className={classes.lotContainer}
					justify="space-between"
				>
          <Grid item>
            <Typography key={i} variant="subtitle1" className={classes.lotLabel}>
              Lot {lot.name}
            </Typography>
          </Grid>
          <Grid item>
						<Checkbox
              className={classes.size}
              icon={<CheckBoxOutlineBlankIcon className={classes.sizeIcon} />}
              checkedIcon={<CheckBoxIcon className={classes.sizeIcon} />}
              value={lot.name}
              checked={this.state.show[lot.name]}
              onChange={this.handleChange(lot.name)}
						/>
          </Grid>
        </Grid>
      )
    }

    return lots
  }

  renderOverlay() {
    const { classes } = this.props

    return (
      <Card className={classes.overlay}>
        <Typography
          className={classes.header}
          gutterBottom
          variant="h4"
          align="center"
        >
          Lots
        </Typography>
        { this.renderLots() }
      </Card>
    )
  }

  render() {
    const position = [this.state.lat, this.state.lng]
    const { classes } = this.props

    return (
      <div style={{height: "100%", width: "100%"}}>
        {this.renderOverlay()}
        <Link to="/">
          <Fab color="secondary" variant="extended" aria-label="Delete" className={classes.profile}>
            Go To Profile
          </Fab>
        </Link>
        <Map center={position} zoom={this.state.zoom}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {this.renderPolygons()}
        </Map>
      </div>
    )
  }
}

export default withStyles(styles)(FullMap)
