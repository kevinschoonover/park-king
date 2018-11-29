import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup, Polygon } from 'react-leaflet'

export default class FullMap extends Component {
  state = {
    lat: 37.954403,
    lng: -91.774891,
    zoom: 17,
  }

  render() {
    const position = [this.state.lat, this.state.lng]
    const s_lot = [
      [37.95587,-91.78055],
      [37.95639,-91.78023],
      [37.95751,-91.77680],
      [37.95659,-91.77682],
      [37.95593,-91.77848],
      [37.95545,-91.78023],
    ]

    const h_lot = [
      [37.95509,-91.78012],
      [37.95505,-91.77723],
      [37.95466,-91.77727],
      [37.95465,-91.78011],
    ]
    return (
      <Map center={position} zoom={this.state.zoom}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Polygon color="purple" positions={s_lot}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Polygon>
        <Polygon color="purple" positions={h_lot}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Polygon>

      </Map>
    )
  }
}
