import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons not found issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const Location = ({ setPropertyDetails, propertyDetails, searchTerms }) => {
  const [viewport, setViewport] = useState({
    center: [57.72101, 12.9401],
    zoom: 8,
  });
  const inputRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocations, setSelectedLocations] = useState([]); // Use an array to store multiple locations
  const [locationMarker, setLocationMarker] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (searchTerm.length >= 3) {
      const search = async () => {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=5&q=${encodeURIComponent(searchTerm)}`
        );
        const data = await response.json();
        setSuggestions(data);
      };

      search();
    } else {
      setSuggestions([]);
    }
  }, [searchTerm]);

  const handleSelectSuggestion = (suggestion) => {
    const locationName = suggestion.display_name.split(',').slice(0, 2).join(', ');

    setSelectedLocations(prevLocations => [
      ...prevLocations,
      {
        name: locationName,
        lat: suggestion.lat,
        lon: suggestion.lon,
      }
    ]);

    setPropertyDetails(prevDetails => ({
      ...prevDetails,
      locations: [...prevDetails.locations, locationName],
    }));

    setSuggestions([]);
    setSearchTerm('');
  };

  useEffect(() => {
    if (searchTerms.length > 0) {
      const lastTerm = searchTerms[searchTerms.length - 1];
      fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(lastTerm)}`)
        .then((response) => response.json())
        .then((data) => {
          if (data && data[0]) {
            const { lat, lon } = data[0];
            setLocationMarker([lat, lon]);
            setViewport({
              center: [lat, lon],
              zoom: 13,
            });
          }
        });
    }
  }, [searchTerms]);

  useEffect(() => {
    console.log('Search terms:', searchTerms);
    console.log('Property details:', propertyDetails);
  }, [searchTerms, propertyDetails]);


  const removeSearchTerm = (termToRemove) => {


    // Remove from the selected locations list
    setSelectedLocations(prevLocations =>
      prevLocations.filter(location => location.name !== termToRemove)
    );

    // Remove from propertyDetails.locations
    setPropertyDetails(prevDetails => ({
      ...prevDetails,
      locations: prevDetails.locations.filter(location => location !== termToRemove),
    }));
  };


  // To display markers for all selected locations
  const DefaultMap = () => {
    const map = useMap();
    selectedLocations.forEach(location => {
      L.marker([location.lat, location.lon]).addTo(map);
    });
    return null;
  };

  return (
    <div className="location-container">
      <input
        type="text"
        ref={inputRef}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}

        placeholder="Enter a city or address"
        className="location-search-input"
      />
      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleSelectSuggestion(suggestion)}>
              {suggestion.display_name.split(',').slice(0, 2).join(', ')}
            </li>
          ))}
        </ul>
      )}
      {/* Display search terms */}
      <div className="search-terms">
        {searchTerms.map((term, index) => (
          <span key={index} className="search-term">
            {term}
            <button className='remove-search-suggestion' onClick={() => removeSearchTerm(term)}>x</button>
          </span>
        ))}
      </div>

      <MapContainer center={viewport.center} zoom={viewport.zoom} scrollWheelZoom={true} style={{ height: '400px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {locationMarker && <Marker position={locationMarker} />}
        <DefaultMap />
      </MapContainer>
      {/* ... Rest of your component */}
    </div>
  );
};

export default Location;
