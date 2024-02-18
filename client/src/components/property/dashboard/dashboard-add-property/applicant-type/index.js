'use client';
import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faUser, faUserGraduate, faUserTie, faChild, faUserAlt, faHome } from '@fortawesome/free-solid-svg-icons';

const ApplicantType = ({ setPropertyDetails, propertyDetails, onNext }) => {

    const applicantTypes = [
        { label: 'Familj', icon: faUsers },
        { label: 'Par', icon: faUserTie },
        { label: 'Singel', icon: faUser },
        { label: 'Student', icon: faUserGraduate },
        { label: 'Ensamstående', icon: faHome },
        { label: 'Ungdom', icon: faChild },
        { label: 'Pensionär', icon: faUserAlt },
    ];

    const handleSelect = (applicantType) => {
        setPropertyDetails({
            ...propertyDetails,
            applicantType: applicantType
        });

    };

    return (
        <div className="applicant-type-container">
            <h2>Sökande</h2>
            <p>Vem letar boende?</p>
            <div className="applicant-types">
                {applicantTypes.map((type) => (
                    <button
                        key={type.label}
                        className={`applicant-type ${propertyDetails.applicantType === type.label ? 'selected' : ''}`}
                        onClick={() => handleSelect(type.label)}
                    >
                        <FontAwesomeIcon icon={type.icon} />
                        <span>{type.label}</span>
                    </button>
                ))}
            </div>
            <div className="next-button-container">
                <button className="next-button" onClick={onNext} >Nästa</button>
            </div>
        </div>
    );
};

export default ApplicantType;