export interface CityData {
  id: string;
  name: string;
  lat: number;
  lng: number;
  district: string;
  population?: number;
  type: 'metro' | 'city' | 'town' | 'village';
}

export const karnatakaCities: CityData[] = [
  // Metro Cities
  { id: 'bangalore', name: 'Bangalore', lat: 12.9716, lng: 77.5946, district: 'Bangalore Urban', population: 12618000, type: 'metro' },
  { id: 'mysore', name: 'Mysore', lat: 12.2958, lng: 76.6394, district: 'Mysore', population: 920550, type: 'city' },
  { id: 'hubli', name: 'Hubli', lat: 15.3647, lng: 75.1240, district: 'Dharwad', population: 943857, type: 'city' },
  { id: 'dharwad', name: 'Dharwad', lat: 15.4589, lng: 75.0078, district: 'Dharwad', population: 847031, type: 'city' },
  { id: 'belgaum', name: 'Belgaum', lat: 15.8497, lng: 74.4977, district: 'Belgaum', population: 610350, type: 'city' },
  { id: 'mangalore', name: 'Mangalore', lat: 12.9141, lng: 74.8560, district: 'Dakshina Kannada', population: 623841, type: 'city' },
  { id: 'gulbarga', name: 'Gulbarga', lat: 17.3297, lng: 76.8343, district: 'Gulbarga', population: 543147, type: 'city' },
  { id: 'davanagere', name: 'Davanagere', lat: 14.4644, lng: 75.9218, district: 'Davanagere', population: 435128, type: 'city' },
  { id: 'bellary', name: 'Bellary', lat: 15.1394, lng: 76.9214, district: 'Bellary', population: 410445, type: 'city' },
  { id: 'bijapur', name: 'Bijapur', lat: 16.8302, lng: 75.7100, district: 'Bijapur', population: 327427, type: 'city' },
  
  // Major Cities
  { id: 'shimoga', name: 'Shimoga', lat: 13.9299, lng: 75.5681, district: 'Shimoga', population: 322650, type: 'city' },
  { id: 'tumkur', name: 'Tumkur', lat: 13.3379, lng: 77.1022, district: 'Tumkur', population: 305821, type: 'city' },
  { id: 'raichur', name: 'Raichur', lat: 16.2120, lng: 77.3439, district: 'Raichur', population: 234073, type: 'city' },
  { id: 'bidar', name: 'Bidar', lat: 17.9104, lng: 77.5199, district: 'Bidar', population: 216020, type: 'city' },
  { id: 'hospet', name: 'Hospet', lat: 15.2693, lng: 76.3869, district: 'Bellary', population: 206159, type: 'city' },
  { id: 'gadag', name: 'Gadag', lat: 15.4167, lng: 75.6167, district: 'Gadag', population: 154715, type: 'city' },
  { id: 'udupi', name: 'Udupi', lat: 13.3409, lng: 74.7421, district: 'Udupi', population: 125000, type: 'city' },
  { id: 'karwar', name: 'Karwar', lat: 14.8167, lng: 74.1167, district: 'Uttara Kannada', population: 81000, type: 'city' },
  { id: 'bhadravati', name: 'Bhadravati', lat: 13.8481, lng: 75.7132, district: 'Shimoga', population: 185000, type: 'city' },
  { id: 'mandya', name: 'Mandya', lat: 12.5218, lng: 76.8951, district: 'Mandya', population: 137358, type: 'city' },
  
  // Towns and Important Places
  { id: 'hassan', name: 'Hassan', lat: 13.0033, lng: 76.0955, district: 'Hassan', population: 133436, type: 'city' },
  { id: 'chitradurga', name: 'Chitradurga', lat: 14.2251, lng: 76.3980, district: 'Chitradurga', population: 122587, type: 'city' },
  { id: 'kolar', name: 'Kolar', lat: 13.1358, lng: 78.1294, district: 'Kolar', population: 138000, type: 'city' },
  { id: 'bagalkot', name: 'Bagalkot', lat: 16.1848, lng: 75.6919, district: 'Bagalkot', population: 108000, type: 'city' },
  { id: 'koppal', name: 'Koppal', lat: 15.3500, lng: 76.1547, district: 'Koppal', population: 65000, type: 'town' },
  { id: 'yadgir', name: 'Yadgir', lat: 16.7700, lng: 77.1378, district: 'Yadgir', population: 55000, type: 'town' },
  { id: 'chikmagalur', name: 'Chikmagalur', lat: 13.3161, lng: 75.7720, district: 'Chikmagalur', population: 118000, type: 'city' },
  { id: 'kodagu', name: 'Madikeri', lat: 12.4244, lng: 75.7382, district: 'Kodagu', population: 35000, type: 'town' },
  { id: 'chamarajanagar', name: 'Chamarajanagar', lat: 11.9261, lng: 76.9437, district: 'Chamarajanagar', population: 75000, type: 'town' },
  { id: 'chikballapur', name: 'Chikballapur', lat: 13.4355, lng: 77.7315, district: 'Chikballapur', population: 65000, type: 'town' },
  
  // Bangalore Satellite Cities
  { id: 'nelamangala', name: 'Nelamangala', lat: 13.1022, lng: 77.3906, district: 'Bangalore Rural', population: 85000, type: 'town' },
  { id: 'devanahalli', name: 'Devanahalli', lat: 13.2500, lng: 77.7167, district: 'Bangalore Rural', population: 25000, type: 'town' },
  { id: 'doddaballapur', name: 'Doddaballapur', lat: 13.2167, lng: 77.5333, district: 'Bangalore Rural', population: 75000, type: 'town' },
  { id: 'hoskote', name: 'Hoskote', lat: 13.0667, lng: 77.8000, district: 'Bangalore Rural', population: 55000, type: 'town' },
  { id: 'anekal', name: 'Anekal', lat: 12.7167, lng: 77.6833, district: 'Bangalore Urban', population: 35000, type: 'town' },
  { id: 'ramanagara', name: 'Ramanagara', lat: 12.7167, lng: 77.2833, district: 'Ramanagara', population: 95000, type: 'town' },
  { id: 'channapatna', name: 'Channapatna', lat: 12.6500, lng: 77.2000, district: 'Ramanagara', population: 65000, type: 'town' },
  { id: 'kanakapura', name: 'Kanakapura', lat: 12.5500, lng: 77.4167, district: 'Ramanagara', population: 60000, type: 'town' },
  { id: 'magadi', name: 'Magadi', lat: 12.9667, lng: 77.2333, district: 'Ramanagara', population: 25000, type: 'town' },
  { id: 'bidadi', name: 'Bidadi', lat: 12.8000, lng: 77.3833, district: 'Ramanagara', population: 35000, type: 'town' },
  
  // Mysore Region
  { id: 'srirangapatna', name: 'Srirangapatna', lat: 12.4167, lng: 76.6833, district: 'Mandya', population: 25000, type: 'town' },
  { id: 'krishnarajasagar', name: 'Krishnarajasagar', lat: 12.4333, lng: 76.5667, district: 'Mandya', population: 15000, type: 'town' },
  { id: 'pandavapura', name: 'Pandavapura', lat: 12.6167, lng: 76.6833, district: 'Mandya', population: 20000, type: 'town' },
  { id: 'maddur', name: 'Maddur', lat: 12.5833, lng: 77.0500, district: 'Mandya', population: 35000, type: 'town' },
  { id: 'malavalli', name: 'Malavalli', lat: 12.3833, lng: 77.0667, district: 'Mandya', population: 25000, type: 'town' },
  { id: 'nagamangala', name: 'Nagamangala', lat: 12.8167, lng: 76.7500, district: 'Mandya', population: 30000, type: 'town' },
  { id: 'hunsur', name: 'Hunsur', lat: 12.3000, lng: 76.2833, district: 'Mysore', population: 40000, type: 'town' },
  { id: 'piriyapatna', name: 'Piriyapatna', lat: 12.3333, lng: 76.1000, district: 'Mysore', population: 25000, type: 'town' },
  { id: 'nanjangud', name: 'Nanjangud', lat: 12.1167, lng: 76.6833, district: 'Mysore', population: 50000, type: 'town' },
  { id: 'gundlupet', name: 'Gundlupet', lat: 11.8167, lng: 76.6833, district: 'Chamarajanagar', population: 35000, type: 'town' },
  
  // Hassan Region
  { id: 'belur', name: 'Belur', lat: 13.1667, lng: 75.8667, district: 'Hassan', population: 25000, type: 'town' },
  { id: 'halebidu', name: 'Halebidu', lat: 13.2333, lng: 75.9833, district: 'Hassan', population: 5000, type: 'village' },
  { id: 'arsikere', name: 'Arsikere', lat: 13.3167, lng: 76.2500, district: 'Hassan', population: 65000, type: 'town' },
  { id: 'channarayapatna', name: 'Channarayapatna', lat: 12.9000, lng: 76.3833, district: 'Hassan', population: 35000, type: 'town' },
  { id: 'holenarasipura', name: 'Holenarasipura', lat: 13.1167, lng: 76.1000, district: 'Hassan', population: 30000, type: 'town' },
  { id: 'sakleshpur', name: 'Sakleshpur', lat: 12.9500, lng: 75.7833, district: 'Hassan', population: 25000, type: 'town' },
  
  // Shimoga Region
  { id: 'sagar', name: 'Sagar', lat: 14.1667, lng: 75.0333, district: 'Shimoga', population: 55000, type: 'town' },
  { id: 'sorab', name: 'Sorab', lat: 14.3833, lng: 75.1000, district: 'Shimoga', population: 25000, type: 'town' },
  { id: 'hosanagar', name: 'Hosanagar', lat: 13.8833, lng: 75.4667, district: 'Shimoga', population: 20000, type: 'town' },
  { id: 'thirthahalli', name: 'Thirthahalli', lat: 13.6833, lng: 75.2500, district: 'Shimoga', population: 25000, type: 'town' },
  { id: 'shikaripura', name: 'Shikaripura', lat: 14.2667, lng: 75.3500, district: 'Shimoga', population: 30000, type: 'town' },
  { id: 'channagiri', name: 'Channagiri', lat: 14.0167, lng: 75.9333, district: 'Davanagere', population: 35000, type: 'town' },
  { id: 'honnali', name: 'Honnali', lat: 14.2500, lng: 75.6500, district: 'Davanagere', population: 25000, type: 'town' },
  { id: 'harihara', name: 'Harihara', lat: 14.5167, lng: 75.8000, district: 'Davanagere', population: 75000, type: 'town' },
  { id: 'ranebennur', name: 'Ranebennur', lat: 14.6167, lng: 75.6333, district: 'Haveri', population: 85000, type: 'town' },
  { id: 'haveri', name: 'Haveri', lat: 14.7833, lng: 75.4000, district: 'Haveri', population: 65000, type: 'town' },
  
  // Coastal Region
  { id: 'kundapur', name: 'Kundapur', lat: 13.6167, lng: 74.6833, district: 'Udupi', population: 35000, type: 'town' },
  { id: 'karkala', name: 'Karkala', lat: 13.2167, lng: 74.9833, district: 'Udupi', population: 25000, type: 'town' },
  { id: 'brahmavar', name: 'Brahmavar', lat: 13.4167, lng: 74.7333, district: 'Udupi', population: 15000, type: 'town' },
  { id: 'manipal', name: 'Manipal', lat: 13.3500, lng: 74.7833, district: 'Udupi', population: 30000, type: 'town' },
  { id: 'puttur', name: 'Puttur', lat: 12.7667, lng: 75.2000, district: 'Dakshina Kannada', population: 45000, type: 'town' },
  { id: 'sullia', name: 'Sullia', lat: 12.5667, lng: 75.3833, district: 'Dakshina Kannada', population: 25000, type: 'town' },
  { id: 'bantwal', name: 'Bantwal', lat: 12.8833, lng: 75.0333, district: 'Dakshina Kannada', population: 35000, type: 'town' },
  { id: 'moodbidri', name: 'Moodbidri', lat: 13.0667, lng: 74.9833, district: 'Dakshina Kannada', population: 30000, type: 'town' },
  { id: 'venur', name: 'Venur', lat: 13.1833, lng: 74.9167, district: 'Dakshina Kannada', population: 15000, type: 'town' },
  { id: 'mulki', name: 'Mulki', lat: 13.0833, lng: 74.7833, district: 'Dakshina Kannada', population: 20000, type: 'town' },
  { id: 'surathkal', name: 'Surathkal', lat: 13.0167, lng: 74.7833, district: 'Dakshina Kannada', population: 25000, type: 'town' },
  { id: 'beltangadi', name: 'Beltangadi', lat: 12.8667, lng: 75.2167, district: 'Dakshina Kannada', population: 20000, type: 'town' },
  
  // North Karnataka
  { id: 'sirsi', name: 'Sirsi', lat: 14.6167, lng: 74.8333, district: 'Uttara Kannada', population: 65000, type: 'town' },
  { id: 'kumta', name: 'Kumta', lat: 14.4167, lng: 74.4167, district: 'Uttara Kannada', population: 25000, type: 'town' },
  { id: 'honavar', name: 'Honavar', lat: 14.2833, lng: 74.4500, district: 'Uttara Kannada', population: 30000, type: 'town' },
  { id: 'bhatkal', name: 'Bhatkal', lat: 13.9667, lng: 74.5500, district: 'Uttara Kannada', population: 35000, type: 'town' },
  { id: 'ankola', name: 'Ankola', lat: 14.6667, lng: 74.3000, district: 'Uttara Kannada', population: 20000, type: 'town' },
  { id: 'yellapur', name: 'Yellapur', lat: 14.9667, lng: 74.7167, district: 'Uttara Kannada', population: 25000, type: 'town' },
  { id: 'haliyal', name: 'Haliyal', lat: 15.3167, lng: 74.7667, district: 'Uttara Kannada', population: 20000, type: 'town' },
  { id: 'mundgod', name: 'Mundgod', lat: 14.9667, lng: 75.0333, district: 'Uttara Kannada', population: 15000, type: 'town' },
  { id: 'dandeli', name: 'Dandeli', lat: 15.2667, lng: 74.6167, district: 'Uttara Kannada', population: 25000, type: 'town' },
  
  // Hubli-Dharwad Region
  { id: 'kundgol', name: 'Kundgol', lat: 15.2500, lng: 75.2500, district: 'Dharwad', population: 35000, type: 'town' },
  { id: 'navalgund', name: 'Navalgund', lat: 15.5667, lng: 75.3667, district: 'Dharwad', population: 45000, type: 'town' },
  { id: 'kalghatgi', name: 'Kalghatgi', lat: 15.1833, lng: 75.0500, district: 'Dharwad', population: 25000, type: 'town' },
  { id: 'annigeri', name: 'Annigeri', lat: 15.4167, lng: 75.4333, district: 'Dharwad', population: 30000, type: 'town' },
  { id: 'shiggaon', name: 'Shiggaon', lat: 14.9833, lng: 75.2167, district: 'Haveri', population: 35000, type: 'town' },
  { id: 'savanur', name: 'Savanur', lat: 14.9667, lng: 75.3333, district: 'Haveri', population: 40000, type: 'town' },
  { id: 'byadgi', name: 'Byadgi', lat: 14.6667, lng: 75.4833, district: 'Haveri', population: 25000, type: 'town' },
  { id: 'hangal', name: 'Hangal', lat: 14.7667, lng: 75.1167, district: 'Haveri', population: 20000, type: 'town' },
  
  // Belgaum Region
  { id: 'gokak', name: 'Gokak', lat: 16.1667, lng: 74.8333, district: 'Belgaum', population: 65000, type: 'town' },
  { id: 'athani', name: 'Athani', lat: 16.7333, lng: 75.0667, district: 'Belgaum', population: 35000, type: 'town' },
  { id: 'chikodi', name: 'Chikodi', lat: 16.4333, lng: 74.5833, district: 'Belgaum', population: 45000, type: 'town' },
  { id: 'raibag', name: 'Raibag', lat: 16.4833, lng: 74.7667, district: 'Belgaum', population: 30000, type: 'town' },
  { id: 'hukkeri', name: 'Hukkeri', lat: 16.2333, lng: 74.6167, district: 'Belgaum', population: 25000, type: 'town' },
  { id: 'nippani', name: 'Nippani', lat: 16.4000, lng: 74.3833, district: 'Belgaum', population: 35000, type: 'town' },
  { id: 'bailhongal', name: 'Bailhongal', lat: 15.8167, lng: 74.9833, district: 'Belgaum', population: 40000, type: 'town' },
  { id: 'saundatti', name: 'Saundatti', lat: 15.7667, lng: 75.1167, district: 'Belgaum', population: 30000, type: 'town' },
  { id: 'parasgad', name: 'Parasgad', lat: 15.9167, lng: 74.7333, district: 'Belgaum', population: 20000, type: 'town' },
  { id: 'khanapur', name: 'Khanapur', lat: 15.6333, lng: 74.5000, district: 'Belgaum', population: 25000, type: 'town' },
  
  // Bijapur Region
  { id: 'indi', name: 'Indi', lat: 17.1667, lng: 75.9500, district: 'Bijapur', population: 35000, type: 'town' },
  { id: 'sindgi', name: 'Sindgi', lat: 16.9167, lng: 76.2333, district: 'Bijapur', population: 40000, type: 'town' },
  { id: 'basavana_bagewadi', name: 'Basavana Bagewadi', lat: 16.5833, lng: 75.9667, district: 'Bijapur', population: 30000, type: 'town' },
  { id: 'muddebihal', name: 'Muddebihal', lat: 16.3333, lng: 76.1333, district: 'Bijapur', population: 25000, type: 'town' },
  { id: 'bagalkot_city', name: 'Bagalkot', lat: 16.1848, lng: 75.6919, district: 'Bagalkot', population: 108000, type: 'city' },
  { id: 'jamkhandi', name: 'Jamkhandi', lat: 16.5000, lng: 75.2833, district: 'Bagalkot', population: 55000, type: 'town' },
  { id: 'mudhol', name: 'Mudhol', lat: 16.3333, lng: 75.2833, district: 'Bagalkot', population: 40000, type: 'town' },
  { id: 'bilagi', name: 'Bilagi', lat: 16.3667, lng: 75.6167, district: 'Bagalkot', population: 25000, type: 'town' },
  { id: 'badami', name: 'Badami', lat: 15.9167, lng: 75.6833, district: 'Bagalkot', population: 30000, type: 'town' },
  { id: 'aihole', name: 'Aihole', lat: 15.9500, lng: 75.8167, district: 'Bagalkot', population: 5000, type: 'village' },
  { id: 'pattadakal', name: 'Pattadakal', lat: 15.9500, lng: 75.8167, district: 'Bagalkot', population: 3000, type: 'village' },
  
  // Gulbarga Region
  { id: 'afzalpur', name: 'Afzalpur', lat: 17.2000, lng: 76.3667, district: 'Gulbarga', population: 35000, type: 'town' },
  { id: 'aland', name: 'Aland', lat: 17.5667, lng: 76.5667, district: 'Gulbarga', population: 40000, type: 'town' },
  { id: 'chincholi', name: 'Chincholi', lat: 17.4667, lng: 77.4167, district: 'Gulbarga', population: 25000, type: 'town' },
  { id: 'chitapur', name: 'Chitapur', lat: 17.1167, lng: 77.0833, district: 'Gulbarga', population: 30000, type: 'town' },
  { id: 'jevargi', name: 'Jevargi', lat: 16.7667, lng: 76.7667, district: 'Gulbarga', population: 25000, type: 'town' },
  { id: 'sedam', name: 'Sedam', lat: 17.1833, lng: 77.2833, district: 'Gulbarga', population: 35000, type: 'town' },
  
  // Raichur Region
  { id: 'manvi', name: 'Manvi', lat: 15.9833, lng: 77.0500, district: 'Raichur', population: 40000, type: 'town' },
  { id: 'sindhanur', name: 'Sindhanur', lat: 15.7667, lng: 76.7667, district: 'Raichur', population: 55000, type: 'town' },
  { id: 'lingasugur', name: 'Lingasugur', lat: 16.1500, lng: 76.5167, district: 'Raichur', population: 45000, type: 'town' },
  { id: 'devadurga', name: 'Devadurga', lat: 16.4167, lng: 76.9833, district: 'Raichur', population: 30000, type: 'town' },
  
  // Bellary Region
  { id: 'sandur', name: 'Sandur', lat: 15.1167, lng: 76.5500, district: 'Bellary', population: 35000, type: 'town' },
  { id: 'kudligi', name: 'Kudligi', lat: 14.9167, lng: 76.3833, district: 'Bellary', population: 40000, type: 'town' },
  { id: 'hagaribommanahalli', name: 'Hagaribommanahalli', lat: 14.7667, lng: 76.8167, district: 'Bellary', population: 25000, type: 'town' },
  { id: 'hadagalli', name: 'Hadagalli', lat: 14.9500, lng: 76.7833, district: 'Bellary', population: 20000, type: 'town' },
  { id: 'siraguppa', name: 'Siraguppa', lat: 15.4333, lng: 76.9000, district: 'Bellary', population: 30000, type: 'town' },
  
  // Koppal Region
  { id: 'gangavathi', name: 'Gangavathi', lat: 15.4333, lng: 76.5333, district: 'Koppal', population: 85000, type: 'town' },
  { id: 'kushtagi', name: 'Kushtagi', lat: 15.7667, lng: 76.1833, district: 'Koppal', population: 35000, type: 'town' },
  { id: 'yelburga', name: 'Yelburga', lat: 15.6167, lng: 76.0167, district: 'Koppal', population: 25000, type: 'town' },
  
  // Gadag Region
  { id: 'ron', name: 'Ron', lat: 15.7000, lng: 75.7333, district: 'Gadag', population: 45000, type: 'town' },
  { id: 'shirhatti', name: 'Shirhatti', lat: 15.2333, lng: 75.5833, district: 'Gadag', population: 25000, type: 'town' },
  { id: 'mundargi', name: 'Mundargi', lat: 15.2000, lng: 75.8833, district: 'Gadag', population: 30000, type: 'town' },
  { id: 'nargund', name: 'Nargund', lat: 15.7167, lng: 75.3833, district: 'Gadag', population: 35000, type: 'town' },
  { id: 'lakshmeshwar', name: 'Lakshmeshwar', lat: 15.1333, lng: 75.4667, district: 'Gadag', population: 40000, type: 'town' },
  
  // Bidar Region
  { id: 'aurad', name: 'Aurad', lat: 18.2500, lng: 77.4167, district: 'Bidar', population: 25000, type: 'town' },
  { id: 'bhalki', name: 'Bhalki', lat: 18.0500, lng: 77.2167, district: 'Bidar', population: 35000, type: 'town' },
  { id: 'basavakalyan', name: 'Basavakalyan', lat: 17.8667, lng: 76.9500, district: 'Bidar', population: 55000, type: 'town' },
  { id: 'humnabad', name: 'Humnabad', lat: 17.7500, lng: 77.1167, district: 'Bidar', population: 45000, type: 'town' },
  
  // Yadgir Region
  { id: 'shahapur', name: 'Shahapur', lat: 16.6833, lng: 76.8333, district: 'Yadgir', population: 30000, type: 'town' },
  { id: 'surpur', name: 'Surpur', lat: 16.5167, lng: 77.0833, district: 'Yadgir', population: 25000, type: 'town' },
  { id: 'shorapur', name: 'Shorapur', lat: 16.5167, lng: 76.7500, district: 'Yadgir', population: 35000, type: 'town' },
  
  // Chitradurga Region
  { id: 'hiriyur', name: 'Hiriyur', lat: 14.1000, lng: 76.6167, district: 'Chitradurga', population: 45000, type: 'town' },
  { id: 'challakere', name: 'Challakere', lat: 14.3167, lng: 76.6500, district: 'Chitradurga', population: 35000, type: 'town' },
  { id: 'molakalmuru', name: 'Molakalmuru', lat: 14.7167, lng: 76.7667, district: 'Chitradurga', population: 25000, type: 'town' },
  { id: 'hosadurga', name: 'Hosadurga', lat: 14.2667, lng: 76.2833, district: 'Chitradurga', population: 30000, type: 'town' },
  { id: 'holalkere', name: 'Holalkere', lat: 14.5333, lng: 76.3000, district: 'Chitradurga', population: 20000, type: 'town' },
  
  // Tumkur Region
  { id: 'gubbi', name: 'Gubbi', lat: 13.3167, lng: 76.9167, district: 'Tumkur', population: 35000, type: 'town' },
  { id: 'tiptur', name: 'Tiptur', lat: 13.2667, lng: 76.4833, district: 'Tumkur', population: 65000, type: 'town' },
  { id: 'turuvekere', name: 'Turuvekere', lat: 13.1667, lng: 76.6667, district: 'Tumkur', population: 25000, type: 'town' },
  { id: 'kunigal', name: 'Kunigal', lat: 13.0167, lng: 77.0333, district: 'Tumkur', population: 30000, type: 'town' },
  { id: 'koratagere', name: 'Koratagere', lat: 13.5333, lng: 77.2500, district: 'Tumkur', population: 25000, type: 'town' },
  { id: 'madhugiri', name: 'Madhugiri', lat: 13.6667, lng: 77.2000, district: 'Tumkur', population: 40000, type: 'town' },
  { id: 'pavagada', name: 'Pavagada', lat: 14.1000, lng: 77.2833, district: 'Tumkur', population: 35000, type: 'town' },
  { id: 'sira', name: 'Sira', lat: 13.7500, lng: 76.9000, district: 'Tumkur', population: 45000, type: 'town' },
  
  // Kolar Region
  { id: 'kgf', name: 'KGF', lat: 12.9500, lng: 78.2667, district: 'Kolar', population: 155000, type: 'city' },
  { id: 'robertsonpet', name: 'Robertsonpet', lat: 12.9667, lng: 78.2833, district: 'Kolar', population: 65000, type: 'town' },
  { id: 'bangarpet', name: 'Bangarpet', lat: 12.9833, lng: 78.1667, district: 'Kolar', population: 45000, type: 'town' },
  { id: 'malur', name: 'Malur', lat: 13.0000, lng: 77.9333, district: 'Kolar', population: 35000, type: 'town' },
  { id: 'srinivaspur', name: 'Srinivaspur', lat: 13.3500, lng: 78.2167, district: 'Kolar', population: 30000, type: 'town' },
  { id: 'mulbagal', name: 'Mulbagal', lat: 13.1667, lng: 78.3833, district: 'Kolar', population: 55000, type: 'town' },
  
  // Chikmagalur Region
  { id: 'kadur', name: 'Kadur', lat: 13.5500, lng: 76.0167, district: 'Chikmagalur', population: 35000, type: 'town' },
  { id: 'tarikere', name: 'Tarikere', lat: 13.7167, lng: 75.8167, district: 'Chikmagalur', population: 30000, type: 'town' },
  { id: 'koppa', name: 'Koppa', lat: 13.5333, lng: 75.3500, district: 'Chikmagalur', population: 20000, type: 'town' },
  { id: 'narasimharajapura', name: 'Narasimharajapura', lat: 13.6167, lng: 75.5167, district: 'Chikmagalur', population: 25000, type: 'town' },
  { id: 'mudigere', name: 'Mudigere', lat: 13.1333, lng: 75.6333, district: 'Chikmagalur', population: 30000, type: 'town' },
  { id: 'kalasa', name: 'Kalasa', lat: 13.4167, lng: 75.3000, district: 'Chikmagalur', population: 15000, type: 'town' },
  { id: 'horanadu', name: 'Horanadu', lat: 13.4000, lng: 75.2833, district: 'Chikmagalur', population: 5000, type: 'village' },
  
  // Additional smaller towns and villages
  { id: 'chintamani', name: 'Chintamani', lat: 13.4000, lng: 78.0500, district: 'Chikballapur', population: 65000, type: 'town' },
  { id: 'sidlaghatta', name: 'Sidlaghatta', lat: 13.3833, lng: 77.8667, district: 'Chikballapur', population: 35000, type: 'town' },
  { id: 'bagepalli', name: 'Bagepalli', lat: 13.7833, lng: 77.7833, district: 'Chikballapur', population: 25000, type: 'town' },
  { id: 'gouribidanur', name: 'Gouribidanur', lat: 13.6167, lng: 77.5167, district: 'Chikballapur', population: 30000, type: 'town' },
  { id: 'gudibanda', name: 'Gudibanda', lat: 13.7667, lng: 77.6833, district: 'Chikballapur', population: 20000, type: 'town' },
  { id: 'shidlaghatta', name: 'Shidlaghatta', lat: 13.3833, lng: 77.8667, district: 'Chikballapur', population: 35000, type: 'town' },
  
  // More coastal towns
  { id: 'uppinangadi', name: 'Uppinangadi', lat: 12.9833, lng: 75.1167, district: 'Dakshina Kannada', population: 15000, type: 'town' },
  { id: 'kadaba', name: 'Kadaba', lat: 12.7167, lng: 75.3500, district: 'Dakshina Kannada', population: 12000, type: 'town' },
  { id: 'vittal', name: 'Vittal', lat: 12.8167, lng: 75.2000, district: 'Dakshina Kannada', population: 18000, type: 'town' },
  { id: 'belthangady', name: 'Belthangady', lat: 12.8667, lng: 75.2167, district: 'Dakshina Kannada', population: 20000, type: 'town' },
  { id: 'dharmasthala', name: 'Dharmasthala', lat: 12.9500, lng: 75.3833, district: 'Dakshina Kannada', population: 8000, type: 'village' },
  { id: 'venoor', name: 'Venoor', lat: 13.1833, lng: 74.9167, district: 'Dakshina Kannada', population: 15000, type: 'town' },
  
  // Hill stations and tourist places
  { id: 'coorg_madikeri', name: 'Madikeri', lat: 12.4244, lng: 75.7382, district: 'Kodagu', population: 35000, type: 'town' },
  { id: 'virajpet', name: 'Virajpet', lat: 12.1967, lng: 75.8050, district: 'Kodagu', population: 25000, type: 'town' },
  { id: 'somwarpet', name: 'Somwarpet', lat: 12.5833, lng: 75.8500, district: 'Kodagu', population: 15000, type: 'town' },
  { id: 'kushalnagar', name: 'Kushalnagar', lat: 12.4667, lng: 75.9667, district: 'Kodagu', population: 20000, type: 'town' },
  { id: 'gonikoppal', name: 'Gonikoppal', lat: 12.2167, lng: 75.7833, district: 'Kodagu', population: 12000, type: 'town' },
  { id: 'ponnampet', name: 'Ponnampet', lat: 12.1333, lng: 75.9333, district: 'Kodagu', population: 18000, type: 'town' },
  
  // Hassan Region - Additional towns
  { id: 'alur', name: 'Alur', lat: 13.0833, lng: 76.0333, district: 'Hassan', population: 15000, type: 'town' },
  { id: 'gorur', name: 'Gorur', lat: 13.0500, lng: 76.1833, district: 'Hassan', population: 12000, type: 'town' },
  { id: 'arkalgud', name: 'Arkalgud', lat: 12.7667, lng: 76.3500, district: 'Hassan', population: 28000, type: 'town' },
  { id: 'shravanabelagola', name: 'Shravanabelagola', lat: 12.8589, lng: 76.4864, district: 'Hassan', population: 8000, type: 'town' },
  { id: 'banavar', name: 'Banavar', lat: 12.9167, lng: 76.6833, district: 'Hassan', population: 15000, type: 'town' },
  
  // Mandya Region - Additional towns
  { id: 'krishnarajpet', name: 'Krishnarajpet', lat: 12.6667, lng: 76.4833, district: 'Mandya', population: 45000, type: 'town' },
  { id: 'melukote', name: 'Melukote', lat: 12.6667, lng: 76.6500, district: 'Mandya', population: 8000, type: 'town' },
  { id: 'belluru', name: 'Belluru', lat: 12.9333, lng: 76.7833, district: 'Mandya', population: 12000, type: 'town' },

  // Border towns
  { id: 'kollegal', name: 'Kollegal', lat: 12.1500, lng: 77.1167, district: 'Chamarajanagar', population: 85000, type: 'town' },
  { id: 'hanur', name: 'Hanur', lat: 12.0167, lng: 77.2833, district: 'Chamarajanagar', population: 25000, type: 'town' },
  { id: 'male_mahadeshwara_hills', name: 'Male Mahadeshwara Hills', lat: 12.0833, lng: 77.2667, district: 'Chamarajanagar', population: 5000, type: 'village' },
  { id: 'yelandur', name: 'Yelandur', lat: 12.0500, lng: 76.7167, district: 'Chamarajanagar', population: 20000, type: 'town' }
];