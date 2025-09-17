import React from "react";
import "../style/Shop.css";
import TrimaxaLogo from "../assets/Trimaxalogo.png";
import Partner1 from "../assets/Partner1.png";
import Partner2 from "../assets/Partner2.png";
import Partner3 from "../assets/Partner.png";
import Partner4 from "../assets/Partner4.png";
import Partner5 from "../assets/Partner5.png";
import WeightManagement from "../assets/weightmanagement.jpg";
import DiabetesCare from "../assets/Diabetescare.jpg";
import Wellness from "../assets/painkiller.jpg";
import Review1 from "../assets/review1.jpg";
import Review2 from "../assets/review2.jpg";
import Review3 from "../assets/review3.jpg";
import Review4 from "../assets/review4.jpg";
import Expert1 from "../assets/expert1.jpg";
import Expert2 from "../assets/expert2.jpg";
import Expert3 from "../assets/expert3.jpg";
import Expert4 from "../assets/expert4.jpg";

const products = [
  {
    id: 1,
    name: "Dexcom G6 Sensors (3-Pack)",
    brand: "Dexcom",
    oldPrice: 424.86,
    price: 339.89,
    img: TrimaxaLogo,
  },
  {
    id: 2,
    name: "Dexcom G6 Sensors - TWO 3-packs (6 Sensors)",
    brand: "Dexcom",
    oldPrice: 811.1,
    price: 648.88,
    img: Partner1,
  },
  {
    id: 3,
    name: "Dexcom G6 Transmitter",
    brand: "Dexcom",
    oldPrice: 373.36,
    price: 298.69,
    img: Partner2,
  },
  {
    id: 4,
    name: "Dexcom G7 CGM System",
    brand: "Dexcom",
    oldPrice: 141.59,
    price: 119.27,
    img: Partner3,
  },
  {
    id: 5,
    name: "Dexcom G7 CGM System - Pack of 2",
    brand: "Dexcom",
    price: 227.33,
    img: Partner4,
  },
  {
    id: 6,
    name: "Dexcom G7 Receiver Touchscreen CGM System",
    brand: "Dexcom",
    price: 389.99,
    img: Partner5,
  },
  {
    id: 7,
    name: "FreeStyle Libre 14 Day Sensor",
    brand: "FreeStyle",
    price: 98.87,
    img: WeightManagement,
  },
  {
    id: 8,
    name: "FreeStyle Libre 2 Plus Sensor",
    brand: "FreeStyle",
    oldPrice: 128.74,
    price: 109.99,
    img: DiabetesCare,
  },
  {
    id: 9,
    name: "FreeStyle Libre 2 Sensor",
    brand: "FreeStyle",
    img: Wellness,
    price: 120.0,
  },
  {
    id: 10,
    name: "FreeStyle Libre 3 Plus",
    brand: "FreeStyle",
    img: Review1,
    price: 150.0,
  },
  {
    id: 11,
    name: "FreeStyle Libre 3 Sensor",
    brand: "FreeStyle",
    img: Review2,
    price: 130.0,
  },
  {
    id: 12,
    name: "Guardian 4 Sensor",
    brand: "Guardian",
    img: Review3,
    price: 180.0,
  },
];

const ShopPage = () => {
  return (
    <div className="shop-container">
      <h2 className="shop-title">Our Products</h2>
      <div className="products-grid">
        {products.map((item) => (
          <div key={item.id} className="product-card">
            <img src={item.img} alt={item.name} className="product-img" />
            <h3 className="product-name">{item.name}</h3>
            <p className="product-brand">{item.brand}</p>
            <div className="product-price">
              {item.oldPrice && (
                <span className="old-price">${item.oldPrice.toFixed(2)}</span>
              )}
              <span className="new-price">${item.price.toFixed(2)}</span>
            </div>
            <button className="add-to-cart">Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopPage;
