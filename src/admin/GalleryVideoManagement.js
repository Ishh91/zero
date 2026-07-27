import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PLACEHOLDER_IMAGE } from '../utils/placeholders';
import './Admin.css';

const GalleryVideoManagement = () => {
  const [videos, setVideos] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    thumbnailUrl: '',
    order: 0,
    isActive: true,
  });
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState('');

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get(`/gallery-videos/admin`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        setVideos(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching gallery videos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submitData = new FormData();
    submitData.append('data', JSON.stringify(formData));
    if (videoFile) {
      submitData.append('video', videoFile);
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      let response;
      if (editingItem) {
        response = await axios.put(`/gallery-videos/${editingItem._id}`, submitData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        response = await axios.post(`/gallery-videos`, submitData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      if (response.data.success) {
        alert(editingItem ? 'Gallery video updated!' : 'Gallery video added!');
        fetchVideos();
        resetForm();
        setShowForm(false);
      }
    } catch (error) {
      console.error('Error saving gallery video:', error);
      alert('Error saving gallery video');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this gallery video?')) {
      try {
        const token = localStorage.getItem('adminToken');
        await axios.delete(`/gallery-videos/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchVideos();
      } catch (error) {
        console.error('Error deleting gallery video:', error);
      }
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      thumbnailUrl: item.thumbnailUrl || '',
      order: item.order || 0,
      isActive: item.isActive,
    });
    setVideoPreview(item.videoUrl);
    setShowForm(true);
  };

  const resetForm = () => {
    setEditingItem(null);
    setFormData({
      title: '',
      thumbnailUrl: '',
      order: 0,
      isActive: true,
    });
    setVideoFile(null);
    setVideoPreview('');
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
      setVideoPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="admin-gallery-videos">
      <div className="admin-header-actions">
        <h2>Gallery Videos Management</h2>
        <button onClick={() => setShowForm(true)} className="btn btn-primary">
          <i className="fas fa-plus"></i> Add Video
        </button>
      </div>

      {loading && !showForm ? (
        <div className="loading-container">Loading...</div>
      ) : (
        <div className="personal-branding-grid">
          {videos.map(item => (
            <div key={item._id} className="personal-branding-card">
              <div className="personal-branding-avatar">
                {item.videoUrl ? (
                  <video src={item.videoUrl} muted loop />
                ) : (
                  <img src={PLACEHOLDER_IMAGE} alt={item.title} />
                )}
              </div>
              <div className="personal-branding-info">
                <h4>{item.title}</h4>
                <p className="field">Order: {item.order}</p>
                <p className="bio-preview">{item.isActive ? '✅ Active' : '❌ Inactive'}</p>
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
              <h3>{editingItem ? 'Edit Gallery Video' : 'Add Gallery Video'}</h3>
              <button onClick={() => { setShowForm(false); resetForm(); }} className="close-btn">&times;</button>
            </div>

            <form onSubmit={handleSubmit} className="personal-branding-form">
              <div className="tab-content">
                <div className="form-group">
                  <label>Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    placeholder="e.g. THE CLOWNFISH"
                  />
                </div>

                <div className="form-group">
                  <label>Video *</label>
                  <input type="file" accept="video/*" onChange={handleVideoChange} />
                  {videoPreview && (
                    <div style={{ marginTop: '15px' }}>
                      <video src={videoPreview} controls style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: '8px' }} />
                    </div>
                  )}
                  {editingItem && !videoFile && (
                    <p style={{ marginTop: '10px', color: 'rgba(255,153,0)' }}>
                      <i className="fas fa-check-circle"></i> Current video already saved
                    </p>
                  )}
                </div>

                <div className="form-group">
                  <label>Thumbnail URL (Optional)</label>
                  <input
                    type="url"
                    value={formData.thumbnailUrl}
                    onChange={(e) => setFormData({ ...formData, thumbnailUrl: e.target.value })}
                    placeholder="https://..."
                  />
                </div>

                <div className="form-row">
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
                </div>
              </div>

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

export default GalleryVideoManagement;
