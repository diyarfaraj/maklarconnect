'use client';
import React, { useState } from "react";
import PropertyDescription from "./property-description";
import UploadMedia from "./upload-media";
import LocationField from "./LocationField";
import DetailsFiled from "./details-field";
import Amenities from "./Amenities";
import Cookies from 'js-cookie';

const AddPropertyTabContent = () => {

  const tabs = [
    { id: 'nav-item1-tab', title: '1. Description', active: true, target: '#nav-item1', controls: 'nav-item1' },
    { id: 'nav-item2-tab', title: '2. Media', active: false, target: '#nav-item2', controls: 'nav-item2' },
    { id: 'nav-item3-tab', title: '3. Location', active: false, target: '#nav-item3', controls: 'nav-item3' },
    { id: 'nav-item4-tab', title: '4. Detail', active: false, target: '#nav-item4', controls: 'nav-item4' },
    { id: 'nav-item5-tab', title: '5. Amenities', active: false, target: '#nav-item5', controls: 'nav-item5' },
  ];

  const token = Cookies.get('mc_auth-token');

  const [propertyDetails, setPropertyDetails] = useState({
    title: "",
    description: "",
    // ... other fields ...
  });

  const handleDetailChange = (detail) => {
    setPropertyDetails(prevDetails => ({
      ...prevDetails,
      ...detail
    }));
  };

  const handleSubmit = async () => {

    if (!token) {
      console.error('No token found, user is not logged in');
      return;
    }

    try {
      const response = await fetch('http://localhost:8747/api/properties/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(propertyDetails),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.text();
      console.log('Property added successfully:', result);
      setPropertyDetails({
        title: "",
        description: "",
        // ... other fields ...
      });
    } catch (error) {
      console.error('There was an error adding the property:', error);
    }
  };

  const Tab = ({ id, title, active, target, controls }) => {
    return (
      <button
        className={`nav-link fw600 ${active ? 'active' : ''}`}
        id={id}
        data-bs-toggle="tab"
        data-bs-target={target}
        type="button"
        role="tab"
        aria-controls={controls}
        aria-selected={active}
      >
        {title}
      </button>
    );
  };

  const TabContent = ({ id, labelId, active, children }) => {
    return (
      <div
        className={`tab-pane fade ${active ? 'show active' : ''}`}
        id={id}
        role="tabpanel"
        aria-labelledby={labelId}
      >
        <div className="ps-widget bgc-white bdrs12 p30 overflow-hidden position-relative">
          {children}
        </div>
      </div>
    );
  };


  return (
    <>
      <nav>
        <div className="nav nav-tabs" id="nav-tab2" role="tablist">
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              id={tab.id}
              title={tab.title}
              active={tab.active}
              target={tab.target}
              controls={tab.controls}
            />
          ))}
        </div>
      </nav>
      {/* End nav tabs */}

      <div className="tab-content" id="nav-tabContent">
        <TabContent id="nav-item1" labelId="nav-item1-tab" active={true}>
          <h4 className="title fz17 mb30">Property Description</h4>
          <PropertyDescription onChange={handleDetailChange} propertyDetails={propertyDetails} />
        </TabContent>
        {/* End tab for Property Description */}

        <TabContent id="nav-item2" labelId="nav-item2-tab" active={false}>
          <UploadMedia />
        </TabContent>
        {/* End tab for Upload photos of your property */}

        <TabContent id="nav-item3" labelId="nav-item3-tab" active={false}>
          <h4 className="title fz17 mb30">Listing Location</h4>
          <LocationField />
        </TabContent>
        {/* End tab for Listing Location */}

        <TabContent id="nav-item4" labelId="nav-item4-tab" active={false}>
          <h4 className="title fz17 mb30">Listing Details</h4>
          <DetailsFiled />
        </TabContent>
        {/* End tab for Listing Details */}

        <TabContent id="nav-item5" labelId="nav-item5-tab" active={false}>
          <h4 className="title fz17 mb30">Select Amenities</h4>
          <div className="row">
            <Amenities />
          </div>
        </TabContent>
        {/* End tab for Select Amenities */}
      </div>
      <div className="text-center mt-4">
        <div className="text-center my-4" style={{ paddingBottom: '20px' }}> {/* Adjust the padding as needed */}
          <button className="btn btn-primary" type="button" style={{ color: 'white' }} onClick={handleSubmit}>
            Lägg till fastighet
          </button>
        </div>
      </div>
    </>
  );
};

export default AddPropertyTabContent;
