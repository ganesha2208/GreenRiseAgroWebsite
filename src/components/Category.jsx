import React from "react";
import { useNavigate } from "react-router";
import "../components/css/Category.css";
import agriculture_fertilizer_photo from "../assets/agriculture_fertilizer_photo.webp";
import plant_growth_regulatoe_photo from "../assets/Plant Growth Regulator.webp";
import Micronutrient_Fertilizer_photo from "../assets/micronutrient_fertilizer_img.webp";
import Seaweed_Extract_Products_photo from "../assets/seaweed-extract-product_img.webp";
import Organic_Fertilizer_and_Manure_photo from "../assets/Organic Fertilizer and Manure.webp";
import Humic_Acid_Products_photo from "../assets/Humic Acid Products.webp";
import Neem_Powder_photo from "../assets/plant_growth_img.webp";
import Caustic_Soda_Flakes_photo from "../assets/Caustic Soda Flakes.webp";
import Potash_with_Silica_photo from "../assets/Potash_with_Silica_photo.webp";
import Organic_Bio_Fertilizer_photo from "../assets/Organic Bio Fertilizer.webp";
import Ph_Balancer_photo from "../assets/Ph Balancer.webp";
import Zinc_Fertilizers_photo from "../assets/Zinc Fertilizers.webp";
import Magnesium_Sulphate_photo from "../assets/Magnesium Sulphate.webp";
import Precipitated_Silica_photo from "../assets/Precipitated Silica.webp";
import Silicon_Spreader_photo from "../assets/Silicon Spreader.webp";
import Neem_Oil_photo from "../assets/Neem Oil.webp";
import Sulphur_Powder_photo from "../assets/Sulphur Powder.webp";
import Silicon_Powder_photo from "../assets/Silicon Powder.webp";
import Humic_Amino_Shiny_Ballas_photo from "../assets/Humic Amino Shiny Ballas.webp";
import Water_Soluble_Fertiliser_photo from "../assets/Water Soluble Fertiliser.webp";
import Roasted_Bentonite_Granules_photo from "../assets/Roasted Bentonite Granules.webp";
import Bonemeal_Organic_Fertilizer_photo from "../assets/Bonemeal Organic Fertilizer.webp";
import Amino_Acid_photo from "../assets/Amino Acid.webp";
import Potassium_Humate_photo from "../assets/Potassium Humate.webp";
import Fluvic_Acid_photo from "../assets/Fulvic Acid.webp";
import Coconut_Coir_Dust_photo from "../assets/Coconut Coir Dust.webp";
import Copper_Sulphate_photo from "../assets/Copper Sulphate.webp";
// Correctly link image sources in the category array
const category = [
  {
    image: agriculture_fertilizer_photo,
    name: "Agriculture Fertilizer",
  },
  {
    image: plant_growth_regulatoe_photo,
    name: "Plant Growth Regulator",
  },
  {
    image: Micronutrient_Fertilizer_photo,
    name: "Micronutrient Fertilizer",
  },
  {
    image: Organic_Fertilizer_and_Manure_photo,
    name: "Organic Fertilizer and Manure",
  },
  {
    image: Seaweed_Extract_Products_photo,
    name: "Seaweed Extract Products",
  },
  {
    image: Humic_Acid_Products_photo,
    name: "Humic Acid Products",
  },
  {
    image: Neem_Powder_photo,
    name: "Neem Powder",
  },
  {
    image: Caustic_Soda_Flakes_photo,
    name: "Caustic Soda Flakes",
  },
  {
    image: Potash_with_Silica_photo,
    name: "Potash with Silica",
  },
  {
    image: Organic_Bio_Fertilizer_photo,
    name: "Organic Bio Fertilizer",
  },
  {
    image: Ph_Balancer_photo,
    name: "Ph Balancer",
  },
  {
    image: Zinc_Fertilizers_photo,
    name: "Zinc Fertilizers",
  },
  {
    image: Magnesium_Sulphate_photo,
    name: "Magnesium Sulphate",
  },
  {
    image: Precipitated_Silica_photo,
    name: "Precipitated Silica",
  },
  {
    image: Silicon_Spreader_photo,
    name: "Silicon Spreader",
  },
  {
    image: Neem_Oil_photo,
    name: "Neem Oil",
  },
  {
    image: Sulphur_Powder_photo,
    name: "Sulphur Powder",
  },
  {
    image: Silicon_Powder_photo,
    name: "Silicon Powder",
  },
  {
    image: Humic_Amino_Shiny_Ballas_photo,
    name: "Humic Amino Shiny Ballas",
  },
  {
    image: Water_Soluble_Fertiliser_photo,
    name: "Water Soluble Fertiliser",
  },
  {
    image: Roasted_Bentonite_Granules_photo,
    name: "Roasted Bentonite Granules",
  },
  {
    image: Bonemeal_Organic_Fertilizer_photo,
    name: "Bonemeal Organic Fertilizer",
  },
  {
    image: Amino_Acid_photo,
    name: "Amino Acid",
  },
  {
    image: Potassium_Humate_photo,
    name: "Potassium Humate",
  },
  {
    image: Fluvic_Acid_photo,
    name: "Fulvic Acid",
  },
  {
    image: Coconut_Coir_Dust_photo,
    name: "Coconut Coir Dust",
  },
  {
    image: Copper_Sulphate_photo,
    name: "Copper Sulphate",
  },
];

const Category = () => {
  const navigate = useNavigate();

  console.log();

  return (
    <div className="flex flex-col sm:mt-5 mt-0 mx-2">
      <div className="flex overflow-x-auto lg:justify-start hide-scroll-bar">
        <div className="flex space-x-5">
          {category.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                onClick={() => navigate(`/category/${item.name}`)}
                className="w-16 h-16 lg:w-24 lg:h-24 rounded-full bg-grey 150 transition-all hover:bg-[#0B5D44] cursor-pointer flex items-center justify-center shadow-md"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 lg:w-20 lg:h-20 object-cover rounded-full"
                />
              </div>
              <h1 className="text-sm lg:text-lg text-center font-medium title-font mt-2">
                {item.name}
              </h1>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Scrollbar Style */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          .hide-scroll-bar {
            -ms-overflow-style: none; /* IE and Edge */
            scrollbar-width: none; /* Firefox */
          }
          .hide-scroll-bar::-webkit-scrollbar {
            display: none; /* Chrome, Safari */
          }
      `,
        }}
      />
    </div>
  );
};

export default Category;
