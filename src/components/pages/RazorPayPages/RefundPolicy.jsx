import React from "react";
import myContext from "../../../context/myContext";
import { useContext } from "react";

const RefundPolicy = () => {
  const context = useContext(myContext);
  const { getAllProduct } = context;
  console.log("Products:", getAllProduct);

  // Filter products to show only sutarwadi
  const sutarwadiProducts = getAllProduct.filter(
    (product) => product.title.toLowerCase() === "priya"
  );

  return (
    <div className="max-w-4xl mx-auto p-6 font-sans">
      {/* Display Sutarwadi Products */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Sutarwadi Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sutarwadiProducts.map((product) => (
            <div key={product.id} className="bg-white p-4 rounded-lg shadow-md">
              {/* Image Gallery */}
              <div className="mb-4">
                {product.productImages.image1 && (
                  <img
                    src={product.productImages.image1}
                    alt={`${product.title} - Image 1`}
                    className="w-full h-48 object-cover rounded-lg mb-2"
                  />
                )}
                {product.productImages.image2 && (
                  <img
                    src={product.productImages.image2}
                    alt={`${product.title} - Image 2`}
                    className="w-full h-48 object-cover rounded-lg mb-2"
                  />
                )}
                {product.productImages.image3 && (
                  <img
                    src={product.productImages.image3}
                    alt={`${product.title} - Image 3`}
                    className="w-full h-48 object-cover rounded-lg mb-2"
                  />
                )}
              </div>

              {/* Product Details */}
              <h3 className="text-xl font-semibold">{product.title}</h3>
              <p className="text-gray-600">{product.description}</p>
              <p className="text-lg font-bold mt-2">₹{product.price}</p>
              <p className="text-sm text-gray-500">
                Category: {product.category}
              </p>

              {/* Additional Information */}
              {product.videoLink && (
                <a
                  href={product.videoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700 block mt-2"
                >
                  Watch Video
                </a>
              )}

              {product.productBrochure && (
                <a
                  href={product.productBrochure}
                  download
                  className="text-blue-500 hover:text-blue-700 block mt-2"
                >
                  Download Brochure
                  <h1>Hello</h1>
                  <h2>Hello</h2>
                  <h2>Hello</h2>
                  <h2>Hello</h2>
                  <h2>Hello</h2>
                  
                  
                </a>
              )}

              {product.time && (
                <p className="text-sm text-gray-500 mt-2">
                  Time: {new Date(product.time.seconds * 1000).toLocaleString()}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="text-center border-b-4 border-blue-500 pb-4 mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Refund Policy</h1>
        <h1>Hello Ganesha</h1>
      </div>

      <div className="bg-gray-100 rounded-lg p-6 mb-6 shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Our Commitment to You
        </h2>
        <p className="text-gray-700">
          We value your satisfaction and maintain a customer-friendly refund
          policy to ensure you have the best shopping experience with us.
        </p>
      </div>

      <div className="bg-gray-100 rounded-lg p-6 mb-6 shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Refund Terms
        </h2>
        <ul className="list-none space-y-4">
          <li className="p-4 bg-white rounded-lg shadow-sm border-l-4 border-blue-500">
            <strong className="text-gray-800">
              100% Refund Before Dispatch:
            </strong>{" "}
            We offer a full refund if you cancel your order before it has been
            dispatched from our warehouse.
          </li>
          <li className="p-4 bg-white rounded-lg shadow-sm border-l-4 border-blue-500">
            <strong className="text-gray-800">Delivery Charges:</strong> Please
            note that delivery charges are to be borne by the customer and are
            non-refundable.
          </li>
          <li className="p-4 bg-white rounded-lg shadow-sm border-l-4 border-blue-500">
            <strong className="text-gray-800">Delivery Timeline:</strong>{" "}
            Delivery time varies based on your location. We strive to deliver
            your products as quickly as possible while maintaining quality
            service.
          </li>
        </ul>
      </div>

      <div className="bg-gray-100 rounded-lg p-6 mb-6 shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Refund Process
        </h2>
        <ol className="list-decimal space-y-4 pl-5">
          <li className="p-4 bg-white rounded-lg shadow-sm border-l-4 border-blue-500">
            Contact our customer support team to initiate your refund request.
          </li>
          <li className="p-4 bg-white rounded-lg shadow-sm border-l-4 border-blue-500">
            Provide your order number and reason for the refund.
          </li>
          <li className="p-4 bg-white rounded-lg shadow-sm border-l-4 border-blue-500">
            Once approved, the refund will be processed within 5-7 business
            days.
          </li>
          <li className="p-4 bg-white rounded-lg shadow-sm border-l-4 border-blue-500">
            The refund will be credited to your original payment method.
          </li>
        </ol>
      </div>

      <div className="bg-blue-100 text-blue-700 p-6 rounded-lg text-center font-semibold shadow-md">
        For any queries regarding our refund policy, please contact our customer
        support team.
      </div>
    </div>
  );
};

export default RefundPolicy;
