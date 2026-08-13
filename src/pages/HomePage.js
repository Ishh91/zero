import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import Hero from '../components/Hero';
import ReelShowcase from '../components/ReelShowcase';
import PersonalBranding from '../components/PersonalBranding';
import FAQ from '../components/FAQ';
import ParticleBackground from '../components/ParticleBackground';
import SectionParticleBackground from '../components/SectionParticleBackground';
import './HomePage.css';
import './TeamPage.css';
import '../components/PersonalBranding.css';
import '../components/FAQ.css';

const DEFAULT_TEAM = [
  {
    _id: "6a41405907138ed5c91cc663",
    name: "Tushar",
    role: "Founder & Creative Director",
    bio: "Leading brand strategy, creative direction, and marketing vision with over a decade of experience in building digital brands.",
    expertise: ["Brand Strategy", "Creative Direction", "Marketing Vision", "Client Communication"],
    imageUrl: "https://res.cloudinary.com/drzsxgadl/image/upload/v1782663962/zero-cineviv/team/sw5uup0yqwufkqehfpxk.jpg",
    socialLinks: { linkedin: "#", instagram: "#", twitter: "#" }
  },
  {
    _id: "6a41405907138ed5c91cc664",
    name: "Shanviv Rudra",
    role: "Co-Founder",
    bio: "Expert in content planning, viral strategy, and audience psychology. Creates content systems that build attention and trust.",
    expertise: ["Content Planning", "Viral Strategy", "Audience Psychology", "Social Media Direction"],
    imageUrl: "https://res.cloudinary.com/drzsxgadl/image/upload/v1782664065/zero-cineviv/team/qut9mtqln5l5gebs67uu.jpg",
    socialLinks: { linkedin: "#", instagram: "#", twitter: "#" }
  },
  {
    _id: "6a41405907138ed5c91cc665",
    name: "Ketan Koparkar",
    role: "Cinematic Editor, Creative Producer",
    bio: "Trained at Michigan State University for TV/Movie screenwriting, winning him a 1497 Screenwriting Fellowship. Established channels like Cine Vicchar with over 200k+ followers.",
    expertise: ["Reel Editing", "Cinematic Production", "Color Grading", "Motion Visuals"],
    imageUrl: "https://res.cloudinary.com/drzsxgadl/image/upload/v1782664148/zero-cineviv/team/wzquuteaaoze7lhlapdg.jpg",
    socialLinks: { linkedin: "#", instagram: "#", twitter: "#" }
  }
];

