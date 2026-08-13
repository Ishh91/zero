import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { toast } from '../components/UI/Toast';
import { PLACEHOLDER_IMAGE } from '../utils/placeholders';
import './Admin.css';

const PortfolioManagement = () => {
  const [portfolio, setPortfolio] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Fashion',
    description: '',
    client: '',
    results: {
      views: '',
      engagement: '',
      conversions: '',
      reach: '',
      saves: '',
      shares: '',
    },
    tags: [],
    featured: false,
    order: 0,
    isActive: true,
  });
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [videoPreview, setVideoPreview] = useState('');

  const categories = ['Fashion', 'Food', 'Lifestyle', 'Brand Commercials', 'Events', 'Personal Branding', 'Product Shoots', 'Social Media Ads'];

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/portfolio`);
      setPortfolio(response.data.data || []);
    } catch (error) {
      console.error('Error fetching portfolio:', error);
      toast.error('Failed to load portfolio items');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!videoFile && !editingItem) {
      toast.error('Please select a video file');
      return;
    }
    
    const submitData = new FormData();
    submitData.append('data', JSON.stringify(formData));
    
    if (videoFile) {
      submitData.append('video', videoFile);
    }
    if (thumbnailFile) {
      submitData.append('thumbnail', thumbnailFile);
    }
    
    setUploadProgress(0);
    setLoading(true);
    
    try {
      const config = {
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(percentCompleted);
          }
        }
      };
      
      let response;
      if (editingItem) {
        response = await api.put(`/portfolio/${editingItem._id}`, submitData, config);
      } else {
        response = await api.post(`/portfolio`, submitData, config);
      }
      
      if (response.data.success) {
        fetchPortfolio();
        resetForm();
        setShowForm(false);
        toast.success(editingItem ? 'Portfolio updated successfully!' : 'Portfolio created successfully!');
      }
    } catch (error) {
      console.error('Error saving portfolio:', error);
      toast.error(error.response?.data?.message || 'Error saving portfolio');
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this portfolio item?')) {
      try {
        await api.delete(`/portfolio/${id}`);
        toast.success('Portfolio item deleted');
        fetchPortfolio();
      } catch (error) {
        console.error('Error deleting portfolio:', error);
        toast.error('Error deleting portfolio');
      }
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      category: item.category,
      description: item.description,
      client: item.client,
      results: item.results || { views: '', engagement: '', conversions: '' },
      tags: item.tags || [],
      featured: item.featured || false,
    });
    setVideoPreview(item.videoUrl);
    setThumbnailPreview(item.thumbnailUrl);
    setShowForm(true);
  };

  const resetForm = () => {
    setEditingItem(null);
    setFormData({
      title: '',
      category: 'Fashion',
      description: '',
      client: '',
      results: { views: '', engagement: '', conversions: '' },
      tags: [],
      featured: false,
    });
    setVideoFile(null);
    setThumbnailFile(null);
    setVideoPreview('');
    setThumbnailPreview('');
    setTagInput('');
  };

  const addTag = () => {
    if (tagInput && !formData.tags.includes(tagInput)) {
      setFormData({ ...formData, tags: [...formData.tags, tagInput] });
      setTagInput('');
    }
  };

  const removeTag = (tag) => {
    setFormData({ ...formData, tags: formData.tags.filter(t => t !== tag) });
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
      const url = URL.createObjectURL(file);
      setVideoPreview(url);
    }
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnailFile(file);
      const url = URL.createObjectURL(file);
      setThumbnailPreview(url);
    }
  };

  return (
    <div className="admin-portfolio">
      <div className="admin-header-actions">
        <h2>Portfolio Management</h2>
        <button onClick={() => setShowForm(true)} className="btn btn-primary">
          <i className="fas fa-plus"></i> Add New Work
        </button>
      </div>

      {/* Portfolio Grid */}
      {loading && !showForm ? (
        <div className="loading-container">Loading...</div>
      ) : (
        <div className="portfolio-admin-grid">
          {portfolio.map(item => (
            <div key={item._id} className="portfolio-admin-card">
              <div className="portfolio-admin-preview">
                {item.videoUrl && (
                  <video src={item.videoUrl} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
                )}
              </div>
              <div className="portfolio-admin-info">
                <h4>{item.title}</h4>
                <p className="category">{item.category}</p>
                <p className="client">{item.client}</p>
                <div className="admin-actions">
                  <button onClick={() => handleEdit(item)} className="btn-edit">
                    <i className="fas fa-edit"></i> Edit
                  </button>
                  <button onClick={() => handleDelete(item._id)} className="btn-delete">
                    <i className="fas fa-trash"></i> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Portfolio Form Modal */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content large">
            <div className="modal-header">
              <h3>{editingItem ? 'Edit Work' : 'Add New Work'}</h3>
              <button onClick={() => { setShowForm(false); resetForm(); }} className="close-btn">&times;</button>
            </div>
            
            <form onSubmit={handleSubmit} className="portfolio-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="form-group">
                <label>Client Name *</label>
                <input
                  type="text"
                  value={formData.client}
                  onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Description *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows="4"
                  required
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Video File *</label>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleVideoChange}
                    required={!editingItem}
                  />
                  {videoPreview && (
                    <div className="media-preview">
                      <video src={videoPreview} controls style={{ maxWidth: '100%', maxHeight: '200px', marginTop: '10px' }} />
                    </div>
                  )}
                </div>
                
                <div className="form-group">
                  <label>Thumbnail Image (Optional)</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailChange}
                  />
                  {thumbnailPreview && (
                    <img src={thumbnailPreview} alt="Thumbnail preview" style={{ maxWidth: '100%', maxHeight: '150px', marginTop: '10px' }} />
                  )}
                </div>
              </div>
              
              <div className="form-section">
                <h4>Results & Metrics</h4>
                <div className="form-row">
                  <div className="form-group">
                    <label>Views</label>
                    <input
                      type="text"
                      value={formData.results.views}
                      onChange={(e) => setFormData({ 
                        ...formData, 
                        results: { ...formData.results, views: e.target.value }
                      })}
                      placeholder="e.g., 2.5M"
                    />
                  </div>
                  <div className="form-group">
                    <label>Engagement Rate</label>
                    <input
                      type="text"
                      value={formData.results.engagement}
                      onChange={(e) => setFormData({ 
                        ...formData, 
                        results: { ...formData.results, engagement: e.target.value }
                      })}
                      placeholder="e.g., 12%"
                    />
                  </div>
                  <div className="form-group">
                    <label>Conversion Rate</label>
                    <input
                      type="text"
                      value={formData.results.conversions}
                      onChange={(e) => setFormData({ 
                        ...formData, 
                        results: { ...formData.results, conversions: e.target.value }
                      })}
                      placeholder="e.g., 8.5%"
                    />
                  </div>
                </div>
              </div>
              
              <div className="form-group">
                <label>Tags</label>
                <div className="tags-input">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    placeholder="Add tag and press Enter"
                  />
                  <button type="button" onClick={addTag}>Add</button>
                </div>
                <div className="tags-list">
                  {formData.tags.map(tag => (
                    <span key={tag} className="tag">
                      {tag}
                      <button type="button" onClick={() => removeTag(tag)}>×</button>
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="form-group">
                <label>
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  />
                  Featured Work
                </label>
              </div>
              
              {uploadProgress > 0 && uploadProgress < 100 && (
                <div className="upload-progress">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${uploadProgress}%` }}></div>
                  </div>
                  <p>Uploading: {uploadProgress}%</p>
                </div>
              )}
              
              <div className="form-actions">
                <button type="button" onClick={() => { setShowForm(false); resetForm(); }} className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn-primary" disabled={loading}>
                  {loading ? 'Saving...' : (editingItem ? 'Update' : 'Create')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioManagement;