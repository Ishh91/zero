import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Floating3D from './Floating3D';
import logo from '../assets/images/logo1.svg';
import './Footer.css';

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <motion.footer
      className="footer-section"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <Floating3D />
      
      <div className="footer-main">
        <div className="container">
          {/* Footer Grid */}
          <div className="footer-grid">
            {/* Brand Column */}
            <motion.div className="footer-column footer-brand" variants={itemVariants}>
              <Link to="/" className="footer-logo">
                <img src={logo} alt="ZERO - Build From Scratch" className="footer-logo-img" />
              </Link>
              <p className="footer-description">
                We build brands from scratch and create cinematic content that drives real business growth.
              </p>
              <div className="footer-contact-info">
                <div className="contact-item">
                  <i className="fas fa-envelope"></i>
                  <span>hello@zerobycineviv.com</span>
                </div>
                <div className="contact-item">
                  <i className="fas fa-phone"></i>
                  <span>+91 98765 43210</span>
                </div>
              </div>
              <div className="footer-social">
                <a href="#" className="social-icon">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fas fa-envelope"></i>
                </a>
              </div>
            </motion.div>

            {/* Company Column */}
            <motion.div className="footer-column" variants={itemVariants}>
              <h5 className="footer-column-title">Company</h5>
              <ul className="footer-link-list">
                <li><Link to="/about" className="footer-link">About Us</Link></li>
                <li><Link to="/team" className="footer-link">Our Team</Link></li>
                <li><a href="#" className="footer-link">Blog</a></li>
                <li><Link to="/work" className="footer-link">Case Studies</Link></li>
                <li><Link to="/contact" className="footer-link">Contact Us</Link></li>
              </ul>
            </motion.div>

            {/* Services Column */}
            <motion.div className="footer-column" variants={itemVariants}>
              <h5 className="footer-column-title">Services</h5>
              <ul className="footer-link-list">
                <li><Link to="/services/digital-marketing" className="footer-link">Digital Marketing</Link></li>
                <li><Link to="/services/web-app-development" className="footer-link">Web & App Development</Link></li>
                <li><Link to="/services/ai-agents" className="footer-link">AI & AI Agents</Link></li>
                <li><Link to="/services/business-compliances" className="footer-link">Business Compliances</Link></li>
                <li><Link to="/services/startup-foundation" className="footer-link">Startup Foundation</Link></li>
              </ul>
            </motion.div>

            {/* Solutions Column */}
            <motion.div className="footer-column" variants={itemVariants}>
              <h5 className="footer-column-title">Solutions</h5>
              <ul className="footer-link-list">
                <li><Link to="/personal-branding" className="footer-link">Personal Branding</Link></li>
                <li><a href="#" className="footer-link">Brand Strategy</a></li>
                <li><a href="#" className="footer-link">Video Production</a></li>
                <li><a href="#" className="footer-link">Content Creation</a></li>
                <li><a href="#" className="footer-link">Growth Systems</a></li>
              </ul>
            </motion.div>
          </div>

          {/* Newsletter Section */}
          <motion.div className="newsletter-section" variants={itemVariants}>
            <div className="newsletter-content">
              <h4 className="newsletter-title">Stay updated with ZERO</h4>
              <p className="newsletter-text">Content, marketing and brand growth updates from our team.</p>
            </div>
            <form className="newsletter-form">
              <input
                type="email"
                placeholder="Email address"
                className="newsletter-input"
              />
              <button type="submit" className="newsletter-button">
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="container">
          <p className="footer-copyright">
            Copyright © {new Date().getFullYear()} ZERO BY CINEVIV. All rights reserved.
          </p>
          <div className="footer-bottom-links">
            <a href="#" className="footer-bottom-link">Cookie Policy</a>
            <a href="#" className="footer-bottom-link">Privacy Policy</a>
            <a href="#" className="footer-bottom-link">Terms of Service</a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
