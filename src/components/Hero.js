import React, { useState, useEffect, useRef } from 'react';
import CircularGallery from './CircularGallery';
import DotField from './DotField';
import axios from 'axios';
import './Hero.css';

const Hero = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [settings, setSettings] = useState({
    heroVideoUrl: '',
    heroTitle: 'EVERY SUCCESSFULL BRAND STARTS FROM ZERO',
    heroSubtitle: 'BUILD FROM SCRATCH',
  });
  const videoRef = useRef(null);

  useEffect(() => {
    fetchSettings();
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (videoRef.current && settings.heroVideoUrl) {
      videoRef.current.load();
    }
  }, [settings.heroVideoUrl]);

  const fetchSettings = async () => {
    try {
      const response = await axios.get(`/site-settings`);
      if (response.data.success) {
        setSettings(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching site settings:', error);
    }
  };

  return (
    <section className="hero-section">
      {settings.heroVideoUrl && (
        <video
          ref={videoRef}
          className="hero-background-video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={settings.heroPosterUrl}
        >
          <source src={settings.heroVideoUrl} type="video/mp4" />
        </video>
      )}
      <div className="hero-video-overlay"></div>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 2, pointerEvents: 'none' }}>
        <DotField
          dotRadius={isMobile ? 1 : 1.4}
          dotSpacing={isMobile ? 22 : 18}
          bulgeStrength={isMobile ? 45 : 60}
          glowRadius={isMobile ? 100 : 140}
          sparkle={false}
          waveAmplitude={0}
          cursorRadius={isMobile ? 250 : 400}
          cursorForce={0.1}
          bulgeOnly
          gradientFrom="rgba(255, 153, 0, 0.35)"
          gradientTo="rgba(255, 204, 0, 0.25)"
          glowColor="#1a1a1a"
        />
      </div>
      <div style={{ height: '100vh', minHeight: isMobile ? '600px' : '700px', position: 'relative', width: '100%', zIndex: 3 }}>
        <CircularGallery
          bend={isMobile ? 1.2 : 2}
          textColor="#ffffff"
          borderRadius={0.05}
          scrollEase={0.05}
          fontUrl="https://fonts.googleapis.com/css2?family=Bungee&display=swap"
          font={isMobile ? "bold 20px Orbitron" : "bold 30px Orbitron"}
          scrollSpeed={2}
        />
      </div>
      <div className="hero-text-section">
        <h2 className="hero-main-title">
          {(settings.heroTitle || 'EVERY SUCCESSFULL BRAND STARTS FROM ZERO').split('STARTS FROM').map((part, i, arr) => (
            <React.Fragment key={i}>
              {i === 0 ? part : <>STARTS FROM <span className="hero-highlight-text">ZERO</span></>}
              {i === 0 && <br />}
            </React.Fragment>
          ))}
        </h2>
        <p className="hero-subtext">
          {settings.heroSubtitle || 'BUILD FROM SCRATCH'}
        </p>
      </div>
    </section>
  );
};

export default Hero;
