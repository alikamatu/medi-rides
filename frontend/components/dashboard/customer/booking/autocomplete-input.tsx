'use client';

import { useEffect, useRef, useState } from 'react';
import { MapPin, Loader2 } from 'lucide-react';
import { loadGoogleMaps } from '@/utils/loadGoogleMaps';

interface AutocompleteInputProps {
  placeholder: string;
  onPlaceSelected: (place: any) => void;
  className?: string;
}

declare global {
  interface Window {
    google: any;
    initGoogleMaps: () => void;
  }
}

export default function AutocompleteInput({ 
  placeholder, 
  onPlaceSelected, 
  className = '' 
}: AutocompleteInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete>(null);
  const [mapsLoaded, setMapsLoaded] = useState(false);
  const [loading, setLoading] = useState(false);


useEffect(() => {
  loadGoogleMaps(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!)
    .then(() => {
      setMapsLoaded(true);
      initializeAutocomplete();
    })
    .catch(() => {
      console.error("Failed to load Google Maps");
    });
}, []);

  const initializeAutocomplete = () => {
    if (!window.google || !inputRef.current) {
      console.error('Google Maps API not available or input not ready');
      return;
    }

    try {
      autocompleteRef.current = new google.maps.places.Autocomplete(inputRef.current, {
        fields: ['formatted_address', 'geometry', 'name'],
        types: ['geocode']
      });

      autocompleteRef.current.addListener('place_changed', () => {
        const place = autocompleteRef.current?.getPlace();
        if (place && place.geometry && place.formatted_address) {
          onPlaceSelected(place);
        }
      });

      // Prevent form submission when pressing enter in the autocomplete
      inputRef.current.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
        }
      });

    } catch (error) {
      console.error('Error initializing Google Places Autocomplete:', error);
    }
  };

  return (
    <div className="relative">
      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      <input
        ref={inputRef}
        type="text"
        placeholder={loading ? "Loading maps..." : placeholder}
        disabled={loading}
        className={`pl-10 w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
          className
        } ${loading ? 'bg-gray-100 cursor-not-allowed' : ''}`}
      />
      {loading && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
        </div>
      )}
    </div>
  );
}