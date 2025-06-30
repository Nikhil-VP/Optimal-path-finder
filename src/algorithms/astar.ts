import { Graph, PathResult, Heuristic } from '../types';
import { euclideanDistance, manhattanDistance, haversineDistance } from '../utils/distance';
import { getEdgeWeight } from '../utils/graph';

function getHeuristicDistance(
  fromLat: number, fromLng: number,
  toLat: number, toLng: number,
  heuristic: Heuristic
): number {
  switch (heuristic) {
    case 'euclidean':
      return euclideanDistance(fromLat, fromLng, toLat, toLng);
    case 'manhattan':
      return manhattanDistance(fromLat, fromLng, toLat, toLng);
    case 'haversine':
      return haversineDistance(fromLat, fromLng, toLat, toLng);
    case 'none':
      return 0;
    default:
      return haversineDistance(fromLat, fromLng, toLat, toLng);
  }
}

export async function aStar(
  graph: Graph,
  startId: string,
  endId: string,
  heuristic: Heuristic = 'haversine',
  weightType: 'distance' | 'time' | 'cost' = 'distance',
  onVisit?: (nodeId: string) => void
): Promise<PathResult> {
  const startTime = performance.now();
  const openSet = new Set<string>([startId]);
  const closedSet = new Set<string>();
  const parent = new Map<string, string>();
  const gScore = new Map<string, number>();
  const fScore = new Map<string, number>();
  const visitedOrder: string[] = [];

  const startNode = graph.nodes.get(startId)!;
  const endNode = graph.nodes.get(endId)!;

  gScore.set(startId, 0);
  fScore.set(startId, getHeuristicDistance(startNode.lat, startNode.lng, endNode.lat, endNode.lng, heuristic));

  while (openSet.size > 0) {
    // Find node with lowest fScore
    let currentId = Array.from(openSet).reduce((lowest, nodeId) => 
      (fScore.get(nodeId) || Infinity) < (fScore.get(lowest) || Infinity) ? nodeId : lowest
    );

    visitedOrder.push(currentId);
    
    if (onVisit) {
      onVisit(currentId);
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    if (currentId === endId) {
      break;
    }

    openSet.delete(currentId);
    closedSet.add(currentId);

    const neighbors = graph.adjacencyList.get(currentId) || [];
    for (const neighborId of neighbors) {
      if (closedSet.has(neighborId)) continue;

      const edgeWeight = getEdgeWeight(graph, currentId, neighborId, weightType);
      const tentativeGScore = (gScore.get(currentId) || Infinity) + edgeWeight;

      if (!openSet.has(neighborId)) {
        openSet.add(neighborId);
      } else if (tentativeGScore >= (gScore.get(neighborId) || Infinity)) {
        continue;
      }

      parent.set(neighborId, currentId);
      gScore.set(neighborId, tentativeGScore);

      const neighborNode = graph.nodes.get(neighborId)!;
      const heuristicCost = getHeuristicDistance(neighborNode.lat, neighborNode.lng, endNode.lat, endNode.lng, heuristic);
      fScore.set(neighborId, tentativeGScore + heuristicCost);
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
    algorithm: 'A*',
    heuristic
  };
}