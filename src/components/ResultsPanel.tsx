import { useState } from 'react';
import { PathResult, ComparisonResult, CityData, AlgorithmConfig } from '../types';
import { Clock, Route, Zap, TrendingUp, ChevronDown, ChevronUp, Eye, Navigation, BarChart3, Trophy } from 'lucide-react';
import { PathGraph } from './PathGraph';

interface ResultsPanelProps {
  result?: PathResult;
  comparisonResult?: ComparisonResult;
  cities: CityData[];
  isRunning: boolean;
  algorithmConfig: AlgorithmConfig;
}

export function ResultsPanel({ result, comparisonResult, cities, isRunning, algorithmConfig }: ResultsPanelProps) {
  const [expandedPath, setExpandedPath] = useState<string | null>(null);
  const [expandedTraversal, setExpandedTraversal] = useState<string | null>(null);
  const [showGraph, setShowGraph] = useState<boolean>(true);

  const getCityName = (cityId: string) => {
    return cities.find(c => c.id === cityId)?.name || cityId;
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString()}`;
  };

  // Function to determine overall optimal algorithm - prioritizes path optimality
  const getOptimalAlgorithm = (results: PathResult[], weightType: string) => {
    if (!results.length) return null;

    // Primary: Find the algorithm with the best path (shortest distance/time/cost)
    const bestByPrimaryMetric = results.reduce((best, current) => {
      switch (weightType) {
        case 'distance':
          return current.totalDistance < best.totalDistance ? current : best;
        case 'time':
          return current.totalTime < best.totalTime ? current : best;
        case 'cost':
          return current.totalCost < best.totalCost ? current : best;
        default:
          return current.totalDistance < best.totalDistance ? current : best;
      }
    });

    // Secondary: If there are ties in the primary metric (within 1% tolerance), 
    // choose the one with better execution time
    const tolerance = 0.01; // 1% tolerance
    const primaryValue = weightType === 'distance' ? bestByPrimaryMetric.totalDistance :
                        weightType === 'time' ? bestByPrimaryMetric.totalTime :
                        weightType === 'cost' ? bestByPrimaryMetric.totalCost : 
                        bestByPrimaryMetric.totalDistance;

    const tiedResults = results.filter(result => {
      const resultValue = weightType === 'distance' ? result.totalDistance :
                         weightType === 'time' ? result.totalTime :
                         weightType === 'cost' ? result.totalCost : 
                         result.totalDistance;
      return Math.abs(resultValue - primaryValue) / primaryValue <= tolerance;
    });

    if (tiedResults.length > 1) {
      // Among tied results, choose the one with best execution time
      return tiedResults.reduce((best, current) => 
        current.executionTime < best.executionTime ? current : best
      );
    }

    return bestByPrimaryMetric;
  };

  const TraversalDisplay = ({ visitedOrder, algorithm }: { visitedOrder: string[], algorithm: string }) => {
    const isExpanded = expandedTraversal === algorithm;
    
    return (
      <div className="mt-4 p-4 bg-gray-800 rounded-lg border border-gray-600">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-purple-400" />
            <h4 className="text-sm font-medium text-white">Node Traversal Order</h4>
            <span className="text-xs text-gray-400">({visitedOrder.length} nodes explored)</span>
          </div>
          <button
            onClick={() => setExpandedTraversal(isExpanded ? null : algorithm)}
            className="p-1 hover:bg-gray-700 rounded transition-colors"
          >
            {isExpanded ? (
              <ChevronUp className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-400" />
            )}
          </button>
        </div>

        {isExpanded ? (
          <div className="space-y-3">
            <div className="text-sm text-gray-300">
              <span className="font-medium text-purple-400">Exploration sequence:</span> Shows the order in which {algorithm} visited each city during pathfinding.
            </div>
            
            <div className="max-h-48 overflow-y-auto bg-gray-900 p-3 rounded border border-gray-700">
              <div className="grid grid-cols-1 gap-2">
                {visitedOrder.map((cityId, index) => (
                  <div key={index} className="flex items-center gap-3 text-sm">
                    <span className="text-purple-400 font-mono w-8 text-right">
                      {index + 1}.
                    </span>
                    <span className="text-white font-medium">
                      {getCityName(cityId)}
                    </span>
                    <span className="text-gray-500 text-xs">
                      {index === 0 ? '(Start)' : 
                       index === visitedOrder.length - 1 ? '(Last explored)' : 
                       `(Step ${index})`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="text-xs text-gray-400 bg-gray-900 p-2 rounded">
              <strong>Note:</strong> This shows the order of exploration, not the final path. 
              {algorithm === 'BFS' && ' BFS explores level by level from the start.'}
              {algorithm === 'DFS' && ' DFS goes deep before backtracking.'}
              {algorithm.includes('A*') && ' A* uses heuristics to guide exploration toward the goal.'}
            </div>
          </div>
        ) : (
          <div className="text-sm text-gray-300">
            <span className="text-purple-400 font-medium">First 5 cities explored:</span>{' '}
            {visitedOrder.slice(0, 5).map(cityId => getCityName(cityId)).join(' → ')}
            {visitedOrder.length > 5 && (
              <span className="text-gray-500"> ... and {visitedOrder.length - 5} more</span>
            )}
          </div>
        )}
      </div>
    );
  };

  if (isRunning) {
    return (
      <div className="bg-gray-900 p-6 rounded-lg shadow-2xl border border-gray-700">
        <h2 className="text-xl font-bold text-white mb-4">Results</h2>
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-gray-400">Algorithm is running...</p>
          <p className="text-sm text-gray-500 mt-2">Exploring cities and finding optimal path</p>
        </div>
      </div>
    );
  }

  if (comparisonResult) {
    // Get the truly optimal algorithm based on the current weight type
    const optimalAlgorithm = getOptimalAlgorithm(comparisonResult.results, algorithmConfig.weightType);

    return (
      <div className="bg-gray-900 p-6 rounded-lg shadow-2xl border border-gray-700">
        <h2 className="text-xl font-bold text-white mb-6">Algorithm Comparison Results</h2>
        
        {/* Overall Winner */}
        {optimalAlgorithm && (
          <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border border-yellow-600 p-6 rounded-lg mb-6">
            <div className="flex items-center gap-3 mb-3">
              <Trophy className="w-6 h-6 text-yellow-400" />
              <h3 className="text-xl font-bold text-yellow-400">🏆 Overall Optimal Algorithm</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <div className="text-2xl font-bold text-white mb-2">
                  {optimalAlgorithm.algorithm}
                  {optimalAlgorithm.heuristic && (
                    <span className="text-lg text-yellow-400 ml-2">({optimalAlgorithm.heuristic})</span>
                  )}
                </div>
                <p className="text-gray-300">
                  Best overall performance considering route optimality, execution speed, and exploration efficiency.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-gray-800 p-3 rounded">
                  <div className="text-yellow-400 font-medium">Distance</div>
                  <div className="text-white">{optimalAlgorithm.totalDistance.toFixed(1)} km</div>
                </div>
                <div className="bg-gray-800 p-3 rounded">
                  <div className="text-yellow-400 font-medium">Execution</div>
                  <div className="text-white">{optimalAlgorithm.executionTime.toFixed(2)}ms</div>
                </div>
                <div className="bg-gray-800 p-3 rounded">
                  <div className="text-yellow-400 font-medium">Efficiency</div>
                  <div className="text-white">{optimalAlgorithm.nodesExplored} nodes</div>
                </div>
                <div className="bg-gray-800 p-3 rounded">
                  <div className="text-yellow-400 font-medium">Cost</div>
                  <div className="text-white">{formatCurrency(optimalAlgorithm.totalCost)}</div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Best Results Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-green-900/30 border border-green-700 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-green-400" />
              <span className="text-sm text-green-400">Fastest Execution</span>
            </div>
            <div className="text-white font-bold">{comparisonResult.summary.fastestExecution.algorithm}</div>
            <div className="text-sm text-gray-300">{comparisonResult.summary.fastestExecution.executionTime.toFixed(2)}ms</div>
            <div className="text-xs text-green-400 mt-1">⚡ Most Efficient</div>
          </div>

          <div className="bg-blue-900/30 border border-blue-700 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Route className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-blue-400">Shortest Distance</span>
            </div>
            <div className="text-white font-bold">{comparisonResult.summary.shortestDistance.algorithm}</div>
            <div className="text-sm text-gray-300">{comparisonResult.summary.shortestDistance.totalDistance.toFixed(1)} km</div>
            <div className="text-xs text-blue-400 mt-1">📏 Most Direct</div>
          </div>

          <div className="bg-purple-900/30 border border-purple-700 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-purple-400">Shortest Time</span>
            </div>
            <div className="text-white font-bold">{comparisonResult.summary.shortestTime.algorithm}</div>
            <div className="text-sm text-gray-300">{formatTime(comparisonResult.summary.shortestTime.totalTime)}</div>
            <div className="text-xs text-purple-400 mt-1">⏱️ Fastest Route</div>
          </div>

          <div className="bg-yellow-900/30 border border-yellow-700 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-yellow-400">₹</span>
              <span className="text-sm text-yellow-400">Lowest Cost</span>
            </div>
            <div className="text-white font-bold">{comparisonResult.summary.leastCost.algorithm}</div>
            <div className="text-sm text-gray-300">{formatCurrency(comparisonResult.summary.leastCost.totalCost)}</div>
            <div className="text-xs text-yellow-400 mt-1">💰 Most Economic</div>
          </div>
        </div>

        {/* Graph Visualization for Best Path */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Optimal Path Visualization</h3>
            <button
              onClick={() => setShowGraph(!showGraph)}
              className="flex items-center gap-2 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors"
            >
              <BarChart3 className="w-4 h-4" />
              {showGraph ? 'Hide Graph' : 'Show Graph'}
            </button>
          </div>
          {showGraph && <PathGraph result={optimalAlgorithm || comparisonResult.bestPath} cities={cities} />}
        </div>

        {/* Detailed Results */}
        <div className="space-y-4">
          {comparisonResult.results.map((result, index) => (
            <div key={index} className="bg-gray-800 p-4 rounded-lg border border-gray-600">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-semibold text-white">
                    {result.algorithm}
                    {result.heuristic && (
                      <span className="text-sm text-gray-400 ml-2">({result.heuristic})</span>
                    )}
                  </h3>
                  {result === optimalAlgorithm && (
                    <span className="px-3 py-1 bg-gradient-to-r from-yellow-600 to-orange-600 text-white text-xs rounded-full font-medium flex items-center gap-1">
                      <Trophy className="w-3 h-3" />
                      OPTIMAL OVERALL
                    </span>
                  )}
                  {result === comparisonResult.bestPath && result !== optimalAlgorithm && (
                    <span className="px-2 py-1 bg-green-600 text-white text-xs rounded font-medium">
                      BEST ROUTE
                    </span>
                  )}
                  {result === comparisonResult.summary.fastestExecution && (
                    <span className="px-2 py-1 bg-green-600 text-white text-xs rounded font-medium">
                      FASTEST
                    </span>
                  )}
                </div>
                <button
                  onClick={() => setExpandedPath(expandedPath === result.algorithm ? null : result.algorithm)}
                  className="p-1 hover:bg-gray-700 rounded transition-colors"
                >
                  {expandedPath === result.algorithm ? (
                    <ChevronUp className="w-4 h-4 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  )}
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-3">
                <div className="text-center">
                  <div className="text-sm text-gray-400">Distance</div>
                  <div className="text-white font-semibold">{result.totalDistance.toFixed(1)} km</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-400">Time</div>
                  <div className="text-white font-semibold">{formatTime(result.totalTime)}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-400">Cost</div>
                  <div className="text-white font-semibold">{formatCurrency(result.totalCost)}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-400">Nodes Explored</div>
                  <div className="text-white font-semibold">{result.nodesExplored}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-400">Execution Time</div>
                  <div className="text-white font-semibold">{result.executionTime.toFixed(2)}ms</div>
                  <div className="text-xs text-gray-500">
                    {result === comparisonResult.summary.fastestExecution ? '⚡ Fastest' : 
                     result.executionTime < 50 ? '🟢 Fast' : 
                     result.executionTime < 100 ? '🟡 Medium' : '🔴 Slow'}
                  </div>
                </div>
              </div>

              {/* Node Traversal Display */}
              {result.visitedOrder.length > 0 && (
                <TraversalDisplay visitedOrder={result.visitedOrder} algorithm={result.algorithm} />
              )}

              {expandedPath === result.algorithm && result.path.length > 0 && (
                <div className="mt-4 p-3 bg-gray-700 rounded border border-gray-600">
                  <div className="flex items-center gap-2 mb-2">
                    <Navigation className="w-4 h-4 text-blue-400" />
                    <h4 className="text-sm font-medium text-white">Final Route</h4>
                  </div>
                  <div className="text-sm text-gray-300">
                    {result.path.map((cityId, idx) => (
                      <span key={idx}>
                        <span className="text-white font-medium">{getCityName(cityId)}</span>
                        {idx < result.path.length - 1 && (
                          <span className="text-gray-500 mx-2">→</span>
                        )}
                      </span>
                    ))}
                  </div>
                  <div className="mt-2 text-xs text-gray-400">
                    Final path includes {result.path.length} cities
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (result) {
    return (
      <div className="bg-gray-900 p-6 rounded-lg shadow-2xl border border-gray-700">
        <h2 className="text-xl font-bold text-white mb-6">
          {result.algorithm} Results
          {result.heuristic && (
            <span className="text-sm text-gray-400 ml-2">({result.heuristic})</span>
          )}
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
            <div className="flex items-center gap-2 mb-2">
              <Route className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-gray-400">Distance</span>
            </div>
            <div className="text-2xl font-bold text-white">
              {result.totalDistance.toFixed(1)} km
            </div>
          </div>

          <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-green-400" />
              <span className="text-sm text-gray-400">Travel Time</span>
            </div>
            <div className="text-2xl font-bold text-white">
              {formatTime(result.totalTime)}
            </div>
          </div>

          <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-yellow-400">₹</span>
              <span className="text-sm text-gray-400">Total Cost</span>
            </div>
            <div className="text-2xl font-bold text-white">
              {formatCurrency(result.totalCost)}
            </div>
          </div>

          <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-gray-400">Execution Time</span>
            </div>
            <div className="text-2xl font-bold text-white">
              {result.executionTime.toFixed(2)}ms
            </div>
            <div className="text-xs text-gray-400 mt-1">
              {result.nodesExplored} nodes explored
            </div>
          </div>
        </div>

        {/* Graph Visualization */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Path Visualization</h3>
            <button
              onClick={() => setShowGraph(!showGraph)}
              className="flex items-center gap-2 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors"
            >
              <BarChart3 className="w-4 h-4" />
              {showGraph ? 'Hide Graph' : 'Show Graph'}
            </button>
          </div>
          {showGraph && <PathGraph result={result} cities={cities} />}
        </div>

        {/* Node Traversal Display for Single Algorithm */}
        {result.visitedOrder.length > 0 && (
          <TraversalDisplay visitedOrder={result.visitedOrder} algorithm={result.algorithm} />
        )}

        {result.path.length > 0 && (
          <div className="mt-4 bg-gray-800 p-4 rounded-lg border border-gray-600">
            <div className="flex items-center gap-2 mb-3">
              <Navigation className="w-4 h-4 text-blue-400" />
              <h3 className="text-lg font-semibold text-white">Final Route Found</h3>
            </div>
            <div className="text-sm text-gray-300 mb-3">
              {result.path.map((cityId, idx) => (
                <span key={idx} className="inline-block">
                  <span className="text-white font-medium">{getCityName(cityId)}</span>
                  {idx < result.path.length - 1 && (
                    <span className="text-gray-500 mx-2">→</span>
                  )}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-4 text-xs text-gray-400">
              <span>Path includes {result.path.length} cities</span>
              <span>•</span>
              <span>Execution time: {result.executionTime.toFixed(2)}ms</span>
              <span>•</span>
              <span>Efficiency: {result.nodesExplored} nodes explored</span>
            </div>
          </div>
        )}

        {result.path.length === 0 && (
          <div className="bg-red-900/20 border border-red-700 p-4 rounded-lg">
            <h3 className="text-sm font-semibold text-red-400 mb-2">No Path Found</h3>
            <p className="text-xs text-red-300">
              The algorithm could not find a path between the selected cities.
              This might be due to disconnected road networks.
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-2xl border border-gray-700">
      <h2 className="text-xl font-bold text-white mb-4">Results</h2>
      <div className="text-center py-8">
        <div className="text-gray-500 mb-2">
          <TrendingUp className="w-12 h-12 mx-auto opacity-50" />
        </div>
        <p className="text-gray-400">Select cities and run an algorithm to see results</p>
        <p className="text-sm text-gray-500 mt-2">
          View both the exploration process and final optimal path
        </p>
      </div>
    </div>
  );
}