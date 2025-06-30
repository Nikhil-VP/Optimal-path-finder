import React from 'react';
import { Clock, MapPin, Route, Zap } from 'lucide-react';
import { PathResult } from '../types';

interface StatsPanelProps {
  result?: PathResult;
  isRunning: boolean;
}

export function StatsPanel({ result, isRunning }: StatsPanelProps) {
  if (!result && !isRunning) {
    return (
      <div className="bg-gray-900 p-6 rounded-lg shadow-2xl border border-gray-700">
        <h2 className="text-xl font-bold text-white mb-4">Performance Metrics</h2>
        <div className="text-center py-8">
          <div className="text-gray-500 mb-2">
            <Zap className="w-12 h-12 mx-auto opacity-50" />
          </div>
          <p className="text-gray-400">Run an algorithm to see performance metrics</p>
        </div>
      </div>
    );
  }

  if (isRunning) {
    return (
      <div className="bg-gray-900 p-6 rounded-lg shadow-2xl border border-gray-700">
        <h2 className="text-xl font-bold text-white mb-4">Performance Metrics</h2>
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400 mx-auto mb-4"></div>
          <p className="text-gray-400">Algorithm is running...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-2xl border border-gray-700">
      <h2 className="text-xl font-bold text-white mb-6">Performance Metrics</h2>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-gray-400">Execution Time</span>
          </div>
          <div className="text-2xl font-bold text-white">
            {result?.executionTime.toFixed(2)}ms
          </div>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-4 h-4 text-green-400" />
            <span className="text-sm text-gray-400">Nodes Explored</span>
          </div>
          <div className="text-2xl font-bold text-white">
            {result?.nodesExplored}
          </div>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
          <div className="flex items-center gap-2 mb-2">
            <Route className="w-4 h-4 text-orange-400" />
            <span className="text-sm text-gray-400">Path Length</span>
          </div>
          <div className="text-2xl font-bold text-white">
            {result?.path.length || 0}
          </div>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-gray-400">Distance</span>
          </div>
          <div className="text-2xl font-bold text-white">
            {result?.totalDistance.toFixed(2)}km
          </div>
        </div>
      </div>

      {result?.path && result.path.length > 0 && (
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
          <h3 className="text-sm font-semibold text-white mb-3">Path Found</h3>
          <div className="text-xs text-green-400 font-mono">
            {result.path.slice(0, 3).join(' → ')}
            {result.path.length > 3 && ` → ... → ${result.path[result.path.length - 1]}`}
          </div>
          <div className="text-xs text-gray-400 mt-2">
            Successfully found optimal path with {result.path.length} nodes
          </div>
        </div>
      )}

      {result && result.path.length === 0 && (
        <div className="bg-red-900/20 border border-red-700 p-4 rounded-lg">
          <h3 className="text-sm font-semibold text-red-400 mb-2">No Path Found</h3>
          <p className="text-xs text-red-300">
            The algorithm could not find a path between the selected nodes.
          </p>
        </div>
      )}
    </div>
  );
}