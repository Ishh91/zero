import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Admin.css';

const InquiryManagement = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get(`/inquiries`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setInquiries(response.data.data);
    } catch (error) {
      console.error('Error fetching inquiries:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem('adminToken');
      await axios.put(`/inquiries/${id}/status`, 
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchInquiries();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: 'badge-warning',
      contacted: 'badge-info',
      converted: 'badge-success',
      archived: 'badge-secondary'
    };
    return badges[status] || 'badge-secondary';
  };

  return (
    <div className="admin-inquiries">
      <div className="admin-header-actions">
        <h2>Inquiries Management</h2>
      </div>
      
      {loading ? (
        <div className="loading-container">Loading...</div>
      ) : (
        <div className="inquiries-list">
          {inquiries.map(inquiry => (
            <div key={inquiry._id} className="inquiry-card">
              <div className="inquiry-header">
                <div>
                  <h3>{inquiry.name}</h3>
                  <p className="inquiry-meta">
                    {inquiry.email} • {inquiry.phone}
                  </p>
                </div>
                <div className="inquiry-status">
                  <select 
                    value={inquiry.status} 
                    onChange={(e) => updateStatus(inquiry._id, e.target.value)}
                    className={getStatusBadge(inquiry.status)}
                  >
                    <option value="pending">Pending</option>
                    <option value="contacted">Contacted</option>
                    <option value="converted">Converted</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>
              
              <div className="inquiry-details">
                {inquiry.company && <p><strong>Company:</strong> {inquiry.company}</p>}
                {inquiry.budget && <p><strong>Budget:</strong> {inquiry.budget}</p>}
                {inquiry.service && <p><strong>Service:</strong> {inquiry.service}</p>}
                <p><strong>Message:</strong></p>
                <p className="inquiry-message">{inquiry.message}</p>
                <p className="inquiry-date">
                  Received: {new Date(inquiry.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InquiryManagement;