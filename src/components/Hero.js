import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import defaultHeroVideo from '../assets/videos/hero.mp4';
import './Hero.css';

const Hero = () => {
  const [settings, setSettings] = useState({
    heroVideoUrl: '',
    heroTitle: 'EVERY SUCCESSFULL BRAND STARTS FROM ZERO',
    heroSubtitle: 'BUILD FROM SCRATCH',
  });
  const videoRef = useRef(null);

  const heroVideoSrc = settings.heroVideoUrl || defaultHeroVideo;

  useEffect(() => {
    fetchSettings();
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [heroVideoSrc]);

  const fetchSettings = async () => {
    try {
      const response = await axios.get(`/site-settings`);
      if (response.data.success && response.data.data) {
        setSettings(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching site settings:', error);
    }
  };

  return (
    <section className="hero-section">
      {heroVideoSrc && (
        <video
          ref={videoRef}
          key={heroVideoSrc}
          className="hero-background-video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={settings.heroPosterUrl}
        >
          <source src={heroVideoSrc} type="video/mp4" />
        </video>
      )}
      <div className="hero-video-overlay"></div>
      
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
