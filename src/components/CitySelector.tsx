import React, { useState, useMemo } from 'react';
import { MapPin, Target, Search, Filter } from 'lucide-react';
import { CityData } from '../types';

interface CitySelectorProps {
  cities: CityData[];
  startCity?: string;
  endCity?: string;
  onStartCityChange: (cityId: string) => void;
  onEndCityChange: (cityId: string) => void;
  isRunning: boolean;
}

export function CitySelector({
  cities,
  startCity,
  endCity,
  onStartCityChange,
  onEndCityChange,
  isRunning
}: CitySelectorProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDistrict, setFilterDistrict] = useState('');
  const [filterType, setFilterType] = useState('');

  const districts = useMemo(() => 
    [...new Set(cities.map(city => city.district))].sort(), 
    [cities]
  );

  const cityTypes = useMemo(() => 
    [...new Set(cities.map(city => city.type))].sort(), 
    [cities]
  );

  const filteredCities = useMemo(() => {
    return cities.filter(city => {
      const matchesSearch = city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           city.district.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDistrict = !filterDistrict || city.district === filterDistrict;
      const matchesType = !filterType || city.type === filterType;
      return matchesSearch && matchesDistrict && matchesType;
    }).sort((a, b) => a.name.localeCompare(b.name));
  }, [cities, searchTerm, filterDistrict, filterType]);

  const selectedStartCity = cities.find(c => c.id === startCity);
  const selectedEndCity = cities.find(c => c.id === endCity);

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-2xl border border-gray-700">
      <h2 className="text-xl font-bold text-white mb-6">City Selection</h2>

      {/* Current Selection Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-4 h-4 text-green-400" />
            <span className="text-sm text-gray-400">Start City</span>
          </div>
          <div className="text-white font-semibold">
            {selectedStartCity ? (
              <div>
                <div>{selectedStartCity.name}</div>
                <div className="text-sm text-gray-400">{selectedStartCity.district}</div>
              </div>
            ) : (
              <span className="text-gray-500">Not selected</span>
            )}
          </div>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 text-red-400" />
            <span className="text-sm text-gray-400">End City</span>
          </div>
          <div className="text-white font-semibold">
            {selectedEndCity ? (
              <div>
                <div>{selectedEndCity.name}</div>
                <div className="text-sm text-gray-400">{selectedEndCity.district}</div>
              </div>
            ) : (
              <span className="text-gray-500">Not selected</span>
            )}
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="space-y-3 mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search cities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
            disabled={isRunning}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <select
            value={filterDistrict}
            onChange={(e) => setFilterDistrict(e.target.value)}
            className="px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
            disabled={isRunning}
          >
            <option value="">All Districts</option>
            {districts.map(district => (
              <option key={district} value={district}>{district}</option>
            ))}
          </select>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
            disabled={isRunning}
          >
            <option value="">All Types</option>
            {cityTypes.map(type => (
              <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
            ))}
          </select>
        </div>
      </div>

      {/* City List */}
      <div className="space-y-2 max-h-96 overflow-y-auto">
        <div className="text-sm text-gray-400 mb-2">
          Showing {filteredCities.length} of {cities.length} cities
        </div>
        
        {filteredCities.map(city => (
          <div
            key={city.id}
            className={`p-3 rounded-lg border transition-all cursor-pointer ${
              city.id === startCity
                ? 'bg-green-900/30 border-green-600'
                : city.id === endCity
                ? 'bg-red-900/30 border-red-600'
                : 'bg-gray-800 border-gray-600 hover:bg-gray-750 hover:border-gray-500'
            }`}
            onClick={() => {
              if (isRunning) return;
              
              if (!startCity) {
                onStartCityChange(city.id);
              } else if (!endCity && city.id !== startCity) {
                onEndCityChange(city.id);
              } else if (city.id === startCity) {
                onStartCityChange('');
              } else if (city.id === endCity) {
                onEndCityChange('');
              } else {
                onStartCityChange(city.id);
                onEndCityChange('');
              }
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-white font-medium">{city.name}</span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    city.type === 'metro' ? 'bg-purple-600 text-white' :
                    city.type === 'city' ? 'bg-blue-600 text-white' :
                    city.type === 'town' ? 'bg-green-600 text-white' :
                    'bg-gray-600 text-white'
                  }`}>
                    {city.type}
                  </span>
                </div>
                <div className="text-sm text-gray-400">{city.district}</div>
                {city.population && (
                  <div className="text-xs text-gray-500">
                    Population: {city.population.toLocaleString()}
                  </div>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                {city.id === startCity && (
                  <div className="flex items-center gap-1 text-green-400 text-sm">
                    <MapPin className="w-3 h-3" />
                    <span>Start</span>
                  </div>
                )}
                {city.id === endCity && (
                  <div className="flex items-center gap-1 text-red-400 text-sm">
                    <Target className="w-3 h-3" />
                    <span>End</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Instructions */}
      <div className="mt-4 p-3 bg-gray-800 rounded-lg border border-gray-600">
        <h3 className="text-sm font-semibold text-white mb-2">Instructions</h3>
        <ul className="text-xs text-gray-400 space-y-1">
          <li>• Click a city to set as start point (🚀)</li>
          <li>• Click another city to set as end point (🎯)</li>
          <li>• Click selected cities again to deselect them</li>
          <li>• Use search and filters to find specific cities</li>
        </ul>
      </div>
    </div>
  );
}