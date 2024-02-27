import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import icon from "../../../../../../node_modules/leaflet/dist/images/marker-icon.png";
import iconRetina from "../../../../../../node_modules/leaflet/dist/images/marker-icon-2x.png";
import iconShadow from "../../../../../../node_modules/leaflet/dist/images/marker-shadow.png";

// Fix for default marker icons not found issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: iconRetina,
  iconUrl: icon,
  shadowUrl: iconShadow,
});

const Location = ({
  setPropertyDetails,
  propertyDetails,
  searchTerms,
  onNext,
}) => {
  const [viewport, setViewport] = useState({
    center: [57.72101, 12.9401],
    zoom: 8,
  });
  const inputRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocations, setSelectedLocations] = useState([]); // Use an array to store multiple locations
  const [locationMarker, setLocationMarker] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  const customIcon = new L.Icon({
    iconUrl: icon,
    iconRetinaUrl: iconRetina,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  useEffect(() => {
    if (searchTerm.length >= 3) {
      const search = async () => {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=5&countrycodes=se&q=${encodeURIComponent(
            searchTerm
          )}`
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
    const locationName = suggestion.display_name
      .split(",")
      .slice(0, 2)
      .join(", ");

    setSelectedLocations((prevLocations) => [
      ...prevLocations,
      {
        name: locationName,
        lat: suggestion.lat,
        lon: suggestion.lon,
      },
    ]);

    setPropertyDetails((prevDetails) => ({
      ...prevDetails,
      locations: [...prevDetails.locations, locationName],
    }));

    setSuggestions([]);
    setSearchTerm("");
  };

  useEffect(() => {
    if (searchTerms.length > 0) {
      const lastTerm = searchTerms[searchTerms.length - 1];
      fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          lastTerm
        )}`
      )
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

  useEffect(() => {}, [searchTerms, propertyDetails]);

  const removeSearchTerm = (termToRemove) => {
    // Remove from the selected locations list
    setSelectedLocations((prevLocations) =>
      prevLocations.filter((location) => location.name !== termToRemove)
    );

    // Remove from propertyDetails.locations
    setPropertyDetails((prevDetails) => ({
      ...prevDetails,
      locations: prevDetails.locations.filter(
        (location) => location !== termToRemove
      ),
    }));
  };

  // To display markers for all selected locations
  const DefaultMap = () => {
    const map = useMap();
    selectedLocations.forEach((location) => {
      L.marker([location.lat, location.lon], { icon: customIcon }).addTo(map); // Use customIcon here
    });
    return null;
  };

  return (
    <div className="location-container">
      <h2>Områden</h2>
      <p>Vart letar du boende?</p>
      <input
        type="text"
        ref={inputRef}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Ange gata, stad eller län..."
        className="location-search-input"
      />
      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleSelectSuggestion(suggestion)}>
              {suggestion.display_name.split(",").slice(0, 2).join(", ")}
            </li>
          ))}
        </ul>
      )}
      {/* Display search terms */}
      <div className="search-terms">
        {searchTerms.map((term, index) => (
          <span key={index} className="search-term">
            {term}
            <button
              className="remove-search-suggestion"
              onClick={() => removeSearchTerm(term)}
            >
              x
            </button>
          </span>
        ))}
      </div>

      <MapContainer
        center={viewport.center}
        zoom={viewport.zoom}
        scrollWheelZoom={true}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {locationMarker && <Marker position={locationMarker} />}
        <DefaultMap />
      </MapContainer>
      <div className="next-button-container">
        <button
          className={`next-button ${
            searchTerms.length === 0 ? "btn-secondary" : ""
          }`}
          onClick={onNext}
          disabled={searchTerms.length === 0}
        >
          Nästa
        </button>
      </div>
    </div>
  );
};

export default Location;
