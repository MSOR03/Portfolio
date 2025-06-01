'use client';

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

const Map = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/msor03-web/cmbd5evje002v01s0b2c62xm6",
      center: [-74.06, 4.65],
      zoom: 12,
    });

    new mapboxgl.Marker({ color: "#22c55e" })
      .setLngLat([-74.12605, 4.70939])
      .setPopup(
  new mapboxgl.Popup({ offset: 25, closeButton: true, closeOnClick: true }).setHTML(`
    <div style="
      background: rgba(23, 23, 23, 0.9);
      padding: 12px 16px;
      border-radius: 12px;
      color: white;
      font-family: sans-serif;
      max-width: 200px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    ">
      <h3 style="color: #22c55e; font-size: 16px; margin: 0 0 6px;">Estoy aquí</h3>
      <p style="font-size: 14px; opacity: 0.8; margin: 0;">
        Este es mi punto de ubicación.<br />¡Haz clic para más detalles!
      </p>
    </div>
  `)
)

      .addTo(map.current);
      
  }, []);

  return (
    <div
      ref={mapContainer}
      className="w-full h-full min-h-[400px] rounded-2xl border border-green-400/50 shadow-lg transition-transform duration-300 hover:scale-[1.01]"
    />
  );
};

export default Map;
