import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PLACEHOLDER_IMAGE } from '../utils/placeholders';
import './Admin.css';

const TeamManagement = () => {
  const [team, setTeam] = useState([]);
  const [editingMember, setEditingMember] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    bio: '',
    expertise: [],
    email: '',
    phone: '',
    socialLinks: {
      linkedin: '',
      instagram: '',
      twitter: '',
    },
    order: 0,
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [expertiseInput, setExpertiseInput] = useState('');

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get(`/team`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTeam(response.data.data);
    } catch (error) {
      console.error('Error fetching team:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const submitData = new FormData();
    submitData.append('data', JSON.stringify(formData));
    if (imageFile) {
      submitData.append('image', imageFile);
    }
    
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      let response;
      
      if (editingMember) {
        response = await axios.put(`/team/${editingMember._id}`, submitData, {
          headers: { 
            Authorization: `Bearer ${token}`
          }
        });
      } else {
        response = await axios.post(`/team`, submitData, {
          headers: { 
            Authorization: `Bearer ${token}`
          }
        });
      }
      
      if (response.data.success) {
        fetchTeam();
        resetForm();
        setShowForm(false);
        alert(editingMember ? 'Team member updated!' : 'Team member added!');
      }
    } catch (error) {
      console.error('Error saving team member:', error);
      alert('Error saving team member');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this team member?')) {
      try {
        const token = localStorage.getItem('adminToken');
        await axios.delete(`/team/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchTeam();
      } catch (error) {
        console.error('Error deleting team member:', error);
      }
    }
  };

  const handleEdit = (member) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      role: member.role,
      bio: member.bio,
      expertise: member.expertise || [],
      email: member.email || '',
      phone: member.phone || '',
      socialLinks: member.socialLinks || { linkedin: '', instagram: '', twitter: '' },
      order: member.order || 0,
    });
    setImagePreview(member.imageUrl);
    setShowForm(true);
  };

  const resetForm = () => {
    setEditingMember(null);
    setFormData({
      name: '',
      role: '',
      bio: '',
      expertise: [],
      email: '',
      phone: '',
      socialLinks: { linkedin: '', instagram: '', twitter: '' },
      order: 0,
    });
    setImageFile(null);
    setImagePreview('');
    setExpertiseInput('');
  };

  const addExpertise = () => {
    if (expertiseInput && !formData.expertise.includes(expertiseInput)) {
      setFormData({ ...formData, expertise: [...formData.expertise, expertiseInput] });
      setExpertiseInput('');
    }
  };

  const removeExpertise = (skill) => {
    setFormData({ ...formData, expertise: formData.expertise.filter(s => s !== skill) });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    }
  };

  return (
    <div className="admin-team">
      <div className="admin-header-actions">
        <h2>Team Management</h2>
        <button onClick={() => setShowForm(true)} className="btn btn-primary">
          <i className="fas fa-plus"></i> Add Team Member
        </button>
      </div>

      {/* Team Grid */}
      {loading && !showForm ? (
        <div className="loading-container">Loading...</div>
      ) : (
        <div className="team-admin-grid">
          {team.map(member => (
            <div key={member._id} className="team-admin-card">
              <div className="team-admin-image">
                <img src={member.imageUrl || PLACEHOLDER_IMAGE} alt={member.name} />
              </div>
              <div className="team-admin-info">
                <h4>{member.name}</h4>
                <p className="role">{member.role}</p>
                <div className="admin-actions">
                  <button onClick={() => handleEdit(member)} className="btn-edit">
                    <i className="fas fa-edit"></i> Edit
                  </button>
                  <button onClick={() => handleDelete(member._id)} className="btn-delete">
                    <i className="fas fa-trash"></i> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Team Form Modal */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content large">
            <div className="modal-header">
              <h3>{editingMember ? 'Edit Team Member' : 'Add Team Member'}</h3>
              <button onClick={() => { setShowForm(false); resetForm(); }} className="close-btn">&times;</button>
            </div>
            
            <form onSubmit={handleSubmit} className="team-form">
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
                  <label>Role *</label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
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
                <label>Profile Image</label>
                <input type="file" accept="image/*" onChange={handleImageChange} />
                {imagePreview && (
                  <img src={imagePreview} alt="Preview" style={{ maxWidth: '100px', marginTop: '10px' }} />
                )}
              </div>
              
              <div className="form-group">
                <label>Areas of Expertise</label>
                <div className="tags-input">
                  <input
                    type="text"
                    value={expertiseInput}
                    onChange={(e) => setExpertiseInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addExpertise())}
                    placeholder="Add skill and press Enter"
                  />
                  <button type="button" onClick={addExpertise}>Add</button>
                </div>
                <div className="tags-list">
                  {formData.expertise.map(skill => (
                    <span key={skill} className="tag">
                      {skill}
                      <button type="button" onClick={() => removeExpertise(skill)}>×</button>
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>
              
              <div className="form-section">
                <h4>Social Links</h4>
                <div className="form-group">
                  <label>LinkedIn</label>
                  <input
                    type="url"
                    value={formData.socialLinks.linkedin}
                    onChange={(e) => setFormData({
                      ...formData,
                      socialLinks: { ...formData.socialLinks, linkedin: e.target.value }
                    })}
                    placeholder="https://linkedin.com/in/username"
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
                    placeholder="https://instagram.com/username"
                  />
                </div>
                <div className="form-group">
                  <label>Twitter</label>
                  <input
                    type="url"
                    value={formData.socialLinks.twitter}
                    onChange={(e) => setFormData({
                      ...formData,
                      socialLinks: { ...formData.socialLinks, twitter: e.target.value }
                    })}
                    placeholder="https://twitter.com/username"
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
              
              <div className="form-actions">
                <button type="button" onClick={() => { setShowForm(false); resetForm(); }} className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn-primary" disabled={loading}>
                  {loading ? 'Saving...' : (editingMember ? 'Update' : 'Create')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamManagement;