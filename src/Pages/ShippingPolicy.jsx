import React from "react";
import "../style/ShippingPolicy.css";

const ShippingPolicy = () => {
  return (
    <div className="shipping-policy-container">
      <header className="shipping-header">
        <h1>Trimaxa Pharmacy Shipping Policy</h1>
      </header>
      <section className="shipping-section">
        <p>
          At Trimaxa Pharmacy, we are committed to providing a seamless and
          efficient shopping experience from order placement to delivery. We
          prioritize the timely and secure delivery of your health products.
          Below, you’ll find detailed information about our shipping process.
        </p>
      </section>
      <section className="shipping-section">
        <h2>Processing and Handling Time</h2>
        <ul className="shipping-list">
          <li>
            <strong>Order Processing:</strong> Orders are typically processed
            within 1–2 business days after payment confirmation. Orders placed
            on weekends or holidays will be processed the next business day.
          </li>
          <li>
            <strong>Business Hours:</strong> Our customer support team is
            available Monday to Friday, 9:00 AM – 6:00 PM, and Saturday, 10:00
            AM – 4:00 PM . Orders placed during these hours are processed
            promptly.
          </li>
          <li>
            <strong>Order Confirmation:</strong> You will receive an email
            confirmation with your order details and estimated shipping timeline
            after placing your order.
          </li>
        </ul>
      </section>
      <section className="shipping-section">
        <h2>Shipping Methods and Delivery Times</h2>
        <p>We offer the following shipping options:</p>
        <ul className="shipping-list">
          <li>
            <strong>Standard Shipping:</strong> Estimated delivery time: 3–7
            business days. This is the most affordable option and available for
            most orders. And also all our members get free shipping on their
            first order
          </li>
          <li>
            <strong>Expedited Shipping:</strong> Estimated delivery time: 1–3
            business days. Available for faster delivery at an additional cost.
          </li>
        </ul>
        <p>
          Delivery times may vary based on your location, weather conditions, or
          other unforeseen factors. Once shipped, you will receive an email with
          tracking information to monitor your shipment.
        </p>
      </section>
      <section className="shipping-section">
        <h2>Shipping Costs</h2>
        <ul className="shipping-list">
          <li>
            <strong>Free Shipping:</strong> Free standard shipping is available
            on all orders over $35 within the contiguous United States.
          </li>
          <li>
            <strong>Flat Rate Shipping:</strong> For orders under $35, a flat
            rate applies based on your location and chosen shipping method,
            displayed at checkout.
          </li>
        </ul>
      </section>
      <section className="shipping-section">
        <h2>Tracking Your Order</h2>
        <p>
          Once your order is processed and shipped, you will receive an email
          with a tracking number. Use this to monitor your delivery status. If
          you have not received tracking information within 3 business days,
          please contact us at Email: dr@trimaxapharmacy.com or Phone:
          +1-409-209-9501.
        </p>
      </section>
      <section className="shipping-section">
        <h2>Shipping Restrictions</h2>
        <ul className="shipping-list">
          <li>
            <strong>Prescription Medications:</strong> Ensure your prescription
            is valid and up to date. Some prescriptions may require verification
            before shipment.
          </li>
          <li>
            <strong>Weather and Holidays:</strong> Delays may occur during peak
            seasons or extreme weather. Please allow extra time for deliveries
            during these periods.
          </li>
          <li>
            <strong>Incorrect Address:</strong> Verify your shipping address at
            checkout. We are not responsible for delays or lost packages due to
            incorrect information.
          </li>
        </ul>
      </section>
      <section className="shipping-section">
        <h2>Damaged or Lost Packages</h2>
        <p>
          If your package is lost or damaged during transit, contact us
          immediately at Email: dr@trimaxapharmacy.com or Phone:
          +1-409-209-9501. We will investigate with the carrier and may issue a
          replacement or refund based on the circumstances.
        </p>
        <ul className="shipping-list">
          <li>
            <strong>Contact Us:</strong> Provide your order number and a
            description of the issue.
          </li>
          <li>
            <strong>Investigation:</strong> We will collaborate with the carrier
            to determine the best resolution.
          </li>
        </ul>
      </section>
      <section className="shipping-section">
        <h2>Addressing Special Requests</h2>
        <p>
          For special shipping requests (e.g., specific delivery times or
          instructions), contact our customer support team at Email:
          dr@trimaxapharmacy.com or Phone: +1-409-209-9501 before placing your
          order. While we cannot guarantee special requests, we will endeavor to
          accommodate your needs.
        </p>
      </section>
      <section className="shipping-section">
        <p>
          We value your business and are dedicated to ensuring your order
          arrives promptly and securely. Thank you for choosing Trimaxa
          Pharmacy, where your health is our priority.
        </p>
      </section>
    </div>
  );
};

export default ShippingPolicy;
