import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import Floating3D from '../components/Floating3D';
import './BlogDetailPage.css';

const BlogDetailPage = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
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

  useEffect(() => {
    fetchBlog();
    window.scrollTo(0, 0);
  }, [slug]);

  const fetchBlog = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/blogs/${slug}`);
      setBlog(response.data.data);
      
      // Fetch related blogs
      const relatedResponse = await axios.get(`${process.env.REACT_APP_API_URL}/blogs`, {
        params: { category: response.data.data.category, limit: 3 }
      });
      setRelatedBlogs(relatedResponse.data.data.filter(b => b.slug !== slug));
    } catch (error) {
      console.error('Error fetching blog:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="blog-detail-page">
        <div className="loading-container">
          <div className="loader"></div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="blog-detail-page">
        <div className="container">
          <h2>Blog not found</h2>
          <Link to="/blog" className="btn btn-primary">Back to Blog</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-detail-page">
      <article className="blog-article">
        {/* Hero Section */}
        <section className="article-hero">
          <Floating3D />
          <div className="container">
            <motion.div
              className="article-header"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              <motion.span variants={itemVariants} className="article-category">{blog.category}</motion.span>
              <motion.h1 variants={titleVariants}>{blog.title}</motion.h1>
              <motion.div variants={itemVariants} className="article-meta">
                <span><i className="far fa-user"></i> {blog.author}</span>
                <span><i className="far fa-calendar"></i> {new Date(blog.publishedAt).toLocaleDateString()}</span>
                <span><i className="far fa-clock"></i> {blog.readTime} min read</span>
                <span><i className="far fa-eye"></i> {blog.views} views</span>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Content */}
        <div className="container">
          <div className="article-content-wrapper">
            <motion.div
              className="article-content"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-150px" }}
              variants={itemVariants}
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />

            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <motion.div
                className="article-tags"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-150px" }}
                variants={containerVariants}
              >
                <motion.h4 variants={titleVariants}>Tags:</motion.h4>
                <div className="tags-list">
                  {blog.tags.map((tag, index) => (
                    <motion.span key={index} className="tag" variants={itemVariants}>{tag}</motion.span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Share Section */}
            <motion.div
              className="share-section"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-150px" }}
              variants={containerVariants}
            >
              <motion.h4 variants={titleVariants}>Share this article:</motion.h4>
              <div className="share-buttons">
                <a href={`https://twitter.com/intent/tweet?text=${blog.title}&url=${window.location.href}`} target="_blank" rel="noopener noreferrer" className="share-btn twitter">
                  <i className="fab fa-twitter"></i> Twitter
                </a>
                <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}&title=${blog.title}`} target="_blank" rel="noopener noreferrer" className="share-btn linkedin">
                  <i className="fab fa-linkedin-in"></i> LinkedIn
                </a>
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`} target="_blank" rel="noopener noreferrer" className="share-btn facebook">
                  <i className="fab fa-facebook-f"></i> Facebook
                </a>
              </div>
            </motion.div>
          </div>

          {/* Related Articles */}
          {relatedBlogs.length > 0 && (
            <motion.div
              className="related-articles"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-150px" }}
              variants={containerVariants}
            >
              <motion.h3 variants={titleVariants}>Related Articles</motion.h3>
              <div className="related-grid">
                {relatedBlogs.map((related, index) => (
                  <Link to={`/blog/${related.slug}`} key={related._id} className="related-card">
                    <motion.div variants={itemVariants} className="related-image">
                      <img src={related.featuredImage || '/api/placeholder/400/250'} alt={related.title} />
                    </motion.div>
                    <motion.div variants={itemVariants} className="related-content">
                      <span className="related-category">{related.category}</span>
                      <h4>{related.title}</h4>
                      <p>{related.excerpt.substring(0, 100)}...</p>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </article>

      {/* CTA Section */}
      <section className="blog-cta">
        <div className="container">
          <motion.div
            className="cta-content"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-150px" }}
            variants={scaleVariants}
          >
            <h2>Ready to Grow Your Brand?</h2>
            <p>Let's create content that builds attention and drives results</p>
            <Link to="/contact" className="btn btn-primary">Start Your Journey →</Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default BlogDetailPage;
