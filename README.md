<div class="hero-icon" align="center">
  <img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" width="100" />
</div>

<h1 align="center">
fitness-tracker-app
</h1>
<h4 align="center">Track fitness goals, share progress securely and stay motivated online.</h4>
<h4 align="center">Developed with the software and tools below.</h4>
<div class="badges" align="center">
  <img src="https://img.shields.io/badge/Framework-React-blue" alt="React">
  <img src="https://img.shields.io/badge/Frontend-JavaScript,_HTML,_CSS-red" alt="JavaScript, HTML, CSS">
  <img src="https://img.shields.io/badge/Backend-Node.js-blue" alt="Node.js">
  <img src="https://img.shields.io/badge/Database-MongoDB-green" alt="MongoDB">
</div>
<div class="badges" align="center">
  <img src="https://img.shields.io/github/last-commit/coslynx/fitness-tracker-app?style=flat-square&color=5D6D7E" alt="git-last-commit" />
  <img src="https://img.shields.io/github/commit-activity/m/coslynx/fitness-tracker-app?style=flat-square&color=5D6D7E" alt="GitHub commit activity" />
  <img src="https://img.shields.io/github/languages/top/coslynx/fitness-tracker-app?style=flat-square&color=5D6D7E" alt="GitHub top language" />
</div>

## 📑 Table of Contents
- 📍 Overview
- 📦 Features
- 📂 Structure
- 💻 Installation
- 🏗️ Usage
- 🌐 Hosting
- 📄 License
- 👏 Authors

## 📍 Overview
The repository contains a Minimum Viable Product (MVP) called "fitness-tracker-app" which helps users track their fitness goals and share their progress securely online, enhancing motivation and accountability. The application is built using React for the frontend, Node.js with Express for the backend and optionally utilizes MongoDB for data storage. Core features include user authentication, goal setting, progress tracking, and social sharing.

## 📦 Features
|    | Feature            | Description                                                                                                        |
|----|--------------------|--------------------------------------------------------------------------------------------------------------------|
| 🔑 | **User Authentication**| Secure user registration and login using bcrypt for password hashing and JWT for session management.            |
| 🎯 | **Goal Setting**     | Allows users to set specific fitness goals and track their progress. Goals are stored in the database and retrieved for display. |
| 📈 | **Progress Tracking**| Enables users to log their fitness activities and track progress toward their goals.                                |
| 📣 | **Social Sharing**   | Users can share their achievements and progress with friends, fostering motivation and accountability.                 |
| 📱 | **Responsive Design**| The application is designed to be responsive and accessible on various devices, providing a seamless user experience. |
| 🛡️ | **Data Security**    | Implements measures to protect user data and privacy, including secure storage and communication protocols.         |
| ⚙️ | **API Endpoints**    | Provides API endpoints for user authentication, goal management, and progress tracking.                               |
| 🧩 | **Modular Codebase** | The codebase follows a modular structure, making it easier to maintain, extend, and test.                            |
| 🧪 | **Input Validation** | Comprehensive input validation and sanitization to prevent common security vulnerabilities like XSS.               |
| ⚡️ | **Performance**    | Optimized React components and efficient API queries to deliver a smooth user experience.                            |

## 📂 Structure
```text
└─ src
 └─ components
  └─ Button.jsx
  └─ Input.jsx
  └─ layout
  └─ Header.jsx
  └─ Footer.jsx
  └─ features
  └─ auth
  └─ LoginForm.jsx
  └─ SignupForm.jsx
  └─ dashboard
  └─ DashboardStats.jsx
  └─ goals
  └─ GoalList.jsx
  └─ GoalForm.jsx
  └─ pages
  └─ Home.jsx
  └─ Dashboard.jsx
  └─ Goals.jsx
  └─ hooks
  └─ useAuth.js
  └─ context
  └─ AuthContext.js
  └─ services
  └─ api.js
  └─ auth.js
  └─ utils
  └─ helpers.js
  └─ styles
  └─ global.css
 └─ public
  └─ index.html
  └─ favicon.ico
 └─ README.md
 └─ .env
 └─ startup.sh
 └─ commands.json
 └─ package.json
```

## 💻 Installation
> [!WARNING]
> ### 🔧 Prerequisites
> - Node.js v16 or higher
> - npm 7 or higher
> - MongoDB Atlas (optional)
> - Git

### 🚀 Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/coslynx/fitness-tracker-app.git
   cd fitness-tracker-app
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   ```bash
   cp .env.example .env
   ```
   - Fill in the `.env` file with your MongoDB connection string and JWT secret:
     ```
     MONGODB_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret_key
     PORT=5000
     ```

## 🏗️ Usage
### 🏃‍♂️ Running the MVP
1. Start the development server:
   ```bash
   npm run dev
   ```
2. Access the application:
   - Web interface: `http://localhost:3000`

> [!TIP]
> ### ⚙️ Configuration
> - The `.env` file contains environment-specific configurations, such as the MongoDB connection string and JWT secret.
> - The `PORT` variable defines the port the server will listen on (defaults to 5000 if not set).

### 📚 Examples
- 📝 **Register a new user:**
  ```bash
  curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "SecurePassword123!"}'
  ```

