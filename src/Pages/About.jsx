import React from "react";
import "../style/About.css";
import aboutImage1 from "../assets/Trimaxalogo.png";
import aboutImage2 from "../assets/image2.png";
import aboutImage3 from "../assets/image5.png";
import aboutImage4 from "../assets/image4.png";
import diabetesimg from "../assets/image3.png";

const AboutPage = () => {
  const sections = [
    {
      title: "Our Mission",
      content:
        "Trimaxa Pharmacy is dedicated to delivering exceptional pharmaceutical care through high-quality medications and innovative health solutions. We prioritize personalized service and clinical excellence, ensuring every patient receives comprehensive support tailored to their unique health requirements.",
      image: aboutImage1,
      reverse: false,
    },
    {
      title: "Our Heritage",
      content:
        "Established in 2010, Prime Time Pharmacy has transformed from a community-focused establishment into a premier healthcare provider offering comprehensive pharmaceutical services. Our sustained commitment to innovation, patient safety, and clinical excellence has positioned us as a trusted leader in modern healthcare delivery.",
      image: aboutImage2,
      reverse: true,
    },
    {
      title: "Weight Management Solutions",
      content:
        "Our evidence-based weight management programs feature clinically formulated supplements designed to support healthy metabolism and sustainable weight control. Each product undergoes rigorous quality testing to ensure optimal efficacy and safety for long-term wellness outcomes.",
      image: aboutImage1,
      reverse: false,
    },
    {
      title: "Diabetes Care Excellence",
      content:
        "We provide comprehensive diabetes management solutions including premium insulin therapies and advanced glucose monitoring systems. Our specialized approach empowers patients with the tools and knowledge necessary for effective blood sugar control and improved quality of life.",
      image: diabetesimg,
      reverse: true,
    },
    {
      title: "Comprehensive Wellness",
      content:
        "Our holistic wellness portfolio encompasses targeted nutritional supplements, immune system enhancers, and cognitive support formulations. Each product is scientifically formulated to address specific health objectives while promoting overall vitality and well-being.",
      image: aboutImage3,
      reverse: false,
    },
  ];

  const advantages = [
    {
      title: "Individualized Care",
      description:
        "Customized pharmaceutical solutions designed to meet specific patient needs across diverse therapeutic areas.",
    },
    {
      title: "Scientific Excellence",
      description:
        "Evidence-based product selection sourced from certified manufacturers with rigorous quality assurance protocols.",
    },
    {
      title: "Accessible Healthcare",
      description:
        "Cost-effective pharmaceutical solutions that maintain the highest standards of quality and therapeutic effectiveness.",
    },
    {
      title: "Professional Endorsement",
      description:
        "Trusted by healthcare practitioners who recognize our commitment to pharmaceutical excellence and patient outcomes.",
    },
    {
      title: "Expert Consultation",
      description:
        "Professional pharmaceutical guidance provided by experienced clinicians dedicated to optimizing your health journey.",
    },
  ];

  return (
    <div className="about-container">
      <header className="about-header">
        <h1>Prime Time Pharmacy</h1>
        <p>
          Advanced pharmaceutical care dedicated to excellence in health
          outcomes and patient satisfaction.
        </p>
      </header>

      {sections.map((section, index) => (
        <section
          key={index}
          className={`about-section ${section.reverse ? "reverse" : ""}`}
        >
          <div className="about-text">
            <h2>{section.title}</h2>
            <p>{section.content}</p>
          </div>
          <div className="about-image">
            <img src={section.image} alt={section.title} />
          </div>
        </section>
      ))}

      <section className="about-section">
        <div className="about-text">
          <h2>Our Core Specializations</h2>
          <p>
            Prime Time Pharmacy delivers specialized pharmaceutical services
            across three essential healthcare domains, providing
            precision-targeted solutions that address critical health management
            requirements.
          </p>
        </div>
      </section>

      <section className="about-section reverse">
        <div className="about-text">
          <h2>The Prime Time Advantage</h2>
          <p>
            As your strategic healthcare partner, we transcend traditional
            pharmaceutical services by delivering comprehensive solutions backed
            by clinical expertise and unwavering commitment to patient outcomes.
          </p>
          <div className="advantages-grid">
            {advantages.map((advantage, index) => (
              <div key={index} className="advantage-item">
                <h4>{advantage.title}</h4>
                <p>{advantage.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="about-image">
          <img src={aboutImage4} alt="Prime Time Advantage" />
        </div>
      </section>

      <section className="about-section">
        <div className="about-text">
          <h2>Our Commitment</h2>
          <p>
            Prime Time Pharmacy stands as a premier USA-based pharmaceutical
            institution dedicated to advancing accessible healthcare through
            innovative solutions. Our specialized focus encompasses weight
            management, diabetes care, and comprehensive wellness programs, all
            underpinned by rigorous scientific research and clinical validation.
            We are committed to empowering patients with superior pharmaceutical
            products and expert guidance, ensuring optimal health outcomes
            through every stage of your wellness journey.
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
