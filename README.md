# News_portal_all
A full-stack News Portal Application developed with a modern frontend and a RESTful backend
# News Portal Application

A full-stack news portal application built with Node.js/Express backend and React frontend.

## Project Structure

```
news_portal/
├── backend/                 # Express.js REST API
│   ├── src/
│   │   ├── config/         # Database configuration
│   │   ├── controllers/    # Request handlers
│   │   ├── database/
│   │   │   ├── migrations/ # Database migrations
│   │   │   └── seeders/    # Sample data seeders
│   │   ├── middlewares/    # Auth & error handling middleware
│   │   ├── models/         # Sequelize models
│   │   ├── routes/         # API route definitions
│   │   ├── services/       # Business logic layer
│   │   ├── validations/    # Input validation rules
│   │   ├── app.js          # Express app setup
│   │   └── server.js       # Server entry point
│   └── package.json
│
└── frontend/               # React application
    ├── src/
    │   ├── components/     # Reusable UI components
    │   ├── context/        # React context providers
    │   ├── pages/          # Page components
    │   │   └── admin/      # Admin dashboard pages
    │   └── services/       # API service layer
    └── package.json
```

## Features

- **User Authentication**: JWT-based authentication with role-based access control
- **Role-Based Access**: Three user roles - Admin, Editor, and User
- **Article Management**: Full CRUD operations for news articles
- **Category Management**: Organize articles by categories
- **User Management**: Admin can manage user accounts
- **Responsive Design**: Mobile-friendly UI with Tailwind CSS
- **Search & Filter**: Search articles and filter by category/status

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **PostgreSQL** - Database
- **Sequelize** - ORM for database operations
- **JWT** - Token-based authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Utility-first CSS framework

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- npm or yarn

## Installation

### 1. Clone the repository

```bash
cd news_portal
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file (copy from .env.example if available)
# Configure your database credentials:
# DB_HOST=localhost
# DB_PORT=5432
# DB_NAME=news_portal
# DB_USER=your_username
# DB_PASSWORD=your_password
# JWT_SECRET=your_jwt_secret
# JWT_EXPIRES_IN=7d

# Run database migrations
npm run migrate

# Seed the database with sample data
npm run seed

# Start the server
npm run dev
```

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

## Available Scripts

### Backend

| Command | Description |
|---------|-------------|
| `npm start` | Start production server |
| `npm run dev` | Start development server with nodemon |
| `npm run migrate` | Run database migrations |
| `npm run migrate:undo` | Undo last migration |
| `npm run seed` | Seed database with sample data |
| `npm run seed:undo` | Remove all seeded data |

### Frontend

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/me` | Get current user |

### Articles
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/articles` | Get all articles |
| GET | `/api/articles/:slug` | Get article by slug |
| POST | `/api/articles` | Create article (auth required) |
| PUT | `/api/articles/:id` | Update article (auth required) |
| DELETE | `/api/articles/:id` | Delete article (auth required) |

### Categories
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/categories` | Get all categories |
| GET | `/api/categories/:slug` | Get category by slug |
| POST | `/api/categories` | Create category (admin/editor) |
| PUT | `/api/categories/:id` | Update category (admin/editor) |
| DELETE | `/api/categories/:id` | Delete category (admin only) |

### Users
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users` | Get all users (admin only) |
| GET | `/api/users/:id` | Get user by ID |
| POST | `/api/users` | Create user (admin only) |
| PUT | `/api/users/:id` | Update user |
| DELETE | `/api/users/:id` | Delete user (admin only) |

## Demo Accounts

After running seeders, you can use these accounts:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@newsportal.com | admin123 |
| Editor | editor@newsportal.com | editor123 |
| User | john@example.com | user123 |

## User Roles & Permissions

| Permission | Admin | Editor | User |
|------------|-------|--------|------|
| View articles | ✅ | ✅ | ✅ |
| Create articles | ✅ | ✅ | ❌ |
| Edit own articles | ✅ | ✅ | ❌ |
| Edit any article | ✅ | ❌ | ❌ |
| Delete articles | ✅ | ✅ | ❌ |
| Manage categories | ✅ | ✅ | ❌ |
| Manage users | ✅ | ❌ | ❌ |
| View dashboard | ✅ | ✅ | ❌ |

## Environment Variables

### Backend (.env)

```env
# Server
PORT=5000
NODE_ENV=development

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=news_portal
DB_USER=postgres
DB_PASSWORD=your_password

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d

# CORS
CORS_ORIGIN=http://localhost:5173
```

## Architecture

The application follows a clean architecture pattern with clear separation of concerns:

```
Request → Routes → Controllers → Services → Models → Database
                        ↑
                  Middlewares
                  (Auth, Validation)
```

- **Routes**: Define API endpoints and connect middleware
- **Controllers**: Handle HTTP requests/responses
- **Services**: Contain business logic
- **Models**: Define database schema and relationships
- **Middlewares**: Handle authentication, authorization, and validation

## License

MIT
