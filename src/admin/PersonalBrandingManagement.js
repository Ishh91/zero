import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PLACEHOLDER_IMAGE } from '../utils/placeholders';
import './Admin.css';

const PersonalBrandingManagement = () => {
  const [personalBrandings, setPersonalBrandings] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    field: '',
    bio: '',
    avatarUrl: '',
    reports: [],
    videos: [],
    photos: [],
    data: [],
    socialLinks: {
      linkedin: '',
      instagram: '',
      twitter: '',
      youtube: '',
      website: '',
    },
    order: 0,
    isActive: true,
    caseStudy: false,
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState('');
  const [activeTab, setActiveTab] = useState('basic'); // basic, reports, videos, photos, data

  useEffect(() => {
    fetchPersonalBrandings();
  }, []);

  const fetchPersonalBrandings = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get(`/personal-branding`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPersonalBrandings(response.data.data);
    } catch (error) {
      console.error('Error fetching personal brandings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const submitData = new FormData();
    submitData.append('data', JSON.stringify(formData));
    if (avatarFile) {
      submitData.append('avatar', avatarFile);
    }
    
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      let response;
      
      if (editingItem) {
        response = await axios.put(`/personal-branding/${editingItem._id}`, submitData, {
          headers: { 
            Authorization: `Bearer ${token}`
          }
        });
      } else {
        response = await axios.post(`/personal-branding`, submitData, {
          headers: { 
            Authorization: `Bearer ${token}`
          }
        });
      }
      
      if (response.data.success) {
        fetchPersonalBrandings();
        resetForm();
        setShowForm(false);
        alert(editingItem ? 'Personal branding updated!' : 'Personal branding added!');
      }
    } catch (error) {
      console.error('Error saving personal branding:', error);
      alert('Error saving personal branding');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this personal branding?')) {
      try {
        const token = localStorage.getItem('adminToken');
        await axios.delete(`/personal-branding/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchPersonalBrandings();
      } catch (error) {
        console.error('Error deleting personal branding:', error);
      }
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      field: item.field,
      bio: item.bio,
      avatarUrl: item.avatarUrl || '',
      reports: item.reports || [],
      videos: item.videos || [],
      photos: item.photos || [],
      data: item.data || [],
      socialLinks: item.socialLinks || { linkedin: '', instagram: '', twitter: '', youtube: '', website: '' },
      order: item.order || 0,
      isActive: item.isActive,
      caseStudy: item.caseStudy || false,
    });
    setAvatarPreview(item.avatarUrl);
    setShowForm(true);
    setActiveTab('basic');
  };

  const resetForm = () => {
    setEditingItem(null);
    setFormData({
      name: '',
      field: '',
      bio: '',
      avatarUrl: '',
      reports: [],
      videos: [],
      photos: [],
      data: [],
      socialLinks: { linkedin: '', instagram: '', twitter: '', youtube: '', website: '' },
      order: 0,
      isActive: true,
      caseStudy: false,
    });
    setAvatarFile(null);
    setAvatarPreview('');
    setActiveTab('basic');
  };

  const addItem = (field, newItem) => {
    setFormData({ ...formData, [field]: [...formData[field], newItem] });
  };

  const removeItem = (field, index) => {
    const updated = [...formData[field]];
    updated.splice(index, 1);
    setFormData({ ...formData, [field]: updated });
  };

  const updateItem = (field, index, key, value) => {
    const updated = [...formData[field]];
    updated[index] = { ...updated[index], [key]: value };
    setFormData({ ...formData, [field]: updated });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      const url = URL.createObjectURL(file);
      setAvatarPreview(url);
    }
  };

  return (
    <div className="admin-personal-branding">
      <div className="admin-header-actions">
        <h2>Personal Branding Management</h2>
        <button onClick={() => setShowForm(true)} className="btn btn-primary">
          <i className="fas fa-plus"></i> Add Personal Branding
        </button>
      </div>

      {loading && !showForm ? (
        <div className="loading-container">Loading...</div>
      ) : (
        <div className="personal-branding-grid">
          {personalBrandings.map(item => (
            <div key={item._id} className="personal-branding-card">
              <div className="personal-branding-avatar">
                <img src={item.avatarUrl || PLACEHOLDER_IMAGE} alt={item.name} />
              </div>
              <div className="personal-branding-info">
                <h4>{item.name}</h4>
                <p className="field">{item.field}</p>
                <p className="bio-preview">{item.bio.substring(0, 100)}...</p>
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

      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content xlarge">
            <div className="modal-header">
              <h3>{editingItem ? 'Edit Personal Branding' : 'Add Personal Branding'}</h3>
              <button onClick={() => { setShowForm(false); resetForm(); }} className="close-btn">&times;</button>
            </div>
            
            <form onSubmit={handleSubmit} className="personal-branding-form">
              <div className="form-tabs">
                <button 
                  type="button" 
                  className={activeTab === 'basic' ? 'active' : ''}
                  onClick={() => setActiveTab('basic')}
                >
                  <i className="fas fa-user"></i> Basic Info
                </button>
                <button 
                  type="button" 
                  className={activeTab === 'reports' ? 'active' : ''}
                  onClick={() => setActiveTab('reports')}
                >
                  <i className="fas fa-file-alt"></i> Reports
                </button>
                <button 
                  type="button" 
                  className={activeTab === 'videos' ? 'active' : ''}
                  onClick={() => setActiveTab('videos')}
                >
                  <i className="fas fa-video"></i> Videos
                </button>
                <button 
                  type="button" 
                  className={activeTab === 'photos' ? 'active' : ''}
                  onClick={() => setActiveTab('photos')}
                >
                  <i className="fas fa-images"></i> Photos
                </button>
                <button 
                  type="button" 
                  className={activeTab === 'data' ? 'active' : ''}
                  onClick={() => setActiveTab('data')}
                >
                  <i className="fas fa-chart-bar"></i> Stats
                </button>
              </div>

              {activeTab === 'basic' && (
                <div className="tab-content">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Name *</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Field/Profession *</label>
                      <input
                        type="text"
                        value={formData.field}
                        onChange={(e) => setFormData({ ...formData, field: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label>Bio *</label>
                    <textarea
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      rows="4"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Avatar</label>
                    <input type="file" accept="image/*" onChange={handleAvatarChange} />
                    {avatarPreview && (
                      <img src={avatarPreview} alt="Preview" style={{ maxWidth: '100px', marginTop: '10px', borderRadius: '50%' }} />
                    )}
                  </div>
                  
                  <div className="form-section">
                    <h4>Social Links</h4>
                    <div className="form-row">
                      <div className="form-group">
                        <label>LinkedIn</label>
                        <input
                          type="url"
                          value={formData.socialLinks.linkedin}
                          onChange={(e) => setFormData({
                            ...formData,
                            socialLinks: { ...formData.socialLinks, linkedin: e.target.value }
                          })}
                        />
                      </div>
                      <div className="form-group">
                        <label>Instagram</label>
                        <input
                          type="url"
                          value={formData.socialLinks.instagram}
                          onChange={(e) => setFormData({
                            ...formData,
                            socialLinks: { ...formData.socialLinks, instagram: e.target.value }
                          })}
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Twitter</label>
                        <input
                          type="url"
                          value={formData.socialLinks.twitter}
                          onChange={(e) => setFormData({
                            ...formData,
                            socialLinks: { ...formData.socialLinks, twitter: e.target.value }
                          })}
                        />
                      </div>
                      <div className="form-group">
                        <label>YouTube</label>
                        <input
                          type="url"
                          value={formData.socialLinks.youtube}
                          onChange={(e) => setFormData({
                            ...formData,
                            socialLinks: { ...formData.socialLinks, youtube: e.target.value }
                          })}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Website</label>
                      <input
                        type="url"
                        value={formData.socialLinks.website}
                        onChange={(e) => setFormData({
                          ...formData,
                          socialLinks: { ...formData.socialLinks, website: e.target.value }
                        })}
                      />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label>Display Order</label>
                    <input
                      type="number"
                      value={formData.order}
                      onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>
                      <input
                        type="checkbox"
                        checked={formData.isActive}
                        onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      />
                      &nbsp;Active
                    </label>
                  </div>
                  
                  <div className="form-group">
                    <label>
                      <input
                        type="checkbox"
                        checked={formData.caseStudy}
                        onChange={(e) => setFormData({ ...formData, caseStudy: e.target.checked })}
                      />
                      &nbsp;Mark as Case Study
                    </label>
                  </div>
                </div>
              )}

              {activeTab === 'reports' && (
                <div className="tab-content">
                  <h4>Reports</h4>
                  {formData.reports.map((report, index) => (
                    <div key={index} className="nested-item">
                      <input
                        type="text"
                        placeholder="Report Title"
                        value={report.title}
                        onChange={(e) => updateItem('reports', index, 'title', e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder="Description"
                        value={report.description}
                        onChange={(e) => updateItem('reports', index, 'description', e.target.value)}
                      />
                      <input
                        type="url"
                        placeholder="File URL"
                        value={report.fileUrl}
                        onChange={(e) => updateItem('reports', index, 'fileUrl', e.target.value)}
                      />
                      <button type="button" onClick={() => removeItem('reports', index)} className="btn-remove">
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  ))}
                  <button 
                    type="button" 
                    onClick={() => addItem('reports', { title: '', description: '', fileUrl: '' })}
                    className="btn btn-secondary"
                  >
                    <i className="fas fa-plus"></i> Add Report
                  </button>
                </div>
              )}

              {activeTab === 'videos' && (
                <div className="tab-content">
                  <h4>Videos</h4>
                  {formData.videos.map((video, index) => (
                    <div key={index} className="nested-item">
                      <input
                        type="text"
                        placeholder="Video Title"
                        value={video.title}
                        onChange={(e) => updateItem('videos', index, 'title', e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder="Description"
                        value={video.description}
                        onChange={(e) => updateItem('videos', index, 'description', e.target.value)}
                      />
                      <input
                        type="url"
                        placeholder="Video URL"
                        value={video.videoUrl}
                        onChange={(e) => updateItem('videos', index, 'videoUrl', e.target.value)}
                      />
                      <input
                        type="url"
                        placeholder="Thumbnail URL"
                        value={video.thumbnailUrl}
                        onChange={(e) => updateItem('videos', index, 'thumbnailUrl', e.target.value)}
                      />
                      <button type="button" onClick={() => removeItem('videos', index)} className="btn-remove">
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  ))}
                  <button 
                    type="button" 
                    onClick={() => addItem('videos', { title: '', description: '', videoUrl: '', thumbnailUrl: '' })}
                    className="btn btn-secondary"
                  >
                    <i className="fas fa-plus"></i> Add Video
                  </button>
                </div>
              )}

              {activeTab === 'photos' && (
                <div className="tab-content">
                  <h4>Photos</h4>
                  {formData.photos.map((photo, index) => (
                    <div key={index} className="nested-item">
                      <input
                        type="text"
                        placeholder="Photo Title"
                        value={photo.title}
                        onChange={(e) => updateItem('photos', index, 'title', e.target.value)}
                      />
                      <input
                        type="url"
                        placeholder="Image URL"
                        value={photo.imageUrl}
                        onChange={(e) => updateItem('photos', index, 'imageUrl', e.target.value)}
                      />
                      <button type="button" onClick={() => removeItem('photos', index)} className="btn-remove">
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  ))}
                  <button 
                    type="button" 
                    onClick={() => addItem('photos', { title: '', imageUrl: '' })}
                    className="btn btn-secondary"
                  >
                    <i className="fas fa-plus"></i> Add Photo
                  </button>
                </div>
              )}

              {activeTab === 'data' && (
                <div className="tab-content">
                  <h4>Statistics</h4>
                  {formData.data.map((stat, index) => (
                    <div key={index} className="nested-item">
                      <input
                        type="text"
                        placeholder="Metric (e.g., Followers)"
                        value={stat.metric}
                        onChange={(e) => updateItem('data', index, 'metric', e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder="Value (e.g., 1.2M)"
                        value={stat.value}
                        onChange={(e) => updateItem('data', index, 'value', e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder="Icon (e.g., fas fa-users)"
                        value={stat.icon}
                        onChange={(e) => updateItem('data', index, 'icon', e.target.value)}
                      />
                      <button type="button" onClick={() => removeItem('data', index)} className="btn-remove">
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  ))}
                  <button 
                    type="button" 
                    onClick={() => addItem('data', { metric: '', value: '', icon: '' })}
                    className="btn btn-secondary"
                  >
                    <i className="fas fa-plus"></i> Add Stat
                  </button>
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

export default PersonalBrandingManagement;
