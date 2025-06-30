import React, { useState } from 'react';
import { Brain, Clock, Target, Zap, ChevronDown, ChevronUp, Info, CheckCircle, XCircle } from 'lucide-react';

interface AlgorithmInfoProps {
  isVisible: boolean;
  onClose: () => void;
}

export function AlgorithmInfo({ isVisible, onClose }: AlgorithmInfoProps) {
  const [activeAlgorithm, setActiveAlgorithm] = useState<string>('astar');

  if (!isVisible) return null;

  const algorithms = {
    bfs: {
      name: 'Breadth-First Search (BFS)',
      icon: '🔄',
      color: 'blue',
      description: 'Explores nodes level by level, guaranteeing shortest path in unweighted graphs',
      timeComplexity: 'O(V + E)',
      spaceComplexity: 'O(V)',
      optimal: true,
      complete: true,
      usesHeuristic: false,
      speed: 'Medium',
      realWorldExample: 'Social network connections, shortest hop routing',
      coreIdea: 'Systematically explore all nodes at distance k before exploring nodes at distance k+1',
      steps: [
        'Start with the initial node and add it to a queue',
        'Mark the start node as visited',
        'While the queue is not empty:',
        '  • Dequeue a node from the front',
        '  • For each unvisited neighbor:',
        '    - Mark as visited',
        '    - Set parent pointer for path reconstruction',
        '    - Add to queue',
        'Reconstruct path using parent pointers'
      ],
      priority: 'Nodes are processed in First-In-First-Out (FIFO) order',
      advantages: [
        'Guarantees shortest path in unweighted graphs',
        'Complete - will find solution if one exists',
        'Simple to understand and implement'
      ],
      disadvantages: [
        'High memory usage for large graphs',
        'Explores many unnecessary nodes',
        'Not optimal for weighted graphs'
      ]
    },
    dfs: {
      name: 'Depth-First Search (DFS)',
      icon: '⬇️',
      color: 'green',
      description: 'Explores as deep as possible before backtracking',
      timeComplexity: 'O(V + E)',
      spaceComplexity: 'O(V)',
      optimal: false,
      complete: true,
      usesHeuristic: false,
      speed: 'Fast',
      realWorldExample: 'Maze solving, topological sorting, cycle detection',
      coreIdea: 'Go as deep as possible along each branch before backtracking',
      steps: [
        'Start with the initial node',
        'Mark current node as visited',
        'For each unvisited neighbor:',
        '  • Recursively apply DFS',
        '  • If goal found, return path',
        'If no unvisited neighbors, backtrack',
        'Continue until goal found or all nodes explored'
      ],
      priority: 'Nodes are processed in Last-In-First-Out (LIFO) order',
      advantages: [
        'Low memory usage (only stores current path)',
        'Fast for finding any solution',
        'Good for exploring graph structure'
      ],
      disadvantages: [
        'Does not guarantee shortest path',
        'Can get stuck in deep branches',
        'May not find optimal solution'
      ]
    },
    astar: {
      name: 'A* Search Algorithm',
      icon: '⭐',
      color: 'orange',
      description: 'Optimal pathfinding using heuristics to guide search toward goal',
      timeComplexity: 'O((V + E) log V)',
      spaceComplexity: 'O(V)',
      optimal: true,
      complete: true,
      usesHeuristic: true,
      speed: 'Very Fast',
      realWorldExample: 'GPS Navigation (Google Maps), Game AI pathfinding',
      coreIdea: 'Uses f(n) = g(n) + h(n) where g(n) = actual cost, h(n) = heuristic estimate to goal',
      steps: [
        'Set g(start) = 0, f(start) = h(start)',
        'Put start node into open list (priority queue)',
        'While open list is not empty:',
        '  • Choose node n with lowest f(n)',
        '  • If n is goal, reconstruct path and exit',
        '  • For each neighbor:',
        '    - Calculate tentative g(neighbor)',
        '    - If better than previous, update',
        '    - Compute f = g + h and add to open list'
      ],
      priority: 'Nodes chosen based on lowest f(n) = g(n) + h(n) (total estimated cost)',
      advantages: [
        'Optimal with admissible heuristic',
        'Much faster than uninformed search with good heuristic',
        'Goal-directed search reduces exploration'
      ],
      disadvantages: [
        'Requires domain knowledge for heuristic',
        'Heuristic quality affects performance',
        'More complex to implement'
      ]
    }
  };

  const heuristics = {
    euclidean: {
      name: 'Euclidean Distance',
      formula: '√[(x₂-x₁)² + (y₂-y₁)²]',
      description: 'Straight-line distance between two points',
      bestFor: 'Grid-based maps with diagonal movement',
      speed: 'Fastest calculation'
    },
    manhattan: {
      name: 'Manhattan Distance',
      formula: '|x₂-x₁| + |y₂-y₁|',
      description: 'Sum of absolute differences of coordinates',
      bestFor: 'Grid-based maps with only horizontal/vertical movement',
      speed: 'Very fast calculation'
    },
    haversine: {
      name: 'Haversine Distance',
      formula: 'Great-circle distance on Earth\'s surface',
      description: 'Accounts for Earth\'s curvature for geographical coordinates',
      bestFor: 'Real-world geographical navigation',
      speed: 'Slower but most accurate for maps'
    }
  };

  const currentAlg = algorithms[activeAlgorithm as keyof typeof algorithms];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm z-[99999] flex items-center justify-center p-4">
      <div className="relative z-[99999] bg-gray-900 rounded-lg shadow-2xl border border-gray-700 w-full max-w-7xl h-5/6 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <Brain className="w-6 h-6 text-blue-400" />
            <h2 className="text-xl font-bold text-white">Algorithm Deep Dive</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <XCircle className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Algorithm Selector */}
          <div className="w-64 border-r border-gray-700 p-4">
            <h3 className="text-lg font-semibold text-white mb-4">Algorithms</h3>
            <div className="space-y-2">
              {Object.entries(algorithms).map(([key, alg]) => (
                <button
                  key={key}
                  onClick={() => setActiveAlgorithm(key)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    activeAlgorithm === key
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{alg.icon}</span>
                    <div>
                      <div className="font-medium">{alg.name.split(' ')[0]}</div>
                      <div className="text-xs opacity-75">{alg.description.slice(0, 30)}...</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Comparison Table */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Comparison</h3>
              <div className="bg-gray-800 rounded-lg p-3">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="text-gray-400">
                      <th className="text-left pb-2">Feature</th>
                      <th className="text-center pb-2">BFS</th>
                      <th className="text-center pb-2">A*</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr>
                      <td className="py-1">Heuristic?</td>
                      <td className="text-center">❌</td>
                      <td className="text-center">✅</td>
                    </tr>
                    <tr>
                      <td className="py-1">Optimal?</td>
                      <td className="text-center">✅</td>
                      <td className="text-center">✅</td>
                    </tr>
                    <tr>
                      <td className="py-1">Speed</td>
                      <td className="text-center">🐢</td>
                      <td className="text-center">⚡</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Algorithm Details */}
          <div className="flex-1 p-6 overflow-auto">
            <div className="max-w-4xl">
              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">{currentAlg.icon}</span>
                <div>
                  <h1 className="text-2xl font-bold text-white">{currentAlg.name}</h1>
                  <p className="text-gray-400">{currentAlg.description}</p>
                </div>
              </div>

              {/* Core Properties */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-blue-400" />
                    <span className="text-sm text-gray-400">Time Complexity</span>
                  </div>
                  <div className="text-lg font-bold text-white font-mono">{currentAlg.timeComplexity}</div>
                </div>

                <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-4 h-4 text-green-400" />
                    <span className="text-sm text-gray-400">Optimal</span>
                  </div>
                  <div className="text-lg font-bold text-white">
                    {currentAlg.optimal ? (
                      <span className="text-green-400">✅ Yes</span>
                    ) : (
                      <span className="text-red-400">❌ No</span>
                    )}
                  </div>
                </div>

                <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm text-gray-400">Speed</span>
                  </div>
                  <div className="text-lg font-bold text-white">{currentAlg.speed}</div>
                </div>

                <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                  <div className="flex items-center gap-2 mb-2">
                    <Brain className="w-4 h-4 text-purple-400" />
                    <span className="text-sm text-gray-400">Heuristic</span>
                  </div>
                  <div className="text-lg font-bold text-white">
                    {currentAlg.usesHeuristic ? (
                      <span className="text-green-400">✅ Yes</span>
                    ) : (
                      <span className="text-gray-400">❌ No</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Core Idea */}
              <div className="bg-blue-900/20 border border-blue-700 p-6 rounded-lg mb-6">
                <h2 className="text-xl font-semibold text-blue-400 mb-3">🧠 Core Idea</h2>
                <p className="text-gray-300 text-lg leading-relaxed">{currentAlg.coreIdea}</p>
              </div>

              {/* Algorithm Steps */}
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-600 mb-6">
                <h2 className="text-xl font-semibold text-white mb-4">🪜 Algorithm Steps</h2>
                <ol className="space-y-2">
                  {currentAlg.steps.map((step, index) => (
                    <li key={index} className="text-gray-300">
                      <span className="text-blue-400 font-mono mr-2">
                        {step.startsWith('  ') ? '    ' : step.startsWith(' ') ? '  ' : `${index + 1}.`}
                      </span>
                      {step.replace(/^\s*/, '')}
                    </li>
                  ))}
                </ol>
              </div>

              {/* Priority Logic */}
              <div className="bg-purple-900/20 border border-purple-700 p-6 rounded-lg mb-6">
                <h2 className="text-xl font-semibold text-purple-400 mb-3">🔍 Priority Logic</h2>
                <p className="text-gray-300 text-lg">{currentAlg.priority}</p>
              </div>

              {/* Advantages & Disadvantages */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-green-900/20 border border-green-700 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-400 mb-3">✅ Advantages</h3>
                  <ul className="space-y-2">
                    {currentAlg.advantages.map((advantage, index) => (
                      <li key={index} className="text-gray-300 flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        {advantage}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-red-900/20 border border-red-700 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-red-400 mb-3">❌ Disadvantages</h3>
                  <ul className="space-y-2">
                    {currentAlg.disadvantages.map((disadvantage, index) => (
                      <li key={index} className="text-gray-300 flex items-start gap-2">
                        <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                        {disadvantage}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* A* Heuristics Section */}
              {activeAlgorithm === 'astar' && (
                <div className="bg-orange-900/20 border border-orange-700 p-6 rounded-lg mb-6">
                  <h2 className="text-xl font-semibold text-orange-400 mb-4">🎯 A* Heuristics</h2>
                  <p className="text-gray-300 mb-4">
                    A* uses heuristic functions h(n) to estimate the cost from current node to goal. 
                    The choice of heuristic significantly affects performance:
                  </p>
                  <div className="grid gap-4">
                    {Object.entries(heuristics).map(([key, heuristic]) => (
                      <div key={key} className="bg-gray-800 p-4 rounded border border-gray-600">
                        <h4 className="font-semibold text-white mb-2">{heuristic.name}</h4>
                        <div className="text-sm text-gray-300 space-y-1">
                          <div><strong>Formula:</strong> <code className="bg-gray-700 px-2 py-1 rounded">{heuristic.formula}</code></div>
                          <div><strong>Description:</strong> {heuristic.description}</div>
                          <div><strong>Best for:</strong> {heuristic.bestFor}</div>
                          <div><strong>Performance:</strong> {heuristic.speed}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Real-world Applications */}
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
                <h2 className="text-xl font-semibold text-white mb-3">🌍 Real-world Applications</h2>
                <p className="text-gray-300 text-lg">{currentAlg.realWorldExample}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}