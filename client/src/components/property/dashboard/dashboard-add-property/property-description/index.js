import React, { useState, useEffect } from "react";

const PropertyDescription = ({
  setPropertyDetails,
  propertyDetails,
  onNext,
}) => {
  const [localTitle, setLocalTitle] = useState(propertyDetails.title || "");
  const [localDescription, setLocalDescription] = useState(
    propertyDetails.description || ""
  );

  const handleBlur = () => {
    setPropertyDetails({
      ...propertyDetails,
      title: localTitle,
      description: localDescription,
    });
  };
  return (
    <div className="property-description-container">
      <h2>Beskrivning</h2>
      <p>Berätta om vad du söker</p>
      <div className="input-group">
        <label htmlFor="title">Titel *</label>
        <input
          id="title"
          type="text"
          value={localTitle}
          onChange={(e) => setLocalTitle(e.target.value)}
          placeholder="Namnlös bostadsjakt"
          onBlur={handleBlur}
          required
        />
      </div>
      <div className="input-group">
        <label htmlFor="description">Beskrivning *</label>
        <textarea
          id="description"
          value={localDescription}
          onChange={(e) => setLocalDescription(e.target.value)}
          placeholder="Jag letar efter en bostad..."
          onBlur={handleBlur}
          required
        />
      </div>
      {/* <div className="next-button-container">
        <button
          className={`next-button ${
            !localTitle || !localDescription ? "btn-secondary" : ""
          }`}
          onClick={onNext}
          disabled={!localTitle || !localDescription}
        >
          Nästa
        </button>
      </div> */}

      <style jsx>{`
        .property-description-container {
          padding: 20px;
        }

        .input-group {
          margin-bottom: 20px;
        }

        label {
          display: block;
          margin-bottom: 5px;
        }

        input,
        textarea {
          width: 100%;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }

        textarea {
          height: 100px;
          resize: vertical;
        }

        .next-button-container {
          text-align: right;
          margin-top: 20px;
        }

        .next-button {
          padding: 10px 20px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        .btn-secondary {
          background-color: #6c757d;
        }

        .next-button:disabled {
          background-color: #ccc;
          cursor: default;
        }
      `}</style>
    </div>
  );
};

export default PropertyDescription;
