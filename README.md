# Premium MERN To-Do List & Scheduler

A sophisticated, secure, and highly responsive task management application built with the MERN stack. This project features a modern UI with dark mode, weekly scheduling, progress analytics, and automated email notifications.

## 🚀 Key Features

### 🔐 Secure Authentication
- **User Registration**: Sign up with Name, Age, Username, Email, and Password.
- **Validation**: Strict input validation for emails and password matching.
- **Secure Sessions**: Backend security using **HTTP-Only Cookies** and **JWT Sessions** to prevent XSS and CSRF.
- **Password Hashing**: Industry-standard encryption using `bcryptjs`.

### 📅 Advanced Scheduling
- **Weekly View**: Plan your entire week in advance with an intuitive calendar interface.
- **Task Management**: Create, update, and delete tasks with specific start and end times.
- **Priority System**: Mark tasks as "Important" to highlight them in a dedicated section.

### 📊 Progress & Analytics
- **Interactive Dashboard**: Get a quick overview of your pending and completed tasks.
- **Visual Analytics**: Track your productivity with interactive **Doughnut** and **Bar charts** (powered by Chart.js).
- **Daily Progress**: Update your work progress at the end of the day and see it reflected in your stats.

### � Notifications & Reminders
- **Email Alerts**: Send friendly reminders and notifications to users via **Nodemailer**.
- **In-App Notifications**: Stay updated with a dedicated notification section.

### 🎨 Premium UI/UX
- **Dark & Light Modes**: Seamlessly toggle between themes in the settings for user convenience.
- **Animations**: Smooth transitions and micro-animations using **Framer Motion**.
- **Responsive Design**: Fully mobile-responsive with a dynamic **Burger Icon** and sidebar navigation.
- **Tailwind CSS**: Modern, utility-first styling for a premium look and feel.

## 🛠️ Tech Stack

- **Frontend**: React.js, Vite, Tailwind CSS v4, Framer Motion, Chart.js, React Icons
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Security**: JWT, Cookie-Parser, BcryptJS
- **Email**: Nodemailer

## ⚙️ Setup Instructions

### Prerequisites
- Node.js (v14+)
- MongoDB running at `mongodb://localhost:27017/`

### 1. Clone & Install
```bash
# Clone the repository
git clone <your-repo-url>
cd TO-DO-LIST

# Install Root Dependencies (for concurrently)
npm install

# Install Backend Dependencies
cd server
npm install

# Install Frontend Dependencies
cd ../client
npm install
```

### 2. Environment Configuration
Create a `.env` file in the `server` directory:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/todo_scheduler
JWT_SECRET=your_secret_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

### 3. Run the Application
You can run both the server and client concurrently from the root directory:

```bash
# Start App (from root directory)
npm run dev
```

Alternatively, you can run them separately:

```bash
# Start Backend (from server directory)
npm run dev

# Start Frontend (from client directory)
npm run dev
```

## 📱 Navigation
The navigation bar contains:
- **Home**: Dashboard overview.
- **Importance of Scheduling**: Insights on why planning matters.
- **Schedule**: Weekly task planner.
- **Important Tasks**: High-priority task list.
- **Progress**: Interactive productivity charts.
- **Notifications**: Email and system alerts.
- **Settings**: Theme toggle and profile management.
- **About**: Project information.
- **Logout**: Secure session termination.

## 🛡️ Security Best Practices
- **Cookies**: Using `httpOnly` and `secure` flags for session management.
- **Sanitization**: All inputs are validated and sanitized on the backend.
- **CORS**: Configured to only allow requests from the authorized frontend origin.
