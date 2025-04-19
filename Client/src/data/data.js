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

const countryFlags = [
  {
    code: "US",
    name: "United States",
    flag: "http://purecatamphetamine.github.io/country-flag-icons/3x2/US.svg",
    emoji: "🇺🇸",
  },
  {
    code: "GB",
    name: "United Kingdom",
    flag: "http://purecatamphetamine.github.io/country-flag-icons/3x2/GB.svg",
    emoji: "🇬🇧",
  },
  {
    code: "CA",
    name: "Canada",
    flag: "http://purecatamphetamine.github.io/country-flag-icons/3x2/CA.svg",
    emoji: "🇨🇦",
  },
  {
    code: "AU",
    name: "Australia",
    flag: "http://purecatamphetamine.github.io/country-flag-icons/3x2/AU.svg",
    emoji: "🇦🇺",
  },
  {
    code: "IN",
    name: "India",
    flag: "http://purecatamphetamine.github.io/country-flag-icons/3x2/IN.svg",
    emoji: "🇮🇳",
  },
  {
    code: "PK",
    name: "Pakistan",
    flag: "http://purecatamphetamine.github.io/country-flag-icons/3x2/PK.svg",
    emoji: "🇵🇰",
  },
  {
    code: "FR",
    name: "France",
    flag: "http://purecatamphetamine.github.io/country-flag-icons/3x2/FR.svg",
    emoji: "🇫🇷",
  },
  {
    code: "DE",
    name: "Germany",
    flag: "http://purecatamphetamine.github.io/country-flag-icons/3x2/DE.svg",
    emoji: "🇩🇪",
  },
  {
    code: "JP",
    name: "Japan",
    flag: "http://purecatamphetamine.github.io/country-flag-icons/3x2/JP.svg",
    emoji: "🇯🇵",
  },
  {
    code: "CN",
    name: "China",
    flag: "http://purecatamphetamine.github.io/country-flag-icons/3x2/CN.svg",
    emoji: "🇨🇳",
  },
  {
    code: "BR",
    name: "Brazil",
    flag: "http://purecatamphetamine.github.io/country-flag-icons/3x2/BR.svg",
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

export {
  searchCategories,
  navCategories,
  countryFlags,
  languages,
  techImage,
  homeOutdoorItems,
  consumerElectronicsItems,
};
