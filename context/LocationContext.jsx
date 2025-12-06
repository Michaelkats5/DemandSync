import { createContext, useState, useContext } from 'react';
import { locationDatabase, getAllLocationsData } from '../data/locationData';

const LocationContext = createContext();

// Map capitalized location names to lowercase keys
const locationMap = {
  'Plano': 'plano',
  'Addison': 'addison',
  'Uptown': 'uptown',
  'Irving': 'irving',
  'plano': 'plano',
  'addison': 'addison',
  'uptown': 'uptown',
  'irving': 'irving',
  'all': 'all'
};

export const LocationProvider = ({ children }) => {
  const [selectedLocation, setSelectedLocation] = useState('Plano'); // Default to Plano (capitalized)
  
  const getCurrentLocationData = () => {
    if (selectedLocation === 'all') {
      return getAllLocationsData();
    }
    // Convert capitalized name to lowercase key
    const locationKey = locationMap[selectedLocation] || selectedLocation.toLowerCase();
    return locationDatabase[locationKey] || locationDatabase[selectedLocation] || {};
  };
  
  const getLocationKey = () => {
    if (selectedLocation === 'all') return 'all';
    return locationMap[selectedLocation] || selectedLocation.toLowerCase();
  };
  
  return (
    <LocationContext.Provider value={{ 
      selectedLocation, 
      setSelectedLocation, 
      getCurrentLocationData,
      getLocationKey 
    }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => useContext(LocationContext);

