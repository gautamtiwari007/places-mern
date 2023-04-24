import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
 
import "./Map.css";
 
const APIKEY = 'pk.eyJ1IjoiZ2F1dGFtLXRpd2FyaSIsImEiOiJja3lsdDQ1YzQzOTZuMm9wODNrOHN5Njg2In0.bOtxhO9NmCzrdRUG1lGHcw';

const Map = props => {
  const { center, zoom } = props;
  const mapRef = useRef();
  useEffect(() => {
    mapboxgl.accessToken = APIKEY;
const map = new mapboxgl.Map({
      container: mapRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: center,
      zoom: zoom,
    });
    new mapboxgl.Marker({ position: center, map: map });
  }, [center, zoom]);
  return (
    <div
      ref={mapRef}
      className={`map ${props.className}`}
      style={props.style}
    ></div>
  );
};
 
export default Map;