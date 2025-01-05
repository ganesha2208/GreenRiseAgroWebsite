import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { fireDB } from "../FirebaseConfig"; // Adjust the import path as necessary
import { collection, addDoc } from "firebase/firestore";

const GetQuote = ({ onClose, product }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate phone number
    if (!phoneNumber || phoneNumber.length < 10) {
      alert("Please enter a valid phone number.");
      return;
    }
    // Remove country code if present
    const strippedPhoneNumber = phoneNumber.startsWith("91")
      ? phoneNumber.slice(2)
      : phoneNumber;

    try {
      const userRequest = {
        phoneNumber: strippedPhoneNumber,
        productTitle: product.title || "No product selected", // You can modify this as needed
        time: new Date().toISOString(),
      };

      const userRequestsRef = collection(fireDB, "userRequests");
      await addDoc(userRequestsRef, userRequest);

      console.log("Submitted phone number:", phoneNumber);
      setIsSubmitted(true);
      setTimeout(onClose, 3000);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {isSubmitted ? (
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <img
                src="https://5.imimg.com/data5/SELLER/Logo/2024/8/443140100/TQ/ZN/MX/56203123/green-raise-120x120.png"
                alt="Green Rise Agro Industries Logo"
                className="w-16 h-16 object-contain"
              />
            </div>
            <h2 className="text-2xl font-bold text-green-600 mb-2">
              Thank You!
            </h2>
            <p className="text-base text-gray-600">
              We have received your request. Our team will contact you soon.
            </p>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <div className="flex justify-center mb-3">
                <img
                  src="https://5.imimg.com/data5/SELLER/Logo/2024/8/443140100/TQ/ZN/MX/56203123/green-raise-120x120.png"
                  alt="Green Rise Agro Industries Logo"
                  className="w-16 h-16 object-contain"
                />
              </div>
              <h2 className="text-2xl font-bold text-green-600 mb-2">
                Green Rise Agro Industries
              </h2>
              <p className="text-base text-gray-600">
                Connect with "Green Rise Agro Industries" and get details on
                your mobile.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 text-base font-medium mb-2">
                  Mobile Number
                </label>
                <PhoneInput
                  country={"in"}
                  value={phoneNumber}
                  onChange={(value) => setPhoneNumber(value)}
                  inputClass="!w-full !text-base !py-2"
                  inputStyle={{
                    borderColor: "#D1D5DB",
                    borderRadius: "0.375rem",
                  }}
                />
                <p className="mt-1 text-sm text-gray-500">
                  We will contact you on this number.
                </p>
              </div>

              <div className="mt-4">
                {/* <div className="text-sm text-gray-600 mt-2">
                  <img
                    src={
                      product?.productImages?.image1 || product?.productImageUrl
                    }
                    alt={product?.title}
                    className="w-20 h-20 object-contain"
                  />
                </div>
                <h2 className="text-2xl font-bold text-green-600 mb-2">
                  {product?.title}
                </h2>
                <p className="text-base text-gray-600">
                  Price:{" "}
                  <strong>
                    ₹{product?.price} / {product?.priceUnit}
                  </strong>
                </p>
                <p className="text-base text-gray-600">
                  Minimum Order:{" "}
                  <strong>
                    {product?.minOrderQuantity.value}{" "}
                    {product?.minOrderQuantity.unit}
                  </strong>
                </p>
                <p className="text-base text-gray-600">
                  Packing Size:{" "}
                  <strong>
                    {product?.packagingSize.value} {product?.packagingSize.unit}
                  </strong>
                </p> */}
              </div>
              {product && (
                <div className="mb-2 flex items-center">
                  <img
                    src={product?.productImages.image1}
                    alt="product"
                    className="w-24 h-24 object-contain mt-2"
                  />
                  <div className="ml-4">
                    <h1 className="text-base font-semibold">
                      {product?.title}
                    </h1>
                    <p>
                      Price: ₹ {product?.price} / {product?.priceUnit}
                    </p>
                    <p>
                      Minimum Order Quantity : {product?.minOrderQuantity.value}{" "}
                      {product?.minOrderQuantity.unit}
                    </p>
                    <p>
                      Packaging Size : {product.packagingSize.value}{" "}
                      {product?.packagingSize.unit}
                    </p>
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-green-600 text-white px-6 py-3 text-base rounded-full hover:bg-green-700 transition duration-300 shadow"
              >
                Submit Request
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default GetQuote;
