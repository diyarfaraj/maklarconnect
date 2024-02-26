"use client";
import React, { useState, useEffect } from "react";
import UploadMedia from "./upload-media";
import Location from "./LocationField";
import Cookies from "js-cookie";
import ApplicantType from "./applicant-type";
import PropertyHorizon from "./horizon";
import SearchCriteria from "./search-criteria";
import PropertyDescription from "./property-description";

const AddPropertyTabContent = () => {
  const [propertyDetails, setPropertyDetails] = useState({
    applicantType: "",
    title: "",
    description: "",
    locations: [],
    propertyType: "",
    minPrice: 0,
    maxPrice: 0,
    minArea: 0,
    maxArea: 0,
    minRooms: 0,
    maxRooms: 0,
    description: "",
    title: "",
    features: {
      balcony: false,
      parking: false,
      pool: false,
      garden: false,
      garage: false,
      gym: false,
      sauna: false,
      fireplace: false,
      elevator: false,
      internet: false,
      airConditioning: false,
      heating: false,
      furnished: false,
      petFriendly: false,
      alarm: false,
      security: false,
      seaView: false,
      mountainView: false,
      cityView: false,
      lakeView: false,
      forestView: false,
      parkView: false,
      riverView: false,
      islandView: false,
      sunsetView: false,
      sunriseView: false,
      golfCourseView: false,
      skiSlopeView: false,
      marinaView: false,
      poolView: false,
      gardenView: false,
      courtyardView: false,
      streetView: false,
      otherView: false,
    },
    amenities: {
      bakery: false,
      cafe: false,
      deli: false,
      groceryStore: false,
      park: false,
      preschool: false,
      school: false,
      college: false,
      university: false,
      gym: false,
      outdoorGym: false,
      hairdresser: false,
      dryCleaning: false,
      marina: false,
      playground: false,
      kiosk: false,
      spa: false,
      salon: false,
      fastFood: false,
      sportsField: false,
      sportsHall: false,
      boatClub: false,
      busStation: false,
      ferryTerminal: false,
      restaurant: false,
      convenienceStore: false,
      pub: false,
      pharmacy: false,
    },
  });

  const [active, setActive] = useState(0);
  const [searchTerms, setSearchTerms] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

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
      title: "2. Köphorisont",
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
      title: "4. Sökreterier",
      active: false,
      target: "#nav-item4",
      controls: "nav-item4",
    },
    {
      id: "nav-item4-tab",
      title: "5. Beskrivning",
      active: false,
      target: "#nav-item5",
      controls: "nav-item5",
    },
    // {
    //   id: "nav-item4-tab",
    //   title: "6. Beskrivning",
    //   active: false,
    //   target: "#nav-item6",
    //   controls: "nav-item6",
    // },
  ];

  const handleSubmit = async () => {
    console.log(propertyDetails);

    if (!token) {
      console.error("No token found, user is not logged in");
      return;
    }

    try {
      const response = await fetch("http://localhost:8747/api/properties/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(propertyDetails),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.text();
      console.log("Property added successfully:", result);
      setPropertyDetails({
        applicantType: "",
        title: "",
        description: "",
        locations: [],
        propertyType: "",
        minPrice: 0,
        maxPrice: 0,
        minArea: 0,
        maxArea: 0,
        minRooms: 0,
        maxRooms: 0,
        description: "",
        title: "",
        features: {
          balcony: false,
          parking: false,
          pool: false,
          garden: false,
          garage: false,
          gym: false,
          sauna: false,
          fireplace: false,
          elevator: false,
          internet: false,
          airConditioning: false,
          heating: false,
          furnished: false,
          petFriendly: false,
          alarm: false,
          security: false,
          seaView: false,
          mountainView: false,
          cityView: false,
          lakeView: false,
          forestView: false,
          parkView: false,
          riverView: false,
          islandView: false,
          sunsetView: false,
          sunriseView: false,
          golfCourseView: false,
          skiSlopeView: false,
          marinaView: false,
          poolView: false,
          gardenView: false,
          courtyardView: false,
          streetView: false,
          otherView: false,
        },
        amenities: {
          bakery: false,
          cafe: false,
          deli: false,
          groceryStore: false,
          park: false,
          preschool: false,
          school: false,
          college: false,
          university: false,
          gym: false,
          outdoorGym: false,
          hairdresser: false,
          dryCleaning: false,
          marina: false,
          playground: false,
          kiosk: false,
          spa: false,
          salon: false,
          fastFood: false,
          sportsField: false,
          sportsHall: false,
          boatClub: false,
          busStation: false,
          ferryTerminal: false,
          restaurant: false,
          convenienceStore: false,
          pub: false,
          pharmacy: false,
        },
      });
    } catch (error) {
      console.error("There was an error adding the property:", error);
    }
  };

  const nextStep = () => {
    setActive(active + 1 < tabs.length ? active + 1 : active);
  };

  // const prevStep = () => {
  //   setActive((current) => (current > 0 ? current - 1 : current));
  // };

  useEffect(() => {
    // Example of how you might synchronize searchTerms with propertyDetails.locations
    setSearchTerms(propertyDetails.locations);
  }, [propertyDetails.locations]);

  // useEffect(() => {
  //   // Example of how you might synchronize searchTerms with propertyDetails.locations
  //   setTitle(propertyDetails.locations);
  //   setDescription(propertyDetails.description);
  // }, [propertyDetails.title, propertyDetails.description]);

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

            {index === 3 && (
              <SearchCriteria
                propertyDetails={propertyDetails}
                setPropertyDetails={setPropertyDetails}
                onNext={nextStep}
              />
            )}
            {/* {index === 4 && <UploadMedia />} */}
            {index === 4 && (
              <PropertyDescription
                propertyDetails={propertyDetails}
                setPropertyDetails={setPropertyDetails}
                title={title}
                description={description}
                onNext={nextStep}
              />
            )}
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
