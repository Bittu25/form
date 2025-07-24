# Epik Backend Tool

A simple and efficient backend tool for Epik to manage demo bookings, assign customer delight specialists, and send marketing updates to the team.

## 🚀 Features

### 📅 Demo Booking Management
- **Track Demo Bookings**: Create and manage customer demo requests
- **Customer Information**: Store customer details including name, email, phone, company
- **Demo Types**: Support for different demo types (Product, Technical, Sales, Custom)
- **Status Tracking**: Monitor booking status (Pending, Assigned, Completed)
- **Date Management**: Schedule preferred demo dates and times

### 👥 Customer Delight Specialist Assignment
- **Specialist Database**: Pre-configured list of customer delight specialists
- **Specialization Tracking**: Each specialist has expertise areas (E-commerce, SaaS, Enterprise, Healthcare)
- **Availability Status**: Real-time availability tracking
- **Assignment System**: Easy assignment of specialists to demo bookings
- **Contact Information**: Direct access to specialist contact details

### 📧 Marketing Team Updates
- **Update Broadcasting**: Send updates to multiple recipients
- **Priority Levels**: Set priority levels (Low, Medium, High)
- **Message Tracking**: Keep history of all sent updates
- **Recipient Management**: Flexible recipient list management
- **Update History**: View all previously sent marketing updates

### 📊 Dashboard Analytics
- **Real-time Stats**: Live dashboard with key metrics
- **Booking Overview**: Total, pending, assigned, and completed bookings
- **Team Capacity**: Available specialists and workload distribution
- **Marketing Metrics**: Track marketing update frequency and reach
- **Recent Activity**: Quick view of latest bookings and activities

## 🛠 Tech Stack

- **Backend**: Node.js with Express.js
- **Frontend**: HTML5, CSS3, JavaScript with Alpine.js
- **Styling**: Tailwind CSS
- **Icons**: Font Awesome
- **Data Storage**: In-memory (JSON objects) - easily upgradeable to database
- **Email Service**: Nodemailer (configurable with Gmail, Outlook, etc.)

## 📋 Data Stored

### Demo Bookings
```json
{
  "id": "unique-uuid",
  "customerName": "John Doe",
  "email": "john@company.com",
  "phone": "+1234567890",
  "companyName": "ABC Corp",
  "demoType": "product",
  "preferredDate": "2024-01-15T10:00:00.000Z",
  "notes": "Interested in enterprise features",
  "status": "pending",
  "assignedSpecialist": null,
  "createdAt": "2024-01-10T09:00:00.000Z",
  "updatedAt": "2024-01-10T09:00:00.000Z"
}
```

### Customer Delight Specialists
```json
{
  "id": 1,
  "name": "Sarah Johnson",
  "email": "sarah@epik.com",
  "specialization": "E-commerce",
  "available": true
}
```

### Marketing Updates
```json
{
  "id": "unique-uuid",
  "title": "Q1 Product Launch Update",
  "message": "New features rolling out next week...",
  "recipients": ["team@epik.com", "marketing@epik.com"],
  "priority": "high",
  "status": "sent",
  "sentAt": "2024-01-10T09:00:00.000Z",
  "createdBy": "system"
}
```

## 🔧 API Endpoints

### Demo Bookings
- `GET /api/demo-bookings` - Get all demo bookings
- `POST /api/demo-bookings` - Create new demo booking
- `PUT /api/demo-bookings/:id` - Update booking status

### Specialists
- `GET /api/specialists` - Get all specialists
- `POST /api/assign-specialist` - Assign specialist to booking

### Marketing Updates
- `GET /api/marketing-updates` - Get all marketing updates
- `POST /api/marketing-updates` - Send new marketing update

### Analytics
- `GET /api/dashboard-stats` - Get dashboard statistics
- `GET /api/health` - Health check endpoint

## 🚀 Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start the Server**
   ```bash
   npm start
   ```
   Or for development with auto-reload:
   ```bash
   npm run dev
   ```

3. **Access the Dashboard**
   Open your browser and go to: `http://localhost:3000`

## 📱 Dashboard Design

The dashboard features a modern, responsive design with:

- **Clean Interface**: Modern gradient header with professional styling
- **Responsive Layout**: Works on desktop, tablet, and mobile devices
- **Real-time Updates**: Live data refresh with visual feedback
- **Interactive Cards**: Hover effects and smooth animations
- **Modal Forms**: Easy-to-use forms for creating bookings and sending updates
- **Status Indicators**: Color-coded status badges and availability indicators
- **Quick Actions**: One-click specialist assignment and update sending

## 🔒 Security Features

- **Input Validation**: Server-side validation for all API endpoints
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **CORS Support**: Configurable cross-origin resource sharing
- **Data Sanitization**: Input sanitization to prevent common vulnerabilities

## 🎯 Future Enhancements

- **Database Integration**: Replace in-memory storage with MongoDB/PostgreSQL
- **User Authentication**: Add login system with role-based access
- **Email Templates**: Rich HTML email templates for marketing updates
- **Calendar Integration**: Google Calendar/Outlook integration for demo scheduling
- **Reporting**: Advanced analytics and reporting features
- **API Rate Limiting**: Implement rate limiting for production use
- **File Uploads**: Support for document attachments in bookings
- **Notifications**: Real-time notifications for new bookings and assignments

## 📄 Environment Variables

Create a `.env` file for email configuration:

```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
NODE_ENV=development
PORT=3000
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For support or questions, contact the Epik development team.

---

**Made with ❤️ for Epik Team**