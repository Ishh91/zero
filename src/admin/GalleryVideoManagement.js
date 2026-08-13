import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { toast } from '../components/UI/Toast';
import { PLACEHOLDER_IMAGE } from '../utils/placeholders';
import './Admin.css';

const GalleryVideoManagement = () => {
  const [videos, setVideos] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    videoUrl: '',
    thumbnailUrl: '',
    order: 0,
    isActive: true,
  });
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/gallery-videos/admin`);
      if (response.data.success) {
        setVideos(response.data.data || []);
      }
    } catch (error) {
      console.error('Error fetching gallery videos:', error);
      toast.error('Failed to load gallery videos');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (!formData.title || !formData.title.trim()) {
      setErrorMsg('Please enter a title');
      toast.error('Please enter a title');
      return;
    }
    if (!videoFile && !(formData.videoUrl && formData.videoUrl.trim()) && !editingItem) {
      const msg = 'Please either upload a video file OR paste a video URL (Cloudinary / YouTube / hosted .mp4 link)';
      setErrorMsg(msg);
      toast.error(msg);
      return;
    }
    const submitData = new FormData();
    submitData.append('data', JSON.stringify(formData));
    if (videoFile) {
      submitData.append('video', videoFile);
    }

    setLoading(true);
    try {
      let response;
      if (editingItem) {
        response = await api.put(`/gallery-videos/${editingItem._id}`, submitData);
      } else {
        response = await api.post(`/gallery-videos`, submitData);
      }
      if (response.data.success) {
        toast.success(editingItem ? 'Gallery video updated!' : 'Gallery video added!');
        fetchVideos();
        resetForm();
        setShowForm(false);
      }
    } catch (error) {
      const serverMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        'Unknown server error';
      console.error('Error saving gallery video:', error);
      setErrorMsg(`Error saving gallery video: ${serverMessage}`);
      toast.error(`Error: ${serverMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this gallery video?')) {
      try {
        await api.delete(`/gallery-videos/${id}`);
        toast.success('Gallery video deleted');
        fetchVideos();
      } catch (error) {
        console.error('Error deleting gallery video:', error);
        toast.error('Failed to delete gallery video');
      }
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      videoUrl: item.videoUrl || '',
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
      videoUrl: '',
      thumbnailUrl: '',
      order: 0,
      isActive: true,
    });
    setVideoFile(null);
    setVideoPreview('');
    setErrorMsg('');
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
                {errorMsg && (
                  <div style={{
                    padding: '12px 16px',
                    marginBottom: '18px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(220, 38, 38, 0.12)',
                    border: '1px solid rgba(220, 38, 38, 0.35)',
                    color: '#fca5a5',
                    fontSize: '14px',
                    lineHeight: '1.45'
                  }}>
                    <i className="fas fa-exclamation-triangle" style={{ marginRight: '8px' }}></i>
                    {errorMsg}
                  </div>
                )}

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
                  <label>Video URL (Cloudinary / hosted .mp4) — required if no file uploaded</label>
                  <input
                    type="url"
                    value={formData.videoUrl}
                    onChange={(e) => {
                      const v = e.target.value;
                      setFormData({ ...formData, videoUrl: v });
                      if (v) {
                        setVideoPreview(v);
                        setVideoFile(null);
                      }
                    }}
                    placeholder="https://res.cloudinary.com/.../vXXX/....mp4  OR  https://.../video.mp4"
                  />
                  {formData.videoUrl && !videoFile && (
                    <p style={{ marginTop: '10px', color: '#86efac', fontSize: '13px' }}>
                      <i className="fas fa-link"></i> Will use this URL directly (no upload, no extra Cloudinary cost)
                    </p>
                  )}
                </div>

                <div className="form-group">
                  <label>Video File Upload (optional — if provided, it uploads to Cloudinary and replaces the URL above)</label>
                  <input type="file" accept="video/*" onChange={handleVideoChange} />
                  {videoPreview && (
                    <div style={{ marginTop: '15px' }}>
                      <video src={videoPreview} controls style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: '8px' }} />
                    </div>
                  )}
                  {editingItem && !videoFile && !formData.videoUrl && (
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
