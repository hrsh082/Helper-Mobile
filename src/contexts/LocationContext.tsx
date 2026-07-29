import React, { createContext, useContext, useState, ReactNode, useCallback, useMemo } from 'react';

interface Coords {
  lat: number;
  lon: number;
}

interface LocationContextType {
  locationText: string;
  coords: Coords | null;
  setLocation: (text: string, newCoords?: Coords | null) => void;
  clearLocation: () => void;
}

const LocationContext = createContext<LocationContextType | null>(null);

export function LocationProvider({ children }: { children: ReactNode }) {
  const [locationText, setLocationText] = useState<string>('Ahmedabad, Gujarat');
  const [coords, setCoords] = useState<Coords | null>({ lat: 23.0225, lon: 72.5714 });

  const setLocation = useCallback((text: string, newCoords?: Coords | null) => {
    setLocationText(text);
    if (newCoords !== undefined) {
      setCoords(newCoords);
    }
  }, []);

  const clearLocation = useCallback(() => {
    setLocationText('');
    setCoords(null);
  }, []);

  const value = useMemo(
    () => ({
      locationText,
      coords,
      setLocation,
      clearLocation
    }),
    [locationText, coords, setLocation, clearLocation]
  );

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
}

export function useLocationContext() {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocationContext must be used within a LocationProvider');
  }
  return context;
}
