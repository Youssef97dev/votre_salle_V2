import Ac from "airbnb/svg/ameneties/ac";
import Bbq from "airbnb/svg/ameneties/bbq";
import Beach from "airbnb/svg/ameneties/beach";
import CarbonMonoxideAlarm from "airbnb/svg/ameneties/carbon-monoxide-alarm";
import FireExt from "airbnb/svg/ameneties/fire-ext";
import FirePit from "airbnb/svg/ameneties/fire-pit";
import FirstAid from "airbnb/svg/ameneties/first-aid";
import Gym from "airbnb/svg/ameneties/gym";
import HotTub from "airbnb/svg/ameneties/hot-tub";
import IndoorFirplace from "airbnb/svg/ameneties/indoor-firplace";
import Kitchen from "airbnb/svg/ameneties/kitchen";
import Lake from "airbnb/svg/ameneties/lake";
import OutdoorDining from "airbnb/svg/ameneties/outdoor-dining";
import OutdoorShower from "airbnb/svg/ameneties/outdoor-shower";
import PaidParking from "airbnb/svg/ameneties/paid-parking";
import Parking from "airbnb/svg/ameneties/parking";
import Patio from "airbnb/svg/ameneties/patio";
import Piano from "airbnb/svg/ameneties/piano";
import Pool from "airbnb/svg/ameneties/pool";
import PoolTable from "airbnb/svg/ameneties/pool-table";
import Ski from "airbnb/svg/ameneties/ski";
import SmokeAlarm from "airbnb/svg/ameneties/smoke-alarm";
import Tv from "airbnb/svg/ameneties/tv";
import WashingMachine from "airbnb/svg/ameneties/washing-machine";
import Wifi from "airbnb/svg/ameneties/wifi";
import Workplace from "airbnb/svg/ameneties/workplace";

// Conference
import {
  BsFillProjectorFill,
  BsHdmi,
  BsBroadcast,
  BsSoundwave,
} from "react-icons/bs";
import {
  PiProjectorScreenBold,
  PiPaintBrush,
  PiMicrophoneBold,
  PiChalkboardSimpleBold,
  PiArmchair,
} from "react-icons/pi";
import {
  MdMediation,
  MdReduceCapacity,
  MdElectricalServices,
  MdDesignServices,
  MdSevereCold,
} from "react-icons/md";
import { SlScreenDesktop } from "react-icons/sl";
import { AiOutlineVideoCamera, AiOutlineControl } from "react-icons/ai";
import { FaHandHoldingWater, FaRegLightbulb, FaDiceD6 } from "react-icons/fa";
import { FaKitchenSet } from "react-icons/fa6";
import { GiOfficeChair } from "react-icons/gi";
import { LiaProjectDiagramSolid } from "react-icons/lia";
import { IoRestaurantOutline } from "react-icons/io5";
import { BiAccessibility } from "react-icons/bi";
import { RiCupLine } from "react-icons/ri";

