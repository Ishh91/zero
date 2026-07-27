import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Floating3D from '../components/Floating3D';
import './WorkPage.css';
import '../pages/ServiceDetail.css';

const WorkPage = () => {
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

  const [portfolio, setPortfolio] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedWork, setSelectedWork] = useState(null);
  const [loading, setLoading] = useState(true);
  const videoRefs = useRef({});

  const categories = ['all', 'Fashion', 'Food', 'Lifestyle', 'Brand Commercials', 'Events', 'Personal Branding', 'Product Shoots'];

  // Sample data for when API isn't available
  const samplePortfolio = [
    {
      _id: '1',
      title: 'Luxury Fashion Campaign',
      client: 'Elegance Co.',
      category: 'Fashion',
      thumbnailUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
      videoUrl: '',
      description: 'A cinematic fashion campaign showcasing the 2024 collection with high-end visuals.',
      results: { views: '2.5M', engagement: '150K', conversions: '8.5K' },
      tags: ['Fashion', 'Cinematic', 'Luxury']
    },
    {
      _id: '2',
      title: 'Gourmet Food Series',
      client: 'Delight Bites',
      category: 'Food',
      thumbnailUrl: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&h=600&fit=crop',
      videoUrl: '',
      description: 'A mouth-watering food series highlighting the art of cooking.',
      results: { views: '1.8M', engagement: '120K', conversions: '5.2K' },
      tags: ['Food', 'Culinary', 'Lifestyle']
    },
    {
      _id: '3',
      title: 'Urban Lifestyle Journey',
      client: 'Urban Vibes',
      category: 'Lifestyle',
      thumbnailUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=600&fit=crop',
      videoUrl: '',
      description: 'Capturing the essence of modern urban life through storytelling.',
      results: { views: '3.2M', engagement: '200K', conversions: '10.1K' },
      tags: ['Lifestyle', 'Urban', 'Storytelling']
    },
    {
      _id: '4',
      title: 'Brand Launch Commercial',
      client: 'TechNova',
      category: 'Brand Commercials',
      thumbnailUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop',
      videoUrl: '',
      description: 'A dynamic commercial for the launch of a new tech product.',
      results: { views: '4.1M', engagement: '250K', conversions: '12.3K' },
      tags: ['Commercial', 'Tech', 'Product']
    }
  ];

  useEffect(() => {
    fetchPortfolio();
  }, [activeCategory]);

  const fetchPortfolio = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/portfolio?category=${activeCategory}`);
      setPortfolio(response.data.data);
    } catch (error) {
      console.error('Error fetching portfolio:', error);
      // Use sample data if API fails
      if (activeCategory === 'all') {
        setPortfolio(samplePortfolio);
      } else {
        setPortfolio(samplePortfolio.filter(item => item.category === activeCategory));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVideoHover = (id, isHovering) => {
    const video = videoRefs.current[id];
    if (video && video.src) {
      try {
        if (isHovering) {
          video.play().catch(() => {}); // Catch any play errors
        } else {
          video.pause();
          video.currentTime = 0;
        }
      } catch (error) {
        console.warn('Video playback error:', error);
      }
    }
  };

  return (
    <div className="work-page">
      <section className="work-hero">
        <Floating3D />
        <div className="container">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.h1 variants={titleVariants}>Our Work</motion.h1>
            <motion.p variants={itemVariants}>Cinematic storytelling that drives real results</motion.p>
          </motion.div>
        </div>
      </section>

      <section className="work-gallery">
        <div className="container">
          <div className="category-filters">
            {categories.map(category => (
              <button
                key={category}
                className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
                onClick={() => setActiveCategory(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="loading-container">
              <div className="loader"></div>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                className="portfolio-grid"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-150px" }}
                variants={containerVariants}
                exit={{ opacity: 0, y: -20 }}
              >
                {portfolio.map((item, index) => (
                  <motion.div
                    key={item._id}
                    className="portfolio-item"
                    variants={itemVariants}
                    whileHover={{ y: -10 }}
                    onClick={() => setSelectedWork(item)}
                  >
                    <div className="portfolio-video">
                      <img
                        src={item.thumbnailUrl}
                        alt={item.title}
                        className="portfolio-thumbnail"
                      />
                      <div className="portfolio-overlay">
                        <span className="view-case">View Case Study →</span>
                      </div>
                    </div>
                    <div className="portfolio-info">
                      <h3>{item.title}</h3>
                      <p>{item.client}</p>
                      <div className="results-preview">
                        {item.results?.views && <span>📊 {item.results.views} views</span>}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </section>

      {/* Modal for work details */}
      {selectedWork && (
        <div className="work-modal" onClick={() => setSelectedWork(null)}>
          <motion.div
            className="work-modal-content"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close" onClick={() => setSelectedWork(null)}>×</button>
            <div className="work-modal-video">
              {selectedWork.videoUrl && selectedWork.videoUrl.startsWith('http') ? (
                <video controls autoPlay src={selectedWork.videoUrl} poster={selectedWork.thumbnailUrl} />
              ) : (
                <div className="video-placeholder large">
                  <i className="fas fa-video"></i>
                  <span>Video coming soon</span>
                </div>
              )}
            </div>
            <div className="work-modal-info">
              <h2>{selectedWork.title}</h2>
              <h3>Client: {selectedWork.client}</h3>
              <p>{selectedWork.description}</p>
              <div className="results-metrics">
                {selectedWork.results?.views && (
                  <div className="metric">
                    <span className="metric-value">{selectedWork.results.views}</span>
                    <span className="metric-label">Views</span>
                  </div>
                )}
                {selectedWork.results?.engagement && (
                  <div className="metric">
                    <span className="metric-value">{selectedWork.results.engagement}</span>
                    <span className="metric-label">Engagement</span>
                  </div>
                )}
                {selectedWork.results?.conversions && (
                  <div className="metric">
                    <span className="metric-value">{selectedWork.results.conversions}</span>
                    <span className="metric-label">Conversions</span>
                  </div>
                )}
              </div>
              {selectedWork.tags && selectedWork.tags.length > 0 && (
                <div className="work-tags">
                  <h4>Tags:</h4>
                  <div className="tags-list">
                    {selectedWork.tags.map((tag, i) => (
                      <span key={i} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}

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
                icon: "fas fa-video",
                title: "Cinematic Quality",
                description: "Premium, cinema-grade content that captivates and engages your audience."
              },
              {
                icon: "fas fa-bullseye",
                title: "Results-Driven",
                description: "Every project is designed to deliver real, measurable business results."
              },
              {
                icon: "fas fa-palette",
                title: "Creative Excellence",
                description: "Innovative and beautiful creative work that stands out from the competition."
              },
              {
                icon: "fas fa-bolt",
                title: "Fast Delivery",
                description: "Quick turnaround times without compromising on quality or creativity."
              },
              {
                icon: "fas fa-film",
                title: "Full-Service Production",
                description: "End-to-end video and content production, from concept to final delivery."
              },
              {
                icon: "fas fa-handshake",
                title: "Trusted Partnership",
                description: "We work with you as true partners, dedicated to your long-term success."
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
            <h3>Ready to Create Amazing Content?</h3>
            <p>Let's bring your brand to life with stunning, results-driven content and production.</p>
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

export default WorkPage;