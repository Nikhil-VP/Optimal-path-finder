import React from 'react';
import { Info, MapPin, Clock, DollarSign, Route, Fuel, Car, X, Calculator, Database, TrendingUp } from 'lucide-react';

interface DataBasisInfoProps {
  isVisible: boolean;
  onClose: () => void;
}

export function DataBasisInfo({ isVisible, onClose }: DataBasisInfoProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-lg shadow-2xl border border-gray-700 w-full max-w-5xl h-5/6 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <Calculator className="w-6 h-6 text-blue-400" />
            <h2 className="text-xl font-bold text-white">Data Calculation Methodology</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-4xl mx-auto space-y-8">
            
            {/* Overview */}
            <div className="bg-blue-900/20 border border-blue-700 p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <Database className="w-6 h-6 text-blue-400" />
                <h3 className="text-xl font-semibold text-blue-400">Data Foundation Overview</h3>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed">
                Our pathfinding system uses real-world data from Karnataka's transportation network. 
                All metrics are calculated based on actual road conditions, traffic patterns, and 
                economic factors to provide realistic pathfinding results.
              </p>
            </div>

            {/* Distance Calculation */}
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
              <div className="flex items-center gap-3 mb-4">
                <Route className="w-6 h-6 text-green-400" />
                <h3 className="text-xl font-semibold text-white">Distance Calculation</h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-medium text-green-400 mb-3">📏 Measurement Basis</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">•</span>
                      <span><strong>Road Network Distance:</strong> Actual driving distance along established roads, not straight-line distance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">•</span>
                      <span><strong>Highway Priority:</strong> Major highways (NH-4, NH-7, NH-13) provide shorter, more direct routes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">•</span>
                      <span><strong>Geographic Factors:</strong> Terrain, elevation changes, and natural obstacles affect route length</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">•</span>
                      <span><strong>Urban vs Rural:</strong> City routes may be longer due to traffic management and road layout</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-gray-900 p-4 rounded border border-gray-700">
                  <h4 className="text-lg font-medium text-green-400 mb-3">🛣️ Road Type Impact</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-red-400 font-medium">Highway</span>
                      <span className="text-gray-300">Most direct routes</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-400 font-medium">State Roads</span>
                      <span className="text-gray-300">Moderate detours</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-green-400 font-medium">District Roads</span>
                      <span className="text-gray-300">Local connections</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 font-medium">Rural Roads</span>
                      <span className="text-gray-300">Longer, winding paths</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-4 bg-green-900/20 border border-green-700 rounded">
                <h4 className="text-green-400 font-medium mb-2">📊 Example Calculation</h4>
                <p className="text-gray-300 text-sm">
                  <strong>Bangalore to Mysore:</strong> 150km via NH-275 (highway) vs 180km via state roads through smaller towns. 
                  The algorithm considers both options and selects based on optimization criteria.
                </p>
              </div>
            </div>

            {/* Time Calculation */}
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-6 h-6 text-purple-400" />
                <h3 className="text-xl font-semibold text-white">Travel Time Calculation</h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-medium text-purple-400 mb-3">⏱️ Time Factors</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400 mt-1">•</span>
                      <span><strong>Average Speed Limits:</strong> Based on road type and traffic conditions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400 mt-1">•</span>
                      <span><strong>Traffic Patterns:</strong> Peak hours, urban congestion, and seasonal variations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400 mt-1">•</span>
                      <span><strong>Road Conditions:</strong> Surface quality, construction zones, and weather impact</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400 mt-1">•</span>
                      <span><strong>Stop Time:</strong> Traffic signals, toll booths, and mandatory rest stops</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-gray-900 p-4 rounded border border-gray-700">
                  <h4 className="text-lg font-medium text-purple-400 mb-3">🚗 Speed Assumptions</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-red-400 font-medium">Highway</span>
                      <span className="text-gray-300">80-100 km/h</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-400 font-medium">State Roads</span>
                      <span className="text-gray-300">60-80 km/h</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-green-400 font-medium">District Roads</span>
                      <span className="text-gray-300">40-60 km/h</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 font-medium">Rural Roads</span>
                      <span className="text-gray-300">30-50 km/h</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-4 bg-purple-900/20 border border-purple-700 rounded">
                <h4 className="text-purple-400 font-medium mb-2">🕐 Time Formula</h4>
                <p className="text-gray-300 text-sm font-mono bg-gray-900 p-2 rounded">
                  Travel Time = (Distance ÷ Average Speed) + Stop Time + Traffic Delay
                </p>
                <p className="text-gray-400 text-xs mt-2">
                  Includes buffer time for real-world conditions like traffic lights, fuel stops, and unexpected delays.
                </p>
              </div>
            </div>

            {/* Cost Calculation */}
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
              <div className="flex items-center gap-3 mb-4">
                <DollarSign className="w-6 h-6 text-yellow-400" />
                <h3 className="text-xl font-semibold text-white">Travel Cost Calculation</h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-medium text-yellow-400 mb-3">💰 Cost Components</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-400 mt-1">•</span>
                      <span><strong>Fuel Costs:</strong> Based on current petrol/diesel prices and vehicle efficiency</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-400 mt-1">•</span>
                      <span><strong>Toll Charges:</strong> Highway tolls, bridge fees, and state border taxes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-400 mt-1">•</span>
                      <span><strong>Vehicle Maintenance:</strong> Wear and tear costs per kilometer</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-400 mt-1">•</span>
                      <span><strong>Parking & Misc:</strong> Urban parking fees and incidental expenses</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-gray-900 p-4 rounded border border-gray-700">
                  <h4 className="text-lg font-medium text-yellow-400 mb-3">⛽ Cost Breakdown</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Fuel (₹/km)</span>
                      <span className="text-yellow-400 font-medium">₹6-8</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Tolls (₹/km)</span>
                      <span className="text-yellow-400 font-medium">₹1-3</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Maintenance (₹/km)</span>
                      <span className="text-yellow-400 font-medium">₹1-2</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Misc (₹/trip)</span>
                      <span className="text-yellow-400 font-medium">₹50-200</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-4 bg-yellow-900/20 border border-yellow-700 rounded">
                <h4 className="text-yellow-400 font-medium mb-2">💳 Cost Formula</h4>
                <p className="text-gray-300 text-sm font-mono bg-gray-900 p-2 rounded">
                  Total Cost = (Distance × Fuel Rate) + Tolls + Maintenance + Parking
                </p>
                <p className="text-gray-400 text-xs mt-2">
                  Costs vary by road type: highways have higher tolls but better fuel efficiency; rural roads have lower tolls but higher fuel consumption.
                </p>
              </div>
            </div>

            {/* Algorithm Usage */}
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="w-6 h-6 text-orange-400" />
                <h3 className="text-xl font-semibold text-white">How Algorithms Use This Data</h3>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-blue-900/20 border border-blue-700 p-4 rounded">
                  <h4 className="text-blue-400 font-medium mb-2">🔄 BFS (Breadth-First)</h4>
                  <p className="text-gray-300 text-sm">
                    Uses <strong>unweighted</strong> connections. Finds path with minimum number of city hops, 
                    regardless of distance, time, or cost.
                  </p>
                </div>
                
                <div className="bg-green-900/20 border border-green-700 p-4 rounded">
                  <h4 className="text-green-400 font-medium mb-2">⬇️ DFS (Depth-First)</h4>
                  <p className="text-gray-300 text-sm">
                    Explores deep paths first. May find longer routes but demonstrates 
                    different exploration strategies. Not optimal for real travel.
                  </p>
                </div>
                
                <div className="bg-orange-900/20 border border-orange-700 p-4 rounded">
                  <h4 className="text-orange-400 font-medium mb-2">⭐ A* Search</h4>
                  <p className="text-gray-300 text-sm">
                    Uses your selected optimization criteria (distance/time/cost) plus 
                    heuristic estimates to find the truly optimal path.
                  </p>
                </div>
              </div>

              <div className="mt-6 bg-orange-900/20 border border-orange-700 p-4 rounded">
                <h4 className="text-orange-400 font-medium mb-2">🎯 Optimization Modes</h4>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-blue-400 font-medium">Distance Mode:</span>
                    <p className="text-gray-300">Minimizes total kilometers traveled</p>
                  </div>
                  <div>
                    <span className="text-purple-400 font-medium">Time Mode:</span>
                    <p className="text-gray-300">Minimizes total travel time</p>
                  </div>
                  <div>
                    <span className="text-yellow-400 font-medium">Cost Mode:</span>
                    <p className="text-gray-300">Minimizes total travel expenses</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Data Sources */}
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
              <div className="flex items-center gap-3 mb-4">
                <Info className="w-6 h-6 text-cyan-400" />
                <h3 className="text-xl font-semibold text-white">Data Sources & Accuracy</h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-medium text-cyan-400 mb-3">📊 Data Sources</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400 mt-1">•</span>
                      <span><strong>Government Records:</strong> Karnataka Road Development Corporation data</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400 mt-1">•</span>
                      <span><strong>GPS Mapping:</strong> Real-world route measurements and validation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400 mt-1">•</span>
                      <span><strong>Traffic Analysis:</strong> Historical traffic patterns and speed data</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400 mt-1">•</span>
                      <span><strong>Economic Data:</strong> Current fuel prices and toll rate schedules</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-medium text-cyan-400 mb-3">✅ Accuracy Notes</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400 mt-1">•</span>
                      <span><strong>Distance:</strong> ±5% accuracy based on road conditions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400 mt-1">•</span>
                      <span><strong>Time:</strong> ±15% variation due to traffic and weather</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400 mt-1">•</span>
                      <span><strong>Cost:</strong> ±10% based on fuel price fluctuations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400 mt-1">•</span>
                      <span><strong>Updates:</strong> Data refreshed quarterly for accuracy</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Real-world Examples */}
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-6 h-6 text-emerald-400" />
                <h3 className="text-xl font-semibold text-white">Real-World Examples</h3>
              </div>
              
              <div className="space-y-4">
                <div className="bg-gray-900 p-4 rounded border border-gray-700">
                  <h4 className="text-emerald-400 font-medium mb-2">🏙️ Bangalore to Hubli (410 km)</h4>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-blue-400 font-medium">Distance:</span>
                      <p className="text-gray-300">410 km via NH-4 (most direct highway route)</p>
                    </div>
                    <div>
                      <span className="text-purple-400 font-medium">Time:</span>
                      <p className="text-gray-300">8 hours (including stops and traffic)</p>
                    </div>
                    <div>
                      <span className="text-yellow-400 font-medium">Cost:</span>
                      <p className="text-gray-300">₹820 (fuel ₹600 + tolls ₹150 + misc ₹70)</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-900 p-4 rounded border border-gray-700">
                  <h4 className="text-emerald-400 font-medium mb-2">🏔️ Bangalore to Chikmagalur (245 km)</h4>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-blue-400 font-medium">Distance:</span>
                      <p className="text-gray-300">245 km via state roads (hilly terrain)</p>
                    </div>
                    <div>
                      <span className="text-purple-400 font-medium">Time:</span>
                      <p className="text-gray-300">5 hours (slower due to mountain roads)</p>
                    </div>
                    <div>
                      <span className="text-yellow-400 font-medium">Cost:</span>
                      <p className="text-gray-300">₹490 (higher fuel consumption on hills)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-700 bg-gray-800">
          <div className="text-center text-sm text-gray-400">
            This methodology ensures our pathfinding algorithms provide realistic, actionable route recommendations 
            based on actual travel conditions in Karnataka.
          </div>
        </div>
      </div>
    </div>
  );
}