const searchCategories = [
  { value: "all", label: "All Category" },
  { value: "gadgets", label: "Gadgets" },
  { value: "clothes", label: "Clothes" },
  { value: "accessories", label: "Accessories" },
];

const navCategories = [
  { value: "all", label: "All Categories", path: "/products" },
  { value: "hot-offers", label: "Hot Offers", path: "/hot-offers" },
  { value: "gift-boxes", label: "Gift Boxes", path: "/gift-boxes" },
  { value: "project-menu", label: "Project Menu Items", path: "/project-menu" },
];

import AE from "../assets/flags/AE.png";
import AU from "../assets/flags/AU.png";
import CN from "../assets/flags/CN.png";
import DE from "../assets/flags/DE.png";
import DK from "../assets/flags/DK.png";
import FR from "../assets/flags/FR.png";
import GB from "../assets/flags/GB.png";
import IT from "../assets/flags/IT.png";
import RU from "../assets/flags/RU.png";
import US from "../assets/flags/US.png";

const countryFlags = [
  {
    code: "US",
    name: "United States",
    flag: { AE },
    emoji: "🇺🇸",
  },
  {
    code: "GB",
    name: "United Kingdom",
    flag: { AE },
    emoji: "🇬🇧",
  },
  {
    code: "CA",
    name: "Canada",
    flag: { AE },
    emoji: "🇨🇦",
  },
  {
    code: "AU",
    name: "Australia",
    flag: { AE },
    emoji: "🇦🇺",
  },
  {
    code: "IN",
    name: "India",
    flag: { AE },
    emoji: "🇮🇳",
  },
  {
    code: "PK",
    name: "Pakistan",
    flag: { AE },
    emoji: "🇵🇰",
  },
  {
    code: "FR",
    name: "France",
    flag: { AE },
    emoji: "🇫🇷",
  },
  {
    code: "DE",
    name: "Germany",
    flag: { AE },
    emoji: "🇩🇪",
  },
  {
    code: "JP",
    name: "Japan",
    flag: { AE },
    emoji: "🇯🇵",
  },
  {
    code: "CN",
    name: "China",
    flag: { CN },
    emoji: "🇨🇳",
  },
  {
    code: "BR",
    name: "Brazil",
    flag: { AE },
    emoji: "🇧🇷",
  },
];

const languages = [
  { code: "US", language: "English", emoji: "🇺🇸" },
  { code: "FR", language: "French", emoji: "🇫🇷" },
  { code: "DE", language: "German", emoji: "🇩🇪" },
  { code: "JP", language: "Japanese", emoji: "🇯🇵" },
];

import phone from "../assets/tech/Canon cameras.png";
import watch from "../assets/tech/Smart watches.png";
import camera from "../assets/tech/GoPro cameras.png";
import Laptop from "../assets/tech/Laptops.png";
import headphone from "../assets/tech/Headphones.png";

const techImage = [
  { name: "Smart watches", image: watch, discount: 20 },
  { name: "Canon cameras", image: phone, discount: 25 },
  { name: "GoPro cameras", image: camera, discount: 30 },
  { name: "Laptops", image: Laptop, discount: 29 },
  { name: "Headphones", image: headphone, discount: 10 },
];

import blenders from "../assets/Home and Outdoor/blenders.png";
import coffeeMaker from "../assets/Home and Outdoor/coffee maker.png";
import kitchenDishes from "../assets/Home and Outdoor/kitchen dishes.png";
import kitchenMixer from "../assets/Home and Outdoor/kitchen mixer.png";
import sofaAndChair from "../assets/Home and Outdoor/sofa and chair.png";
import softChair from "../assets/Home and Outdoor/soft chair.png";
import smartWatches from "../assets/Home and Outdoor/smart watches.png";
import homeAppliance from "../assets/Home and Outdoor/home appliances.png";

