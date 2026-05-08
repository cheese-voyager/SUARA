import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus } from 'lucide-react';

const API_URL = 'http://localhost:5000/api';

const Antrian = () => {
  const [queues, setQueues] = useState([]);
  const [name, setName] = useState('');
  const [service, setService] = useState('Pembuatan e-KTP');

  const fetchQueues = async () => {
    try {
      const res = await axios.get(`${API_URL}/queues`);
      setQueues(res.data);
    } catch (error) {
      console.error('Error fetching queues', error);
    }
  };

  useEffect(() => {
    fetchQueues();
    const interval = setInterval(fetchQueues, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) return;
    try {
      await axios.post(`${API_URL}/queues`, { name, service });
      setName('');
      fetchQueues();
    } catch (error) {
      console.error('Error creating queue', error);
    }
  };

  const getStatusBadge = (status) => {
    const badgeClass = `badge badge-${status.toLowerCase()}`;
    return <span className={badgeClass}>{status}</span>;
  };

  return (
    <div>
      <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary-color)' }}>Sistem Antrian Online</h2>
      
      <div className="card-grid" style={{ gridTemplateColumns: '1fr 2fr' }}>
        <div className="card">
          <h3 className="card-title" style={{ marginBottom: '1.5rem' }}>Ambil Antrian Baru</h3>
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
              <label className="form-label">Layanan</label>
              <select 
                className="form-control" 
                value={service} 
                onChange={(e) => setService(e.target.value)}
              >
                <option value="Pembuatan e-KTP">Pembuatan e-KTP</option>
                <option value="Surat Keterangan Kades">Surat Keterangan Kades</option>
                <option value="Surat Keterangan Domisili">Surat Keterangan Domisili</option>
                <option value="Surat Keterangan Usaha">Surat Keterangan Usaha</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              <Plus size={18} /> Ambil Nomor
            </button>
          </form>
        </div>

        <div className="card">
          <h3 className="card-title" style={{ marginBottom: '1.5rem' }}>Daftar Antrian Hari Ini</h3>
          <div style={{ overflowX: 'auto' }}>
            <table className="table">
              <thead>
                <tr>
                  <th>No. Antrian</th>
                  <th>Nama Warga</th>
                  <th>Layanan</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {queues.length === 0 ? (
                  <tr>
                    <td colSpan="4" style={{ textAlign: 'center', color: 'var(--text-light)' }}>Belum ada antrian.</td>
                  </tr>
                ) : (
                  queues.map((q) => (
                    <tr key={q.id}>
                      <td style={{ fontWeight: 'bold' }}>{q.queueNumber}</td>
                      <td>{q.name}</td>
                      <td>{q.service}</td>
                      <td>{getStatusBadge(q.status)}</td>
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

export default Antrian;
