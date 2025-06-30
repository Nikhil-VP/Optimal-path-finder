import React, { useState, useMemo } from 'react';
import { Database, Search, Filter, Edit3, Save, X, Plus, Trash2, Info, Calculator } from 'lucide-react';
import { CityData, CityConnection } from '../types';
import { DataBasisInfo } from './DataBasisInfo';

interface DataPanelProps {
  cities: CityData[];
  connections: CityConnection[];
  onUpdateCities: (cities: CityData[]) => void;
  onUpdateConnections: (connections: CityConnection[]) => void;
  isVisible: boolean;
  onClose: () => void;
}

export function DataPanel({ 
  cities, 
  connections, 
  onUpdateCities, 
  onUpdateConnections, 
  isVisible, 
  onClose 
}: DataPanelProps) {
  const [activeTab, setActiveTab] = useState<'cities' | 'connections'>('cities');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDistrict, setFilterDistrict] = useState('');
  const [filterType, setFilterType] = useState('');
  const [editingCity, setEditingCity] = useState<string | null>(null);
  const [editingConnection, setEditingConnection] = useState<number | null>(null);
  const [editCityData, setEditCityData] = useState<Partial<CityData>>({});
  const [editConnectionData, setEditConnectionData] = useState<Partial<CityConnection>>({});
  const [newCity, setNewCity] = useState<Partial<CityData>>({});
  const [newConnection, setNewConnection] = useState<Partial<CityConnection>>({});
  const [showAddCity, setShowAddCity] = useState(false);
  const [showAddConnection, setShowAddConnection] = useState(false);
  const [showDataBasisInfo, setShowDataBasisInfo] = useState(false);

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
    });
  }, [cities, searchTerm, filterDistrict, filterType]);

  const filteredConnections = useMemo(() => {
    return connections.filter(conn => {
      const fromCity = cities.find(c => c.id === conn.from);
      const toCity = cities.find(c => c.id === conn.to);
      const searchLower = searchTerm.toLowerCase();
      
      return (fromCity?.name.toLowerCase().includes(searchLower) ||
              toCity?.name.toLowerCase().includes(searchLower) ||
              conn.roadType.toLowerCase().includes(searchLower));
    });
  }, [connections, cities, searchTerm]);

  const handleEditCity = (city: CityData) => {
    setEditingCity(city.id);
    setEditCityData({ ...city });
  };

  const handleSaveCityEdit = () => {
    if (!editingCity || !editCityData.name || !editCityData.lat || !editCityData.lng || 
        !editCityData.district || !editCityData.type) {
      alert('Please fill in all required fields');
      return;
    }

    const updatedCities = cities.map(city => 
      city.id === editingCity ? { ...city, ...editCityData } : city
    );
    onUpdateCities(updatedCities);
    setEditingCity(null);
    setEditCityData({});
  };

  const handleCancelCityEdit = () => {
    setEditingCity(null);
    setEditCityData({});
  };

  const handleEditConnection = (index: number) => {
    setEditingConnection(index);
    setEditConnectionData({ ...connections[index] });
  };

  const handleSaveConnectionEdit = () => {
    if (editingConnection === null || !editConnectionData.from || !editConnectionData.to || 
        !editConnectionData.distance || !editConnectionData.travelTime || 
        !editConnectionData.cost || !editConnectionData.roadType) {
      alert('Please fill in all required fields');
      return;
    }

    const updatedConnections = [...connections];
    updatedConnections[editingConnection] = { ...updatedConnections[editingConnection], ...editConnectionData };
    onUpdateConnections(updatedConnections);
    setEditingConnection(null);
    setEditConnectionData({});
  };

  const handleCancelConnectionEdit = () => {
    setEditingConnection(null);
    setEditConnectionData({});
  };

  const handleAddCity = () => {
    if (!newCity.name || !newCity.lat || !newCity.lng || !newCity.district || !newCity.type) {
      alert('Please fill in all required fields');
      return;
    }

    const city: CityData = {
      id: newCity.name.toLowerCase().replace(/\s+/g, '_'),
      name: newCity.name,
      lat: newCity.lat,
      lng: newCity.lng,
      district: newCity.district,
      type: newCity.type,
      population: newCity.population
    };
    onUpdateCities([...cities, city]);
    setNewCity({});
    setShowAddCity(false);
  };

  const handleAddConnection = () => {
    if (!newConnection.from || !newConnection.to || !newConnection.distance || 
        !newConnection.travelTime || !newConnection.cost || !newConnection.roadType) {
      alert('Please fill in all required fields');
      return;
    }

    const connection: CityConnection = {
      from: newConnection.from,
      to: newConnection.to,
      distance: newConnection.distance,
      travelTime: newConnection.travelTime,
      cost: newConnection.cost,
      roadType: newConnection.roadType as any
    };
    onUpdateConnections([...connections, connection]);
    setNewConnection({});
    setShowAddConnection(false);
  };

  const handleDeleteCity = (cityId: string) => {
    if (confirm('Are you sure you want to delete this city? This will also remove all connections to/from this city.')) {
      const updatedCities = cities.filter(city => city.id !== cityId);
      const updatedConnections = connections.filter(conn => 
        conn.from !== cityId && conn.to !== cityId
      );
      onUpdateCities(updatedCities);
      onUpdateConnections(updatedConnections);
    }
  };

  const handleDeleteConnection = (index: number) => {
    if (confirm('Are you sure you want to delete this connection?')) {
      const updatedConnections = connections.filter((_, i) => i !== index);
      onUpdateConnections(updatedConnections);
    }
  };

  if (!isVisible) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm z-[99999] flex items-center justify-center p-4">
        <div className="relative z-[99999] bg-gray-900 rounded-lg shadow-2xl border border-gray-700 w-full max-w-6xl h-5/6 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-700">
            <div className="flex items-center gap-3">
              <Database className="w-6 h-6 text-blue-400" />
              <h2 className="text-xl font-bold text-white">Data Management</h2>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowDataBasisInfo(true)}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
              >
                <Calculator className="w-4 h-4" />
                <span>How Data is Calculated</span>
              </button>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Data Basis Info Banner */}
          <div className="bg-purple-900/20 border-b border-purple-700 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Info className="w-5 h-5 text-purple-400" />
                <div>
                  <h3 className="text-sm font-medium text-purple-400">Data Methodology</h3>
                  <p className="text-xs text-gray-400">
                    Distance, time, and cost calculations are based on real Karnataka road network data
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowDataBasisInfo(true)}
                className="text-xs text-purple-400 hover:text-purple-300 underline"
              >
                Learn More →
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-700">
            <button
              onClick={() => setActiveTab('cities')}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === 'cities'
                  ? 'text-blue-400 border-b-2 border-blue-400'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Cities ({cities.length})
            </button>
            <button
              onClick={() => setActiveTab('connections')}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === 'connections'
                  ? 'text-blue-400 border-b-2 border-blue-400'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Connections ({connections.length})
            </button>
          </div>

          {/* Search and Filters */}
          <div className="p-4 border-b border-gray-700">
            <div className="flex gap-4 items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder={`Search ${activeTab}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                />
              </div>
              
              {activeTab === 'cities' && (
                <>
                  <select
                    value={filterDistrict}
                    onChange={(e) => setFilterDistrict(e.target.value)}
                    className="px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
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
                  >
                    <option value="">All Types</option>
                    {cityTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </>
              )}

              <button
                onClick={() => activeTab === 'cities' ? setShowAddCity(true) : setShowAddConnection(true)}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add {activeTab === 'cities' ? 'City' : 'Connection'}
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-auto p-4">
            {activeTab === 'cities' ? (
              <div className="space-y-2">
                {/* Add City Form */}
                {showAddCity && (
                  <div className="bg-gray-800 p-4 rounded-lg border border-gray-600 mb-4">
                    <h3 className="text-lg font-semibold text-white mb-3">Add New City</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      <input
                        type="text"
                        placeholder="City Name"
                        value={newCity.name || ''}
                        onChange={(e) => setNewCity({...newCity, name: e.target.value})}
                        className="px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400"
                      />
                      <input
                        type="number"
                        step="0.0001"
                        placeholder="Latitude"
                        value={newCity.lat || ''}
                        onChange={(e) => setNewCity({...newCity, lat: parseFloat(e.target.value)})}
                        className="px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400"
                      />
                      <input
                        type="number"
                        step="0.0001"
                        placeholder="Longitude"
                        value={newCity.lng || ''}
                        onChange={(e) => setNewCity({...newCity, lng: parseFloat(e.target.value)})}
                        className="px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400"
                      />
                      <input
                        type="text"
                        placeholder="District"
                        value={newCity.district || ''}
                        onChange={(e) => setNewCity({...newCity, district: e.target.value})}
                        className="px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400"
                      />
                      <select
                        value={newCity.type || ''}
                        onChange={(e) => setNewCity({...newCity, type: e.target.value as any})}
                        className="px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
                      >
                        <option value="">Select Type</option>
                        <option value="metro">Metro</option>
                        <option value="city">City</option>
                        <option value="town">Town</option>
                        <option value="village">Village</option>
                      </select>
                      <input
                        type="number"
                        placeholder="Population (optional)"
                        value={newCity.population || ''}
                        onChange={(e) => setNewCity({...newCity, population: parseInt(e.target.value)})}
                        className="px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400"
                      />
                    </div>
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={handleAddCity}
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded transition-colors"
                      >
                        <Save className="w-4 h-4 inline mr-2" />
                        Save
                      </button>
                      <button
                        onClick={() => setShowAddCity(false)}
                        className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {/* Cities Table */}
                <div className="bg-gray-800 rounded-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-700">
                        <tr>
                          <th className="px-4 py-3 text-left text-white font-medium">Name</th>
                          <th className="px-4 py-3 text-left text-white font-medium">District</th>
                          <th className="px-4 py-3 text-left text-white font-medium">Type</th>
                          <th className="px-4 py-3 text-left text-white font-medium">Coordinates</th>
                          <th className="px-4 py-3 text-left text-white font-medium">Population</th>
                          <th className="px-4 py-3 text-left text-white font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredCities.map((city) => (
                          <tr key={city.id} className="border-t border-gray-600 hover:bg-gray-750">
                            {editingCity === city.id ? (
                              <>
                                <td className="px-4 py-3">
                                  <input
                                    type="text"
                                    value={editCityData.name || ''}
                                    onChange={(e) => setEditCityData({...editCityData, name: e.target.value})}
                                    className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-sm"
                                  />
                                </td>
                                <td className="px-4 py-3">
                                  <input
                                    type="text"
                                    value={editCityData.district || ''}
                                    onChange={(e) => setEditCityData({...editCityData, district: e.target.value})}
                                    className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-sm"
                                  />
                                </td>
                                <td className="px-4 py-3">
                                  <select
                                    value={editCityData.type || ''}
                                    onChange={(e) => setEditCityData({...editCityData, type: e.target.value as any})}
                                    className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-sm"
                                  >
                                    <option value="metro">Metro</option>
                                    <option value="city">City</option>
                                    <option value="town">Town</option>
                                    <option value="village">Village</option>
                                  </select>
                                </td>
                                <td className="px-4 py-3">
                                  <div className="flex gap-1">
                                    <input
                                      type="number"
                                      step="0.0001"
                                      value={editCityData.lat || ''}
                                      onChange={(e) => setEditCityData({...editCityData, lat: parseFloat(e.target.value)})}
                                      className="w-20 px-1 py-1 bg-gray-700 border border-gray-600 rounded text-white text-xs"
                                      placeholder="Lat"
                                    />
                                    <input
                                      type="number"
                                      step="0.0001"
                                      value={editCityData.lng || ''}
                                      onChange={(e) => setEditCityData({...editCityData, lng: parseFloat(e.target.value)})}
                                      className="w-20 px-1 py-1 bg-gray-700 border border-gray-600 rounded text-white text-xs"
                                      placeholder="Lng"
                                    />
                                  </div>
                                </td>
                                <td className="px-4 py-3">
                                  <input
                                    type="number"
                                    value={editCityData.population || ''}
                                    onChange={(e) => setEditCityData({...editCityData, population: parseInt(e.target.value)})}
                                    className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-sm"
                                  />
                                </td>
                                <td className="px-4 py-3">
                                  <div className="flex gap-1">
                                    <button
                                      onClick={handleSaveCityEdit}
                                      className="p-1 hover:bg-gray-600 rounded transition-colors"
                                      title="Save"
                                    >
                                      <Save className="w-4 h-4 text-green-400" />
                                    </button>
                                    <button
                                      onClick={handleCancelCityEdit}
                                      className="p-1 hover:bg-gray-600 rounded transition-colors"
                                      title="Cancel"
                                    >
                                      <X className="w-4 h-4 text-red-400" />
                                    </button>
                                  </div>
                                </td>
                              </>
                            ) : (
                              <>
                                <td className="px-4 py-3 text-white font-medium">{city.name}</td>
                                <td className="px-4 py-3 text-gray-300">{city.district}</td>
                                <td className="px-4 py-3">
                                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                                    city.type === 'metro' ? 'bg-purple-600 text-white' :
                                    city.type === 'city' ? 'bg-blue-600 text-white' :
                                    city.type === 'town' ? 'bg-green-600 text-white' :
                                    'bg-gray-600 text-white'
                                  }`}>
                                    {city.type}
                                  </span>
                                </td>
                                <td className="px-4 py-3 text-gray-300 font-mono text-sm">
                                  {city.lat.toFixed(4)}, {city.lng.toFixed(4)}
                                </td>
                                <td className="px-4 py-3 text-gray-300">
                                  {city.population ? city.population.toLocaleString() : 'N/A'}
                                </td>
                                <td className="px-4 py-3">
                                  <div className="flex gap-2">
                                    <button
                                      onClick={() => handleEditCity(city)}
                                      className="p-1 hover:bg-gray-600 rounded transition-colors"
                                      title="Edit"
                                    >
                                      <Edit3 className="w-4 h-4 text-blue-400" />
                                    </button>
                                    <button
                                      onClick={() => handleDeleteCity(city.id)}
                                      className="p-1 hover:bg-gray-600 rounded transition-colors"
                                      title="Delete"
                                    >
                                      <Trash2 className="w-4 h-4 text-red-400" />
                                    </button>
                                  </div>
                                </td>
                              </>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                {/* Add Connection Form */}
                {showAddConnection && (
                  <div className="bg-gray-800 p-4 rounded-lg border border-gray-600 mb-4">
                    <h3 className="text-lg font-semibold text-white mb-3">Add New Connection</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      <select
                        value={newConnection.from || ''}
                        onChange={(e) => setNewConnection({...newConnection, from: e.target.value})}
                        className="px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
                      >
                        <option value="">From City</option>
                        {cities.map(city => (
                          <option key={city.id} value={city.id}>{city.name}</option>
                        ))}
                      </select>
                      <select
                        value={newConnection.to || ''}
                        onChange={(e) => setNewConnection({...newConnection, to: e.target.value})}
                        className="px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
                      >
                        <option value="">To City</option>
                        {cities.map(city => (
                          <option key={city.id} value={city.id}>{city.name}</option>
                        ))}
                      </select>
                      <input
                        type="number"
                        placeholder="Distance (km)"
                        value={newConnection.distance || ''}
                        onChange={(e) => setNewConnection({...newConnection, distance: parseFloat(e.target.value)})}
                        className="px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400"
                      />
                      <input
                        type="number"
                        placeholder="Travel Time (min)"
                        value={newConnection.travelTime || ''}
                        onChange={(e) => setNewConnection({...newConnection, travelTime: parseFloat(e.target.value)})}
                        className="px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400"
                      />
                      <input
                        type="number"
                        placeholder="Cost (₹)"
                        value={newConnection.cost || ''}
                        onChange={(e) => setNewConnection({...newConnection, cost: parseFloat(e.target.value)})}
                        className="px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400"
                      />
                      <select
                        value={newConnection.roadType || ''}
                        onChange={(e) => setNewConnection({...newConnection, roadType: e.target.value})}
                        className="px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
                      >
                        <option value="">Road Type</option>
                        <option value="highway">Highway</option>
                        <option value="state">State</option>
                        <option value="district">District</option>
                        <option value="rural">Rural</option>
                      </select>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={handleAddConnection}
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded transition-colors"
                      >
                        <Save className="w-4 h-4 inline mr-2" />
                        Save
                      </button>
                      <button
                        onClick={() => setShowAddConnection(false)}
                        className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {/* Connections Table */}
                <div className="bg-gray-800 rounded-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-700">
                        <tr>
                          <th className="px-4 py-3 text-left text-white font-medium">From</th>
                          <th className="px-4 py-3 text-left text-white font-medium">To</th>
                          <th className="px-4 py-3 text-left text-white font-medium">Distance</th>
                          <th className="px-4 py-3 text-left text-white font-medium">Time</th>
                          <th className="px-4 py-3 text-left text-white font-medium">Cost</th>
                          <th className="px-4 py-3 text-left text-white font-medium">Road Type</th>
                          <th className="px-4 py-3 text-left text-white font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredConnections.map((connection, index) => {
                          const fromCity = cities.find(c => c.id === connection.from);
                          const toCity = cities.find(c => c.id === connection.to);
                          return (
                            <tr key={index} className="border-t border-gray-600 hover:bg-gray-750">
                              {editingConnection === index ? (
                                <>
                                  <td className="px-4 py-3">
                                    <select
                                      value={editConnectionData.from || ''}
                                      onChange={(e) => setEditConnectionData({...editConnectionData, from: e.target.value})}
                                      className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-sm"
                                    >
                                      {cities.map(city => (
                                        <option key={city.id} value={city.id}>{city.name}</option>
                                      ))}
                                    </select>
                                  </td>
                                  <td className="px-4 py-3">
                                    <select
                                      value={editConnectionData.to || ''}
                                      onChange={(e) => setEditConnectionData({...editConnectionData, to: e.target.value})}
                                      className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-sm"
                                    >
                                      {cities.map(city => (
                                        <option key={city.id} value={city.id}>{city.name}</option>
                                      ))}
                                    </select>
                                  </td>
                                  <td className="px-4 py-3">
                                    <input
                                      type="number"
                                      value={editConnectionData.distance || ''}
                                      onChange={(e) => setEditConnectionData({...editConnectionData, distance: parseFloat(e.target.value)})}
                                      className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-sm"
                                    />
                                  </td>
                                  <td className="px-4 py-3">
                                    <input
                                      type="number"
                                      value={editConnectionData.travelTime || ''}
                                      onChange={(e) => setEditConnectionData({...editConnectionData, travelTime: parseFloat(e.target.value)})}
                                      className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-sm"
                                    />
                                  </td>
                                  <td className="px-4 py-3">
                                    <input
                                      type="number"
                                      value={editConnectionData.cost || ''}
                                      onChange={(e) => setEditConnectionData({...editConnectionData, cost: parseFloat(e.target.value)})}
                                      className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-sm"
                                    />
                                  </td>
                                  <td className="px-4 py-3">
                                    <select
                                      value={editConnectionData.roadType || ''}
                                      onChange={(e) => setEditConnectionData({...editConnectionData, roadType: e.target.value as any})}
                                      className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-sm"
                                    >
                                      <option value="highway">Highway</option>
                                      <option value="state">State</option>
                                      <option value="district">District</option>
                                      <option value="rural">Rural</option>
                                    </select>
                                  </td>
                                  <td className="px-4 py-3">
                                    <div className="flex gap-1">
                                      <button
                                        onClick={handleSaveConnectionEdit}
                                        className="p-1 hover:bg-gray-600 rounded transition-colors"
                                        title="Save"
                                      >
                                        <Save className="w-4 h-4 text-green-400" />
                                      </button>
                                      <button
                                        onClick={handleCancelConnectionEdit}
                                        className="p-1 hover:bg-gray-600 rounded transition-colors"
                                        title="Cancel"
                                      >
                                        <X className="w-4 h-4 text-red-400" />
                                      </button>
                                    </div>
                                  </td>
                                </>
                              ) : (
                                <>
                                  <td className="px-4 py-3 text-white">{fromCity?.name || connection.from}</td>
                                  <td className="px-4 py-3 text-white">{toCity?.name || connection.to}</td>
                                  <td className="px-4 py-3 text-gray-300">{connection.distance} km</td>
                                  <td className="px-4 py-3 text-gray-300">{connection.travelTime} min</td>
                                  <td className="px-4 py-3 text-gray-300">₹{connection.cost}</td>
                                  <td className="px-4 py-3">
                                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                                      connection.roadType === 'highway' ? 'bg-red-600 text-white' :
                                      connection.roadType === 'state' ? 'bg-blue-600 text-white' :
                                      connection.roadType === 'district' ? 'bg-green-600 text-white' :
                                      'bg-gray-600 text-white'
                                    }`}>
                                      {connection.roadType}
                                    </span>
                                  </td>
                                  <td className="px-4 py-3">
                                    <div className="flex gap-2">
                                      <button
                                        onClick={() => handleEditConnection(index)}
                                        className="p-1 hover:bg-gray-600 rounded transition-colors"
                                        title="Edit"
                                      >
                                        <Edit3 className="w-4 h-4 text-blue-400" />
                                      </button>
                                      <button
                                        onClick={() => handleDeleteConnection(index)}
                                        className="p-1 hover:bg-gray-600 rounded transition-colors"
                                        title="Delete"
                                      >
                                        <Trash2 className="w-4 h-4 text-red-400" />
                                      </button>
                                    </div>
                                  </td>
                                </>
                              )}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-700 bg-gray-800">
            <div className="flex justify-between items-center text-sm text-gray-400">
              <span>
                Showing {activeTab === 'cities' ? filteredCities.length : filteredConnections.length} of{' '}
                {activeTab === 'cities' ? cities.length : connections.length} {activeTab}
              </span>
              <span>
                Use the search and filters to find specific data
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Data Basis Information Modal */}
      <DataBasisInfo
        isVisible={showDataBasisInfo}
        onClose={() => setShowDataBasisInfo(false)}
      />
    </>
  );
}