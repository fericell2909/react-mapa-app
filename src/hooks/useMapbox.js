import {useRef,useState, useEffect} from 'react'
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';
import { useCallback } from 'react';
import {v4 } from 'uuid';

mapboxgl.accessToken = 'pk.eyJ1IjoiZmVyaWNlbGwyOTA5IiwiYSI6ImNsNmpzaXdtejFldHYzaXMwNXAxd2FkdWoifQ.Ey14MvS-ylensi8QgtPePA';

export const useMapbox = (puntoInicial) => {

    const mapDiv = useRef();

    const setRef  = useCallback((node) => {
        mapDiv.current = node;
    })
    
    const marcadores = useRef({});


    const mapa = useRef();
    // const [mapa,setMapa] = useState();
    const [coords, setCoords] = useState(puntoInicial);

    useEffect(() => {

        var map = new mapboxgl.Map({
            container: mapDiv.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [puntoInicial.lng,puntoInicial.lat],
            zoom: puntoInicial.zoom
          });

          mapa.current = map;

    },[puntoInicial]);


    useEffect(() => {
      
        mapa.current?.on('move', () => {

            const  { lng, lat } = mapa.current.getCenter();
            setCoords({lng: lng.toFixed(4),lat: lat.toFixed(4),
                        zoom:  mapa.current.getZoom().toFixed(2)})
        });

   
    }, [])

    useEffect(() => {
      
        mapa.current?.on('click', (ev) => {
            const {lng, lat} = ev.lngLat;

            const marker = new mapboxgl.Marker();
            marker.id = v4();

            marker
                    .setLngLat([lng,lat])
                    .addTo(mapa.current)
                    .setDraggable(true)
        
            marcadores.current[marker.id] = marker;
        });
        
      
    }, [])
    

  return {
    coords ,
    setRef ,
    marcadores
  }
}