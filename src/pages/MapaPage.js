import React from 'react'
import { useMapbox } from '../hooks/useMapbox';

// CAMBIAR API KEY

const puntoInicial = {
    lng: 5,
    lat: 34,
    zoom: 2
}


const MapaPage = () => {
    
    const {coords , setRef} = useMapbox(puntoInicial);
    

  return (
    <>
        <div className="info">
            Lng: {coords.lng} | Lat: {coords.lat} | Zoom : {coords.zoom}
        </div>
        <div ref = {setRef} className="mapContainer">

        </div>
    </>
  )
}

export default MapaPage