- 📝 **Login to the application:**
  ```bash
  curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "SecurePassword123!"}'
  ```

- 📝 **Add a new fitness goal:**
  ```bash
  curl -X POST http://localhost:5000/api/goals \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <JWT_TOKEN>" \
  -d '{"description": "Run 5k three times a week"}'
  ```

## 🌐 Hosting
### 🚀 Deployment Instructions
#### Deploying to Heroku
1. Install the Heroku CLI:
   ```bash
   npm install -g heroku
   ```
2. Login to Heroku:
   ```bash
   heroku login
   ```
3. Create a new Heroku app:
   ```bash
   heroku create fitness-tracker-app-production
   ```
4. Set up environment variables:
   ```bash
   heroku config:set MONGODB_URI=your_mongodb_connection_string
   heroku config:set JWT_SECRET=your_jwt_secret_key
   heroku config:set PORT=5000
   ```
5. Deploy the code:
   ```bash
   git push heroku main
   ```

### 🔑 Environment Variables
- `MONGODB_URI`: Connection string for the MongoDB database
  Example: `mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority`
- `JWT_SECRET`: Secret key for JWT token generation
  Example: `YourSuperSecretJWTKey`
- `PORT`: Port for the Express server to listen on
  Example: `5000`

## 📜 API Documentation
### 🔍 Endpoints
- **POST /api/auth/login**
  - Description: Logs in a user and returns a JWT token.
  - Body: `{ "email": string, "password": string }`
  - Response: `{ "token": string, "user": { "_id": string, "email": string } }`

- **POST /api/auth/signup**
  - Description: Registers a new user and returns a JWT token.
  - Body: `{ "email": string, "password": string }`
  - Response: `{ "token": string, "user": { "_id": string, "email": string } }`

- **GET /api/goals**
  - Description: Retrieves all goals for the authenticated user.
  - Headers: `Authorization: Bearer <JWT_TOKEN>`
  - Response: `[ { "_id": string, "description": string, "createdAt": string, "updatedAt": string } ]`

- **POST /api/goals**
  - Description: Creates a new goal for the authenticated user.
  - Headers: `Authorization: Bearer <JWT_TOKEN>`
  - Body: `{ "description": string }`
  - Response: `{ "_id": string, "description": string, "createdAt": string, "updatedAt": string }`

- **DELETE /api/goals/:id**
  - Description: Deletes a goal by ID for the authenticated user.
  - Headers: `Authorization: Bearer <JWT_TOKEN>`
  - Response: `{ "message": "Goal deleted" }`

### 🔒 Authentication
1. Register or login to obtain a JWT token.
2. Include the token in the `Authorization` header for protected routes:
   ```
   Authorization: Bearer <JWT_TOKEN>
   ```

### 📝 Examples
```bash
# Register a new user
curl -X POST http://localhost:5000/api/auth/signup \
-H "Content-Type: application/json" \
-d '{"email": "test@example.com", "password": "SecurePassword123!"}'

# Response
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "649e8a0a2e9c8a0012a1b2c3",
    "email": "test@example.com"
  }
}

# Create a new goal
curl -X POST http://localhost:5000/api/goals \
-H "Content-Type: application/json" \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
-d '{"description": "Run a marathon"}'

# Response
{
  "_id": "649e8a0a2e9c8a0012a1b2c4",
  "description": "Run a marathon",
  "createdAt": "2023-07-01T00:00:00.000Z",
  "updatedAt": "2023-07-01T00:00:00.000Z"
}

# Delete a goal
curl -X DELETE http://localhost:5000/api/goals/649e8a0a2e9c8a0012a1b2c4 \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

# Response
{
  "message": "Goal deleted"
}
```

> [!NOTE]
> ## 📜 License & Attribution
> 
> ### 📄 License
> This Minimum Viable Product (MVP) is licensed under the [GNU AGPLv3](https://choosealicense.com/licenses/agpl-3.0/) license.
> 
> ### 🤖 AI-Generated MVP
> This MVP was entirely generated using artificial intelligence through [CosLynx.com](https://coslynx.com).
> 
> No human was directly involved in the coding process of the repository: fitlog-progress-tracker-app
> 
> ### 📞 Contact
> For any questions or concerns regarding this AI-generated MVP, please contact CosLynx at:
> - Website: [CosLynx.com](https://coslynx.com)
> - Twitter: [@CosLynxAI](https://x.com/CosLynxAI)

<p align="center">
  <h1 align="center">🌐 CosLynx.com</h1>
</p>
<p align="center">
  <em>Create Your Custom MVP in Minutes With CosLynxAI!</em>
</p>
<div class="badges" align="center">
<img src="https://img.shields.io/badge/Developers-Drix10,_Kais_Radwan-red" alt="">
<img src="https://img.shields.io/badge/Website-CosLynx.com-blue" alt="">
<img src="https://img.shields.io/badge/Backed_by-Google,_Microsoft_&_Amazon_for_Startups-red" alt="">
<img src="https://img.shields.io/badge/Finalist-Backdrop_Build_v4,_v6-black" alt="">
</div>