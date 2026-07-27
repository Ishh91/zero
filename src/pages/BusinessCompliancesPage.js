import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Floating3D from '../components/Floating3D';
import './ServiceDetail.css';

const BusinessCompliancesPage = () => {
  const [isMobile, setIsMobile] = React.useState(
    typeof window !== 'undefined' && window.innerWidth < 768
  );

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isMobile ? 0.12 : 0.18,
        delayChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: isMobile ? 40 : 80 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: isMobile ? 0.7 : 1.0,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: isMobile ? 35 : 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: isMobile ? 0.8 : 1.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const scaleVariants = {
    hidden: { opacity: 0, scale: 0.92 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: isMobile ? 0.75 : 1.0,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const features = [
    "Legal Compliance Audit",
    "Regulatory Reporting",
    "Documentation Management",
    "Audit Support Services",
    "Risk Assessment & Management",
    "Compliance Training Programs"
  ];

  return (
    <div className="service-detail-page">
      <section className="service-detail-hero">
        <Floating3D />
        <div className="container">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="hero-content"
          >
            <motion.div variants={itemVariants}>
              <div className="hero-badge">
                <i className="fas fa-file-contract"></i> Business Compliances
              </div>
            </motion.div>
            <motion.h1 variants={titleVariants}>
              <span className="gradient-text">Business Compliances</span>
            </motion.h1>
            <motion.h2 variants={itemVariants} className="hero-subtitle">Stay Compliant, Stay Secure</motion.h2>
            <motion.p variants={itemVariants} className="hero-description">
              Ensure your business meets all legal and regulatory requirements with our comprehensive compliance services.
            </motion.p>
            <motion.div variants={itemVariants} className="hero-buttons">
              <Link to="/contact" className="btn btn-primary">
                <i className="fas fa-calendar-check"></i> Start Your Journey
              </Link>
              <Link to="/work" className="btn btn-secondary">
                <i className="fas fa-play-circle"></i> See Our Work
              </Link>
            </motion.div>
          </motion.div>
        </div>
        <motion.div
          className="scroll-indicator"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <i className="fas fa-chevron-down"></i>
        </motion.div>
      </section>

      <section className="service-detail-content">
        <div className="container">
          <div className="service-content-grid">
            <motion.div
              className="service-info-block"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-150px" }}
              variants={containerVariants}
            >
              <motion.h2 variants={titleVariants}>Stay Compliant, Stay Secure</motion.h2>
              <motion.p variants={itemVariants}>
                Navigating the complex world of business regulations can be challenging.
                Our compliance services help you understand and meet all legal requirements
                so you can focus on growing your business.
              </motion.p>
              <motion.p variants={itemVariants}>
                We provide comprehensive support to ensure your operations are always
                in line with the latest laws and regulations.
              </motion.p>
              <div className="service-features-grid">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="service-feature-item"
                    variants={itemVariants}
                  >
                    <i className="fas fa-check-circle"></i>
                    <span>{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="service-cta-box"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-150px" }}
              variants={scaleVariants}
            >
              <h3>Need Compliance Support?</h3>
              <p>
                Let's ensure your business is fully compliant with all relevant
                regulations and standards.
              </p>
              <Link to="/contact" className="btn-primary-large">
                Get Started <i className="fas fa-arrow-right"></i>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="why-choose-us-section">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-150px" }}
            variants={containerVariants}
            className="why-choose-us-header"
          >
            <motion.div variants={itemVariants}>
              <div className="hero-badge">
                <i className="fas fa-rocket"></i> Why Choose Us
              </div>
              <h2>Why Businesses Choose <span className="gradient-text">Zero By Cineviv</span></h2>
            </motion.div>
          </motion.div>

          <motion.div
            className="why-choose-us-features"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-150px" }}
            variants={containerVariants}
          >
            {[
              {
                icon: "fas fa-playbook",
                title: "Because \"brand\" means something different depending on who you are — and we don't force one playbook onto both.",
                desc: "A startup or a hospital needs a system that generates leads and survives an audit. A personal brand needs a story people trust enough to act on. Same four systems — CREATE, BUILD, GROW, REGISTER — built differently depending on which one you are. We don't hand a founder a creator's playbook, or hand a creator a compliance-heavy pitch deck."
              },
              {
                icon: "fas fa-users-cog",
                title: "One team. Every discipline.",
                desc: "Strategy, content, design, growth, and compliance — under one roof, one plan, one person accountable. Whether you're a business or an individual, no handoffs between three vendors who've never spoken to each other."
              },
              {
                icon: "fas fa-person-rays",
                title: "We build the person, the brand, and the business — in that order.",
                desc: "For a founder, that's you before your company. For a creator, that's you before your following. For a hospital or a hotel, that's the people behind the name before the campaigns start. Because a brand without a person behind it doesn't last. And a business without a brand behind it doesn't grow."
              },
              {
                icon: "fas fa-unlock",
                title: "No lock-in you can't explain.",
                desc: "We earn the next month by what we deliver in this one — not by a 12-month contract you signed on day one."
              },
              {
                icon: "fas fa-check-circle",
                title: "Proof before promises, on both sides.",
                desc: "A creator account that went from 60k to 236k followers while spending less on ads. A hospital's local search presence rebuilt from the ground up. Different playbooks, same discipline: results you can check, not just claims you have to trust."
              },
              {
                icon: "fas fa-location-dot",
                title: "Built for your city, not copied from a case study that isn't yours.",
                desc: "Every strategy is shaped by your category, your competitors, your customer — not a generic playbook borrowed from a metro brand or someone else's audience."
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                className="why-feature-card"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="why-feature-icon">
                  <i className={feature.icon}></i>
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-150px" }}
            variants={scaleVariants}
            className="why-choose-us-cta"
          >
            <h3>Ready to Ensure Full Compliance?</h3>
            <p>Let's make sure your business meets all regulatory requirements and stays secure.</p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn btn-primary">
                <i className="fas fa-calendar-check"></i> Get Started
              </Link>
              <Link to="/work" className="btn btn-secondary">
                <i className="fas fa-play-circle"></i> See Our Work
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default BusinessCompliancesPage;
