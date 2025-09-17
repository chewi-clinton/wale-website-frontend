import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../style/Home.css";
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

const Home = () => {
  const navigate = useNavigate();
  const [customerCount, setCustomerCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const counterRef = useRef(null);
  const [expandedFaq, setExpandedFaq] = useState(null);

  const heroData = {
    title: "WELCOME TO TRIMAXA Pharmacy",
    subtitle: "Your Trusted Partner in Advanced Healthcare Solutions",
    description:
      "Delivering exceptional pharmaceutical care through innovative health solutions, personalized service, and clinical excellence. We specialize in weight management, diabetes care, and comprehensive wellness programs backed by scientific research and professional expertise.",
    heroImage: TrimaxaLogo,
  };

  const partners = [
    { name: "MedTech Solutions", logo: Partner1 },
    { name: "HealthCare Alliance", logo: Partner2 },
    { name: "Pharmaceutical Group", logo: Partner3 },
    { name: "Wellness Partners", logo: Partner4 },
    { name: "Medical Research Corp", logo: Partner5 },
  ];

  const categories = [
    {
      title: "Weight Loss",
      description:
        "Evidence-based solutions for sustainable weight control and metabolism enhancement",
      image: WeightManagement,
      products: "25+ Products",
    },
    {
      title: "Diabetes Supplies",
      description:
        "Comprehensive diabetes management with premium insulin and glucose control systems",
      image: DiabetesCare,
      products: "15+ Products",
    },
    {
      title: "Pain Killers",
      description:
        "Holistic health solutions including nutritional supplements and immune support",
      image: Wellness,
      products: "40+ Products",
    },
  ];

  const reviews = [
    {
      name: "Sarah Johnson",
      rating: 5,
      comment:
        "Exceptional service and high-quality products. TRIMAXA Pharmacy has been instrumental in managing my diabetes effectively.",
      location: "New York, NY",
      image: Review1,
    },
    {
      name: "Michael Chen",
      rating: 5,
      comment:
        "Professional consultation and reliable delivery. Their weight management program exceeded my expectations.",
      location: "Los Angeles, CA",
      image: Review2,
    },
    {
      name: "Emma Rodriguez",
      rating: 4.5,
      comment:
        "Outstanding customer support and premium wellness products. Highly recommend for anyone serious about their health.",
      location: "Chicago, IL",
      image: Review3,
    },
    {
      name: "David Thompson",
      rating: 5,
      comment:
        "The expertise and personalized care I received was remarkable. Their diabetes solutions have improved my quality of life significantly.",
      location: "Houston, TX",
      image: Review4,
    },
  ];

  const experts = [
    {
      name: "Dr. Amanda Mitchell",
      title: "Chief Pharmacist",
      specialization: "Clinical Pharmacy & Diabetes Care",
      image: Expert1,
    },
    {
      name: "Dr. Robert Kim",
      title: "Wellness Specialist",
      specialization: "Nutritional Medicine & Weight Management",
      image: Expert2,
    },
    {
      name: "Dr. Lisa Patterson",
      title: "Research Director",
      specialization: "Pharmaceutical Research & Development",
      image: Expert3,
    },
    {
      name: "Dr. James Wilson",
      title: "Clinical Advisor",
      specialization: "Preventive Medicine & Wellness",
      image: Expert4,
    },
  ];

  const faqs = [
    {
      question: "What makes TRIMAXA Pharmacy different from other pharmacies?",
      answer:
        "We specialize in personalized pharmaceutical care with a focus on weight management, diabetes care, and overall wellness. Our products are research-backed, sourced from certified manufacturers, and supported by clinical expertise.",
    },
    {
      question: "Do you require prescriptions for all products?",
      answer:
        "While some of our specialized medications require prescriptions, we also offer a wide range of over-the-counter supplements and wellness products. Our team can guide you on what's available without a prescription.",
    },
    {
      question: "How do I know if your products are safe and effective?",
      answer:
        "All our products undergo rigorous quality testing and are sourced from reputable, certified suppliers. We follow strict pharmaceutical standards and our products are endorsed by healthcare professionals.",
    },
    {
      question: "Do you offer consultation services?",
      answer:
        "Yes, our experienced clinical team provides professional pharmaceutical guidance and consultation services to help optimize your health outcomes and ensure proper product selection.",
    },
    {
      question: "What is your shipping and delivery policy?",
      answer:
        "We offer fast, secure shipping nationwide. Orders over $75 qualify for free shipping. Most orders are processed within 24-48 hours and delivered within 3-5 business days.",
    },
    {
      question: "Can I return products if I'm not satisfied?",
      answer:
        "We stand behind our products with a satisfaction guarantee. If you're not completely satisfied, contact our customer service team within 30 days for return options.",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            if (
              entry.target.classList.contains("trusted-section") &&
              !hasAnimated
            ) {
              setHasAnimated(true);
              animateCounter();
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    const sections = document.querySelectorAll(
      ".hero-section, .partners-section, .categories-section, .reviews-section, .trusted-section, .experts-section, .faq-section"
    );
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [hasAnimated]);

  const animateCounter = () => {
    const target = 956;
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCustomerCount(target);
        clearInterval(timer);
      } else {
        setCustomerCount(Math.floor(current));
      }
    }, 16);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className="star filled">
          ★
        </span>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" className="star half">
          ★
        </span>
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="star empty">
          ★
        </span>
      );
    }

    return stars;
  };

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const handleShopNow = () => {
    navigate("/products");
  };

  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1>{heroData.title}</h1>
            <h2>{heroData.subtitle}</h2>
            <p>{heroData.description}</p>
            <button className="shop-btn" onClick={handleShopNow}>
              Shop Now
            </button>
          </div>
          <div className="hero-image">
            <img src={heroData.heroImage} alt="TRIMAXA Pharmacy" />
          </div>
        </div>
      </section>

      <section className="partners-section">
        <div className="container">
          <h2>Strategic Alliance Partners</h2>
          <div className="partners-grid">
            {partners.map((partner, index) => (
              <div key={index} className="partner-item">
                <img src={partner.logo} alt={partner.name} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="categories-section">
        <div className="container">
          <h2>Our Specialized Categories</h2>
          <div className="categories-grid">
            {categories.map((category, index) => (
              <div key={index} className="category-card">
                <div className="category-image">
                  <img src={category.image} alt={category.title} />
                  <div className="category-overlay">
                    <span className="product-count">{category.products}</span>
                  </div>
                </div>
                <div className="category-content">
                  <h3>{category.title}</h3>
                  <p>{category.description}</p>
                  <button className="category-btn">Explore Products</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="reviews-section">
        <div className="container">
          <h2>Customer Reviews</h2>
          <div className="reviews-grid">
            {reviews.map((review, index) => (
              <div key={index} className="review-card">
                <div className="review-header">
                  <img src={review.image} alt={review.name} />
                  <div className="reviewer-info">
                    <h4>{review.name}</h4>
                    <p>{review.location}</p>
                    <div className="rating">{renderStars(review.rating)}</div>
                  </div>
                </div>
                <p className="review-comment">"{review.comment}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="trusted-section" ref={counterRef}>
        <div className="container">
          <div className="trusted-content">
            <div className="trusted-number">
              {customerCount.toLocaleString()}+
            </div>
            <h2>Trusted Customers</h2>
            <p>
              Healthcare professionals and patients nationwide trust TRIMAXA
              Pharmacy for their pharmaceutical needs
            </p>
          </div>
        </div>
      </section>

      <section className="experts-section">
        <div className="container">
          <h2>Our Expert Team</h2>
          <div className="experts-grid">
            {experts.map((expert, index) => (
              <div key={index} className="expert-card">
                <div className="expert-image">
                  <img src={expert.image} alt={expert.name} />
                </div>
                <div className="expert-info">
                  <h3>{expert.name}</h3>
                  <h4>{expert.title}</h4>
                  <p>{expert.specialization}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="faq-section">
        <div className="container">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`faq-item ${expandedFaq === index ? "active" : ""}`}
              >
                <div className="faq-question" onClick={() => toggleFaq(index)}>
                  <h3>{faq.question}</h3>
                  <span className="faq-toggle">
                    {expandedFaq === index ? "−" : "+"}
                  </span>
                </div>
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
