import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { toast } from '../components/UI/Toast';
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
      const response = await api.get(`/media`, {
        params: { type: filter }
      });
      setMedia(response.data.data || []);
    } catch (error) {
      console.error('Error fetching media:', error);
      toast.error('Failed to load media');
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
      await api.post(`/media`, formData);
      toast.success('Media uploaded successfully');
      fetchMedia();
      setSelectedFile(null);
    } catch (error) {
      console.error('Error uploading media:', error);
      const errMsg = error.response?.data?.message || error.message || 'Error uploading file';
      toast.error(`Error: ${errMsg}`);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this media?')) {
      try {
        await api.delete(`/media/${id}`);
        toast.success('Media deleted successfully');
        fetchMedia();
      } catch (error) {
        console.error('Error deleting media:', error);
        toast.error('Failed to delete media');
      }
    }
  };

  const copyToClipboard = (url) => {
    navigator.clipboard.writeText(url);
    toast.info('URL copied to clipboard');
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