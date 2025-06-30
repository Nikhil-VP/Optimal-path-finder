import React, { useState, useCallback, useRef } from 'react';
import { MapContainer } from './components/MapContainer';
import { CitySelector } from './components/CitySelector';
import { AlgorithmSelector } from './components/AlgorithmSelector';
import { ResultsPanel } from './components/ResultsPanel';
import { DataPanel } from './components/DataPanel';
import { AlgorithmInfo } from './components/AlgorithmInfo';
import { 
  Algorithm, 
  Heuristic, 
  AlgorithmConfig, 
  PathResult, 
  ComparisonResult, 
  Graph,
  CityData,
  CityConnection
} from './types';
import { createCityGraph, resetNodeStates } from './utils/graph';
import { bfs } from './algorithms/bfs';
import { dfs } from './algorithms/dfs';
import { aStar } from './algorithms/astar';
import { karnatakaCities } from './data/cities';
import { allConnections } from './data/connections';
import { Map, Database, Brain, Activity, Settings, Info } from 'lucide-react';

function App() {
  const [cities, setCities] = useState<CityData[]>(() => {
    const saved = localStorage.getItem('pathfinder-cities');
    return saved ? JSON.parse(saved) : karnatakaCities;
  });
  const [connections, setConnections] = useState<CityConnection[]>(() => {
    const saved = localStorage.getItem('pathfinder-connections');
    return saved ? JSON.parse(saved) : allConnections;
  });
  const [graph, setGraph] = useState<Graph | null>(null);
  const [startCity, setStartCity] = useState<string>('');
  const [endCity, setEndCity] = useState<string>('');
  const [visitedCities, setVisitedCities] = useState<string[]>([]);
  const [currentPath, setCurrentPath] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<PathResult>();
  const [comparisonResult, setComparisonResult] = useState<ComparisonResult>();
  const [showDataPanel, setShowDataPanel] = useState(false);
  const [showAlgorithmInfo, setShowAlgorithmInfo] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const [algorithmConfig, setAlgorithmConfig] = useState<AlgorithmConfig>({
    algorithm: 'astar',
    heuristic: 'haversine',
    weightType: 'distance'
  });
  const abortControllerRef = useRef<AbortController>();

  // Save to localStorage whenever cities or connections change
  React.useEffect(() => {
    localStorage.setItem('pathfinder-cities', JSON.stringify(cities));
  }, [cities]);

  React.useEffect(() => {
    localStorage.setItem('pathfinder-connections', JSON.stringify(connections));
  }, [connections]);

  // Handle cities update with persistence
  const handleUpdateCities = useCallback((newCities: CityData[]) => {
    setCities(newCities);
    setNotification('Cities updated and saved locally');
    setTimeout(() => setNotification(null), 3000);
  }, []);

  // Handle connections update with persistence
  const handleUpdateConnections = useCallback((newConnections: CityConnection[]) => {
    setConnections(newConnections);
    setNotification('Connections updated and saved locally');
    setTimeout(() => setNotification(null), 3000);
  }, []);

  // Reset to original data
  const handleResetData = useCallback(() => {
    setCities(karnatakaCities);
    setConnections(allConnections);
    localStorage.removeItem('pathfinder-cities');
    localStorage.removeItem('pathfinder-connections');
    setNotification('Data reset to original values');
    setTimeout(() => setNotification(null), 3000);
  }, []);

  // Initialize graph when cities or connections change
  React.useEffect(() => {
    if (cities.length > 0 && connections.length > 0) {
      setGraph(createCityGraph(cities, connections));
    }
  }, [cities, connections]);

  const handleCityClick = useCallback((cityId: string) => {
    if (isRunning) return;

    if (!startCity) {
      setStartCity(cityId);
    } else if (!endCity && cityId !== startCity) {
      setEndCity(cityId);
    } else if (cityId === startCity) {
      setStartCity('');
    } else if (cityId === endCity) {
      setEndCity('');
    } else {
      setStartCity(cityId);
      setEndCity('');
    }
  }, [startCity, endCity, isRunning]);

  const runAlgorithm = async (
    algorithm: Algorithm, 
    heuristic?: Heuristic
  ): Promise<PathResult | null> => {
    if (!graph || !startCity || !endCity) return null;

    resetNodeStates(graph);

    const onVisit = (cityId: string) => {
      if (abortControllerRef.current?.signal.aborted) return;
      setVisitedCities(prev => [...prev, cityId]);
    };

    try {
      switch (algorithm) {
        case 'bfs':
          return await bfs(graph, startCity, endCity, algorithmConfig.weightType, onVisit);
        case 'dfs':
          return await dfs(graph, startCity, endCity, algorithmConfig.weightType, onVisit);
        case 'astar':
          return await aStar(graph, startCity, endCity, heuristic || 'haversine', algorithmConfig.weightType, onVisit);
        default:
          throw new Error('Unknown algorithm');
      }
    } catch (error) {
      console.error('Algorithm execution failed:', error);
      return null;
    }
  };

  const handleRunSingle = useCallback(async () => {
    if (!graph || !startCity || !endCity || isRunning) return;

    setIsRunning(true);
    setVisitedCities([]);
    setCurrentPath([]);
    setResult(undefined);
    setComparisonResult(undefined);
    
    abortControllerRef.current = new AbortController();

    const pathResult = await runAlgorithm(algorithmConfig.algorithm, algorithmConfig.heuristic);
    
    if (pathResult && !abortControllerRef.current?.signal.aborted) {
      setCurrentPath(pathResult.path);
      setResult(pathResult);
    }

    setIsRunning(false);
  }, [graph, startCity, endCity, algorithmConfig, isRunning]);

  const handleRunComparison = useCallback(async () => {
    if (!graph || !startCity || !endCity || isRunning) return;

    setIsRunning(true);
    setVisitedCities([]);
    setCurrentPath([]);
    setResult(undefined);
    setComparisonResult(undefined);
    
    abortControllerRef.current = new AbortController();

    const algorithms: Array<{ algorithm: Algorithm; heuristic?: Heuristic }> = [
      { algorithm: 'bfs' },
      { algorithm: 'dfs' },
      { algorithm: 'astar', heuristic: 'euclidean' },
      { algorithm: 'astar', heuristic: 'manhattan' },
      { algorithm: 'astar', heuristic: 'haversine' }
    ];

    const results: PathResult[] = [];

    for (const config of algorithms) {
      if (abortControllerRef.current?.signal.aborted) break;
      
      setVisitedCities([]);
      const pathResult = await runAlgorithm(config.algorithm, config.heuristic);
      if (pathResult) {
        results.push(pathResult);
      }
    }

    if (results.length > 0 && !abortControllerRef.current?.signal.aborted) {
      // Find best results
      const bestPath = results.reduce((best, current) => {
        if (algorithmConfig.weightType === 'distance') {
          return current.totalDistance < best.totalDistance ? current : best;
        } else if (algorithmConfig.weightType === 'time') {
          return current.totalTime < best.totalTime ? current : best;
        } else {
          return current.totalCost < best.totalCost ? current : best;
        }
      });

      const summary = {
        fastestExecution: results.reduce((fastest, current) => 
          current.executionTime < fastest.executionTime ? current : fastest
        ),
        shortestDistance: results.reduce((shortest, current) => 
          current.totalDistance < shortest.totalDistance ? current : shortest
        ),
        leastCost: results.reduce((cheapest, current) => 
          current.totalCost < cheapest.totalCost ? current : cheapest
        ),
        shortestTime: results.reduce((fastest, current) => 
          current.totalTime < fastest.totalTime ? current : fastest
        )
      };

      const comparison: ComparisonResult = {
        results,
        bestPath,
        summary
      };

      setCurrentPath(bestPath.path);
      setComparisonResult(comparison);
    }

    setIsRunning(false);
  }, [graph, startCity, endCity, algorithmConfig, isRunning]);

  const handleStopAlgorithm = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setIsRunning(false);
  }, []);

  const handleReset = useCallback(() => {
    if (isRunning) return;
    setVisitedCities([]);
    setCurrentPath([]);
    setResult(undefined);
    setComparisonResult(undefined);
  }, [isRunning]);

  const canRun = !isRunning && !!startCity && !!endCity && !!graph;

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-700 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                <Map className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Optimal Path Finder
                </h1>
                <p className="text-sm text-gray-400">
                  Advanced pathfinding algorithms on real city networks
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowAlgorithmInfo(true)}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
              >
                <Info className="w-4 h-4" />
                <span>Algorithm Guide</span>
              </button>
              <button
                onClick={() => setShowDataPanel(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
              >
                <Database className="w-4 h-4" />
                <span>Data</span>
              </button>
              <button
                onClick={handleResetData}
                className="flex items-center gap-2 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors"
                title="Reset to original data"
              >
                <Settings className="w-4 h-4" />
                <span>Reset Data</span>
              </button>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Brain className="w-4 h-4" />
                <span>Algorithm: {algorithmConfig.algorithm.toUpperCase()}</span>
              </div>
              {(localStorage.getItem('pathfinder-cities') || localStorage.getItem('pathfinder-connections')) && (
                <div className="flex items-center gap-2 text-sm text-orange-400">
                  <Database className="w-4 h-4" />
                  <span>Custom Data Active</span>
                </div>
              )}
              {isRunning && (
                <div className="flex items-center gap-2 text-sm text-green-400">
                  <Activity className="w-4 h-4 animate-pulse" />
                  <span>Running...</span>
                  <button
                    onClick={handleStopAlgorithm}
                    className="ml-2 px-2 py-1 bg-red-600 hover:bg-red-700 text-white text-xs rounded"
                  >
                    Stop
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Map */}
          <div className="bg-gray-900 p-4 rounded-lg shadow-2xl border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">Interactive City Map</h2>
              <div className="flex items-center gap-4">
                <div className="text-sm text-gray-400">
                  {cities.length} cities • {connections.length} connections
                </div>
                <button
                  onClick={handleReset}
                  disabled={isRunning}
                  className="flex items-center gap-2 px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded transition-colors disabled:opacity-50"
                >
                  <Settings className="w-3 h-3" />
                  Reset
                </button>
              </div>
            </div>
            <MapContainer
              cities={cities}
              startCity={startCity}
              endCity={endCity}
              visitedCities={visitedCities}
              currentPath={currentPath}
              onCityClick={handleCityClick}
            />
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CitySelector
              cities={cities}
              startCity={startCity}
              endCity={endCity}
              onStartCityChange={setStartCity}
              onEndCityChange={setEndCity}
              isRunning={isRunning}
            />

            <AlgorithmSelector
              config={algorithmConfig}
              onConfigChange={setAlgorithmConfig}
              onRunSingle={handleRunSingle}
              onRunComparison={handleRunComparison}
              isRunning={isRunning}
              canRun={canRun}
            />
          </div>
        </div>

        {/* Results */}
        <div className="mt-8">
          <ResultsPanel
            result={result}
            comparisonResult={comparisonResult}
            cities={cities}
            isRunning={isRunning}
            algorithmConfig={algorithmConfig}
          />
        </div>

        {/* Algorithm Information */}
        <div className="mt-8 bg-gray-900 p-6 rounded-lg shadow-2xl border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">About the Algorithms</h3>
            <button
              onClick={() => setShowAlgorithmInfo(true)}
              className="flex items-center gap-2 px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded transition-colors"
            >
              <Info className="w-3 h-3" />
              Detailed Guide
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div>
              <h4 className="font-medium text-blue-400 mb-2">Breadth-First Search (BFS)</h4>
              <p className="text-gray-400">
                Explores cities level by level, guaranteeing the shortest path in terms of <strong>number of cities</strong> (hops).
                Uses a queue data structure for systematic exploration. <span className="text-yellow-400">Note: Finds fewest hops, not shortest distance!</span>
              </p>
              <div className="mt-2 text-xs text-gray-500">
                Time: O(V + E) • Space: O(V) • Optimal: ✅ (for hops)
              </div>
            </div>
            <div>
              <h4 className="font-medium text-green-400 mb-2">Depth-First Search (DFS)</h4>
              <p className="text-gray-400">
                Explores as deep as possible before backtracking using a stack approach.
                May not find the optimal path but demonstrates depth-first exploration.
              </p>
              <div className="mt-2 text-xs text-gray-500">
                Time: O(V + E) • Space: O(V) • Optimal: ❌
              </div>
            </div>
            <div>
              <h4 className="font-medium text-orange-400 mb-2">A* Search Algorithm</h4>
              <p className="text-gray-400">
                Combines optimality with intelligent heuristics using distance formulas.
                <strong>Best for finding shortest distance/time/cost paths.</strong> Most efficient for geographic pathfinding applications.
              </p>
              <div className="mt-2 text-xs text-gray-500">
                Time: O((V + E) log V) • Space: O(V) • Optimal: ✅ (for distance/time/cost)
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Data Panel */}
      <DataPanel
        cities={cities}
        connections={connections}
        onUpdateCities={handleUpdateCities}
        onUpdateConnections={handleUpdateConnections}
        isVisible={showDataPanel}
        onClose={() => setShowDataPanel(false)}
      />

      {/* Algorithm Information Panel */}
      <AlgorithmInfo
        isVisible={showAlgorithmInfo}
        onClose={() => setShowAlgorithmInfo(false)}
      />

      {/* Notification */}
      {notification && (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-[9999] animate-pulse">
          {notification}
        </div>
      )}
    </div>
  );
}

export default App;