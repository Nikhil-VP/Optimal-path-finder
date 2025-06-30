import { Graph, PathResult } from '../types';
import { getEdgeWeight } from '../utils/graph';

export async function bfs(
  graph: Graph,
  startId: string,
  endId: string,
  weightType: 'distance' | 'time' | 'cost' = 'distance',
  onVisit?: (nodeId: string) => void
): Promise<PathResult> {
  const startTime = performance.now();
  const queue: string[] = [startId];
  const visited = new Set<string>();
  const parent = new Map<string, string>();
  const visitedOrder: string[] = [];

  visited.add(startId);
  
  while (queue.length > 0) {
    const currentId = queue.shift()!;
    visitedOrder.push(currentId);
    
    if (onVisit) {
      onVisit(currentId);
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    if (currentId === endId) {
      break;
    }

    const neighbors = graph.adjacencyList.get(currentId) || [];
    for (const neighborId of neighbors) {
      if (!visited.has(neighborId)) {
        visited.add(neighborId);
        parent.set(neighborId, currentId);
        queue.push(neighborId);
      }
    }
  }

  // Reconstruct path
  const path: string[] = [];
  let currentId: string | undefined = endId;
  
  while (currentId !== undefined) {
    path.unshift(currentId);
    currentId = parent.get(currentId);
  }

  // Calculate totals
  let totalDistance = 0;
  let totalTime = 0;
  let totalCost = 0;

  for (let i = 0; i < path.length - 1; i++) {
    const edge = graph.edges.find(e => e.from === path[i] && e.to === path[i + 1]);
    if (edge) {
      totalDistance += edge.weight;
      totalTime += edge.travelTime || edge.weight;
      totalCost += edge.cost || edge.weight;
    }
  }

  const endTime = performance.now();

  return {
    path: path.length > 1 && path[0] === startId ? path : [],
    visitedOrder,
    totalDistance,
    totalTime,
    totalCost,
    nodesExplored: visitedOrder.length,
    executionTime: endTime - startTime,
    algorithm: 'BFS'
  };
}