import React from 'react'

function LocationSelector(props) {
    const [expanded, setExpanded] = React.useState(false)
    const [selected, setSelected] = React.useState(props.selected)

    React.useEffect(() => {
        setSelected(props.selected)
    }, [props.selected])

    function handleSelection (e) {
        setSelected({name: e.name})
        props.handleSelection(e)
        setExpanded(false)
    }
    
    function handleExpand () {
        setExpanded(true)
    }
    
    const expandedButtons = props.locations.map((e, i) => {
        return(
            <button className='selector-button' key={`selector ${i}`} onClick={()=>handleSelection(e)} > 
                {e.name}
            </button>
        )        
    })
    

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