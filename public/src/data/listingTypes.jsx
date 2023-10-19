import Barn from "airbnb/svg/lisitngTypes/barn";
import BedBreakfast from "airbnb/svg/lisitngTypes/bed-breakfast";
import Boat from "airbnb/svg/lisitngTypes/boat";
import Cabin from "airbnb/svg/lisitngTypes/cabin";
import Campervan from "airbnb/svg/lisitngTypes/campervan";
import CasaParticular from "airbnb/svg/lisitngTypes/casa-particular";
import Castle from "airbnb/svg/lisitngTypes/castle";
import Cave from "airbnb/svg/lisitngTypes/cave";
import Container from "airbnb/svg/lisitngTypes/container";
import CycladicHome from "airbnb/svg/lisitngTypes/cycladic-home";
import Flat from "airbnb/svg/lisitngTypes/flat";
import House from "airbnb/svg/lisitngTypes/house";
import Dammuso from "airbnb/svg/lisitngTypes/dammuso";

export const listingTypes = [
  { name: "All", svgPath: <Dammuso /> },
  { name: "Afterwork", svgPath: <House /> },
  { name: "Birthday", svgPath: <Flat /> },
  { name: "Brunch", svgPath: <Barn /> },
  { name: "Conference", svgPath: <BedBreakfast /> },
  { name: "Cocktail", svgPath: <Boat /> },
  { name: "Wedding", svgPath: <Cabin /> },
  { name: "Project lunch", svgPath: <Campervan /> },
  { name: "Co-working", svgPath: <CasaParticular /> },
  { name: "Press conference", svgPath: <Castle /> },
  { name: "Fashion show", svgPath: <Cave /> },
  { name: "Shooting film", svgPath: <Container /> },
  { name: "Education", svgPath: <CycladicHome /> },
];
