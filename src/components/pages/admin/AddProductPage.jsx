import { Timestamp, addDoc, collection } from "firebase/firestore";
import { useContext, useState } from "react";
import myContext from "../../../context/myContext";
import toast from "react-hot-toast";
import { fireDB } from "../../../FirebaseConfig";
import { useNavigate } from "react-router";
import Loader from "../../Loader";

const categoryList = [
  { name: "Agriculture Fertilizer" },
  { name: "Plant Growth Regulator" },
  { name: "Micronutrient Fertilizer" },
  { name: "Seaweed Extract Products" },
  { name: "Organic Fertilizer and Manure" },
  { name: "Humic Acid Products" },
  { name: "Micronutrient Fertilizers" },
  { name: "Neem Powder" },
  { name: "Copper Sulphate" },
  { name: "Caustic Soda Flakes" },
  { name: "Coconut Coir Dust" },
  { name: "Fulvic Acid" },
  { name: "Potassium Humate" },
  { name: "Amino Acid" },
  { name: "Bonemeal Organic Fertilizer" },
  { name: "Roasted Bentonite Granules" },
  { name: "Water Soluble Fertiliser" },
  { name: "Humic Amino Shiny Ballas" },
  { name: "Silicon Powder" },
  { name: "Sulphur Powder" },
  { name: "Neem Oil" },
  { name: "Silicon Spreader" },
  { name: "Precipitated Silica" },
  { name: "Magnesium Sulphate" },
  { name: "Zinc Fertilizers" },
  { name: "Ph Balancer" },
  { name: "Organic Bio Fertilizer" },
  { name: "Potash with Silica" },
];

