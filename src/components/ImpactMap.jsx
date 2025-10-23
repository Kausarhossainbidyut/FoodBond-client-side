import React, { useState, useEffect, useCallback } from 'react';
import { FaUtensils, FaUsers, FaMapMarkerAlt } from 'react-icons/fa';
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

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "AIzaSyAsgnAjalJvlt3sormTkVUC1EcjABCUs1Y"
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

  if (loadError) {
    return (
      <div className="h-96 flex items-center justify-center bg-gray-100 rounded-lg">
        <p className="text-red-500">Error loading map: {loadError.message}</p>
      </div>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-white to-green-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            Our Impact Across Bangladesh
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            See how communities are reducing food waste and helping those in need
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-green-100">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3">
              {isLoaded ? (
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={center}
                  zoom={7}
                  onLoad={onLoad}
                  onUnmount={onUnmount}
                  options={{
                    streetViewControl: false,
                    mapTypeControl: false,
                    fullscreenControl: true,
                    zoomControl: true,
                    styles: [
                      {
                        featureType: "administrative",
                        elementType: "labels",
                        stylers: [{ visibility: "on" }]
                      },
                      {
                        featureType: "water",
                        elementType: "geometry.fill",
                        stylers: [{ color: "#dbeafe" }]
                      },
                      {
                        featureType: "landscape",
                        elementType: "geometry.fill",
                        stylers: [{ color: "#dcfce7" }]
                      },
                      {
                        featureType: "road",
                        elementType: "geometry",
                        stylers: [{ color: "#f3f4f6" }]
                      }
                    ]
                  }}
                >
                  {locations.map((location) => (
                    <Marker
                      key={location.id}
                      position={{ lat: location.lat, lng: location.lng }}
                      icon={{
                        path: google.maps.SymbolPath.CIRCLE,
                        scale: 12,
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
                <div className="h-96 flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                  <div className="text-center">
                    <FaMapMarkerAlt className="mx-auto text-3xl text-gray-400 mb-2" />
                    <p className="text-gray-500">Loading map...</p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="lg:w-1/3">
              <div className="bg-gradient-to-br from-green-50 to-white rounded-xl p-6 h-full border border-green-100">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Location Details</h3>
                
                {activeLocation ? (
                  locations
                    .filter(location => location.id === activeLocation)
                    .map(location => (
                      <div key={location.id} className="animate-fade-in">
                        <h4 className="text-2xl font-bold text-green-600 mb-2">{location.city}</h4>
                        <div className="space-y-4">
                          <div className="flex items-center p-3 bg-white rounded-lg shadow-sm border border-green-100">
                            <div className="mr-3 p-2 bg-green-100 rounded-lg">
                              <FaUtensils className="text-green-600 text-xl" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Donations</p>
                              <p className="text-xl font-bold text-gray-800">{location.donations}+</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center p-3 bg-white rounded-lg shadow-sm border border-green-100">
                            <div className="mr-3 p-2 bg-orange-100 rounded-lg">
                              <FaUsers className="text-orange-500 text-xl" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">People Fed</p>
                              <p className="text-xl font-bold text-gray-800">{location.peopleFed}+</p>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 p-3 bg-green-600 rounded-lg text-white text-center">
                          <p className="font-medium">Active Community</p>
                          <p className="text-sm text-green-100">Making a difference daily</p>
                        </div>
                      </div>
                    ))
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center py-8">
                    <FaMapMarkerAlt className="text-3xl text-green-500 mb-3" />
                    <h4 className="text-lg font-semibold text-gray-700 mb-2">Select a Location</h4>
                    <p className="text-gray-500 text-sm">
                      Click on any marker to see detailed information about food sharing activities in that area.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Stats summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-gradient-to-br from-white to-green-50 p-4 rounded-xl text-center border border-green-100">
              <p className="text-2xl font-bold text-green-600">6</p>
              <p className="text-sm text-gray-600 font-medium">Cities</p>
            </div>
            <div className="bg-gradient-to-br from-white to-green-50 p-4 rounded-xl text-center border border-green-100">
              <p className="text-2xl font-bold text-green-600">4,430+</p>
              <p className="text-sm text-gray-600 font-medium">Donations</p>
            </div>
            <div className="bg-gradient-to-br from-white to-green-50 p-4 rounded-xl text-center border border-green-100">
              <p className="text-2xl font-bold text-green-600">12,400+</p>
              <p className="text-sm text-gray-600 font-medium">People Fed</p>
            </div>
            <div className="bg-gradient-to-br from-white to-green-50 p-4 rounded-xl text-center border border-green-100">
              <p className="text-2xl font-bold text-green-600">98%</p>
              <p className="text-sm text-gray-600 font-medium">Satisfaction</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactMap;