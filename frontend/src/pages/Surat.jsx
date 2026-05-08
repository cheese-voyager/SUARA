import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FileText, Send } from 'lucide-react';

const API_URL = 'http://localhost:5000/api';

const Surat = () => {
  const [docs, setDocs] = useState([]);
  const [requests, setRequests] = useState([]);
  const [name, setName] = useState('');
  const [selectedDoc, setSelectedDoc] = useState('');

  const fetchData = async () => {
    try {
      const [docsRes, reqRes] = await Promise.all([
        axios.get(`${API_URL}/documents`),
        axios.get(`${API_URL}/documents/requests`)
      ]);
      setDocs(docsRes.data);
      setRequests(reqRes.data);
      if (docsRes.data.length > 0 && !selectedDoc) {
        setSelectedDoc(docsRes.data[0].id);
      }
    } catch (error) {
      console.error('Error fetching documents data', error);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !selectedDoc) return;
    try {
      await axios.post(`${API_URL}/documents/request`, { name, docId: parseInt(selectedDoc) });
      setName('');
      fetchData();
    } catch (error) {
      console.error('Error requesting document', error);
    }
  };

  const getStatusBadge = (status) => {
    const badgeClass = `badge badge-${status.toLowerCase().replace(' ', '')}`;
    return <span className={badgeClass}>{status}</span>;
  };

  return (
    <div>
      <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary-color)' }}>Layanan Surat & Berkas</h2>
      
      <div className="card-grid" style={{ gridTemplateColumns: '1fr 2fr' }}>
        <div className="card">
          <h3 className="card-title" style={{ marginBottom: '1.5rem' }}>Pengajuan Berkas Baru</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Nama Lengkap</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Masukkan nama Anda" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Jenis Surat/Berkas</label>
              <select 
                className="form-control" 
                value={selectedDoc} 
                onChange={(e) => setSelectedDoc(e.target.value)}
              >
                {docs.map(doc => (
                  <option key={doc.id} value={doc.id}>{doc.title}</option>
                ))}
              </select>
            </div>
            
            {selectedDoc && (
              <div style={{ backgroundColor: '#F7FAFC', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
                <p style={{ fontWeight: '600', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Persyaratan:</p>
                <ul style={{ paddingLeft: '1.5rem', fontSize: '0.9rem', color: 'var(--text-light)' }}>
                  {docs.find(d => d.id === parseInt(selectedDoc))?.req.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
                <p style={{ fontSize: '0.8rem', marginTop: '0.5rem', color: '#D69E2E' }}>* Pastikan Anda membawa syarat ini ke balai desa nanti.</p>
              </div>
            )}
            
            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              <Send size={18} /> Ajukan Berkas
            </button>
          </form>
        </div>

        <div className="card">
          <h3 className="card-title" style={{ marginBottom: '1.5rem' }}>Status Pengajuan Berkas</h3>
          <div style={{ overflowX: 'auto' }}>
            <table className="table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama Warga</th>
                  <th>Jenis Berkas</th>
                  <th>Tanggal</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {requests.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center', color: 'var(--text-light)' }}>Belum ada pengajuan.</td>
                  </tr>
                ) : (
                  requests.map((req, index) => (
                    <tr key={req.id}>
                      <td>{index + 1}</td>
                      <td>{req.name}</td>
                      <td>{req.document}</td>
                      <td>{new Date(req.date).toLocaleDateString('id-ID')}</td>
                      <td>{getStatusBadge(req.status)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Surat;
