// Test script to debug the optimal path selection issue

// Simple test to see what's happening with path calculations
console.log('Debug: Testing path calculation logic...');

// Mock path results for testing
const mockResults = [
  {
    algorithm: 'BFS',
    totalDistance: 150,
    totalTime: 180,
    totalCost: 200,
    executionTime: 5,
    nodesExplored: 8,
    path: ['city1', 'city2', 'city3']
  },
  {
    algorithm: 'DFS',
    totalDistance: 350, // Longest path
    totalTime: 420,
    totalCost: 500,
    executionTime: 3,
    nodesExplored: 12,
    path: ['city1', 'city4', 'city5', 'city6', 'city3']
  },
  {
    algorithm: 'A*',
    totalDistance: 130, // Shortest path
    totalTime: 150,
    totalCost: 170,
    executionTime: 8,
    nodesExplored: 6,
    path: ['city1', 'city7', 'city3']
  }
];

// Test the NEW simplified optimal algorithm logic
function testNewOptimalAlgorithm(results, weightType) {
  console.log(`\nTesting NEW logic with weightType: ${weightType}`);
  
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

  console.log(`Primary metric winner: ${bestByPrimaryMetric.algorithm} (${weightType}: ${weightType === 'distance' ? bestByPrimaryMetric.totalDistance : weightType === 'time' ? bestByPrimaryMetric.totalTime : bestByPrimaryMetric.totalCost})`);
  console.log(`Tied results (within 1%): ${tiedResults.map(r => r.algorithm).join(', ')}`);

  let finalWinner;
  if (tiedResults.length > 1) {
    // Among tied results, choose the one with best execution time
    finalWinner = tiedResults.reduce((best, current) => 
      current.executionTime < best.executionTime ? current : best
    );
    console.log(`Tie-breaker: Chose ${finalWinner.algorithm} for better execution time (${finalWinner.executionTime}ms)`);
  } else {
    finalWinner = bestByPrimaryMetric;
  }

  console.log(`Final winner: ${finalWinner.algorithm} (${weightType}: ${weightType === 'distance' ? finalWinner.totalDistance : weightType === 'time' ? finalWinner.totalTime : finalWinner.totalCost})`);
  
  return finalWinner;
}

console.log('\n=== TESTING NEW OPTIMAL ALGORITHM LOGIC ===');
testNewOptimalAlgorithm(mockResults, 'distance');
testNewOptimalAlgorithm(mockResults, 'time');
testNewOptimalAlgorithm(mockResults, 'cost');
