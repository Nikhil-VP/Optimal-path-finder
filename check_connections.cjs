// Script to check for missing bidirectional connections
const fs = require('fs');

// Read the connections file
const connectionsContent = fs.readFileSync('./src/data/connections.ts', 'utf8');

// Extract all connections from the file
const connectionMatches = connectionsContent.match(/{ from: '([^']+)', to: '([^']+)', distance: (\d+), travelTime: (\d+), roadType: '([^']+)', cost: (\d+) }/g);

if (!connectionMatches) {
  console.log('No connections found');
  process.exit(1);
}

const connections = connectionMatches.map(match => {
  const parts = match.match(/from: '([^']+)', to: '([^']+)', distance: (\d+), travelTime: (\d+), roadType: '([^']+)', cost: (\d+)/);
  return {
    from: parts[1],
    to: parts[2],
    distance: parseInt(parts[3]),
    travelTime: parseInt(parts[4]),
    roadType: parts[5],
    cost: parseInt(parts[6])
  };
});

console.log(`Found ${connections.length} connections`);

// Check for missing bidirectional connections
const connectionMap = new Map();
const missingConnections = [];

// Build map of existing connections
connections.forEach(conn => {
  const key = `${conn.from}-${conn.to}`;
  connectionMap.set(key, conn);
});

// Check for missing reverse connections
connections.forEach(conn => {
  const reverseKey = `${conn.to}-${conn.from}`;
  if (!connectionMap.has(reverseKey)) {
    missingConnections.push({
      from: conn.to,
      to: conn.from,
      distance: conn.distance,
      travelTime: conn.travelTime,
      roadType: conn.roadType,
      cost: conn.cost
    });
  }
});

console.log(`\nFound ${missingConnections.length} missing bidirectional connections:`);
missingConnections.forEach(conn => {
  console.log(`Missing: ${conn.from} -> ${conn.to} (${conn.distance}km, ${conn.travelTime}min)`);
});

// Generate the missing connections as TypeScript code
if (missingConnections.length > 0) {
  console.log('\n// Missing connections to add:');
  missingConnections.forEach(conn => {
    console.log(`  { from: '${conn.from}', to: '${conn.to}', distance: ${conn.distance}, travelTime: ${conn.travelTime}, roadType: '${conn.roadType}', cost: ${conn.cost} },`);
  });
}
