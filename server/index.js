const express = require('express');
const multer = require('multer');
const storage = require('./storage');

const upload = multer({ dest: './scratch/uploads' });

const router = express.Router();

storage.setup();

router.get('/', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.json({ message: 'Welcome to the Server' });
});

router.get('/doctor/:id', (req, res) => {
  const id = req.params.id || '0';
  // const filters = req.query;
  const data = storage.getPD('doctors', { userID: id });
  res.setHeader('Content-Type', 'application/json');
  res.json(data);
});

router.get('/patient/:id', (req, res) => {
  const id = req.params.id || '0';
  // const filters = req.query;
  const data = storage.getPD('patients', { userID: id });
  res.setHeader('Content-Type', 'application/json');
  res.json(data);
});

// Appointments
router.get('/calendar/:id', (req, res) => {
  const id = req.params.id || '0';
  const data = storage.appointments('get', id);
  res.setHeader('Content-Type', 'application/json');
  res.json(data);
}).post('/calendar', (req, res) => {
  const date = req.body.appointment;
  const id = req.body.userID;
  const idx = req.body.index || '';
  const data = storage.appointments('put', { userID: id, date: date, index: idx });
  res.setHeader('Content-Type', 'application/json');
  res.json({ message: data });
}).delete('/calendar/:id/:index', (req, res) => {
  const id = req.params.id;
  const idx = req.params.index;
  const data = storage.appointments('delete', { userID: id, index: idx });
  res.setHeader('Content-Type', 'application/json');
  res.json({ message: data });
});

// Files
router.get('/files/:id', (req, res) => {
  const id = req.params.id || '0';
  const data = storage.files('get', id);
  res.setHeader('Content-Type', 'application/json');
  res.json(data);
}).post('/files/:id', upload.single('file'), (req, res) => {
  console.log('request = ', req.file);
  const id = req.params.id || '0';
  const file = req.file;
  const data = storage.files('put', { userID: id, file: file });
  res.setHeader('Content-Type', 'application/json');
  res.json({ message: '' });
}).delete('/files/:id/:index', (req, res) => {
  const id = req.params.id;
  const idx = req.params.index;
  const data = storage.files('delete', { userID: id, index: idx });
  res.setHeader('Content-Type', 'application/json');
  res.json({ message: data });
});

router.get('/reset', (req, res) => {
  storage.reset();
  res.setHeader('Content-Type', 'application/json');
  res.json({ message: 'Localstorage Reset' });
});

module.exports = router;
