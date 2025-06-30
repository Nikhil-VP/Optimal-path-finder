export interface Node {
  id: string;
  lat: number;
  lng: number;
  visited?: boolean;
  distance?: number;
  previous?: string | null;
  fScore?: number;
  gScore?: number;
  hScore?: number;
}

export interface Edge {
  from: string;
  to: string;
  weight: number;
  travelTime?: number;
  cost?: number;
  roadType?: string;
}

export interface Graph {
  nodes: Map<string, Node>;
  edges: Edge[];
  adjacencyList: Map<string, string[]>;
}

export interface PathResult {
  path: string[];
  visitedOrder: string[];
  totalDistance: number;
  totalTime: number;
  totalCost: number;
  nodesExplored: number;
  executionTime: number;
  algorithm: string;
  heuristic?: string;
}

export type Algorithm = 'bfs' | 'dfs' | 'astar';

export type Heuristic = 'euclidean' | 'manhattan' | 'haversine' | 'none';

export interface AlgorithmStats {
  name: string;
  timeComplexity: string;
  spaceComplexity: string;
  optimal: boolean;
  complete: boolean;
  description: string;
}

export interface AlgorithmConfig {
  algorithm: Algorithm;
  heuristic?: Heuristic;
  weightType: 'distance' | 'time' | 'cost';
}

export interface ComparisonResult {
  results: PathResult[];
  bestPath: PathResult;
  summary: {
    fastestExecution: PathResult;
    shortestDistance: PathResult;
    leastCost: PathResult;
    shortestTime: PathResult;
  };
}

export interface CityData {
  id: string;
  name: string;
  lat: number;
  lng: number;
  district: string;
  population?: number;
  type: 'metro' | 'city' | 'town' | 'village';
}

export interface CityConnection {
  from: string;
  to: string;
  distance: number;
  travelTime: number;
  roadType: 'highway' | 'state' | 'district' | 'rural';
  cost: number;
}