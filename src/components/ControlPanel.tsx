import React from 'react';
import { Play, Square, RotateCcw, MapPin, Target } from 'lucide-react';
import { Algorithm, AlgorithmStats } from '../types';

interface ControlPanelProps {
  selectedAlgorithm: Algorithm;
  onAlgorithmChange: (algorithm: Algorithm) => void;
  onRunAlgorithm: () => void;
  onStopAlgorithm: () => void;
  onReset: () => void;
  onClearNodes: () => void;
  isRunning: boolean;
  startNode?: string;
  endNode?: string;
  nodeCount: number;
}

const algorithmStats: Record<Algorithm, AlgorithmStats> = {
  bfs: {
    name: 'Breadth-First Search',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)',
    optimal: true,
    complete: true
  },
  dfs: {
    name: 'Depth-First Search',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)',
    optimal: false,
    complete: true
  },
  astar: {
    name: 'A* Search',
    timeComplexity: 'O((V + E) log V)',
    spaceComplexity: 'O(V)',
    optimal: true,
    complete: true
  }
};

export function ControlPanel({
  selectedAlgorithm,
  onAlgorithmChange,
  onRunAlgorithm,
  onStopAlgorithm,
  onReset,
  onClearNodes,
  isRunning,
  startNode,
  endNode,
  nodeCount
}: ControlPanelProps) {
  const currentStats = algorithmStats[selectedAlgorithm];
  const canRun = !isRunning && startNode && endNode && nodeCount >= 2;

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-2xl border border-gray-700">
      <h2 className="text-xl font-bold text-white mb-6">Algorithm Control Panel</h2>
      
      {/* Algorithm Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-3">
          Select Algorithm
        </label>
        <div className="grid grid-cols-1 gap-2">
          {Object.entries(algorithmStats).map(([key, stats]) => (
            <label key={key} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="algorithm"
                value={key}
                checked={selectedAlgorithm === key}
                onChange={(e) => onAlgorithmChange(e.target.value as Algorithm)}
                className="w-4 h-4 text-blue-600 bg-gray-800 border-gray-600 focus:ring-blue-500"
                disabled={isRunning}
              />
              <span className="text-gray-300 text-sm">{stats.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Algorithm Statistics */}
      <div className="mb-6 p-4 bg-gray-800 rounded-lg border border-gray-600">
        <h3 className="text-sm font-semibold text-white mb-3">{currentStats.name}</h3>
        <div className="space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-gray-400">Time Complexity:</span>
            <span className="text-green-400 font-mono">{currentStats.timeComplexity}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Space Complexity:</span>
            <span className="text-green-400 font-mono">{currentStats.spaceComplexity}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Optimal:</span>
            <span className={currentStats.optimal ? 'text-green-400' : 'text-red-400'}>
              {currentStats.optimal ? 'Yes' : 'No'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Complete:</span>
            <span className={currentStats.complete ? 'text-green-400' : 'text-red-400'}>
              {currentStats.complete ? 'Yes' : 'No'}
            </span>
          </div>
        </div>
      </div>

      {/* Node Status */}
      <div className="mb-6 p-4 bg-gray-800 rounded-lg border border-gray-600">
        <h3 className="text-sm font-semibold text-white mb-3">Map Status</h3>
        <div className="space-y-2 text-xs">
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Total Nodes:</span>
            <span className="text-blue-400 font-semibold">{nodeCount}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400 flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              Start Node:
            </span>
            <span className={startNode ? 'text-green-400' : 'text-gray-500'}>
              {startNode ? '✓' : 'Not set'}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400 flex items-center gap-1">
              <Target className="w-3 h-3" />
              End Node:
            </span>
            <span className={endNode ? 'text-red-400' : 'text-gray-500'}>
              {endNode ? '✓' : 'Not set'}
            </span>
          </div>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="space-y-3">
        <button
          onClick={onRunAlgorithm}
          disabled={!canRun}
          className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
            canRun
              ? 'bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-green-600/25'
              : 'bg-gray-700 text-gray-400 cursor-not-allowed'
          }`}
        >
          <Play className="w-4 h-4" />
          {isRunning ? 'Running...' : 'Find Path'}
        </button>

        <button
          onClick={onStopAlgorithm}
          disabled={!isRunning}
          className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
            isRunning
              ? 'bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-red-600/25'
              : 'bg-gray-700 text-gray-400 cursor-not-allowed'
          }`}
        >
          <Square className="w-4 h-4" />
          Stop
        </button>

        <div className="flex gap-2">
          <button
            onClick={onReset}
            disabled={isRunning}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
          
          <button
            onClick={onClearNodes}
            disabled={isRunning}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Clear Map
          </button>
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-6 p-4 bg-gray-800 rounded-lg border border-gray-600">
        <h3 className="text-sm font-semibold text-white mb-2">Instructions</h3>
        <ul className="text-xs text-gray-400 space-y-1">
          <li>• Click on the map to add nodes</li>
          <li>• Click nodes to set start (🚀) and end (🎯) points</li>
          <li>• Select an algorithm and click "Find Path"</li>
          <li>• Watch the algorithm explore the graph</li>
        </ul>
      </div>
    </div>
  );
}