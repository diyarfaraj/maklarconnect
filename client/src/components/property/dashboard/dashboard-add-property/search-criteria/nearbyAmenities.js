import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBreadSlice,
  faCoffee,
  faUtensils,
  faShoppingBasket,
  faTree,
  faSchool,
  faUniversity,
  faBabyCarriage,
  faDumbbell,
  faCut,
  faTshirt,
  faShip,
  faPlay,
  faKiosk,
  faSpa,
  faScissors,
  faBurger,
  faFutbol,
  faBasketballBall,
  faBus,
  faStore,
  faGlassCheers,
  faCapsules,
  faGraduationCap,
  faFerry,
} from "@fortawesome/free-solid-svg-icons";

const NearbyAmenities = ({ propertyDetails, setPropertyDetails }) => {
  // Define the amenities with their corresponding icons and Swedish labels
  const amenitiesIcons = {
    bakery: faBreadSlice,
    cafe: faCoffee,
    deli: faUtensils,
    grocery: faShoppingBasket,
    park: faTree,
    preschool: faBabyCarriage,
    school: faSchool,
    college: faGraduationCap,
    university: faGraduationCap,
    gym: faDumbbell,
    hairdresser: faCut,
    laundry: faTshirt,
    marina: faShip,
    playground: faPlay,
    kiosk: faKiosk,
    spa: faSpa,
    salon: faScissors,
    fastFood: faBurger,
    sportsField: faFutbol,
    sportsHall: faBasketballBall,
    boatClub: faShip,
    busStation: faBus,
    ferryTerminal: faFerry,
    restaurant: faUtensils,
    convenienceStore: faStore,
    pub: faGlassCheers,
    pharmacy: faCapsules,
    // Add more as needed
  };

  const amenitiesLabels = {
    bakery: "Bageri",
    cafe: "Café",
    deli: "Deli",
    grocery: "Matbutik",
    park: "Park",
    preschool: "Förskola",
    school: "Skola",
    college: "Högskola",
    university: "Universitet",
    gym: "Gym",
    hairdresser: "Frisör",
    laundry: "Kemtvätt",
    marina: "Marina",
    playground: "Lekplats",
    kiosk: "Kiosk",
    spa: "Spa",
    salon: "Salong",
    fastFood: "Snabbmat",
    sportsField: "Idrottsplats",
    sportsHall: "Sporthall",
    boatClub: "Båtklubb",
    busStation: "Busstation",
    ferryTerminal: "Färjeterminal",
    restaurant: "Restaurang",
    convenienceStore: "Närbutik",
    pub: "Pub",
    pharmacy: "Apotek",
    // Add more translations as needed
  };

  const toggleAmenity = (amenity) => {
    setPropertyDetails({
      ...propertyDetails,
      amenities: {
        ...propertyDetails.amenities,
        [amenity]: !propertyDetails.amenities[amenity],
      },
    });
  };

  return (
    <div className="amenities-container">
      {Object.keys(amenitiesLabels).map((amenity) => (
        <button
          key={amenity}
          className={`amenity ${
            propertyDetails.amenities[amenity] ? "selected" : ""
          }`}
          onClick={() => toggleAmenity(amenity)}
        >
          <FontAwesomeIcon icon={amenitiesIcons[amenity]} />
          <span>{amenitiesLabels[amenity]}</span>
        </button>
      ))}
      {/* Add styling and functionality as needed */}
    </div>
  );
};

export default NearbyAmenities;

// Add CSS styles for .amenities-container and .amenity
