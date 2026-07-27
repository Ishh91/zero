import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import WorkPage from './pages/WorkPage';
import ServicesPage from './pages/ServicesPage';
import TeamPage from './pages/TeamPage';
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage';
import BlogDetailPage from './pages/BlogDetailPage';
import AboutPage from './pages/AboutPage';
import DigitalMarketingPage from './pages/DigitalMarketingPage';
import WebAppDevelopmentPage from './pages/WebAppDevelopmentPage';
import AIAgentsPage from './pages/AIAgentsPage';
import BusinessCompliancesPage from './pages/BusinessCompliancesPage';
import StartupFoundationPage from './pages/StartupFoundationPage';
import CaseStudiesPage from './pages/CaseStudiesPage';
import CaseStudyDetailPage from './pages/CaseStudyDetailPage';
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';
import BlogManagement from './admin/BlogManagement';
import PortfolioManagement from './admin/PortfolioManagement';
import TeamManagement from './admin/TeamManagement';
import PersonalBrandingManagement from './admin/PersonalBrandingManagement';
import MediaLibrary from './admin/MediaLibrary';
import InquiryManagement from './admin/InquiryManagement';
import CaseStudyManagement from './admin/CaseStudyManagement';
import SiteSettingsManagement from './admin/SiteSettingsManagement';
import GalleryVideoManagement from './admin/GalleryVideoManagement';
import './App.css';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Optimize AOS for mobile performance
    AOS.init({
      duration: 800,
      once: true, // Only animate once per element
      mirror: false, // Disable mirroring on scroll back
      offset: 100,
      delay: 50,
      easing: 'ease-out-cubic',
      disable: () => window.innerWidth < 768, // Disable AOS on small screens for better performance
    });
    
    // Initialize Lenis for opraah.in-style smooth scrolling - simple setup
    const lenis = new Lenis({
      lerp: 0.1,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);
  
  // Separate useEffect for auth
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  return (
    <HelmetProvider>
      <Router>
        <div className="App">
           
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={
              <>
                <Navbar />
                <HomePage />
                <Footer />
              </>
            } />
            <Route path="/work" element={<><Navbar /><WorkPage /><Footer /></>} />
            <Route path="/services" element={<><Navbar /><ServicesPage /><Footer /></>} />
            <Route path="/services/digital-marketing" element={<><Navbar /><DigitalMarketingPage /><Footer /></>} />
            <Route path="/services/web-app-development" element={<><Navbar /><WebAppDevelopmentPage /><Footer /></>} />
            <Route path="/services/ai-agents" element={<><Navbar /><AIAgentsPage /><Footer /></>} />
            <Route path="/services/business-compliances" element={<><Navbar /><BusinessCompliancesPage /><Footer /></>} />
            <Route path="/services/startup-foundation" element={<><Navbar /><StartupFoundationPage /><Footer /></>} />
            <Route path="/team" element={<><Navbar /><TeamPage /><Footer /></>} />
            <Route path="/contact" element={<><Navbar /><ContactPage /><Footer /></>} />
            <Route path="/blog" element={<><Navbar /><BlogPage /><Footer /></>} />
            <Route path="/blog/:slug" element={<><Navbar /><BlogDetailPage /><Footer /></>} />
            <Route path="/about" element={<><Navbar /><AboutPage /><Footer /></>} />
            <Route path="/case-studies" element={<><Navbar /><CaseStudiesPage /><Footer /></>} />
            <Route path="/case-studies/:slug" element={<><Navbar /><CaseStudyDetailPage /><Footer /></>} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLogin setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />}>
              <Route index element={<div className="dashboard-welcome"><h2>Welcome to Admin Dashboard</h2><p>Select an option from the sidebar to manage content.</p></div>} />
            </Route>
            <Route path="/admin/blogs" element={<AdminDashboard />}>
              <Route index element={<BlogManagement />} />
            </Route>
            <Route path="/admin/portfolio" element={<AdminDashboard />}>
              <Route index element={<PortfolioManagement />} />
            </Route>
            <Route path="/admin/team" element={<AdminDashboard />}>
              <Route index element={<TeamManagement />} />
            </Route>
            <Route path="/admin/personal-branding" element={<AdminDashboard />}>
              <Route index element={<PersonalBrandingManagement />} />
            </Route>
            <Route path="/admin/case-studies" element={<AdminDashboard />}>
              <Route index element={<CaseStudyManagement />} />
            </Route>
            <Route path="/admin/media" element={<AdminDashboard />}>
              <Route index element={<MediaLibrary />} />
            </Route>
            <Route path="/admin/inquiries" element={<AdminDashboard />}>
              <Route index element={<InquiryManagement />} />
            </Route>
            <Route path="/admin/site-settings" element={<AdminDashboard />}>
              <Route index element={<SiteSettingsManagement />} />
            </Route>
            <Route path="/admin/gallery-videos" element={<AdminDashboard />}>
              <Route index element={<GalleryVideoManagement />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;