import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { toast } from '../components/UI/Toast';
import './Admin.css';

const SiteSettingsManagement = () => {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    heroVideoUrl: '',
    heroTitle: '',
    heroSubtitle: '',
  });
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState('');

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/site-settings`);
      if (response.data.success && response.data.data) {
        setFormData(response.data.data);
        setVideoPreview(response.data.data.heroVideoUrl || '');
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
      toast.error('Failed to load site settings');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submitData = new FormData();
    submitData.append('data', JSON.stringify(formData));
    if (videoFile) {
      submitData.append('heroVideo', videoFile);
    }

    setSaving(true);
    try {
      const response = await api.put(`/site-settings`, submitData);
      if (response.data.success) {
        toast.success('Settings saved successfully!');
        fetchSettings();
        setVideoFile(null);
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error(error.response?.data?.message || 'Error saving settings');
    } finally {
      setSaving(false);
    }
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
      setVideoPreview(URL.createObjectURL(file));
    }
  };

  if (loading) return <div className="loading-container">Loading...</div>;

  return (
    <div className="admin-site-settings">
      <div className="admin-header-actions">
        <h2>Site Settings</h2>
      </div>

      <form onSubmit={handleSubmit} className="settings-form">
        <div className="form-section">
          <h3>Hero Section Settings</h3>
          
          <div className="form-group">
            <label>Hero Title</label>
            <input
              type="text"
              value={formData.heroTitle || ''}
              onChange={(e) => setFormData({ ...formData, heroTitle: e.target.value })}
              placeholder="EVERY SUCCESSFULL BRAND STARTS FROM ZERO"
            />
          </div>

          <div className="form-group">
            <label>Hero Subtitle</label>
            <input
              type="text"
              value={formData.heroSubtitle || ''}
              onChange={(e) => setFormData({ ...formData, heroSubtitle: e.target.value })}
              placeholder="BUILD FROM SCRATCH"
            />
          </div>

          <div className="form-group">
            <label>Hero Background Video</label>
            <input type="file" accept="video/*" onChange={handleVideoChange} />
            {videoPreview && (
              <div style={{ marginTop: '15px' }}>
                <video src={videoPreview} controls style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: '8px' }} />
              </div>
            )}
            {formData.heroVideoUrl && !videoFile && (
              <p style={{ marginTop: '10px', color: 'rgba(255,153,0)' }}>
              <i className="fas fa-check-circle"></i> Current video saved in database
              </p>
            )}
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary" disabled={saving}>
              {saving ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SiteSettingsManagement;
