import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SectionParticleBackground from '../components/SectionParticleBackground';
import './TeamPage.css';
import '../pages/ServiceDetail.css';

const TeamPage = () => {
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

  const [team, setTeam] = useState([]);
  const [hoveredMember, setHoveredMember] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    try {
      const response = await axios.get(`/team`);
      if (response.data.success && response.data.data.length > 0) {
        setTeam(response.data.data);
      } else {
        // Fallback data if no team members in database
        setTeam([
          {
            _id: 1,
            name: 'Creative Director',
            role: 'Founder & Creative Director',
            bio: 'Brand strategy, creative vision, and client leadership with over a decade of experience.',
            expertise: ['Brand Strategy', 'Creative Direction', 'Marketing Vision'],
            imageUrl: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
            socialLinks: { linkedin: '#', instagram: '#' }
          },
          {
            _id: 2,
            name: 'Content Strategist',
            role: 'Content Strategist',
            bio: 'Content planning, viral strategy, and audience psychology expert.',
            expertise: ['Content Strategy', 'Viral Marketing', 'Audience Psychology'],
            imageUrl: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
            socialLinks: { linkedin: '#', instagram: '#' }
          },
          {
            _id: 3,
            name: 'Cinematic Editor',
            role: 'Video Editor & Cinematographer',
            bio: 'Reel editing, cinematic production, color grading, and motion design specialist.',
            expertise: ['Video Editing', 'Motion Design', 'Color Grading'],
            imageUrl: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
            socialLinks: { linkedin: '#', instagram: '#' }
          },
          {
            _id: 4,
            name: 'Performance Marketer',
            role: 'Performance Marketing Manager',
            bio: 'META ads, lead generation, and campaign optimization expert.',
            expertise: ['META Ads', 'Lead Generation', 'Analytics'],
            imageUrl: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
            socialLinks: { linkedin: '#', instagram: '#' }
          },
          {
            _id: 5,
            name: 'Social Manager',
            role: 'Social Media Manager',
            bio: 'Community management, engagement strategy, and platform growth.',
            expertise: ['Platform Growth', 'Community Engagement', 'Content Distribution'],
            imageUrl: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
            socialLinks: { linkedin: '#', instagram: '#' }
          },
          {
            _id: 6,
            name: 'Producer',
            role: 'Production Manager',
            bio: 'Video production coordination, creative execution, and quality assurance.',
            expertise: ['Video Production', 'Project Coordination', 'Quality Control'],
            imageUrl: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
            socialLinks: { linkedin: '#', instagram: '#' }
          }
        ]);
      }
    } catch (error) {
      console.error('Error fetching team:', error);
    } finally {
      setLoading(false);
    }
  };

  const activeMember = selectedMember || hoveredMember;

  if (loading) {
    return (
      <div className="team-loading">
        <div className="loader"></div>
        <p>Loading our team...</p>
      </div>
    );
  }

  return (
    <div className="team-page">
      <section className="team-tree-section">
        <SectionParticleBackground count={700} color="#ffaa33" />
        <div className="team-tree-container">
          {/* Header */}
          <motion.div 
            className="team-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-150px" }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <div className="team-badge">
                <span>Our Tree of Talent</span>
              </div>
              <h1 className="team-title">
                Growing Together
                <br />
                <span className="gradient-text">As One Team</span>
              </h1>
              <p className="team-subtitle">
                Like roots of a tree, each member is essential. Hover over avatars to discover their expertise.
              </p>
            </motion.div>
          </motion.div>

          {/* Tree Structure */}
          <div className="tree-structure">
            {/* SVG Connectors */}
            <svg className="tree-connectors" viewBox="0 0 1000 600" preserveAspectRatio="none">
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#ff9900" stopOpacity="0.6"/>
                  <stop offset="50%" stopColor="#ffcc00" stopOpacity="0.3"/>
                  <stop offset="100%" stopColor="#ffaa33" stopOpacity="0.1"/>
                </linearGradient>
              </defs>
              
              {/* Vertical lines from top row */}
              <line x1="166" y1="100" x2="166" y2="160" stroke="url(#lineGradient)" strokeWidth="2" className="connector-line" />
              <line x1="500" y1="100" x2="500" y2="160" stroke="url(#lineGradient)" strokeWidth="2" className="connector-line" style={{ animationDelay: '0.1s' }} />
              <line x1="834" y1="100" x2="834" y2="160" stroke="url(#lineGradient)" strokeWidth="2" className="connector-line" style={{ animationDelay: '0.2s' }} />
              
              {/* Horizontal connector */}
              <line x1="166" y1="160" x2="834" y2="160" stroke="url(#lineGradient)" strokeWidth="2" className="connector-line" style={{ animationDelay: '0.3s' }} />
              
              {/* Lines to middle nodes */}
              <line x1="250" y1="240" x2="250" y2="300" stroke="url(#lineGradient)" strokeWidth="2" className="connector-line" style={{ animationDelay: '0.4s' }} />
              <line x1="750" y1="240" x2="750" y2="300" stroke="url(#lineGradient)" strokeWidth="2" className="connector-line" style={{ animationDelay: '0.5s' }} />
              
              {/* Lines to bottom row */}
              <line x1="250" y1="380" x2="250" y2="440" stroke="url(#lineGradient)" strokeWidth="2" className="connector-line" style={{ animationDelay: '0.6s' }} />
              <line x1="750" y1="380" x2="750" y2="440" stroke="url(#lineGradient)" strokeWidth="2" className="connector-line" style={{ animationDelay: '0.7s' }} />
              
              {/* Lines to root */}
              <line x1="250" y1="520" x2="500" y2="520" stroke="url(#lineGradient)" strokeWidth="2" className="connector-line" style={{ animationDelay: '0.8s' }} />
              <line x1="750" y1="520" x2="500" y2="520" stroke="url(#lineGradient)" strokeWidth="2" className="connector-line" style={{ animationDelay: '0.9s' }} />
            </svg>

            {/* Top Row - 3 Members */}
            <div className="tree-row row-top">
              {team.slice(0, 3).map((member, idx) => (
                <motion.div
                  key={member._id}
                  className="tree-avatar-wrapper"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, type: "spring" }}
                >
                  <div
                    className={`tree-avatar ${activeMember === member._id ? 'active' : ''}`}
                    onMouseEnter={() => {
                      if (!selectedMember) setHoveredMember(member._id);
                    }}
                    onMouseLeave={() => {
                      if (!selectedMember) setHoveredMember(null);
                    }}
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
              {team.slice(3, 5).map((member, idx) => (
                <motion.div
                  key={member._id}
                  className="tree-avatar-wrapper"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + idx * 0.1, type: "spring" }}
                >
                  <div
                    className={`tree-avatar ${activeMember === member._id ? 'active' : ''}`}
                    onMouseEnter={() => {
                      if (!selectedMember) setHoveredMember(member._id);
                    }}
                    onMouseLeave={() => {
                      if (!selectedMember) setHoveredMember(null);
                    }}
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
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7, type: "spring" }}
                >
                  <div
                    className={`tree-avatar root-avatar ${activeMember === team[5]._id ? 'active' : ''}`}
                    onMouseEnter={() => {
                      if (!selectedMember) setHoveredMember(team[5]._id);
                    }}
                    onMouseLeave={() => {
                      if (!selectedMember) setHoveredMember(null);
                    }}
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
          </div>

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
        </div>
      </section>

      {/* Popup Card - Outside the container for proper positioning */}
      <AnimatePresence>
        {activeMember && (
          <>
            <motion.div 
              className="modal-overlay" 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                if (selectedMember) setSelectedMember(null);
                else setHoveredMember(null);
              }} 
            />
            <motion.div
              className="popup-card"
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 30 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <button
                className="popup-close"
                onClick={() => {
                  if (selectedMember) setSelectedMember(null);
                  else setHoveredMember(null);
                }}
              >
                <i className="fas fa-times"></i>
              </button>

              <div className="popup-glow"></div>

              <div className="popup-image">
                <img src={team.find(m => m._id === activeMember)?.imageUrl} alt={team.find(m => m._id === activeMember)?.name} />
              </div>

              <div className="popup-content">
                <h3 className="popup-name">{team.find(m => m._id === activeMember)?.name}</h3>
                <p className="popup-role">{team.find(m => m._id === activeMember)?.role}</p>
                <p className="popup-bio">{team.find(m => m._id === activeMember)?.bio}</p>

                <div className="popup-expertise">
                  {team.find(m => m._id === activeMember)?.expertise?.map((skill, i) => (
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
                icon: "fas fa-users",
                title: "Expert Team",
                description: "A dedicated team of specialists in every aspect of digital marketing and content."
              },
              {
                icon: "fas fa-palette",
                title: "Creative Excellence",
                description: "Beautiful, cinematic content that stands out and drives engagement."
              },
              {
                icon: "fas fa-chart-line",
                title: "Data-Driven",
                description: "Every decision backed by analytics to ensure maximum ROI for your campaigns."
              },
              {
                icon: "fas fa-bolt",
                title: "Fast Execution",
                description: "Quick turnaround times without compromising on quality or creativity."
              },
              {
                icon: "fas fa-handshake",
                title: "Partnership Focus",
                description: "We work with you as true partners, invested in your long-term success."
              },
              {
                icon: "fas fa-trophy",
                title: "Proven Results",
                description: "Track record of success with 200+ campaigns and 50M+ views generated."
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
            <h3>Ready to Work With Our Team?</h3>
            <p>Let's build something extraordinary together with our talented team of experts.</p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn btn-primary">
                <i className="fas fa-calendar-check"></i> Get In Touch
              </Link>
              <Link to="/services" className="btn btn-secondary">
                <i className="fas fa-list"></i> View Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default TeamPage;