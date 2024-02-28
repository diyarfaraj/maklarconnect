import React from "react";

const RangeDropdowns = ({ propertyDetails, setPropertyDetails }) => {
  const minRoomOptions = [
    { label: "Min", value: "" },
    { label: "1 rum", value: "1" },
    { label: "2 rum", value: "2" },
    { label: "3 rum", value: "3" },
    { label: "4 rum", value: "4" },
    { label: "5 rum", value: "5" },
    { label: "6 rum", value: "6" },
    { label: "7 rum", value: "7" },
    { label: "8 rum", value: "8" },
    { label: "9 rum", value: "9" },
    { label: "10 rum", value: "10" },
  ];

  const maxRoomOptions = [
    { label: "Max", value: "" },
    { label: "1 rum", value: "1" },
    { label: "2 rum", value: "2" },
    { label: "3 rum", value: "3" },
    { label: "4 rum", value: "4" },
    { label: "5 rum", value: "5" },
    { label: "6 rum", value: "6" },
    { label: "7 rum", value: "7" },
    { label: "8 rum", value: "8" },
    { label: "9 rum", value: "9" },
    { label: "10 rum", value: "10" },
  ];
  const minLivingAreaOptions = [
    { label: "Min", value: "" },
    { label: "50 m²", value: "50" },
    { label: "100 m²", value: "100" },
    { label: "150 m²", value: "150" },
    { label: "200 m²", value: "200" },
    { label: "250 m²", value: "250" },
    { label: "300 m²", value: "300" },
    { label: "350 m²", value: "350" },
    { label: "400 m²", value: "400" },
  ];

  const maxLivingAreaOptions = [
    { label: "Max", value: "" },
    { label: "50 m²", value: "50" },
    { label: "100 m²", value: "100" },
    { label: "150 m²", value: "150" },
    { label: "200 m²", value: "200" },
    { label: "250 m²", value: "250" },
    { label: "300 m²", value: "300" },
    { label: "350 m²", value: "350" },
    { label: "400 m²", value: "400" },
  ];

  const minPriceOptions = [
    { label: "Min", value: "" },
    { label: "1 milj kr", value: "1000000" },
    { label: "2 milj kr", value: "2000000" },
    { label: "3 milj kr", value: "3000000" },
    { label: "4 milj kr", value: "4000000" },
    { label: "5 milj kr", value: "5000000" },
    { label: "6 milj kr", value: "6000000" },
    { label: "7 milj kr", value: "7000000" },
    { label: "8 milj kr", value: "8000000" },
    { label: "9 milj kr", value: "9000000" },
    { label: "10 milj kr", value: "10000000" },
  ];

  const maxPriceOptions = [
    { label: "Max", value: "" },
    { label: "1 milj kr", value: "1000000" },
    { label: "2 milj kr", value: "2000000" },
    { label: "3 milj kr", value: "3000000" },
    { label: "4 milj kr", value: "4000000" },
    { label: "5 milj kr", value: "5000000" },
    { label: "6 milj kr", value: "6000000" },
    { label: "7 milj kr", value: "7000000" },
    { label: "8 milj kr", value: "8000000" },
    { label: "9 milj kr", value: "9000000" },
    { label: "10 milj kr", value: "10000000" },
  ];

  const handleSelect = (value, property) => {
    setPropertyDetails({
      ...propertyDetails,
      [property]: value === "Max" ? undefined : value,
    });
  };

  return (
    <div className="range-dropdowns">
      <div className="range-dropdown-group">
        <h6>Rum</h6>
        <Dropdown
          label=""
          options={minRoomOptions}
          value={propertyDetails.minRooms || ""}
          onSelect={(value) => handleSelect(value, "minRooms")}
        />
        <span> - </span>
        <Dropdown
          label=""
          options={maxRoomOptions}
          value={propertyDetails.maxRooms || ""}
          onSelect={(value) => handleSelect(value, "maxRooms")}
        />
      </div>
      <div className="range-dropdown-group">
        <h6>Boarea</h6>

        <Dropdown
          options={minLivingAreaOptions}
          value={propertyDetails.minArea || ""}
          onSelect={(value) => handleSelect(value, "minArea")}
        />
        <span> - </span>
        <Dropdown
          options={maxLivingAreaOptions}
          value={propertyDetails.maxArea || ""}
          onSelect={(value) => handleSelect(value, "maxArea")}
        />
      </div>
      <div className="range-dropdown-group">
        <h6>Pris</h6>
        <Dropdown
          options={minPriceOptions}
          value={propertyDetails.minPrice || ""}
          onSelect={(value) => handleSelect(value, "minPrice")}
        />
        <span> - </span>
        <Dropdown
          options={maxPriceOptions}
          value={propertyDetails.maxPrice || ""}
          onSelect={(value) => handleSelect(value, "maxPrice")}
        />
      </div>
    </div>
  );
};

export default RangeDropdowns;

const Dropdown = ({ options, onSelect, value }) => {
  return (
    <div className="dropdown-container">
      <select value={value} onChange={(e) => onSelect(e.target.value)}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
