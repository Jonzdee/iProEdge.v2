



import { FaShippingFast, FaCreditCard, FaShieldAlt, FaHeadset } from "react-icons/fa";


import wireless01 from "../Images/wireless-01.png";
import wireless02 from "../Images/wireless-02.png";
import wireless03 from "../Images/wireless-03.png";
import wireless04 from "../Images/earphones_b_1.webp";

import sofaSlide from "../Images/watch-07.png";
import watchSlide from "../Images/watch-07.png";
import speaker from "../Images/speaker2.webp";


export const SliderData = [
  {
      id: 1,
      title: "High-Quality Speakers - 20% Off",
      desc: "Enhance your audio experience with premium speakers. Don’t miss out on this incredible offer!",
      cover: speaker,
  },
  {
      id: 2,
      title: "Smartwatches Starting at Just 8k",
      desc: "Stay connected and track your fitness goals with our range of smartwatches.",
      cover: watchSlide,
  },
  {
      id: 3,
      title: "Wireless Earbuds - Crystal Clear Sound",
      desc: "Immerse yourself in music with our premium wireless earbuds. Now at an exclusive discount.",
      cover: wireless04,
  },
  
];


export const serviceData = [
   {
    icon: <FaShippingFast />,
    title: "Free Shipping",
    subtitle: "Get your gadgets delivered to your doorstep at no extra cost.",
  },
  {
    icon: <FaCreditCard />,
    title: "Safe Payment",
    subtitle: "Shop with confidence using our secure payment methods.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Warranty Protection",
    subtitle: "Enjoy peace of mind with guaranteed product warranties.",
  },
  {
    icon: <FaHeadset />,
    title: "24/7 Customer Support",
    subtitle: "Our team is here to assist you anytime, anywhere.",
  },
];


