import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'; // Import the circle check icon

const PropertyHorizon = ({ setPropertyDetails, propertyDetails, onNext }) => {
    const options = [
        { label: 'Vill köpa inom det närmasta halvåret', value: 'half-year' },
        { label: 'Vill köpa inom de närmaste året', value: 'one-year' },
        { label: 'Är öppen för att köpa till rätt pris', value: 'two-to-five-years' },
    ];

    const handleSelect = (value) => {
        setPropertyDetails({
            ...propertyDetails,
            purchaseHorizon: value
        });
    };

    return (
        <div className="property-horizon-container">
            <h2>Köphorisont</h2>
            <p>Hitta drömbostaden vid rätt tillfälle</p>
            <div className="purchase-options">
                {options.map(option => (
                    <label key={option.value} className={`purchase-option ${propertyDetails.purchaseHorizon === option.value ? 'selected' : ''}`}>
                        <input
                            type="radio"
                            name="purchaseHorizon"
                            value={option.value}
                            onChange={() => handleSelect(option.value)}
                            checked={propertyDetails.purchaseHorizon === option.value}
                        />
                        {option.label}
                        {propertyDetails.purchaseHorizon === option.value && (
                            <FontAwesomeIcon icon={faCircleCheck} className="horizon-checkmark" />
                        )}
                    </label>
                ))}
            </div>
            <div className="next-button-container">
                <button
                    className={`next-button ${!propertyDetails.purchaseHorizon ? 'btn-secondary' : ''}`}
                    onClick={onNext}
                    disabled={!propertyDetails.purchaseHorizon}
                >
                    Nästa
                </button>
            </div>
        </div>
    );
};

export default PropertyHorizon;
