import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { toast } from '../components/UI/Toast';
import { PLACEHOLDER_IMAGE } from '../utils/placeholders';
import './Admin.css';

const TestimonialManagement = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    company: '',
    companyRole: '',
    content: '',
    clientType: 'creator',
    avatarUrl: '',
    rating: 5,
    order: 0,
    featured: false,
    isActive: true,
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/testimonials?all=true`);
      setTestimonials(response.data.data || []);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      toast.error('Failed to load testimonials');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setLoading(true);
    try {
      let response;
      if (editingTestimonial) {
        response = await api.put(`/testimonials/${editingTestimonial._id}`, formData);
      } else {
        response = await api.post(`/testimonials`, formData);
      }
      
      if (response.data.success) {
        fetchTestimonials();
        resetForm();
        setShowForm(false);
        toast.success(editingTestimonial ? 'Testimonial updated successfully!' : 'Testimonial added successfully!');
      }
    } catch (error) {
      console.error('Error saving testimonial:', error);
      toast.error('Error saving testimonial: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      try {
        await api.delete(`/testimonials/${id}`);
        toast.success('Testimonial deleted');
        fetchTestimonials();
      } catch (error) {
        console.error('Error deleting testimonial:', error);
        toast.error('Failed to delete testimonial');
      }
    }
  };

  const handleEdit = (testimonial) => {
    setEditingTestimonial(testimonial);
    setFormData({
      clientName: testimonial.clientName,
      clientRole: testimonial.clientRole || '',
      company: testimonial.company || '',
      content: testimonial.content,
      rating: testimonial.rating || 5,
      imageUrl: testimonial.imageUrl || '',
      videoUrl: testimonial.videoUrl || '',
      isVideo: testimonial.isVideo || false,
      metrics: testimonial.metrics || { reach: '', engagement: '', leads: '' },
      isActive: testimonial.isActive !== undefined ? testimonial.isActive : true,
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setEditingTestimonial(null);
    setFormData({
      clientName: '',
      clientRole: '',
      company: '',
      content: '',
      rating: 5,
      imageUrl: '',
      videoUrl: '',
      isVideo: false,
      metrics: {
        reach: '',
        engagement: '',
        leads: '',
      },
      isActive: true,
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else if (name === 'reach' || name === 'engagement' || name === 'leads') {
      setFormData({
        ...formData,
        metrics: { ...formData.metrics, [name]: value }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <i key={i} className={`fas fa-star ${i < rating ? 'text-warning' : 'text-muted'}`}></i>
    ));
  };

  return (
    <div className="admin-testimonials">
      <div className="admin-header-actions">
        <h2>Testimonial Management</h2>
        <button onClick={() => setShowForm(true)} className="btn btn-primary">
          <i className="fas fa-plus"></i> Add Testimonial
        </button>
      </div>

      {loading && !showForm ? (
        <div className="loading-container">Loading...</div>
      ) : (
        <div className="testimonial-admin-grid">
          {testimonials.length === 0 ? (
            <div className="empty-state">
              <p>No testimonials yet. Add your first one!</p>
            </div>
          ) : (
            testimonials.map(testimonial => (
              <div key={testimonial._id} className={`testimonial-admin-card ${!testimonial.isActive ? 'inactive' : ''}`}>
                <div className="testimonial-admin-header">
                  <div className="testimonial-admin-image">
                    <img src={testimonial.imageUrl || PLACEHOLDER_IMAGE} alt={testimonial.clientName} />
                  </div>
                  <div className="testimonial-admin-info">
                    <h4>{testimonial.clientName}</h4>
                    <p className="role">{testimonial.clientRole}{testimonial.company ? ` @ ${testimonial.company}` : ''}</p>
                    <div className="rating">{renderStars(testimonial.rating)}</div>
                  </div>
                </div>
                <div className="testimonial-admin-content">
                  <p>"{testimonial.content}"</p>
                </div>
                {(testimonial.metrics?.reach || testimonial.metrics?.engagement || testimonial.metrics?.leads) && (
                  <div className="testimonial-admin-metrics">
                    {testimonial.metrics.reach && <span><i className="fas fa-eye"></i> Reach: {testimonial.metrics.reach}</span>}
                    {testimonial.metrics.engagement && <span><i className="fas fa-heart"></i> Engagement: {testimonial.metrics.engagement}</span>}
                    {testimonial.metrics.leads && <span><i className="fas fa-users"></i> Leads: {testimonial.metrics.leads}</span>}
                  </div>
                )}
                <div className="testimonial-admin-status">
                  <span className={`status-badge ${testimonial.isActive ? 'active' : 'inactive'}`}>
                    {testimonial.isActive ? 'Active' : 'Inactive'}
                  </span>
                  {testimonial.isVideo && <span className="badge badge-video"><i className="fas fa-video"></i> Video</span>}
                </div>
                <div className="admin-actions">
                  <button onClick={() => handleEdit(testimonial)} className="btn-edit">
                    <i className="fas fa-edit"></i> Edit
                  </button>
                  <button onClick={() => handleDelete(testimonial._id)} className="btn-delete">
                    <i className="fas fa-trash"></i> Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content large">
            <div className="modal-header">
              <h3>{editingTestimonial ? 'Edit Testimonial' : 'Add Testimonial'}</h3>
              <button onClick={() => { setShowForm(false); resetForm(); }} className="close-btn">&times;</button>
            </div>
            
            <form onSubmit={handleSubmit} className="testimonial-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Client Name *</label>
                  <input
                    type="text"
                    name="clientName"
                    value={formData.clientName}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Client Role</label>
                  <input
                    type="text"
                    name="clientRole"
                    value={formData.clientRole}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Company</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="form-group">
                  <label>Rating (1-5)</label>
                  <input
                    type="number"
                    name="rating"
                    min="1"
                    max="5"
                    value={formData.rating}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label>Testimonial Content *</label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  rows="4"
                  required
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Profile Image URL</label>
                  <input
                    type="url"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    placeholder="https://..."
                  />
                </div>
                
                <div className="form-group">
                  <label>Video URL (optional)</label>
                  <input
                    type="url"
                    name="videoUrl"
                    value={formData.videoUrl}
                    onChange={handleChange}
                    placeholder="https://..."
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      name="isVideo"
                      checked={formData.isVideo}
                      onChange={handleChange}
                    />
                    <span>Is Video Testimonial</span>
                  </label>
                </div>
                
                <div className="form-group checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      name="isActive"
                      checked={formData.isActive}
                      onChange={handleChange}
                    />
                    <span>Active (Visible on Site)</span>
                  </label>
                </div>
              </div>
              
              <div className="form-section">
                <h4>Performance Metrics (optional)</h4>
                <div className="form-row">
                  <div className="form-group">
                    <label>Reach</label>
                    <input
                      type="text"
                      name="reach"
                      value={formData.metrics.reach}
                      onChange={handleChange}
                      placeholder="e.g. 100K"
                    />
                  </div>
                  <div className="form-group">
                    <label>Engagement</label>
                    <input
                      type="text"
                      name="engagement"
                      value={formData.metrics.engagement}
                      onChange={handleChange}
                      placeholder="e.g. 15%"
                    />
                  </div>
                  <div className="form-group">
                    <label>Leads Generated</label>
                    <input
                      type="text"
                      name="leads"
                      value={formData.metrics.leads}
                      onChange={handleChange}
                      placeholder="e.g. 500+"
                    />
                  </div>
                </div>
              </div>
              
              <div className="form-actions">
                <button type="button" onClick={() => { setShowForm(false); resetForm(); }} className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn-primary" disabled={loading}>
                  {loading ? 'Saving...' : (editingTestimonial ? 'Update' : 'Create')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestimonialManagement;
