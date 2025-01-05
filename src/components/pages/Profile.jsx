import React from "react";
import { MapPinIcon } from "@heroicons/react/24/solid";
import { BuildingOfficeIcon, CheckBadgeIcon } from "@heroicons/react/24/solid";
import {
  HiLocationMarker,
  HiOfficeBuilding,
  HiBadgeCheck,
} from "react-icons/hi";
import "../css/Profile.css";

const Profile = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Company Header */}
      <div className="bg-white rounded-xl shadow-md p-8 mb-8 border border-gray-100 hover:shadow-lg transition-shadow duration-300 main-div">
        <h1 className="text-4xl font-bold mb-6 text-gray-800 border-b pb-4 header">
          Green Rise Agro Industries
        </h1>
        <p className="text-gray-700 mb-6 leading-relaxed">
          Established in 2010, Green Rise Agro Industries is the leading
          Manufacturer and Wholesaler of Organic Fertilizer and Manure, Fulvic
          Acid, Potassium Humate etc. These products are immensely demanded in
          the market owing to the features like environment friendliness, longer
          shelf life, effectiveness, precise pH value, accurate composition and
          non-hazardous nature.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Under the proficient management of our mentor, Mr. Chandrakant Jadhav,
          we have become a renowned organization in this domain.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Basic Information */}
        <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100 hover:shadow-lg transition-shadow duration-300 basic-main-div">
          <h2 className="text-2xl font-semibold mb-6 flex items-center text-gray-800">
            <BuildingOfficeIcon className="h-6 w-6 mr-3 text-blue-600" />
            Basic Information
          </h2>
          <ul className="">
            <li className="hover:bg-gray-50 p-3 rounded-lg transition-colors duration-200">
              <p className="font-medium text-gray-900">Nature of Business</p>
              <p className="text-gray-600 mt-1">Wholesaler/Distributor</p>
            </li>
            <li className="hover:bg-gray-50 p-3 rounded-lg transition-colors duration-200">
              <p className="font-medium text-gray-900">Company CEO</p>
              <p className="text-gray-600 mt-1">Chandrakant Jadhav</p>
            </li>
            <li className="hover:bg-gray-50 p-3 rounded-lg transition-colors duration-200">
              <p className="font-medium text-gray-900">Annual Turnover</p>
              <p className="text-gray-600 mt-1">5 - 25 Cr</p>
            </li>
            <li className="hover:bg-gray-50 p-3 rounded-lg transition-colors duration-200">
              <p className="font-medium text-gray-900">Total Employees</p>
              <p className="text-gray-600 mt-1">Upto 10 People</p>
            </li>
          </ul>
        </div>

        {/* Statutory Profile */}
        <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100 hover:shadow-lg transition-shadow duration-300 statutory-main-div">
          <h2 className="text-2xl font-semibold mb-6 flex items-center text-gray-800">
            <CheckBadgeIcon className="h-6 w-6 mr-3 text-green-600" />
            Statutory Profile
          </h2>
          <ul className="">
            <li className="hover:bg-gray-50 p-3 rounded-lg transition-colors duration-200">
              <p className="font-medium text-gray-900">GST No.:</p>
              <p className="text-gray-600 mt-1">27AARFG7173R1ZA</p>
            </li>
            <li className="hover:bg-gray-50 p-3 rounded-lg transition-colors duration-200">
              <p className="font-medium text-gray-900">
                GST Registration Date:
              </p>
              <p className="text-gray-600 mt-1">22-11-2017</p>
            </li>
            <li className="hover:bg-gray-50 p-3 rounded-lg transition-colors duration-200">
              <p className="font-medium text-gray-900">Legal Status:</p>
              <p className="text-gray-600 mt-1">Partnership</p>
            </li>
            <li className="hover:bg-gray-50 p-3 rounded-lg transition-colors duration-200">
              <p className="font-medium text-gray-900">Banker:</p>
              <p className="text-gray-600 mt-1">Kotak Mahindra Bank</p>
            </li>
          </ul>
        </div>

        {/* Why Us */}
        <div className="col-span-1 md:col-span-2 bg-white rounded-xl shadow-md p-8 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
            {[
              "Finest quality products",
              "Timely delivery",
              "Cost-effective price",
              "Large distributive network",
              "Convenient payment modes",
              "Ethical business practices",
            ].map((feature, index) => (
              <div
                key={index}
                className="p-4 sm:p-6 text-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
              >
                <p className="font-medium text-gray-700">{feature}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Address */}
        <div className="col-span-1 md:col-span-2 bg-white rounded-xl shadow-md p-8 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-2xl font-semibold mb-6 flex items-center text-gray-800">
            <MapPinIcon className="h-6 w-6 mr-3 text-red-600" />
            Registered Address
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Survey No. 13, Office No. 6, Shivanand Complex, Satavwadi Hadapsar,
            Pune- 411028, Maharashtra, India
          </p>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-12 text-center">
        <hr className="mb-6 border-gray-200" />
        <p className="text-sm text-gray-500">
          Disclaimer: No drug is sold without a valid prescription
        </p>
      </div>
    </div>
  );
};

export default Profile;
