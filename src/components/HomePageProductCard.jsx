import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import myContext from "../context/myContext";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { addToCart, deleteFromCart } from "../redux/cartSlice";
import GetQuote from "../components/Get_Quote";
import "../components/css/HomePageProductCard.css";
import Loader from "../components/Loader";
import { MdOutlinePermPhoneMsg } from "react-icons/md";

const HomePageProductCard = () => {
  const navigate = useNavigate();

  const context = useContext(myContext);
  const { getAllProduct } = context;
  console.log("Products:", getAllProduct);

  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const addCart = (item) => {
    // console.log(item)
    dispatch(addToCart(item));
    toast.success("Add to cart");
  };

  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.success("Delete cart");
  };

  const handleCallback = (item) => {
    setIsQuoteOpen(true);
    setSelectedProduct(item);
  };

  // console.log(cartItems)

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setLoading(false);
    };

    fetchProducts();
  }, []);

  return (
    <div className="md:mt-10 lg:mt-10">
      {loading ? (
        <div className="flex justify-center">
          <Loader />
        </div>
      ) : (
        <>
          <h1 className="text-center mb-0 md:mb-5 text-2xl font-semibold">
            Bestselling Products
          </h1>
          <section className="text-gray-600 body-font">
            <div className="container px-5 py-5 mx-auto ">
              <div className="main-cart flex flex-wrap -m-10 sm:-m-12">
                {getAllProduct
                  .filter((item) => item.isBestseller)
                  .slice(0, 8)
                  .map((item, index) => {
                    const {
                      id,
                      title,
                      price,
                      productImageUrl,
                      priceUnit,
                      productImages,
                      minOrderQuantity,
                      packagingSize,
                    } = item;
                    return (
                      <div
                        key={index}
                        className="index-div sm:p-2 md:p-4 w-1/2 md:w-1/4"
                      >
                        <div className="cardsize border border-gray-300 rounded-xl overflow-hidden shadow-md cursor-pointer flex flex-col">
                          <img
                            onClick={() => navigate(`/productinfo/${id}`)}
                            className="img lg:h-80"
                            // src={productImageUrl}
                            src={productImages?.image1 || productImageUrl}
                            alt="blog"
                            loading="lazy"
                          />
                          <div className="p-6 flex flex-col flex-grow">
                            <div className="flex-grow ">
                              <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                                Green-Rise-Agro
                              </h2>
                              <div className="    text-gray-900 mb-3 product-font">
                                {window.innerWidth < 640
                                  ? title.length > 20
                                    ? title.substring(0, 20) + "..."
                                    : title
                                  : title.substring(0, 25)}
                              </div>
                              <div className=" product-font   text-gray-900 mb-3 price-position">
                                Price:{" "}
                                <strong>
                                  {" "}
                                  ₹{price} /{priceUnit}
                                </strong>
                              </div>
                              <div className="  product-font text-gray-900 mb-3 price-position">
                                Minimum Order :{" "}
                                <strong>
                                  {" "}
                                  {minOrderQuantity.value}{" "}
                                  {minOrderQuantity.unit}
                                </strong>
                              </div>
                              <div className=" product-font text-gray-900 mb-3 price-position">
                                Packing Size:
                                <strong>
                                  {" "}
                                  {packagingSize.value} {packagingSize.unit}
                                </strong>
                              </div>
                            </div>

                            <div className="mt-auto">
                              {cartItems.some((p) => p.id === item.id) ? (
                              <button
                                onClick={() => deleteCart(item)}
                                className=" bg-[#029354] hover:bg-[0A4C36] w-full text-white py-[4px] rounded-lg font-bold"
                              >
                                Delete To Cart
                              </button>
                            ) : (
                              <button
                                onClick={() => addCart(item)}
                                className=" bg-[#0B5D44] hover:bg-[#0B5D44]/80 w-full text-white py-[4px] rounded-lg font-bold"
                              >
                                Add To Cart
                              </button>
                            )}
                              {/* <button
                                className=" bg-[#0B5D44] hover:bg-[#0B5D44]/80 w-full text-white py-[4px] rounded-lg font-bold flex justify-center items-center"
                                onClick={() => handleCallback(item)}
                              >
                                <MdOutlinePermPhoneMsg className="text-2xl mr-2" />
                                Call back
                              </button> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </section>

          {isQuoteOpen && (
            <GetQuote
              onClose={() => setIsQuoteOpen(false)}
              product={selectedProduct}
            />
          )}
        </>
      )}
    </div>
  );
};

export default HomePageProductCard;
