import React from 'react'
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

// CAMBIAR API KEY
mapboxgl.accessToken = 'pk.eyJ1IjoiZmVyaWNlbGwyOTA5IiwiYSI6ImNsNmpzaXdtejFldHYzaXMwNXAxd2FkdWoifQ.Ey14MvS-ylensi8QgtPePA';

const puntoInicial = {
    lng: 5,
    lat: 34,
    zoom: 2
}


const MapaPage = () => {

    const mapDiv = useRef();
    const [mapa,setMapa] = useState();
    const [coords, setCoords] = useState(puntoInicial);

    useEffect(() => {

        var map = new mapboxgl.Map({
            container: mapDiv.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [puntoInicial.lng,puntoInicial.lat],
            zoom: puntoInicial.zoom
          });

          setMapa(map);
    },[]);


    useEffect(() => {
      
        mapa?.on('move', () => {

            const  { lng, lat } = mapa.getCenter();
            setCoords({lng: lng.toFixed(4),lat: lat.toFixed(4),
                        zoom: mapa.getZoom().toFixed(2)})
        });

        return mapa?.off('move');
   
    }, [mapa])
    

  return (
    <>
        <div className="info">
            Lng: {coords.lng} | Lat: {coords.lat} | Zoom : {coords.zoom}
        </div>
      <div ref = {mapDiv} className="mapContainer">

      </div>
    </>
  )
}

export default MapaPage