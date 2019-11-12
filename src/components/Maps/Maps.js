import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {updateLocation} from '../../Reducer/reducer'
import {GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow} from "react-google-maps"
import Selector from './Selector'
import mapStyles from './mapStyles'
import './Maps.css'


const locations = [{
    name: 'Lehi',
    lat: 40.438473, 
    lng: -111.892520
},{
    name: 'Orem',
    lat: 40.296499,  
    lng: -111.701905
},{ 
    name: 'Draper',
    lat: 40.527182, 
    lng: -111.877191
}]


function Maps (props) {

    const [selectedLocation, setSelectedLocation] = useState(props.location)
    const [showInfoWindow, setShowInfoWindow] = useState(false)

    useEffect(() => {
        console.log('use effect',selectedLocation)
        props.updateLocation(selectedLocation)
    },[selectedLocation])

    function handleSelection(loc) {   /// loc stands for location
        setSelectedLocation(loc)
        setShowInfoWindow(true)
    }

    const markers = locations.map((loc, i) => {
        return <Marker  key={`marker ${i}`} 
                        position={ { lat:loc.lat, lng:loc.lng } }
                        onClick={ () => {handleSelection(loc)} } />
                    //  Icon={ {url:'', scaledSize: new window.google.maps.Size(25, 25)} } in px
    })

    return (
        <section>
            <GoogleMap id='map'
                defaultZoom={ 10 }
                defaultCenter={ { lat:selectedLocation.lat, lng:selectedLocation.lng } }
                defaultOptions={ {styles: mapStyles } }
            >

                {/* {props.isMakerShown && <Marker position={defaultLocation} />} */}
                { markers }

                {showInfoWindow && (
                    <InfoWindow
                        position={ { lat:selectedLocation.lat, lng:selectedLocation.lng } }
                        onCloseClick={ () => { setShowInfoWindow(false) } }
                    >
                    <div>
                        <h2>{selectedLocation.name}</h2>     
                        <p>Come Get Some Grub!</p>
                    </div>           
                    </InfoWindow>                   /////possible make unique tag for some locations
                )}
            </GoogleMap>

            <Selector locations={locations} 
                    handleSelection={handleSelection} 
                    selected={selectedLocation} />
            
        </section>
    )
   
}

const MapContainer = withScriptjs(withGoogleMap(Maps))

function mapStateToProps(reactState) {
    const {  location } = reactState
    return { location }
}

const mapDispatchToProps = {
    updateLocation
}

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer) 

           