const homeOutdoorItems = [
  { name: "Soft Chairs", image: softChair, price: "19" },
  { name: "Sofa & Chair", image: sofaAndChair, price: "19" },
  { name: "Kitchen Dishes", image: kitchenDishes, price: "19" },
  { name: "Smart watches", image: smartWatches, price: "19" },
  { name: "Kitchen Mixers", image: kitchenMixer, price: "100" },
  { name: "Blenders", image: blenders, price: "39" },
  { name: "Home Appliance", image: homeAppliance, price: "19" },
  { name: "Coffee Makers", image: coffeeMaker, price: "10" },
];

import cameras from "../assets/Consumer Electronics/Cameras.png";
import electricKettle from "../assets/Consumer Electronics/ElectricKattle.png";
import gamingSet from "../assets/Consumer Electronics/Gamingset.png";
import headphones from "../assets/Consumer Electronics/Headphones.png";
import laptopsAndPC from "../assets/Consumer Electronics/LaptopsPC.png";
import SmartWatches from "../assets/Consumer Electronics/smartwatches.png";
import smart from "../assets/Consumer Electronics/Smart.png";
import smartphones from "../assets/Consumer Electronics/Smartphones.png";

const consumerElectronicsItems = [
  { name: "Cameras", image: cameras, price: "USD 199" },
  { name: "Electric Kettle", image: electricKettle, price: "USD 29" },
  { name: "Gaming Sets", image: gamingSet, price: "USD 149" },
  { name: "Headphones", image: headphones, price: "USD 59" },
  { name: "Laptops & PCs", image: laptopsAndPC, price: "USD 799" },
  { name: "Smart Watches", image: SmartWatches, price: "USD 99" },
  { name: "Smart Devices", image: smart, price: "USD 49" },
  { name: "Smartphones", image: smartphones, price: "USD 499" },
];

const RecommendedItems = [
  { name: "Cameras", image: cameras, price: "USD 199" },
  { name: "Electric Kettle", image: electricKettle, price: "USD 29" },
  { name: "Gaming Sets", image: gamingSet, price: "USD 149" },
  { name: "Headphones", image: headphones, price: "USD 59" },
  { name: "Laptops & PCs", image: laptopsAndPC, price: "USD 799" },
  { name: "Smart Watches", image: SmartWatches, price: "USD 99" },
  { name: "Smart Devices", image: smart, price: "USD 49" },
  { name: "Smartphones", image: smartphones, price: "USD 499" },
];

import service1 from "../assets/Services/image 108.png";
import service2 from "../assets/Services/image 104.png";
import service3 from "../assets/Services/image 106.png";
import service4 from "../assets/Services/image 107.png";
import { FaSearch, FaBox, FaPlane, FaShieldAlt } from "react-icons/fa";

const services = [
  { name: "Source from Industry Hubs", image: service1, icon: FaSearch },
  { name: "Customize Your Products", image: service2, icon: FaBox },
  {
    name: "Fast,reliable shipping by ocean or air",
    image: service3,
    icon: FaPlane,
  },
  {
    name: "Product monitoring and inspection",
    image: service4,
    icon: FaShieldAlt,
  },
];

const countryData = [
  { code: "AE", name: "Arab Emirates", web: "shopname.ae", flag: AE },
  { code: "AU", name: "Australia", web: "shopname.ae", flag: AU },
  { code: "US", name: "United States", web: "shopname.ae", flag: US },
  { code: "RU", name: "Russia", web: "shopname.ru", flag: RU },
  { code: "IT", name: "Italy", web: "shopname.it", flag: IT },
  { code: "DK", name: "Denmark", web: "denmark.com.pk", flag: DK },
  { code: "FR", name: "France", web: "shopname.com.fr", flag: FR },
  { code: "DE", name: "Germany", web: "shopname.ae", flag: DE },
  { code: "CN", name: "China", web: "shopname.ae", flag: CN },
  { code: "GB", name: "Great Britain", web: "shopname.co.uk", flag: GB },
];

export {
  searchCategories,
  navCategories,
  countryFlags,
  languages,
  techImage,
  homeOutdoorItems,
  consumerElectronicsItems,
  RecommendedItems,
  services,
  countryData,
};
