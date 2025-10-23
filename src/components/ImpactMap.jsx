import React, { useState, useEffect, useCallback } from 'react';
import { FaMapMarkerAlt, FaUtensils, FaUsers } from 'react-icons/fa';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '500px'
};

const center = {
  lat: 23.6850, // Center of Bangladesh
  lng: 90.3563
};

const zoom = 7; // Zoom level to show all of Bangladesh

const locations = [
  { id: 1, city: 'Dhaka', donations: 1250, peopleFed: 3500, lat: 23.8103, lng: 90.4125 },
  { id: 2, city: 'Chittagong', donations: 890, peopleFed: 2100, lat: 22.3569, lng: 91.7832 },
  { id: 3, city: 'Khulna', donations: 620, peopleFed: 1800, lat: 22.8456, lng: 89.5403 },
  { id: 4, city: 'Rajshahi', donations: 540, peopleFed: 1600, lat: 24.3740, lng: 88.6011 },
  { id: 5, city: 'Sylhet', donations: 720, peopleFed: 2200, lat: 24.8949, lng: 91.8687 },
  { id: 6, city: 'Barisal', donations: 410, peopleFed: 1200, lat: 22.7010, lng: 90.3535 },
];

const ImpactMap = () => {
  const [activeLocation, setActiveLocation] = useState(null);
  const [map, setMap] = useState(null);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "AIzaSyAsgnAjalJvlt3sormTkVUC1EcjABCUs1Y" // Using your Firebase API key as fallback
  });

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * locations.length);
      setActiveLocation(locations[randomIndex].id);
      
      setTimeout(() => {
        setActiveLocation(null);
      }, 3000);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const onLoad = useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback() {
    setMap(null);
  }, []);

  const handleMarkerClick = (locationId) => {
    setActiveLocation(locationId === activeLocation ? null : locationId);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-green-50 to-green-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            Our Impact Map
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            See how communities across Bangladesh are reducing food waste and helping those in need
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          {isLoaded ? (
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={zoom}
              onLoad={onLoad}
              onUnmount={onUnmount}
              options={{
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: true,
                zoomControl: true,
              }}
            >
              {locations.map((location) => (
                <Marker
                  key={location.id}
                  position={{ lat: location.lat, lng: location.lng }}
                  icon={{
                    path: window.google.maps.SymbolPath.CIRCLE,
                    scale: 10,
                    fillColor: activeLocation === location.id ? "#16a34a" : "#ffffff",
                    fillOpacity: 1,
                    strokeColor: "#16a34a",
                    strokeWeight: 2,
                  }}
                  onClick={() => handleMarkerClick(location.id)}
                />
              ))}
            </GoogleMap>
          ) : (
            <div className="h-96 flex items-center justify-center bg-gray-100 rounded-lg">
              <p className="text-gray-500">Loading map...</p>
            </div>
          )}

          {/* Location info panel */}
          {activeLocation && (
            <div className="mt-6 bg-white rounded-xl shadow-xl p-4 border border-green-200 transition-all duration-300 animate-fade-in">
              {locations
                .filter(location => location.id === activeLocation)
                .map(location => (
                  <div key={location.id}>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{location.city}</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-green-50 p-3 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <FaUtensils className="text-green-600" />
                          <span className="text-sm text-gray-600">Donations</span>
                        </div>
                        <p className="text-2xl font-bold text-green-600">{location.donations}+</p>
                      </div>
                      <div className="bg-orange-50 p-3 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <FaUsers className="text-orange-500" />
                          <span className="text-sm text-gray-600">People Fed</span>
                        </div>
                        <p className="text-2xl font-bold text-orange-500">{location.peopleFed}+</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      Active food sharing community
                    </p>
                  </div>
                ))}
            </div>
          )}

          {/* Stats summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <p className="text-2xl font-bold text-green-600">6</p>
              <p className="text-sm text-gray-600">Cities</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <p className="text-2xl font-bold text-green-600">4,430+</p>
              <p className="text-sm text-gray-600">Donations</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <p className="text-2xl font-bold text-green-600">12,400+</p>
              <p className="text-sm text-gray-600">People Fed</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <p className="text-2xl font-bold text-green-600">98%</p>
              <p className="text-sm text-gray-600">Satisfaction</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactMap;