import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './AboutPage.css';

const AboutPage = () => {
  const [isMobile, setIsMobile] = React.useState(
    typeof window !== 'undefined' && window.innerWidth < 768
  );

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const values = [
    {
      icon: "fas fa-bullseye",
      title: "Strategic Excellence",
      description: "Every decision is backed by data and strategic thinking."
    },
    {
      icon: "fas fa-palette",
      title: "Creative Innovation",
      description: "Pushing boundaries with cutting-edge creative solutions."
    },
    {
      icon: "fas fa-chart-line",
      title: "Data-Driven Results",
      description: "Measurable outcomes through analytical optimization."
    },
    {
      icon: "fas fa-handshake",
      title: "Partnership First",
      description: "We grow alongside our clients as true partners."
    }
  ];
  
  const milestones = [
    { year: "2020", title: "Company Founded", description: "Started with a vision to transform digital marketing" },
    { year: "2021", title: "First Major Campaign", description: "Reached 10M+ views for luxury fashion brand" },
    { year: "2022", title: "Studio Launch", description: "Opened our 5000 sq ft production studio" },
    { year: "2023", title: "100+ Campaigns", description: "Completed over 100 successful campaigns" },
    { year: "2024", title: "Global Expansion", description: "Expanded services to international markets" }
  ];

  // Animation variants (same as HomePage)
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
  
  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="container">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.h1 variants={titleVariants}>About ZERO BY CINEVIV</motion.h1>
            <motion.p variants={itemVariants}>We don't just create content. We engineer attention.</motion.p>
          </motion.div>
        </div>
      </section>
      
      <section className="about-story">
        <div className="container">
          <motion.div
            className="story-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-150px" }}
            variants={containerVariants}
          >
            <motion.div
              className="story-content"
              variants={itemVariants}
            >
              <span className="story-badge">Our Story</span>
              <h2>Content-Led Marketing Reimagined</h2>
              <p>ZERO BY CINEVIV was born from a simple insight: traditional marketing agencies focus on channels, not attention. We built an agency that puts content at the center of everything we do.</p>
              <p>Today, we're a team of strategists, creators, and technologists helping brands build meaningful connections through cinematic storytelling and data-driven performance marketing.</p>
              <Link to="/contact" className="btn btn-primary">Work With Us →</Link>
            </motion.div>
            
            <motion.div
              className="story-stats"
              variants={containerVariants}
            >
              {[
                { number: "200+", label: "Campaigns Delivered" },
                { number: "50+", label: "Happy Clients" },
                { number: "500M+", label: "Views Generated" },
                { number: "8+", label: "Industry Awards" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="stat-item"
                  variants={itemVariants}
                  transition={{ delay: index * 0.15 }}
                >
                  <h3>{stat.number}</h3>
                  <p>{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      <section className="values-section">
        <div className="container">
          <motion.h2
            className="section-title"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-150px" }}
            variants={titleVariants}
          >Our Core Values</motion.h2>
          <motion.div
            className="values-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-150px" }}
            variants={containerVariants}
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="value-card"
                variants={itemVariants}
              >
                <div className="value-icon">
                  <i className={value.icon}></i>
                </div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      <section className="milestones-section">
        <div className="container">
          <motion.h2
            className="section-title"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-150px" }}
            variants={titleVariants}
          >Our Journey</motion.h2>
          <motion.div
            className="timeline"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-150px" }}
            variants={containerVariants}
          >
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                className="timeline-item"
                variants={itemVariants}
              >
                <div className="timeline-year">{milestone.year}</div>
                <div className="timeline-content">
                  <h3>{milestone.title}</h3>
                  <p>{milestone.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      <section className="about-cta">
        <div className="container">
          <motion.div
            className="cta-content"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-150px" }}
            variants={scaleVariants}
          >
            <h2>Ready to Write Your Success Story?</h2>
            <p>Let's create something extraordinary together.</p>
            <Link to="/contact" className="btn btn-primary">Start Your Journey →</Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;