import React from 'react'

function LocationSelector(Props) {
    const [expanded, setExpanded] = React.useState(false)
    const [selected, setSelected] = React.useState({  ///possible change to props.selected
        locationId: null,
        name: "Please select location"
    })

    const expandedButtons = Props.locations.map((e, i) => {
        return(
            <div    className='selector-button' 
                    key={`selector ${i}`} 
                    onClick={handleSelection} > 
                {e.name}
            </div>
        )        
    })

    function handleSelection (e) {
        setSelected({name: e.name, locationId: e.locationId})
        Props.handleSelection()
    }

    function handleExpand () {
        setExpanded(true)
    }

    if(expanded){
        return (
            <div className='selector'>
                {expandedButtons}
            </div>
        )

    } else {
        return (
        <div className='Selector'>
            <button className='selector-button' onClick={handleExpand}> 
                {selected.name}
            </button>
        </div>
    )
    }

    
    
}

export default LocationSelector