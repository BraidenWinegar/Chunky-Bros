import React, {useState} from 'react'
import {GoogleMap, withScriptjs, withGoogleMap, Marker} from "react-google-maps"
import Selector from './Selector'
import './Maps.css'

const defaultLocation = {lat: 40.418437, lng: -111.819107}
const defaultZoom = 10;

const locations = [{
    Name: 'Lehi',
    lat: 40.438473, 
    lng: -111.892520
},{
    Name: 'Orem',
    lat: 40.296499,  
    lng: -111.701905
},{
    Name: 'Draper',
    lat: 40.527182, 
    lng: -111.877191
}]


function Maps (props) {
    const [selectedLocation, setSelectedLocation] = useState({name: "Please Enter Location"})

    function handleSelection() {

    }
    
    const markers = locations.map((e, i) => {
        return <Marker key={`map ${i}`} position={{lat:e.lat, lng:e.lng}} />
    })

    return (
        <section>
            <GoogleMap id='map'
                defaultZoom={10}
                defaultCenter={defaultLocation}
            >

                {/* {props.isMakerShown && <Marker position={defaultLocation} />} */}
                {markers}

            </GoogleMap>

            <Selector locations={locations} handleSelection={handleSelection} selected={selectedLocation}/>
            
        </section>
    )
   
}

const MapContainer = withScriptjs(withGoogleMap(Maps))

export default MapContainer

           