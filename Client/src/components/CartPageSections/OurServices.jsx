import React from "react";
import { FaLock, FaShippingFast } from "react-icons/fa";
import { BiSupport } from "react-icons/bi";

const OurServices = () => {
  const services = [
    {
      icon: <FaLock size={24} className="text-gray-500" />,
      title: "Secure payment",
      subtitle: "Have you ever finally just",
    },
    {
      icon: <BiSupport size={24} className="text-gray-500" />,
      title: "Customer support",
      subtitle: "Have you ever finally just",
    },
    {
      icon: <FaShippingFast size={24} className="text-gray-500" />,
      title: "Free delivery",
      subtitle: "Have you ever finally just",
    },
  ];

  return (
    <div className="bg-gray-100 py-2">
      <div className="hidden  md:flex flex-col md:flex-row  pl-3 space-y-6 md:space-y-0 md:space-x-12">
        {services.map((service, index) => (
          <div key={index} className="flex  items-center  space-x-2">
            <div className="bg-gray-300 rounded-full p-4">{service.icon}</div>
            <span className="flex flex-col">
              <h3 className="text-sm font-semibold text-gray-800">
                {service.title}
              </h3>
              <p className="text-xs text-gray-500">{service.subtitle}</p>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurServices;
