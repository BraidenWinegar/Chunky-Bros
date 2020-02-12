import React from 'react'
import Maps from './Maps'
import './mapStyles'


function MapWrapper() {
    return(
        <section id='map-container'>
            <Maps
                isMarkerShown
                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDHU0n_NC_Q96BMPSDrywhvtNmzUSrYfx0`}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `100%` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
        </section>
    )
}

export default MapWrapper;