import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import Floating3D from '../components/Floating3D';
import './CaseStudiesPage.css';
import './ServiceDetail.css';

const CaseStudiesPage = () => {
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true);
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

  const sampleCaseStudies = [
    {
      _id: '1',
      title: 'NexCRM',
      slug: 'nex-crm',
      subtitle: 'Event-Driven CRM Integration & Automation Middleware',
      client: 'NexCorp',
      industry: 'Sales & Marketing Technology / CRM Operations',
      engagementType: 'End-to-end build — architecture, development, deployment, handover',
      coreChallenge: 'Disconnected CRM data and unreliable third-party sync',
      deliveryModel: 'Single accountable team, milestone-based delivery',
      status: 'Live in production',
      technicalStack: ['Node.js', 'Redis', 'PostgreSQL', 'REST API', 'Cloud-native'],
      challengeDescription: 'Our client\'s sales operation depended on a CRM ecosystem that needed to stay in sync with multiple downstream systems — contact records, sales opportunities, custom fields, and tags — in real time. Off-the-shelf integrations covered the basic cases but broke down under real-world conditions: webhook deliveries arrived out of order, duplicate events created duplicate contacts, and there was no reliable audit trail when something went wrong.',
      whatWeBuilt: 'NexCRM is a middleware platform that sits between the client\'s CRM and every system that needs to talk to it. It ingests webhook events, processes them through a queue-based pipeline designed for reliability rather than speed-at-all-costs, and keeps contact and opportunity records consistent across every connected system.',
      keyCapabilities: [
        'Reliable webhook ingestion with automatic retry handling',
        'Idempotency safeguards that eliminate duplicate records',
        'Full audit trail for every sync event — what, when, and why',
        'Structured data validation layer before touching the CRM',
        'Configurable mapping without requiring code deployment',
        'Encrypted credential storage and data-in-transit protection'
      ],
      technicalApproach: 'We built NexCRM around an event-driven architecture: a message queue absorbs incoming webhook traffic so that no event is ever lost, even during traffic spikes or temporary downstream outages. Every event carries an idempotency key, so reprocessing the same event twice — which happens constantly in real-world webhook systems — never creates duplicate data.',
      metrics: {
        metric1: { value: '99.9%', label: 'Sync Reliability Post-Launch' },
        metric2: { value: '0', label: 'Duplicate Records Since Go-Live' },
        metric3: { value: '100%', label: 'Events Traceable via Audit Log' }
      },
      testimonial: {
        quote: 'Before this, every sync issue meant a support ticket and a guessing game about what went wrong. Now we can trace any record back to the exact event that created it — that traceability alone changed how our ops team works.',
        author: 'Operations Lead, Client Organisation'
      },
      featured: true,
      publishedAt: new Date()
    },
    {
      _id: '2',
      title: 'TrustLayer AI',
      slug: 'trust-layer-ai',
      subtitle: 'AI-Powered Identity Verification & Fraud Risk Platform',
      client: 'TrustLayer Inc',
      industry: 'Fintech / Digital Identity & Trust Infrastructure',
      engagementType: 'End-to-end AI/ML platform build and deployment',
      coreChallenge: 'Manual identity verification couldn\'t scale or catch sophisticated fraud',
      deliveryModel: 'Iterative model development with continuous client validation',
      status: 'Live in production',
      technicalStack: ['Computer Vision', 'Biometric Matching', 'Graph Analysis', 'LLM', 'Cloud GPU'],
      challengeDescription: 'Our client needed to verify the identity of users at scale — onboarding thousands of people who upload identity documents and a live photo or video, expecting a trust decision back in seconds. Manual review didn\'t scale, and simple automated checks weren\'t catching increasingly sophisticated fraud.',
      whatWeBuilt: 'TrustLayer AI is a multi-stage verification platform that evaluates an identity submission across more than a dozen independent checks before returning a trust decision. Rather than relying on any single signal, the system cross-references document authenticity, biometric matching, and behavioural risk indicators.',
      keyCapabilities: [
        'Automated document data extraction with built-in consistency checks',
        'Biometric face-matching between documents and live capture',
        'Liveness detection to flag photo/video replays or masks',
        'Detection layer tuned for AI-generated and manipulated media',
        'Cross-submission link analysis to surface coordinated fraud',
        'Composite risk score with full explainability'
      ],
      technicalApproach: 'We treated this as a defense-in-depth problem rather than a single-model problem. Each verification stage — document analysis, biometric matching, liveness, media authenticity, behavioural signals — runs as an independent module, and the platform\'s risk engine combines their outputs into a single weighted decision rather than gating on any one check in isolation.',
      metrics: {
        metric1: { value: 'Seconds', label: 'Average Decision Time' },
        metric2: { value: '12+', label: 'Independent Verification Signals' },
        metric3: { value: 'Explainable', label: 'Every Decision, Audit-Ready' }
      },
      testimonial: {
        quote: 'What stood out wasn\'t just the detection accuracy — it was that every flagged case comes with a clear explanation. Our investigators aren\'t guessing why the system raised a concern; they can see exactly which signals triggered it.',
        author: 'Head of Trust & Safety, Client Organisation'
      },
      featured: true,
      publishedAt: new Date()
    }
  ];

  useEffect(() => {
    fetchCaseStudies();
  }, []);

  const fetchCaseStudies = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/case-studies`);
      if (response.data.data.length > 0) {
        setCaseStudies(response.data.data);
      } else {
        setCaseStudies(sampleCaseStudies);
      }
    } catch (error) {
      console.error('Error fetching case studies:', error);
      setCaseStudies(sampleCaseStudies);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="case-studies-page">
      <section className="case-studies-hero">
        <Floating3D />
        <div className="container">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <div className="hero-badge">
                <i className="fas fa-briefcase"></i> Case Studies
              </div>
            </motion.div>
            <motion.h1 variants={titleVariants}>Client Case Studies</motion.h1>
            <motion.p variants={itemVariants}>Real-world solutions, real results. See how we've helped businesses transform their operations.</motion.p>
          </motion.div>
        </div>
      </section>

      <section className="case-studies-list">
        <div className="container">
          {loading ? (
            <div className="loading-container">
              <div className="loader"></div>
            </div>
          ) : (
            <motion.div
              className="case-studies-grid"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-150px" }}
            >
              {caseStudies.map((caseStudy, index) => (
                <motion.div
                  key={caseStudy._id}
                  className="case-study-card"
                  variants={itemVariants}
                  whileHover={!isMobile ? { y: -12 } : undefined}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Link to={`/case-studies/${caseStudy.slug}`} className="case-study-link">
                    <motion.div variants={itemVariants} className="case-study-number">
                      CASE STUDY {String(index + 1).padStart(2, '0')}
                    </motion.div>
                    <motion.h2 variants={itemVariants}>{caseStudy.title}</motion.h2>
                    <motion.h3 variants={itemVariants} className="case-study-subtitle">{caseStudy.subtitle}</motion.h3>
                    
                    <motion.div variants={containerVariants} className="case-study-meta">
                      <motion.div variants={itemVariants} className="meta-item">
                        <i className="fas fa-industry"></i>
                        <span>{caseStudy.industry}</span>
                      </motion.div>
                      <motion.div variants={itemVariants} className="meta-item">
                        <i className="fas fa-building"></i>
                        <span>{caseStudy.client}</span>
                      </motion.div>
                      <motion.div variants={itemVariants} className="meta-item">
                        <i className="fas fa-circle-check"></i>
                        <span>{caseStudy.status}</span>
                      </motion.div>
                    </motion.div>

                    <motion.div variants={containerVariants} className="case-study-challenge">
                      <motion.h4 variants={titleVariants}><i className="fas fa-lightbulb"></i> The Challenge</motion.h4>
                      <motion.p variants={itemVariants}>{caseStudy.coreChallenge}</motion.p>
                    </motion.div>

                    <motion.div variants={containerVariants} className="case-study-tech-stack">
                      <motion.h4 variants={titleVariants}><i className="fas fa-code"></i> Technical Stack</motion.h4>
                      <div className="tech-tags">
                        {caseStudy.technicalStack.map((tech, i) => (
                          <motion.span key={i} className="tech-tag" variants={itemVariants}>{tech}</motion.span>
                        ))}
                      </div>
                    </motion.div>

                    <motion.div variants={containerVariants} className="case-study-metrics">
                      {caseStudy.metrics?.metric1 && (
                        <motion.div className="metric-item" variants={itemVariants}>
                          <span className="metric-value">{caseStudy.metrics.metric1.value}</span>
                          <span className="metric-label">{caseStudy.metrics.metric1.label}</span>
                        </motion.div>
                      )}
                      {caseStudy.metrics?.metric2 && (
                        <motion.div className="metric-item" variants={itemVariants}>
                          <span className="metric-value">{caseStudy.metrics.metric2.value}</span>
                          <span className="metric-label">{caseStudy.metrics.metric2.label}</span>
                        </motion.div>
                      )}
                      {caseStudy.metrics?.metric3 && (
                        <motion.div className="metric-item" variants={itemVariants}>
                          <span className="metric-value">{caseStudy.metrics.metric3.value}</span>
                          <span className="metric-label">{caseStudy.metrics.metric3.label}</span>
                        </motion.div>
                      )}
                    </motion.div>

                    <motion.div variants={itemVariants} className="view-case-study-btn">
                      View Full Case Study <i className="fas fa-arrow-right"></i>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

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
                <i className="fas fa-rocket"></i> Our Delivery Philosophy
              </div>
              <h2>What These Projects Have In Common</h2>
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
                whileHover={!isMobile ? { y: -5 } : undefined}
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
            <h3>Ready to Start Your Project?</h3>
            <p>Let's discuss how we can help you solve your most challenging problems.</p>
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

export default CaseStudiesPage;
