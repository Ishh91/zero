import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import SectionParticleBackground from './SectionParticleBackground';

import './Hero.css';

const categories = ['all', 'Fashion', 'Food', 'Lifestyle', 'Brand Commercials', 'Events', 'Personal Branding', 'Product Shoots', 'Social Media Ads'];

const ReelShowcase = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Enhanced opraah.in-style Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isMobile ? 0.08 : 0.12,
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
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [reels, setReels] = useState([]);
  const [loading, setLoading] = useState(true);
  const videoRefs = useRef({});

  useEffect(() => {
    fetchReels();
  }, [selectedCategory]);

  const fetchReels = async () => {
    try {
      setLoading(true);
      const params = selectedCategory === 'all' ? {} : { category: selectedCategory };
      const response = await axios.get(`/portfolio`, { params });
      
      if (response.data.success) {
        setReels(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching portfolio:', error);
      // Fallback to hardcoded data if API fails
      setReels([
        { _id: '1', category: 'Fashion', thumbnailUrl: 'https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress&cs=tinysrgb&w=400', title: 'Fashion Campaign 01', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
        { _id: '2', category: 'Food', thumbnailUrl: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=400', title: 'Food Brand Launch', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' },
        { _id: '3', category: 'Lifestyle', thumbnailUrl: 'https://images.pexels.com/photos/3945684/pexels-photo-3945684.jpeg?auto=compress&cs=tinysrgb&w=400', title: 'Lifestyle Series', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
        { _id: '4', category: 'Brand Commercials', thumbnailUrl: 'https://images.pexels.com/photos/3587620/pexels-photo-3587620.jpeg?auto=compress&cs=tinysrgb&w=400', title: 'Commercial Spot', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleVideoHover = (id, isHovering) => {
    const video = videoRefs.current[id];
    if (video && video.src) {
      try {
        if (isHovering) {
          video.play().catch(() => {});
        } else {
          video.pause();
          video.currentTime = 0;
        }
      } catch (error) {
        console.warn('Video playback error:', error);
      }
    }
  };

  const filtered = reels;

  return (
    <section className="reel-showcase-section">
      <SectionParticleBackground count={150} color="#ffcc00" />
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-150px" }}
          variants={containerVariants}
          className="reel-showcase-header"
        >
          <motion.div variants={itemVariants} className="reel-badge">
            <span>Our Portfolio</span>
          </motion.div>
          <motion.h2
            variants={titleVariants}
            className="section-title"
          >
            <span className="highlight-word">Results</span> speak louder than <span className="highlight-word-2">promises</span>.
          </motion.h2>
          <motion.p variants={itemVariants} className="reel-subtitle">
            Premium content that captures attention and drives engagement. Every frame is designed for maximum impact and audience retention.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-150px" }}
          variants={containerVariants}
          className="category-buttons"
        >
          {categories.map((cat, idx) => (
            <motion.button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
              variants={itemVariants}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </motion.button>
          ))}
        </motion.div>

        {loading ? (
          <div className="reels-loading">
            <div className="loader"></div>
            <p>Loading portfolio...</p>
          </div>
        ) : (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-150px" }}
            variants={containerVariants}
            className="reels-grid"
          >
            {filtered.map((reel, idx) => (
              <motion.div
                key={reel._id}
                className="reel-card"
                variants={itemVariants}
                whileHover={!isMobile ? { y: -8 } : undefined}
                whileTap={isMobile ? { scale: 0.98 } : undefined}
                onMouseEnter={() => handleVideoHover(reel._id, true)}
                onMouseLeave={() => handleVideoHover(reel._id, false)}
              >
                {reel.videoUrl ? (
                  <>
                    <video
                      ref={(el) => (videoRefs.current[reel._id] = el)}
                      className="reel-video"
                      poster={reel.thumbnailUrl}
                      muted
                      playsInline
                      loop
                      src={reel.videoUrl}
                    />
                    <div className="reel-overlay"></div>
                    <div className="reel-play-button">
                      <div className="play-button-bg"></div>
                      <div className="play-button">
                        <i className="fas fa-play"></i>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <img
                      src={reel.thumbnailUrl}
                      alt={reel.title}
                      className="reel-thumbnail"
                    />
                    <div className="reel-overlay"></div>
                    <div className="reel-play-button">
                      <div className="play-button-bg"></div>
                      <div className="play-button">
                        <i className="fas fa-play"></i>
                      </div>
                    </div>
                  </>
                )}

                {/* Bottom Info */}
                <div className="reel-info">
                  <h3>{reel.title}</h3>
                  <p>{reel.category}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* View More CTA */}
        <motion.div
          className="reel-cta"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-150px" }}
          variants={scaleVariants}
        >
          <a href="/work" className="cta-button">
            View Full Portfolio
            <span className="cta-arrow">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ReelShowcase;
