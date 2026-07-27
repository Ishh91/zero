import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ParticleBackground from '../components/ParticleBackground';
import './ServiceDetail.css';

const DigitalMarketingPage = () => {
  const [activeCard, setActiveCard] = useState(null);
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

  const sections = [
    {
      title: "360° Digital Marketing",
      icon: "fas fa-bullhorn",
      description: "Complete digital marketing solutions including SEO, social media, paid ads, and content strategy to grow your brand online.",
      problem: "Many businesses invest in social media, SEO, ads, and content separately. The result is disconnected marketing efforts, inconsistent branding, and poor results.",
      solution: "We build a complete digital marketing ecosystem that works together. Our team handles strategy, content, distribution, optimization, and reporting so your marketing functions as one growth engine instead of separate activities.",
      services: [
        "Social Media Management", "Social Media Marketing", "Performance Marketing",
        "Meta Advertising", "Google Advertising", "Search Engine Optimization (SEO)",
        "Answer Engine Optimization (AEO)", "Generative Engine Optimization (GEO)",
        "Local SEO", "Google Business Profile Optimization", "Email Marketing", "WhatsApp Marketing",
        "Marketing Automation", "Conversion Rate Optimization", "Analytics and Reporting"
      ],
      benefits: [
        "Increased online visibility", "Consistent brand presence", "Better search rankings",
        "More qualified leads", "Higher conversion rates", "Measurable business growth"
      ]
    },
    {
      title: "Content-Led Marketing",
      icon: "fas fa-pen-fancy",
      description: "Strategic content creation that educates, builds trust, and drives real business results.",
      problem: "Many businesses create content regularly but fail to generate engagement, trust, or sales. Most content is created without a clear strategy.",
      solution: "We create content that educates, builds trust, and supports business goals. Every piece of content is designed around your audience, industry, and growth objectives.",
      services: [
        "Content Strategy", "Content Planning", "Content Calendar", "Educational Content",
        "Industry Content", "Founder Content", "Thought Leadership Content", "Content Distribution"
      ],
      benefits: [
        "Stronger brand awareness", "Better audience engagement", "Consistent content pipeline",
        "Improved authority in their industry", "Long-term organic growth"
      ]
    },
    {
      title: "Social Media Growth & Management",
      icon: "fas fa-users",
      description: "Complete social media growth systems that drive real business results, not just likes and followers.",
      problem: "Hiring a social media manager often solves only a small part of the problem. Most managers focus on posting content, scheduling posts, and replying to comments.",
      solution: "We provide a complete social media growth system. Instead of simply managing accounts, we build a strategy that helps social media contribute to business growth.",
      services: [
        "Content Strategy", "Content Creation", "Reels Strategy", "Platform Management",
        "Community Management", "Audience Growth Strategy", "Personal Branding Support",
        "Social Media Advertising", "Performance Tracking"
      ],
      benefits: [
        "Professional social media presence", "Consistent growth", "Better engagement",
        "Stronger brand perception", "More leads and inquiries"
      ]
    },
    {
      title: "Personal Branding",
      icon: "fas fa-user-tie",
      description: "Transform founders and professionals into trusted industry voices through strategic content and positioning.",
      problem: "Today, people trust people more than companies. Many founders, CEOs, doctors, consultants, and business owners have expertise but lack visibility.",
      solution: "We transform founders and professionals into trusted industry voices through strategic content and positioning.",
      services: [
        "Personal Brand Strategy", "Founder Content", "LinkedIn Growth", "Thought Leadership Content",
        "Video Strategy", "Positioning and Messaging", "Reputation Building"
      ],
      benefits: [
        "Increased credibility", "Higher trust", "Industry authority",
        "Better networking opportunities", "More inbound business opportunities"
      ]
    },
    {
      title: "SEO, AEO & GEO",
      icon: "fas fa-search",
      description: "Optimize your digital presence for traditional search engines and emerging AI-driven search platforms.",
      problem: "Most businesses are invisible when customers search online. Many websites receive little traffic because they are not optimized for modern search behavior.",
      solution: "We optimize your digital presence for traditional search engines and emerging AI-driven search platforms.",
      services: [
        "Technical SEO", "On-Page SEO", "Off-Page SEO", "Local SEO", "Keyword Research",
        "Content Optimization", "AEO Optimization", "GEO Optimization", "AI Search Visibility"
      ],
      benefits: [
        "Better rankings", "Increased website traffic", "Improved discoverability",
        "Stronger online authority", "Long-term organic growth"
      ]
    },
    {
      title: "Commercial Production",
      icon: "fas fa-video",
      description: "Premium visual assets that elevate brand perception and improve marketing performance.",
      problem: "Many brands struggle to communicate quality, trust, and professionalism through poor visual content.",
      solution: "We create premium visual assets that elevate brand perception and improve marketing performance.",
      services: [
        "Commercial Shoots", "Product Shoots", "Brand Films", "Corporate Videos",
        "Advertising Creatives", "Campaign Production"
      ],
      benefits: [
        "Premium brand image", "High-quality marketing assets", "Better audience engagement",
        "Improved campaign performance"
      ]
    },
    {
      title: "Documentary & Storytelling Production",
      icon: "fas fa-film",
      description: "Authentic stories that build emotional connections with audiences.",
      problem: "People remember stories more than advertisements. Most businesses fail to communicate their journey, purpose, and impact.",
      solution: "We capture authentic stories that build emotional connections with audiences.",
      services: [
        "Founder Stories", "Startup Stories", "Customer Stories", "Brand Journey Films", "Event Documentaries"
      ],
      benefits: [
        "Stronger emotional connection", "Increased trust", "Authentic brand positioning",
        "Long-term storytelling assets"
      ]
    },
    {
      title: "Content Writing",
      icon: "fas fa-file-alt",
      description: "Strategic content designed to educate, persuade, and convert.",
      problem: "Many businesses struggle to communicate their value clearly. Poor messaging leads to low engagement and lost opportunities.",
      solution: "We create strategic content designed to educate, persuade, and convert.",
      services: [
        "Website Content", "SEO Blogs", "Landing Pages", "Ad Copy",
        "Email Campaigns", "LinkedIn Content", "Video Scripts"
      ],
      benefits: [
        "Clear communication", "Better customer understanding", "Improved SEO performance",
        "Higher conversion rates"
      ]
    }
  ];

  return (
    <div className="service-detail-page">
      <section className="service-detail-hero">
        <ParticleBackground />
        <div className="container">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="hero-content"
          >
            <motion.div variants={itemVariants}>
              <div className="hero-badge">
                <i className="fas fa-bullhorn"></i> Digital Marketing
              </div>
            </motion.div>
            <motion.h1 variants={titleVariants}>
              <span className="gradient-text">360° Digital Marketing</span>
            </motion.h1>
            <motion.h2 variants={itemVariants} className="hero-subtitle">Transform Your Online Presence</motion.h2>
            <motion.p variants={itemVariants} className="hero-description">
              Most businesses don't struggle because of their product or service. They struggle because people don't know they exist, don't trust them enough, or don't remember them when it's time to buy. We help businesses build visibility, authority, and growth through strategic content, data-driven campaigns, and modern technology.
            </motion.p>
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

      <section className="services-cards-section">
        <div className="container">
          <motion.h2
            className="section-title"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-150px" }}
            variants={titleVariants}
          >
            Our Services
          </motion.h2>
          <motion.div
            className="services-cards-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-150px" }}
            variants={containerVariants}
          >
            {sections.map((section, index) => (
              <motion.div
                key={index}
                className={`service-card ${activeCard === index ? 'active' : ''}`}
                variants={itemVariants}
                whileHover={!isMobile ? { y: -10 } : undefined}
              >
                <div className="service-card-icon">
                  <i className={section.icon}></i>
                </div>
                <h3 className="service-card-title">{section.title}</h3>
                <p className="service-card-description">{section.description}</p>

                <motion.div
                  className="service-card-content"
                  initial={false}
                  animate={{ height: activeCard === index ? 'auto' : 0, opacity: activeCard === index ? 1 : 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="service-section">
                    <h4 className="section-subtitle">
                      <i className="fas fa-exclamation-circle"></i> Problem We Solve
                    </h4>
                    <p>{section.problem}</p>
                  </div>

                  <div className="service-section">
                    <h4 className="section-subtitle">
                      <i className="fas fa-lightbulb"></i> How Zero Helps
                    </h4>
                    <p>{section.solution}</p>
                  </div>

                  <div className="service-section">
                    <h4 className="section-subtitle">
                      <i className="fas fa-list-check"></i> Services Included
                    </h4>
                    <div className="tags-grid">
                      {section.services.map((service, i) => (
                        <span key={i} className="tag">{service}</span>
                      ))}
                    </div>
                  </div>

                  <div className="service-section">
                    <h4 className="section-subtitle">
                      <i className="fas fa-gift"></i> What Clients Get
                    </h4>
                    <div className="benefits-list">
                      {section.benefits.map((benefit, i) => (
                        <div key={i} className="benefit-item">
                          <i className="fas fa-check-circle"></i>
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                <button
                  className="see-more-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveCard(activeCard === index ? null : index);
                  }}
                >
                  {activeCard === index ? 'See Less' : 'See More'}
                  <i className={`fas fa-chevron-${activeCard === index ? 'up' : 'down'}`}></i>
                </button>
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
                whileHover={!isMobile ? { y: -5 } : undefined}
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
            <h3>Ready to Transform Your Marketing?</h3>
            <p>Let's build growth systems that take your business from zero visibility to market authority.</p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn btn-primary">
                <i className="fas fa-calendar-check"></i> Book a Consultation
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

export default DigitalMarketingPage;
