'use client';

import { useEffect, useRef } from 'react';
import { MapPin, Navigation } from 'lucide-react';

type LeafletDiv = HTMLDivElement & { _leaflet_id?: string };


// This component will only be rendered on the client side
const ServiceAreaMap = () => {
  const mapContainer = useRef<LeafletDiv | null>(null);
const mapInstance = useRef<any>(null);

useEffect(() => {
  const initializeMap = async () => {
    if (!mapContainer.current) return;
    if (mapInstance.current) return; // 👈 FIX: prevent double init

    try {
      const L = await import("leaflet");
      await import("leaflet/dist/leaflet.css");

      mapInstance.current = L.map(mapContainer.current).setView(
        [40.7128, -74.006],
        11
      );

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 18,
      }).addTo(mapInstance.current);

    if (mapInstance.current) return;

    mapInstance.current = L.map(mapContainer.current as HTMLElement).setView(
    [40.7128, -74.006],
    11
    );

        // Create map instance
const map = L.map(mapContainer.current as HTMLElement).setView([40.7128, -74.006], 11);



        


        // Add light theme tile layer (OpenStreetMap)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors',
          maxZoom: 18,
        }).addTo(map);

        // Define custom medical-themed markers
        const medicalIcon = L.divIcon({
          html: `
            <div style="
              background: #B0D6FF;
              border: 2px solid #FFFFFF;
              border-radius: 0;
              width: 20px;
              height: 20px;
              display: flex;
              align-items: center;
              justify-content: center;
              box-shadow: none;
            ">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0A2342" stroke-width="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
          `,
          className: 'medical-marker',
          iconSize: [20, 20],
          iconAnchor: [10, 10],
        });

        const hospitalIcon = L.divIcon({
          html: `
            <div style="
              background: #0A2342;
              border: 2px solid #FFFFFF;
              border-radius: 0;
              width: 24px;
              height: 24px;
              display: flex;
              align-items: center;
              justify-content: center;
              box-shadow: none;
            ">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
              </svg>
            </div>
          `,
          className: 'hospital-marker',
          iconSize: [24, 24],
          iconAnchor: [12, 12],
        });

        // Add service area markers (example coordinates)
        const serviceMarkers = [
          { lat: 40.7128, lng: -74.0060, title: "Downtown Medical District", type: "medical" },
          { lat: 40.7505, lng: -73.9934, title: "Midtown Service Hub", type: "medical" },
          { lat: 40.6892, lng: -74.0445, title: "Financial District", type: "medical" },
          { lat: 40.7831, lng: -73.9712, title: "Upper East Side", type: "medical" },
        ];

        const hospitalMarkers = [
          { lat: 40.7614, lng: -73.9776, title: "General Hospital" },
          { lat: 40.7414, lng: -73.9900, title: "Medical Center" },
          { lat: 40.7100, lng: -74.0100, title: "Specialty Clinic" },
        ];

        // Add markers to map
        serviceMarkers.forEach(marker => {
          L.marker([marker.lat, marker.lng], { icon: medicalIcon })
            .addTo(map)
            .bindPopup(`
              <div style="padding: 8px;">
                <h4 style="margin: 0 0 4px 0; color: #0A2342; font-weight: 600;">${marker.title}</h4>
                <p style="margin: 0; color: #666; font-size: 12px;">Medical Transportation Hub</p>
              </div>
            `);
        });

        hospitalMarkers.forEach(marker => {
          L.marker([marker.lat, marker.lng], { icon: hospitalIcon })
            .addTo(map)
            .bindPopup(`
              <div style="padding: 8px;">
                <h4 style="margin: 0 0 4px 0; color: #0A2342; font-weight: 600;">${marker.title}</h4>
                <p style="margin: 0; color: #666; font-size: 12px;">Medical Facility</p>
              </div>
            `);
        });

        // Add service area polygon (example)
        const serviceArea = L.polygon([
          [40.68, -74.05],
          [40.68, -73.95],
          [40.78, -73.95],
          [40.78, -74.05]
        ], {
          color: '#B0D6FF',
          fillColor: '#B0D6FF',
          fillOpacity: 0.1,
          weight: 2,
          opacity: 0.7
        }).addTo(map);

        // Cleanup function
        return () => {
          if (map) {
            map.remove();
          }
        };
      } catch (error) {
        console.error('Error loading map:', error);
        if (mapContainer.current) {
          mapContainer.current.innerHTML = `
            <div class="w-full h-96 bg-[#F5F7FA] border border-[#E6EAF0] flex items-center justify-center">
              <div class="text-center">
                <div class="w-8 h-8 bg-[#B0D6FF] mx-auto mb-2 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0A2342" stroke-width="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                  </svg>
                </div>
                <p class="text-[#0A2342]">Map unavailable</p>
                <p class="text-sm text-[#0A2342] text-opacity-70 mt-1">Service covers metropolitan area and surrounding communities</p>
              </div>
            </div>
          `;
        }
      }
    };

    initializeMap();
  }, []);

  return (
    <div className="w-full h-96 relative">
      <div ref={mapContainer} className="w-full h-full" />
      
      {/* Map Controls Overlay */}
      <div className="absolute top-4 left-4 bg-white border border-[#E6EAF0] p-2">
        <div className="flex items-center space-x-2 text-sm text-[#0A2342]">
          <Navigation className="w-4 h-4" />
          <span>Service Area Map</span>
        </div>
      </div>

      {/* Legend Overlay */}
      <div className="absolute bottom-4 right-4 bg-white border border-[#E6EAF0] p-3">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-[#B0D6FF] border border-white"></div>
            <span className="text-xs text-[#0A2342]">Service Hubs</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-[#0A2342] border border-white"></div>
            <span className="text-xs text-[#0A2342]">Medical Facilities</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceAreaMap;