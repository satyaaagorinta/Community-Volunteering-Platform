
import {
  BiSolidHomeHeart
} from "react-icons/bi";

import { PiDogBold,PiFirstAidBold } from "react-icons/pi";
import { FaBuildingNgo,
  FaChildren
 } from "react-icons/fa6";
 import { FaUserGroup } from "react-icons/fa6";
 import { GiLifeSupport } from "react-icons/gi";
 import { BsThreeDots } from "react-icons/bs";
 import { GoLaw } from "react-icons/go";
 import { TbCalendarEvent } from "react-icons/tb";
export const categories = [
  
  {
    img: "assets/events.jpg",
    label: "Events",
    icon: <TbCalendarEvent />,
    description: "This is a community wellfare event",
  },
  {
    img: "assets/Ngo.jpg",
    label: "NGOs",
    icon: <FaBuildingNgo />,
    description: "This is a NGO",
  },
  {
    img: "assets/orphanage1.jpeg",
    label: "Orphanages",
    icon: <FaChildren />,
    description: "This is an Orphanage",
  },
  {
    img: "assets/oldage1.png",
    label: "Old Age Homes",
    icon: <BiSolidHomeHeart />,
    description: "This is a Old Age Home",
  },
  {
    img: "assets/animals.jpg",
    label: "Animal Welfare",
    icon: <PiDogBold />,
    description: "This is an Animal Shelter",
  },
  
  {
    img: "assets/oldage.png",
    label: "Medical Aid and Healthcare",
    icon: <PiFirstAidBold />,
    description: "This property is near a lake!",
  },
  {
    img: "assets/disaster.png",
    label: "Disaster Relief & Emergency Response",
    icon: <GiLifeSupport />,
    description: "This property has skiing activies!",
  },
  {
    img: "assets/island_cat.webp",
    label: "Support Groups",
    icon: <FaUserGroup />,
    description: "This property is on an island!",
  },
  {
      img: "assets/cave_cat.jpg",
      label: "Legal Aid",
      icon: <GoLaw />,
      description: "This property is in a spooky cave!",
    },
  
  
  {
    img: "assets/castle_cat.webp",
    label: "Other",
    icon: <BsThreeDots />,
    description: "This property is an ancient castle!",
  },
  
];



export const facilities = [
  {
    name: "Child Welfare",
    // icon: <PiBathtubFill />,
  },
  {
    name: "Women Empowerment",
  //   icon: <FaPumpSoap />,
  },
  {
    name: "Animal Welfare",
   // icon: <FaShower />,
  },
  {
    name: "Environment",
    //icon: <BiSolidWasher />,
  },
  {
    name: "Education",
    //icon: <BiSolidDryer />,
  },
  {
    name: "Healthcare",
    //icon: <PiCoatHangerFill />,
  },
  {
    name: "Rehabilitation Center",
    //icon: <TbIroning3 />,
  },
  {
    name: "Care Facility",
    //icon: <PiTelevisionFill />,
  },
  {
    name: "Legal Aid",
    //icon: <BsPersonWorkspace />
  },
  {
    name: "Human Rights",
    //icon: <BsSnow />,
  },
  {
    name: "Food Banks",
    //icon: <GiHeatHaze />,
  },
  {
    name: "Youth Empowerment",
    //icon: <GiCctvCamera />,
  },
  {
    name: "Senior citizen Welfare",
    //icon: <FaFireExtinguisher />,
  },
  {
    name: "LGBTQ rights",
    //icon: <BiSolidFirstAid />,
  },
  {
    name: "Rural Development",
    //icon: <BiWifi />,
  },
  {
    name: "Mental Health",
    //icon: <FaKitchenSet />,
  },
  {
    name: "Conservation Efforts",
    //icon: <BiSolidFridge />,
  },
  {
    name: "Fundraising",
    //icon: <MdMicrowave />,
  },
  {
    name: "Social Media Campaign",
    //icon: <GiToaster />,
  },
  {
    name: "Seminar/Workshop",
    //icon: <GiBarbecue />,
  },
  {
    name: "Donation",
    //icon: <FaUmbrellaBeach />,
  },
   {
     name: "Other",
  //   icon: <MdBalcony />,
   },
  
];
// END OF FIRST TRY


// import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
// import {
//   GiBarn,
//   GiBoatFishing,
//   GiCactus,
//   GiCastle,
//   GiCaveEntrance,
//   GiForestCamp,
//   GiIsland,
//   GiWindmill,
// } from "react-icons/gi";
// import {
//   FaSkiing,
//   FaPumpSoap,
//   FaShower,
//   FaFireExtinguisher,
//   FaUmbrellaBeach,
//   FaKey,
// } from "react-icons/fa";
// import { FaHouseUser, FaPeopleRoof, FaKitchenSet } from "react-icons/fa6";
// import {
//   BiSolidWasher,
//   BiSolidDryer,
//   BiSolidFirstAid,
//   BiWifi,
//   BiSolidFridge,
//   BiWorld,
// } from "react-icons/bi";
// import { BsSnow, BsFillDoorOpenFill, BsPersonWorkspace } from "react-icons/bs";
// import { IoDiamond } from "react-icons/io5";
// import { MdOutlineVilla, MdMicrowave, MdBalcony, MdYard, MdPets } from "react-icons/md";
// import {
//   PiBathtubFill,
//   PiCoatHangerFill,
//   PiTelevisionFill,
// } from "react-icons/pi";
// import { TbIroning3 } from "react-icons/tb";
// import {
//   GiHeatHaze,
//   GiCctvCamera,
//   GiBarbecue,
//   GiToaster,
//   GiCampfire,
// } from "react-icons/gi";
// import { AiFillCar } from "react-icons/ai";