const AddProductPage = () => {
  const { loading, setLoading } = useContext(myContext);
  const navigate = useNavigate();

  const colorOptions = [
    "Pink",
    "White",
    "White Crystal",
    "Brown",
    "Yellow",
    "Red",
    "Light Pink",
    "Blackish",
    "Green",
    "Shiny Black",
    "Light Yellow",
    "Brown Black",
  ];

  const formOptions = [
    "Solid",
    "Liquid",
    "Powder",
    "Granules",
    "Crystal",
    "Balls",
    "Flakes",
  ];

  const packagingTypeOptions = [
    "Bag",
    "Drum",
    "HDPE Bag",
    "PP Sack Bag",
    "PP Bag",
    "Jute Bag",
    "Potassium Fulvate",
    "Container",
  ];

  const doseUnitOptions = [
    "kg Per Acre",
    "Liter Per Acre",
    "Gm Per Liter of Water",
    "mg/per liter of water for spray",
    "ml Spray",
    "Liter per acre",
    "Depend on crops",
  ];

  // Initial State
  const [product, setProduct] = useState({
    title: "",
    price: "",
    priceUnit: "kg",
    productImages: { image1: "", image2: "", image3: "" },
    imageUploadType: "url",
    category: "",
    description: "",

    productBrochure: "",
    packagingSize: { value: "", unit: "kg" },
    form: "",
    packagingType: "",
    dose: { value: "", unit: "kg_per_acre" },
    minOrderQuantity: { value: "", unit: "kg" },
    videoLink: "",

    color: "",
    releaseType: "",
    moisture: { value: "", unit: "%" },
    purity: { value: "", unit: "%" },
    solubility: { value: "", unit: "%" },
    shelfLife: { value: "", unit: "Year" },
    gradeStandard: "",
    brand: "",
    targetCrops: "",
    usageApplication: "",
    countryOfOrigin: "",
    phValue: "",
    waterSoluble: "",
    organic: "",
    environmentFriendly: "",
    extractionMethod: "",
    npkRatio: "",
    technicalName: "",
    chemicalFormula: "",
    casNo: "",

    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
    isBestSeller: "",
  });

  // Add Product Function
  const addProductFunction = async () => {
    if (
      !product.title ||
      !product.price ||
      !product.category ||
      !product.description ||
      product.isBestseller === ""
    ) {
      return toast.error("Please fill all required fields (marked with *)");
    }

    setLoading(true);
    try {
      const productRef = collection(fireDB, "products");
      await addDoc(productRef, product);
      toast.success("Product added successfully.");
      navigate("/admin-dashboard");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add product.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex justify-center items-center  ">
      {loading && <Loader />}
      <div className="login_Form bg-pink-50 px-8 py-6 border border-pink-100 rounded-xl shadow-md">
        {/* Top Heading  */}
        <div className="mb-5">
          <h2 className="text-center text-2xl font-bold text-pink-500 ">
            Add Product
          </h2>
        </div>

        {/* Basic Info */}
        <div className="mb-3">
          <label className="text-pink-500 mb-1 block">
            Product Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={product.title}
            onChange={(e) => setProduct({ ...product, title: e.target.value })}
            placeholder="Product Title"
            className="bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300"
          />
        </div>

        {/* Price Section */}
        <div className="mb-3">
          <label className="text-pink-500 mb-1 block">
            Price <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              value={product.price}
              onChange={(e) =>
                setProduct({ ...product, price: e.target.value })
              }
              placeholder="Product Price"
              className="bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 flex-1 rounded-md outline-none placeholder-pink-300"
            />
            <select
              value={product.priceUnit}
              onChange={(e) =>
                setProduct({ ...product, priceUnit: e.target.value })
              }
              className="bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 rounded-md outline-none"
            >
              <option value="kg">Per KG</option>
              <option value="ltr">Per Ltr</option>
            </select>
          </div>
        </div>

        {/* Images Section */}
        {/* Image Upload Section */}
        <div className="mb-3">
          <div className="flex items-center space-x-3">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="imageUploadType"
                value="url"
                checked={product.imageUploadType === "url"}
                onChange={(e) =>
                  setProduct({ ...product, imageUploadType: e.target.value })
                }
              />
              <span className="text-pink-500">Upload from URL</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="imageUploadType"
                value="device"
                checked={product.imageUploadType === "device"}
                onChange={(e) =>
                  setProduct({ ...product, imageUploadType: e.target.value })
                }
              />
              <span className="text-pink-500">Upload from Device</span>
            </label>
          </div>

          {product.imageUploadType === "url" ? (
            <div>
              {[1, 2, 3].map((num) => (
                <input
                  key={num}
                  type="text"
                  placeholder={`Enter Image URL ${num}`}
                  value={product.productImages[`image${num}`] || ""}
                  onChange={(e) =>
                    setProduct({
                      ...product,
                      productImages: {
                        ...product.productImages,
                        [`image${num}`]: e.target.value,
                      },
                    })
                  }
                  className="bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300 mt-2"
                />
              ))}
            </div>
          ) : (
            <div>
              {[1, 2, 3].map((num) => (
                <input
                  key={num}
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.readAsDataURL(file);
                      reader.onload = () => {
                        setProduct({
                          ...product,
                          productImages: {
                            ...product.productImages,
                            [`image${num}`]: reader.result,
                          },
                        });
                      };
                    }
                  }}
                  className="bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300 mt-2"
                />
              ))}
              <small className="text-pink-400">
                You can upload up to 3 images.
              </small>
            </div>
          )}
        </div>

        {/* Is BestSeller */}
        <div className="mb-3">
          <label className="text-pink-500 mb-1 block">
            Is Product Bestseller?
          </label>
          <select
            value={product.isBestseller ? "Yes" : "No"}
            onChange={(e) =>
              setProduct({ ...product, isBestseller: e.target.value === "Yes" })
            }
            className="bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 rounded-md outline-none"
          >
            <option value="">Select Yes or No</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        {/* Packaging Size */}
        <div className="mb-3 flex gap-2">
          <input
            type="number"
            value={product.packagingSize.value}
            onChange={(e) =>
              setProduct({
                ...product,
                packagingSize: {
                  ...product.packagingSize,
                  value: e.target.value,
                },
              })
            }
            placeholder="Packaging Size"
            className="bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 flex-1 rounded-md outline-none placeholder-pink-300"
          />
          <select
            value={product.packagingSize.unit}
            onChange={(e) =>
              setProduct({
                ...product,
                packagingSize: {
                  ...product.packagingSize,
                  unit: e.target.value,
                },
              })
            }
            className="bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 rounded-md outline-none"
          >
            <option value="kg">KG</option>
            <option value="ltr">Ltr</option>
          </select>
        </div>

        {/* Product Category  */}
        <div className="mb-3">
          <label className="text-pink-500 mb-1 block">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            value={product.category}
            onChange={(e) => {
              setProduct({
                ...product,
                category: e.target.value,
              });
            }}
            className="w-full px-1 py-2 text-pink-300 bg-pink-50 border border-pink-200 rounded-md outline-none  "
          >
            <option disabled>Select Product Category</option>
            {categoryList.map((value, index) => {
              const { name } = value;
              return (
                <option
                  className=" first-letter:uppercase"
                  key={index}
                  value={name}
                >
                  {name}
                </option>
              );
            })}
          </select>
        </div>

        {/* Form Type */}
        <div className="mb-3">
          <select
            value={product.form}
            onChange={(e) => setProduct({ ...product, form: e.target.value })}
            className="w-full px-2 py-2 text-pink-300 bg-pink-50 border border-pink-200 rounded-md outline-none"
          >
            <option value="">Select Product Form Type</option>
            {formOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Minimum Order Quantity */}
        <div className="mb-3 flex gap-2">
          <input
            type="number"
            value={product.minOrderQuantity.value}
            onChange={(e) =>
              setProduct({
                ...product,
                minOrderQuantity: {
                  ...product.minOrderQuantity,
                  value: e.target.value,
                },
              })
            }
            placeholder="Minimun Order Quantity"
            className="bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 flex-1 rounded-md outline-none placeholder-pink-300"
          />
          <select
            value={product.minOrderQuantity.unit}
            onChange={(e) =>
              setProduct({
                ...product,
                minOrderQuantity: {
                  ...product.minOrderQuantity,
                  unit: e.target.value,
                },
              })
            }
            className="bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 rounded-md outline-none"
          >
            <option value="kg">KG</option>
            <option value="ltr">Ltr</option>
          </select>
        </div>

        {/* Packaging type */}
        <div className="mb-3">
          <select
            value={product.packagingType}
            onChange={(e) =>
              setProduct({ ...product, packagingType: e.target.value })
            }
            className="w-full px-2 py-2 text-pink-300 bg-pink-50 border border-pink-200 rounded-md outline-none"
          >
            <option value="">Select Product Packaging Type</option>
            {packagingTypeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Doseage */}
        <div className="mb-3 flex gap-2">
          <input
            type="number"
            value={product.dose.value}
            onChange={(e) =>
              setProduct({
                ...product,
                dose: {
                  ...product.dose,
                  value: e.target.value,
                },
              })
            }
            placeholder="Dose Value"
            className="bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 flex-1 rounded-md outline-none placeholder-pink-300"
          />
          <select
            value={product.dose.unit}
            onChange={(e) =>
              setProduct({
                ...product,
                dose: {
                  ...product.dose,
                  unit: e.target.value,
                },
              })
            }
            className="bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 rounded-md outline-none"
          >
            <option value="">Select Dose Unit</option>
            {doseUnitOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Moisture */}
        <div className="mb-3">
          <label className="text-pink-500 mb-1 block">Moisture (%)</label>
          <input
            type="number"
            value={product.moisture.value}
            onChange={(e) =>
              setProduct({
                ...product,
                moisture: {
                  ...product.moisture,
                  value: e.target.value,
                },
              })
            }
            placeholder="Enter moisture percentage"
            className="bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 flex-1 rounded-md outline-none placeholder-pink-300"
          />
          <select
            value={product.moisture.unit}
            onChange={(e) =>
              setProduct({
                ...product,
                moisture: {
                  ...product.moisture,
                  unit: e.target.value,
                },
              })
            }
            className="bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 rounded-md outline-none"
          >
            <option value="%">%</option>
          </select>
        </div>

        {/* PDF Upload Section */}
        <div className="mb-3">
          <label className="block text-pink-500 font-semibold mb-2">
            Upload Product Brochure (PDF)
          </label>
          <div className="flex items-center space-x-4 mb-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="uploadType"
                value="file"
                checked={product.uploadType === "file"}
                onChange={() => setProduct({ ...product, uploadType: "file" })}
              />
              <span className="text-pink-500">Upload from Device</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="uploadType"
                value="link"
                checked={product.uploadType === "link"}
                onChange={() => setProduct({ ...product, uploadType: "link" })}
              />
              <span className="text-pink-500">Provide Link</span>
            </label>
          </div>

          {product.uploadType === "file" ? (
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = () => {
                    setProduct({
                      ...product,
                      productBrochure: reader.result, // Store Base64 string
                    });
                  };
                  reader.readAsDataURL(file);
                }
              }}
              className="bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300"
            />
          ) : (
            <input
              type="url"
              value={product.productBrochure}
              onChange={(e) =>
                setProduct({ ...product, productBrochure: e.target.value })
              }
              placeholder="Enter PDF Link"
              className="bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300"
            />
          )}
          <small className="text-pink-400">
            Only PDF files are allowed or provide a valid PDF link.
          </small>
        </div>

        {/* Video Link Section */}
        <div className="mb-3">
          <label className="block text-pink-500 font-semibold mb-2">
            Video Link
          </label>
          <input
            type="url"
            name="videoLink"
            value={product.videoLink}
            onChange={(e) =>
              setProduct({ ...product, videoLink: e.target.value })
            }
            placeholder="Enter Video Link (e.g., YouTube, Vimeo)"
            className="bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300"
          />
          <small className="text-pink-400">
            Provide a valid URL (e.g., https://www.youtube.com/watch?v=xyz).
          </small>
        </div>

        {/* Description Input */}
        <div className="mb-3">
          <label className="text-pink-500 mb-1 block">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            value={product.description}
            onChange={(e) =>
              setProduct({ ...product, description: e.target.value })
            }
            placeholder="Product Description"
            className="bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 w-full rounded-md outline-none placeholder-pink-300 min-h-[100px]"
          />
        </div>

        {/* Release Type */}
        <div className="mb-3">
          <label className="text-pink-500 mb-1 block">Release Type</label>
          <input
            type="text"
            value={product.releaseType}
            onChange={(e) =>
              setProduct({
                ...product,
                releaseType: e.target.value,
              })
            }
            placeholder="Enter or select a release type"
            className="bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300"
            list="releaseTypeOptions"
          />
          <datalist id="releaseTypeOptions">
            {["Slow", "Quick"].map((option, index) => (
              <option key={index} value={option} />
            ))}
          </datalist>
        </div>

        {/* Color */}
        <div className="mb-3">
          <label className="text-pink-500 mb-1 block">Color</label>
          <input
            type="text"
            value={product.color}
            onChange={(e) => setProduct({ ...product, color: e.target.value })}
            placeholder="Enter or select a color"
            className="bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300"
            list="colorOptions"
          />
          <datalist id="colorOptions">
            {colorOptions.map((option, index) => (
              <option key={index} value={option} />
            ))}
          </datalist>
        </div>

        {/* Grade Standard */}
        <div className="mb-3">
          <label className="text-pink-500 mb-1 block">Grade Standard</label>
          <input
            type="text"
            value={product.gradeStandard}
            onChange={(e) =>
              setProduct({
                ...product,
                gradeStandard: e.target.value,
              })
            }
            placeholder="Enter or select a grade standard"
            className="bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300"
            list="gradeStandardOptions"
          />
          <datalist id="gradeStandardOptions">
            {[
              "Chemical Grade",
              "Organic",
              "Bio Tech Grade",
              "Industrial Grade",
              "Grade-I",
              "Agricultural",
              "Technical Grade",
            ].map((option, index) => (
              <option key={index} value={option} />
            ))}
          </datalist>
        </div>

        {/* Purity */}
        <div className="mb-3">
          <label className="text-pink-500 mb-1 block">Purity (%)</label>
          <input
            type="number"
            value={product.purity.value}
            onChange={(e) =>
              setProduct({
                ...product,
                purity: {
                  ...product.purity,
                  value: e.target.value,
                },
              })
            }
            placeholder="Enter purity percentage"
            className="bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 flex-1 rounded-md outline-none placeholder-pink-300"
          />
          <select
            value={product.purity.unit}
            onChange={(e) =>
              setProduct({
                ...product,
                purity: {
                  ...product.purity,
                  unit: e.target.value,
                },
              })
            }
            className="bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 rounded-md outline-none"
          >
            <option value="%">%</option>
          </select>
        </div>

        {/* Solubility */}
        <div className="mb-3">
          <label className="text-pink-500 mb-1 block">Solubility (%)</label>
          <input
            type="number"
            value={product.solubility.value}
            onChange={(e) =>
              setProduct({
                ...product,
                solubility: {
                  ...product.solubility,
                  value: e.target.value,
                },
              })
            }
            placeholder="Enter solubility percentage"
            className="bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 flex-1 rounded-md outline-none placeholder-pink-300"
          />
          <select
            value={product.solubility.unit}
            onChange={(e) =>
              setProduct({
                ...product,
                solubility: {
                  ...product.solubility,
                  unit: e.target.value,
                },
              })
            }
            className="bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 rounded-md outline-none"
          >
            <option value="%">%</option>
          </select>
        </div>

        {/* Brand */}
        <div className="mb-3">
          <label className="text-pink-500 mb-1 block">Brand</label>
          <input
            type="text"
            value={product.brand}
            onChange={(e) =>
              setProduct({
                ...product,
                brand: e.target.value,
              })
            }
            placeholder="Enter or select a brand"
            className="bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300"
            list="brandOptions"
          />
          <datalist id="brandOptions">
            {["Green Rise", "Imported", "Greenmeal", "Coco Peat"].map(
              (option, index) => (
                <option key={index} value={option} />
              )
            )}
          </datalist>
        </div>

        {/* Shelf Life */}
        <div className="mb-3">
          <label className="text-pink-500 mb-1 block">Shelf Life (years)</label>

          <input
            type="number"
            value={product.shelfLife.value}
            onChange={(e) =>
              setProduct({
                ...product,
                shelfLife: {
                  ...product.shelfLife,
                  value: e.target.value,
                },
              })
            }
            placeholder=""
            className="bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 flex-1 rounded-md outline-none placeholder-pink-300"
          />
          <select
            value={product.shelfLife.unit}
            onChange={(e) =>
              setProduct({
                ...product,
                shelfLife: {
                  ...product.shelfLife,
                  unit: e.target.value,
                },
              })
            }
            className="bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 rounded-md outline-none"
          >
            <option value="Year">Year</option>
          </select>
        </div>

        {/* Target Crops */}
        <div className="mb-3">
          <label className="text-pink-500 mb-1 block">Target Crops</label>
          <input
            type="text"
            value={product.targetCrops}
            onChange={(e) =>
              setProduct({
                ...product,
                targetCrops: e.target.value,
              })
            }
            placeholder="Enter or select target crops"
            className="bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300"
            list="targetCropsOptions"
          />
          <datalist id="targetCropsOptions">
            {[
              "Fruits",
              "All Crops",
              "Vegetables",
              "Plant Based",
              "Grapes, All type of Fruit Crops",
            ].map((option, index) => (
              <option key={index} value={option} />
            ))}
          </datalist>
        </div>

        {/* Usage/Application */}
        <div className="mb-3">
          <label className="text-pink-500 mb-1 block">Usage/Application</label>
          <input
            type="text"
            value={product.usageApplication}
            onChange={(e) =>
              setProduct({
                ...product,
                usageApplication: e.target.value,
              })
            }
            placeholder="Enter or select usage/application"
            className="bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300"
            list="usageApplicationOptions"
          />
          <datalist id="usageApplicationOptions">
            {[
              "Agriculture",
              "Correcting potassium deficiencies",
              "Soil",
              "Spray-100Gm For 200 Ltr. Water, Drip -500gm Per Acre",
              "500gm To 01 Kg Per Acre",
              "Agriculture & Garden",
              "Agriculture use",
              "Spray",
              "Managing plant diseases",
              "Drip & Spray",
              "Correcting sulfur deficiencies",
              "Plant Nurseries",
              "Potting Mix",
              "Improving crop yield and quality",
              "Write your own",
            ].map((option, index) => (
              <option key={index} value={option} />
            ))}
          </datalist>
        </div>

        {/* Country of Origin */}
        <div className="mb-3">
          <label className="text-pink-500 mb-1 block">Country of Origin</label>
          <select
            value={product.countryOfOrigin}
            onChange={(e) =>
              setProduct({
                ...product,
                countryOfOrigin: e.target.value,
              })
            }
            className="bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 w-96 rounded-md outline-none"
          >
            <option value="">Select Country of Origin</option>
            <option value="Made in India">Made in India</option>
            {/* Add more options as needed */}
          </select>
        </div>

        {/* PH Value */}
        <div className="mb-3">
          <label className="text-pink-500 mb-1 block">PH Value</label>
          <input
            type="text"
            value={product.phValue}
            onChange={(e) =>
              setProduct({
                ...product,
                phValue: e.target.value,
              })
            }
            placeholder="Enter or select PH value"
            className="bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300"
            list="phValueOptions"
          />
          <datalist id="phValueOptions">
            {["6-7", "3.08", "6.5", "9.5"].map((option, index) => (
              <option key={index} value={option} />
            ))}
          </datalist>
        </div>

        {/* Water Soluble */}
        <div className="mb-3">
          <label className="text-pink-500 mb-1 block">Water Soluble</label>
          <select
            value={product.waterSoluble}
            onChange={(e) =>
              setProduct({
                ...product,
                waterSoluble: e.target.value,
              })
            }
            className="w-full px-2 py-2 text-pink-300 bg-pink-50 border border-pink-200 rounded-md outline-none"
          >
            <option value="">Select an option</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        {/* Organic */}
        <div className="mb-3">
          <label className="text-pink-500 mb-1 block">Organic</label>
          <select
            value={product.organic}
            onChange={(e) =>
              setProduct({
                ...product,
                organic: e.target.value,
              })
            }
            className="w-full px-2 py-2 text-pink-300 bg-pink-50 border border-pink-200 rounded-md outline-none"
          >
            <option value="">Select an option</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        {/* Environment Friendly */}
        <div className="mb-3">
          <label className="text-pink-500 mb-1 block">
            Environment Friendly
          </label>
          <select
            value={product.environmentFriendly}
            onChange={(e) =>
              setProduct({
                ...product,
                environmentFriendly: e.target.value,
              })
            }
            className="w-full px-2 py-2 text-pink-300 bg-pink-50 border border-pink-200 rounded-md outline-none"
          >
            <option value="">Select an option</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        {/* Extraction Method */}
        <div className="mb-3">
          <label className="text-pink-500 mb-1 block">Extraction Method</label>
          <input
            type="text"
            value={product.extractionMethod}
            onChange={(e) =>
              setProduct({
                ...product,
                extractionMethod: e.target.value,
              })
            }
            placeholder="Enter extraction method"
            className="bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300"
          />
        </div>

        {/* NPK Ratio */}
        <div className="mb-3">
          <label className="text-pink-500 mb-1 block">NPK Ratio</label>
          <input
            type="text"
            value={product.npkRatio}
            onChange={(e) =>
              setProduct({
                ...product,
                npkRatio: e.target.value,
              })
            }
            placeholder="Enter or select NPK ratio"
            className="bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300"
            list="npkRatioOptions"
          />
          <datalist id="npkRatioOptions">
            {["19:19:19", "13:40:13"].map((option, index) => (
              <option key={index} value={option} />
            ))}
          </datalist>
        </div>

        {/* Technical Name */}
        <div className="mb-3">
          <label className="text-pink-500 mb-1 block">Technical Name</label>
          <input
            type="text"
            value={product.technicalName}
            onChange={(e) =>
              setProduct({
                ...product,
                technicalName: e.target.value,
              })
            }
            placeholder="Enter or select a technical name"
            className="bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300"
            list="technicalNameOptions"
          />
          <datalist id="technicalNameOptions">
            {[
              "Gibberellic Acid",
              "N-phenylmethyl-1H-purin-6-amine",
              "Botanical Extract",
              "Common English Name",
              "Neem Khali Powder",
              "Or write your Own",
            ].map((option, index) => (
              <option key={index} value={option} />
            ))}
          </datalist>
        </div>

        {/* Chemical Formula */}
        <div className="mb-3">
          <label className="text-pink-500 mb-1 block">Chemical Formula</label>
          <input
            type="text"
            value={product.chemicalFormula}
            onChange={(e) =>
              setProduct({
                ...product,
                chemicalFormula: e.target.value,
              })
            }
            placeholder="Enter or select a chemical formula"
            className="bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300"
            list="chemicalFormulaOptions"
          />
          <datalist id="chemicalFormulaOptions">
            {["C12,H11,N5", "KOH", "Manganese", "12%"].map((option, index) => (
              <option key={index} value={option} />
            ))}
          </datalist>
        </div>

        {/* CAS No */}
        <div className="mb-3">
          <label className="text-pink-500 mb-1 block">CAS No</label>
          <input
            type="text"
            value={product.casNo}
            onChange={(e) =>
              setProduct({
                ...product,
                casNo: e.target.value,
              })
            }
            placeholder="Enter CAS number"
            className="bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300"
          />
        </div>

        {/* Add Product Button */}
        <div className="mb-3">
          <button
            onClick={addProductFunction}
            type="button"
            className="bg-pink-500 hover:bg-pink-600 w-full text-white text-center py-2 font-bold rounded-md"
          >
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProductPage;
