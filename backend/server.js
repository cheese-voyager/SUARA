const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// In-memory data store for demonstration
const queues = [
  { id: 1, name: 'Budi Santoso', service: 'Pembuatan e-KTP', status: 'Selesai', date: '2026-05-01', queueNumber: 'A-001' },
  { id: 2, name: 'Siti Aminah', service: 'Surat Keterangan Usaha', status: 'Diproses', date: '2026-05-08', queueNumber: 'B-012' }
];

const documents = [
  { id: 1, title: 'Pembuatan e-KTP', req: ['Fotokopi KK', 'Surat Pengantar RT/RW'] },
  { id: 2, title: 'Surat Keterangan Kades', req: ['Fotokopi KTP', 'Fotokopi KK', 'Surat Pengantar RT/RW'] },
  { id: 3, title: 'Surat Keterangan Domisili', req: ['Fotokopi KTP', 'Surat Pengantar RT/RW'] }
];

const docRequests = [];

// API: Get queues
app.get('/api/queues', (req, res) => {
  res.json(queues);
});

// API: Create queue
app.post('/api/queues', (req, res) => {
  const { name, service } = req.body;
  const prefix = service.includes('KTP') ? 'A' : 'B';
  const newQueue = {
    id: queues.length + 1,
    name,
    service,
    status: 'Menunggu',
    date: new Date().toISOString().split('T')[0],
    queueNumber: `${prefix}-${String(queues.length + 1).padStart(3, '0')}`
  };
  queues.push(newQueue);
  res.status(201).json(newQueue);
});

// API: Get documents guidelines
app.get('/api/documents', (req, res) => {
  res.json(documents);
});

// API: Request document
app.post('/api/documents/request', (req, res) => {
  const { name, docId } = req.body;
  const doc = documents.find(d => d.id === docId);
  const newReq = {
    id: docRequests.length + 1,
    name,
    document: doc ? doc.title : 'Unknown',
    status: 'Diajukan',
    date: new Date().toISOString()
  };
  docRequests.push(newReq);
  res.status(201).json(newReq);
});

app.get('/api/documents/requests', (req, res) => {
  res.json(docRequests);
});

// API: Chatbot simple logic
app.post('/api/chat', (req, res) => {
  const { message } = req.body;
  const lowerMsg = message.toLowerCase();
  let reply = "Maaf, saya tidak mengerti. Bisa coba tanyakan tentang 'KTP', 'Domisili', atau 'Antrian'?";
  
  if (lowerMsg.includes('ktp')) {
    reply = "Untuk membuat e-KTP, kamu harus membawa: Fotokopi KK dan Surat Pengantar dari RT/RW. Kamu bisa daftar antrian di menu Antrian ya.";
  } else if (lowerMsg.includes('domisili')) {
    reply = "Untuk membuat Surat Keterangan Domisili, pastikan kamu membawa Fotokopi KTP dan Surat Pengantar dari RT/RW.";
  } else if (lowerMsg.includes('antrian')) {
    reply = "Kamu bisa mengambil antrian secara online di menu 'Antrian'. Tinggal masukkan nama dan pilih layanan.";
  } else if (lowerMsg.includes('halo') || lowerMsg.includes('hai')) {
    reply = "Halo warga Baleendah! Ada yang bisa Bapak/Ibu atau Akang/Teteh tanyakan seputar pelayanan desa?";
  }

  res.json({ reply });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`SUARA Backend running on port ${PORT}`);
});