export const AmenetiesType = [
  {
    type: "basic",
    data: [
      { name: "Wifi", svgPath: <Wifi /> },
      { name: "TV", svgPath: <Tv /> },
      { name: "Kitchen", svgPath: <Kitchen /> },
      { name: "Washing Machine", svgPath: <WashingMachine /> },
      { name: "Free parking on premises", svgPath: <Parking /> },
      { name: "Paid parking on premises", svgPath: <PaidParking /> },
      { name: "Air conditioning", svgPath: <Ac /> },
      { name: "Dedicated workplace", svgPath: <Workplace /> },
      {
        name: "Accessibility",
        svgPath: <BiAccessibility size={35} />,
      },
      {
        name: "WC for men, women and disabled people",
        svgPath: <FaHandHoldingWater size={35} />,
      },
      {
        name: "chairs, tables, benches",
        svgPath: <GiOfficeChair size={35} />,
      },
    ],
  },
  {
    type:"Afterwork",
    data: [
      {name: "Recreation Area" },
      { name: "Lounge Area" },
      { name: "Refreshments" },
      { name: "Workstations" },
      { name: "Fitness Area"},
      { name: "Quiet Zones" },
      { name: "Entertainment System" },
      { name: "Wellness Amenities" },
      { name: "Outdoor Space" },
      { name: "Networking Opportunities" },
    ],
  },
  {
    type:"Birthday",
    data: [
      {name: "Decorations" },
      { name: "Audiovisual Equipment" },
      { name: "Catering Services" },
      { name: "Photography Area" },
      { name: "Cake and Dessert"},
      { name: "Entertainment" },
      { name: "Party Games" },
      { name: "Private Area" },
      { name: "Party Favors" },
      { name: "Host" },
    ],
  },
  {
    type:"Brunch",
    data: [
      {name: "Buffet Stations" },
      { name: "Comfortable Seating" },
      { name: "Entertainment" },
      { name: "Theme or Decor" },
      { name: "Brunch Activities"},
    ],
  },
  {
    type:"Cocktail",
    data: [
      {name: "Ambient Lighting" },
      { name: "Live Entertainment" },
      { name: "Interactive Activities" },
      { name: "Luxurious Decor" },
      { name: "Professional Service Staff"},
    ],
  },
  {
    type:"Project lunch",
    data: [
      {name: "Audiovisual Equipment" },
      { name: "Catering Services" },
      { name: "Breakout Areas" },
      { name: "Facilitator or Moderator" },
      { name: "Comfortable Seating"},
    ],
  },
  {
    type:"Co-working",
    data: [
      {name: "Meeting Rooms" },
      { name: "Community Events" },
      { name: "Shared Resources" },
      { name: "Collaboration Tools" },
      { name: "24/7 Access"},
    ],
  },
  {
    type:"Press conference",
    data: [
      {name: "Media Check-In Area" },
      { name: "Stage" },
      { name: "Audiovisual Equipment" },
      { name: "Media Seating" },
      { name: "Interview Rooms"},
    ],
  },
  {
    type:"Fashion show",
    data: [
      {name: "Runway Setup" },
      { name: "Lighting" },
      { name: "Seating Arrangements" },
      { name: "Backstage Area" },
      { name: "Green Room"},
    ],
  },
  {
    type:"Shooting film",
    data: [
      {name: "Set Design Area" },
      { name: "Soundproofing" },
      { name: "Lighting Equipment" },
      { name: "Equipment Storage" },
      { name: "Green Room"},
    ],
  },
  {
    type:"Education",
    data: [
      {name: "Audiovisual Equipment" },
      { name: "Technology Integration" },
      { name: "Learning Materials" },
      { name: "Breakout Rooms" },
      { name: "Refreshment Areas"},
    ],
  },
  {
    type: "Conference",
    data: [
      {
        name: "Video projector",
        svgPath: <BsFillProjectorFill size={35} />,
      },
      { name: "Screens", svgPath: <PiProjectorScreenBold size={35} /> },
      { name: "Painting", svgPath: <PiPaintBrush size={35} /> },
      { name: "Microphones", svgPath: <PiMicrophoneBold size={35} /> },
      { name: "Video Equipments", svgPath: <MdMediation size={35} /> },
      { name: "Motorized screen", svgPath: <SlScreenDesktop size={35} /> },
      { name: "Video patch bay", svgPath: <AiOutlineVideoCamera size={35} /> },
      { name: "HDMI", svgPath: <BsHdmi size={35} /> },
      {
        name: "Sound Broadcasting Equipment",
        svgPath: <BsBroadcast size={35} />,
      },
      {
        name: "Capacity",
        svgPath: <MdReduceCapacity size={35} />,
      },
      {
        name: "Arrangement",
        svgPath: <LiaProjectDiagramSolid size={35} />,
      },
      {
        name: "Whiteboard or interactive whiteboard",
        svgPath: <PiChalkboardSimpleBold size={35} />,
      },
      {
        name: "Adequate lighting",
        svgPath: <FaRegLightbulb size={35} />,
      },
      {
        name: "Comfortable furniture",
        svgPath: <PiArmchair size={35} />,
      },
      {
        name: "Control system",
        svgPath: <AiOutlineControl size={35} />,
      },
      {
        name: "Sound insulation",
        svgPath: <BsSoundwave size={35} />,
      },
      {
        name: "Electrical outlets",
        svgPath: <MdElectricalServices size={35} />,
      },
      {
        name: "Dining Options",
        svgPath: <IoRestaurantOutline size={35} />,
      },
      {
        name: "Professional decoration",
        svgPath: <MdDesignServices size={35} />,
      },
    ],
  },
  {
    type: "Wedding",
    data: [
      { name: "A stage with sound system", svgPath: <BsSoundwave size={35} /> },
      {
        name: "A bar equipped with a sink and an ice maker",
        svgPath: <FaDiceD6 size={35} />,
      },
      {
        name: "A fully equipped kitchen",
        svgPath: <FaKitchenSet size={35} />,
      },
      { name: "A cold room", svgPath: <MdSevereCold size={35} /> },
      {
        name: "Possibility of having crockery",
        svgPath: <RiCupLine size={35} />,
      },
    ],
  },
  {
    type: "safety",
    data: [
      { name: "Smoke alarm", svgPath: <SmokeAlarm /> },
      { name: "First aid kit", svgPath: <FirstAid /> },
      { name: "Fire extinguisher", svgPath: <FireExt /> },
      { name: "Carbon monoxide alarm", svgPath: <CarbonMonoxideAlarm /> },
    ],
  },
  {
    type: "other",
    data: [],
  },
];
