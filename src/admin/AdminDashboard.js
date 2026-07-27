import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import axios from 'axios';
import './Admin.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalBlogs: 0,
    totalInquiries: 0,
    pendingInquiries: 0,
    totalMedia: 0,
    totalTeam: 0,
    totalPortfolio: 0,
    totalPersonalBranding: 0
  });
  const location = useLocation();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/admin/stats`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStats(response.data.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    window.location.href = '/admin';
  };

  const isActive = (path) => {
    return location.pathname === path || location.pathname === `/admin${path}`;
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-sidebar">
        <div className="sidebar-header">
          <h3>ZERO BY CINEVIV</h3>
          <p>Admin Panel</p>
        </div>
        <nav className="sidebar-nav">
          <Link to="/admin/dashboard" className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}>
            <i className="fas fa-tachometer-alt"></i> Dashboard
          </Link>
          <Link to="/admin/blogs" className={`nav-link ${isActive('/blogs') ? 'active' : ''}`}>
            <i className="fas fa-blog"></i> Blogs
          </Link>
          <Link to="/admin/case-studies" className={`nav-link ${isActive('/case-studies') ? 'active' : ''}`}>
            <i className="fas fa-briefcase"></i> Case Studies
          </Link>
          <Link to="/admin/portfolio" className={`nav-link ${isActive('/portfolio') ? 'active' : ''}`}>
            <i className="fas fa-portrait"></i> Portfolio
          </Link>
          <Link to="/admin/team" className={`nav-link ${isActive('/team') ? 'active' : ''}`}>
            <i className="fas fa-users"></i> Team
          </Link>
          <Link to="/admin/personal-branding" className={`nav-link ${isActive('/personal-branding') ? 'active' : ''}`}>
            <i className="fas fa-id-card"></i> Personal Branding
          </Link>
          <Link to="/admin/inquiries" className={`nav-link ${isActive('/inquiries') ? 'active' : ''}`}>
            <i className="fas fa-envelope"></i> Inquiries
          </Link>
          <Link to="/admin/media" className={`nav-link ${isActive('/media') ? 'active' : ''}`}>
            <i className="fas fa-photo-video"></i> Media Library
          </Link>
          <Link to="/admin/site-settings" className={`nav-link ${isActive('/site-settings') ? 'active' : ''}`}>
            <i className="fas fa-cog"></i> Site Settings
          </Link>
          <Link to="/admin/gallery-videos" className={`nav-link ${isActive('/gallery-videos') ? 'active' : ''}`}>
            <i className="fas fa-film"></i> Gallery Videos
          </Link>
        </nav>
        <button onClick={handleLogout} className="logout-btn">
          <i className="fas fa-sign-out-alt"></i> Logout
        </button>
      </div>
      
      <div className="admin-main">
        <div className="admin-header">
          <h1>{location.pathname.split('/').pop() === 'dashboard' ? 'Dashboard' : 
               location.pathname.split('/').pop() === 'blogs' ? 'Blog Management' :
               location.pathname.split('/').pop() === 'case-studies' ? 'Case Study Management' :
               location.pathname.split('/').pop() === 'portfolio' ? 'Portfolio Management' :
               location.pathname.split('/').pop() === 'personal-branding' ? 'Personal Branding Management' :
               location.pathname.split('/').pop() === 'inquiries' ? 'Inquiry Management' :
               location.pathname.split('/').pop() === 'media' ? 'Media Library' :
               location.pathname.split('/').pop() === 'site-settings' ? 'Site Settings' :
               location.pathname.split('/').pop() === 'gallery-videos' ? 'Gallery Videos Management' : 'Dashboard'}</h1>
        </div>
        
        {location.pathname === '/admin/dashboard' && (
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon"><i className="fas fa-blog"></i></div>
              <div className="stat-info">
                <h3>{stats.totalBlogs}</h3>
                <p>Total Blogs</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon"><i className="fas fa-envelope"></i></div>
              <div className="stat-info">
                <h3>{stats.totalInquiries}</h3>
                <p>Total Inquiries</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon"><i className="fas fa-clock"></i></div>
              <div className="stat-info">
                <h3>{stats.pendingInquiries}</h3>
                <p>Pending Inquiries</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon"><i className="fas fa-photo-video"></i></div>
              <div className="stat-info">
                <h3>{stats.totalMedia}</h3>
                <p>Media Files</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon"><i className="fas fa-users"></i></div>
              <div className="stat-info">
                <h3>{stats.totalTeam}</h3>
                <p>Team Members</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon"><i className="fas fa-portrait"></i></div>
              <div className="stat-info">
                <h3>{stats.totalPortfolio}</h3>
                <p>Portfolio Items</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon"><i className="fas fa-id-card"></i></div>
              <div className="stat-info">
                <h3>{stats.totalPersonalBranding}</h3>
                <p>Personal Branding</p>
              </div>
            </div>
          </div>
        )}
        
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;