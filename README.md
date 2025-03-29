# Gen AI Analytics Backend

A Node.js (Express) backend service that simulates a Gen AI-powered data query system, allowing users to:
- Convert natural language questions to SQL queries
- Get explanations of how queries would be processed
- Validate query feasibility

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v16+)
- npm (v8+)
- SQLite (for local database)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Aditya2149/genAi-Analytics-backend.git
   cd genAi-Analytics-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables (create `.env` file):
   ```env
   JWT_SECRET=your_secure_jwt_secret
   PORT=3000
   ```

4. Start the server:
   ```bash
   npm run dev  # Development (with nodemon)
   npm start   # Production
   ```

The server will run at `http://localhost:3000`.

## 📖 API Documentation

### 🔐 Authentication
All endpoints (except `/api/auth/*`) require a JWT token in the `Authorization` header:
```http
Authorization: Bearer YOUR_JWT_TOKEN
```

### Endpoints

| Endpoint | Method | Description | Auth Required |
|----------|--------|-------------|--------------|
| `/api/auth/signup` | POST | Register a new user | ❌ No |
| `/api/auth/login` | POST | Login and get JWT token | ❌ No |
| `/api/query` | POST | Convert natural language to SQL | ✅ Yes |
| `/api/explain` | POST | Explain how a query would be processed | ✅ Yes |
| `/api/validate` | POST | Check if a query is supported | ✅ Yes |

## 📝 Sample Query Examples

### 1. Signup (Create User)
**Request:**
```bash
curl -X POST http://localhost:3000/api/auth/signup \
-H "Content-Type: application/json" \
-d '{"email": "user@example.com", "password": "securepassword"}'
```

**Response:**
```json
{
  "message": "User created successfully"
}
```

### 2. Login (Get JWT Token)
**Request:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
-H "Content-Type: application/json" \
-d '{"email": "user@example.com", "password": "securepassword"}'
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 3. Natural Language to SQL (`/query`)
**Request:**
```bash
curl -X POST http://localhost:3000/api/query \
-H "Content-Type: application/json" \
-H "Authorization: Bearer YOUR_JWT_TOKEN" \
-d '{"question": "Show me sales by region"}'
```

**Response:**
```json
{
  "question": "Show me sales by region",
  "sqlQuery": "SELECT region, SUM(amount) as total_sales FROM sales GROUP BY region"
}
```

### 4. Query Explanation (`/explain`)
**Request:**
```bash
curl -X POST http://localhost:3000/api/explain \
-H "Content-Type: application/json" \
-H "Authorization: Bearer YOUR_JWT_TOKEN" \
-d '{"question": "What are the top products?"}'
```

**Response:**
```json
{
  "question": "What are the top products?",
  "explanation": "Groups sales by product, calculates total revenue, and sorts in descending order."
}
```

### 5. Query Validation (`/validate`)
**Request:**
```bash
curl -X POST http://localhost:3000/api/validate \
-H "Content-Type: application/json" \
-H "Authorization: Bearer YOUR_JWT_TOKEN" \
-d '{"question": "Get sales data"}'
```

**Response:**
```json
{
  "question": "Get sales data",
  "isValid": false,
  "message": "Query is not supported"
}
```

## 🔧 Deployment

### Deploy to Render
1. Push your code to GitHub
2. Create a new Web Service on [Render](https://render.com)
3. Connect your GitHub repository
4. Set environment variables:
   - `JWT_SECRET` = your_secure_jwt_secret
   - `PORT` = 3000
5. Deploy!


## Support
For issues or questions, please open an issue on GitHub.
```

This README includes:
1. Clear setup instructions
2. Complete API documentation
3. Working curl examples for all endpoints
4. Deployment guide
