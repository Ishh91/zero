import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SectionParticleBackground from './SectionParticleBackground';
import './FAQ.css';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' && window.innerWidth < 768
  );

  const faqData = [
    {
      question: "What services does ZERO BY CINEVIV offer?",
      answer: "We offer a comprehensive range of services including 360 Digital Marketing, Website and App Development, AI & AI Agents, Business Compliances, and Startup Foundation. We help brands build from zero to market leadership."
    },
    {
      question: "How long does it take to see results?",
      answer: "Results vary based on the service and your goals. Typically, you'll start seeing initial traction within 4-6 weeks, with significant results within 3-6 months for most marketing campaigns."
    },
    {
      question: "Do you work with startups?",
      answer: "Absolutely! We specialize in helping startups build their brand from the ground up. Our Startup Foundation service covers everything from incorporation to initial marketing setup."
    },
    {
      question: "What is your pricing model?",
      answer: "We offer flexible pricing models tailored to your needs - project-based, retainer-based, or performance-based. Contact us for a custom quote based on your specific requirements."
    },
    {
      question: "How do we get started?",
      answer: "Simply reach out through our contact page or book a call. We'll have an initial discovery call to understand your goals, then create a customized strategy for your brand."
    },
    {
      question: "Do you provide ongoing support?",
      answer: "Yes! We offer ongoing support and maintenance for all our services. We believe in building long-term partnerships and growing with our clients."
    }
  ];

  // Animation Variants
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

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section" id="faq">
      <SectionParticleBackground count={600} color="#ff9933" />
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-150px" }}
          variants={containerVariants}
          className="faq-header"
        >
          <motion.div variants={itemVariants} className="section-badge">
            <i className="fas fa-question-circle"></i>
            <span>FAQ</span>
          </motion.div>
          <motion.h2 variants={titleVariants} className="section-title">
            Frequently Asked Questions
          </motion.h2>
          <motion.p variants={itemVariants} className="section-subtitle">
            Got questions? We've got answers. If you don't see your question here, feel free to reach out.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-150px" }}
          className="faq-list"
        >
          {faqData.map((faq, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`faq-item ${openIndex === index ? 'open' : ''}`}
              onClick={() => toggleFAQ(index)}
            >
              <div className="faq-question">
                <h3>{faq.question}</h3>
                <i className={`fas fa-chevron-down ${openIndex === index ? 'rotated' : ''}`}></i>
              </div>
              <motion.div
                className="faq-answer"
                initial={{ height: 0, opacity: 0 }}
                animate={{ 
                  height: openIndex === index ? 'auto' : 0,
                  opacity: openIndex === index ? 1 : 0
                }}
                transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              >
                <p>{faq.answer}</p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
