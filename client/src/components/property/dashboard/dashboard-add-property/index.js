"use client";
import React, { useState, useEffect } from "react";
import PropertyDescription from "./property-description";
import UploadMedia from "./upload-media";
import Location from "./LocationField";
import DetailsFiled from "./details-field";
import Amenities from "./Amenities";
import Cookies from "js-cookie";
import ApplicantType from "./applicant-type";
import PropertyHorizon from "./horizon";

const AddPropertyTabContent = () => {
  const [propertyDetails, setPropertyDetails] = useState({
    applicantType: "",
    title: "",
    description: "",
    locations: [],
  });
  const [active, setActive] = useState(0);
  const [searchTerms, setSearchTerms] = useState([]);

  const token = Cookies.get("mc_auth-token");

  const tabs = [
    {
      id: "nav-item1-tab",
      title: "1. Sökande",
      active: true,
      target: "#nav-item1",
      controls: "nav-item1",
    },
    {
      id: "nav-item2-tab",
      title: "2. Köphorizont",
      active: false,
      target: "#nav-item2",
      controls: "nav-item2",
    },
    {
      id: "nav-item3-tab",
      title: "3. Områden",
      active: false,
      target: "#nav-item3",
      controls: "nav-item3",
    },
    {
      id: "nav-item4-tab",
      title: "4. Media",
      active: false,
      target: "#nav-item4",
      controls: "nav-item4",
    },
    {
      id: "nav-item5-tab",
      title: "5. Detail",
      active: false,
      target: "#nav-item5",
      controls: "nav-item5",
    },
    {
      id: "nav-item6-tab",
      title: "6. Amenities",
      active: false,
      target: "#nav-item6",
      controls: "nav-item6",
    },
  ];

  const handleSubmit = async () => {
    console.log(propertyDetails);
    // if (!token) {
    //   console.error('No token found, user is not logged in');
    //   return;
    // }

    // try {
    //   const response = await fetch('http://localhost:8747/api/properties/add', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Authorization': `Bearer ${token}`,
    //     },
    //     body: JSON.stringify(propertyDetails),
    //   });

    //   if (!response.ok) {
    //     throw new Error(`HTTP error! status: ${response.status}`);
    //   }

    //   const result = await response.text();
    //   console.log('Property added successfully:', result);
    //   setPropertyDetails({
    //     title: "",
    //     description: "",
    //     // ... other fields ...
    //   });
    // } catch (error) {
    //   console.error('There was an error adding the property:', error);
    // }
  };

  const nextStep = () => {
    setActive(active + 1 < tabs.length ? active + 1 : active);
  };

  const prevStep = () => {
    setActive((current) => (current > 0 ? current - 1 : current));
  };

  useEffect(() => {
    // Example of how you might synchronize searchTerms with propertyDetails.locations
    setSearchTerms(propertyDetails.locations);
  }, [propertyDetails.locations]);

  const Tab = ({ index, title, setActive }) => {
    return (
      <button
        className={`nav-link fw600 ${active === index ? "active" : ""}`}
        onClick={() => setActive(index)}
        type="button"
        role="tab"
      >
        {title}
      </button>
    );
  };

  const TabContent = ({ id, labelId, active, children }) => {
    return (
      <div
        className={`tab-pane fade ${active ? "show active" : ""}`}
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
              index={index}
              title={tab.title}
              setActive={setActive}
            />
          ))}
        </div>
      </nav>
      {/* End nav tabs */}

      <div className="tab-content" id="nav-tabContent">
        {tabs.map((tab, index) => (
          <TabContent
            key={index}
            id={tab.target.slice(1)} // Remove '#' for matching
            labelId={tab.id}
            active={active === index}
          >
            {index === 0 && (
              <ApplicantType
                setPropertyDetails={setPropertyDetails}
                propertyDetails={propertyDetails}
                onNext={nextStep}
              />
            )}
            {index === 1 && (
              <PropertyHorizon
                setPropertyDetails={setPropertyDetails}
                propertyDetails={propertyDetails}
                onNext={nextStep}
              />
            )}
            {index === 2 && (
              <Location
                setPropertyDetails={setPropertyDetails}
                propertyDetails={propertyDetails}
                searchTerms={searchTerms}
                onNext={nextStep}
              />
            )}

            {index === 3 && <UploadMedia />}
            {index === 4 && <DetailsFiled />}
            {index === 5 && <Amenities />}
          </TabContent>
        ))}
      </div>

      {active === tabs.length - 1 && (
        <div className="text-center mt-4">
          <div className="text-center my-4" style={{ paddingBottom: "20px" }}>
            <button
              className="btn btn-primary"
              type="button"
              style={{ color: "white" }}
              onClick={handleSubmit}
            >
              Lägg till fastighet
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AddPropertyTabContent;
