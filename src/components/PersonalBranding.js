import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import SectionParticleBackground from './SectionParticleBackground';
import { PLACEHOLDER_IMAGE } from '../utils/placeholders';
import './PersonalBranding.css';

const DEFAULT_PERSONAL_BRANDINGS = [
  {
    _id: '1',
    name: 'Shikhar Theatrewala',
    field: 'Actor & Theatre Teacher',
    bio: 'From 60k followers with zero ROI to 236k followers with a thriving community of paying students. We repositioned his content to lead with acting credibility first, letting his training record (3,000+ students, pan-India and international) build trust underneath it — cutting dependency on ad spend while growing nearly 4x.',
    avatarUrl: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400',
    stats: [
      { label: 'Followers Growth', value: '60K → 236K', icon: 'fas fa-users' },
      { label: 'Students Trained', value: '3,000+', icon: 'fas fa-graduation-cap' },
      { label: 'Ad Spend Reduction', value: '↓ 60%', icon: 'fas fa-chart-line' }
    ],
    videos: [
      { 
        title: 'Acting Credibility First', 
        description: 'How we repositioned content to lead with expertise', 
        videoUrl: '', 
        thumbnailUrl: 'https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress&cs=tinysrgb&w=400' 
      }
    ],
    photos: [
      { title: 'Theatre Workshop', imageUrl: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400' }
    ],
    socialLinks: {
      instagram: '#',
      youtube: '#'
    },
    caseStudy: true
  },
  {
    _id: '2',
    name: 'Shanvivaarya Human',
    field: 'Shayari & Relationship Content Creator',
    bio: 'Zero ad spend. Built entirely on content. A consistent identity built around what people actually came for: his shayari, and his read on relationships. The result is an audience that doesn\'t just scroll past — they act on what he says.',
    avatarUrl: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    stats: [
      { label: 'Ad Spend', value: '₹0', icon: 'fas fa-wallet' },
      { label: 'Growth Strategy', value: '100% Organic', icon: 'fas fa-seedling' },
      { label: 'Audience Action', value: 'High Conversion', icon: 'fas fa-bolt' }
    ],
    videos: [
      { 
        title: 'Shayari That Connects', 
        description: 'Content that builds trust without paid promotion', 
        videoUrl: '', 
        thumbnailUrl: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400' 
      }
    ],
    photos: [
      { title: 'Relationship Content', imageUrl: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400' }
    ],
    socialLinks: {
      instagram: '#',
      twitter: '#'
    },
    caseStudy: true
  },
  {
    _id: '3',
    name: 'Dr. Priya Sharma',
    field: 'Healthcare & Wellness Expert',
    bio: 'We brought the same content-led approach to healthcare — leading with expertise and real patient stories to build trust that converts into consultations. No gimmicks, just authentic medical content that educates and converts.',
    avatarUrl: 'https://images.pexels.com/photos/1181685/pexels-photo-1181685.jpeg?auto=compress&cs=tinysrgb&w=400',
    stats: [
      { label: 'Patient Bookings', value: '↑ 240%', icon: 'fas fa-heartbeat' },
      { label: 'Trust Score', value: '4.9/5', icon: 'fas fa-star' },
      { label: 'Organic Reach', value: '2.5M+', icon: 'fas fa-globe' }
    ],
    videos: [
      { 
        title: 'Trust-Based Healthcare Content', 
        description: 'Building authority through authentic medical storytelling', 
        videoUrl: '', 
        thumbnailUrl: 'https://images.pexels.com/photos/1181685/pexels-photo-1181685.jpeg?auto=compress&cs=tinysrgb&w=400' 
      }
    ],
    photos: [
      { title: 'Healthcare Consultations', imageUrl: 'https://images.pexels.com/photos/1181685/pexels-photo-1181685.jpeg?auto=compress&cs=tinysrgb&w=400' }
    ],
    socialLinks: {
      linkedin: '#',
      instagram: '#',
      youtube: '#'
    },
    caseStudy: true
  }
];

const PersonalBranding = () => {
  const [personalBrandings, setPersonalBrandings] = useState(DEFAULT_PERSONAL_BRANDINGS);
  const [loading, setLoading] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    fetchPersonalBranding();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchPersonalBranding = async () => {
    try {
      const response = await axios.get(`/personal-branding`);
      
      if (response.data.success && response.data.data && response.data.data.length > 0) {
        setPersonalBrandings(response.data.data);
      }
    } catch (error) {
      // Silently keep default state
    }
  };

  // Enhanced opraah.in-style Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isMobile ? 0.1 : 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: isMobile ? 40 : 80, scale: 0.95 },
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
    hidden: { opacity: 0, y: isMobile ? 35 : 70, x: -20 },
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

  const handleImageError = (e) => {
    e.target.src = PLACEHOLDER_IMAGE;
  };

  return (
    <section className="personal-branding-section" id="personal-branding">
      <SectionParticleBackground count={150} color="#ff9933" />
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-150px' }}
          variants={containerVariants}
          className="personal-branding-header"
        >
          <motion.div variants={itemVariants} className="section-badge">
            <i className="fas fa-star"></i>
            <span>Personal Branding</span>
          </motion.div>
          
          <motion.h2 variants={titleVariants} className="section-title">
            Ads buy reach. Content converts it into trust <br /> and trust is what actually pays the bills.
          </motion.h2>
          
          <motion.div variants={itemVariants} className="section-description">
            <p className="section-subtitle">
              We've seen both sides of that gap up close.
            </p>
            <p className="section-subtitle-highlight">
              A following is a vanity number until content turns it into trust, and trust is what turns into revenue — whether that's a student enrolling, a patient booking, or a follower buying in.
            </p>
          </motion.div>
        </motion.div>

        {loading ? (
          <div className="personal-branding-loading">
            <div className="loader"></div>
            <p>Loading amazing stories...</p>
          </div>
        ) : (
          <>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="personal-branding-grid"
            >
              {personalBrandings.map((person) => (
                <motion.div
                  key={person._id}
                  variants={itemVariants}
                  className="personal-branding-card"
                  whileHover={!isMobile ? { y: -8 } : undefined}
                  whileTap={isMobile ? { scale: 0.98 } : undefined}
                  onClick={() => setSelectedPerson(person)}
                  layoutId={`card-${person._id}`}
                >
                  <div className="card-avatar-wrapper">
                    <img
                      src={person.avatarUrl}
                      alt={person.name}
                      className="card-avatar"
                      loading="lazy"
                      onError={handleImageError}
                    />
                    {person.caseStudy && (
                      <div className="card-badge">Case Study</div>
                    )}
                  </div>
                  <h3 className="card-name">{person.name}</h3>
                  <p className="card-field">{person.field}</p>
                  <button className="view-details-btn">
                    View Story <i className="fas fa-arrow-right"></i>
                  </button>
                </motion.div>
              ))}
            </motion.div>

            {/* Trust Building Message */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
              className="trust-message"
            >
              <p className="trust-quote">
                "That's content-led marketing. It's the same method we bring to a hospital's GMB profile or a hotel's booking funnel — find the real story, lead with it, and let the numbers follow."
              </p>
            </motion.div>
          </>
        )}

        {/* Modal */}
        <AnimatePresence>
          {selectedPerson && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="personal-branding-modal-overlay"
              onClick={() => setSelectedPerson(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: 60 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85, y: 60 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="personal-branding-modal"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="modal-close"
                  onClick={() => setSelectedPerson(null)}
                  aria-label="Close modal"
                >
                  <i className="fas fa-times"></i>
                </button>

                <div className="modal-content">
                  {/* Header */}
                  <div className="modal-header">
                    <motion.img
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.1, duration: 0.5 }}
                      src={selectedPerson.avatarUrl}
                      alt={selectedPerson.name}
                      className="modal-avatar"
                      onError={handleImageError}
                    />
                    <div className="modal-header-info">
                      <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15, duration: 0.5 }}
                      >
                        {selectedPerson.name}
                      </motion.h2>
                      <motion.p
                        className="modal-field"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                      >
                        {selectedPerson.field}
                      </motion.p>
                    </div>
                  </div>

                  <motion.p
                    className="modal-bio"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25, duration: 0.6 }}
                  >
                    {selectedPerson.bio}
                  </motion.p>

                  {/* Stats */}
                  {selectedPerson.stats && selectedPerson.stats.length > 0 && (
                    <motion.div
                      className="modal-section"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.6 }}
                    >
                      <h3>
                        <i className="fas fa-chart-line"></i> Results That Matter
                      </h3>
                      <div className="stats-grid">
                        {selectedPerson.stats.map((item, idx) => (
                          <motion.div
                            key={idx}
                            className="stat-item"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.35 + idx * 0.08, duration: 0.5 }}
                            whileHover={{ y: -6 }}
                          >
                            <i className={item.icon}></i>
                            <p className="stat-value">{item.value}</p>
                            <p className="stat-label">{item.label}</p>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Videos */}
                  {selectedPerson.videos && selectedPerson.videos.length > 0 && (
                    <motion.div
                      className="modal-section"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.45, duration: 0.6 }}
                    >
                      <h3>
                        <i className="fas fa-video"></i> The Process
                      </h3>
                      <div className="videos-grid">
                        {selectedPerson.videos.map((video, idx) => (
                          <motion.div
                            key={idx}
                            className="video-item"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 + idx * 0.08, duration: 0.5 }}
                            whileHover={{ y: -8 }}
                          >
                            <div className="video-thumbnail">
                              <img src={video.thumbnailUrl} alt={video.title} loading="lazy" onError={handleImageError} />
                              <div className="video-play">
                                <i className="fas fa-play"></i>
                              </div>
                            </div>
                            <h4>{video.title}</h4>
                            {video.description && <p>{video.description}</p>}
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Photos */}
                  {selectedPerson.photos && selectedPerson.photos.length > 0 && (
                    <motion.div
                      className="modal-section"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.55, duration: 0.6 }}
                    >
                      <h3>
                        <i className="fas fa-images"></i> Behind the Scenes
                      </h3>
                      <div className="photos-grid">
                        {selectedPerson.photos.map((photo, idx) => (
                          <motion.div
                            key={idx}
                            className="photo-item"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.6 + idx * 0.06, duration: 0.5 }}
                            whileHover={{ scale: 1.05, y: -6 }}
                          >
                            <img src={photo.imageUrl} alt={photo.title} loading="lazy" onError={handleImageError} />
                            {photo.title && <p>{photo.title}</p>}
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Social Links */}
                  {selectedPerson.socialLinks && (
                    <motion.div
                      className="modal-social"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.65, duration: 0.6 }}
                    >
                      {selectedPerson.socialLinks.linkedin && (
                        <a href={selectedPerson.socialLinks.linkedin} className="social-link" target="_blank" rel="noopener noreferrer">
                          <i className="fab fa-linkedin"></i>
                        </a>
                      )}
                      {selectedPerson.socialLinks.instagram && (
                        <a href={selectedPerson.socialLinks.instagram} className="social-link" target="_blank" rel="noopener noreferrer">
                          <i className="fab fa-instagram"></i>
                        </a>
                      )}
                      {selectedPerson.socialLinks.twitter && (
                        <a href={selectedPerson.socialLinks.twitter} className="social-link" target="_blank" rel="noopener noreferrer">
                          <i className="fab fa-twitter"></i>
                        </a>
                      )}
                      {selectedPerson.socialLinks.youtube && (
                        <a href={selectedPerson.socialLinks.youtube} className="social-link" target="_blank" rel="noopener noreferrer">
                          <i className="fab fa-youtube"></i>
                        </a>
                      )}
                      {selectedPerson.socialLinks.website && (
                        <a href={selectedPerson.socialLinks.website} className="social-link" target="_blank" rel="noopener noreferrer">
                          <i className="fas fa-globe"></i>
                        </a>
                      )}
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default PersonalBranding;