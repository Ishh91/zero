import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import api from '../services/api';
import { toast } from '../components/UI/Toast';
import './Admin.css';

const BlogManagement = () => {
  const [blogs, setBlogs] = useState([]);
  const [editingBlog, setEditingBlog] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'Marketing',
    tags: [],
    author: '',
    readTime: 5,
    featured: false,
    featuredImage: '',
    seoTitle: '',
    seoDescription: '',
  });
  const [tagInput, setTagInput] = useState('');
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

  const categories = [
    'Marketing',
    'Content Strategy',
    'Video Production',
    'Social Media',
    'Case Studies',
    'Industry Insights',
  ];

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await api.get(`/blogs/admin/all`);
      setBlogs(response.data.data || []);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      toast.error('Failed to load blogs');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingBlog) {
        await api.put(`/blogs/${editingBlog._id}`, formData);
        toast.success('Blog updated successfully!');
      } else {
        await api.post(`/blogs`, formData);
        toast.success('Blog published successfully!');
      }
      fetchBlogs();
      setShowForm(false);
      resetForm();
    } catch (error) {
      console.error('Full error saving blog:', error);
      const errorMsg = error.response?.data?.message || error.message || 'Error saving blog';
      toast.error(`Error: ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await api.delete(`/blogs/${id}`);
        toast.success('Blog deleted successfully');
        fetchBlogs();
      } catch (error) {
        console.error('Error deleting blog:', error);
        toast.error('Failed to delete blog');
      }
    }
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content,
      category: blog.category,
      tags: blog.tags,
      author: blog.author,
      readTime: blog.readTime,
      featured: blog.featured,
      featuredImage: blog.featuredImage,
      seoTitle: blog.seoTitle || '',
      seoDescription: blog.seoDescription || '',
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setEditingBlog(null);
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      category: 'Marketing',
      tags: [],
      author: '',
      readTime: 5,
      featured: false,
      featuredImage: '',
      seoTitle: '',
      seoDescription: '',
    });
    setTagInput('');
  };

  const handleAddTag = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!formData.tags.includes(tagInput.trim())) {
        setFormData({ ...formData, tags: [...formData.tags, tagInput.trim()] });
      }
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag) => {
    setFormData({ ...formData, tags: formData.tags.filter(t => t !== tag) });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const uploadFormData = new FormData();
    uploadFormData.append('image', file);
    
    try {
      const response = await api.post(`/media`, uploadFormData);
      setFormData(prev => ({ ...prev, featuredImage: response.data.data.url }));
      toast.success('Image uploaded successfully');
    } catch (error) {
      console.error('Error uploading image:', error);
      const errorMsg = error.response?.data?.message || error.message || 'Error uploading image';
      toast.error(`Error: ${errorMsg}`);
    }
  };

  return (
    <div>
      <div className="admin-header-actions">
        <button onClick={() => setShowForm(true)} className="btn-primary">
          <i className="fas fa-plus"></i> New Blog
        </button>
      </div>

      {/* Blog List */}
      <div className="blogs-table">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Author</th>
              <th>Published</th>
              <th>Views</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map(blog => (
              <tr key={blog._id}>
                <td>{blog.title}</td>
                <td>{blog.category}</td>
                <td>{blog.author}</td>
                <td>{new Date(blog.publishedAt).toLocaleDateString()}</td>
                <td>{blog.views}</td>
                <td className="actions">
                  <button onClick={() => handleEdit(blog)} className="btn-edit">
                    <i className="fas fa-edit"></i>
                  </button>
                  <button onClick={() => handleDelete(blog._id)} className="btn-delete">
                    <i className="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Blog Form Modal */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content large">
            <div className="modal-header">
              <h2>{editingBlog ? 'Edit Blog' : 'Create New Blog'}</h2>
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
              
              <div className="form-row">
                <div className="form-group">
                  <label>Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                  >
                    <option value="Marketing">Marketing</option>
                    <option value="Content Strategy">Content Strategy</option>
                    <option value="Video Production">Video Production</option>
                    <option value="Social Media">Social Media</option>
                    <option value="Case Studies">Case Studies</option>
                    <option value="Industry Insights">Industry Insights</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Author *</label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Read Time (minutes)</label>
                  <input
                    type="number"
                    value={formData.readTime}
                    onChange={(e) => setFormData({ ...formData, readTime: parseInt(e.target.value) || 5 })}
                  />
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
                <label>Excerpt *</label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  rows="3"
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Content *</label>
                <ReactQuill
                  theme="snow"
                  value={formData.content}
                  onChange={(value) => setFormData({ ...formData, content: value })}
                  modules={modules}
                  style={{ height: '400px', marginBottom: '50px' }}
                />
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
                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    style={{ marginRight: '10px', transform: 'scale(1.2)', accentColor: 'var(--accent)' }}
                  />
                  Featured Article
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
                  {loading ? 'Saving...' : (editingBlog ? 'Update' : 'Create')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogManagement;