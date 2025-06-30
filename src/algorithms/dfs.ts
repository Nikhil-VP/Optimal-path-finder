import { Graph, PathResult } from '../types';
import { getEdgeWeight } from '../utils/graph';

export async function dfs(
  graph: Graph,
  startId: string,
  endId: string,
  weightType: 'distance' | 'time' | 'cost' = 'distance',
  onVisit?: (nodeId: string) => void
): Promise<PathResult> {
  const startTime = performance.now();
  const visited = new Set<string>();
  const visitedOrder: string[] = [];
  let foundPath: string[] = [];

  async function dfsRecursive(currentId: string, path: string[]): Promise<boolean> {
    visited.add(currentId);
    visitedOrder.push(currentId);
    path.push(currentId);

    if (onVisit) {
      onVisit(currentId);
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    if (currentId === endId) {
      foundPath = [...path];
      return true;
    }

    const neighbors = graph.adjacencyList.get(currentId) || [];
    for (const neighborId of neighbors) {
      if (!visited.has(neighborId)) {
        if (await dfsRecursive(neighborId, path)) {
          return true;
        }
      }
    }

    path.pop();
    return false;
  }

  await dfsRecursive(startId, []);

  // Calculate totals
  let totalDistance = 0;
  let totalTime = 0;
  let totalCost = 0;

  for (let i = 0; i < foundPath.length - 1; i++) {
    const edge = graph.edges.find(e => e.from === foundPath[i] && e.to === foundPath[i + 1]);
    if (edge) {
      totalDistance += edge.weight;
      totalTime += edge.travelTime || edge.weight;
      totalCost += edge.cost || edge.weight;
    }
  }

  const endTime = performance.now();

  return {
    path: foundPath,
    visitedOrder,
    totalDistance,
    totalTime,
    totalCost,
    nodesExplored: visitedOrder.length,
    executionTime: endTime - startTime,
    algorithm: 'DFS'
  };
}