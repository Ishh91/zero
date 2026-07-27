import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Admin.css';

const MediaLibrary = () => {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchMedia();
  }, [filter]);

  const fetchMedia = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/media`, {
        params: { type: filter },
        headers: { Authorization: `Bearer ${token}` }
      });
      setMedia(response.data.data);
    } catch (error) {
      console.error('Error fetching media:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    
    const formData = new FormData();
    formData.append('image', selectedFile);
    
    setUploading(true);
    try {
      const token = localStorage.getItem('adminToken');
      await axios.post(`${process.env.REACT_APP_API_URL}/media`, formData, {
        headers: { 
          Authorization: `Bearer ${token}`
        }
      });
      fetchMedia();
      setSelectedFile(null);
    } catch (error) {
      console.error('Error uploading media:', error);
      console.error('Error response:', error.response?.data);
      alert(`Error uploading file: ${error.response?.data?.message || error.message}`);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this media?')) {
      try {
        const token = localStorage.getItem('adminToken');
        await axios.delete(`${process.env.REACT_APP_API_URL}/media/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchMedia();
      } catch (error) {
        console.error('Error deleting media:', error);
      }
    }
  };

  const copyToClipboard = (url) => {
    navigator.clipboard.writeText(url);
    alert('URL copied to clipboard');
  };

  return (
    <div className="admin-media">
      <div className="admin-header-actions">
        <h2>Media Library</h2>
        <div className="upload-area">
          <input
            type="file"
            accept="image/*,video/*"
            onChange={(e) => setSelectedFile(e.target.files[0])}
            style={{ display: 'none' }}
            id="file-input"
          />
          <label htmlFor="file-input" className="btn-secondary">
            <i className="fas fa-upload"></i> Select File
          </label>
          {selectedFile && (
            <button onClick={handleUpload} className="btn-primary" disabled={uploading}>
              {uploading ? 'Uploading...' : `Upload ${selectedFile.name}`}
            </button>
          )}
        </div>
      </div>
      
      <div className="media-filters">
        <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>
          All
        </button>
        <button className={filter === 'image' ? 'active' : ''} onClick={() => setFilter('image')}>
          Images
        </button>
        <button className={filter === 'video' ? 'active' : ''} onClick={() => setFilter('video')}>
          Videos
        </button>
      </div>
      
      {loading ? (
        <div className="loading-container">Loading...</div>
      ) : (
        <div className="media-grid">
          {media.map(item => (
            <div key={item._id} className="media-item">
              <div className="media-preview">
                {item.type === 'image' ? (
                  <img src={item.url} alt={item.alt || item.filename} />
                ) : (
                  <video src={item.url} />
                )}
              </div>
              <div className="media-info">
                <p className="media-name">{item.originalName}</p>
                <p className="media-size">{(item.size / 1024 / 1024).toFixed(2)} MB</p>
                <div className="media-actions">
                  <button onClick={() => copyToClipboard(item.url)} className="btn-copy">
                    <i className="fas fa-copy"></i> Copy URL
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
    </div>
  );
};

export default MediaLibrary;