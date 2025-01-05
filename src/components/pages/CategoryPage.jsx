import { useNavigate, useParams } from "react-router";
import Layout from "../Layout";
import { useContext, useEffect } from "react";
import myContext from "../../context/myContext";
import Loader from "../Loader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import toast from "react-hot-toast";
import HomePageProductCard from "../HomePageProductCard";

const CategoryPage = () => {
  const { categoryname } = useParams();
  const context = useContext(myContext);
  const { getAllProduct, loading } = context;

  const navigate = useNavigate();

  console.log("All Products:", getAllProduct);

  const filterProduct = getAllProduct.filter(
    (obj) => obj.category === categoryname
  );

  console.log("filterProduct", filterProduct);

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

  console.log(cartItems);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);
  return (
    <Layout>
      <div className="mt-10">
        {/* Heading  */}
        <div className="">
          <h1 className=" text-center mb-5 text-2xl font-semibold first-letter:uppercase">
            {categoryname}
          </h1>
        </div>

        {/* main  */}
        {loading ? (
          <div className="flex justify-center">
            <Loader />
          </div>
        ) : (
          <section className="text-gray-600 body-font">
            <div className="container px-5 py-5 mx-auto">
              <div className="main-cart flex flex-wrap -m-10 sm:-m-12">
                {filterProduct.slice(0, 8).map((item, index) => {
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
                          src={productImages?.image1 || productImageUrl}
                          alt="blog"
                        />
                        <div className="p-6 flex flex-col flex-grow">
                          <div className="flex-grow">
                            <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                              Green-Rise-Agro
                            </h2>
                            <div className="text-gray-900 mb-3 product-font">
                              {title.substring(0, 25)}
                            </div>
                            <div className="product-font text-gray-900 mb-3 price-position">
                              Price:{" "}
                              <strong>
                                ₹{price} /{priceUnit}
                              </strong>
                            </div>
                            <div className="product-font text-gray-900 mb-3 price-position">
                              Minimum Order:{" "}
                              <strong>
                                {minOrderQuantity.value} {minOrderQuantity.unit}
                              </strong>
                            </div>
                            <div className="product-font text-gray-900 mb-3 price-position">
                              Packing Size:{" "}
                              <strong>
                                {packagingSize.value} {packagingSize.unit}
                              </strong>
                            </div>
                          </div>
                          <div className="mt-auto">
                            {cartItems.some((p) => p.id === item.id) ? (
                              <button
                                onClick={() => deleteCart(item)}
                                className="bg-[#0B5D44] hover:bg-[#0B5D44] w-full text-white py-[4px] rounded-lg font-bold"
                              >
                                Delete From Cart
                              </button>
                            ) : (
                              <button
                                onClick={() => addCart(item)}
                                className="bg-[#0B5D44] hover:bg-[#0B5D44]/80 w-full text-white py-[4px] rounded-lg font-bold"
                              >
                                Add To Cart
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}
      </div>
      <HomePageProductCard />
    </Layout>
  );
};

export default CategoryPage;
