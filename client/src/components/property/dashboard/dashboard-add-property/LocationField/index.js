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

const Location = ({ setPropertyDetails, propertyDetails }) => {
  const [viewport, setViewport] = useState({
    center: [57.72101, 12.9401],
    zoom: 8,
  });
  const inputRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchTerms, setSearchTerms] = useState([]);
  const [locationMarker, setLocationMarker] = useState(null);

  const addSearchTerm = (term) => {
    setSearchTerm((prevValue) => prevValue + term + ' ');
    inputRef.current.focus(); // Set focus back to the input
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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === ' ') {
      e.preventDefault(); // Prevent default space
      if (searchTerm.trim() !== '') {
        setSearchTerms([...searchTerms, searchTerm.trim()]);
        setSearchTerm(''); // Clear the input field
      }
    }
  };

  const removeSearchTerm = (index) => {
    const updatedSearchTerms = [...searchTerms];
    updatedSearchTerms.splice(index, 1);
    setSearchTerms(updatedSearchTerms);
  };

  const DefaultMap = () => {
    const map = useMap();
    map.setView(viewport.center, viewport.zoom);
    return null;
  };

  return (
    <div className="location-container">
      <input
        type="text"
        ref={inputRef}
        value={searchTerm}
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown}
        placeholder="Enter a city or address"
        className="location-search-input"
      />
      {/* Display search terms */}
      <div className="search-terms">
        {searchTerms.map((term, index) => (
          <span key={index} className="search-term">
            {term}
            <button onClick={() => removeSearchTerm(index)}>x</button>
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
