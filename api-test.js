#!/usr/bin/env node

// Simple API test script for Epik Backend Tool
// Run with: node api-test.js

const BASE_URL = 'http://localhost:3000/api';

async function makeRequest(method, endpoint, data = null) {
  const url = `${BASE_URL}${endpoint}`;
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url);
    const result = await response.json();
    return { success: response.ok, data: result };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async function runTests() {
  console.log('🧪 Running Epik Backend Tool API Tests\n');

  // Test 1: Health Check
  console.log('1. Testing Health Check...');
  const health = await makeRequest('GET', '/health');
  console.log(health.success ? '✅ PASS' : '❌ FAIL', health.data?.message || health.error);
  console.log();

  // Test 2: Get Specialists
  console.log('2. Testing Get Specialists...');
  const specialists = await makeRequest('GET', '/specialists');
  console.log(specialists.success ? '✅ PASS' : '❌ FAIL', 
    specialists.success ? `Found ${specialists.data.data.length} specialists` : specialists.error);
  console.log();

  // Test 3: Create Demo Booking
  console.log('3. Testing Create Demo Booking...');
  const bookingData = {
    customerName: 'Alice Smith',
    email: 'alice@company.com',
    phone: '+1-555-0123',
    companyName: 'Tech Innovations Inc',
    demoType: 'technical',
    preferredDate: '2024-02-15T14:00:00.000Z',
    notes: 'Interested in API integrations'
  };
  const booking = await makeRequest('POST', '/demo-bookings', bookingData);
  console.log(booking.success ? '✅ PASS' : '❌ FAIL', 
    booking.success ? `Created booking: ${booking.data.data.id}` : booking.error);
  
  let bookingId = booking.success ? booking.data.data.id : null;
  console.log();

  // Test 4: Get All Bookings
  console.log('4. Testing Get All Bookings...');
  const allBookings = await makeRequest('GET', '/demo-bookings');
  console.log(allBookings.success ? '✅ PASS' : '❌ FAIL',
    allBookings.success ? `Total bookings: ${allBookings.data.total}` : allBookings.error);
  console.log();

  // Test 5: Assign Specialist
  if (bookingId) {
    console.log('5. Testing Assign Specialist...');
    const assignData = {
      bookingId: bookingId,
      specialistId: 2 // Mike Chen - SaaS specialist
    };
    const assignment = await makeRequest('POST', '/assign-specialist', assignData);
    console.log(assignment.success ? '✅ PASS' : '❌ FAIL',
      assignment.success ? `Assigned ${assignment.data.data.assignedSpecialist.name}` : assignment.error);
    console.log();
  }

  // Test 6: Send Marketing Update
  console.log('6. Testing Send Marketing Update...');
  const updateData = {
    title: 'Weekly Team Update',
    message: 'Great progress this week! New demo bookings are coming in.',
    recipients: ['team@epik.com', 'management@epik.com', 'sales@epik.com'],
    priority: 'medium'
  };
  const marketingUpdate = await makeRequest('POST', '/marketing-updates', updateData);
  console.log(marketingUpdate.success ? '✅ PASS' : '❌ FAIL',
    marketingUpdate.success ? `Sent to ${marketingUpdate.data.data.recipients.length} recipients` : marketingUpdate.error);
  console.log();

  // Test 7: Get Dashboard Stats
  console.log('7. Testing Dashboard Stats...');
  const stats = await makeRequest('GET', '/dashboard-stats');
  console.log(stats.success ? '✅ PASS' : '❌ FAIL');
  if (stats.success) {
    const data = stats.data.data;
    console.log(`   📊 Total Bookings: ${data.totalBookings}`);
    console.log(`   ⏳ Pending: ${data.pendingBookings}`);
    console.log(`   ✅ Assigned: ${data.assignedBookings}`);
    console.log(`   👥 Available Specialists: ${data.availableSpecialists}`);
    console.log(`   📧 Marketing Updates: ${data.totalMarketingUpdates}`);
  }
  console.log();

  console.log('🎉 API Tests Complete!\n');
  console.log('📊 Dashboard available at: http://localhost:3000');
  console.log('🔧 API documentation in README.md');
}

// Add fetch polyfill for older Node.js versions
if (!globalThis.fetch) {
  import('node-fetch').then(({ default: fetch }) => {
    globalThis.fetch = fetch;
    runTests();
  });
} else {
  runTests();
}