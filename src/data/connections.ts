export interface CityConnection {
  from: string;
  to: string;
  distance: number;
  travelTime: number; // in minutes
  roadType: 'highway' | 'state' | 'district' | 'rural';
  cost: number; // travel cost in rupees
}

export const cityConnections: CityConnection[] = [
  // Major Highway Connections (NH-4, NH-7, NH-13, etc.)
  
  // Bangalore Hub - Major connections
  { from: 'bangalore', to: 'tumkur', distance: 70, travelTime: 90, roadType: 'highway', cost: 150 },
  { from: 'bangalore', to: 'mysore', distance: 150, travelTime: 180, roadType: 'highway', cost: 300 },
  { from: 'bangalore', to: 'kolar', distance: 70, travelTime: 90, roadType: 'state', cost: 140 },
  { from: 'bangalore', to: 'hassan', distance: 180, travelTime: 240, roadType: 'state', cost: 360 },
  { from: 'bangalore', to: 'chikballapur', distance: 60, travelTime: 75, roadType: 'state', cost: 120 },
  { from: 'bangalore', to: 'ramanagara', distance: 50, travelTime: 60, roadType: 'state', cost: 100 },
  { from: 'bangalore', to: 'nelamangala', distance: 27, travelTime: 35, roadType: 'state', cost: 60 },
  { from: 'bangalore', to: 'devanahalli', distance: 40, travelTime: 50, roadType: 'state', cost: 80 },
  { from: 'bangalore', to: 'doddaballapur', distance: 35, travelTime: 45, roadType: 'state', cost: 70 },
  { from: 'bangalore', to: 'hoskote', distance: 30, travelTime: 40, roadType: 'state', cost: 60 },
  { from: 'bangalore', to: 'anekal', distance: 40, travelTime: 50, roadType: 'district', cost: 80 },
  
  // Tumkur connections
  { from: 'tumkur', to: 'chitradurga', distance: 120, travelTime: 150, roadType: 'highway', cost: 240 },
  { from: 'tumkur', to: 'davanagere', distance: 140, travelTime: 180, roadType: 'state', cost: 280 },
  { from: 'tumkur', to: 'tiptur', distance: 35, travelTime: 45, roadType: 'state', cost: 70 },
  { from: 'tumkur', to: 'gubbi', distance: 25, travelTime: 30, roadType: 'district', cost: 50 },
  { from: 'tumkur', to: 'kunigal', distance: 40, travelTime: 50, roadType: 'district', cost: 80 },
  { from: 'tumkur', to: 'madhugiri', distance: 45, travelTime: 60, roadType: 'state', cost: 90 },
  { from: 'tumkur', to: 'sira', distance: 55, travelTime: 70, roadType: 'state', cost: 110 },
  { from: 'tumkur', to: 'pavagada', distance: 80, travelTime: 100, roadType: 'state', cost: 160 },
  
  // Mysore connections
  { from: 'mysore', to: 'mandya', distance: 45, travelTime: 60, roadType: 'state', cost: 90 },
  { from: 'mysore', to: 'hassan', distance: 120, travelTime: 150, roadType: 'state', cost: 240 },
  { from: 'mysore', to: 'chamarajanagar', distance: 60, travelTime: 80, roadType: 'state', cost: 120 },
  { from: 'mysore', to: 'kodagu', distance: 120, travelTime: 180, roadType: 'state', cost: 240 },
  { from: 'mysore', to: 'hunsur', distance: 50, travelTime: 65, roadType: 'state', cost: 100 },
  { from: 'mysore', to: 'nanjangud', distance: 25, travelTime: 35, roadType: 'district', cost: 50 },
  { from: 'mysore', to: 'srirangapatna', distance: 15, travelTime: 20, roadType: 'state', cost: 30 },
  
  // Hubli-Dharwad connections
  { from: 'hubli', to: 'dharwad', distance: 20, travelTime: 25, roadType: 'state', cost: 40 },
  { from: 'hubli', to: 'belgaum', distance: 90, travelTime: 120, roadType: 'highway', cost: 180 },
  { from: 'hubli', to: 'gadag', distance: 60, travelTime: 75, roadType: 'state', cost: 120 },
  { from: 'hubli', to: 'haveri', distance: 45, travelTime: 60, roadType: 'state', cost: 90 },
  { from: 'hubli', to: 'ranebennur', distance: 55, travelTime: 70, roadType: 'state', cost: 110 },
  { from: 'hubli', to: 'sirsi', distance: 100, travelTime: 150, roadType: 'state', cost: 200 },
  { from: 'hubli', to: 'karwar', distance: 150, travelTime: 240, roadType: 'state', cost: 300 },
  
  // Dharwad connections
  { from: 'dharwad', to: 'navalgund', distance: 25, travelTime: 35, roadType: 'state', cost: 50 },
  { from: 'dharwad', to: 'kundgol', distance: 30, travelTime: 40, roadType: 'district', cost: 60 },
  { from: 'dharwad', to: 'annigeri', distance: 35, travelTime: 45, roadType: 'district', cost: 70 },
  
  // Belgaum connections
  { from: 'belgaum', to: 'gokak', distance: 70, travelTime: 90, roadType: 'state', cost: 140 },
  { from: 'belgaum', to: 'athani', distance: 90, travelTime: 120, roadType: 'state', cost: 180 },
  { from: 'belgaum', to: 'chikodi', distance: 50, travelTime: 65, roadType: 'state', cost: 100 },
  { from: 'belgaum', to: 'bailhongal', distance: 40, travelTime: 50, roadType: 'state', cost: 80 },
  { from: 'belgaum', to: 'saundatti', distance: 45, travelTime: 60, roadType: 'state', cost: 90 },
  { from: 'belgaum', to: 'khanapur', distance: 25, travelTime: 35, roadType: 'district', cost: 50 },
  
  // Mangalore connections
  { from: 'mangalore', to: 'udupi', distance: 60, travelTime: 75, roadType: 'highway', cost: 120 },
  { from: 'mangalore', to: 'puttur', distance: 50, travelTime: 70, roadType: 'state', cost: 100 },
  { from: 'mangalore', to: 'bantwal', distance: 25, travelTime: 35, roadType: 'state', cost: 50 },
  { from: 'mangalore', to: 'moodbidri', distance: 35, travelTime: 45, roadType: 'state', cost: 70 },
  { from: 'mangalore', to: 'sullia', distance: 80, travelTime: 120, roadType: 'state', cost: 160 },
  { from: 'mangalore', to: 'karwar', distance: 180, travelTime: 300, roadType: 'highway', cost: 360 },
  
  // Udupi connections
  { from: 'udupi', to: 'kundapur', distance: 35, travelTime: 45, roadType: 'highway', cost: 70 },
  { from: 'udupi', to: 'karkala', distance: 40, travelTime: 55, roadType: 'state', cost: 80 },
  { from: 'udupi', to: 'manipal', distance: 8, travelTime: 15, roadType: 'district', cost: 20 },
  { from: 'udupi', to: 'brahmavar', distance: 15, travelTime: 20, roadType: 'district', cost: 30 },
  
  // Gulbarga connections
  { from: 'gulbarga', to: 'bidar', distance: 120, travelTime: 150, roadType: 'highway', cost: 240 },
  { from: 'gulbarga', to: 'raichur', distance: 110, travelTime: 140, roadType: 'state', cost: 220 },
  { from: 'gulbarga', to: 'yadgir', distance: 80, travelTime: 100, roadType: 'state', cost: 160 },
  { from: 'gulbarga', to: 'afzalpur', distance: 40, travelTime: 50, roadType: 'state', cost: 80 },
  { from: 'gulbarga', to: 'aland', distance: 60, travelTime: 75, roadType: 'state', cost: 120 },
  { from: 'gulbarga', to: 'chincholi', distance: 70, travelTime: 90, roadType: 'state', cost: 140 },
  { from: 'gulbarga', to: 'sedam', distance: 50, travelTime: 65, roadType: 'state', cost: 100 },
  
  // Bidar connections
  { from: 'bidar', to: 'basavakalyan', distance: 25, travelTime: 35, roadType: 'state', cost: 50 },
  { from: 'bidar', to: 'bhalki', distance: 35, travelTime: 45, roadType: 'state', cost: 70 },
  { from: 'bidar', to: 'humnabad', distance: 40, travelTime: 50, roadType: 'state', cost: 80 },
  { from: 'bidar', to: 'aurad', distance: 50, travelTime: 65, roadType: 'state', cost: 100 },
  { from: 'aurad', to: 'bhalki', distance: 40, travelTime: 54, roadType: 'state', cost: 80 },
  
  // Bellary connections
  { from: 'bellary', to: 'hospet', distance: 12, travelTime: 20, roadType: 'state', cost: 25 },
  { from: 'bellary', to: 'sandur', distance: 25, travelTime: 35, roadType: 'state', cost: 50 },
  { from: 'bellary', to: 'kudligi', distance: 40, travelTime: 55, roadType: 'state', cost: 80 },
  { from: 'bellary', to: 'siraguppa', distance: 45, travelTime: 60, roadType: 'state', cost: 90 },
  { from: 'bellary', to: 'hadagalli', distance: 30, travelTime: 40, roadType: 'district', cost: 60 },
  
  // Davanagere connections
  { from: 'davanagere', to: 'shimoga', distance: 75, travelTime: 100, roadType: 'state', cost: 150 },
  { from: 'davanagere', to: 'chitradurga', distance: 60, travelTime: 80, roadType: 'state', cost: 120 },
  { from: 'davanagere', to: 'harihara', distance: 15, travelTime: 20, roadType: 'state', cost: 30 },
  { from: 'davanagere', to: 'channagiri', distance: 25, travelTime: 35, roadType: 'district', cost: 50 },
  { from: 'davanagere', to: 'honnali', distance: 35, travelTime: 45, roadType: 'district', cost: 70 },
  
  // Shimoga connections
  { from: 'shimoga', to: 'bhadravati', distance: 25, travelTime: 35, roadType: 'state', cost: 50 },
  { from: 'shimoga', to: 'sagar', distance: 45, travelTime: 60, roadType: 'state', cost: 90 },
  { from: 'shimoga', to: 'thirthahalli', distance: 40, travelTime: 55, roadType: 'state', cost: 80 },
  { from: 'shimoga', to: 'shikaripura', distance: 35, travelTime: 45, roadType: 'state', cost: 70 },
  { from: 'shimoga', to: 'hosanagar', distance: 30, travelTime: 40, roadType: 'district', cost: 60 },
  
  // Hassan connections
  { from: 'hassan', to: 'belur', distance: 35, travelTime: 45, roadType: 'state', cost: 70 },
  { from: 'hassan', to: 'halebidu', distance: 30, travelTime: 40, roadType: 'district', cost: 60 },
  { from: 'hassan', to: 'sakleshpur', distance: 45, travelTime: 60, roadType: 'state', cost: 90 },
  { from: 'hassan', to: 'alur', distance: 10, travelTime: 15, roadType: 'rural', cost: 20 },
  { from: 'hassan', to: 'gorur', distance: 14, travelTime: 20, roadType: 'rural', cost: 28 },
  { from: 'hassan', to: 'arkalgud', distance: 30, travelTime: 40, roadType: 'state', cost: 60 },
  { from: 'hassan', to: 'channarayapatna', distance: 33, travelTime: 40, roadType: 'state', cost: 66 },
  { from: 'hassan', to: 'arsikere', distance: 44, travelTime: 50, roadType: 'highway', cost: 88 },
  { from: 'hassan', to: 'shravanabelagola', distance: 45, travelTime: 50, roadType: 'state', cost: 90 },
  { from: 'hassan', to: 'banavar', distance: 51, travelTime: 60, roadType: 'state', cost: 102 },
  { from: 'hassan', to: 'krishnarajpet', distance: 54, travelTime: 60, roadType: 'state', cost: 108 },
  { from: 'hassan', to: 'tiptur', distance: 54, travelTime: 60, roadType: 'state', cost: 108 },
  { from: 'hassan', to: 'kadur', distance: 67, travelTime: 70, roadType: 'state', cost: 134 },
  { from: 'hassan', to: 'turuvekere', distance: 67, travelTime: 70, roadType: 'state', cost: 134 },
  { from: 'hassan', to: 'melukote', distance: 69, travelTime: 75, roadType: 'state', cost: 138 },
  { from: 'hassan', to: 'belluru', distance: 70, travelTime: 75, roadType: 'state', cost: 140 },
  
  // Chitradurga connections
  { from: 'chitradurga', to: 'hiriyur', distance: 40, travelTime: 50, roadType: 'state', cost: 80 },
  { from: 'chitradurga', to: 'challakere', distance: 25, travelTime: 35, roadType: 'state', cost: 50 },
  { from: 'chitradurga', to: 'hosadurga', distance: 35, travelTime: 45, roadType: 'state', cost: 70 },
  { from: 'chitradurga', to: 'molakalmuru', distance: 50, travelTime: 65, roadType: 'state', cost: 100 },
  
  // Mandya connections
  { from: 'mandya', to: 'maddur', distance: 25, travelTime: 35, roadType: 'state', cost: 50 },
  { from: 'mandya', to: 'srirangapatna', distance: 20, travelTime: 25, roadType: 'state', cost: 40 },
  { from: 'mandya', to: 'pandavapura', distance: 30, travelTime: 40, roadType: 'district', cost: 60 },
  { from: 'mandya', to: 'nagamangala', distance: 35, travelTime: 45, roadType: 'state', cost: 70 },
  { from: 'mandya', to: 'malavalli', distance: 40, travelTime: 50, roadType: 'state', cost: 80 },
  
  // Kolar connections
  { from: 'kolar', to: 'kgf', distance: 30, travelTime: 40, roadType: 'state', cost: 60 },
  { from: 'kolar', to: 'bangarpet', distance: 25, travelTime: 35, roadType: 'state', cost: 50 },
  { from: 'kolar', to: 'malur', distance: 35, travelTime: 45, roadType: 'state', cost: 70 },
  { from: 'kolar', to: 'mulbagal', distance: 45, travelTime: 60, roadType: 'state', cost: 90 },
  { from: 'kolar', to: 'srinivaspur', distance: 40, travelTime: 50, roadType: 'state', cost: 80 },
  
  // Raichur connections
  { from: 'raichur', to: 'manvi', distance: 45, travelTime: 60, roadType: 'state', cost: 90 },
  { from: 'raichur', to: 'sindhanur', distance: 60, travelTime: 75, roadType: 'state', cost: 120 },
  { from: 'raichur', to: 'lingasugur', distance: 40, travelTime: 50, roadType: 'state', cost: 80 },
  { from: 'raichur', to: 'devadurga', distance: 50, travelTime: 65, roadType: 'state', cost: 100 },
  
  // Bijapur connections
  { from: 'bijapur', to: 'indi', distance: 60, travelTime: 75, roadType: 'state', cost: 120 },
  { from: 'bijapur', to: 'sindgi', distance: 45, travelTime: 60, roadType: 'state', cost: 90 },
  { from: 'bijapur', to: 'basavana_bagewadi', distance: 35, travelTime: 45, roadType: 'state', cost: 70 },
  { from: 'bijapur', to: 'muddebihal', distance: 50, travelTime: 65, roadType: 'state', cost: 100 },
  
  // Bagalkot connections
  { from: 'bagalkot', to: 'jamkhandi', distance: 40, travelTime: 50, roadType: 'state', cost: 80 },
  { from: 'bagalkot', to: 'mudhol', distance: 25, travelTime: 35, roadType: 'state', cost: 50 },
  { from: 'bagalkot', to: 'badami', distance: 30, travelTime: 40, roadType: 'state', cost: 60 },
  { from: 'bagalkot', to: 'bilagi', distance: 20, travelTime: 25, roadType: 'district', cost: 40 },
  
  // Koppal connections
  { from: 'koppal', to: 'gangavathi', distance: 25, travelTime: 35, roadType: 'state', cost: 50 },
  { from: 'koppal', to: 'kushtagi', distance: 45, travelTime: 60, roadType: 'state', cost: 90 },
  { from: 'koppal', to: 'yelburga', distance: 35, travelTime: 45, roadType: 'state', cost: 70 },
  
  // Gadag connections
  { from: 'gadag', to: 'ron', distance: 30, travelTime: 40, roadType: 'state', cost: 60 },
  { from: 'gadag', to: 'shirhatti', distance: 25, travelTime: 35, roadType: 'district', cost: 50 },
  { from: 'gadag', to: 'mundargi', distance: 35, travelTime: 45, roadType: 'state', cost: 70 },
  { from: 'gadag', to: 'nargund', distance: 40, travelTime: 50, roadType: 'state', cost: 80 },
  { from: 'gadag', to: 'lakshmeshwar', distance: 45, travelTime: 60, roadType: 'state', cost: 90 },
  
  // Yadgir connections
  { from: 'yadgir', to: 'shahapur', distance: 25, travelTime: 35, roadType: 'state', cost: 50 },
  { from: 'yadgir', to: 'surpur', distance: 30, travelTime: 40, roadType: 'state', cost: 60 },
  { from: 'yadgir', to: 'shorapur', distance: 35, travelTime: 45, roadType: 'state', cost: 70 },
  
  // Chikmagalur connections
  { from: 'chikmagalur', to: 'kadur', distance: 35, travelTime: 45, roadType: 'state', cost: 70 },
  { from: 'chikmagalur', to: 'tarikere', distance: 40, travelTime: 50, roadType: 'state', cost: 80 },
  { from: 'chikmagalur', to: 'koppa', distance: 50, travelTime: 70, roadType: 'state', cost: 100 },
  { from: 'chikmagalur', to: 'mudigere', distance: 25, travelTime: 35, roadType: 'state', cost: 50 },
  { from: 'chikmagalur', to: 'kalasa', distance: 60, travelTime: 90, roadType: 'district', cost: 120 },
  
  // Chikballapur connections
  { from: 'chikballapur', to: 'chintamani', distance: 35, travelTime: 45, roadType: 'state', cost: 70 },
  { from: 'chikballapur', to: 'sidlaghatta', distance: 25, travelTime: 35, roadType: 'state', cost: 50 },
  { from: 'chikballapur', to: 'bagepalli', distance: 40, travelTime: 50, roadType: 'state', cost: 80 },
  { from: 'chikballapur', to: 'gouribidanur', distance: 30, travelTime: 40, roadType: 'state', cost: 60 },
  
  // Chamarajanagar connections
  { from: 'chamarajanagar', to: 'kollegal', distance: 35, travelTime: 45, roadType: 'state', cost: 70 },
  { from: 'chamarajanagar', to: 'hanur', distance: 25, travelTime: 35, roadType: 'state', cost: 50 },
  { from: 'chamarajanagar', to: 'yelandur', distance: 40, travelTime: 50, roadType: 'state', cost: 80 },
  { from: 'chamarajanagar', to: 'gundlupet', distance: 30, travelTime: 40, roadType: 'state', cost: 60 },
  
  // Kodagu connections
  { from: 'kodagu', to: 'virajpet', distance: 30, travelTime: 45, roadType: 'state', cost: 60 },
  { from: 'kodagu', to: 'somwarpet', distance: 25, travelTime: 35, roadType: 'state', cost: 50 },
  { from: 'kodagu', to: 'kushalnagar', distance: 35, travelTime: 50, roadType: 'state', cost: 70 },
  { from: 'kodagu', to: 'gonikoppal', distance: 40, travelTime: 55, roadType: 'district', cost: 80 },
  { from: 'kodagu', to: 'ponnampet', distance: 45, travelTime: 60, roadType: 'district', cost: 90 },
  
  // Karwar connections
  { from: 'karwar', to: 'ankola', distance: 35, travelTime: 45, roadType: 'highway', cost: 70 },
  { from: 'karwar', to: 'kumta', distance: 50, travelTime: 65, roadType: 'highway', cost: 100 },
  { from: 'karwar', to: 'honavar', distance: 70, travelTime: 90, roadType: 'highway', cost: 140 },
  { from: 'karwar', to: 'bhatkal', distance: 100, travelTime: 130, roadType: 'highway', cost: 200 },
  { from: 'karwar', to: 'dandeli', distance: 25, travelTime: 35, roadType: 'state', cost: 50 },
  
  // Sirsi connections
  { from: 'sirsi', to: 'yellapur', distance: 40, travelTime: 55, roadType: 'state', cost: 80 },
  { from: 'sirsi', to: 'haliyal', distance: 50, travelTime: 70, roadType: 'state', cost: 100 },
  { from: 'sirsi', to: 'mundgod', distance: 35, travelTime: 45, roadType: 'state', cost: 70 },
  
  // Cross-regional connections
  { from: 'bangalore', to: 'hubli', distance: 410, travelTime: 480, roadType: 'highway', cost: 820 },
  { from: 'bangalore', to: 'mangalore', distance: 350, travelTime: 420, roadType: 'highway', cost: 700 },
  { from: 'bangalore', to: 'gulbarga', distance: 520, travelTime: 600, roadType: 'highway', cost: 1040 },
  { from: 'bangalore', to: 'bellary', distance: 310, travelTime: 360, roadType: 'highway', cost: 620 },
  { from: 'bangalore', to: 'bijapur', distance: 530, travelTime: 630, roadType: 'highway', cost: 1060 },
  { from: 'bangalore', to: 'shimoga', distance: 280, travelTime: 360, roadType: 'state', cost: 560 },
  { from: 'bangalore', to: 'chikmagalur', distance: 245, travelTime: 300, roadType: 'state', cost: 490 },
  
  { from: 'mysore', to: 'mangalore', distance: 240, travelTime: 300, roadType: 'state', cost: 480 },
  { from: 'mysore', to: 'hubli', distance: 290, travelTime: 360, roadType: 'state', cost: 580 },
  { from: 'mysore', to: 'shimoga', distance: 200, travelTime: 240, roadType: 'state', cost: 400 },
  
  { from: 'hubli', to: 'gulbarga', distance: 200, travelTime: 240, roadType: 'state', cost: 400 },
  { from: 'hubli', to: 'bijapur', distance: 120, travelTime: 150, roadType: 'state', cost: 240 },
  { from: 'hubli', to: 'bellary', distance: 160, travelTime: 200, roadType: 'state', cost: 320 },
  
  { from: 'mangalore', to: 'shimoga', distance: 140, travelTime: 180, roadType: 'state', cost: 280 },
  { from: 'mangalore', to: 'chikmagalur', distance: 120, travelTime: 150, roadType: 'state', cost: 240 },
  
  { from: 'gulbarga', to: 'bellary', distance: 150, travelTime: 180, roadType: 'state', cost: 300 },
  { from: 'gulbarga', to: 'bijapur', distance: 130, travelTime: 160, roadType: 'state', cost: 260 },
  
  { from: 'bellary', to: 'chitradurga', distance: 160, travelTime: 200, roadType: 'state', cost: 320 },
  { from: 'bellary', to: 'davanagere', distance: 120, travelTime: 150, roadType: 'state', cost: 240 },
  
  // Additional satellite connections around major cities
  { from: 'nelamangala', to: 'tumkur', distance: 45, travelTime: 55, roadType: 'state', cost: 90 },
  { from: 'nelamangala', to: 'magadi', distance: 35, travelTime: 45, roadType: 'district', cost: 70 },
  { from: 'ramanagara', to: 'channapatna', distance: 25, travelTime: 30, roadType: 'state', cost: 50 },
  { from: 'ramanagara', to: 'kanakapura', distance: 30, travelTime: 40, roadType: 'state', cost: 60 },
  { from: 'channapatna', to: 'maddur', distance: 35, travelTime: 45, roadType: 'state', cost: 70 },
  
  // More detailed local connections
  { from: 'tiptur', to: 'arsikere', distance: 45, travelTime: 60, roadType: 'state', cost: 90 },
  { from: 'hassan', to: 'chikmagalur', distance: 65, travelTime: 85, roadType: 'state', cost: 130 },
  { from: 'chikmagalur', to: 'shimoga', distance: 85, travelTime: 110, roadType: 'state', cost: 170 },
  { from: 'shimoga', to: 'karwar', distance: 180, travelTime: 270, roadType: 'state', cost: 360 },
  
  // Border and interstate connections
  { from: 'kollegal', to: 'chamarajanagar', distance: 35, travelTime: 45, roadType: 'state', cost: 70 },
  { from: 'gokak', to: 'belgaum', distance: 70, travelTime: 90, roadType: 'state', cost: 140 },
  { from: 'athani', to: 'bijapur', distance: 80, travelTime: 100, roadType: 'state', cost: 160 },
  
  // Coastal highway connections
  { from: 'mangalore', to: 'kundapur', distance: 95, travelTime: 120, roadType: 'highway', cost: 190 },
  { from: 'kundapur', to: 'honavar', distance: 80, travelTime: 100, roadType: 'highway', cost: 160 },
  { from: 'honavar', to: 'kumta', distance: 25, travelTime: 30, roadType: 'highway', cost: 50 },
  { from: 'kumta', to: 'ankola', distance: 20, travelTime: 25, roadType: 'highway', cost: 40 },
  
  // Additional cross connections for better connectivity
  { from: 'davanagere', to: 'bellary', distance: 120, travelTime: 150, roadType: 'state', cost: 240 },
  { from: 'chitradurga', to: 'bellary', distance: 160, travelTime: 200, roadType: 'state', cost: 320 },
  { from: 'hassan', to: 'tumkur', distance: 100, travelTime: 130, roadType: 'state', cost: 200 },
  { from: 'mandya', to: 'ramanagara', distance: 80, travelTime: 100, roadType: 'state', cost: 160 },
  { from: 'kolar', to: 'chikballapur', distance: 45, travelTime: 60, roadType: 'state', cost: 90 },
  
  // More northern Karnataka connections
  { from: 'bijapur', to: 'gulbarga', distance: 130, travelTime: 160, roadType: 'state', cost: 260 },
  { from: 'bagalkot', to: 'bijapur', distance: 90, travelTime: 120, roadType: 'state', cost: 180 },
  { from: 'gadag', to: 'bagalkot', distance: 70, travelTime: 90, roadType: 'state', cost: 140 },
  { from: 'koppal', to: 'gadag', distance: 80, travelTime: 100, roadType: 'state', cost: 160 },
  { from: 'raichur', to: 'koppal', distance: 90, travelTime: 120, roadType: 'state', cost: 180 },
  { from: 'yadgir', to: 'raichur', distance: 70, travelTime: 90, roadType: 'state', cost: 140 },
  { from: 'bidar', to: 'yadgir', distance: 100, travelTime: 130, roadType: 'state', cost: 200 }
];

// Create bidirectional connections
export const allConnections: CityConnection[] = [
  ...cityConnections,
  ...cityConnections.map(conn => ({
    from: conn.to,
    to: conn.from,
    distance: conn.distance,
    travelTime: conn.travelTime,
    roadType: conn.roadType,
    cost: conn.cost
  }))
];