const HomePage = () => {
  const [team, setTeam] = useState(DEFAULT_TEAM);
  const [selectedMember, setSelectedMember] = useState(null);
  const [teamLoading, setTeamLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' && window.innerWidth < 768
  );

  useEffect(() => {
    fetchTeam();
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchTeam = async () => {
    try {
      const response = await axios.get('/team');
      if (response.data && response.data.success && Array.isArray(response.data.data) && response.data.data.length > 0) {
        setTeam(response.data.data);
      }
    } catch (error) {
      console.warn('Using default team data:', error.message);
    }
  };
  const clients = [
    'TechFlow', 'BrandX', 'CreativeHub', 'Digital Motion',
    'Aurora Studio', 'NextGen Media', 'Velocity Brand', 'Pixel Perfect',
    'Premium Co', 'Elite Media', 'Growth Labs', 'Vision Studio'
  ];
  const phases = [
    {
      number: "01",
      title: "Discovery & Brand Intelligence",
      description: "Every successful campaign begins with clarity. We deeply analyze brand positioning, industry landscape, and audience psychology.",
    },
    {
      number: "02",
      title: "Content Architecture",
      description: "We build structured content ecosystems designed to capture attention, educate audiences, and build authority.",
    },
    {
      number: "03",
      title: "Production & Visual Storytelling",
      description: "Turning strategy into high-impact visual content through cinematic storytelling and commercial-grade production.",
    },
    {
      number: "04",
      title: "Post-Production & Optimization",
      description: "Editing content for attention retention and platform performance with fast-paced editing and cinematic transitions.",
    },
    {
      number: "05",
      title: "Distribution & Audience Building",
      description: "Strategic multi-platform distribution ecosystem designed to continuously build brand attention.",
    },
    {
      number: "06",
      title: "Performance Marketing",
      description: "Converting audience attention into measurable business outcomes through integrated performance systems.",
    },
    {
      number: "07",
      title: "Analytics & Scaling",
      description: "Data-driven decision making to continuously optimize growth using performance insights.",
    }
  ];

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

  const mainServices = [
    {
      id: 1,
      name: "360 Digital Marketing",
      icon: "fas fa-bullhorn",
      description: "Complete digital marketing solutions including SEO, social media, paid ads, and content strategy to grow your brand online.",
      path: "/services/digital-marketing"
    },
    {
      id: 2,
      name: "Website and App Development",
      icon: "fas fa-code",
      description: "Custom, responsive websites and mobile applications built with modern technologies for optimal performance and user experience.",
      path: "/services/web-app-development"
    },
    {
      id: 3,
      name: "AI & AI Agents",
      icon: "fas fa-robot",
      description: "Harness the power of artificial intelligence with custom AI solutions, chatbots, and intelligent agents to automate your business.",
      path: "/services/ai-agents"
    },
    {
      id: 4,
      name: "Business Compliances",
      icon: "fas fa-file-contract",
      description: "Ensure your business meets all legal and regulatory requirements with our comprehensive compliance services.",
      path: "/services/business-compliances"
    },
    {
      id: 5,
      name: "Startup Foundation",
      icon: "fas fa-rocket",
      description: "Launch your startup with confidence - from incorporation to business planning and initial setup, we've got you covered.",
      path: "/services/startup-foundation"
    }
  ];

  const milestones = [
    { year: "2020", title: "Company Founded", description: "Started with a vision to transform digital marketing" },
    { year: "2021", title: "First Major Campaign", description: "Reached 10M+ views for luxury fashion brand" },
    { year: "2022", title: "Studio Launch", description: "Opened our 5000 sq ft production studio" },
    { year: "2023", title: "100+ Campaigns", description: "Completed over 100 successful campaigns" },
    { year: "2024", title: "Global Expansion", description: "Expanded services to international markets" }
  ];

  // Close popup on scroll
  useEffect(() => {
    const handleScroll = () => {
      setSelectedMember(null);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const activeMember = selectedMember;

  // Enhanced opraah.in-style Animation Variants with more dynamism
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isMobile ? 0.1 : 0.15,
        delayChildren: 0.1,
        ease: [0.23, 1, 0.32, 1]
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: isMobile ? 50 : 100, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: isMobile ? 0.6 : 0.9,
        ease: [0.23, 1, 0.32, 1]
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: isMobile ? 40 : 70, x: -20 },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: isMobile ? 0.7 : 1.0,
        ease: [0.23, 1, 0.32, 1]
      }
    }
  };

  const scaleVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: isMobile ? 0.7 : 0.95,
        ease: [0.23, 1, 0.32, 1]
      }
    }
  };

  return (
    <div className="home-page">
      <Helmet>
        <title>ZERO BY CINEVIV | Content-Led Marketing Agency</title>
        <meta name="description" content="ZERO BY CINEVIV - Content-Led Marketing Agency. We build attention through strategic content and cinematic storytelling for brands and creators." />
        <meta property="og:url" content="https://zerobycineviv.com/" />
        <meta property="og:title" content="ZERO BY CINEVIV | Content-Led Marketing Agency" />
        <meta property="og:description" content="ZERO BY CINEVIV - Content-Led Marketing Agency. We build attention through strategic content and cinematic storytelling for brands and creators." />
        <meta property="twitter:url" content="https://zerobycineviv.com/" />
        <meta property="twitter:title" content="ZERO BY CINEVIV | Content-Led Marketing Agency" />
        <meta property="twitter:description" content="ZERO BY CINEVIV - Content-Led Marketing Agency. We build attention through strategic content and cinematic storytelling for brands and creators." />
      </Helmet>
      <ParticleBackground />
      <Hero />
      <section className="clients-section">
        <div className="clients-container">
          <motion.h3
            className="clients-heading"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-150px" }}
            variants={titleVariants}
          >
            Trusted by Leading Brands
          </motion.h3>

          <motion.div
            className="clients-slider-wrapper"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-150px" }}
            variants={scaleVariants}
          >
            <div className="clients-slider-track">
              <div className="clients-slider-content">
                {[...clients, ...clients].map((client, idx) => (
                  <div
                    key={idx}
                    className="client-card"
                  >
                    <span>{client}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      <ReelShowcase />
      
      {/* Why Zero Exists Section */}
      <section className="why-zero-section">
        <SectionParticleBackground count={150} color="#ffcc00" />
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-150px" }}
            variants={containerVariants}
            className="why-zero-header"
          >
            <motion.div variants={itemVariants} className="reel-badge">
              <span>Why Zero Exists</span>
            </motion.div>
            
            <motion.h2 variants={titleVariants} className="section-title">
              Every brand starts from <span className="highlight-word">zero</span>. <br />
              We make sure it doesn't stay <span className="highlight-word-2">there</span>.
            </motion.h2>
            
            <motion.p variants={itemVariants} className="reel-subtitle">
              We watched good businesses in tier-2 and tier-3 cities lose to worse competitors — 
              not on product, not on service, but on visibility.
            </motion.p>

            <motion.p variants={itemVariants} className="reel-subtitle">
              The tools that fix that — real content strategy, real tech, real compliance — existed. 
              They just never made it past the metros.
            </motion.p>

            <motion.p variants={itemVariants} className="reel-subtitle">
              So we built Zero to bring them here.
            </motion.p>

            <motion.div variants={scaleVariants} className="reel-cta">
              <Link to="/contact" className="cta-button">
                Book a Free Consulting Call
                <span className="cta-arrow">→</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Closing CTA Section */}
      <section className="closing-cta-section">
        <SectionParticleBackground count={150} color="#ffcc00" />
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-150px" }}
            variants={containerVariants}
            className="closing-cta-header"
          >
           
            
            <motion.h2 variants={titleVariants} className="section-title">
             <span className="highlight-word">Your brand is still at</span> <span className="highlight-word-3">ZERO</span> <span className="highlight-word"> Let's change that</span>
            </motion.h2>
            
            <motion.p variants={itemVariants} className="reel-subtitle">
              One call. One honest look at where you stand. One plan built around you — no obligation.
            </motion.p>
            
            <motion.div variants={scaleVariants} className="reel-cta closing-cta-buttons">
              <Link to="/contact" className="cta-button">
                Book a Free Consulting Call →
              </Link>
              <Link to="/contact" className="cta-button">
                Get a Free Brand Audit
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>


      {/* Personal Branding Section */}
      <PersonalBranding />

      {/* FAQ Section */}
     

      {/* Our Services Section */}
      <section className="our-services-section">
        <div className="container">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-150px" }}
            variants={titleVariants}
            className="section-title"
          >
            Our Services
          </motion.h2>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-150px" }}
            variants={containerVariants}
            className="main-services-grid"
          >
            {mainServices.map((service, index) => (
              <Link to={service.path} key={service.id} style={{ textDecoration: 'none' }}>
                <motion.div
                  variants={itemVariants}
                  className="main-service-card"
                  whileHover={!isMobile ? {
                    y: -15,
                    scale: 1.02,
                    boxShadow: "0 20px 50px rgba(255, 153, 0, 0.12)"
                  } : undefined}
                  whileTap={isMobile ? {
                    scale: 0.98
                  } : undefined}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="service-icon-wrapper">
                    <i className={service.icon}></i>
                  </div>
                  <h3>{service.name}</h3>
                  <p>{service.description}</p>
                  <div className="service-link">
                    Learn More <i className="fas fa-arrow-right"></i>
                  </div>
                </motion.div>
              </Link>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="container">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-150px" }}
            variants={titleVariants}
            className="section-title"
          >
            Our Core Values
          </motion.h2>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-150px" }}
            variants={containerVariants}
            className="values-grid"
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="value-card"
                whileHover={!isMobile ? {
                  y: -15,
                  scale: 1.02,
                  boxShadow: "0 20px 40px rgba(255, 153, 0, 0.15)"
                } : undefined}
                whileTap={isMobile ? {
                  scale: 0.98
                } : undefined}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
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

      {/* Growth Framework */}
      <section id="work" className="framework-section">
        <div className="container">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-150px" }}
            variants={titleVariants}
            className="section-title"
          >
            The ZERO Growth Framework
          </motion.h2>
          <motion.p
            className="framework-subtitle"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-150px" }}
            variants={titleVariants}
          >
            A 7-phase system designed to move brands from visibility to market positioning
          </motion.p>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-150px" }}
            variants={containerVariants}
            className="timeline"
          >
            {phases.map((phase, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`timeline-item ${index % 2 === 0 ? "timeline-left" : "timeline-right"}`}
                whileHover={!isMobile ? {
                  y: -10,
                  scale: 1.02,
                  borderColor: "rgba(255, 153, 0, 0.5)"
                } : undefined}
                whileTap={isMobile ? {
                  scale: 0.98
                } : undefined}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="timeline-dot"></div>
                <div className="phase-card">
                  <div className="phase-number">{phase.number}</div>
                  <h3>{phase.title}</h3>
                  <p>{phase.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-tree-section">
        <SectionParticleBackground count={150} color="#ffaa33" />
        <div className="team-tree-container">
          {teamLoading ? (
            <div className="team-loading">
              <div className="loader"></div>
              <p>Loading our team...</p>
            </div>
          ) : (
            <>
              {/* Header */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-150px" }}
                variants={containerVariants}
              >
                <motion.div variants={itemVariants} className="team-header">
                  <div className="team-badge">
                    <span>Our Tree of Talent</span>
                  </div>
                  <h2 className="team-title">
                    Growing Together
                    <br />
                    <span className="gradient-text">As One Team</span>
                  </h2>
                  <p className="team-subtitle">
                    Like roots of a tree, each member is essential. Click on avatars to discover their expertise.
                    Together, we grow stronger as one creative family.
                  </p>
                </motion.div>
              </motion.div>

              {/* Tree Structure */}
              <motion.div
                className="tree-structure"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-150px" }}
                variants={containerVariants}
              >
                {/* SVG Connectors */}
                <svg className="tree-connectors" viewBox="0 0 1100 800" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#ff9900" stopOpacity="0.7" />
                      <stop offset="50%" stopColor="#ffcc00" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#ffaa33" stopOpacity="0.15" />
                    </linearGradient>
                  </defs>

                  {/* Vertical lines from top row */}
                  <line x1="200" y1="100" x2="200" y2="170" stroke="url(#lineGradient)" strokeWidth="2.5" className="connector-line" />
                  <line x1="550" y1="100" x2="550" y2="170" stroke="url(#lineGradient)" strokeWidth="2.5" className="connector-line" style={{ animationDelay: '0.15s' }} />
                  <line x1="900" y1="100" x2="900" y2="170" stroke="url(#lineGradient)" strokeWidth="2.5" className="connector-line" style={{ animationDelay: '0.3s' }} />

                  {/* Horizontal connector */}
                  <line x1="200" y1="170" x2="900" y2="170" stroke="url(#lineGradient)" strokeWidth="2.5" className="connector-line" style={{ animationDelay: '0.45s' }} />

                  {/* Lines to middle nodes */}
                  <line x1="290" y1="250" x2="290" y2="320" stroke="url(#lineGradient)" strokeWidth="2.5" className="connector-line" style={{ animationDelay: '0.6s' }} />
                  <line x1="810" y1="250" x2="810" y2="320" stroke="url(#lineGradient)" strokeWidth="2.5" className="connector-line" style={{ animationDelay: '0.75s' }} />

                  {/* Lines to bottom row */}
                  <line x1="290" y1="400" x2="290" y2="470" stroke="url(#lineGradient)" strokeWidth="2.5" className="connector-line" style={{ animationDelay: '0.9s' }} />
                  <line x1="810" y1="400" x2="810" y2="470" stroke="url(#lineGradient)" strokeWidth="2.5" className="connector-line" style={{ animationDelay: '1.05s' }} />

                  {/* Lines to root */}
                  <line x1="290" y1="550" x2="550" y2="550" stroke="url(#lineGradient)" strokeWidth="2.5" className="connector-line" style={{ animationDelay: '1.2s' }} />
                  <line x1="810" y1="550" x2="550" y2="550" stroke="url(#lineGradient)" strokeWidth="2.5" className="connector-line" style={{ animationDelay: '1.35s' }} />
                </svg>

                {/* Top Row - 3 Members */}
                <div className="tree-row row-top">
                  {team.slice(0, 3).map((member, index) => (
                    <motion.div
                      key={member._id}
                      className="tree-avatar-wrapper"
                      variants={itemVariants}
                      transition={{ delay: index * 0.15 }}
                    >
                      <div
                        className={`tree-avatar ${selectedMember === member._id ? 'active' : ''}`}
                        onClick={() => {
                          if (selectedMember === member._id) {
                            setSelectedMember(null);
                          } else {
                            setSelectedMember(member._id);
                          }
                        }}
                      >
                        <img src={member.imageUrl} alt={member.name} />
                        <div className="avatar-overlay">
                          <span>{member.name}</span>
                        </div>
                        <div className="avatar-sparkle"></div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Middle Connector Nodes */}
                <div className="tree-connector-nodes">
                  <div className="connector-node">
                    <i className="fas fa-bolt"></i>
                  </div>
                  <div className="connector-node">
                    <i className="fas fa-bolt"></i>
                  </div>
                </div>

                {/* Middle Row - 2 Members */}
                <div className="tree-row row-middle">
                  {team.slice(3, 5).map((member, index) => (
                    <motion.div
                      key={member._id}
                      className="tree-avatar-wrapper"
                      variants={itemVariants}
                      transition={{ delay: 0.45 + index * 0.15 }}
                    >
                      <div
                        className={`tree-avatar ${selectedMember === member._id ? 'active' : ''}`}
                        onClick={() => {
                          if (selectedMember === member._id) {
                            setSelectedMember(null);
                          } else {
                            setSelectedMember(member._id);
                          }
                        }}
                      >
                        <img src={member.imageUrl} alt={member.name} />
                        <div className="avatar-overlay">
                          <span>{member.name}</span>
                        </div>
                        <div className="avatar-sparkle"></div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Root - Center Bottom */}
                <div className="tree-root">
                  {team[5] && (
                    <motion.div
                      className="tree-avatar-wrapper"
                      variants={itemVariants}
                      transition={{ delay: 0.75 }}
                    >
                      <div
                        className={`tree-avatar root-avatar ${selectedMember === team[5]._id ? 'active' : ''}`}
                        onClick={() => {
                          if (selectedMember === team[5]._id) {
                            setSelectedMember(null);
                          } else {
                            setSelectedMember(team[5]._id);
                          }
                        }}
                      >
                        <img src={team[5].imageUrl} alt={team[5].name} />
                        <div className="avatar-overlay">
                          <span>{team[5].name}</span>
                        </div>
                        <div className="avatar-sparkle"></div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>

              {/* Popup Card at the end of tree structure */}
              <AnimatePresence>
                {selectedMember && (
                  <>
                    <div className="modal-overlay" onClick={() => setSelectedMember(null)} />
                    <motion.div
                      className="popup-card"
                      initial={{ opacity: 0, scale: 0.8, y: 30 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8, y: 30 }}
                      transition={{ type: "spring", stiffness: 250, damping: 25 }}
                    >
                      <button
                        className="popup-close"
                        onClick={() => setSelectedMember(null)}
                      >
                        <i className="fas fa-times"></i>
                      </button>

                      <div className="popup-glow"></div>

                      <div className="popup-image">
                        <img src={team.find(m => m._id === selectedMember)?.imageUrl} alt={team.find(m => m._id === selectedMember)?.name} />
                      </div>

                      <div className="popup-content">
                        <h3 className="popup-name">{team.find(m => m._id === selectedMember)?.name}</h3>
                        <p className="popup-role">{team.find(m => m._id === selectedMember)?.role}</p>
                        <p className="popup-bio">{team.find(m => m._id === selectedMember)?.bio}</p>

                        <div className="popup-expertise">
                          {team.find(m => m._id === selectedMember)?.expertise?.map((skill, i) => (
                            <span key={i} className="expertise-tag">{skill}</span>
                          ))}
                        </div>

                        <div className="popup-social">
                          <button className="social-btn linkedin">
                            <i className="fab fa-linkedin"></i> LinkedIn
                          </button>
                          <button className="social-btn instagram">
                            <i className="fab fa-instagram"></i> Instagram
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>

              {/* Tree Message */}
              <motion.div
                className="tree-message"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-150px" }}
                variants={containerVariants}
              >
                <motion.p variants={itemVariants}>
                  Like a tree with roots supporting growth, each team member is essential to our success.
                  Together we create extraordinary digital experiences.
                </motion.p>
              </motion.div>
            </>
          )}
        </div>
      </section>
           <FAQ />
      {/* CTA Section */}
      <section id="contact" className="cta-section">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-150px" }}
            variants={containerVariants}
            className="cta-content"
          >
            <motion.div variants={itemVariants} className="cta-badge">
              <i className="fas fa-star"></i> Why Brands Choose Zero
            </motion.div>
            <motion.h2 variants={titleVariants}>
              Why Brands Choose <span className="gradient-text">Zero By Cineviv</span>
            </motion.h2>
            <motion.div variants={containerVariants} className="cta-features">
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
                },
              ].map((feature, idx) => (
                <motion.div key={idx} variants={itemVariants} className="cta-feature">
                  <i className={feature.icon}></i>
                  <h4>{feature.title}</h4>
                  <p>{feature.desc}</p>
                </motion.div>
              ))}
            </motion.div>
            <motion.div variants={itemVariants} className="cta-buttons">
              <Link to="/contact" className="btn btn-primary">
                <i className="fas fa-calendar-check"></i> Start Your Brand Journey
              </Link>
              <Link to="/work" className="btn btn-secondary">
                <i className="fas fa-play-circle"></i> View Our Work
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Team Modal */}
      {/* {selectedMember && (
        <div className="team-modal" onClick={() => setSelectedMember(null)}>
          <motion.div
            className="team-modal-content"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close" onClick={() => setSelectedMember(null)}>×</button>
            <div className="modal-image">
              <div className="image-placeholder large">
                <i className="fas fa-user fa-4x"></i>
              </div>
            </div>
            <div className="modal-info">
              <h2>{selectedMember.name}</h2>
              <h3>{selectedMember.role}</h3>
              <p>{selectedMember.bio}</p>
              <div className="modal-expertise">
                <h4>Areas of Expertise</h4>
                <div className="expertise-list">
                  {selectedMember.expertise?.map((skill, i) => (
                    <span key={i} className="expertise-badge">{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )} */}
    </div>
  );
};

export default HomePage;
