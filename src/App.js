import React, { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import './App.css';

// Lazy loaded public pages
const WorkPage = lazy(() => import('./pages/WorkPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const TeamPage = lazy(() => import('./pages/TeamPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const BlogDetailPage = lazy(() => import('./pages/BlogDetailPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const DigitalMarketingPage = lazy(() => import('./pages/DigitalMarketingPage'));
const WebAppDevelopmentPage = lazy(() => import('./pages/WebAppDevelopmentPage'));
const AIAgentsPage = lazy(() => import('./pages/AIAgentsPage'));
const BusinessCompliancesPage = lazy(() => import('./pages/BusinessCompliancesPage'));
const StartupFoundationPage = lazy(() => import('./pages/StartupFoundationPage'));
const CaseStudiesPage = lazy(() => import('./pages/CaseStudiesPage'));
const CaseStudyDetailPage = lazy(() => import('./pages/CaseStudyDetailPage'));

// Lazy loaded admin pages
const AdminLogin = lazy(() => import('./admin/AdminLogin'));
const AdminDashboard = lazy(() => import('./admin/AdminDashboard'));
const BlogManagement = lazy(() => import('./admin/BlogManagement'));
const PortfolioManagement = lazy(() => import('./admin/PortfolioManagement'));
const TeamManagement = lazy(() => import('./admin/TeamManagement'));
const PersonalBrandingManagement = lazy(() => import('./admin/PersonalBrandingManagement'));
const MediaLibrary = lazy(() => import('./admin/MediaLibrary'));
const InquiryManagement = lazy(() => import('./admin/InquiryManagement'));
const CaseStudyManagement = lazy(() => import('./admin/CaseStudyManagement'));
const SiteSettingsManagement = lazy(() => import('./admin/SiteSettingsManagement'));
const GalleryVideoManagement = lazy(() => import('./admin/GalleryVideoManagement'));
const TestimonialManagement = lazy(() => import('./admin/TestimonialManagement'));

// Lightweight fallback loader
const RouteLoader = () => (
  <div style={{
    minHeight: '60vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ff9933'
  }}>
    <div className="loader" style={{
      width: '40px',
      height: '40px',
      border: '3px solid rgba(255, 153, 51, 0.2)',
      borderTop: '3px solid #ff9933',
      borderRadius: '50%',
      animation: 'spin 0.8s linear infinite'
    }}></div>
  </div>
);

function App() {
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

    let animationFrameId;
    function raf(time) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }

    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
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

  return (
    <HelmetProvider>
      <Router>
        <div className="App">
          <Suspense fallback={<RouteLoader />}>
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
              <Route path="/admin/testimonials" element={<AdminDashboard />}>
                <Route index element={<TestimonialManagement />} />
              </Route>
            </Routes>
          </Suspense>
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;