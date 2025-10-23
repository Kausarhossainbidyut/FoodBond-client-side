import React, { useState, useEffect } from 'react';
import { FaMapMarkerAlt, FaUtensils, FaUsers } from 'react-icons/fa';

const ImpactMap = () => {
  const [activeLocation, setActiveLocation] = useState(null);
  
  // Simulated data for food donation locations
  const locations = [
    { id: 1, city: 'Dhaka', donations: 1250, peopleFed: 3500, lat: 23.8103, lng: 90.4125, x: 65, y: 40 },
    { id: 2, city: 'Chittagong', donations: 890, peopleFed: 2100, lat: 22.3569, lng: 91.7832, x: 75, y: 70 },
    { id: 3, city: 'Khulna', donations: 620, peopleFed: 1800, lat: 22.8456, lng: 89.5403, x: 45, y: 80 },
    { id: 4, city: 'Rajshahi', donations: 540, peopleFed: 1600, lat: 24.3740, lng: 88.6011, x: 35, y: 35 },
    { id: 5, city: 'Sylhet', donations: 720, peopleFed: 2200, lat: 24.8949, lng: 91.8687, x: 80, y: 25 },
    { id: 6, city: 'Barisal', donations: 410, peopleFed: 1200, lat: 22.7010, lng: 90.3535, x: 55, y: 65 },
  ];

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
          <div className="relative bg-green-50 rounded-xl overflow-hidden border border-green-100 h-96 md:h-[500px]">
            {/* Bangladesh Map SVG */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full h-full">
                {/* Simplified map representation */}
                <div className="absolute inset-0 bg-green-100 rounded-lg opacity-20"></div>
                
                {/* Location markers */}
                {locations.map((location) => (
                  <div
                    key={location.id}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                      activeLocation === location.id 
                        ? 'scale-125 z-10 animate-pulse' 
                        : 'hover:scale-110'
                    }`}
                    style={{ left: `${location.x}%`, top: `${location.y}%` }}
                  >
                    <div 
                      className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg cursor-pointer transition-all duration-300 ${
                        activeLocation === location.id
                          ? 'bg-green-600 text-white ring-4 ring-green-300'
                          : 'bg-white text-green-600 ring-2 ring-green-200'
                      }`}
                      onClick={() => setActiveLocation(location.id === activeLocation ? null : location.id)}
                    >
                      <FaMapMarkerAlt />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Location info panel */}
            {activeLocation && (
              <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:bottom-4 md:w-80 bg-white rounded-xl shadow-xl p-4 border border-green-200 transition-all duration-300 animate-fade-in">
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
          </div>

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