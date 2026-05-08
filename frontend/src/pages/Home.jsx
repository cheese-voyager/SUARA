import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, FileText, Users, ArrowRight } from 'lucide-react';

const Home = () => {
  return (
    <div>
      <section className="hero">
        <h1>Selamat Datang di SUARA</h1>
        <p>Sistem Urusan Administrasi, Respons, dan Aspirasi Kelurahan Baleendah. Mengurus dokumen kini lebih mudah, cepat, dan transparan.</p>
        <Link to="/antrian" className="btn btn-primary">
          Ambil Antrian Sekarang <ArrowRight size={20} />
        </Link>
      </section>

      <section>
        <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary-color)' }}>Layanan Kami</h2>
        <div className="card-grid">
          <div className="card">
            <h3 className="card-title"><Clock /> Antrian Online</h3>
            <p style={{ marginBottom: '1rem', color: 'var(--text-light)' }}>
              Tidak perlu menunggu lama di kantor desa. Ambil antrian dari rumah dan pantau statusnya secara real-time.
            </p>
            <Link to="/antrian" style={{ color: 'var(--primary-light)', fontWeight: '600' }}>Lihat Antrian &rarr;</Link>
          </div>
          
          <div className="card">
            <h3 className="card-title"><FileText /> Pengurusan Berkas</h3>
            <p style={{ marginBottom: '1rem', color: 'var(--text-light)' }}>
              Ajukan pembuatan e-KTP, Surat Pengantar, dan dokumen lainnya dengan mudah. Panduan lengkap tersedia.
            </p>
            <Link to="/surat" style={{ color: 'var(--primary-light)', fontWeight: '600' }}>Buat Berkas &rarr;</Link>
          </div>
          
          <div className="card">
            <h3 className="card-title"><Users /> Layanan Warga</h3>
            <p style={{ marginBottom: '1rem', color: 'var(--text-light)' }}>
              Bingung harus mulai dari mana? Tanyakan pada asisten pintar kami di pojok kanan bawah.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
