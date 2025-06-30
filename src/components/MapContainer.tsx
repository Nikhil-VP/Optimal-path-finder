import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { CityData } from '../types';

interface MapContainerProps {
  cities: CityData[];
  startCity?: string;
  endCity?: string;
  visitedCities: string[];
  currentPath: string[];
  onCityClick?: (cityId: string) => void;
}

// Fix for default marker icons in Webpack
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export function MapContainer({ 
  cities, 
  startCity, 
  endCity, 
  visitedCities, 
  currentPath,
  onCityClick 
}: MapContainerProps) {
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Map<string, L.Marker>>(new Map());
  const pathLayerRef = useRef<L.Polyline | null>(null);
  const visitedLayerRef = useRef<L.Polyline[]>([]);

  useEffect(() => {
    if (!mapRef.current) {
      // Initialize map centered on Karnataka
      mapRef.current = L.map('map', {
        center: [15.3173, 75.7139], // Karnataka center
        zoom: 7,
        zoomControl: true,
      });

      // Add dark theme tile layer
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap contributors, © CartoDB',
        subdomains: 'abcd',
        maxZoom: 19
      }).addTo(mapRef.current);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Update markers
  useEffect(() => {
    if (!mapRef.current) return;

    // Clear existing markers
    markersRef.current.forEach(marker => {
      mapRef.current?.removeLayer(marker);
    });
    markersRef.current.clear();

    // Add city markers
    cities.forEach(city => {
      let iconColor = '#6b7280'; // Default gray
      let iconHtml = '●';
      let size = 12;
      
      if (city.id === startCity) {
        iconColor = '#10b981'; // Green for start
        iconHtml = '🚀';
        size = 20;
      } else if (city.id === endCity) {
        iconColor = '#ef4444'; // Red for end
        iconHtml = '🎯';
        size = 20;
      } else if (currentPath.includes(city.id)) {
        iconColor = '#3b82f6'; // Blue for path
        iconHtml = '●';
        size = 16;
      } else if (visitedCities.includes(city.id)) {
        iconColor = '#f59e0b'; // Yellow for visited
        iconHtml = '○';
        size = 14;
      } else {
        // Size based on city type
        size = city.type === 'metro' ? 16 : 
               city.type === 'city' ? 14 : 
               city.type === 'town' ? 12 : 10;
      }

      const customIcon = L.divIcon({
        html: `<div style="
          background-color: ${iconColor};
          width: ${size}px;
          height: ${size}px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: ${size > 16 ? '12px' : '10px'};
          color: white;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
          cursor: pointer;
        " title="${city.name}, ${city.district}">${iconHtml}</div>`,
        className: 'custom-marker',
        iconSize: [size, size],
        iconAnchor: [size/2, size/2]
      });

      const marker = L.marker([city.lat, city.lng], { icon: customIcon })
        .addTo(mapRef.current!)
        .bindTooltip(`${city.name}<br/>${city.district}`, {
          permanent: false,
          direction: 'top',
          className: 'custom-tooltip'
        });

      if (onCityClick) {
        marker.on('click', () => onCityClick(city.id));
      }

      markersRef.current.set(city.id, marker);
    });
  }, [cities, startCity, endCity, visitedCities, currentPath, onCityClick]);

  // Update path visualization
  useEffect(() => {
    if (!mapRef.current) return;

    // Clear existing path
    if (pathLayerRef.current) {
      mapRef.current.removeLayer(pathLayerRef.current);
    }

    // Clear visited paths
    visitedLayerRef.current.forEach(layer => {
      mapRef.current?.removeLayer(layer);
    });
    visitedLayerRef.current = [];

    if (currentPath.length > 1) {
      const pathCoords = currentPath.map(cityId => {
        const city = cities.find(c => c.id === cityId);
        return city ? [city.lat, city.lng] as L.LatLngTuple : null;
      }).filter(coord => coord !== null) as L.LatLngTuple[];

      if (pathCoords.length > 1) {
        pathLayerRef.current = L.polyline(pathCoords, {
          color: '#3b82f6',
          weight: 4,
          opacity: 0.8,
          dashArray: '10, 5'
        }).addTo(mapRef.current);

        // Fit map to show the path
        const bounds = L.latLngBounds(pathCoords);
        mapRef.current.fitBounds(bounds, { padding: [20, 20] });
      }
    }
  }, [currentPath, cities]);

  return (
    <div className="relative">
      <div 
        id="map" 
        className="w-full h-full rounded-lg overflow-hidden shadow-2xl border border-gray-700"
        style={{ minHeight: '600px' }}
      />
      
      {/* Map Legend */}
      <div className="absolute top-4 right-4 bg-gray-900/90 p-3 rounded-lg border border-gray-700 text-xs">
        <h4 className="text-white font-semibold mb-2">Legend</h4>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-gray-300">Start City 🚀</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-gray-300">End City 🎯</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-gray-300">Path</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="text-gray-300">Visited</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
            <span className="text-gray-300">Cities</span>
          </div>
        </div>
      </div>

      {/* City Count */}
      <div className="absolute bottom-4 left-4 bg-gray-900/90 p-2 rounded border border-gray-700 text-xs text-gray-300">
        {cities.length} cities loaded
      </div>
    </div>
  );
}