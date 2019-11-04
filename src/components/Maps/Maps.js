import React, {useState} from 'react'
import {GoogleMap, withScriptjs, withGoogleMap, Marker} from "react-google-maps"
import './Maps.css'

const defaultLocation = {lat: 29.6512, lng: -82.3426}


function Maps (props) {
    return (
        <GoogleMap id='map'
            defaultZoom={10}
            defaultCenter={{lat: 29.6512, lng: -82.3426}}
        >

        {props.isMakerShown && <Marker position={defaultLocation} />}

        </GoogleMap>
        
    )
   
}

const MapContainer = withScriptjs(withGoogleMap(Maps))

export default MapContainer

           