// export const categories = [
//   {
//     label: "All",
//     icon: <BiWorld />,
//   },
//   {
//     img: "assets/beach_cat.jpg",
//     label: "Beachfront",
//     icon: <TbBeach />,
//     description: "This property is close to the beach!",
//   },
//   {
//     img: "assets/windmill_cat.webp",
//     label: "Windmills",
//     icon: <GiWindmill />,
//     description: "This property is has windmills!",
//   },
//   {
//     img: "assets/modern_cat.webp",
//     label: "Iconic cities",
//     icon: <MdOutlineVilla />,
//     description: "This property is modern!",
//   },
//   {
//     img: "assets/countryside_cat.webp",
//     label: "Countryside",
//     icon: <TbMountain />,
//     description: "This property is in the countryside!",
//   },
//   {
//     img: "assets/pool_cat.jpg",
//     label: "Amazing Pools",
//     icon: <TbPool />,
//     description: "This is property has a beautiful pool!",
//   },
//   {
//     img: "assets/island_cat.webp",
//     label: "Islands",
//     icon: <GiIsland />,
//     description: "This property is on an island!",
//   },
//   {
//     img: "assets/lake_cat.webp",
//     label: "Lakefront",
//     icon: <GiBoatFishing />,
//     description: "This property is near a lake!",
//   },
//   {
//     img: "assets/skiing_cat.jpg",
//     label: "Ski-in/out",
//     icon: <FaSkiing />,
//     description: "This property has skiing activies!",
//   },
//   {
//     img: "assets/castle_cat.webp",
//     label: "Castles",
//     icon: <GiCastle />,
//     description: "This property is an ancient castle!",
//   },
//   {
//     img: "assets/cave_cat.jpg",
//     label: "Caves",
//     icon: <GiCaveEntrance />,
//     description: "This property is in a spooky cave!",
//   },
//   {
//     img: "assets/camping_cat.jpg",
//     label: "Camping",
//     icon: <GiForestCamp />,
//     description: "This property offers camping activities!",
//   },
//   {
//     img: "assets/arctic_cat.webp",
//     label: "Arctic",
//     icon: <BsSnow />,
//     description: "This property is in arctic environment!",
//   },
//   {
//     img: "assets/desert_cat.webp",
//     label: "Desert",
//     icon: <GiCactus />,
//     description: "This property is in the desert!",
//   },
//   {
//     img: "assets/barn_cat.jpg",
//     label: "Barns",
//     icon: <GiBarn />,
//     description: "This property is in a barn!",
//   },
//   {
//     img: "assets/lux_cat.jpg",
//     label: "Luxury",
//     icon: <IoDiamond />,
//     description: "This property is brand new and luxurious!",
//   },
// ];

// export const types = [
//   {
//     name: "An entire place",
//     description: "Guests have the whole place to themselves",
//     icon: <FaHouseUser />,
//   },
//   {
//     name: "Room(s)",
//     description:
//       "Guests have their own room in a house, plus access to shared places",
//     icon: <BsFillDoorOpenFill />,
//   },
//   {
//     name: "A Shared Room",
//     description:
//       "Guests sleep in a room or common area that maybe shared with you or others",
//     icon: <FaPeopleRoof />,
//   },
// ];

// export const facilities = [
//   {
//     name: "Bath tub",
//     icon: <PiBathtubFill />,
//   },
//   {
//     name: "Personal care products",
//     icon: <FaPumpSoap />,
//   },
//   {
//     name: "Outdoor shower",
//     icon: <FaShower />,
//   },
//   {
//     name: "Washer",
//     icon: <BiSolidWasher />,
//   },
//   {
//     name: "Dryer",
//     icon: <BiSolidDryer />,
//   },
//   {
//     name: "Hangers",
//     icon: <PiCoatHangerFill />,
//   },
//   {
//     name: "Iron",
//     icon: <TbIroning3 />,
//   },
//   {
//     name: "TV",
//     icon: <PiTelevisionFill />,
//   },
//   {
//     name: "Dedicated workspace",
//     icon: <BsPersonWorkspace />
//   },
//   {
//     name: "Air Conditioning",
//     icon: <BsSnow />,
//   },
//   {
//     name: "Heating",
//     icon: <GiHeatHaze />,
//   },
//   {
//     name: "Security cameras",
//     icon: <GiCctvCamera />,
//   },
//   {
//     name: "Fire extinguisher",
//     icon: <FaFireExtinguisher />,
//   },
//   {
//     name: "First Aid",
//     icon: <BiSolidFirstAid />,
//   },
//   {
//     name: "Wifi",
//     icon: <BiWifi />,
//   },
//   {
//     name: "Cooking set",
//     icon: <FaKitchenSet />,
//   },
//   {
//     name: "Refrigerator",
//     icon: <BiSolidFridge />,
//   },
//   {
//     name: "Microwave",
//     icon: <MdMicrowave />,
//   },
//   {
//     name: "Stove",
//     icon: <GiToaster />,
//   },
//   {
//     name: "Barbecue grill",
//     icon: <GiBarbecue />,
//   },
//   {
//     name: "Outdoor dining area",
//     icon: <FaUmbrellaBeach />,
//   },
//   {
//     name: "Private patio or Balcony",
//     icon: <MdBalcony />,
//   },
//   {
//     name: "Camp fire",
//     icon: <GiCampfire />,
//   },
//   {
//     name: "Garden",
//     icon: <MdYard />,
//   },
//   {
//     name: "Free parking",
//     icon: <AiFillCar />,
//   },
//   {
//     name: "Self check-in",
//     icon: <FaKey />
//   },
//   {
//     name: " Pet allowed",
//     icon: <MdPets />
//   }
// ];