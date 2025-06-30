import { Node, Edge, Graph, CityData, CityConnection } from '../types';
import { haversineDistance } from './distance';

export function createCityGraph(cities: CityData[], connections: CityConnection[]): Graph {
  const nodeMap = new Map<string, Node>();
  const edges: Edge[] = [];
  const adjacencyList = new Map<string, string[]>();

  // Initialize nodes from cities
  cities.forEach(city => {
    nodeMap.set(city.id, {
      id: city.id,
      lat: city.lat,
      lng: city.lng
    });
    adjacencyList.set(city.id, []);
  });

  // Create edges from connections
  connections.forEach(connection => {
    const fromCity = cities.find(c => c.id === connection.from);
    const toCity = cities.find(c => c.id === connection.to);
    
    if (fromCity && toCity) {
      edges.push({
        from: connection.from,
        to: connection.to,
        weight: connection.distance,
        travelTime: connection.travelTime,
        cost: connection.cost,
        roadType: connection.roadType
      });

      adjacencyList.get(connection.from)?.push(connection.to);
    }
  });

  return { nodes: nodeMap, edges, adjacencyList };
}

export function resetNodeStates(graph: Graph): void {
  graph.nodes.forEach(node => {
    node.visited = false;
    node.distance = Infinity;
    node.previous = null;
    node.fScore = Infinity;
    node.gScore = Infinity;
    node.hScore = 0;
  });
}

export function getEdgeWeight(graph: Graph, from: string, to: string, weightType: 'distance' | 'time' | 'cost'): number {
  const edge = graph.edges.find(e => e.from === from && e.to === to);
  if (!edge) return Infinity;

  switch (weightType) {
    case 'distance':
      return edge.weight;
    case 'time':
      return edge.travelTime || edge.weight;
    case 'cost':
      return edge.cost || edge.weight;
    default:
      return edge.weight;
  }
}

export function getDistanceBetweenCities(graph: Graph, fromId: string, toId: string): number {
  const edge = graph.edges.find(e => e.from === fromId && e.to === toId);
  return edge ? edge.weight : 0;
}

export function getPathDetails(graph: Graph, path: string[]): {
  totalDistance: number;
  totalTime: number;
  totalCost: number;
  segments: Array<{
    from: string;
    to: string;
    distance: number;
    time: number;
    cost: number;
    roadType: string;
  }>;
} {
  let totalDistance = 0;
  let totalTime = 0;
  let totalCost = 0;
  const segments = [];

  for (let i = 0; i < path.length - 1; i++) {
    const edge = graph.edges.find(e => e.from === path[i] && e.to === path[i + 1]);
    if (edge) {
      totalDistance += edge.weight;
      totalTime += edge.travelTime || edge.weight;
      totalCost += edge.cost || edge.weight;
      
      segments.push({
        from: path[i],
        to: path[i + 1],
        distance: edge.weight,
        time: edge.travelTime || edge.weight,
        cost: edge.cost || edge.weight,
        roadType: edge.roadType || 'unknown'
      });
    }
  }

  return { totalDistance, totalTime, totalCost, segments };
}