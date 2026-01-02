# Exam-Pulse (SarkariFlow) - Government Exam Preparation Platform

A comprehensive platform for government exam preparation with real-time updates, study materials, and exam notifications.

## Project Structure

```
Exam-Pulse/
├── Backend/              # Node.js + Express API Server
│   ├── src/
│   │   ├── config/       # Database & Socket.IO configuration
│   │   ├── controllers/  # Route handlers
│   │   ├── jobs/         # Cron jobs for scraping
│   │   ├── middleware/   # Auth, validation, error handling
│   │   ├── models/       # Mongoose schemas
│   │   ├── routes/       # API routes
│   │   ├── seeders/      # Database seeders
│   │   └── server.js     # Main server file
│   ├── package.json
│   └── .env.example
│
└── Frontend/             # React + Vite Application
    ├── src/
    │   ├── components/   # Reusable UI components
    │   ├── config/       # Socket configuration
    │   ├── hooks/        # Custom React hooks
    │   ├── pages/        # Page components
    │   ├── services/     # API service functions
    │   ├── store/        # Zustand state management
    │   └── utils/        # Helper functions & constants
    ├── package.json
    └── .env.example
```

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **Socket.IO** - Real-time communication
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Cheerio + Axios** - Web scraping
- **node-cron** - Scheduled tasks
- **express-validator** - Input validation

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Zustand** - State management
- **Axios** - HTTP client
- **Socket.IO Client** - Real-time updates
- **React Router** - Routing
- **Lucide React** - Icons

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the Backend folder:
   ```bash
   cd Backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy environment file and configure:
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your settings:
   - `MONGODB_URI` - Your MongoDB connection string
   - `JWT_SECRET` - A secure random string
   - `JWT_REFRESH_SECRET` - Another secure random string

4. Seed the database (optional):
   ```bash
   npm run seed
   ```

5. Start the server:
   ```bash
   # Development
   npm run dev
   
   # Production
   npm start
   ```

The server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the Frontend folder:
   ```bash
   cd Frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy environment file:
   ```bash
   cp .env.example .env
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The app will run on `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh-token` - Refresh access token
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile

### Exams
- `GET /api/exams` - Get all exams
- `GET /api/exams/:id` - Get exam by ID
- `GET /api/exams/categories` - Get exam categories
- `GET /api/exams/upcoming` - Get upcoming exams
- `GET /api/exams/calendar` - Get exam calendar
- `POST /api/exams/:id/subscribe` - Subscribe to exam notifications

### Resources
- `GET /api/resources` - Get all resources
- `GET /api/resources/:id` - Get resource by ID
- `GET /api/resources/featured` - Get featured resources
- `GET /api/resources/trending` - Get trending resources
- `GET /api/resources/search` - Search resources
- `POST /api/resources` - Create resource (admin)
- `POST /api/resources/:id/download` - Track download
- `POST /api/resources/:id/bookmark` - Bookmark resource

### Notifications
- `GET /api/notifications` - Get user notifications
- `GET /api/notifications/ticker` - Get live ticker notifications
- `PUT /api/notifications/:id/read` - Mark notification as read
- `PUT /api/notifications/read-all` - Mark all as read

### Users
- `GET /api/users/stats` - Get user statistics
- `GET /api/users/bookmarks` - Get user bookmarks
- `GET /api/users/activity` - Get recent activity

### Scraper (Admin)
- `GET /api/scraper/manual` - Trigger manual scraping
- `GET /api/scraper/status` - Get scraper status

## Features

### For Students
- 📚 **Study Materials** - Notes, PDFs, eBooks, and video content
- 📝 **PYQs** - Previous year questions with solutions
- 🔔 **Real-time Notifications** - Instant exam updates
- 📅 **Exam Calendar** - Track important dates
- 📊 **Progress Tracking** - Monitor your preparation
- 🔖 **Bookmarks** - Save important resources
- 👥 **Study Rooms** - Collaborative learning (coming soon)

### For Admins
- 📤 **Content Management** - Upload and manage resources
- 🕷️ **Auto Scraping** - Automatically fetch exam updates
- 📈 **Analytics** - Track user engagement
- 🔧 **User Management** - Manage users and roles

## Auto-Scraping

The platform automatically scrapes exam data from official sources every 6 hours. Supported sources include:
- SSC Official Website
- IBPS
- UPSC
- Railway Recruitment Boards
- State PSC websites

To configure scraping sources, update the `Backend/src/controllers/scraper.controller.js` file.

## Environment Variables

### Backend (.env)
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/exam-pulse
JWT_SECRET=your_jwt_secret_key
JWT_REFRESH_SECRET=your_refresh_secret_key
JWT_EXPIRE=7d
JWT_REFRESH_EXPIRE=30d
CORS_ORIGIN=http://localhost:5173
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100
SCRAPER_ENABLED=true
SCRAPER_INTERVAL=6h
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
VITE_APP_NAME=SarkariFlow
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support, email support@sarkariflow.com or join our Discord server.
