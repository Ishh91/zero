import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Floating3D from '../components/Floating3D';
import './ServicesPage.css';
import '../pages/ServiceDetail.css';

const ServicesPage = () => {
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

  const services = [
    {
      icon: "fas fa-bullhorn",
      title: "360 Digital Marketing",
      description: "Complete digital marketing solutions including SEO, social media, paid ads, and content strategy to grow your brand online.",
      features: ["SEO Optimization", "Social Media Marketing", "Paid Advertising", "Content Strategy", "Email Marketing"],
      path: "/services/digital-marketing"
    },
    {
      icon: "fas fa-code",
      title: "Website and App Development",
      description: "Custom, responsive websites and mobile applications built with modern technologies for optimal performance and user experience.",
      features: ["Web Design", "Mobile Apps", "E-commerce", "CMS Development", "Maintenance"],
      path: "/services/web-app-development"
    },
    {
      icon: "fas fa-robot",
      title: "AI & AI Agents",
      description: "Harness the power of artificial intelligence with custom AI solutions, chatbots, and intelligent agents to automate your business.",
      features: ["Custom AI Solutions", "Chatbots", "AI Agents", "Automation", "AI Consulting"],
      path: "/services/ai-agents"
    },
    {
      icon: "fas fa-file-contract",
      title: "Business Compliances",
      description: "Ensure your business meets all legal and regulatory requirements with our comprehensive compliance services.",
      features: ["Legal Compliance", "Regulatory Reporting", "Documentation", "Audit Support", "Risk Management"],
      path: "/services/business-compliances"
    },
    {
      icon: "fas fa-rocket",
      title: "Startup Foundation",
      description: "Launch your startup with confidence - from incorporation to business planning and initial setup, we've got you covered.",
      features: ["Company Incorporation", "Business Planning", "Legal Setup", "Brand Registration", "Startup Consulting"],
      path: "/services/startup-foundation"
    }
  ];

  return (
    <div className="services-page">
      <section className="services-hero">
        <Floating3D />
        <div className="container">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.h1 variants={titleVariants}>Our Services</motion.h1>
            <motion.p variants={itemVariants}>Comprehensive solutions for modern brand growth</motion.p>
          </motion.div>
        </div>
      </section>

      <section className="services-grid-section">
        <div className="container">
          <motion.div
            className="services-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-150px" }}
            variants={containerVariants}
          >
            {services.map((service, index) => (
              <Link to={service.path} key={index} style={{textDecoration: 'none'}}>
                <motion.div
                  className="service-card"
                  variants={itemVariants}
                  whileHover={{ y: -10 }}
                >
                  <div className="service-icon">
                    <i className={service.icon}></i>
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <div className="service-features">
                    {service.features.map((feature, i) => (
                      <span key={i} className="feature-tag">{feature}</span>
                    ))}
                  </div>
                  <div className="service-card-link">
                    Learn More <i className="fas fa-arrow-right"></i>
                  </div>
                </motion.div>
              </Link>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="process-section">
        <div className="container">
          <motion.h2
            className="section-title"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-150px" }}
            variants={titleVariants}
          >How We Work</motion.h2>
          <motion.div
            className="process-steps"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-150px" }}
            variants={containerVariants}
          >
            {[
              { step: "01", title: "Discovery", desc: "Understanding brand vision and market positioning" },
              { step: "02", title: "Strategy", desc: "Planning content strategy and marketing roadmap" },
              { step: "03", title: "Production", desc: "Creative direction and premium content creation" },
              { step: "04", title: "Distribution", desc: "Multi-platform publishing and engagement" },
              { step: "05", title: "Performance", desc: "Analytics, optimization, and scaling" }
            ].map((step, index) => (
              <motion.div
                key={index}
                className="process-step"
                variants={itemVariants}
              >
                <div className="step-number">{step.step}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
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
              <h2>Why Businesses Choose <span className="gradient-text">ZERO BY CINEVIV</span></h2>
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
                description: "A startup or a hospital needs a system that generates leads and survives an audit. A personal brand needs a story people trust enough to act on. Same four systems — CREATE, BUILD, GROW, REGISTER — built differently depending on which one you are. We don't hand a founder a creator's playbook, or hand a creator a compliance-heavy pitch deck."
              },
              {
                icon: "fas fa-users-cog",
                title: "One team. Every discipline.",
                description: "Strategy, content, design, growth, and compliance — under one roof, one plan, one person accountable. Whether you're a business or an individual, no handoffs between three vendors who've never spoken to each other."
              },
              {
                icon: "fas fa-person-rays",
                title: "We build the person, the brand, and the business — in that order.",
                description: "For a founder, that's you before your company. For a creator, that's you before your following. For a hospital or a hotel, that's the people behind the name before the campaigns start. Because a brand without a person behind it doesn't last. And a business without a brand behind it doesn't grow."
              },
              {
                icon: "fas fa-unlock",
                title: "No lock-in you can't explain.",
                description: "We earn the next month by what we deliver in this one — not by a 12-month contract you signed on day one."
              },
              {
                icon: "fas fa-check-circle",
                title: "Proof before promises, on both sides.",
                description: "A creator account that went from 60k to 236k followers while spending less on ads. A hospital's local search presence rebuilt from the ground up. Different playbooks, same discipline: results you can check, not just claims you have to trust."
              },
              {
                icon: "fas fa-location-dot",
                title: "Built for your city, not copied from a case study that isn't yours.",
                description: "Every strategy is shaped by your category, your competitors, your customer — not a generic playbook borrowed from a metro brand or someone else's audience."
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
                <p>{feature.description}</p>
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
            <h3>Ready to Scale Your Brand?</h3>
            <p>Let's create a custom strategy and choose the perfect services for your business growth.</p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn btn-primary">
                <i className="fas fa-calendar-check"></i> Get Started
              </Link>
              <Link to="/work" className="btn btn-secondary">
                <i className="fas fa-play-circle"></i> View Our Work
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;