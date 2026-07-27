import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import Floating3D from '../components/Floating3D';
import './BlogPage.css';
import '../pages/ServiceDetail.css';

const BlogPage = () => {
  const [isMobile, setIsMobile] = React.useState(
    typeof window !== 'undefined' && window.innerWidth < 768
  );

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [featuredBlogs, setFeaturedBlogs] = useState([]);

  const categories = ['all', 'Marketing', 'Content Strategy', 'Video Production', 'Social Media', 'Case Studies', 'Industry Insights'];

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

  useEffect(() => {
    fetchBlogs();
    fetchFeaturedBlogs();
  }, [currentPage, selectedCategory]);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/blogs`, {
        params: { page: currentPage, category: selectedCategory === 'all' ? null : selectedCategory }
      });
      setBlogs(response.data.data);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFeaturedBlogs = async () => {
    try {
      const response = await axios.get(`/blogs/featured`);
      setFeaturedBlogs(response.data.data);
    } catch (error) {
      console.error('Error fetching featured blogs:', error);
    }
  };

  return (
    <div className="blog-page">
      <section className="blog-hero">
        <Floating3D />
        <div className="container">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.h1 variants={titleVariants}>Insights & Stories</motion.h1>
            <motion.p variants={itemVariants}>Expert insights on content marketing, video production, and brand growth</motion.p>
          </motion.div>
        </div>
      </section>

      {/* Featured Blogs */}
      {featuredBlogs.length > 0 && (
        <motion.section 
          className="featured-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-150px" }}
          variants={containerVariants}
        >
          <div className="container">
            <motion.h2 className="section-title" variants={titleVariants}>
              Featured Articles
            </motion.h2>
            <motion.div className="featured-grid" variants={containerVariants}>
              {featuredBlogs.map((blog, index) => (
                <motion.div
                  key={blog._id}
                  className="featured-card"
                  variants={itemVariants}
                  whileHover={{ 
                    y: -12,
                    transition: { duration: 0.3 }
                  }}
                >
                  <Link to={`/blog/${blog.slug}`}>
                    <div className="featured-image">
                      <img src={blog.featuredImage || '/api/placeholder/800/500'} alt={blog.title} />
                      <span className="featured-badge">Featured</span>
                    </div>
                    <div className="featured-content">
                      <span className="blog-category">{blog.category}</span>
                      <h3>{blog.title}</h3>
                      <p>{blog.excerpt}</p>
                      <div className="blog-meta">
                        <span><i className="far fa-calendar"></i> {new Date(blog.publishedAt).toLocaleDateString()}</span>
                        <span><i className="far fa-clock"></i> {blog.readTime} min read</span>
                        <span><i className="far fa-eye"></i> {blog.views} views</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>
      )}

      {/* Blog Grid */}
      <motion.section 
        className="blog-grid-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-150px" }}
        variants={containerVariants}
      >
        <div className="container">
          <motion.div className="category-filters" variants={itemVariants}>
            {categories.map(category => (
              <motion.button
                key={category}
                className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => {
                  setSelectedCategory(category);
                  setCurrentPage(1);
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </motion.button>
            ))}
          </motion.div>

          {loading ? (
            <motion.div 
              className="loading-container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="loader"></div>
            </motion.div>
          ) : (
            <>
              <motion.div className="blogs-grid" variants={containerVariants}>
                {blogs.map((blog, index) => (
                  <motion.div
                    key={blog._id}
                    className="blog-card"
                    variants={itemVariants}
                    whileHover={{ 
                      y: -10,
                      transition: { duration: 0.3 }
                    }}
                  >
                    <Link to={`/blog/${blog.slug}`}>
                      <div className="blog-image">
                        <img src={blog.featuredImage || '/api/placeholder/600/400'} alt={blog.title} />
                      </div>
                      <div className="blog-content">
                        <span className="blog-category">{blog.category}</span>
                        <h3>{blog.title}</h3>
                        <p>{blog.excerpt.substring(0, 120)}...</p>
                        <div className="blog-meta">
                          <span><i className="far fa-calendar"></i> {new Date(blog.publishedAt).toLocaleDateString()}</span>
                          <span><i className="far fa-clock"></i> {blog.readTime} min read</span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>

              {/* Pagination */}
              {totalPages > 1 && (
                <motion.div 
                  className="pagination" 
                  variants={itemVariants}
                >
                  <motion.button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    whileHover={{ scale: currentPage !== 1 ? 1.05 : 1 }}
                    whileTap={{ scale: currentPage !== 1 ? 0.95 : 1 }}
                  >
                    <i className="fas fa-chevron-left"></i> Previous
                  </motion.button>
                  <span className="page-info">Page {currentPage} of {totalPages}</span>
                  <motion.button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    whileHover={{ scale: currentPage !== totalPages ? 1.05 : 1 }}
                    whileTap={{ scale: currentPage !== totalPages ? 0.95 : 1 }}
                  >
                    Next <i className="fas fa-chevron-right"></i>
                  </motion.button>
                </motion.div>
              )}
            </>
          )}
        </div>
      </motion.section>

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
            <h3>Ready to Work With Us?</h3>
            <p>Let's create amazing content and grow your brand together with our expert team.</p>
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

export default BlogPage;