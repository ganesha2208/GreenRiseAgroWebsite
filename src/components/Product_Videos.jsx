import React, { useState, Suspense } from "react";
import { FaPlayCircle } from "react-icons/fa";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles

// Lazy load the GetQuoteSpecific component
const GetQuoteSpecific = React.lazy(() => import("./Get_Quote_Specific"));

const videoList = [
  {
    id: 1,
    name: "Gluconate Potash",
    url: "https://youtu.be/-WLyiL106ms",
    thumbnail: "https://img.youtube.com/vi/KDcLE0bZMMI/hqdefault.jpg",
  },
  {
    id: 2,
    name: "Npk 19 19 19",
    url: "https://youtu.be/pS0afvLAAGA",
    thumbnail: "https://img.youtube.com/vi/pS0afvLAAGA/hqdefault.jpg",
  },
  {
    id: 3,
    name: "Npk 13 00 45 Water Soluble Fertilizers",
    url: "https://youtu.be/-_ckt1cu2d4",
    thumbnail: "https://img.youtube.com/vi/-_ckt1cu2d4/hqdefault.jpg",
  },
];

const ProductVideos = React.memo(() => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleVideoSelect = (videoUrl) => {
    const videoId = videoUrl.includes("youtu.be")
      ? videoUrl.split("youtu.be/")[1]
      : videoUrl.split("v=")[1].split("&")[0];

    const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    setSelectedVideo(embedUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
  };

  const handleGetQuote = (product) => {
    setSelectedProduct(product);
    setIsQuoteOpen(true);
  };

  return (
    <div className="container mx-auto px-4 md:py-10">
      <h2 className="text-center mb-0 md:mb-5 text-2xl font-semibold md:py-5">
        Product Videos
      </h2>

      {/* Video Grid for Desktop */}
      <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {videoList.map((video) => (
          <div
            key={video.id}
            className="flex flex-col bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105 h-full"
          >
            {/* Thumbnail with Play Button */}
            <div
              className="relative aspect-video cursor-pointer group"
              onClick={() => handleVideoSelect(video.url)}
            >
              <img
                src={video.thumbnail}
                alt={`Thumbnail for ${video.name}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-opacity-30 group-hover:bg-opacity-50 flex justify-center items-center transition-all duration-300">
                <FaPlayCircle className="w-16 h-16 group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>

            {/* Video Info */}
            <div className="p-6 flex flex-col flex-grow bg-gradient-to-b from-gray-50 to-white">
              <h3 className="text-xl font-semibold text-gray-800 text-center mb-4">
                {video.name}
              </h3>
              <div className="flex-grow"></div>
              <button
                className="bg-[#0B5D44] text-white px-8 py-3 rounded-full hover:bg-green-700 transition-colors duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 mt-auto"
                onClick={() => handleGetQuote(video)}
              >
                Get Quote
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Carousel for Mobile */}
      <div className="block md:hidden">
        <Carousel
          showThumbs={false}
          showStatus={false}
          infiniteLoop
          useKeyboardArrows={false}
          autoPlay
          interval={3000}
          showArrows={true}
          showIndicators={false}
        >
          {videoList.map((video) => (
            <div key={video.id} onClick={() => handleVideoSelect(video.url)}>
              <img src={video.thumbnail} alt={`Thumbnail for ${video.name}`} />
              <h1 className="font-semibold mt-3">{video.name}</h1>
              <button
                className="bg-[#0B5D44] text-white px-8 py-3 rounded-full hover:bg-green-700 transition-colors duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 mt-4"
                onClick={() => handleGetQuote(video)}
              >
                Get Quote
              </button>
            </div>
          ))}
        </Carousel>
      </div>

      {/* Video Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-5xl">
            <div className="flex justify-end p-4">
              <button
                className="text-3xl text-gray-500 hover:text-gray-700 transition-colors"
                onClick={closeModal}
              >
                ×
              </button>
            </div>
            <div className="relative aspect-video">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={selectedVideo}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}

      {/* Get Quote Modal */}
      {isQuoteOpen && (
        <Suspense fallback={<div>Loading...</div>}>
          <GetQuoteSpecific
            onClose={() => setIsQuoteOpen(false)}
            product={selectedProduct}
          />
        </Suspense>
      )}
    </div>
  );
});

export default ProductVideos;
