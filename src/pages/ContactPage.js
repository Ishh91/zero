import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import Floating3D from '../components/Floating3D';
import './ContactPage.css';

const ContactPage = () => {
  const [isMobile, setIsMobile] = React.useState(
    typeof window !== 'undefined' && window.innerWidth < 768
  );

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    budget: '',
    service: '',
    message: '',
    freeConsultingCall: false,
    preferredDateTime: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ 
      ...formData, 
      [name]: type === 'checkbox' ? checked : value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/inquiries`, formData);
      setSubmitStatus('success');
      setFormData({
        name: '', email: '', phone: '', company: '', budget: '', service: '', message: '', freeConsultingCall: false, preferredDateTime: ''
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <Floating3D />
        <div className="container">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.span className="contact-badge" variants={itemVariants}>
              Let's Work Together
            </motion.span>
            <motion.h1 variants={titleVariants}>Let's Build Something <span>Extraordinary</span></motion.h1>
            <motion.p variants={itemVariants}>Ready to create content that builds attention and marketing that builds brands? Let's start a conversation.</motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <motion.section 
        className="contact-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-150px" }}
        variants={containerVariants}
      >
        <div className="container">
          <div className="contact-grid">
            {/* Contact Info */}
            <motion.div
              className="contact-info"
              variants={itemVariants}
            >
              <div className="info-header">
                <h2>Get in Touch</h2>
                <p>Have a project in mind? Let's discuss how we can help you achieve your goals.</p>
              </div>
              
              <div className="info-items">
                <motion.div 
                  className="info-item"
                  whileHover={{ x: 8, transition: { duration: 0.3 } }}
                >
                  <div className="info-icon">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div className="info-content">
                    <h4>Visit Us</h4>
                    <p>Lucknow, Uttar Pradesh, India</p>
                  </div>
                </motion.div>

                <motion.div 
                  className="info-item"
                  whileHover={{ x: 8, transition: { duration: 0.3 } }}
                >
                  <div className="info-icon">
                    <i className="fas fa-phone"></i>
                  </div>
                  <div className="info-content">
                    <h4>Call Us</h4>
                    <p>+91 98765 43210</p>
                  </div>
                </motion.div>

                <motion.div 
                  className="info-item"
                  whileHover={{ x: 8, transition: { duration: 0.3 } }}
                >
                  <div className="info-icon">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div className="info-content">
                    <h4>Email Us</h4>
                    <p>hello@zerobycineviv.com</p>
                  </div>
                </motion.div>

                <motion.div 
                  className="info-item"
                  whileHover={{ x: 8, transition: { duration: 0.3 } }}
                >
                  <div className="info-icon">
                    <i className="fab fa-instagram"></i>
                  </div>
                  <div className="info-content">
                    <h4>Follow Us</h4>
                    <p>@zerobycineviv</p>
                  </div>
                </motion.div>
              </div>

              {/* Social Links */}
              <div className="social-links">
                <motion.a 
                  href="#" 
                  className="social-link"
                  whileHover={{ scale: 1.1, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <i className="fab fa-instagram"></i>
                </motion.a>
                <motion.a 
                  href="#" 
                  className="social-link"
                  whileHover={{ scale: 1.1, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <i className="fab fa-linkedin-in"></i>
                </motion.a>
                <motion.a 
                  href="#" 
                  className="social-link"
                  whileHover={{ scale: 1.1, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <i className="fab fa-youtube"></i>
                </motion.a>
                <motion.a 
                  href="#" 
                  className="social-link"
                  whileHover={{ scale: 1.1, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <i className="fab fa-twitter"></i>
                </motion.a>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.form
              className="contact-form"
              onSubmit={handleSubmit}
              variants={itemVariants}
            >
              <div className="form-header">
                <h3>Send Us a Message</h3>
                <p>Fill out the form below and we'll get back to you as soon as possible.</p>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Your Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="dev@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Company Name</label>
                  <input
                    type="text"
                    name="company"
                    placeholder="Your Company"
                    value={formData.company}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Service Interested In</label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a Service</option>
                    <option value="video-production">Video Production</option>
                    <option value="content-marketing">Content Marketing</option>
                    <option value="social-media">Social Media Management</option>
                    <option value="brand-strategy">Brand Strategy</option>
                    <option value="web-development">Website Development</option>
                    <option value="other">Other</option>
                  </select>
                </div>
               
              </div>
              
              <div className="form-group checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="freeConsultingCall"
                    checked={formData.freeConsultingCall}
                    onChange={handleChange}
                  />
                  <span className="checkbox-text">Request a Free Consulting Call</span>
                </label>
              </div>
              
              {formData.freeConsultingCall && (
                <div className="form-group">
                  <label>Preferred Date & Time</label>
                  <input
                    type="datetime-local"
                    name="preferredDateTime"
                    value={formData.preferredDateTime}
                    onChange={handleChange}
                  />
                </div>
              )}
              
              <div className="form-group">
                <label>Your Message</label>
                <textarea
                  name="message"
                  placeholder="Tell us about your project, goals, and how we can help you..."
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <motion.button 
                type="submit" 
                className="submit-btn" 
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              >
                {isSubmitting ? (
                  <span className="loading-text">
                    <span className="spinner"></span>
                    Sending...
                  </span>
                ) : (
                  <span>
                    Send Message <i className="fas fa-paper-plane"></i>
                  </span>
                )}
              </motion.button>

              {submitStatus === 'success' && (
                <motion.div 
                  className="status-message success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <i className="fas fa-check-circle"></i>
                  <span>Thank you! We'll get back to you soon.</span>
                </motion.div>
              )}
              
              {submitStatus === 'error' && (
                <motion.div 
                  className="status-message error"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <i className="fas fa-exclamation-circle"></i>
                  <span>Something went wrong. Please try again.</span>
                </motion.div>
              )}
            </motion.form>
          </div>
        </div>
      </motion.section>

      {/* Map Section */}
      <motion.section 
        className="map-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-150px" }}
        variants={scaleVariants}
      >
        <iframe
          title="Office Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.298561112967!2d77.3129373!3d28.567593!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce4f55d8f5f5b%3A0x8b0b5b8b5b8b5b8b!2sNoida%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1699000000000!5m2!1sen!2sin"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </motion.section>
    </div>
  );
};

export default ContactPage;
