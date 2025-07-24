const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// In-memory data storage (replace with database in production)
let demoBookings = [];
let customerDelightSpecialists = [
  { id: 1, name: 'Sarah Johnson', email: 'sarah@epik.com', specialization: 'E-commerce', available: true },
  { id: 2, name: 'Mike Chen', email: 'mike@epik.com', specialization: 'SaaS', available: true },
  { id: 3, name: 'Emily Rodriguez', email: 'emily@epik.com', specialization: 'Enterprise', available: true },
  { id: 4, name: 'David Kim', email: 'david@epik.com', specialization: 'Healthcare', available: true }
];
let marketingUpdates = [];

// Email transporter (configure with your email service)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASS || 'your-app-password'
  }
});

// Serve the dashboard
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dashboard.html'));
});

// API Routes

// 1. DEMO BOOKINGS API
// Get all demo bookings
app.get('/api/demo-bookings', (req, res) => {
  res.json({
    success: true,
    data: demoBookings,
    total: demoBookings.length
  });
});

// Create new demo booking
app.post('/api/demo-bookings', (req, res) => {
  const { customerName, email, phone, companyName, demoType, preferredDate, notes } = req.body;
  
  if (!customerName || !email || !demoType || !preferredDate) {
    return res.status(400).json({
      success: false,
      message: 'Required fields: customerName, email, demoType, preferredDate'
    });
  }

  const newBooking = {
    id: uuidv4(),
    customerName,
    email,
    phone: phone || '',
    companyName: companyName || '',
    demoType,
    preferredDate,
    notes: notes || '',
    status: 'pending',
    assignedSpecialist: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  demoBookings.push(newBooking);

  res.json({
    success: true,
    message: 'Demo booking created successfully',
    data: newBooking
  });
});

// Update demo booking status
app.put('/api/demo-bookings/:id', (req, res) => {
  const { id } = req.params;
  const { status, notes } = req.body;

  const bookingIndex = demoBookings.findIndex(booking => booking.id === id);
  if (bookingIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Demo booking not found'
    });
  }

  demoBookings[bookingIndex] = {
    ...demoBookings[bookingIndex],
    status: status || demoBookings[bookingIndex].status,
    notes: notes || demoBookings[bookingIndex].notes,
    updatedAt: new Date().toISOString()
  };

  res.json({
    success: true,
    message: 'Demo booking updated successfully',
    data: demoBookings[bookingIndex]
  });
});

// 2. CUSTOMER DELIGHT SPECIALISTS API
// Get all specialists
app.get('/api/specialists', (req, res) => {
  res.json({
    success: true,
    data: customerDelightSpecialists
  });
});

// Assign specialist to demo booking
app.post('/api/assign-specialist', (req, res) => {
  const { bookingId, specialistId } = req.body;

  if (!bookingId || !specialistId) {
    return res.status(400).json({
      success: false,
      message: 'Required fields: bookingId, specialistId'
    });
  }

  const bookingIndex = demoBookings.findIndex(booking => booking.id === bookingId);
  const specialist = customerDelightSpecialists.find(spec => spec.id === parseInt(specialistId));

  if (bookingIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Demo booking not found'
    });
  }

  if (!specialist) {
    return res.status(404).json({
      success: false,
      message: 'Specialist not found'
    });
  }

  // Assign specialist to booking
  demoBookings[bookingIndex].assignedSpecialist = {
    id: specialist.id,
    name: specialist.name,
    email: specialist.email,
    specialization: specialist.specialization
  };
  demoBookings[bookingIndex].status = 'assigned';
  demoBookings[bookingIndex].updatedAt = new Date().toISOString();

  res.json({
    success: true,
    message: 'Specialist assigned successfully',
    data: demoBookings[bookingIndex]
  });
});

// 3. MARKETING UPDATES API
// Get all marketing updates
app.get('/api/marketing-updates', (req, res) => {
  res.json({
    success: true,
    data: marketingUpdates
  });
});

// Send marketing update
app.post('/api/marketing-updates', (req, res) => {
  const { title, message, recipients, priority } = req.body;

  if (!title || !message || !recipients || !Array.isArray(recipients)) {
    return res.status(400).json({
      success: false,
      message: 'Required fields: title, message, recipients (array)'
    });
  }

  const newUpdate = {
    id: uuidv4(),
    title,
    message,
    recipients,
    priority: priority || 'medium',
    status: 'sent',
    sentAt: new Date().toISOString(),
    createdBy: 'system'
  };

  // Simulate sending emails (in production, implement actual email sending)
  recipients.forEach(email => {
    console.log(`📧 Sending marketing update to: ${email}`);
    console.log(`Subject: ${title}`);
    console.log(`Message: ${message}`);
  });

  marketingUpdates.push(newUpdate);

  res.json({
    success: true,
    message: 'Marketing update sent successfully',
    data: newUpdate
  });
});

// 4. ANALYTICS/DASHBOARD DATA
app.get('/api/dashboard-stats', (req, res) => {
  const totalBookings = demoBookings.length;
  const pendingBookings = demoBookings.filter(b => b.status === 'pending').length;
  const assignedBookings = demoBookings.filter(b => b.status === 'assigned').length;
  const completedBookings = demoBookings.filter(b => b.status === 'completed').length;
  const availableSpecialists = customerDelightSpecialists.filter(s => s.available).length;
  const totalMarketingUpdates = marketingUpdates.length;

  res.json({
    success: true,
    data: {
      totalBookings,
      pendingBookings,
      assignedBookings,
      completedBookings,
      availableSpecialists,
      totalSpecialists: customerDelightSpecialists.length,
      totalMarketingUpdates,
      recentBookings: demoBookings.slice(-5).reverse()
    }
  });
});

// 5. UTILITY ENDPOINTS
// Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Epik Backend Tool is running',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Epik Backend Tool running on port ${PORT}`);
  console.log(`📊 Dashboard: http://localhost:${PORT}`);
  console.log(`🔧 API Base URL: http://localhost:${PORT}/api`);
});