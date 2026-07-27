import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Admin.css';

const CaseStudyManagement = () => {
  const [caseStudies, setCaseStudies] = useState([]);
  const [editingCaseStudy, setEditingCaseStudy] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    client: '',
    industry: '',
    engagementType: '',
    coreChallenge: '',
    deliveryModel: '',
    status: 'Live in production',
    technicalStack: [],
    challengeDescription: '',
    whatWeBuilt: '',
    keyCapabilities: [],
    technicalApproach: '',
    metrics: {
      metric1: { value: '', label: '' },
      metric2: { value: '', label: '' },
      metric3: { value: '', label: '' }
    },
    testimonial: { quote: '', author: '' },
    featuredImage: '',
    featured: false,
    published: true,
    seoTitle: '',
    seoDescription: '',
  });
  const [techStackInput, setTechStackInput] = useState('');
  const [keyCapabilitiesInput, setKeyCapabilitiesInput] = useState('');
  const [loading, setLoading] = useState(false);

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link', 'image', 'video'],
      ['clean']
    ],
  };

  useEffect(() => {
    fetchCaseStudies();
  }, []);

  const fetchCaseStudies = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/case-studies/admin/all`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCaseStudies(response.data.data);
    } catch (error) {
      console.error('Error fetching case studies:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting case study with data:', formData);
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      
      if (editingCaseStudy) {
        await axios.put(`${process.env.REACT_APP_API_URL}/case-studies/${editingCaseStudy._id}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post(`${process.env.REACT_APP_API_URL}/case-studies`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      fetchCaseStudies();
      setShowForm(false);
      resetForm();
    } catch (error) {
      console.error('Full error saving case study:', error);
      console.error('Error response:', error.response);
      const errorMsg = error.response?.data?.message || error.message || 'Error saving case study';
      alert(`Error: ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this case study?')) {
      try {
        const token = localStorage.getItem('adminToken');
        await axios.delete(`${process.env.REACT_APP_API_URL}/case-studies/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchCaseStudies();
      } catch (error) {
        console.error('Error deleting case study:', error);
      }
    }
  };

  const handleEdit = (caseStudy) => {
    setEditingCaseStudy(caseStudy);
    setFormData({
      title: caseStudy.title,
      subtitle: caseStudy.subtitle,
      client: caseStudy.client,
      industry: caseStudy.industry,
      engagementType: caseStudy.engagementType,
      coreChallenge: caseStudy.coreChallenge,
      deliveryModel: caseStudy.deliveryModel,
      status: caseStudy.status,
      technicalStack: caseStudy.technicalStack || [],
      challengeDescription: caseStudy.challengeDescription,
      whatWeBuilt: caseStudy.whatWeBuilt,
      keyCapabilities: caseStudy.keyCapabilities || [],
      technicalApproach: caseStudy.technicalApproach,
      metrics: caseStudy.metrics || {
        metric1: { value: '', label: '' },
        metric2: { value: '', label: '' },
        metric3: { value: '', label: '' }
      },
      testimonial: caseStudy.testimonial || { quote: '', author: '' },
      featuredImage: caseStudy.featuredImage || '',
      featured: caseStudy.featured || false,
      published: caseStudy.published || true,
      seoTitle: caseStudy.seoTitle || '',
      seoDescription: caseStudy.seoDescription || '',
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setEditingCaseStudy(null);
    setFormData({
      title: '',
      subtitle: '',
      client: '',
      industry: '',
      engagementType: '',
      coreChallenge: '',
      deliveryModel: '',
      status: 'Live in production',
      technicalStack: [],
      challengeDescription: '',
      whatWeBuilt: '',
      keyCapabilities: [],
      technicalApproach: '',
      metrics: {
        metric1: { value: '', label: '' },
        metric2: { value: '', label: '' },
        metric3: { value: '', label: '' }
      },
      testimonial: { quote: '', author: '' },
      featuredImage: '',
      featured: false,
      published: true,
      seoTitle: '',
      seoDescription: '',
    });
    setTechStackInput('');
    setKeyCapabilitiesInput('');
  };

  const addTechStack = () => {
    if (techStackInput && !formData.technicalStack.includes(techStackInput)) {
      setFormData({ ...formData, technicalStack: [...formData.technicalStack, techStackInput] });
      setTechStackInput('');
    }
  };

  const removeTechStack = (tech) => {
    setFormData({ ...formData, technicalStack: formData.technicalStack.filter(t => t !== tech) });
  };

  const addKeyCapability = () => {
    if (keyCapabilitiesInput && !formData.keyCapabilities.includes(keyCapabilitiesInput)) {
      setFormData({ ...formData, keyCapabilities: [...formData.keyCapabilities, keyCapabilitiesInput] });
      setKeyCapabilitiesInput('');
    }
  };

  const removeKeyCapability = (capability) => {
    setFormData({ ...formData, keyCapabilities: formData.keyCapabilities.filter(c => c !== capability) });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const uploadFormData = new FormData();
    uploadFormData.append('image', file);
    
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/media`, uploadFormData, {
        headers: { 
          Authorization: `Bearer ${token}`
        }
      });
      setFormData(prev => ({ ...prev, featuredImage: response.data.data.url }));
      alert('Image uploaded successfully');
    } catch (error) {
      console.error('Error uploading image:', error);
      const errorMsg = error.response?.data?.message || error.message || 'Error uploading image';
      alert(`Error: ${errorMsg}`);
    }
  };

  return (
    <div>
      <div className="admin-header-actions">
        <button onClick={() => setShowForm(true)} className="btn-primary">
          <i className="fas fa-plus"></i> New Case Study
        </button>
      </div>

      {/* Case Studies List */}
      <div className="blogs-table">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Client</th>
              <th>Industry</th>
              <th>Status</th>
              <th>Featured</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {caseStudies.map(cs => (
              <tr key={cs._id}>
                <td>{cs.title}</td>
                <td>{cs.client}</td>
                <td>{cs.industry}</td>
                <td>{cs.status}</td>
                <td>{cs.featured ? 'Yes' : 'No'}</td>
                <td className="actions">
                  <button onClick={() => handleEdit(cs)} className="btn-edit">
                    <i className="fas fa-edit"></i>
                  </button>
                  <button onClick={() => handleDelete(cs._id)} className="btn-delete">
                    <i className="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Case Study Form Modal */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content large">
            <div className="modal-header">
              <h2>{editingCaseStudy ? 'Edit Case Study' : 'Create New Case Study'}</h2>
              <button onClick={() => setShowForm(false)} className="close-btn">&times;</button>
            </div>
            <form onSubmit={handleSubmit} className="blog-form">
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
                <label>Subtitle *</label>
                <input
                  type="text"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  required
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Client *</label>
                  <input
                    type="text"
                    value={formData.client}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Industry *</label>
                  <input
                    type="text"
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    required
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Engagement Type *</label>
                  <input
                    type="text"
                    value={formData.engagementType}
                    onChange={(e) => setFormData({ ...formData, engagementType: e.target.value })}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Delivery Model *</label>
                  <input
                    type="text"
                    value={formData.deliveryModel}
                    onChange={(e) => setFormData({ ...formData, deliveryModel: e.target.value })}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  >
                    <option value="Live in production">Live in production</option>
                    <option value="In development">In development</option>
                    <option value="Coming soon">Coming soon</option>
                  </select>
                </div>
              </div>
              
              <div className="form-group">
                <label>Featured Image URL or Upload</label>
                <input
                  type="text"
                  value={formData.featuredImage}
                  onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
                  placeholder="Image URL"
                />
                <input type="file" accept="image/*" onChange={handleImageUpload} />
              </div>
              
              <div className="form-group">
                <label>Core Challenge *</label>
                <textarea
                  value={formData.coreChallenge}
                  onChange={(e) => setFormData({ ...formData, coreChallenge: e.target.value })}
                  rows="3"
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Challenge Description *</label>
                <ReactQuill
                  theme="snow"
                  value={formData.challengeDescription}
                  onChange={(value) => setFormData({ ...formData, challengeDescription: value })}
                  modules={modules}
                  style={{ height: '250px', marginBottom: '50px' }}
                />
              </div>
              
              <div className="form-group">
                <label>What We Built *</label>
                <ReactQuill
                  theme="snow"
                  value={formData.whatWeBuilt}
                  onChange={(value) => setFormData({ ...formData, whatWeBuilt: value })}
                  modules={modules}
                  style={{ height: '250px', marginBottom: '50px' }}
                />
              </div>
              
              <div className="form-group">
                <label>Key Capabilities</label>
                <div className="tags-input">
                  <input
                    type="text"
                    value={keyCapabilitiesInput}
                    onChange={(e) => setKeyCapabilitiesInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addKeyCapability())}
                    placeholder="Add capability and press Enter"
                  />
                  <button type="button" onClick={addKeyCapability}>Add</button>
                </div>
                <div className="tags-list">
                  {formData.keyCapabilities.map((capability, i) => (
                    <span key={i} className="tag">
                      {capability}
                      <button type="button" onClick={() => removeKeyCapability(capability)}>×</button>
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="form-group">
                <label>Technical Approach *</label>
                <ReactQuill
                  theme="snow"
                  value={formData.technicalApproach}
                  onChange={(value) => setFormData({ ...formData, technicalApproach: value })}
                  modules={modules}
                  style={{ height: '250px', marginBottom: '50px' }}
                />
              </div>
              
              <div className="form-group">
                <label>Technical Stack</label>
                <div className="tags-input">
                  <input
                    type="text"
                    value={techStackInput}
                    onChange={(e) => setTechStackInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechStack())}
                    placeholder="Add tech and press Enter"
                  />
                  <button type="button" onClick={addTechStack}>Add</button>
                </div>
                <div className="tags-list">
                  {formData.technicalStack.map((tech, i) => (
                    <span key={i} className="tag">
                      {tech}
                      <button type="button" onClick={() => removeTechStack(tech)}>×</button>
                    </span>
                  ))}
                </div>
              </div>
              
              <h3 style={{ margin: '20px 0', color: '#333' }}>Metrics</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>Metric 1 Value</label>
                  <input
                    type="text"
                    value={formData.metrics.metric1.value}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      metrics: { ...formData.metrics, metric1: { ...formData.metrics.metric1, value: e.target.value } } 
                    })}
                  />
                </div>
                <div className="form-group">
                  <label>Metric 1 Label</label>
                  <input
                    type="text"
                    value={formData.metrics.metric1.label}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      metrics: { ...formData.metrics, metric1: { ...formData.metrics.metric1, label: e.target.value } } 
                    })}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Metric 2 Value</label>
                  <input
                    type="text"
                    value={formData.metrics.metric2.value}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      metrics: { ...formData.metrics, metric2: { ...formData.metrics.metric2, value: e.target.value } } 
                    })}
                  />
                </div>
                <div className="form-group">
                  <label>Metric 2 Label</label>
                  <input
                    type="text"
                    value={formData.metrics.metric2.label}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      metrics: { ...formData.metrics, metric2: { ...formData.metrics.metric2, label: e.target.value } } 
                    })}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Metric 3 Value</label>
                  <input
                    type="text"
                    value={formData.metrics.metric3.value}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      metrics: { ...formData.metrics, metric3: { ...formData.metrics.metric3, value: e.target.value } } 
                    })}
                  />
                </div>
                <div className="form-group">
                  <label>Metric 3 Label</label>
                  <input
                    type="text"
                    value={formData.metrics.metric3.label}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      metrics: { ...formData.metrics, metric3: { ...formData.metrics.metric3, label: e.target.value } } 
                    })}
                  />
                </div>
              </div>
              
              <h3 style={{ margin: '20px 0', color: '#333' }}>Testimonial</h3>
              <div className="form-group">
                <label>Quote</label>
                <textarea
                  value={formData.testimonial.quote}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    testimonial: { ...formData.testimonial, quote: e.target.value } 
                  })}
                  rows="3"
                />
              </div>
              <div className="form-group">
                <label>Author</label>
                <input
                  type="text"
                  value={formData.testimonial.author}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    testimonial: { ...formData.testimonial, author: e.target.value } 
                  })}
                />
              </div>
              
              <div className="form-group">
                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    style={{ marginRight: '10px', transform: 'scale(1.2)', accentColor: 'var(--accent)' }}
                  />
                  Featured Case Study
                </label>
              </div>
              
              <div className="form-group">
                <label>SEO Title (Optional)</label>
                <input
                  type="text"
                  value={formData.seoTitle}
                  onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                />
              </div>
              
              <div className="form-group">
                <label>SEO Description (Optional)</label>
                <textarea
                  value={formData.seoDescription}
                  onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
                  rows="2"
                />
              </div>
              
              <div className="form-actions">
                <button type="button" onClick={() => { setShowForm(false); resetForm(); }} className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn-primary" disabled={loading}>
                  {loading ? 'Saving...' : (editingCaseStudy ? 'Update' : 'Create')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CaseStudyManagement;
