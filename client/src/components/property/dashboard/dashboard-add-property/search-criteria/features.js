import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSwimmingPool,
  faTree,
  faParking,
  faDumbbell,
  faFireAlt,
  faInternet,
  faFan,
  faCouch,
  faDog,
  faBell,
  faShieldAlt,
  faWater,
  faMountain,
  faCity,
  faFish,
  faLeaf,
  faPark,
  faRiver,
  faIslandTropical,
  faSun,
  faMoonStars,
  faGolfBall,
  faSkiingNordic,
  faAnchor,
  faSwimmer,
  faFlowerTulip,
  faCourthouse,
  faRoad,
  faEye,
  faArrowUp,
  faComputer,
} from "@fortawesome/free-solid-svg-icons";

const FeatureList = ({ propertyDetails, setPropertyDetails }) => {
  const featureIcons = {
    balcony: faSwimmingPool,
    parking: faParking,
    pool: faSwimmingPool,
    garden: faTree,
    garage: faParking,
    gym: faDumbbell,
    sauna: faFireAlt,
    fireplace: faFireAlt,
    elevator: faArrowUp,
    internet: faComputer,
    airConditioning: faFan,
    heating: faFireAlt,
    furnished: faCouch,
    petFriendly: faDog,
    alarm: faBell,
    security: faShieldAlt,
    seaView: faWater,
    mountainView: faMountain,
    cityView: faCity,
    lakeView: faFish,
    forestView: faLeaf,
    parkView: faPark,
    riverView: faRiver,
    islandView: faIslandTropical,
    sunsetView: faSun,
    sunriseView: faMoonStars,
    golfCourseView: faGolfBall,
    skiSlopeView: faSkiingNordic,
    marinaView: faAnchor,
    poolView: faSwimmer,
    gardenView: faFlowerTulip,
    courtyardView: faCourthouse,
    streetView: faRoad,
    otherView: faEye,
  };

  const featureLabels = {
    balcony: "Balkong",
    parking: "Parkering",
    pool: "Pool",
    garden: "Trädgård",
    garage: "Garage",
    gym: "Gym",
    sauna: "Bastu",
    fireplace: "Öppen spis",
    elevator: "Hiss",
    internet: "Internet",
    airConditioning: "Luftkonditionering",
    heating: "Uppvärmning",
    furnished: "Möblerad",
    petFriendly: "Husdjursvänlig",
    alarm: "Larm",
    security: "Säkerhet",
    seaView: "Havsutsikt",
    mountainView: "Bergsutsikt",
    cityView: "Stadsutsikt",
    lakeView: "Sjöutsikt",
    forestView: "Skogsutsikt",
    parkView: "Parkutsikt",
    riverView: "Flodutsikt",
    islandView: "Öutsikt",
    sunsetView: "Solnedgång",
    sunriseView: "Soluppgång",
    golfCourseView: "Golfbana",
    skiSlopeView: "Skidbacke",
    marinaView: "Marina",
    poolView: "Poolutsikt",
    gardenView: "Trädgårdsutsikt",
    courtyardView: "Gård",
    streetView: "Gatuutsikt",
    otherView: "Annat",
    // ... add more translations as needed
  };

  const toggleFeature = (feature) => {
    setPropertyDetails({
      ...propertyDetails,
      features: {
        ...propertyDetails.features,
        [feature]: !propertyDetails.features[feature],
      },
    });
  };

  return (
    <div className="features-container">
      {Object.keys(propertyDetails.features).map((feature) => (
        <button
          key={feature}
          className={`feature ${
            propertyDetails.features[feature] ? "selected" : ""
          }`}
          onClick={() => toggleFeature(feature)}
        >
          <FontAwesomeIcon icon={featureIcons[feature]} />
          <span style={{ textTransform: "capitalize" }}>
            {featureLabels[feature]}
          </span>
        </button>
      ))}
    </div>
  );
};

export default FeatureList;
