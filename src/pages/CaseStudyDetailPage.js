import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import Floating3D from '../components/Floating3D';
import './CaseStudyDetailPage.css';
import './ServiceDetail.css';

const CaseStudyDetailPage = () => {
  const { slug } = useParams();
  const [caseStudy, setCaseStudy] = useState(null);
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
      challengeDescription: 'Our client\'s sales operation depended on a CRM ecosystem that needed to stay in sync with multiple downstream systems — contact records, sales opportunities, custom fields, and tags — in real time. Off-the-shelf integrations covered the basic cases but broke down under real-world conditions: webhook deliveries arrived out of order, duplicate events created duplicate contacts, and there was no reliable audit trail when something went wrong. Every sync failure meant a sales rep working from stale or incorrect data — a direct hit to revenue-generating activity.',
      whatWeBuilt: 'NexCRM is a middleware platform that sits between the client\'s CRM and every system that needs to talk to it. It ingests webhook events, processes them through a queue-based pipeline designed for reliability rather than speed-at-all-costs, and keeps contact and opportunity records consistent across every connected system — even when the underlying network is unreliable or events arrive out of sequence.',
      keyCapabilities: [
        'Reliable webhook ingestion with automatic retry handling',
        'Idempotency safeguards that eliminate duplicate records',
        'Full audit trail for every sync event — what, when, and why',
        'Structured data validation layer before touching the CRM',
        'Configurable mapping without requiring code deployment',
        'Encrypted credential storage and data-in-transit protection'
      ],
      technicalApproach: 'We built NexCRM around an event-driven architecture: a message queue absorbs incoming webhook traffic so that no event is ever lost, even during traffic spikes or temporary downstream outages. Every event carries an idempotency key, so reprocessing the same event twice — which happens constantly in real-world webhook systems — never creates duplicate data. A normalized database layer maintains a complete history of every change, which became essential not just for debugging but for the client\'s own internal reporting needs.',
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
      challengeDescription: 'Our client needed to verify the identity of users at scale — onboarding thousands of people who upload identity documents and a live photo or video, expecting a trust decision back in seconds. Manual review didn\'t scale, and simple automated checks weren\'t catching increasingly sophisticated fraud: forged documents, photo substitution, and AI-generated synthetic faces were all slipping through basic verification. The client needed a system that was both fast enough for a good user experience and rigorous enough to catch fraud patterns that evolve constantly.',
      whatWeBuilt: 'TrustLayer AI is a multi-stage verification platform that evaluates an identity submission across more than a dozen independent checks before returning a trust decision. Rather than relying on any single signal, the system cross-references document authenticity, biometric matching, and behavioural risk indicators — so that a single forged element doesn\'t automatically pass simply because the rest of the submission looks legitimate. Every decision is explainable: the platform produces a structured summary an investigator can review, not just a pass/fail flag.',
      keyCapabilities: [
        'Automated document data extraction with built-in consistency checks',
        'Biometric face-matching between documents and live capture',
        'Liveness detection to flag photo/video replays or masks',
        'Detection layer tuned for AI-generated and manipulated media',
        'Cross-submission link analysis to surface coordinated fraud',
        'Composite risk score with full explainability',
        'Metadata-level tamper detection on uploaded files',
        'AI-generated investigator summary compressing multi-signal cases'
      ],
      technicalApproach: 'We treated this as a defense-in-depth problem rather than a single-model problem. Each verification stage — document analysis, biometric matching, liveness, media authenticity, behavioural signals — runs as an independent module, and the platform\'s risk engine combines their outputs into a single weighted decision rather than gating on any one check in isolation. This means the system degrades gracefully: if one signal is inconclusive, others still contribute to the decision, and the explainability layer means a human reviewer always understands why a case was flagged, rather than trusting a black-box score.',
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
    fetchCaseStudy();
  }, [slug]);

  const fetchCaseStudy = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/case-studies/${slug}`);
      if (response.data.data) {
        setCaseStudy(response.data.data);
      } else {
        const sample = sampleCaseStudies.find(cs => cs.slug === slug);
        setCaseStudy(sample || sampleCaseStudies[0]);
      }
    } catch (error) {
      console.error('Error fetching case study:', error);
      const sample = sampleCaseStudies.find(cs => cs.slug === slug);
      setCaseStudy(sample || sampleCaseStudies[0]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="case-study-detail-page">
        <div className="loading-container">
          <div className="loader"></div>
        </div>
      </div>
    );
  }

  if (!caseStudy) {
    return (
      <div className="case-study-detail-page">
        <div className="container">
          <h2>Case Study not found</h2>
          <Link to="/case-studies">Back to Case Studies</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="case-study-detail-page">
      <section className="case-study-detail-hero">
        <Floating3D />
        <div className="container">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <Link to="/case-studies" className="back-link">
                <i className="fas fa-arrow-left"></i> Back to Case Studies
              </Link>
            </motion.div>
            <motion.div variants={itemVariants}>
              <div className="hero-badge">
                <i className="fas fa-briefcase"></i> Case Study
              </div>
            </motion.div>
            <motion.h1 variants={titleVariants}>{caseStudy.title}</motion.h1>
            <motion.p variants={itemVariants} className="hero-subtitle">{caseStudy.subtitle}</motion.p>
          </motion.div>
        </div>
      </section>

      <section className="case-study-detail-content">
        <div className="container">
          <motion.div
            className="case-study-meta-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-150px" }}
            variants={containerVariants}
          >
            {[
              { icon: "fas fa-industry", title: "Industry", value: caseStudy.industry },
              { icon: "fas fa-handshake", title: "Engagement Type", value: caseStudy.engagementType },
              { icon: "fas fa-truck", title: "Delivery Model", value: caseStudy.deliveryModel },
              { icon: "fas fa-circle-check", title: "Status", value: caseStudy.status }
            ].map((meta, index) => (
              <motion.div key={index} className="meta-card" variants={itemVariants}>
                <i className={meta.icon}></i>
                <h3>{meta.title}</h3>
                <p>{meta.value}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="case-study-tech-section"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-150px" }}
            variants={containerVariants}
          >
            <motion.h2 variants={titleVariants}><i className="fas fa-code"></i> Technical Stack</motion.h2>
            <div className="tech-tags-large">
              {caseStudy.technicalStack.map((tech, i) => (
                <motion.span key={i} className="tech-tag-large" variants={itemVariants}>{tech}</motion.span>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="case-study-section"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-150px" }}
            variants={containerVariants}
          >
            <motion.h2 variants={titleVariants}><i className="fas fa-triangle-exclamation"></i> The Challenge</motion.h2>
            <motion.p variants={itemVariants}>{caseStudy.challengeDescription}</motion.p>
          </motion.div>

          <motion.div
            className="case-study-section"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-150px" }}
            variants={containerVariants}
          >
            <motion.h2 variants={titleVariants}><i className="fas fa-wrench"></i> What We Built</motion.h2>
            <motion.p variants={itemVariants}>{caseStudy.whatWeBuilt}</motion.p>

            <motion.div className="key-capabilities" variants={containerVariants}>
              <motion.h3 variants={titleVariants}>Key Capabilities Delivered</motion.h3>
              <ul>
                {caseStudy.keyCapabilities.map((capability, i) => (
                  <motion.li key={i} variants={itemVariants}>
                    <i className="fas fa-check-circle"></i>
                    {capability}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          <motion.div
            className="case-study-section"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-150px" }}
            variants={containerVariants}
          >
            <motion.h2 variants={titleVariants}><i className="fas fa-cogs"></i> Technical Approach</motion.h2>
            <motion.p variants={itemVariants}>{caseStudy.technicalApproach}</motion.p>
          </motion.div>

          <motion.div
            className="case-study-metrics-section"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-150px" }}
            variants={containerVariants}
          >
            <div className="metrics-grid">
              {caseStudy.metrics?.metric1 && (
                <motion.div className="metric-card" variants={itemVariants}>
                  <span className="metric-value-large">{caseStudy.metrics.metric1.value}</span>
                  <span className="metric-label-large">{caseStudy.metrics.metric1.label}</span>
                </motion.div>
              )}
              {caseStudy.metrics?.metric2 && (
                <motion.div className="metric-card" variants={itemVariants}>
                  <span className="metric-value-large">{caseStudy.metrics.metric2.value}</span>
                  <span className="metric-label-large">{caseStudy.metrics.metric2.label}</span>
                </motion.div>
              )}
              {caseStudy.metrics?.metric3 && (
                <motion.div className="metric-card" variants={itemVariants}>
                  <span className="metric-value-large">{caseStudy.metrics.metric3.value}</span>
                  <span className="metric-label-large">{caseStudy.metrics.metric3.label}</span>
                </motion.div>
              )}
            </div>
          </motion.div>

          {caseStudy.testimonial && (
            <motion.div
              className="case-study-testimonial"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-150px" }}
              variants={containerVariants}
            >
              <motion.div variants={itemVariants} className="testimonial-icon">
                <i className="fas fa-quote-left"></i>
              </motion.div>
              <motion.blockquote variants={itemVariants}>"{caseStudy.testimonial.quote}"</motion.blockquote>
              <motion.cite variants={itemVariants}>— {caseStudy.testimonial.author}</motion.cite>
            </motion.div>
          )}

          <motion.div
            className="case-study-cta"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-150px" }}
            variants={scaleVariants}
          >
            <h2>Ready to Start Your Project?</h2>
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

export default CaseStudyDetailPage;
