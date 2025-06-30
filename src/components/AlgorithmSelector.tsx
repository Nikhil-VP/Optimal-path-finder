import React from 'react';
import { Algorithm, Heuristic, AlgorithmConfig } from '../types';
import { Brain, Zap, Target, Settings } from 'lucide-react';

interface AlgorithmSelectorProps {
  config: AlgorithmConfig;
  onConfigChange: (config: AlgorithmConfig) => void;
  onRunSingle: () => void;
  onRunComparison: () => void;
  isRunning: boolean;
  canRun: boolean;
}

const algorithmInfo = {
  bfs: {
    name: 'Breadth-First Search',
    description: 'Explores nodes level by level, guarantees shortest path in unweighted graphs',
    icon: '🔄',
    color: 'blue'
  },
  dfs: {
    name: 'Depth-First Search', 
    description: 'Explores as deep as possible before backtracking',
    icon: '⬇️',
    color: 'green'
  },
  astar: {
    name: 'A* Search',
    description: 'Uses heuristics to find optimal path efficiently',
    icon: '⭐',
    color: 'orange'
  }
};

const heuristicInfo = {
  euclidean: 'Straight-line distance (fastest)',
  manhattan: 'Grid-based distance',
  haversine: 'Great-circle distance (most accurate)',
  none: 'No heuristic (pure Dijkstra)'
};

export function AlgorithmSelector({
  config,
  onConfigChange,
  onRunSingle,
  onRunComparison,
  isRunning,
  canRun
}: AlgorithmSelectorProps) {
  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-2xl border border-gray-700">
      <div className="flex items-center gap-3 mb-6">
        <Brain className="w-6 h-6 text-blue-400" />
        <h2 className="text-xl font-bold text-white">Algorithm Configuration</h2>
      </div>

      {/* Algorithm Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-3">
          Select Algorithm
        </label>
        <div className="grid grid-cols-1 gap-3">
          {Object.entries(algorithmInfo).map(([key, info]) => (
            <label key={key} className="flex items-start space-x-3 cursor-pointer group">
              <input
                type="radio"
                name="algorithm"
                value={key}
                checked={config.algorithm === key}
                onChange={(e) => onConfigChange({
                  ...config,
                  algorithm: e.target.value as Algorithm
                })}
                className="w-4 h-4 text-blue-600 bg-gray-800 border-gray-600 focus:ring-blue-500 mt-1"
                disabled={isRunning}
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{info.icon}</span>
                  <span className="text-white font-medium">{info.name}</span>
                </div>
                <p className="text-sm text-gray-400 mt-1">{info.description}</p>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Heuristic Selection (for A*) */}
      {config.algorithm === 'astar' && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Heuristic Function
          </label>
          <div className="space-y-2">
            {Object.entries(heuristicInfo).filter(([key]) => key !== 'none').map(([key, description]) => (
              <label key={key} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="heuristic"
                  value={key}
                  checked={config.heuristic === key}
                  onChange={(e) => onConfigChange({
                    ...config,
                    heuristic: e.target.value as Heuristic
                  })}
                  className="w-4 h-4 text-orange-600 bg-gray-800 border-gray-600 focus:ring-orange-500"
                  disabled={isRunning}
                />
                <div>
                  <span className="text-white text-sm">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                  <p className="text-xs text-gray-400">{description}</p>
                </div>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Weight Type Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-3">
          Optimization Criteria
        </label>
        <div className="space-y-2">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="radio"
              name="weightType"
              value="distance"
              checked={config.weightType === 'distance'}
              onChange={(e) => onConfigChange({
                ...config,
                weightType: e.target.value as any
              })}
              className="w-4 h-4 text-blue-600 bg-gray-800 border-gray-600 focus:ring-blue-500"
              disabled={isRunning}
            />
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-blue-400" />
              <span className="text-white text-sm">Shortest Distance</span>
            </div>
          </label>
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="radio"
              name="weightType"
              value="time"
              checked={config.weightType === 'time'}
              onChange={(e) => onConfigChange({
                ...config,
                weightType: e.target.value as any
              })}
              className="w-4 h-4 text-green-600 bg-gray-800 border-gray-600 focus:ring-green-500"
              disabled={isRunning}
            />
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-green-400" />
              <span className="text-white text-sm">Fastest Time</span>
            </div>
          </label>
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="radio"
              name="weightType"
              value="cost"
              checked={config.weightType === 'cost'}
              onChange={(e) => onConfigChange({
                ...config,
                weightType: e.target.value as any
              })}
              className="w-4 h-4 text-yellow-600 bg-gray-800 border-gray-600 focus:ring-yellow-500"
              disabled={isRunning}
            />
            <div className="flex items-center gap-2">
              <span className="text-yellow-400">₹</span>
              <span className="text-white text-sm">Lowest Cost</span>
            </div>
          </label>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={onRunSingle}
          disabled={!canRun}
          className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
            canRun
              ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-blue-600/25'
              : 'bg-gray-700 text-gray-400 cursor-not-allowed'
          }`}
        >
          <Settings className="w-4 h-4" />
          {isRunning ? 'Running...' : 'Run Selected Algorithm'}
        </button>

        <button
          onClick={onRunComparison}
          disabled={!canRun}
          className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
            canRun
              ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg hover:shadow-purple-600/25'
              : 'bg-gray-700 text-gray-400 cursor-not-allowed'
          }`}
        >
          <Brain className="w-4 h-4" />
          {isRunning ? 'Running...' : 'Compare All Algorithms'}
        </button>
      </div>

      {/* Current Configuration Summary */}
      <div className="mt-6 p-4 bg-gray-800 rounded-lg border border-gray-600">
        <h3 className="text-sm font-semibold text-white mb-2">Current Configuration</h3>
        <div className="space-y-1 text-xs text-gray-300">
          <div>Algorithm: <span className="text-blue-400">{algorithmInfo[config.algorithm].name}</span></div>
          {config.algorithm === 'astar' && config.heuristic && (
            <div>Heuristic: <span className="text-orange-400">{config.heuristic}</span></div>
          )}
          <div>Optimize for: <span className="text-green-400">{config.weightType}</span></div>
        </div>
      </div>
    </div>
  );
}