import React, { useState, useContext } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import myContext from "../context/myContext";
import { fireDB } from "../FirebaseConfig";
import { collection, addDoc } from "firebase/firestore";

const GetUserInfo = ({ onClose, product }) => {
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

    console.log("Helllllo", product);

    try {
      const userRequest = {
        phoneNumber: strippedPhoneNumber,
        productTitle: product?.title || "No product selected",
        time: new Date().toISOString(),
      };

      const userRequestsRef = collection(fireDB, "userRequests");
      await addDoc(userRequestsRef, userRequest);

      console.log("Submitted phone number:", strippedPhoneNumber);
      setIsSubmitted(true);
      setTimeout(onClose, 3000);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const context = useContext(myContext);
  const { getAllProduct } = context;

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

              <div>
                {product && (
                  <div className="text-sm text-gray-600 mt-2">
                    <p>Selected Product: {product.name}</p>
                    {getAllProduct
                      .filter((item) => item.title === product.title)
                      .map((item) => (
                        <div key={item.id} className="mb-2 flex items-center">
                          <img
                            src={item.productImages.image1}
                            alt="product"
                            className="w-24 h-24 object-contain mt-2"
                          />
                          <div className="ml-4">
                            <h1 className="text-base font-semibold">
                              {item.title}
                            </h1>
                            <p>
                              Price: ₹ {item.price} / {item.priceUnit}
                            </p>
                            <p>
                              Minimum Order Quantity :{" "}
                              {item.minOrderQuantity.value}{" "}
                              {item.minOrderQuantity.unit}
                            </p>
                            <p>
                              Packaging Size : {item.packagingSize.value}{" "}
                              {item.packagingSize.unit}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>

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

export default GetUserInfo;
