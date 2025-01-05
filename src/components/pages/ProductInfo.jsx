import { useContext, useEffect, useState, Suspense } from "react";
import Layout from "../Layout";
import myContext from "../../context/myContext";
import { useParams } from "react-router";
import { fireDB } from "../../FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import Loader from "../Loader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import { BiSolidFilePdf } from "react-icons/bi";
import { MdOutlinePermPhoneMsg } from "react-icons/md";

import GetUserInfo from "../GetUserInfo";

const ProductInfo = () => {
  const context = useContext(myContext);
  const { loading, setLoading } = context;

  const [product, setProduct] = useState("");
  console.log("product is ganeshs", product);

  const [showMoreInfo, setShowMoreInfo] = useState(false);

  const { id } = useParams();

  console.log(product);

  const navigate = useNavigate();

  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [isUserInfoOpen, setIsUserInfoOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // getProductData
  const getProductData = async () => {
    setLoading(true);
    try {
      const productTemp = await getDoc(doc(fireDB, "products", id));
      // console.log({...productTemp.data(), id : productTemp.id})
      setProduct({ ...productTemp.data(), id: productTemp.id });
      console.log("product data is ", productTemp);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const addCart = (item) => {
    // console.log(item)
    dispatch(addToCart(item));
    toast.success("Add to cart");
  };

  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.success("Delete cart");
  };

  // console.log(cartItems)

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const buyNowFunction = () => {
    navigate("/cart");
    addCart(product);
    console.log("product is ganeshs", product);
  };

  const handleCallback = () => {
    setIsUserInfoOpen(true);
  };

  useEffect(() => {
    getProductData();
  }, []);

  const extractYouTubeID = (url) => {
    if (typeof url !== "string") {
      console.warn("Invalid URL provided:", url);
      return null;
    }

    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^&\n]{11})/;
    const matches = url.match(regex);
    return matches ? matches[1] : null;
  };

  const videoID = product?.videoLink
    ? extractYouTubeID(product.videoLink)
    : null;
  console.log("Video link:", product?.videoLink);
  console.log("Extracted Video ID:", videoID);

  return (
    <Layout>
      <section className="py-5 lg:py-16 font-poppins dark:bg-gray-800">
        {loading ? (
          <>
            <div className="flex justify-center items-center">
              <Loader />
            </div>
          </>
        ) : (
          <>
            <div className="max-w-6xl px-4 mx-auto">
              <div className="flex flex-wrap mb-24 -mx-4">
                <div className="w-full px-4 mb-8 md:w-1/2 md:mb-0">
                  <div className="">
                    <div className="">
                      <Carousel
                        interval={3000}
                        className="border-2 border-[#0B5D44]"
                      >
                        <Carousel.Item>
                          <img
                            className="w-full lg:h-[39em] rounded-lg"
                            src={
                              product?.productImages?.image1 ||
                              product?.productImageUrl
                            }
                            alt="First slide"
                          />
                        </Carousel.Item>
                        <Carousel.Item>
                          <img
                            className="w-full lg:h-[39em] rounded-lg"
                            src={
                              product?.productImages?.image2 ||
                              product?.productImages?.image1
                            }
                            alt="Second slide"
                          />
                        </Carousel.Item>
                        <Carousel.Item>
                          <img
                            className="w-full lg:h-[39em] rounded-lg"
                            src={
                              product?.productImages?.image3 ||
                              product?.productImages?.image3
                            }
                            alt="Third slide"
                          />
                        </Carousel.Item>
                        {product.videoLink && (
                          <Carousel.Item>
                            <div className="w-full lg:h-[39em] rounded-lg">
                              {videoID ? (
                                <iframe
                                  className="w-full lg:h-[39em] rounded-lg"
                                  src={`https://www.youtube.com/embed/${videoID}`}
                                  title="YouTube video player"
                                  frameBorder="0"
                                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowFullScreen
                                ></iframe>
                              ) : (
                                <p>Video not available</p>
                              )}
                            </div>
                          </Carousel.Item>
                        )}
                      </Carousel>
                    </div>
                  </div>
                </div>
                <div className="w-full px-4 md:w-1/2">
                  <div className="lg:pl-20">
                    <div className="mb-6 ">
                      <h2 className="max-w-xl mb-6 text-xl font-semibold leading-loose tracking-wide text-gray-700 md:text-2xl dark:text-gray-300">
                        {product?.title}
                      </h2>
                      <div className="flex flex-wrap items-center mb-6">
                        <ul className="flex mb-4 mr-2 lg:mb-0">
                          <li>
                            <a href="">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={16}
                                height={16}
                                fill="currentColor"
                                className="w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star "
                                viewBox="0 0 16 16"
                              >
                                <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"></path>
                              </svg>
                            </a>
                          </li>
                          <li>
                            <a href="">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={16}
                                height={16}
                                fill="currentColor"
                                className="w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star "
                                viewBox="0 0 16 16"
                              >
                                <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"></path>
                              </svg>
                            </a>
                          </li>
                          <li>
                            <a href="">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={16}
                                height={16}
                                fill="currentColor"
                                className="w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star "
                                viewBox="0 0 16 16"
                              >
                                <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"></path>
                              </svg>
                            </a>
                          </li>
                          <li>
                            <a href="">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={16}
                                height={16}
                                fill="currentColor"
                                className="w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star "
                                viewBox="0 0 16 16"
                              >
                                <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"></path>
                              </svg>
                            </a>
                          </li>
                        </ul>
                      </div>
                      <p className="inline-block text-2xl font-semibold text-gray-700 dark:text-gray-400 ">
                        <span>
                          ₹ {product?.price} /{product?.priceUnit}
                        </span>
                      </p>
                    </div>
                    <div className="mb-6">
                      {product.productBrochure && (
                        <p>
                          Product Brochure:
                          <strong>
                            <a
                              href={product.productBrochure}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <BiSolidFilePdf />
                            </a>
                          </strong>
                        </p>
                      )}
                      {product.minOrderQuantity?.value && (
                        <p>
                          Minimum Order Quantity:{" "}
                          <strong>
                            {product.minOrderQuantity.value} {product.priceUnit}
                          </strong>
                        </p>
                      )}
                      {product.packagingSize?.value && (
                        <p>
                          Packaging Size:{" "}
                          <strong>
                            {product.packagingSize.value}{" "}
                            {product.packagingSize.unit}
                          </strong>
                        </p>
                      )}
                      {product.packagingType && (
                        <p>
                          Packaging Type:{" "}
                          <strong>{product.packagingType}</strong>
                        </p>
                      )}
                      {product.form && (
                        <p>
                          Product Form: <strong>{product.form}</strong>
                        </p>
                      )}
                      {product.category && (
                        <p>
                          Category: <strong>{product.category}</strong>
                        </p>
                      )}
                      {product.color && (
                        <p>
                          Colour: <strong>{product.color}</strong>
                        </p>
                      )}
                      {product.usageApplication && (
                        <p>
                          Usage Application:{" "}
                          <strong>{product.usageApplication}</strong>
                        </p>
                      )}
                      {product.dose?.value && (
                        <p>
                          Dosage:{" "}
                          <strong>
                            {product.dose.value} {product.dose.unit}
                          </strong>
                        </p>
                      )}
                      {product.targetCrops && (
                        <p>
                          Target Crops: <strong>{product.targetCrops}</strong>
                        </p>
                      )}
                      {product.releaseType && (
                        <p>
                          Release Type: <strong>{product.releaseType}</strong>
                        </p>
                      )}
                      {product.phValue && (
                        <p>
                          pH Value: <strong>{product.phValue}</strong>
                        </p>
                      )}
                      {product.shelfLife?.value && (
                        <p>
                          shelfLife:{" "}
                          <strong>
                            {product.shelfLife.value} {product.shelfLife.unit}
                          </strong>
                        </p>
                      )}
                      {product.gradeStandard && (
                        <p>
                          Grade Standard:{" "}
                          <strong>{product.gradeStandard}</strong>
                        </p>
                      )}
                      {product.moisture?.value && (
                        <p>
                          Moisture:{" "}
                          <strong>
                            {product.moisture.value} {product.moisture.unit}
                          </strong>
                        </p>
                      )}
                      {product.purity?.value && (
                        <p>
                          Purity:{" "}
                          <strong>
                            {product.purity.value} {product.purity.unit}
                          </strong>
                        </p>
                      )}
                      {product.solubility?.value && (
                        <p>
                          solubility:{" "}
                          <strong>
                            {product.solubility.value} {product.solubility.unit}
                          </strong>
                        </p>
                      )}
                      {product.waterSoluble && (
                        <p>
                          Water Soluble: <strong>{product.waterSoluble}</strong>
                        </p>
                      )}
                      {product.environmentFriendly && (
                        <p>
                          Environment Friendly:{" "}
                          <strong>{product.environmentFriendly}</strong>
                        </p>
                      )}
                      {product.organic && (
                        <p>
                          Organic: <strong>{product.organic}</strong>
                        </p>
                      )}
                      {product.countryOfOrigin && (
                        <p>
                          Country Of Origin:{" "}
                          <strong>{product.countryOfOrigin}</strong>
                        </p>
                      )}
                      {product.brand && (
                        <p>
                          Brand: <strong>{product.brand}</strong>
                        </p>
                      )}
                      {product.technicalName && (
                        <p>
                          Technical Name:{" "}
                          <strong>{product.technicalName}</strong>
                        </p>
                      )}
                      {product.npkRatio && (
                        <p>
                          NPK Ratio: <strong>{product.npkRatio}</strong>
                        </p>
                      )}
                      {product.chemicalFormula && (
                        <p>
                          Chemical Formula:{" "}
                          <strong>{product.chemicalFormula}</strong>
                        </p>
                      )}
                      {product.casNo && (
                        <p>
                          CAS No: <strong>{product.casNo}</strong>
                        </p>
                      )}
                      {product.extractionMethod && (
                        <p>
                          Extraction Method:{" "}
                          <strong>{product.extractionMethod}</strong>
                        </p>
                      )}
                      {product.extraViews?.viewsCount > 0 && (
                        <div className="col-lg-6 ">
                          <strong>Extra Views:</strong> ₹:{" "}
                          {product.extraViews.price} x{" "}
                          {product.extraViews.viewsCount}
                        </div>
                      )}
                    </div>
                    <span
                      onClick={() => setShowMoreInfo(!showMoreInfo)}
                      className="mb-6 cursor-pointer text-[#0B5D44] hover:text-[#094434] transition-colors underline text-sm font-medium"
                    >
                      {showMoreInfo ? "Show Less" : "More Info"}
                    </span>
                    {showMoreInfo && (
                      <div className="space-y-6">
                        <div className="mb-6">
                          <h2 className="mb-2 text-lg font-bold text-gray-700 dark:text-gray-400">
                            Description:
                          </h2>
                          <p>{product?.description}</p>
                        </div>
                      </div>
                    )}
                    <div className="mb-6 " />
                    <div className="flex flex-wrap items-center mb-6">
                      {cartItems.some((p) => p.id === product.id) ? (
                        <button
                          onClick={() => deleteCart(product)}
                          className="w-full px-4 py-3 text-center text-white bg-red-500 border border--600  hover:bg-red-600 hover:text-gray-100  rounded-xl"
                        >
                          Delete to cart
                        </button>
                      ) : (
                        <button
                          onClick={() => addCart(product)}
                          className="w-full px-4 py-3 text-center text-white bg-[#0B5D44] border hover:bg-pink-600 hover:text-gray-100 rounded-xl"
                        >
                          Add to cart
                        </button>
                      )}
                    </div>
                    <div className="flex gap-4 mb-6">
                      <button
                        onClick={() => buyNowFunction()}
                        className="w-full px-4 py-3 text-center text-white bg-[#0B5D44] border hover:bg-pink-600 hover:text-gray-100 rounded-xl"
                      >
                        Buy now
                      </button>
                    </div>
                    {/* <div className="flex justify-center items-center mb-6">
                      <button
                        onClick={() => handleCallback()}
                        className="flex items-center justify-center w-full max-w-xs px-4 py-3 text-white bg-[#0B5D44] border hover:bg-pink-600 hover:text-gray-100 rounded-xl transition-transform transform hover:scale-105 shadow-lg focus:outline-none focus:ring-2 focus:ring-[#0B5D44] focus:ring-opacity-50"
                      >
                        <MdOutlinePermPhoneMsg className="text-2xl mr-2" />I am
                        Interested
                      </button>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </section>

      {isUserInfoOpen && (
        <Suspense fallback={<div>Loading...</div>}>
          <GetUserInfo
            onClose={() => setIsUserInfoOpen(false)}
            product={product}
          />
        </Suspense>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-5xl">
            <div className="flex justify-end p-4">
              <button
                className="text-3xl text-gray-500 hover:text-gray-700 transition-colors"
                onClick={() => setIsModalOpen(false)}
              >
                ×
              </button>
            </div>
            <div className="relative aspect-video">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube.com/embed/${videoID}`}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ProductInfo;
