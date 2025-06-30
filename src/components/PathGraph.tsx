import React, { useEffect, useRef } from 'react';
import { PathResult, CityData } from '../types';

interface PathGraphProps {
  result: PathResult;
  cities: CityData[];
  className?: string;
}

export function PathGraph({ result, cities, className = '' }: PathGraphProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current || !result.path.length) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = 400;

    // Clear canvas
    ctx.fillStyle = '#111827'; // gray-900
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Get cities in the path
    const pathCities = result.path.map(cityId => 
      cities.find(city => city.id === cityId)
    ).filter(Boolean) as CityData[];

    if (pathCities.length === 0) return;

    // Calculate positions for cities in a horizontal layout
    const padding = 80;
    const availableWidth = canvas.width - (padding * 2);
    const centerY = canvas.height / 2;

    const positions = pathCities.map((city, index) => {
      if (pathCities.length === 1) {
        return { x: canvas.width / 2, y: centerY, city };
      }
      
      const x = padding + (index / (pathCities.length - 1)) * availableWidth;
      return { x, y: centerY, city };
    });

    // Draw connections (edges) with distance labels
    ctx.strokeStyle = '#3B82F6'; // blue-500
    ctx.lineWidth = 4;
    ctx.setLineDash([]);

    for (let i = 0; i < positions.length - 1; i++) {
      const from = positions[i];
      const to = positions[i + 1];
      
      // Draw main line
      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(to.x, to.y);
      ctx.stroke();

      // Draw arrowhead
      const arrowSize = 12;
      const angle = Math.atan2(to.y - from.y, to.x - from.x);
      
      ctx.fillStyle = '#3B82F6';
      ctx.beginPath();
      ctx.moveTo(to.x, to.y);
      ctx.lineTo(
        to.x - arrowSize * Math.cos(angle - Math.PI / 6),
        to.y - arrowSize * Math.sin(angle - Math.PI / 6)
      );
      ctx.lineTo(
        to.x - arrowSize * Math.cos(angle + Math.PI / 6),
        to.y - arrowSize * Math.sin(angle + Math.PI / 6)
      );
      ctx.closePath();
      ctx.fill();

      // Draw distance label
      const midX = (from.x + to.x) / 2;
      const midY = (from.y + to.y) / 2 - 25;
      
      // Mock distance calculation (in real app, get from graph data)
      const distance = Math.floor(Math.random() * 150) + 50;
      
      // Background for label
      ctx.fillStyle = '#1F2937'; // gray-800
      ctx.fillRect(midX - 30, midY - 12, 60, 24);
      ctx.strokeStyle = '#374151'; // gray-700
      ctx.lineWidth = 1;
      ctx.strokeRect(midX - 30, midY - 12, 60, 24);
      
      // Distance text
      ctx.fillStyle = '#F3F4F6'; // gray-100
      ctx.font = 'bold 12px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(`${distance}km`, midX, midY + 4);
    }

    // Draw explored cities (not in final path)
    const exploredCities = result.visitedOrder
      .filter(cityId => !result.path.includes(cityId))
      .map(cityId => cities.find(city => city.id === cityId))
      .filter(Boolean) as CityData[];

    // Position explored cities above and below the main path
    exploredCities.forEach((city, index) => {
      const isAbove = index % 2 === 0;
      const x = padding + (index / Math.max(exploredCities.length - 1, 1)) * availableWidth;
      const y = centerY + (isAbove ? -80 : 80);

      // Draw explored node
      ctx.fillStyle = '#F59E0B'; // yellow-500
      ctx.beginPath();
      ctx.arc(x, y, 12, 0, Math.PI * 2);
      ctx.fill();

      // Border
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 2;
      ctx.stroke();

      // City name
      ctx.fillStyle = '#F3F4F6';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(city.name, x, y + (isAbove ? -20 : 30));

      // Dotted line to main path
      ctx.strokeStyle = '#F59E0B';
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, centerY);
      ctx.stroke();
      ctx.setLineDash([]);
    });

    // Draw main path nodes
    positions.forEach((pos, index) => {
      const isStart = index === 0;
      const isEnd = index === positions.length - 1;
      
      // Node circle
      ctx.fillStyle = isStart ? '#10B981' : isEnd ? '#EF4444' : '#3B82F6'; // green, red, blue
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, 25, 0, Math.PI * 2);
      ctx.fill();

      // Node border
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Node icon/number
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 14px sans-serif';
      ctx.textAlign = 'center';
      
      if (isStart) {
        ctx.font = '16px sans-serif';
        ctx.fillText('🚀', pos.x, pos.y + 5);
      } else if (isEnd) {
        ctx.font = '16px sans-serif';
        ctx.fillText('🎯', pos.x, pos.y + 5);
      } else {
        ctx.fillText((index + 1).toString(), pos.x, pos.y + 5);
      }

      // City name below node
      ctx.fillStyle = '#F3F4F6';
      ctx.font = 'bold 14px sans-serif';
      ctx.fillText(pos.city.name, pos.x, pos.y + 50);
      
      // City district
      ctx.fillStyle = '#9CA3AF';
      ctx.font = '10px sans-serif';
      ctx.fillText(pos.city.district, pos.x, pos.y + 65);
    });

    // Draw algorithm info box
    const infoBoxWidth = 280;
    const infoBoxHeight = 120;
    const infoX = canvas.width - infoBoxWidth - 20;
    const infoY = 20;

    // Background
    ctx.fillStyle = '#1F2937'; // gray-800
    ctx.fillRect(infoX, infoY, infoBoxWidth, infoBoxHeight);
    ctx.strokeStyle = '#374151'; // gray-700
    ctx.lineWidth = 2;
    ctx.strokeRect(infoX, infoY, infoBoxWidth, infoBoxHeight);

    // Title
    ctx.fillStyle = '#F3F4F6';
    ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(`${result.algorithm} Algorithm Results`, infoX + 15, infoY + 25);

    // Stats
    ctx.font = '12px sans-serif';
    ctx.fillStyle = '#9CA3AF';
    ctx.fillText(`Total Distance: ${result.totalDistance.toFixed(1)} km`, infoX + 15, infoY + 45);
    ctx.fillText(`Travel Time: ${Math.floor(result.totalTime / 60)}h ${result.totalTime % 60}m`, infoX + 15, infoY + 60);
    ctx.fillText(`Total Cost: ₹${result.totalCost.toLocaleString()}`, infoX + 15, infoY + 75);
    ctx.fillText(`Nodes Explored: ${result.nodesExplored}`, infoX + 15, infoY + 90);
    ctx.fillText(`Execution Time: ${result.executionTime.toFixed(2)}ms`, infoX + 15, infoY + 105);

    // Draw legend
    const legendY = canvas.height - 100;
    ctx.fillStyle = '#1F2937'; // gray-800
    ctx.fillRect(20, legendY, 300, 80);
    ctx.strokeStyle = '#374151'; // gray-700
    ctx.lineWidth = 1;
    ctx.strokeRect(20, legendY, 300, 80);
    
    ctx.fillStyle = '#F3F4F6';
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('Legend:', 30, legendY + 20);
    
    // Legend items
    const legendItems = [
      { color: '#10B981', label: 'Start City', x: 30, y: legendY + 35 },
      { color: '#EF4444', label: 'End City', x: 120, y: legendY + 35 },
      { color: '#3B82F6', label: 'Path Cities', x: 200, y: legendY + 35 },
      { color: '#F59E0B', label: 'Explored Cities', x: 30, y: legendY + 55 }
    ];

    legendItems.forEach(item => {
      ctx.fillStyle = item.color;
      ctx.beginPath();
      ctx.arc(item.x + 8, item.y, 6, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = '#F3F4F6';
      ctx.font = '11px sans-serif';
      ctx.fillText(item.label, item.x + 20, item.y + 4);
    });

  }, [result, cities]);

  if (!result.path.length) {
    return (
      <div className={`bg-gray-800 p-6 rounded-lg border border-gray-600 ${className}`}>
        <h3 className="text-lg font-semibold text-white mb-4">Path Graph</h3>
        <div className="text-center py-8">
          <div className="text-gray-500 mb-2">📊</div>
          <p className="text-gray-400">No path to visualize</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-gray-800 p-6 rounded-lg border border-gray-600 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Path Graph Visualization</h3>
        <div className="text-sm text-gray-400">
          {result.algorithm} • {result.path.length} cities • {result.totalDistance.toFixed(1)}km
        </div>
      </div>
      
      <div ref={containerRef} className="w-full">
        <canvas
          ref={canvasRef}
          className="w-full border border-gray-600 rounded bg-gray-900"
          style={{ maxHeight: '400px' }}
        />
      </div>
      
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <div className="bg-gray-900 p-3 rounded border border-gray-700">
          <div className="text-blue-400 font-medium mb-1">🔵 Optimal Path</div>
          <div className="text-gray-300">Shows the final route from start to destination</div>
        </div>
        <div className="bg-gray-900 p-3 rounded border border-gray-700">
          <div className="text-yellow-400 font-medium mb-1">🟡 Explored Cities</div>
          <div className="text-gray-300">Cities visited during the search process</div>
        </div>
        <div className="bg-gray-900 p-3 rounded border border-gray-700">
          <div className="text-gray-400 font-medium mb-1">📏 Distance Labels</div>
          <div className="text-gray-300">Distances between connected cities in km</div>
        </div>
      </div>
    </div>
  );
}