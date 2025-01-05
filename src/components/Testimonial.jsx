import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const Testimonial = () => {
  const [hasBeenViewed, setHasBeenViewed] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    onChange: (inView) => {
      if (inView) {
        setHasBeenViewed(true);
      }
    },
  });

  const reviews = [
    {
      name: "Abdulrafi",
      location: "Koratla, Telangana",
      date: "03-December-24",
      product: "Orthosilicic Acid",
      rating: 5,
    },
    {
      name: "Dr. Rajesh Uravane",
      location: "Mumbai, Maharashtra",
      date: "28-November-24",
      product: "Amino Acids",
      rating: 5,
    },
    {
      name: "Kalpesh Patel",
      location: "Ahmedabad, Gujarat",
      date: "27-November-24",
      product: "Seaweed Extract Powder",
      rating: 5,
    },
  ];

  return (
    <div className="bg-white">
      <section className="container mx-auto px-2 sm:px-4 py-6 sm:py-12">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-12">
          <h1 className="text-center mb-3 sm:mb-5 text-xl sm:text-2xl font-semibold">
            Customer Reviews
          </h1>
          <p className="text-gray-600">
            Hear what our happy customers have to say about us.
          </p>
        </div>

        {/* Success Story Section */}
        <div ref={ref} className="text-center mb-8 sm:mb-16">
          <h2 className="text-xl sm:text-2xl font-semibold text-blue-700 mb-4 sm:mb-6">
            Our Success Story
          </h2>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            {[
              { end: 5000, text: "Total Fertilizers Delivered" },
              { end: 2500, text: "Happy Customers" },
              { end: 250, text: "Verified Suppliers" },
              { end: 4.6, text: "Avg. Rating", decimals: 2 },
            ].map((stat, index) => (
              <div
                key={index}
                className="w-32 sm:w-40 text-center p-4 sm:p-6 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow"
              >
                <h3 className="text-3xl sm:text-4xl font-bold text-blue-900">
                  {hasBeenViewed ? (
                    <CountUp
                      end={stat.end}
                      duration={2}
                      decimals={stat.decimals || 0}
                    />
                  ) : (
                    "0"
                  )}
                  <span className="text-orange-500">+</span>
                </h3>
                <p className="text-gray-600 mt-1 sm:mt-2">{stat.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel for Mobile */}
        <div className="block md:hidden mb-8 sm:mb-16">
          <Carousel
            showThumbs={false}
            showStatus={false}
            infiniteLoop
            autoPlay
            interval={3000}
            showArrows={false}
            showIndicators={false}
            className="rounded-lg shadow-g w-full h-16"
          >
            {reviews.map((review, index) => (
              <div
                key={index}
                className="bg-white p-4 sm:p-8 rounded-lg shadow-md"
              >
                <div className="flex items-center mb-3 sm:mb-4">
                  <div className="ml-3 sm:ml-4">
                    <h3 className="font-semibold text-gray-900">
                      {review.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600">
                      {review.location}
                    </p>
                  </div>
                </div>
                <div className="flex items-center mb-1 sm:mb-2">
                  {[...Array(review.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 sm:w-5 h-4 sm:h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">
                  {review.date}
                </p>
                <p className="text-xs sm:text-sm font-medium text-gray-900">
                  Product: {review.product}
                </p>
              </div>
            ))}
          </Carousel>
        </div>

        {/* Reviews Grid for Desktop */}
        <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center mb-3 sm:mb-4">
                <div className="w-10 sm:w-12 h-10 sm:h-12 bg-gray-200 rounded-full flex items-center justify-center text-lg sm:text-xl font-bold text-gray-600">
                  {review.name[0]}
                </div>
                <div className="ml-3 sm:ml-4">
                  <h3 className="font-semibold text-gray-900">{review.name}</h3>
                  <p className="text-xs sm:text-sm text-gray-600">
                    {review.location}
                  </p>
                </div>
              </div>
              <div className="flex items-center mb-1 sm:mb-2">
                {[...Array(review.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-3 sm:w-4 h-3 sm:h-4 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">
                {review.date}
              </p>
              <p className="text-xs sm:text-sm font-medium text-gray-900">
                Product: {review.product}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Testimonial;
