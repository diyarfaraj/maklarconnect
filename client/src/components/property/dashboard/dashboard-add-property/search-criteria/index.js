// pages/SearchCriteria.js
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faBuilding,
  faWarehouse,
  faSeedling,
  faScroll,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import RangeDropdowns from "./range-dropdown";
import FeatureList from "./features";
import NearbyAmenities from "./nearbyAmenities";

const SearchCriteria = ({ setPropertyDetails, propertyDetails, onNext }) => {
  const propertyTypes = [
    { type: "villa", label: "Villa", icon: faHouse },
    { type: "apartment", label: "Lägenhet", icon: faBuilding },
    { type: "townhouse", label: "Radhus", icon: faWarehouse },
    { type: "farm", label: "Gård", icon: faSeedling },
    { type: "plot", label: "Tomt", icon: faScroll },
    { type: "other", label: "Annat", icon: faPlus },
  ];

  const handleSelect = (propertyType) => {
    setPropertyDetails({
      ...propertyDetails,
      propertyType: propertyType,
    });
  };

  const isPropertyTypeSelected = (type) => {
    return propertyDetails && propertyDetails.propertyType === type;
  };

  return (
    <div className="property-type-container">
      <h2>Fastighetstyp</h2>
      <p>Vilken typ av fastighet söker du?</p>
      <div className="property-types">
        {propertyTypes.map((type) => (
          <button
            key={type.type}
            className={`property-type ${
              isPropertyTypeSelected(type.type) ? "selected" : ""
            }`}
            onClick={() => handleSelect(type.type)}
          >
            <FontAwesomeIcon icon={type.icon} size="lg" />
            <span>{type.label}</span>
          </button>
        ))}
      </div>

      <hr />

      <RangeDropdowns
        propertyDetails={propertyDetails}
        setPropertyDetails={setPropertyDetails}
      />

      <hr />
      <h6>Egenskaper</h6>
      <FeatureList
        propertyDetails={propertyDetails}
        setPropertyDetails={setPropertyDetails}
      />
      <hr />
      <h6>I närområdet</h6>
      <NearbyAmenities
        propertyDetails={propertyDetails}
        setPropertyDetails={setPropertyDetails}
      />
      <hr />
      <div className="next-button-container">
        <button
          className={`next-button ${
            !propertyDetails || !propertyDetails.propertyType
              ? "btn-secondary"
              : ""
          }`}
          onClick={onNext}
          disabled={!propertyDetails || !propertyDetails.propertyType}
        >
          Nästa
        </button>
      </div>
    </div>
  );
};

export default SearchCriteria;
