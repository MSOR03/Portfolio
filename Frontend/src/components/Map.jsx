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
      attributionControl: false,
    });

    // Popup mejorado que siempre está visible
    const popup = new mapboxgl.Popup({ 
      offset: 25, 
      closeButton: false, 
      closeOnClick: false,
      closeOnMove: false
    }).setHTML(`
      <div style="
        background: linear-gradient(135deg, rgba(23, 23, 23, 0.95), rgba(30, 30, 30, 0.95));
        backdrop-filter: blur(10px);
        border: 1px solid rgba(34, 197, 94, 0.4);
        padding: 16px 20px;
        border-radius: 16px;
        color: white;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        max-width: 220px;
        box-shadow: 
          0 8px 32px rgba(0, 0, 0, 0.4),
          0 0 0 1px rgba(34, 197, 94, 0.2),
          inset 0 1px 0 rgba(255, 255, 255, 0.1);
        position: relative;
      ">
        <div style="
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #22c55e, transparent);
          border-radius: 16px 16px 0 0;
        "></div>
        
        <h3 style="
          color: #22c55e; 
          font-size: 16px; 
          font-weight: 600;
          margin: 0 0 8px;
          text-shadow: 0 2px 8px rgba(34, 197, 94, 0.3);
        ">📍 Estoy aquí</h3>
        
        <p style="
          font-size: 14px; 
          line-height: 1.4;
          opacity: 0.9; 
          margin: 0;
          color: #e2e8f0;
        ">
          Este es mi punto de ubicación.<br />
          <span style="color: #22c55e; font-weight: 500;">¡Disponible para colaborar!</span>
        </p>
        
        <div style="
          margin-top: 12px;
          padding-top: 12px;
          border-top: 1px solid rgba(34, 197, 94, 0.2);
          display: flex;
          align-items: center;
          gap: 8px;
        ">
          <div style="
            width: 8px;
            height: 8px;
            background: #22c55e;
            border-radius: 50%;
            animation: pulse 2s infinite;
          "></div>
          <span style="
            font-size: 12px;
            color: #94a3b8;
            font-weight: 500;
          ">Bogotá, Colombia</span>
        </div>
      </div>
      
      <style>
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
        }
        
        .mapboxgl-popup-content {
          padding: 0 !important;
          background: transparent !important;
          box-shadow: none !important;
        }
        
        .mapboxgl-popup-tip {
          border-top-color: rgba(23, 23, 23, 0.95) !important;
        }
      </style>
    `);

    // Marcador con efecto hover mejorado
    const marker = new mapboxgl.Marker({ 
      color: "#22c55e",
      scale: 1.2
    })
      .setLngLat([-74.12605, 4.70939])
      .setPopup(popup)
      .addTo(map.current);

    // Mostrar el popup automáticamente y mantenerlo fijo
    map.current.on('load', () => {
      marker.togglePopup();
    });

    // Efectos sutiles del mapa
    map.current.on('mouseenter', () => {
      map.current.getCanvas().style.cursor = 'grab';
    });

    map.current.on('mousedown', () => {
      map.current.getCanvas().style.cursor = 'grabbing';
    });

    map.current.on('mouseup', () => {
      map.current.getCanvas().style.cursor = 'grab';
    });

    map.current.on('mouseleave', () => {
      map.current.getCanvas().style.cursor = '';
    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={mapContainer}
      className="w-full h-full min-h-[400px] rounded-2xl border border-green-400/50 shadow-lg transition-all duration-300 hover:border-green-400/70 hover:shadow-xl hover:shadow-green-400/5 hover:scale-[1.005]"
    />
  );
};

export default Map;